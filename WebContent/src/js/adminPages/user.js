$(function () {
    let action = namespace.actions['teacher'];
    let Table = namespace['func']['Table'];
    
    // 老师管理配置
    const tableHeaderInfo_teacherManagement = {
        headerNameList: ['账号', '姓名'],
        headerNameMapping: {
            '账号': 'account',
            '姓名': 'name',
        },
    };
    
    const tableQueryOptions_teacherManagement = [
        {
            optionName: '教师姓名',
            optionNameMapping: 'name',
            type: 'text',
        },
    ];
    
    const tableBtnsMeta_teacherManagement = {
        'names': ['添加老师', '删除老师', '重置密码'],
        'icons': ['plus-circle', 'minus-circle', 'reply-all'],
        'ids-suffix': ['addUser', 'deleteUser', 'resetPassword'],
        'useableConditions': [0, 2, 2],
    }
    
    // 学生管理配置
    const tableHeaderInfo_studentManagement = {
        headerNameList: ['账号', '姓名', '班级'],
        headerNameMapping: {
            '账号': 'studentCode',
            '姓名': 'studentName',
            '班级': 'classList',
        },
    };
    
    const tableQueryOptions_studentManagement = [
        {
            optionName: '全部班级',
            optionNameMapping: 'classList',
            type: 'dropdown',
            getDropdownMenuDataFunc: action.getClassesHasStudent,
        },
        {
            optionName: '学生姓名',
            optionNameMapping: 'studentName',
            type: 'text',
        },
    ];
    
    const tableBtnsMeta_studentManagement = {
        'names': ['添加学生', '删除学生', '重置密码', '导出学生名单', '导入学生名单', '下载导入模板'],
        'icons': ['plus-circle', 'minus-circle', 'reply-all'],
        'ids-suffix': ['addUser', 'deleteUser', 'resetPassword', 'exportExcel', 'uploadExcel', 'downloadExcel'],
        'useableConditions': [0, 2, 2, 2, 0, 0],
    }
    
    let getTableBtnsInfo = namespace['func']['getTableBtnsInfo'];
    const tableBtnsInfo_teacherManagement = getTableBtnsInfo(tableBtnsMeta_teacherManagement);
    const tableBtnsInfo_studentManagement = getTableBtnsInfo(tableBtnsMeta_studentManagement);
    
    let table_teacherManagement = new Table(
        tableHeaderInfo_teacherManagement,
        tableQueryOptions_teacherManagement,
        action.getTeachers,
        tableBtnsInfo_teacherManagement,
    );
    
    let table_studentManagement = new Table(
        tableHeaderInfo_studentManagement,
        tableQueryOptions_studentManagement,
        action.getStudents,
        tableBtnsInfo_studentManagement,
    )
    
    table_teacherManagement.init();
    setListener();
    
    // 函数区 ===================================================
    
    let getNames = namespace['func']['getNames'];
    let getIds = namespace['func']['getIds'];
    
    function refreshTable(selector, list, attrs,) {
        let $tbody = $(selector).html('');
        
        for (let i = 0; i < list.length; i++) {
            let $tr = $('<tr />').attr('data-item-id', list[i]['id']).append(
                $('<td />').append(
                    $('<input />').attr('type', 'checkbox'),
                ),
                $('<td />').text(i + 1),
            );
            
            for (let j = 0; j < attrs.length; j++) {
                let attrName = attrs[j];
                $tr.append(
                    $('<td />').text(list[i][attrName]),
                );
            }
            
            $tbody.append($tr);
        }
    }
    
    $('#nav-teacherManagement').click(e => {
        let $nav = $(e.target);
        
        if ($nav.hasClass('active')) return;
        
        $('#nav-studentManagement').removeClass('active');
        $nav.addClass('active');
        
        $('#table-part').html('');
        table_teacherManagement.init();
        setListener();
    });
    $('#nav-studentManagement').click(e => {
        let $nav = $(e.target);
        
        if ($nav.hasClass('active')) return;
        
        $('#nav-teacherManagement').removeClass('active');
        $nav.addClass('active');
        
        $('#table-part').html('');
        table_studentManagement.init();
        setListener();
    });
    
    function setListener() {
        // 重置密码
        $('#table-btn-resetPassword').unbind('click').click(e => {
            $('#modal-resetPassword-span-names').text(getNames(3));
        });
        $('#modal-resetPassword-btn-ok').unbind('click').click(e => {
            action.resetPassword(getIds(), status => {
                $('#modal-resetPassword').modal('hide').on('hidden.bs.modal', function () {
                    if (status) {
                        alert('重置密码成功');
                    } else {
                        alert('重置密码失败');
                    }
                    $('#modal-resetPassword').unbind('hidden.bs.modal');
                });
            });
        });
        // 添加用户
        $('#table-btn-addUser').click(e => {
            $('#modal-addUser input').val('');
        });
        $('#modal-addUser-btn-ok').unbind('click').click(e => {
            e.stopPropagation();
            let name = $('#modal-addUser-input-name').val();
            let sex = $('#modal-addUser-input-sex').val();
            let account = $('#modal-addUser-input-account').val();
            
            let alertMessage = '';
            
            if (name === '') alertMessage = '请填写姓名';
            else if (sex === '') alertMessage = '请填写性别';
            else if (account === '') alertMessage = '请填写账号';
            else if (sex !== '男' && sex !== '女') alertMessage = '性别请填写男或女';
            
            if (alertMessage !== '') {
                alert(alertMessage);
                return;
            }
            
            let role = '';
            
            if ($('#nav-teacherManagement').hasClass('active')) role = 'teacher';
            else role = 'student';
            action.addUser(name, account, sex, role, status => {
                if (status) {
                    $('#modal-addUser').modal('hide');
                    $('#table-btn-refreshPage').click();
                    alert('添加成功');
                } else {
                    alert('添加失败');
                }
            })
        });
        // 删除用户
        $('#table-btn-deleteUser').click(e => {
            $('#modal-deleteUser-span-names').text(getNames(3));
        });
        $('#modal-deleteUser-btn-ok').unbind('click').click(e => {
            action.deleteUser(getIds(), status => {
                if (status) {
                    $('#modal-deleteUser').modal('hide');
                    $('#table-btn-refreshPage').click();
                    alert('删除成功');
                } else {
                    alert('删除失败');
                }
            })
        });
        
        $('#table-btn-downloadExcel').click(e => {
            action.getImportTemplate();
        });
        // 导入学生名单
        $('#table-btn-uploadExcel').click(e => {
            $('#modal-uploadExcel-input-file').val('');
        });
        $('#modal-uploadExcel-btn-ok').unbind('click').click(e => {
            let file = $('#modal-uploadExcel-input-file')[0].files[0];
            
            if (!file) {
                alert('请选择文件');
                return;
            }
            
            action.importStudentList(file, failList => {
                if (failList) {
                    $('#modal-uploadExcel').modal('hide');
                    $('#table-btn-refreshPage').click();
                    
                    if (JSON.stringify(failList) === '[{}]') {
                        alert('导入完成');
                    } else {
                        let str = '导入完成\n';
                        failList.forEach(item => {
                            for(let account in item){
                                str += `用户 ${item[account]}:${account} 导入失败\n`;
                            }
                        })
                        alert(str);
                    }
                } else {
                    alert('导入失败');
                }
            })
        });
        // 导出学生名单
        $('#table-btn-exportExcel').click(e => {
            action.exportStudentList('(' + getIds() + ')');
        })
        
    }
})