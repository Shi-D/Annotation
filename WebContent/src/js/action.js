$(function () {
    const prefix = namespace.rootUrl;

    const actionUrls = {
        prefix: prefix,
        getUserInfo: 'user/queryUserInfo.action',
        getReadedBooks: 'studentBook/studentRecentBook.action',
        getClasses: 'studentBook/studentBookInClass.action',
        getBooks: 'studentBook/studentClassBook.action',
        updateUserInfo: 'user/updateUserInfo.action',
        updateUserAvatar: 'user/uploadUserPhoto.action',
        updatePassword: 'user/updateCurrentUserPwd.action',

        bookRead: {
            getBookContent: 'books/booksContent.action',
            getCurrentUserName: 'user/getCurrentUserName.action',
            getAnnotations: 'annotations/studentBookAnnotationInfo.action',
            addAnnotation: 'annotations/addAnnotation.action',
            updateAnnotation: 'annotations/updateAnnotation.action',
            deleteAnnotation: 'annotations/deleteAnnotation.action',
            getComments: 'comment/lookOverComment.action',
            addComment: 'comment/addComment.action',
            deleteComment: 'comment/deleteComment.action',
            like: 'like/addAnnotationLike.action',
            unlike: 'like/deleteAnnotationLike.action',
            getClasses: 'annotations/classStudentList.action',
            pushPageInfo: 'page/addPage.action',
            markPage: 'page/addMark.action',
            lastPage: 'page/lastPage.action',
            bookmarkList: 'page/markPage.action',
            getAllStatistics: 'statistics/allStatistics.action',
        },

        teacher: {
            getClasses: 'classes/allClassesList.action',
            addClass: 'classes/addClass.action',
            deleteClass: 'classes/deleteClassesByClassIds.action',
            getStudentsInClass: 'classes/queryStudentInClass.action',
            getStudentsNotInClass: 'classes/queryStudentNotInClass.action',
            addStudentsToClass: 'classes/addStudentsToClass.action',
            deleteStudentsFromClass: 'user/removeStudentOfClass.action',
            getBooksInClass: 'books/queryBookInClass.action',
            getBooksNotInClass: 'books/queryBookNotInClass.action',
            pushBooksToClass: 'books/pushBooksToClass.action',
            deleteBooksFromClass: 'books/removeBooksFromClass.action',

            getStudents: 'user/allStudentsList.action',
            getClassesHasStudent: 'classes/allClassesWithoutNullStu.action',
            resetPassword: 'user/resetPassword.action',

            addBook: 'books/addBook.action',
            getBookshelfList: 'books/bookshelfManagement.action',
            getClassesHasBook: 'books/classesHaveBook.action',
            getExcel: 'excel/exportExcel.action',
            getImportTemplate: 'user/downloadTemplate.action',
            importStudentList: 'user/studentImport.action',
            exportStudentList: 'user/exportExcel.action',

            getBooks: 'books/allBooksList.action',
            deleteBook: 'books/deleteBook.action',

            getHomeworks: 'homework/allHomeworkList.action',
            getClassesHasHomework: 'homework/classHaveHW.action',
            deleteHomework: 'homework/deleteHomework.action',
            getClassesByTeacher: 'classes/classesByTeacherList.action',
            addHomework: 'homework/addHomework.action',
            getHomeworkContentById: 'homework/homeworkByHWId.action',
            getHomeworkListSubmited: 'homework/querySubmitedHomework.action',
            getAnswerByIds: 'homework/teaCorrectHomework.action',
            checkAnswer: 'homework/evaluateSubmitedHomework.action',

            getTeachers: 'user/teacherList.action',

            addUser: 'user/addUser.action',
            deleteUser: 'user/deleteUser.action',

            updateHomeWork: 'homework/modifyHomework.action',
            getHomeworkInfo: 'homework/getHomeworkInfo.action',
        },

        student: {
            getHomeworkList: 'homework/stuHomeworkList.action',
            submitHomework: 'homework/submitHomework.action',
        }
    }

    namespace['o']['actionUrls'] = actionUrls;

    function post(url, args, callback) {
        $.ajax({
            type: 'POST',
            url: prefix + url,
            data: args,
            success: res => callback(res),
            statusCode: {
                404: () => {
                    if (location.hostname !== 'localhost') {
                        // location.href = namespace.rootUrl + 'login.jsp';
                    }
                }
            }
        })
    }

    function syncPost(url, config) {
        let res;
        $.ajaxSettings.async = false;
        $.post(prefix + url, config, response => {
            res = response;
        }
        )
        $.ajaxSettings.async = true;

        return res;
    }

    namespace.actions = {
        getUserInfo: function (callback) {
            post(actionUrls.getUserInfo, {}, res => {
                let data = {};
                let info = res[0];
                let userTypeNumber = info['userType'];
                let type;

                data['userName'] = info['userName'] || null;

                if (userTypeNumber === undefined || userTypeNumber === null) {
                    type = null;
                } else if (userTypeNumber === 0) {
                    type = 'admin';
                } else if (userTypeNumber === 1) {
                    type = 'teacher';
                } else if (userTypeNumber === 2) {
                    type = 'student';
                }

                data['userRole'] = type || null;
                data['userRoleNumber'] = userTypeNumber || null;
                data['avatar'] = info['userPhotoName'] || null;
                data['phoneNumber'] = info['userPhone'] || null;
                data['email'] = info['userMail'] || null;
                data['introduction'] = info['userIntroduction'] || null;

                if (data['avatar'] !== null) {
                    data['avatar'] = prefix + 'account/' + data['avatar']
                }

                recordData({
                    'action.response.getUserInfoAction': res,
                    'action.data.getUserInfoAction': data,
                });

                callback(data);
            })
        },

        getReadedBooks: function (callback) {
            post(actionUrls.getReadedBooks, {}, res => {
                let data = [];

                for (let i = 0; i < res.length - 1; i++) {
                    let book = res[i];
                    data.push({
                        'name': book['bookName'] || null,
                        'author': book['bookAuthor'] || null,
                        'id': book['bookId'] || null,
                        'introduction': book['bookIntroduction'] || null,
                        'cover': namespace.rootUrl + 'upload/Pic/' + book['bookCover'],
                    })
                }

                recordData({
                    'action.response.getReadBooksAction': res,
                    'action.data.getReadBooksAction': 'data',
                })

                callback(data);
            });
        },

        getClasses: function (callback) {
            post(actionUrls.getClasses, {}, res => {
                let data = [];

                for (let i = 0; i < res.length; i++) {
                    let classItem = res[i];
                    data.push({
                        'id': classItem['classId'],
                        'name': classItem['className'],
                    });
                }

                recordData({
                    'action.response.etClassesAction': res,
                    'action.data.getClassesAction': data,
                });

                callback(data);
            })
        },

        getBooks: function (callback) {
            post(actionUrls.getBooks, {}, res => {
                let data = [];

                for (let i = 0; i < res.length; i++) {
                    let book = res[i];
                    data.push({
                        'name': book['bookName'],
                        'id': book['bookId'],
                        'author': book['bookAuthor'],
                        'introduction': book['bookIntroduction'],
                        'cover': namespace.rootUrl + 'upload/Pic/' + book['bookCover'],
                        'className': book['className'],
                    })
                }

                recordData({
                    'action.response.getBooksAction': res,
                    'action.data.getBooksAction': data,
                });

                callback(data);
            })
        },

        updateUserInfo: function (introduction, email, phoneNumber, callback) {
            let args = {
                'userIntroduction': introduction,
                'userMail': email,
                'userPhone': phoneNumber
            }

            post(actionUrls.updateUserInfo, args, res => {
                let status = res[0]['result'];

                recordData({
                    'action.response.updateUserInfo': res,
                    'action.data.updateUserInfo': status,
                }, {
                        introduction: introduction,
                        email: email,
                        phoneNumber: phoneNumber,
                    });

                callback(status);
            })
        },

        updateUserAvatar: function (file, callback) {
            let reader = new FileReader();
            let formPic = new FormData();
            reader.readAsDataURL(file);
            formPic.append("userPhoto", file)
            reader.onload = () => {
                $.ajax({
                    url: prefix + actionUrls.updateUserAvatar,
                    type: 'POST',
                    data: formPic,
                    processData: false,
                    contentType: false,
                    success: () => {
                        callback(true);
                        recordData({
                            'action.data.updateUserAvatar': {
                                status: true,
                            }
                        }, {
                                file: file
                            });
                    },
                    error: () => {
                        callback(false);
                        recordData({
                            'action.data.updateUserAvatar': {
                                status: false,
                            }
                        }, {
                                file: file
                            });
                    },
                });
            }
        },

        updatePassword: function (oldPassword, newPossword, repeatPassword, callback) {
            let args = {
                'originalPWD': oldPassword,
                'newPWD': newPossword,
                'confirmPWD': repeatPassword,
            };
            post(actionUrls.updatePassword, args, res => {
                let data = res[0]['result'];

                recordData({
                    'action.response.updatePassword': res,
                }, {
                        oldPassword: oldPassword,
                        newPossword: newPossword,
                        repeatPassword: repeatPassword,
                    });

                callback(data);
            })
        },

        bookRead: {
            addAnnotationAction(config) {
                const res = syncPost(actionUrls['bookRead'].addAnnotation, config);
                const id = res[0]['annotationId'];

                recordData({
                    'action.respose.addAnnotation': res,
                    'action.data.addAnnotation': {
                        id: id,
                    }
                }, {
                        config: config,
                    });

                return id;
            },

            addComment(config) {
                let formData = new FormData();
                for (let attrName in config) {
                    formData.append(attrName, config[attrName]);
                }

                $.ajaxSettings.processData = false;
                $.ajaxSettings.contentType = false;
                const res = syncPost(actionUrls['bookRead'].addComment, formData);
                $.ajaxSettings.processData = true;
                const status = res[0];

                recordData({
                    'action.respose.addComment': res,
                    'action.data.addComment': {
                        status: status,
                    },
                }, {
                        config: config,
                    });

                return status;
            },

            deleteAnnotationAction(annotationId) {
                const config = {
                    annotationId: annotationId,
                }

                const res = syncPost(actionUrls['bookRead'].deleteAnnotation, config);
                const status = res[0]['status'];

                recordData({
                    'action.respose.deleteAnnotation': res,
                    'action.data.deleteAnnotation': {
                        status: status,
                    },
                }, {
                        annotationId: annotationId,
                    });

                return status;
            },

            deleteComment(commentId) {
                const config = {
                    commentId: commentId
                }

                const res = syncPost(actionUrls['bookRead'].deleteComment, config);
                const status = res[0]['status'];

                recordData({
                    'action.respose.deleteComment': res,
                    'action.data.deleteComment': {
                        status: status,
                    },
                }, {
                        commentId: commentId,
                    });

                return status;
            },

            getAnnotations(bookId, userId) {
                const config = {
                    bookId: bookId,
                }

                if (userId !== undefined) config['userId'] = userId;
                let response = syncPost(actionUrls['bookRead'].getAnnotations, config);
                let annotations = response[0]['data'];

                for (let ann of annotations) {
                    ann.isLike = ann['isLike'] || ann['islike'];
                }

                recordData({
                    'action.respose.getAnnotations': response,
                    'action.data.getAnnotations': {
                        annotations: annotations,
                    },
                }, {
                        bookId: bookId,
                        userId: userId,
                    });

                return annotations;
            },

            getBookConentAction(bookId) {
                const config = {
                    bookId: bookId
                }

                let response = syncPost(actionUrls['bookRead'].getBookContent, config);
                let bookConcent = response[0]['bookContent'];

                recordData({
                    'action.respose.getBookConent': response,
                    'action.data.getBookConent': {
                        bookConcent: bookConcent,
                    },
                }, {
                        bookId: bookId,
                    });

                return bookConcent;
            },

            getComments(annotationId) {
                const config = {
                    annotationId: annotationId,
                }

                const res = syncPost(actionUrls['bookRead'].getComments, config);
                const comments = res[0]['data'] || [];
                const newComments = [];
                for (let i = 0; i < comments.length; i++) {
                    let comment = comments[i];
                    let obj = {
                        content: comment['commentContent'],
                        time: comment['time'],
                        fromId: comment['fromUserId'],
                        fromName: comment['fromUserName'],
                        fromId: comment['fromUserId'],
                        toId: comment['toUserId'] || undefined,
                        toName: comment['toUserName'] || undefined,
                        commentId: comment['commentId'],
                    }
                    if (comment['commentPic'] != null && comment['commentPic'] !== 'null') {
                        obj['imageUrl'] = comment['commentPic'];
                    }
                    newComments.push(obj);
                }

                recordData({
                    'action.respose.getComments': res,
                    'action.data.getComments': {
                        'newComments': newComments,
                    },
                }, {
                        annotationId: annotationId,
                    });

                return newComments;
            },

            getCurrentUserNameAction() {
                const config = {}

                let response = syncPost(actionUrls['bookRead'].getCurrentUserName, config);
                let userName = response[0]['userName'];

                recordData({
                    'action.respose.getCurrentUserName': response,
                    'action.data.getCurrentUserName': {
                        userName: userName,
                    },
                });

                return userName;
            },

            updateAnnotationAction(formData, callback) {
                $.ajax({
                    url: prefix + actionUrls.bookRead.updateAnnotation,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: (res) => {
                        if (res[0]['status'] === 'ok') {
                            let imageUrl = undefined;
                            if (res[1] && res[1]['annotationImage']) imageUrl = res[1]['annotationImage'];
                            callback(true, imageUrl);
                        } else {
                            callback(false);
                        }

                    },
                    error: () => {
                        callback(false);
                    },
                });
            },

            likeAction(annId) {
                const config = {
                    annotationId: annId
                };

                let response = syncPost(actionUrls['bookRead'].like, config);

                recordData({
                    'action.respose.like': response,
                }, {
                        annnId: annId,
                    });
            },

            unlikeAction(annId) {
                const config = {
                    annotationId: annId
                };

                let response = syncPost(actionUrls['bookRead'].unlike, config);

                recordData({
                    'action.respose.unlike': response,
                }, {
                        annId: annId,
                    });
            },

            getClassesAction() {
                let res = syncPost(actionUrls['bookRead'].getClasses);
                for (let groupName in res[0]) {
                    let group = res[0][groupName];
                    for (let i = 0; i < group.length; i++) {
                        let item = group[i];
                        item['name'] = item['name'] || item['studentName'];
                        item['code'] = item['code'] || item['studentCode'];
                    }
                }

                let list = [];
                for (let i = 1; i < res.length; i++) {
                    let item = res[i];
                    item['userId'] = item['teacherId'];
                    list.push(item);
                }
                if (list.length !== 0) res[0]['老师'] = list;

                recordData({
                    'action.respose.getClasses': res,
                });

                return res;
            },

            pushPageInfo(bookId, numberOfWords, page) {
                const config = {
                    BookId: bookId,
                    readCount: numberOfWords,
                    currentPage: page
                };

                let response = syncPost(actionUrls['bookRead'].pushPageInfo, config);

                recordData({
                    'action.respose.pushPageInfo': response,
                }, {
                        bookId: bookId,
                        numberOfWords: numberOfWords,
                        page: page,
                    });
            },

            markPage(bookId, page) {
                const config = {
                    bookId: bookId,
                    markPage: page
                };

                let response = syncPost(actionUrls['bookRead'].markPage, config);

                recordData({
                    'action.respose.markPage': response,
                }, {
                        bookId: bookId,
                        markPage: page,
                    });
            },

            getLastPage(bookId) {
                const config = {
                    bookId: bookId
                };

                let response = syncPost(actionUrls['bookRead'].lastPage, config);

                let lastPage = response[0]['lastPage'] || 1;

                recordData({
                    'action.respose.getLastPage': response,
                    'action.data.getLastPage': {
                        lastPage: lastPage,
                    },
                }, {
                        bookId: bookId,
                    });

                return lastPage;
            },

            getBookmarkList(bookId) {
                const config = {
                    bookId: bookId
                };

                let res = syncPost(actionUrls['bookRead'].bookmarkList, config) || [];

                let bookmarkList = [];

                for (let i = 0; i < res.length - 1; i++) {
                    bookmarkList.push(res[i]['pageNumber']);
                }

                recordData({
                    'action.respose.getBookmarkList': res,
                    'action.data.getBookmarkList': {
                        bookMarkList: bookmarkList,
                    },
                }, {
                        bookId: bookId,
                    });

                return bookmarkList;
            },

            getAllStatistics() {
                let res = syncPost(actionUrls['bookRead'].getAllStatistics, {});

                recordData({
                    'action.respose.getAllStatistics': res,
                });
            },
        },

        teacher: {
            // 我的班级 - 班级管理
            getClasses: function (callback) {
                post(actionUrls.teacher.getClasses, {}, res => {
                    let data = [];
                    let list = res[0]['result'];

                    for (let i = 0; i < list.length; i++) {
                        let item = list[i];
                        data.push({
                            'id': item['classId'],
                            'className': item['className'],
                            'studentNumber': item['studentNum'] || 0,
                            'createTime': item['createTime'],
                        });
                    }

                    recordData({
                        'action.response.getClasses': res,
                        'action.data.getClasses': data,
                    });

                    callback(data);
                });
            },

            addClass: function (className, callback) {
                post(actionUrls.teacher.addClass, { className: className }, res => {
                    callback(true);
                })
            },

            deleteClass: function (classIds, callback) {
                post(actionUrls.teacher.deleteClass, { classIds: classIds }, res => {
                    callback(true);
                });
            },

            getStudentsInClass: function (classId, callback) {
                post(actionUrls.teacher.getStudentsInClass, { classId: classId }, res => {
                    let data = [];

                    for (let i = 0; i < res.length; i++) {
                        data.push({
                            'id': res[i]['studentId'],
                            'name': res[i]['studentName'],
                            'code': res[i]['studentCode'],
                        });
                    }

                    recordData({
                        'action.response.getStudentsInClass': res,
                        'action.data.getStudentsInClass': data,
                    }, {
                            classId: classId,
                        });

                    callback(data);
                });
            },

            getStudentsNotInClass: function (classId, callback) {
                post(actionUrls.teacher.getStudentsNotInClass, { classId: classId }, res => {
                    let data = [];

                    for (let i = 0; i < res.length; i++) {
                        data.push({
                            'id': res[i]['studentId'],
                            'name': res[i]['studentName'],
                            'code': res[i]['studentCode'],
                        });
                    }

                    recordData({
                        'action.response.getStudentsNotInClass': res,
                        'action.data.getStudentsNotInClass': data,
                    }, {
                            classId: classId,
                        });

                    callback(data);
                });
            },

            addStudentsToClass: function (classId, studentIds, callback) {
                let args = {
                    classId: classId,
                    studentIds: studentIds,
                };

                post(actionUrls.teacher.addStudentsToClass, args, res => {
                    callback(true);
                });
            },

            deleteStudentsFromClass: function (classId, studentIds, callback) {
                let args = {
                    classId: classId,
                    studentIds: studentIds,
                };

                post(actionUrls.teacher.deleteStudentsFromClass, args, res => {
                    callback(true);
                });
            },

            getBooksInClass: function (classId, callback) {
                post(actionUrls.teacher.getBooksInClass, { classId: classId }, res => {
                    let data = [];

                    for (let i = 0; i < res.length; i++) {
                        data.push({
                            'id': res[i]['bookId'],
                            'name': res[i]['bookName'],
                            'author': res[i]['bookAuthor'],
                        });
                    }

                    recordData({
                        'action.response.getBooksInClass': res,
                        'action.data.getBooksInClass': data,
                    }, {
                            classId: classId,
                        });

                    callback(data);
                });
            },

            getBooksNotInClass: function (classId, callback) {
                post(actionUrls.teacher.getBooksNotInClass, { classId: classId }, res => {
                    let data = [];

                    for (let i = 0; i < res.length; i++) {
                        data.push({
                            'id': res[i]['bookId'],
                            'name': res[i]['bookName'],
                            'author': res[i]['bookAuthor'],
                        });
                    }

                    recordData({
                        'action.response.getBooksNotInClass': res,
                        'action.data.getBooksNotInClass': data,
                    }, {
                            classId: classId,
                        });

                    callback(data);
                });
            },

            pushBooksToClass: function (classId, bookIds, callback) {
                let args = {
                    classId: classId,
                    bookIds: bookIds,
                };

                post(actionUrls.teacher.pushBooksToClass, args, res => {
                    callback(true);
                });
            },

            deleteBooksFromClass: function (classId, bookIds, callback) {
                let args = {
                    classId: classId,
                    bookIds: bookIds,
                };

                post(actionUrls.teacher.deleteBooksFromClass, args, res => {
                    callback(true);
                });
            },

            // 我的班级 - 学生管理
            getStudents: function (callback) {
                post(actionUrls.teacher.getStudents, {}, res => {
                    let data = [];
                    let list = res[0]['result'];

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            id: list[i]['studentId'],
                            studentName: list[i]['studentName'],
                            studentCode: list[i]['studentCode'],
                            classList: list[i]['className'],
                        });
                    }

                    recordData({
                        'action.response.getStudents': res,
                        'action.data.getStudents': data,
                    });

                    callback(data);
                })
            },

            getClassesHasStudent: function (callback) {
                post(actionUrls.teacher.getClassesHasStudent, {}, res => {
                    let data = [];
                    let list = res[0]['result'];

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': list[i]['classId'],
                            'value': list[i]['className'],
                        });
                    }

                    recordData({
                        'action.response.getClassesHasStudent': res,
                        'action.data.getClassesHasStudent': data,
                    });

                    callback(data);
                })
            },

            resetPassword: function (ids, callback) {
                post(actionUrls.teacher.resetPassword, { ids: ids }, res => {
                    callback(res[0]['result']);
                })
            },

            addBook: function (bookName, author, introduction, bookFile, avatarFile, callback) {
                let formData = new FormData();
                formData.append('bookName', bookName);
                formData.append('author', author);

                if (introduction && typeof introduction === 'string') {
                    formData.append('introduction', introduction);
                }

                formData.append('bookFile', bookFile);
                formData.append('bookFileName', bookFile['name']);

                if (avatarFile !== undefined) {
                    formData.append('avatarFile', avatarFile);
                    formData.append('avatarFileName', avatarFile['name']);
                }

                log(formData);

                $.ajax({
                    url: prefix + actionUrls.teacher.addBook,
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        callback(true);
                    },
                    error: function (res) {
                        callback(false);
                    }
                });
            },

            getBookshelfList: function (callback) {
                post(actionUrls.teacher.getBookshelfList, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': list[i]['bookId'],
                            'bookId': list[i]['bookId'],
                            'bookName': list[i]['bookName'],
                            'author': list[i]['bookAuthor'],
                            'introduction': list[i]['bookIntroduction'],
                            'className': list[i]['className'],
                            'classId': list[i]['classId'],
                        });
                    }

                    recordData({
                        'action.response.getBooks': res,
                        'action.data.getBooks': data,
                    });

                    callback(data);
                })
            },

            getClassesHasBook: function (callback) {
                post(actionUrls.teacher.getClassesHasBook, {}, res => {
                    let data = [];
                    let list = res[0]['result'];

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': list[i]['bookId'],
                            'value': list[i]['className'],
                        });
                    }

                    recordData({
                        'action.response.getClassesHasBook': res,
                        'action.data.getClassesHasBook': data,
                    });

                    callback(data);
                })
            },

            getExcel: function (bookId, classId) {
                $('<form />', {
                    'action': prefix + actionUrls.teacher.getExcel,
                    'mothod': 'post',
                    'hidden': 'hidden',
                }).append(
                    $('<input />', {
                        'type': 'text',
                        'name': 'bookId',
                        'value': bookId,
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'classId',
                        'value': classId,
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'columnNames',
                        'value': '学生姓名,批注原文,批注内容,批注图片,页数,创建时间',
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'propertyNames',
                        'value': 'studentName,bookContentOfAnnotation,annotationContent,annotationImage,page,creationTime',
                    }),
                ).appendTo('body').submit().remove();
            },

            getImportTemplate: function () {
                $('<form />', {
                    'action': prefix + actionUrls.teacher.getImportTemplate,
                    'mothod': 'post',
                    'hidden': 'hidden',
                }).append(
                    $('<input />', {
                        'type': 'text',
                        'name': 'columnNames',
                        'value': '用户名,用户账号,性别',
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'propertyNames',
                        'value': 'studentName,studentCode,studentGender',
                    }),
                ).appendTo('body').submit().remove();
            },

            importStudentList: function (file, callback) {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('name', file['name']);

                $.ajax({
                    url: prefix + actionUrls.teacher.importStudentList,
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        callback(res);
                    },
                    error: function (res) {
                        callback(false);
                    }
                });
            },

            exportStudentList: function (studentIds) {
                $('<form />', {
                    'action': prefix + actionUrls.teacher.exportStudentList,
                    'mothod': 'post',
                    'hidden': 'hidden',
                }).append(
                    $('<input />', {
                        'type': 'text',
                        'name': 'ids',
                        'value': studentIds,
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'columnNames',
                        'value': '用户名,用户账号,性别',
                    }),
                    $('<input />', {
                        'type': 'text',
                        'name': 'propertyNames',
                        'value': 'studentName,studentCode,studentGender',
                    }),
                ).appendTo('body').submit().remove();
            },

            getBooks: function (callback) {
                post(actionUrls.teacher.getBooks, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': list[i]['bookId'],
                            'bookId': list[i]['bookId'],
                            'bookName': list[i]['bookName'],
                            'author': list[i]['bookAuthor'],
                            'uploaderID': list[i]['teacherCode'],
                            'uploaderName': list[i]['teacherName'],
                            'uploadTime': list[i]['time'],
                        });
                    }

                    recordData({
                        'action.response.getBooks': res,
                        'action.data.getBooks': data,
                    });

                    callback(data);
                })
            },

            deleteBook: function (bookIds, callback) {
                post(actionUrls.teacher.deleteBook, { bookIds: bookIds }, res => {
                    callback(true);
                })
            },

            getHomeworks: function (callback) {
                post(actionUrls.teacher.getHomeworks, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': list[i]['homeworkId'],
                            'homeworkName': list[i]['homeworkName'],
                            'startTime': list[i]['createtime'],
                            'limitTime': list[i]['deadtime'],
                            'className': list[i]['classesName'],
                            'submitNumber': list[i]['submitedStudents'],
                        });
                    }

                    recordData({
                        'action.response.getHomeworks': res,
                        'action.data.getHomeworks': data,
                    });

                    callback(data);
                });
            },

            getClassesHasHomework: function (callback) {
                post(actionUrls.teacher.getClassesHasHomework, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'value': list[i]['classesName'],
                        })
                    }

                    recordData({
                        'action.response.getClassesHasHomework': res,
                        'action.data.getClassesHasHomework': data,
                    });

                    callback(data);
                });
            },

            deleteHomework: function (homeworkIds, callback) {
                post(actionUrls.teacher.deleteHomework, { homeworkIds: homeworkIds }, res => {
                    let data = false;

                    if (res[0]['result'] === '删除成功') {
                        data = true;
                    }

                    callback(data);
                })
            },

            getClassesByTeacher: function (callback) {
                post(actionUrls.teacher.getClassesByTeacher, {}, res => {
                    let data = [];

                    for (let i = 0; i < res.length; i++) {
                        data.push({
                            'id': res[i]['classId'],
                            'className': res[i]['className'],
                        })
                    }

                    recordData({
                        'action.response.getClassesByTeacher': res,
                        'action.data.getClassesByTeacher': data,
                    });

                    callback(data);
                })
            },

            addHomework: function (homeworkName, homeworkContent, classIds, times, file, callback) {
                let formData = new FormData();
                formData.append('homeworkName', homeworkName);
                formData.append('homeworkContent', homeworkContent);
                formData.append('classIds', classIds);
                formData.append('deadline', times);

                if (file) {
                    formData.append('homeworkFile', file);
                    formData.append('homeworkFileName', file.name);
                }

                $.ajax({
                    url: prefix + actionUrls.teacher.addHomework,
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        callback(true);
                    },
                    error: function (res) {
                        callback(false);
                    }
                });
            },

            getHomeworkContentById: function (homeworkId, callback) {
                post(actionUrls.teacher.getHomeworkContentById, { homeworkId: homeworkId }, res => {
                    let data = {};
                    let item = res[0];
                    data['content'] = item['homeworkContent'];

                    if (item['sourceLink']) {
                        data['fileLink'] = prefix + 'account/' + item['sourceLink'];
                    }

                    recordData({
                        'action.response.getHomeworkContentById': res,
                        'action.data.getHomeworkContentById': data,
                    });

                    callback(data);
                })
            },

            getHomeworkListSubmited: function (homewerkId, callback) {
                post(actionUrls.teacher.getHomeworkListSubmited, { homeworkId: homewerkId }, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            'id': '' + list[i]['userId'] + ',' + homewerkId,
                            'userName': list[i]['userName'],
                            'className': list[i]['className'],
                            'submitedTime': list[i]['submitedTime'],
                            'status': list[i]['state'],
                            'score': list[i]['score'] || '',
                        });
                    }

                    recordData({
                        'action.response.getHomeworkListSubmited': res,
                        'action.data.getHomeworkListSubmited': data,
                    });

                    callback(data);
                })
            },

            getAnswerByIds: function (homeworkId, studentId, callback) {
                let args = {
                    homeworkId: homeworkId,
                    studentId: studentId,
                }
                post(actionUrls.teacher.getAnswerByIds, args, res => {
                    let data = {};
                    let item = res[0];

                    if (item['SOURCE_LINK'] !== '') {
                        data['file'] = prefix + 'account/' + item['SOURCE_LINK'];
                    }
                    if (item['STUDENT_HOMEWORK'] !== '') {
                        data['answer'] = item['STUDENT_HOMEWORK'];
                    }


                    callback(data);
                })
            },

            checkAnswer: function (homeworkId, studentId, score, evaluation, callback) {
                let args = {
                    homeworkId: homeworkId,
                    studentIds: studentId,
                    score: score,
                    evaluation: evaluation,
                }
                post(actionUrls.teacher.checkAnswer, args, res => {
                    let data = res[0]['result'];
                    callback(data);
                })
            },

            getTeachers: function (callback) {
                post(actionUrls.teacher.getTeachers, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        if (list[i]['userName'] === '' || list[i]['userName'] === 'null') continue;
                        data.push({
                            'name': list[i]['teacherName'],
                            'account': list[i]['teacherCode'],
                            'id': list[i]['teacherId'],
                        })
                    }

                    callback(data);
                })
            },

            addUser: function (name, account, sex, role, callback) {
                let args = {
                    userName: name,
                    userCode: account,
                    userType: role,
                    userGender: sex,
                }
                post(actionUrls.teacher.addUser, args, res => {
                    callback(res[0]['result']);
                })
            },

            deleteUser: function (ids, callback) {
                post(actionUrls.teacher.deleteUser, { ids: ids }, res => {
                    callback(res[0]['result']);
                })
            },

            updateHomeWork: function (id, homeworkName, homeworkContent, classIds, limitDate, file, callback) {
                let formData = new FormData();
                formData.append('homeworkId', id);
                formData.append('homeworkName', homeworkName);
                formData.append('homeworkContent', homeworkContent);
                formData.append('classIds', classIds);
                formData.append('deadline', limitDate);

                if (file) {
                    formData.append('homeworkFile', file);
                    formData.append('homeworkFileName', file.name);
                }

                $.ajax({
                    url: prefix + actionUrls.teacher.updateHomeWork,
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res[0]['result'] === '修改成功') {
                            callback(true)
                        } else {
                            callback(false);
                        }
                    }
                });
            },

            getHomeworkInfo: function (id, callback) {
                post(actionUrls.teacher.getHomeworkInfo, { homeworkId: id }, res => {
                    callback(res[0]);
                })
            },
        },

        student: {
            getHomeworkList: function (callback) {
                post(actionUrls.student.getHomeworkList, {}, res => {
                    let data = [];
                    let list = res;

                    for (let i = 0; i < list.length; i++) {
                        let item = {
                            'id': list[i]['homeworkId'],
                            'title': list[i]['homeworkName'],
                            'studentHomeworkContent': list[i]['studentHomeworkContent'],
                            'teacher': list[i]['teacherName'],
                            'startTime': list[i]['startTime'],
                            'limitTime': list[i]['endTime'],
                            'status': list[i]['status'],
                            'content': list[i]['homeworkContent'],
                            'score': list[i]['score'] || null,
                            'evaluation': list[i]['evaluation'] || null,
                            'studentFile': (list[i]['studentLink'] !== 'account/null' && list[i]['studentLink'] !== 'account/') ? (prefix + list[i]['studentLink']) : null,
                            'file': list[i]['sourceLink'] ? (prefix + 'account/' + list[i]['sourceLink']) : null,
                        };

                        data.push(item);
                    }

                    recordData({
                        'action.response.getHomeworkList': res,
                        'action.data.getHomeworkList': data,
                    });

                    callback(data);
                })
            },

            submitHomework: function (homeworkId, file, answer, callback) {
                let formData = new FormData();
                formData.append('homeworkContent', answer);
                formData.append('homeworkId', homeworkId);

                if (file) {
                    formData.append('file', file);
                    formData.append('fileName', file['name']);
                }

                $.ajax({
                    url: prefix + actionUrls.student.submitHomework,
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        callback(true);
                    },
                    error: function (res) {
                        callback(false);
                    }
                });
            }
        }
    }
})