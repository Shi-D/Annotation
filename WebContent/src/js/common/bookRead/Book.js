$(function () {
    const action = namespace['actions']['bookRead'];
    const getBookId = namespace['func']['getBookId'];
    const ee = namespace['o']['ee'];
    
    class Book {
        constructor(content = '') {
            this.content = content;
            this.page = 1;
            this.pages = [];
            this.bookId = getBookId();
            this.bookMarkList = action.getBookmarkList(this.bookId);
            
            this.selection = false;
            this.annotationSelected = false;
            this.range = null;
            this.annId = null;
        }
        
        init() {
            this.setContent(this.getContent());
            $('#total-page').text(this.pages.length);
            
            this.showPage(action.getLastPage(this.bookId));
            this.setListener();
            
            // action.getAllStatistics();
        }
        
        setContent(content = '') {
            this.content = content.split('\n').filter(o => o !== '').join('\n') + '\n';
            
            let BOOK_CONTENT_WIDTH = 620, BOOK_CONTENT_HEIGHT = 679.5;
            let SPAN_MARGIN_BOTTOM = 8;
            let SPAN_WIDTH = 15 + 1, SPAN_HEIGHT = 22.4 + SPAN_MARGIN_BOTTOM;
            let PARA_MARGIN_BOTTOM = 16;
            let perPageContent = [];
            let height = 0;
            let numberOfWordsPerLine = Math.floor(BOOK_CONTENT_WIDTH / SPAN_WIDTH);
            let index = 1;
            let paraId = 0, perParaContent = '';
            let perlineContent = '';
            for (let i = 0; i < this.content.length; i++) {
                let char = this.content[i];
                perParaContent += char;
                perlineContent += char;
                if (char === '\n') {
                    perPageContent.push({
                        id: paraId,
                        text: perParaContent
                    });
                    perParaContent = '';
                    paraId += 1;
                    index = 1;
                    height += PARA_MARGIN_BOTTOM + SPAN_HEIGHT;
                }
                if (index++ % numberOfWordsPerLine === 0) {
                    height += SPAN_HEIGHT;
                    perlineContent = '';
                }
                if ((height + SPAN_HEIGHT) >= BOOK_CONTENT_HEIGHT) {
                    if (perParaContent !== '') {
                        perPageContent.push({
                            id: paraId,
                            text: perParaContent
                        });
                    }
                    this.pages.push(perPageContent);
                    perPageContent = [];
                    perParaContent = '';
                    height = 0;
                    index = 1;
                    continue;
                }
            }
            
            if (perPageContent.length !== 0) {
                this.pages.push(perPageContent);
            }
        }
        
        getContent() {
            return action.getBookConentAction(this.bookId);
        }
        
        showPage(page) {
            $('#book-content').empty();
            
            const index = page - 1;
            let pageContent = this.pages[index];
            let offset = 0;
            for (let i = 0; i < pageContent.length; i++) {
                let paraInfo = pageContent[i];
                let $para = $('<p></p>').attr('data-para-id', paraInfo.id);
                let paraText = paraInfo.text;
                
                for (let j = 0; j < paraText.length; j++) {
                    let $span = $('<span></span>').text(paraText[j]).attr('data-offset', offset++);
                    $para.append($span);
                }
                offset = 0;
                $('#book-content').append($para);
                if ($para.children().length === 0) $para.css('margin-bottom', '0');
            }
            
            this.updatePage(page);
            this.releasePageChangedEvent();
            action.pushPageInfo(this.bookId, pageContent.length, this.page);
    
            // 如果一个段落完整的显示出来，那么最后会多出来一个空白的span，里面的内容是换行符
            // 下面的代码通过删除这些span来解决这个问题
            let $lastSpans = $('#book-content p[data-para-id] > span:last-child');
            $lastSpans.filter(function () {
                return $(this).text() === '\n';
            }).remove();
        }
        
        nextPage() {
            if (this.page === this.pages.length) return;
            this.showPage(this.page + 1);
        }
        
        prevPage() {
            if (this.page === 1) return;
            this.showPage(this.page - 1);
        }
        
        updatePage(page) {
            this.page = page;
            $('#current-page').attr('placeholder', page);
            
            let $bookmarkSign = $('#bookmark-sign');
            if (this.bookMarkList.includes(this.page)) {
                $bookmarkSign.addClass('marked');
            } else {
                $bookmarkSign.removeClass('marked');
            }
            
            if ($bookmarkSign.hasClass('marked')) {
                $bookmarkSign.attr('src', 'https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/bookmark-hover.png');
            } else {
                $bookmarkSign.attr('src', 'https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/bookmark.png');
            }
        }
        
        releasePageChangedEvent() {
            const index = this.page - 1;
            const len = this.pages[index].length;
            const startParaId = this.pages[index][0].id;
            const endParaId = this.pages[index][len - 1].id;
            ee.emit('page-changed', startParaId, endParaId);
        }
        
        setListener() {
            document.getElementById('book').onwheel = e => {
                if (e.deltaY > 0) {
                    this.nextPage();
                } else {
                    this.prevPage();
                }
            }
            
            $('#bookmark-sign').click(e => {
                let $sign = $(e.target);
                action.markPage(this.bookId, this.page);
                if ($sign.hasClass('marked')) {
                    $sign.attr('src', 'https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/bookmark.png')
                    $sign.removeClass('marked');
                    this.bookMarkList.splice(this.bookMarkList.indexOf(this.page), 1);
                } else {
                    $sign.attr('src', 'https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/bookmark-hover.png');
                    $sign.addClass('marked');
                    this.bookMarkList.push(this.page);
                }
            });
            
            $('#btn-prev-page').click(e => {
                this.prevPage();
            });
            $('#btn-next-page').click(e => {
                this.nextPage();
            });
            
            $('#book').mouseup(e => {
                if (window.getSelection().toString() !== '' && this.selection === false) {
                    ee.emit('selection', window.getSelection().getRangeAt(0));
                }
                if (this.selection === true && window.getSelection().toString() === '') {
                    ee.emit('unselection');
                }
            }).click(e => {
                if ($(e.target).hasClass('underline')) {
                    if (this.annotationSelected === true) ee.emit('annotation-unselected', this.annId);
                    ee.emit('annotation-selected', $(e.target).attr('data-annotation-id'));
                }
                if (this.annotationSelected === true && !$(e.target).hasClass('underline')) {
                    ee.emit('annotation-unselected', this.annId);
                }
            });
            
            $('#current-page').change(e => {
                let $currentPage = $(e.target);
                let page = $currentPage.val();
                if (page % 1 == 0 && page >= 1 && page <= this.pages.length) {
                    this.showPage(+page);
                }
                $currentPage.val('');
            })
            
            ee.on('page-changed', () => {
                $('#current-page').text(this.page);
            });
            
            ee.on('selection', range => {
                this.range = range;
                this.selection = true;
            }).on('unselection', () => {
                this.range = null;
                this.selection = false;
            });
            
            ee.on('annotation-selected', annId => {
                this.annId = annId;
                this.annotationSelected = true;
            }).on('annotation-unselected', () => {
                this.annId = null;
                this.annotationSelected = false;
            });
            
            ee.on('userName-changed-2', () => {
                this.showPage(this.page);
                
                const index = this.page - 1;
                const startParaId = this.pages[index].startParaId;
                const endParaId = this.pages[index + 1].startParaId - 1;
                ee.emit('page-changed', startParaId, endParaId);
            });
            
            ee.on('userName-changed-1', () => {
                if (this.annotationSelected) ee.emit('annotation-unselected', this.annId);
            });
            
        }
    }
    
    namespace['func']['Book'] = Book;
})

