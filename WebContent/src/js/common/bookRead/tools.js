$(function () {
    namespace['func']['getFormatDate'] = function (millisecond = new Date().valueOf()) {
        let date = new Date(millisecond);
        
        let year = date.getFullYear();
        let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let day = date.getDate();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    
    namespace['func']['parseRange'] = function (range) {
        let $startSpan, $endSpan;
        let startParaId, endParaId, startOffset, endOffset;
        
        if (range !== false) {
            if (range.startOffset === 0) {
                $startSpan = $(range.startContainer.parentElement);
                $endSpan = $(range.endContainer.parentElement);
            } else {
                $startSpan = $(range.endContainer.parentElement);
                $endSpan = $(range.startContainer.parentElement);
            }
            startOffset = parseInt($startSpan.attr('data-offset'));
            endOffset = parseInt($endSpan.attr('data-offset'));
            startParaId = parseInt($startSpan.parent().attr('data-para-id'));
            endParaId = parseInt($endSpan.parent().attr('data-para-id'));
        }

        // firefox bug
        if(startParaId === endParaId && endOffset < startOffset){
        	[startOffset, endOffset] = [endOffset, startOffset];
        }
        
        const rangeInfo = {
            startParaId: startParaId,
            endParaId: endParaId,
            startOffset: startOffset,
            endOffset: endOffset,
            text: range.toString(),
        }
        
        return rangeInfo;
    }
    
    namespace['func']['getBookId'] = function () {
        let list = location.search.substring(1).split('&');
        list = list.map(str => {
            return str.split('=');
        });
        
        let pairs = {};
        for (let i = 0; i < list.length; i++) {
            pairs[list[i][0]] = list[i][1];
        }
        
        return +pairs['id'];
    }
})