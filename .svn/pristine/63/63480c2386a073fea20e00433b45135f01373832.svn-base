$(function () {
    const action = namespace['actions']['bookRead'];
    const ee = namespace['o']['ee'];

    class AnnotationInfoManager {
        constructor(config) {
            this.annManager = config.annManager;
            this.operable = true;
        }

        init() {
            this._setListener();
        }

        updateReplyList(annotation, $replyList) {
            $replyList.empty();

            let comments = this.annManager.comments[annotation.Id] || [];
            for (let i = 0; i < comments.length; i++) {
                let item = comments[i];
                let $replyItem = $('<div/>').addClass('annotation-info-item-reply-item').attr('data-comment-id', item['commentId']);
                let $replyItemInfo = $('<div/>').addClass('annotation-info-item-reply-item-info');
                $replyItemInfo.append(
                    $('<span/>').addClass('reply-from').text(item.fromName).attr('data-userId', item.fromId)
                );
                if (item.toId !== undefined) {
                    $replyItemInfo.append(
                        $('<span/>').addClass('reply-to').text(item.toName)
                    );
                }
                $replyItemInfo.append(
                    $('<span/>').addClass('').text('：')
                );

                $replyItemInfo.append(
                    $('<p/>').addClass('reply-content').text(item.content),
                );

                let $replyOperation = $('<div/>').addClass('reply-operation');
                let $span = $('<span/>');
                if (item.fromName === this.annManager.currentUserName) {
                    $span.addClass('btn-delete-reply').text('删除');
                } else {
                    $span.addClass('btn-reply-reply').text('回复');
                }
                $replyOperation.append($span);
                $replyItemInfo.append($replyOperation);

                if (item['imageUrl'] !== undefined) {
                    const prefix = namespace['rootUrl'] + 'account/';
                    $replyItemInfo.append(
                        $('<img/>').addClass('reply-image').attr('src', prefix + item['imageUrl'])
                    )
                }

                $replyItem.append(
                    $replyItemInfo,
                    $('<div/>').append(
                        $('<span/>').addClass('reply-time').text(item.time)
                    )
                );

                $replyList.append($replyItem);
            }
        }

        getItem(annotation) {
            const userAvatarUrl = 'https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/人.png';
            const userName = annotation.author;
            let $divItem = $('<div/>').addClass('annotation-info-item')
                .attr('data-annotation-id', annotation.Id);

            let $divUserInfo = $('<div/>').addClass('annotation-info-item-user-info');
            $divUserInfo.append(
                $('<img/>').addClass('user-avatar').attr('src', userAvatarUrl),
                $('<span/>').addClass('user-name').text(userName)
            );
            $divItem.append($divUserInfo);

            let $divBody = $('<div/>').addClass('annotation-info-item-body');

            const $img = $('<img />').attr('id','annotation-info-item-body-annotation-content-img');
            if (annotation.image !== undefined) {
                $img.attr('src', namespace.rootUrl + annotation.image);
            }

            $divBody.append(
                $('<p/>').addClass('annotation-info-item-body-time').text(annotation.time),
                $('<p/>').addClass('annotation-info-item-body-origin-text').text(annotation.text),
                $('<p/>').addClass('annotation-info-item-body-annotation-content').text(annotation.content),
                $('<textarea />').addClass('annotation-info-item-body-annotation-content-change')
                    .attr('placeholder', '你的批注').attr('hidden', true),
                $img,
                $('<div />').attr('id', 'annotation-info-item-body-annotation-content-change-img-content'),
                $('<input/>', {
                    'type': 'file',
                    'accept': '.png,.jpg',
                    'hidden': 'hidden'
                }).attr('id', 'annotation-info-item-body-annotation-content-change-img'),
                $('<div/>').addClass('annotation-info-item-body-annotation-content-btns').append(
                    $('<button/>').addClass('btn btn-primary btn-sm btn-add-annotation').text('添加批注')
                ),
                $('<div/>').addClass('annotation-info-item-body-annotation-like-count').append(
                    $('<i/>').addClass('fa btn-like-it').addClass(annotation.isLike ? 'fa-heart' : 'fa-heart-o'),
                    $('<span/>').addClass('span-like-count').attr('id', 'like-it').text(annotation.like),
                ),
                $('<span/>').addClass('btn-reply-annotation').text('回复')
            );

            if (annotation.author !== this.annManager.currentUserName) {
                $divBody.find('.btn-add-annotation, .annotation-info-item-body-annotation-content-change').remove();
            }
            if (annotation.content !== '' && annotation.author === this.annManager.currentUserName) {
                $divBody.find('.btn-add-annotation').removeClass('btn-add-annotation').addClass('btn-change-annotation').text('修改批注')
                    .before(
                        $('<button/>').addClass('btn btn-danger btn-sm btn-delete-annotation').text('删除批注')
                    )
            }
            $divItem.append($divBody);

            let $yourReply = $('<div/>').addClass('annotation-info-item-your-reply');
            $yourReply.append(
                // $('<input placeholder="你的回复"/>').addClass('annotation-info-item-your-reply-input'),
            );
            $divItem.append($yourReply);

            let $replyList = $('<div/>').addClass('annotation-info-item-reply-list');
            this.updateReplyList(annotation, $replyList);
            $divItem.append($replyList);

            return $divItem;
        }

        _setListener() {
            ee.on('userName-changed-1', (userName) => {
                ee.emit('unselection');
                if (userName === this.annManager.currentUserName) {
                    $('#classes .btn-begin-read').attr('disabled', true).removeClass('btn-primary').addClass('btn-outline-primary');
                    this.operable = true;
                } else {
                    $('#classes .btn-begin-read').removeAttr('disabled').removeClass('btn-outline-primary').addClass('btn-primary');
                    this.operable = false;
                }
            });

            ee.on('selection', range => {
                $('#annotation-info-btn-underline').removeClass('btn-outline-primary');
                $('#annotation-info-btn-underline').addClass('btn-primary');
                if (this.operable) $('#annotation-info-btn-underline').removeAttr('disabled')

            }).on('unselection', () => {
                $('#annotation-info-btn-underline').attr('disabled', true).removeClass('btn-primary').addClass('btn-outline-primary');
            });

            ee.on('annotation-selected', annId => {
                log('annotation-selected annId=' + annId);
                this.annManager.updateColor(annId, '#fd7e14');
                $('#annotation-info-btn-delete').removeClass('btn-outline-danger').addClass('btn-danger');
                if (this.operable) $('#annotation-info-btn-delete').removeAttr('disabled')

                $('#annotation-info-body').append(this.getItem(this.annManager.getAnnotation(annId)));
                $('button.btn-add-annotation').click();
            }).on('annotation-unselected', annId => {
                log('annotation-unselected');
                if (this.annManager.getAnnotation(annId).author === this.annManager.currentUserName) {
                    this.annManager.updateColor(annId, '#03A9F4');
                } else {
                    this.annManager.updateColor(annId, 'gray');
                }
                $('#annotation-info-btn-delete').attr('disabled', true).removeClass('btn-danger').addClass('btn-outline-danger');
                $('#annotation-info-body').empty();
            });

            $('#annotation-info-body').click(e => {
                let $target = $(e.target);
                let $annItem = $target.closest('.annotation-info-item');
                let annId = $annItem.attr('data-annotation-id');
                if ($target.hasClass('btn-add-annotation')) {
                    let $textarea = $annItem.find('.annotation-info-item-body-annotation-content-change');
                    $textarea.removeAttr('hidden');
                    $target.removeClass('btn-add-annotation btn-change-annotation')
                        .addClass('btn-change-annotation-ok').text('确认')
                        .before(
                            $('<button/>').addClass('btn btn-info btn-sm btn-change-annotation-img').text('图片'),
                            $('<button/>').addClass('btn btn-secondary btn-sm btn-change-annotation-cancel').text('取消')
                        );
                } else if ($target.hasClass('btn-change-annotation-ok')) {
                    let $textarea = $annItem.find('.annotation-info-item-body-annotation-content-change');
                    let file = $('#annotation-info-item-body-annotation-content-change-img')[0].files[0];
                    this.annManager.setAnnotationContent(annId, $textarea.val(), file);
                    $textarea.attr('hidden', true);
                    let $content = $annItem.find('.annotation-info-item-body-annotation-content');
                    $content.text($textarea.val());
                    $textarea.val('');
                    $annItem.find('.annotation-info-item-body-annotation-content').removeAttr('hidden');
                    let $btns = $annItem.find('.annotation-info-item-body-annotation-content-btns');
                    $btns.empty();
                    if ($content.text() === '' && file === undefined) {
                        $btns.append(
                            $('<button/>').addClass('btn btn-primary btn-sm btn-add-annotation').text('添加批注')
                        );
                    } else {
                        $btns.append(
                            $('<button/>').addClass('btn btn-danger btn-sm btn-delete-annotation').text('删除批注'),
                            $('<button/>').addClass('btn btn-primary btn-sm btn-change-annotation').text('修改批注')
                        )
                    }
                    $('#annotation-info-item-body-annotation-content-change-img-content').text('');
                    $('#annotation-info-item-body-annotation-content-change-img').val('');
                } else if ($target.hasClass('btn-change-annotation-cancel')) {
                    let $btns = $target.parent();
                    $btns.empty();
                    let $textarea = $annItem.find('.annotation-info-item-body-annotation-content-change');
                    $textarea.val('').attr('hidden', true);
                    $annItem.find('.annotation-info-item-body-annotation-content').removeAttr('hidden');
                    if (this.annManager.getAnnotation(annId).content === '') {
                        $btns.append(
                            $('<button/>').addClass('btn btn-primary btn-sm btn-add-annotation').text('添加批注')
                        );
                    } else {
                        $btns.append(
                            $('<button/>').addClass('btn btn-danger btn-sm btn-delete-annotation').text('删除批注'),
                            $('<button/>').addClass('btn btn-primary btn-sm btn-change-annotation').text('修改批注')
                        )
                    }
                    $('#annotation-info-item-body-annotation-content-change-img-content').text('');
                    $('#annotation-info-item-body-annotation-content-change-img').val('');
                } else if ($target.hasClass('btn-change-annotation')) {
                    let $textarea = $annItem.find('.annotation-info-item-body-annotation-content-change');
                    let $content = $annItem.find('.annotation-info-item-body-annotation-content').attr('hidden', true);
                    $annItem.find('.btn-delete-annotation').remove();
                    $textarea.removeAttr('hidden');
                    $textarea.val($content.text());
                    $target.removeClass('btn-add-annotation btn-change-annotation')
                        .addClass('btn-change-annotation-ok').text('确认')
                        .before(
                            $('<button/>').addClass('btn btn-info btn-sm btn-change-annotation-img').text('图片'),
                            $('<button/>').addClass('btn btn-secondary btn-sm btn-change-annotation-cancel').text('取消')
                        );
                } else if ($target.hasClass('btn-delete-annotation')) {
                    this.annManager.setAnnotationContent(annId, '');
                    let $content = $annItem.find('.annotation-info-item-body-annotation-content');
                    $content.text('');
                    let $btns = $annItem.find('.annotation-info-item-body-annotation-content-btns');
                    $btns.empty().append(
                        $('<button/>').addClass('btn btn-primary btn-sm btn-add-annotation').text('添加批注')
                    );
                } else if ($target.hasClass('btn-like-it')) {
                    if ($target.hasClass('fa-heart-o')) {
                        this.annManager.like(annId);
                        $target.removeClass('fa-heart-o').addClass('fa-heart');
                        $('#annotation-info-body').empty().append(this.getItem(this.annManager.getAnnotation(annId)));
                    } else {
                        this.annManager.unlike(annId);
                        $target.removeClass('fa-heart').addClass('fa-heart-o');
                        $('#annotation-info-body').empty().append(this.getItem(this.annManager.getAnnotation(annId)));
                    }
                } else if ($target.hasClass('btn-reply-annotation')) {
                    let $yourReplay = $annItem.find('.annotation-info-item-your-reply');
                    if ($yourReplay.children().length !== 0) {
                        $yourReplay.empty();
                        return;
                    }
                    let textarea = $('<textarea placeholder="你的回复"/>').addClass('annotation-info-item-your-reply-textarea')
                    $yourReplay.append(
                        $('<div/>').addClass('image-attachment').append(
                            $('<span/>').addClass('image-attachment-content')
                        ),
                        textarea,
                        $('<div/>').addClass('annotation-info-item-your-reply-btns').append(
                            $('<buttom/>').addClass('btn btn-primary btn-sm btn-your-reply-upload-image').text('添加/修改图片附件'),
                            $('<button/>').addClass('btn btn-secondary btn-sm btn-your-reply-cancel').text('取消'),
                            $('<button/>').addClass('btn btn-primary btn-sm btn-your-reply-ok').text('确定')
                        ),
                        $('<input/>', {
                            'type': 'file',
                            'class': 'input-upload-image',
                            'accept': '.png,.jpg',
                            'hidden': 'hidden'
                        }).change(e => {
                            const files = $(e.target)[0].files;
                            let content = '';
                            if (files.length !== 0) {
                                if (files[0]['size'] > (2 * 1024 * 1024)) {
                                    alert('图片不得大于2M，请压缩后再试');
                                    $(e.target).val('');
                                }
                                content = '图片附件：' + files[0]['name'];
                            }
                            $yourReplay.find('.image-attachment-content').text(content);
                        })
                    );
                    textarea.focus();
                } else if ($target.hasClass('btn-your-reply-cancel')) {
                    $annItem.find('.annotation-info-item-your-reply-textarea').val('');
                    $annItem.find('.annotation-info-item-your-reply').empty();
                } else if ($target.hasClass('btn-your-reply-ok')) {
                    let $yourReplay = $annItem.find('.annotation-info-item-your-reply');
                    let content = $annItem.find('.annotation-info-item-your-reply-textarea').val();
                    let files = $yourReplay.find('.input-upload-image')[0].files;
                    if (content === '' && files.length === 0) {
                        alert('评论内容不能为空');
                        return;
                    }
                    let file = null;
                    if (files.length !== 0) {
                        file = files[0];
                    }
                    this.annManager.addComment(annId, content, 'reply-annotation', '', '', file);
                    $annItem.find('.annotation-info-item-your-reply').empty();
                    this.updateReplyList(
                        this.annManager.getAnnotation(annId),
                        $annItem.find('.annotation-info-item-reply-list')
                    );
                } else if ($target.hasClass('btn-delete-reply')) {
                    let commentId = $target.closest('[data-comment-id]').attr('data-comment-id');
                    this.annManager.deleteComment(commentId);
                    this.updateReplyList(
                        this.annManager.getAnnotation(annId),
                        $annItem.find('.annotation-info-item-reply-list')
                    );
                } else if ($target.hasClass('btn-reply-reply')) {
                    let $commentItem = $target.parent().parent();
                    let $reply = $commentItem.find('.annotation-info-item-reply-item-reply-reply');
                    if ($reply.length !== 0) {
                        $reply.remove();
                    } else {
                        $commentItem.append(
                            $('<div/>').addClass('annotation-info-item-reply-item-reply-reply').append(
                                $('<div/>').addClass('image-attachment').append(
                                    $('<span/>').addClass('image-attachment-content')
                                ),
                                $('<textarea placeholder="你的回复"/>').addClass('annotation-info-item-reply-item-textarea'),
                                $('<div/>').addClass('annotation-info-item-reply-item-btns').append(
                                    $('<button/>').addClass('btn btn-secondary btn-sm btn-reply-reply-upload-image').text('添加/修改图片附件'),
                                    $('<button/>').addClass('btn btn-secondary btn-sm btn-reply-reply-cancel').text('取消'),
                                    $('<button/>').addClass('btn btn-primary btn-sm btn-reply-reply-ok').text('确定'),
                                ),
                                $('<input/>', {
                                    'type': 'file',
                                    'class': 'input-upload-image',
                                    'accept': '.png,.jpg',
                                    'hidden': 'hidden'
                                }).change(e => {
                                    const files = $(e.target)[0].files;
                                    let content = '';
                                    if (files.length !== 0) {
                                        if (files[0]['size'] > (2 * 1024 * 1024)) {
                                            alert('图片不得大于2M，请压缩后再试');
                                            $(e.target).val('');
                                        }
                                        content = '图片附件：' + files[0]['name'];
                                    }
                                    $commentItem.find('.image-attachment-content').text(content);
                                })
                            )
                        )
                    }
                } else if ($target.hasClass('btn-reply-reply-cancel')) {
                    $target.closest('.annotation-info-item-reply-item-reply-reply').remove();
                } else if ($target.hasClass('btn-reply-reply-ok')) {
                    let $commentItem = $target.closest('.annotation-info-item-reply-item');
                    let content = $commentItem.find('.annotation-info-item-reply-item-textarea').val();
                    let files = $commentItem.find('.input-upload-image')[0].files;
                    if (content === '' && files.length === 0) {
                        alert('回复不能为空');
                        return;
                    }
                    let toId = $commentItem.find('.reply-from').attr('data-userId');
                    let toName = $commentItem.find('.reply-from').text();
                    let file = null;
                    if (files.length !== 0) {
                        file = files[0];
                    }
                    this.annManager.addComment(annId, content, 'reply-reply', toId, toName, file);
                    this.updateReplyList(
                        this.annManager.getAnnotation(annId),
                        $annItem.find('.annotation-info-item-reply-list')
                    );
                } else if ($target.hasClass('btn-your-reply-upload-image')) {
                    $(e.target).parent().nextAll('input').click();
                } else if ($target.hasClass('btn-reply-reply-upload-image')) {
                    $(e.target).parent().nextAll('input').click();
                } else if ($target.hasClass('btn-change-annotation-img')) {
                    $('#annotation-info-item-body-annotation-content-change-img').change(e => {
                        const files = $(e.target)[0].files;
                        let content = '';
                        if (files.length !== 0) {
                            if (files[0]['size'] > (2 * 1024 * 1024)) {
                                alert('图片不得大于2M，请压缩后再试');
                                $(e.target).val('');
                            }
                            content = '图片附件：' + files[0]['name'];
                        }
                        $('#annotation-info-item-body-annotation-content-change-img-content').text(content);
                    }).click();
                }
            });
        }
    }

    namespace['func']['AnnotationInfoManager'] = AnnotationInfoManager;
})
