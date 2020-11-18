$(function () {
    let action = namespace.actions['teacher'];
    let Table = namespace['func']['Table'];

    const tableHeaderInfo_management = {
        headerNameList: ['作业名称', '开始时间', '截止时间', '上交人数', '发布班级'],
        headerNameMapping: {
            '作业名称': 'homeworkName',
            '开始时间': 'startTime',
            '截止时间': 'limitTime',
            '上交人数': 'submitNumber',
            '发布班级': 'className',
        },
    };

    const tableQueryOptions_management = [
        {
            optionName: '所有班级',
            optionNameMapping: 'className',
            type: 'dropdown',
            getDropdownMenuDataFunc: action.getClassesHasHomework,
        },
        {
            optionName: '作业名称',
            optionNameMapping: 'homeworkName',
            type: 'text',
        },
    ];

    const tableBtnsMeta_management = {
        'names': ['发布作业', '删除作业', '修改作业', '批改作业'],
        'icons': ['file-text-o', 'trash-o', 'file-text-o', 'file-text-o'],
        'ids-suffix': ['addHomework', 'deleteHomework', 'modifyHomework', 'correctHomework'],
        'useableConditions': [0, 1, 1, 1],
    };

    const tableHeaderInfo_correction = {
        headerNameList: ['学生姓名', '班级', '提交时间', '作业状态', '得分'],
        headerNameMapping: {
            '学生姓名': 'userName',
            '班级': 'className',
            '提交时间': 'submitedTime',
            '作业状态': 'status',
            '得分': 'score',
        },
    };

    const tableQueryOptions_correction = [];

    const tableBtnsMeta_correction = {
        'names': ['批改作业'],
        'icons': ['file-text-o'],
        'ids-suffix': ['correctHomework-2'],
        'useableConditions': [1],
    };

    let getTableBtnsInfo = namespace['func']['getTableBtnsInfo'];

    const tableBtnsInfo_management = getTableBtnsInfo(tableBtnsMeta_management);
    const tableBtnsInfo_correction = getTableBtnsInfo(tableBtnsMeta_correction);

    let table_management = new Table(
        tableHeaderInfo_management,
        tableQueryOptions_management,
        action.getHomeworks,
        tableBtnsInfo_management,
    );
    let table_correction = new Table(
        tableHeaderInfo_correction,
        tableQueryOptions_correction,
        action.getHomeworkListSubmited,
        tableBtnsInfo_correction,
    );

    table_management.init();
    setListener();

    let getNames = namespace['func']['getNames'];
    let getIds = namespace['func']['getIds'];

    function setListener() {
        $('#table-btn-deleteHomework').click(e => {
            $('#modal-deleteHomework-span-homeworkName').text(getNames());
        });
        $('#modal-deleteHomework-btn-ok').click(e => {
            action.deleteHomework(getIds(), status => {
                if (status === false) {
                    alert('删除失败');
                }

                $('#table-btn-refreshPage').click();
            })
        });

        $('#table-btn-addHomework').click(e => {
            $('#modal-addHomework input').val('');
            $('#modal-addHomework textarea').val('');
            $('#modal-addHomework-dropdown-classList').html('').append(
                $('<div />', {
                    'class': 'form-control modal-classList-item',
                }).text('无可选班级'),
            )

            action.getClassesByTeacher(classList => {
                let $list = $('#modal-addHomework-dropdown-classList');

                if (classList.length !== 0) {
                    $list.html('');
                }

                for (let i = 0; i < classList.length; i++) {
                    $list.append(
                        $('<div />', {
                            'class': 'modal-classList-item',
                            'data-item-id': classList[i]['id'],
                        }).text(classList[i]['className'])
                    );
                }
            })
        });
        $('#modal-addHomework-dropdown-classList').click(e => {
            let $div = $(e.target);

            if ($div.hasClass('modal-classList-item')) {
                $div.toggleClass('selected');
            }
        });
        $('#modal-addHomework-btn-ok').unbind('click').click(e => {
            let alertMessage = '';
            let homeworkName = $('#modal-addHomework-input-homeworkName').val();
            let homeworkContent = $('#modal-addHomework-input-homeworkContent').val();
            let classIds = getClassIds();
            let limitDate = $('#modal-addHomework-input-limitDate').val();
            let limitTime = $('#modal-addHomework-input-limitTime').val();
            let file = $('#modal-addHomework-input-file')[0].files[0];

            if (homeworkName === '') alertMessage = '作业名不能为空';
            else if (homeworkName.length > 20) alertMessage = '作业名长度请控制在 20 个字符以内';
            else if (homeworkContent === '') alertMessage = '作业描述不能为空';
            else if (homeworkContent.length > 300) alertMessage = '作业描述的长度请控制在 300 个字符以内';
            else if (limitTime && verifyTimeFormat(limitTime)) alertMessage = '截止时间的格式不符合要求';
            else if (file && file.sizes > 5 * 1024 * 1024) alertMessage = '文件大小请勿超过 5M';

            if (alertMessage !== '') {
                alert(alertMessage);
                return;
            }

            $('#modal-addHomework .modal-body > form').css('visibility', 'hidden');
            $('#modal-addHomework .uploading-container').removeAttr('hidden');
            $('#modal-addHomework-btn-ok').addClass('disabled').attr('disabled', 'disabled');

            action.addHomework(
                homeworkName,
                homeworkContent,
                classIds,
                limitDate + limitTime,
                file,
                status => {
                    if (status) {
                        $('#modal-addHomework').modal('hide').on('hidden.bs.modal', function () {
                            alert('上传成功');
                            $('#modal-addHomework').unbind('hidden.bs.modal'); // 可以用 one，而不是on
                        });
                        $('#table-btn-refreshPage').click();
                    } else {
                        alert('发布失败');
                    }

                    $('#modal-addHomework .modal-body > form').removeAttr('style');
                    $('#modal-addHomework .uploading-container').attr('hidden', 'hidden');
                    $('#modal-addHomework-btn-ok').removeClass('disabled').removeAttr('disabled');
                },
            )

            $('#table-btn-refresh').click();

            function getClassIds() {
                let $selecteds = $('#modal-addHomework-dropdown-classList .modal-classList-item.selected');
                let idArray = [];

                for (let i = 0; i < $selecteds.length; i++) {
                    let $selected = $($selecteds[i]);
                    idArray.push($($selecteds[i]).attr('data-item-id'));
                }

                return idArray.join(',');
            }

            function verifyTimeFormat(time) {
                let array = time.split(':');

                if (array.length !== 3) return false;

                for (let i = 0; i < array.length; i++) {
                    if (isNaN(array[i])) return false;
                }

                return true;
            }
        });

        $('#table-btn-modifyHomework').click(e => {
            $('#modal-modifyHomework input').val('');
            $('#modal-modifyHomework textarea').val('');
            $('#modal-modifyHomework-dropdown-classList').html('').append(
                $('<div />', {
                    'class': 'form-control modal-classList-item',
                }).text('无可选班级'),
            )

            action.getClassesByTeacher(classList => {
                let $list = $('#modal-modifyHomework-dropdown-classList');

                if (classList.length !== 0) {
                    $list.html('');
                }

                for (let i = 0; i < classList.length; i++) {
                    $list.append(
                        $('<div />', {
                            'class': 'modal-classList-item',
                            'data-item-id': classList[i]['id'],
                        }).text(classList[i]['className'])
                    );
                }
            });

            action.getHomeworkInfo(getIds(), homeworkInfo => {
                $('#modal-modifyHomework-input-homeworkName').val(homeworkInfo['homeworkName']);
                $('#modal-modifyHomework-input-homeworkContent').val(homeworkInfo['homeworkContent']);

                let classList = [];
                if (homeworkInfo['classesName'] !== null) {
                    classList = homeworkInfo['classesName'].split(',')
                }
                for (let i = 0; i < classList.length; i++) {
                    let className = classList[i];
                    $(`#modal-modifyHomework-dropdown-classList .modal-classList-item:contains(${className})`).addClass('selected');
                }

                let time = homeworkInfo['deadtime'].split(' ')[0];
                $('#modal-modifyHomework-input-limitDate').val(time);

                if (homeworkInfo['sourceLink'] !== null) {
                    $('#modal-modifyHomework-input-file').prev('.sourceLink').remove();
                    $('#modal-modifyHomework-input-file').before(
                        $('<a/>', {
                            'href': namespace.rootUrl + 'account/' + homeworkInfo['sourceLink'],
                            'class': 'd-block mb-2 sourceLink',
                        }).text('之前上传的附件')
                    )
                }
            })
        });
        $('#modal-modifyHomework-dropdown-classList').click(e => {
            let $div = $(e.target);

            if ($div.hasClass('modal-classList-item')) {
                $div.toggleClass('selected');
            }
        });
        $('#modal-modifyHomework-btn-ok').unbind('click').click(e => {
            let alertMessage = '';
            let homeworkName = $('#modal-modifyHomework-input-homeworkName').val();
            let homeworkContent = $('#modal-modifyHomework-input-homeworkContent').val();
            let classIds = getClassIds();
            let limitDate = $('#modal-modifyHomework-input-limitDate').val();
            let file = $('#modal-modifyHomework-input-file')[0].files[0];

            if (homeworkName === '') alertMessage = '作业名不能为空';
            else if (homeworkName.length > 20) alertMessage = '作业名长度请控制在 20 个字符以内';
            else if (homeworkContent === '') alertMessage = '作业描述不能为空';
            else if (homeworkContent.length > 300) alertMessage = '作业描述的长度请控制在 300 个字符以内';
            else if (file && file.sizes > 5 * 1024 * 1024) alertMessage = '文件大小请勿超过 5M';

            if (alertMessage !== '') {
                alert(alertMessage);
                return;
            }

            $('#modal-modifyHomework .modal-body > form').css('visibility', 'hidden');
            $('#modal-modifyHomework .uploading-container').removeAttr('hidden');
            $('#modal-modifyHomework-btn-ok').addClass('disabled').attr('disabled', 'disabled');

            action.updateHomeWork(
                getIds(),
                homeworkName,
                homeworkContent,
                classIds,
                limitDate,
                file,
                status => {
                    if (status) {
                        $('#modal-modifyHomework').modal('hide').on('hidden.bs.modal', function () {
                            alert('修改成功');
                            $('#modal-modifyHomework').unbind('hidden.bs.modal');
                        });
                        $('#table-btn-refreshPage').click();
                    } else {
                        alert('修改失败');
                    }

                    $('#modal-modifyHomework .modal-body > form').removeAttr('style');
                    $('#modal-modifyHomework .uploading-container').attr('hidden', 'hidden');
                    $('#modal-modifyHomework-btn-ok').removeClass('disabled').removeAttr('disabled');
                },
            )

            $('#table-btn-refresh').click();

            function getClassIds() {
                let $selecteds = $('#modal-modifyHomework-dropdown-classList .modal-classList-item.selected');
                let idArray = [];

                for (let i = 0; i < $selecteds.length; i++) {
                    let $selected = $($selecteds[i]);
                    idArray.push($($selecteds[i]).attr('data-item-id'));
                }

                return idArray.join(',');
            }
        });

        $('#table-btn-correctHomework').click(e => {
            $('#nav-homeworkManagement').removeClass('active');
            $('#nav-studentCorrention').addClass('active').text('批改作业');
            table_correction.init([getIds()]);
            setListener();
        });
        $('#nav-homeworkManagement').click(e => {
            if ($('#nav-homeworkManagement').hasClass('active')) return;
            $('#nav-homeworkManagement').addClass('active');
            $('#nav-studentCorrention').removeClass('active').text('');
            table_management.init();
            setListener();
        });

        $('#table-btn-correctHomework-2').click(e => {
            let studentId = getIds().split(',')[0];
            let homeworkId = getIds().split(',')[1];
            $('#modal-correctHomework-file').html('');
            $('#modal-correctHomework-input-grade').html('');
            $('modal-correctHomework-input-comment').html('');
            action.getAnswerByIds(homeworkId, studentId, data => {
                if (data['answer']) {
                    $('#modal-correctHomework-answer').html('').append(
                        $('<span class="font-weight-bold" />').text('学生的答案：'),
                        $('<span />').text(data['answer']),
                    );
                }
                if (data['file']) {
                    $('#modal-correctHomework-file').html('').append(
                        $('<span class="font-weight-bold" />').text('学生的文件：'),
                        $('<a />', {
                            'href': data['file'],
                        }).text('点击下载'),
                    );
                }
            });
        });
        $('#modal-correctHomework-btn-ok').unbind('click').click(e => {
            let studentId = getIds().split(',')[0];
            let homeworkId = getIds().split(',')[1];

            let score = $('#modal-correctHomework-input-grade').val();
            let comment = $('#modal-correctHomework-input-comment').val();

            if (score === '') {
                alert('请填写分数');
                return
            }

            if (comment.length > 1500) {
                alert('评语请勿超过1500字');
                return
            }

            action.checkAnswer(homeworkId, studentId, score, comment, status => {
                if (status) {
                    $('#modal-correctHomework-2 input').val('');
                    $('#table-btn-refreshPage').click();
                    alert('批改成功');
                } else {
                    alert('批改失败');
                }
            });
        })
    }
})