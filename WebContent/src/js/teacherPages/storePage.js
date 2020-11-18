$(function () {
    let action = namespace.actions['teacher'];
    let Table = namespace['func']['Table'];
    
    const tableHeaderInfo = {
        headerNameList: ['书号', '书名', '作者', '上传者ID', '上传者姓名', '上传时间'],
        headerNameMapping: {
            '书号': 'bookId',
            '书名': 'bookName',
            '作者': 'author',
            '上传者ID': 'uploaderID',
            '上传者姓名': 'uploaderName',
            '上传时间': 'uploadTime',
        },
    };
    
    const tableQueryOptions = [
        {
            optionName: '书籍名称',
            optionNameMapping: 'bookName',
            type: 'text',
        },
    ];
    
    const tableBtnsMeta = {
        'names': ['添加书籍', '删除书籍'],
        'icons': ['plus-circle', 'minus-circle'],
        'ids-suffix': ['addBook', 'deleteBook'],
        'useableConditions': [0, 2],
    };
    
    let getTableBtnsInfo = namespace['func']['getTableBtnsInfo'];
    const tableBtnsInfo = getTableBtnsInfo(tableBtnsMeta);
    let table = new Table(
        tableHeaderInfo,
        tableQueryOptions,
        action.getBooks,
        tableBtnsInfo,
    );
    
    table.init();
    setListener();
    
    let getNames = namespace['func']['getNames'];
    let getIds = namespace['func']['getIds'];
    
    function setListener() {
        $('#table-btn-deleteBook').click(e => {
            $('#modal-deleteBook-span-bookName').text(getNames(3));
        });
        $('#modal-deleteBook-btn-ok').click(e => {
            let userName = namespace['userInfo']['userName'];
            
            let $trs = $('#table-content-body input:checked').closest('tr');
            
            for (let i = 0; i < $trs.length; i++) {
                let $tr = $($trs[i]);
                let bookName = $tr.find('td:eq(3)').text();
                let uploaderName = $tr.find('td:eq(6)').text();
                
                if (userName !== uploaderName) {
                    alert(`书籍《${bookName}》不是您上传的，您不能删除它`);
                    return;
                }
            }
            
            action.deleteBook(getIds(), status => {
                $('#table-btn-refreshPage').click();
            })
        });
        
        // 添加书籍
        $('#table-btn-addBook').click(e => {
            $('#modal-addBook input').val('');
            $('#modal-addBook textarea').val('');
        })
        $('#modal-addBook-input-avatarFile').change(e => {
            let avatarFile = $('#modal-addBook-input-avatarFile')[0].files[0];
            if(avatarFile){
                $('#modal-addBook-input-avatarFile-img').attr('src', URL.createObjectURL(avatarFile));
            }else{
                $('#modal-addBook-input-avatarFile-img').removeAttr('src');
            }
        })
        $('#modal-addBook-btn-ok').click(e => {
            e.stopPropagation();
            
            let bookName = $('#modal-addBook-input-bookName').val();
            let author = $('#modal-addBook-input-author').val();
            let introduction = $('#modal-addBook-input-introduction').val();
            let bookFile = $('#modal-addBook-input-bookFile')[0].files[0];
            let avatarFile = $('#modal-addBook-input-avatarFile')[0].files[0];
            let alertMessage = '';
            
            if (bookName === '') alertMessage = '书名不能为空';
            else if (bookName.length > 20) alertMessage = '书名请控制在 20 个字以内';
            else if (author === '') alertMessage = '作者不能为空'
            else if (author.length > 20) alertMessage = '作者名请控制在 20 个字以内';
            else if (bookFile === undefined) alertMessage = '您没有选择文件';
            else if (bookFile.size > 2 * 1024 * 1024) alertMessage = '书籍大小请控制在 2M 以内';
            else if (bookFile.type !== 'text/plain') alertMessage = '抱歉，只支持 TXT 文件';
            else if (introduction && introduction.length > 140) alertMessage = '书籍简介请控制在 140 个字以内';
            else if (avatarFile && avatarFile.size > 1 * 1024 * 1024) alertMessage = '图片大小请控制在 1M 以内';
            
            
            
            if (alertMessage !== '') {
                alert(alertMessage);
                return;
            }
            
            $('#modal-addBook .modal-body > form').css('visibility', 'hidden');
            $('#modal-addBook .uploading-container').removeAttr('hidden');
            $('#modal-addBook-btn-ok').addClass('disabled').attr('disabled', 'disabled');
            
            action.addBook(bookName, author, introduction, bookFile, avatarFile, status => {
                if (status) {
                    $('#modal-addBook').modal('hide').on('hidden.bs.modal',function () {
                        alert('上传成功');
                        $('#modal-addBook').unbind('hidden.bs.modal');
                    });
                    $('#table-btn-refreshPage').click();
                } else {
                    alert('上传失败');
                }
            
                $('#modal-addBook .modal-body > form').removeAttr('style');
                $('#modal-addBook .uploading-container').attr('hidden', 'hidden');
                $('#modal-addBook-btn-ok').removeClass('disabled').removeAttr('disabled');
            })
        })
        
    }
})