$(function () {
    let actions = namespace.actions;
    
    actions.getReadedBooks(bookList => {
        for (let i = 0; i < bookList.length; i++) {
            let book = bookList[i];
            appendReadedBook(
                'readed-book-list',
                book.name,
                book.author,
                book.id,
                book.introduction,
                book.cover,
            );
        }
        
        recordData({
            'data.readedBooks': bookList,
        });
    });
    
    actions.getBooks(bookList => {
        for (let i = 0; i < bookList.length; i++) {
            let book = bookList[i];
            appendReadedBook(
                'book-list',
                book.name,
                book.author,
                book.id,
                book.introduction,
                book.cover,
                book.className,
            );
        }
        
        recordData({
            'data.books': bookList,
        });
    });
    
    $(`.user-info .dropdown-item:contains(${document.title})`).addClass('disabled');
    
    // 事件注册
    // 用户名
    $('#userinfo-username').click(e => {
        $('#userinfo-dropdown').toggleClass('hidden');
    });
    
    // 重置按钮
    $("#bookshelf-query-btn-reset").click(e => {
        $('#bookshelf-query-input-bookname').val('');
        $('#bookshelf-query-classes-dropdown-btn').text('全部班级');
    });
    
    // 查询按钮
    $('#bookshelf-query-btn-query').click(e => {
        $('#book-list').html('');
        let className = $('#bookshelf-query-classes-dropdown-btn').text();
        let bookName = $('#bookshelf-query-input-bookname').val();
        actions.getBooks(className, bookName, bookList => {
            for (let i = 0; i < bookList.length; i++) {
                let book = bookList[i];
                appendReadedBook(
                    'book-list',
                    book.name,
                    book.author,
                    book.id,
                    book.introduction,
                    book.cover,
                    book.className,
                );
            }
        });
    });
    
    $('#bookshelf-query-classes-dropdown-menu').click(e => {
        if ($(e.target).hasClass('dropdown-item')) {
            $('#bookshelf-query-classes-dropdown-btn').text($(e.target).text());
        }
    });
    
    function appendReadedBook(dom_id, name, author, id, introduction, cover, className = '') {
        $('#' + dom_id).append(
            $('<div />').attr('class', 'book-card').append(
                $('<div />').attr('class', 'book-avatar').append(
                    $('<a />', {
                        'href': '../common/bookRead.' + namespace.linkMode + '?id=' + id,
                    }).append(
                        $('<img />').attr('src', cover),
                    )
                ),
                $('<div />').attr('class', 'book-name').text(name),
                $('<div />').attr('class', 'book-author').text(author),
                $('<div />').attr('class', 'book-class-name').text(className),
            )
        )
    }
})