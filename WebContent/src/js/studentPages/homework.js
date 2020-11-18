$(function () {
    let action = namespace['actions']['student'];
    let homeworkList = [];

    action.getHomeworkList(list => {
        homeworkList = list;

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let $cardBody = $('<div class="card-body" />');
            let $homeworkListItem = $('<div />', {
                'class': 'homework-item px-2 py-2 col-12 col-md-4',
                'data-list-index': i,
                'data-homeworkId': item['id'],
            }).append(
                $('<div class="card" />').append($cardBody),
            );

            $cardBody.append(
                $('<h5 class="card-title" />').text(item['title']),
                $('<p class="card-text" />').append(
                    $('<small />').text('发布教师：' + item['teacher']),
                ),
                $('<p class="card-text" />').append(
                    $('<small />').text('开始时间：' + item['startTime']),
                ),
                $('<p class="card-text" />').append(
                    $('<small />').text('截止时间：' + item['limitTime']),
                ),
                $('<p class="card-text" />').append(
                    $('<small />').append(
                        $('<span />').text('作业状态：'),
                        $('<span class="font-weight-bold" />').text(item['status']),
                    ),
                ),
            );

            if (item['status'] === '已批改') {
                $cardBody.append(
                    $('<span />').append(
                        $('<span />').text('分数：'),
                        $('<span class="text-danger h5" />').text(item['score']),
                    ),
                );
            }

            if (item['status'] === '未做') {
                $cardBody.append(
                    $('<button class="btn btn-sm btn-primary float-right btn-do-homework" />').text('做作业'),
                );
            } else {
                $cardBody.append(
                    $('<button class="btn btn-sm btn-primary float-right btn-do-homework" />').text('查看'),
                );
            }

            $('#homework-list').append($homeworkListItem)
        }

        setListener();
    });

    function setListener() {
        $('#homework-list').click(e => {
            if (!$(e.target).hasClass('btn-do-homework')) return;
            if (homeworkList.length === 0) return;

            const homeworkTitle = $(e.target).parent().find('h5').text();
            $('#modal-doHomework .modal-header h5').text(homeworkTitle);

            $('#modal-doHomework-p-score').html('');
            $('#modal-doHomework-p-evaluation').html('');
            $('#modal-doHomework-a-homeworkFile').html('<span id="modal-doHomework-a-homeworkFile">无</span>');
            $('#modal-doHomework-p-myAnswer').html('');
            $('#modal-doHomework-p-myFile').html('');
            $('#modal-doHomework-input-answer').val('');
            $('#modal-doHomework-input-file').val('');

            let index = +$(e.target).closest('.homework-item').attr('data-list-index');
            let id = +$(e.target).closest('.homework-item').attr('data-homeworkId');
            let item = homeworkList[index];

            $('#modal-doHomework-p-homeworkContent').text(item['content']);
            $('#modal-doHomework-p-startTime').text(item['startTime']);
            $('#modal-doHomework-p-limitTime').text(item['limitTime']);
            $('#modal-doHomework').attr('data-homeworkId', id);

            if (item['file']) {
                $('#modal-doHomework-a-homeworkFile').replaceWith(
                    $('<a />', {
                        'href': item['file'],
                    }).text('点击下载')
                );
            }
            if (item['studentFile'] !== null) {
                $('#modal-doHomework-p-myFile').html('').append(
                    $('<span class="font-weight-bold" />').text('已提交的作业附件：'),
                    $('<a />', {
                        'href': item['studentFile'],
                    }).text('点击下载'),
                );
            }
            if (item['studentHomeworkContent']) {
                $('#modal-doHomework-p-myAnswer').html('').append(
                    $('<span class="font-weight-bold" />').text('已提交的作业内容：'),
                    $('<span />').text(item['studentHomeworkContent']),
                );
            }
            if (item['score'] !== null) {
                $('#modal-doHomework-p-score').append(
                    $('<span class="font-weight-bold" />').text('分数：'),
                    $('<span />').text(item['score']),
                );
                ;
            }
            if (item['evaluation'] !== null) {
                $('#modal-doHomework-p-evaluation').append(
                    $('<span class="font-weight-bold" />').text('评语：'),
                    $('<span />').text(item['evaluation']),
                );
            }

            if (item['status'] !== '' && item['status'] !== '已过期' && item['status'] !== '已批改') {
                $('#modal-doHomework-btn-ok').removeClass('disabled').removeAttr('disabled');
                $('#modal-doHomework-formGroup-input-file').removeAttr('hidden');
                $('#modal-doHomework-answer').removeAttr('hidden');
            } else {
                $('#modal-doHomework-btn-ok').addClass('disabled').attr('disabled', 'disabled');
                $('#modal-doHomework-formGroup-input-file').attr('hidden', 'hidden');
                $('#modal-doHomework-answer').attr('hidden', 'hidden');
            }

            $('#modal-doHomework').modal('show');
        });
        $('#modal-doHomework-btn-ok').click(e => {
            e.stopPropagation();
            let file = $('#modal-doHomework-input-file')[0].files[0];
            let id = +$('#modal-doHomework').attr('data-homeworkId');
            const answer = $('#modal-doHomework-input-answer').val();

            if (!file && answer === '') {
                alert('请选择文件或者填写答案。');
                return;
            }

            if (answer.length > 1500) {
                alert('答案请勿超过1500字');
                return;
            }

            action.submitHomework(id, file, answer, status => {
                if (status) {
                    alert('上传成功');
                    location.href = location.href;
                    // $('#modal-doHomework').modal('hide');
                } else {
                    alert('上传失败');
                }
            })
        })
    }
});