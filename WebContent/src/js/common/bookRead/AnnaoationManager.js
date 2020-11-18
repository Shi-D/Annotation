$(function () {
    const action = namespace['actions']['bookRead'];
    const getFormatDate = namespace['func']['getFormatDate'];
    const getBookId = namespace['func']['getBookId'];
    const ee = namespace['o']['ee'];

    class Annotation {
        constructor(config) {
            this.time = config.time || getFormatDate(new Date().valueOf());
            this.author = config.author || '未知';
            this.content = config.content || '';
            this.text = config.text || '';
            this.color = '#03A9F4';
            this.like = config.like || 0;
            this.isLike = config.isLike || false;
            this.comments = [];

            this.startParaId = config.startParaId;
            this.endParaId = config.endParaId;
            this.startOffset = config.startOffset;
            this.endOffset = config.endOffset;

            this.Id = config.annotationId || -1;
            this.image = config.annotationImage || undefined;
        }

        _getSpans() {
            let $spans;
            if (this.startParaId === this.endParaId) {
                $spans = $(`p[data-para-id=${this.startParaId}] > span`).slice(this.startOffset, this.endOffset + 1);
            } else {
                for (let i = this.startParaId; i <= this.endParaId; i++) {
                    let paraChilden = $(`p[data-para-id=${i}] > span`);
                    if (i === this.startParaId) {
                        $spans = paraChilden.slice(this.startOffset);
                    } else if (i === this.endParaId) {
                        $spans = $spans.add(paraChilden.slice(0, this.endOffset + 1));
                    } else {
                        $spans = $spans.add(paraChilden);
                    }
                }
            }
            return $spans;
        }

        _getEndSpan() {
            return $(`p[data-para-id=${this.endParaId}] > span`).eq(this.endOffset);
        }

        showSign() {
            if (this.content === '') return;
            let endSpan = this._getEndSpan();

            if (endSpan.length === 0) return;

            let sign = $('#annotation-sign').clone(true).removeAttr('id').attr('data-sign-id', this.Id);

            sign.css('top', endSpan.offset().top + endSpan.height() - 5);
            sign.css('left', endSpan.offset().left + endSpan.width() / 2);
            $(document.body).append(sign);
            sign.css('display', 'flex');
            sign.css('background-color', this.color);
        }

        hiddenSign() {
            $(`div[data-sign-id=${this.Id}]`).remove();
        }

        showUnderline() {
            let $spans = this._getSpans();
            if(!$spans) return;

            $spans.css({
                'border-bottom': '2px solid ' + this.color,
                'margin-bottom': '6px'
            });

            $spans.attr('data-annotation-id', this.Id).addClass('underline');
        }

        hiddenUnderline() {
            let spans = this._getSpans();

            spans.removeAttr('style');
            spans.removeAttr('class');
            spans.removeAttr('data-annotation-id');
        }

        showAll() {
            this.showUnderline();
            this.showSign();
        }

        hiddleAll() {
            this.hiddenUnderline();
            this.hiddenSign();
        }

        setContent(content, imgUrl) {
            this.content = content;
            if (imgUrl !== undefined) this.image = imgUrl;
        }
    }

    class AnnaoationManager {
        constructor() {
            this.annotations = {};
            this.annotationIds = [];
            this.loadedList = [];
            this.comments = {};
            this.bookId = getBookId();
            this.currentUserName = action.getCurrentUserNameAction();
            this.showUserName = this.currentUserName;
        }

        init() {
            this._setListener();

            const annotationList = action.getAnnotations(this.bookId);
            for (let i = 0; i < annotationList.length; i++) {
                const config = annotationList[i];
                this.addAnnotation(config);
            }
            this.loadedList.push(this.showUserName);
        }

        showCurrentPageAnnotation(startParaId, endParaId) {
            for (let i = 0; i < this.annotationIds.length; i++) {
                const ann = this.getAnnotation(this.annotationIds[i])
                if (ann.startParaId > endParaId || ann.endParaId < startParaId) continue;
                if (ann.author !== this.showUserName) continue;
                if (ann.author !== this.currentUserName) ann.color = 'gray';
                ann.showAll();

                if (this.comments[ann.Id] === undefined) this.comments[ann.Id] = action.getComments(ann.Id);
            }
        }

        addAnnotation(config) {
            config.author = config.author || this.currentUserName;

            if (config.annotationId === undefined) {
                config.bookId = this.bookId;
                config.annotationId = action.addAnnotationAction(config);
            }

            let ann = new Annotation(config);
            this.annotations[ann.Id] = ann;
            this.annotationIds.push(ann.Id);
            window.getSelection().removeAllRanges();

            return ann;
        }

        getAnnotation(annId) {
            return this.annotations[annId];
        }

        setAnnotationContent(annId, content, file) {
            const formData = new FormData();

            formData.append('annotationId', annId);

            formData.append('content', content);
            if (file !== undefined) {
                formData.append('annotationPicFileName', file.name);
                formData.append('annotationPic', file);
            }

            action.updateAnnotationAction(formData, (status, imgUrl) => {
                if (status === false) {
                    alert('失败！');
                    return;
                } else {
                    $('#annotation-info-item-body-annotation-content-img').attr('src', namespace.rootUrl + imgUrl);
                    this.getAnnotation(annId).setContent(content, imgUrl);
                }

            });
        }

        updateColor(annId, color) {
            let ann = this.getAnnotation(annId);
            if (ann === undefined) return;
            ann.color = color;
            ann.hiddenUnderline();
            ann.showUnderline();
        }

        deleteAnnotation(annId) {
            const status = action.deleteAnnotationAction(annId);

            this.getAnnotation(annId).hiddleAll()
            delete this.annotations[annId];
            this.annotationIds.splice(this.annotationIds.indexOf(parseInt(annId)), 1);
        }

        like(annId) {
            action.likeAction(annId);

            let ann = this.getAnnotation(annId);
            ann.like++;
            ann.isLike = true;
        }

        unlike(annId) {
            action.unlikeAction(annId);

            let ann = this.getAnnotation(annId);
            ann.like--;
            ann.isLike = false;
        }

        _setListener() {
            ee.on('add-annotation', (rangeInfo, content) => {
                if (content !== undefined) rangeInfo['content'] = content;
                this.addAnnotation(rangeInfo).showAll();
            });

            ee.on('page-changed', (startParaId, endParaId) => {
                this.showCurrentPageAnnotation(startParaId, endParaId)
            });

            ee.on('userName-changed-1', (userName, userId) => {
                this.showUserName = userName;

                if (this.loadedList.indexOf(userName) === -1) {
                    const annotationList = action.getAnnotations(this.bookId, userId);
                    for (let i = 0; i < annotationList.length; i++) {
                        const config = annotationList[i];
                        this.addAnnotation(config);
                    }
                    this.loadedList.push(userName);
                }

                ee.emit('userName-changed-2');
            })
        }

        addComment(annId, content, type, toId, toName, file) {
            const config = {
                annotationId: annId,
                content: content,
            };

            if (type === 'reply-reply') {
                config['toId'] = toId;
            }
            if (file) {
                config['commentPic'] = file;
            }

            let status = action.addComment(config);
            if (config['commentPic'] !== undefined) {
                delete config['commentPic'];
            }

            if (status['status'] === 'ok' && status['commentPic'] !== null && status['commentPic'] !== 'null') {
                config['imageUrl'] = status['commentPic'];
            }

            config['time'] = getFormatDate();
            config['fromName'] = this.currentUserName;
            if (type === 'reply-reply') {
                config['toName'] = toName;
            }

            if (this.comments[annId] === undefined) this.comments[annId] = [];
            this.comments[annId].push(config)
        }

        deleteComment(commentId) {
            let comments = this.comments;
            for (let annId in comments) {
                let commentList = comments[annId];
                for (let i in commentList) {
                    let commentItem = commentList[i];
                    if (commentItem['commentId'] == commentId) {
                        commentList.splice(i, 1);
                        action.deleteComment(commentId);
                        return;
                    }
                }
            }
        }
    }

    namespace['func']['AnnaoationManager'] = AnnaoationManager;
})
