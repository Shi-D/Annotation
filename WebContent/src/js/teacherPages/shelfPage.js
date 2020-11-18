$(function () {
    let action = namespace.actions['teacher'];
    let Table = namespace['func']['Table'];
    
    const tableHeaderInfo = {
        headerNameList: ['书号', '书名', '作者', '书籍简介', '所属班级'],
        headerNameMapping: {
            '书号': 'bookId',
            '书名': 'bookName',
            '作者': 'author',
            '书籍简介': 'introduction',
            '所属班级': 'className',
        },
        additionalInfo: {
            'data-class-id': 'classId',
        }
    };
    
    const tableQueryOptions = [
        {
            optionName: '全部班级',
            optionNameMapping: 'className',
            type: 'dropdown',
            getDropdownMenuDataFunc: action.getClassesHasBook,
        },
        {
            optionName: '书籍名称',
            optionNameMapping: 'bookName',
            type: 'text',
        },
    ];
    
    const tableBtnsMeta = {
        'names': ['查看此书阅读情况', 'Excel导出阅读情况'],
        'icons': ['comments', 'comments'],
        'ids-suffix': ['readBook', 'getExcel'],
        'useableConditions': [1, 1],
    };
    
    let getTableBtnsInfo = namespace['func']['getTableBtnsInfo'];
    const tableBtnsInfo = getTableBtnsInfo(tableBtnsMeta);
    let table = new Table(
        tableHeaderInfo,
        tableQueryOptions,
        action.getBookshelfList,
        tableBtnsInfo,
    );
    
    table.init();
    setListener();
    
    function setListener() {
        $('#table-btn-readBook').click(e => {
            let bookId = $('#table-content-body input:checked').closest('tr').attr('data-item-id');
            location.href = '../common/bookRead.' + namespace.linkMode + '?id=' + bookId;
        });
        $('#table-btn-getExcel').click(e => {
            let $trs = $('#table-content-body input:checked').closest('tr');
            for (let i = 0; i < $trs.length; i++) {
                let $tr = $($trs[i]);
                let bookId = $tr.attr('data-item-id');
                let classId = $tr.attr('data-class-id');
                action.getExcel(bookId, classId);
            }
        });
    }
});