$(function () {
    let action = namespace.actions['teacher'];
    let Table = namespace['func']['Table'];
    
    // 班级管理配置
    const tableHeaderInfo_classManagement = {
        headerNameList: ['班级名', '学生数', '创建时间'],
        headerNameMapping: {
            '班级名': 'className',
            '学生数': 'studentNumber',
            '创建时间': 'createTime',
        },
    };
    
    const tableQueryOptions_classManagement = [
        {
            optionName: '班级名',
            optionNameMapping: 'className',
            type: 'text',
        },
    ];
    
    const tableBtnsMeta_classManagement = {
        'names': ['添加班级', '删除班级', '添加学生', '移除学生', '推送书籍', '移除书籍'],
        'icons': ['plus-circle', 'minus-circle', 'plus-circle', 'minus-circle', 'plus-circle', 'minus-circle'],
        'ids-suffix': ['addClass', 'deleteClass', 'addStudent', 'deleteStudent', 'pushBook', 'deleteBook'],
        'useableConditions': [0, 2, 1, 1, 1, 1],
    }
    
    
    let getTableBtnsInfo = namespace['func']['getTableBtnsInfo'];
    const tableBtnsInfo_classManagement = getTableBtnsInfo(tableBtnsMeta_classManagement);
    
    let table_classManagement = new Table(
        tableHeaderInfo_classManagement,
        tableQueryOptions_classManagement,
        action.getClasses,
        tableBtnsInfo_classManagement,
    );
    
    table_classManagement.init();
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
    
    function setListener() {
        // 添加班级
        $('#table-btn-addClass').click(e => {
            $('#modal-addClass-input-className').val('')
        });
        $('#modal-addClass-btn-ok').click(e => {
            let className = $('#modal-addClass-input-className').val();
            
            if (className === '') {
                alert('请输入班级名');
                return false;
            }
            
            action.addClass(className, status => {
                $('#table-btn-refreshPage').click();
            });
        });
        
        // 删除班级
        $('#table-btn-deleteClass').click(e => {
            $('#modal-deleteClass-span-className').text(getNames());
        });
        $('#modal-deleteClass-btn-ok').click(e => {
            let $trs = $('#table-content-body input:checked').closest('tr');
            
            for (let i = 0; i < $trs.length; i++) {
                let $tr = $($trs[i]);
                let studentNumber = +$tr.find('td:eq(3)').text();
                let className = $tr.find('td:eq(2)').text();
                if (studentNumber !== 0) {
                    alert(`班级 ${className} 存在学生，不能被删除！`);
                    return;
                }
            }
            
            action.deleteClass(getIds(), status => {
                $('#table-btn-refreshPage').click();
            });
        });
        
        let ids = ['addStudent', 'deleteStudent', 'pushBook', 'deleteBook'];
        let actionGetFuncs = [
            action.getStudentsNotInClass,
            action.getStudentsInClass,
            action.getBooksNotInClass,
            action.getBooksInClass,
        ];
        let actionOkFuncs = [
            action.addStudentsToClass,
            action.deleteStudentsFromClass,
            action.pushBooksToClass,
            action.deleteBooksFromClass,
        ];
        let attrsList = [
            ['name', 'code'],
            ['name', 'code'],
            ['name', 'author'],
            ['name', 'author'],
        ];
        
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let actionGetFunc = actionGetFuncs[i];
            let actionOkFunc = actionOkFuncs[i];
            let attrs = attrsList[i];
            
            $('#table-btn-' + id).click(e => {
                $('#modal-' + id + '-span-className').text(getNames());
                $('#modal-' + id + '-input-queryValue').val('');
                $('#modal-' + id + ' [type=checkbox]').prop('checked', false);
                
                actionGetFunc(getIds(), list => {
                    refreshTable('#modal-' + id + '-tbody-list', list, attrs);
                });
            });
            $('#modal-' + id + '-btn-ok').click(e => {
                let $trs = $('#modal-' + id + '-tbody-list input:checked').closest('tr');
                
                if ($trs.length === 0) {
                    alert('请选中至少一项');
                    return;
                }
                
                let classId = getIds();
                let ids = getIds($trs);
                actionOkFunc(classId, ids, status => {
                    $('#modal-' + id + '-input-checkAll').prop('checked', false);
                    actionGetFunc(getIds(), list => {
                        refreshTable('#modal-' + id + '-tbody-list', list, attrs);
                    });
                });
                // 模态框被隐藏后被调用
                $('#modal-' + id).on('hidden.bs.modal', e => {
                    $('#table-btn-refreshPage').click();
                    $('#modal-'+id).unbind('hidden.bs.modal');
                });
            });
            $('#modal-' + id + '-input-checkAll').click(e => {
                let checked = $(e.target).prop('checked');
                $('#modal-' + id + '-tbody-list input').prop('checked', checked);
            });
            $('#modal-' + id + '-input-queryValue')[0].oninput = e => {
                let value = $(e.target).val();
                let $trs = $('#modal-' + id + '-tbody-list tr');
                
                for (let i = 0; i < $trs.length; i++) {
                    let $tr = $($trs[i]);
                    if ($tr.find('td:eq(2)').text().indexOf(value) !== -1 || value === '') {
                        $tr.removeClass('hidden');
                    } else {
                        $tr.addClass('hidden');
                    }
                }
            };
        }
    }
})