$(function () {
    const Book = namespace['func']['Book'];
    const AnnaoationManager = namespace['func']['AnnaoationManager'];
    const AnnotationInfoManager = namespace['func']['AnnotationInfoManager'];
    const Classes = namespace['func']['Classes'];
    const ee = namespace['o']['ee'];
    const parseRange = namespace['func']['parseRange'];
    
    const book = new Book();
    book.init();
    
    const annManager = new AnnaoationManager();
    annManager.init();
    
    const classes = new Classes(annManager);
    classes.init();
    
    const annInfo = new AnnotationInfoManager({
        annManager: annManager
    });
    annInfo.init();
    
    book.releasePageChangedEvent();
    
    $('#annotation-info-btn-underline').click(e => {
        let config = parseRange(book.range);
        config['page'] = book.page;
        annManager.addAnnotation(config).showUnderline();
        $(`#book-content p[data-para-id=${config.startParaId}] > span[data-offset=${config.startOffset}]`).click();
        ee.emit('unselection');
    });
    
    $('#annotation-info-btn-delete').click(e => {
        let annId = book.annId;
        ee.emit('annotation-unselected', annId);
        annManager.deleteAnnotation(annId);
    });
    
    $('#back-pervious-page').tooltip();
    $('#back-pervious-page').click(e => {
        history.back();
    });
    
});