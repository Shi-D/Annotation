// 此文件动态生成不同页面的公共部分并插入到页面中
$(function () {
    const logoImgUrl = '../../../resources/images/logo-64×64.png';
    // 个人信息下拉菜单项
    const userMenu = [
        ['退出登录', namespace.rootUrl + 'j_spring_security_logout', 'common'],
        ['个人中心', '../common/userInfo', 'common'],
        ['作业管理', '../studentPages/homework', 'student'],
        ['我的书架', ',../studentPages/bookshelf', 'student'],
        ['管理界面', '../teacherPages/classPage', 'teacher'],
        ['管理界面', '../adminPages/class', 'admin'],
    ]
    // 管理页面侧边栏菜单项
    const siderMenu = {
        '我的班级': ['./classPage', 'group', 'teacher'],
        '书架管理': ['./shelfPage', 'book', 'teacher'],
        '校园书库': ['./storePage', 'bars', 'teacher'],
        '作业管理': ['./homeworkManagement', 'file-text-o', 'teacher'],
        '班级管理': ['./class', 'graduation-cap', 'admin'],
        '用户管理': ['./user', 'group', 'admin'],
        '书籍管理': ['./book', 'book', 'admin'],
        '统计信息': ['./statistic', 'bar-chart', 'admin'],
    };
    let userRole = '';
    let userName = '';
    let userAvatar = ''

    init();

    function init() {
        namespace.actions.getUserInfo(userInfo => {
            userRole = userInfo['userRole'];
            userName = userInfo['userName'];
            userAvatar = userInfo['avatar'];

            setHeader();
            setSider();

            namespace['userInfo'] = userInfo;
        });
    }

    function setHeader() {
        // 学生和公用页面的顶部栏
        let $header = $('.header');
        // 教师和管理员页面的顶部栏
        let $mainBodyHeader = $('.main-body-header');
        // 个人中心和书架
        if ($header.length !== 0 && $header.html() === '') {
            $header.append(
                $('<div />').addClass('logo').attr('id', 'header-logo'),
                $('<div />').addClass('user-info'),
            );
            setLogo();
            setUserInfo();
        }
        // 管理
        if ($mainBodyHeader.length !== 0 && $mainBodyHeader.html() === '') {
            $mainBodyHeader.append(
                $('<div />').addClass('user-info'),
            );
            setUserInfo();
        }
    }

    function setSider() {
        let $sider = $('.sider');

        if ($sider.length === 0 || $sider.html() !== '') return;

        $sider.append(
            $('<div />').addClass('logo').attr('id', 'sider-logo'),
            $('<div />').addClass('sider-menu').attr('id', 'sider-menu'),
        );
        setLogo();
        setSiderMenu();
    }

    // 辅助函数

    function setUserInfo() {
        let $userInfo = $('.user-info');

        if ($userInfo.length === 0 || $userInfo.html() !== '') return;

        let $button = $('<button />', {
            'class': 'btn btn-outline-secondary dropdown-toggle userinfo-dropdown',
            'data-toggle': 'dropdown',
            'id': 'userinfo-dropdown',
        }).append(
            $('<img />', {
                'class': 'userInfo-userAvatar',
                'id': 'userInfo-userAvatar',
                'src': userAvatar
            }),
            $('<span />', {
                'id': 'userInfo-userName',
            }).text(userName),
        )

        let $userMenu = $('<div />', {
            'class': 'userinfo-dropdown-menu dropdown-menu dropdown-menu-right',
            'id': 'userinfo-dropdown-menu',
        });

        for (let i = 0; i < userMenu.length; i++) {
            const item = userMenu[i];
            let href = item[1] + '.' + namespace['linkMode'];
            let role1 = item[2];
            let name = item[0];

            if (role1 === userRole || role1 === 'common') {
                let $menuItem = $('<a />').addClass('dropdown-item').text(name);
                if (name === '退出登录')
                    $menuItem.attr('href', item[1]);
                else
                    $menuItem.attr('href', href);

                if (name === document.title) {
                    $menuItem.addClass('disabled').attr('disabled', 'disabled');
                }
                if (name === '管理界面' && document.title === '我的班级') {
                    $menuItem.addClass('disabled').attr('disabled', 'disabled');
                }

                $userMenu.append($menuItem);
            }
        }

        let $dropdown = $('<div />').addClass('dropdown').append($button, $userMenu);
        $userInfo.append($dropdown);
    }

    function setLogo() {
        let $siderLogo = $('#sider-logo');
        let $headerLogo = $('#header-logo');

        if ($siderLogo.length !== 0 && $siderLogo.html() === '') {
            $siderLogo.append(
                $('<img />', {
                    'class': 'img-logo',
                    'src': logoImgUrl,
                }),
                $('<span />').text('智慧阅读平台'),
            );
        }

        if ($headerLogo.length !== 0 && $headerLogo.html() === '') {
            $headerLogo.append(
                $('<img />', {
                    'class': 'img-logo',
                    'src': logoImgUrl,
                }),
                $('<span />').text('智慧阅读平台'),
            );
        }
    }

    function setSiderMenu() {
        let $siderMenu = $('#sider-menu');

        if ($siderMenu.length === 0 || $siderMenu.html() !== '') return;

        let $ul = $('<ul />');

        for (let name in siderMenu) {
            let href = siderMenu[name][0] + '.' + namespace['linkMode'];
            let icon = 'fa fa-' + siderMenu[name][1];
            let role = siderMenu[name][2];

            if (userRole !== role) continue;

            let $li = $('<li />').append(
                $('<i />').addClass(icon),
                $('<a />').attr('href', href).text(name),
            );

            if (name === document.title) {
                $li.addClass('active');
                $li.find('a').removeAttr('href');
            }

            $ul.append($li);
        }

        $siderMenu.append($ul);
    }
});