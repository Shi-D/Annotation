$(function () {
    /*
    表格类
     */
    class Table {
        /**
         * 构造器。
         * @param tableHeaderInfo 表格头信息。该参数是一个对象，包括表格标题以及每一列数据在数据中对应的属性名。
         * 例如
         * {
         *      headerNameList: ['班级名', '学生数', '创建时间'],
         *      headerNameMapping: {
         *      '班级名': 'className',
         *      '学生数': 'studentNumber',
         *      '创建时间': 'createTime',
         *      },
         * }
         * @param tableQueryOptions 表格查询选项。该参数是一个对象数据，定义表格查询选项及其对应的属性名。
         * 例如
         * [
         *     {
         *         optionName: '班级名',
         *         optionNameMapping: 'className',
         *     },
         *     {
         *          optionName: '学生数',
         *          optionNameMapping: 'studentNumber',
         *     }
         *]
         * @param actionFunc 获取表格数据的action。该参数是一个函数对象，例如 action.getClasses
         * @param tableBtnsInfo 表格按钮信息。该参数是一个对象，定义一个按钮的名字，id，可用条件等，例如
         * {
         *     'names': ['添加学生', '移除学生', '推送书籍', '移除书籍', '添加班级', '删除班级'],
         *     'icons': ['plus-circle', 'minus-circle', 'plus-circle', 'minus-circle', 'plus-circle', 'minus-circle'],
         *     'ids-suffix': ['add-student', 'delete-student', 'push-book', 'delete-book', 'add-class', 'delete-class'],
         *     'useableConditions': [0, 1, 1, 1, 0, 0],
         * }
         * useableCondition:
         * 0 总是可用
         * 1 当且仅当 1 个复选框被选中时可用
         * 2 当选中 1 个及以上的复选框时可用
         * @param tableConfig 表格配置。该参数是一个对象，可用的配置项有
         * pageNo：初始化表格时的页数，如果小于 1 或者大于最大页数，该设置无效。默认值为 1
         * numberOfPerPage：初始化表格时的每页条数，如果小于 minNumberOfPerPage 或者大于 maxNumberOfPerPage
         * 时，该设置无效。默认值为 20
         * minNumberOfPerPage：初始化表格时每页最少的条数 // todo 错误处理
         * maxNumberOfPerPage：初始化表格时每页最多的条数 // todo 错误处理
         * tablePartSelector：指定要显示表格的根标签所对应的选择器，默认是 #table-part
         */
        constructor(tableHeaderInfo, tableQueryOptions, actionFunc, tableBtnsInfo, tableConfig) {
            this.headerInfo = tableHeaderInfo;
            this.queryOptions = tableQueryOptions || [];
            this.btnsInfo = tableBtnsInfo || [];
            this.actionFunc = actionFunc;
            
            let config = tableConfig || {};
            
            this.pageNo = config['pageNo'] || 1;
            this.numberOfPerPage = config['numberOfPerPage'] || 20;
            this.minNumberOfPerPage = config['minNumberOfPerPage'] || 1;
            this.maxNumberOfPerPage = config['maxNumberOfPerPage'] || 100;
            
            this.selector = config['tablePartSelector'] || '#table-part';
            this.data = []; // 表格数据，通过 actionFunc 获取
            this.tablelist = []; // 保存搜索后的表格数据
            this.tablePageList = []; // 保存对 tablelist 进行分页后的结果
            
            this.actionArgs = [];
        }
        
        /**
         * 生成表格 HTML 结构
         */
        createTableSkeletion() {
            let $table = $(this.selector);
            
            if ($table.length === 0) return;
            
            createTableBtns($table, this.btnsInfo);
            createTableQuery($table, this.queryOptions)
            createTableContent($table, this.headerInfo);
            createTableFooter($table);
            
            function createTableBtns($table, btnsInfo) {
                // let $btns = $('#table-btns');
                //
                // if ($btns.length === 0) return;
                let $btns = $('<div />', {
                    'class': 'table-btns',
                    'id': 'table-btns',
                });
                
                for (let i = 0; i < btnsInfo.length; i++) {
                    let btn = btnsInfo[i];
                    let $btn = $('<button />');
                    let attrs = btn['btnAttrs'];
                    
                    for (let attrName in attrs) {
                        $btn.attr(attrName, attrs[attrName]);
                    }
                    
                    $btn.append(
                        $('<i />').addClass(btn['btnIcon']),
                        $('<span />').text(' ' + btn['btnName']),
                    );
                    $btn.attr('data-useable-condition', btn['useableCondition']);
                    $btns.append($btn);
                }
                
                $table.append($btns);
            }
            
            function createTableQuery($table, queryOptions) {
                let $query = $('<div />', {
                    'class': 'table-query clearfix',
                    'id': 'table-div-query',
                });
                let $queryOptions = $('<div />', {
                    'class': 'table-query-options',
                    'id': 'table-div-queryOptions'
                });
                let $queryBtns = $('<div />', {
                    'class': 'table-query-btns',
                }).append(
                    $('<button />', {
                        'class': 'btn btn-sm btn-primary',
                        'id': 'table-btn-query'
                    }).text('查询'),
                    $('<button />', {
                        'class': 'btn btn-sm btn-outline-secondary',
                        'id': 'table-btn-reset'
                    }).text('重置'),
                );
                
                for (let i = 0; i < queryOptions.length; i++) {
                    let option = queryOptions[i];
                    
                    if (option['type'] === 'text') {
                        $queryOptions.append(
                            $('<div />', {
                                'class': 'table-query-options-item'
                            }).append(
                                $('<labelv />', {
                                    'for': option['inputId'],
                                }).text(option['optionName']),
                                $('<input />', {
                                    'id': 'table-input-option-' + i,
                                    'type': 'text',
                                    'data-name-mapping': option['optionNameMapping'],
                                }),
                            )
                        )
                    }
                    
                    if (option['type'] === 'dropdown') {
                        let $dropdownMenu = $('<div />').addClass('dropdown-menu').append(
                            $('<a />', {
                                'class': 'dropdown-item',
                                'data-item-value': '',
                            }).text(option['optionName']),
                            $('<div />').addClass('dropdown-divider'),
                        );
                        let $dropdownButton = $('<button />', {
                            'class': 'btn btn-outline-secondary dropdown-toggle',
                            'id': 'table-dropdown-option-' + i,
                            'data-toggle': 'dropdown',
                            'data-item-value': '',
                            'data-name-mapping': option['optionNameMapping'],
                        }).text(option['optionName']);
                        
                        $queryOptions.append(
                            $('<div />', {
                                'class': 'table-query-options-item'
                            }).append(
                                $('<div />').addClass('dropdown').append(
                                    $dropdownButton,
                                    $dropdownMenu,
                                )
                            )
                        );
                        option['getDropdownMenuDataFunc'](menuList => {
                            for (let i = 0; i < menuList.length; i++) {
                                let menuItem = menuList[i];
                                $dropdownMenu.append(
                                    $('<a />', {
                                        'class': 'dropdown-item',
                                        'data-item-value': menuItem['value'],
                                    }).text(menuItem['value']),
                                );
                            }
                        });
                        
                        $dropdownMenu.click(e => {
                            if (!$(e.target).hasClass('dropdown-item')) return;
                            
                            $dropdownButton.attr('data-item-value', $(e.target).attr('data-item-value'));
                            $dropdownButton.text($(e.target).text());
                        })
                    }
                }
                
                $query.append(
                    $queryOptions,
                    $queryBtns,
                );
                
                $table.append($query);
            }
            
            function createTableContent($table, headerInfo) {
                let $content = $('<div />', {
                    'class': 'table-content',
                    'id': 'table-content'
                }).append(
                    $('<div />').attr('class', 'table-content-header').append(
                        $('<table />').append(
                            $('<tbody />').attr('id', 'table-content-header')
                        )
                    ),
                    $('<div />').attr('class', 'table-content-body').append(
                        $('<table />').append(
                            $('<tbody />').attr('id', 'table-content-body')
                        )
                    ),
                );
                
                $table.append($content);
                
                createTableHeader(headerInfo);
                
                function createTableHeader(headerInfo) {
                    let $header = $('#table-content-header');
                    let $tr = $('<tr />');
                    $tr.append(
                        $('<th />').append(
                            $('<input />', {
                                'type': 'checkbox',
                                'id': 'table-input-checkAll',
                            }),
                        ),
                        $('<th />'),
                    );
                    
                    let list = headerInfo['headerNameList'];
                    
                    for (let i = 0; i < list.length; i++) {
                        let name = list[i];
                        $tr.append(
                            $('<th />').text(list[i]),
                        );
                    }
                    
                    $tr.append(
                        $('<th />').attr('class', 'gutter'),
                    );
                    
                    $header.append($tr);
                }
            }
            
            function createTableFooter($table) {
                let $footer = $('<div />').attr('class', 'table-footer').append(
                    $('<div />').attr('class', 'table-footer-change-page').append(
                        $('<button />').attr('id', 'table-btn-toFirstPage').append(
                            $('<i />').attr('class', 'fa fa-angle-double-left')
                        ),
                        $('<button />').attr('id', 'table-btn-toPreviousPage').append(
                            $('<i />').attr('class', 'fa fa-angle-left')
                        ),
                        $('<span />').attr('class', 'table-footer-page-info').append(
                            $('<span />').text('第'),
                            $('<input />', {
                                'id': 'table-input-currentPage',
                                'type': 'text',
                                'placeholder': '1'
                            }),
                            $('<span />').text('页，共'),
                            $('<span />').attr('id', 'table-span-totalPage').text('1'),
                            $('<span />').text('页'),
                        ),
                        $('<button />').attr('id', 'table-btn-toNextPage').append(
                            $('<i />').attr('class', 'fa fa-angle-right')
                        ),
                        $('<button />').attr('id', 'table-btn-toLastPage').append(
                            $('<i />').attr('class', 'fa fa-angle-double-right')
                        ),
                        $('<button />').attr('id', 'table-btn-refreshPage').append(
                            $('<i />').attr('class', 'fa fa-refresh')
                        ),
                    ),
                    $('<div />').attr('class', 'table-footer-page-description').append(
                        $('<span />').text('显示'),
                        $('<span />').attr('id', 'table-span-firstIndex').text('0'),
                        $('<span />').text('到'),
                        $('<span />').attr('id', 'table-span-lastIndex').text('0'),
                        $('<span />').text('条，共'),
                        $('<span />').attr('id', 'table-span-totalItem').text('0'),
                        $('<span />').text('条，'),
                        $('<input />').attr('id', 'table-input-perPage').attr('placeholder', '20'),
                        $('<span />').text('条/页'),
                    ),
                );
                
                $table.append($footer);
            }
        }
        
        /**
         * 初始化表格，包括获取表格内容、分页显示、初始化表格状态（当前页数、总条数等等）
         */
        init(actionArgs = []) {
            $(this.selector).html('');
            this.createTableSkeletion();
            this.update();
            this.actionArgs = actionArgs;
            this.actionFunc(...actionArgs, tableData => {
                recordData({
                    'date.tableData': tableData,
                });
                this.data = tableData;
                this.tablelist = this.data;
                this.update();
                this.setListener();
            });
        }
        
        /**
         * 在点击查询按钮后调用，根据查询条件删选表格项并更新到 tablelist 中
         * @param options 查询条件
         */
        updateTableList(options) {
            if (options === {}) this.tablelist = this.data;
            else {
                this.tablelist = [];
                
                for (let i = 0; i < this.data.length; i++) {
                    let item = this.data[i];
                    if (verifyOptions(item, options)) {
                        this.tablelist.push(item);
                    }
                }
            }
            this.update();
            
            function verifyOptions(item, options) {
                for (let optionName in options) {
                    let optionValue = options[optionName];
                    
                    if (!item[optionName] || item[optionName].indexOf(optionValue) === -1) return false;
                }
                return true;
            }
        }
        
        /**
         * 分页函数，更新 tablePageList。
         */
        calaulateTablePageList() {
            this.tablePageList = [];
            let pageItem = [];
            
            for (let i = 0; i < this.tablelist.length; i++) {
                pageItem.push(this.tablelist[i]);
                
                if ((i + 1) % this.numberOfPerPage === 0) {
                    this.tablePageList.push(pageItem);
                    pageItem = [];
                }
            }
            
            if (pageItem.length !== 0) {
                this.tablePageList.push(pageItem);
            }
        }
        
        /**
         * 更新表格状态，主要表格底部的状态
         */
        updateTableStatus() {
            let page = this.pageNo;
            let totalPage = this.tablePageList.length || 1;
            let totalItem = this.tablelist.length;
            let perPage = this.numberOfPerPage;
            let from = (this.pageNo - 1) * perPage + (totalItem === 0 ? 0 : 1);
            let len = this.tablePageList.length;
            let to;
            
            if (totalItem === 0) {
                to = 0;
            } else {
                if (page === len) {
                    to = totalItem;
                } else {
                    to = this.pageNo * perPage;
                }
            }
            
            $('#table-input-currentPage').attr('placeholder', page);
            $('#table-span-totalPage').text(totalPage);
            $('#table-span-firstIndex').text(from);
            $('#table-span-lastIndex').text(to);
            $('#table-span-totalItem').text(totalItem);
            $('#table-input-perPage').attr('placeholder', perPage);
            
            if ($('#table-btn-toPreviousPage').hasClass('disabled') && page !== 1) {
                $('#table-btn-toPreviousPage').removeClass('disabled').removeAttr('disabled');
                $('#table-btn-toFirstPage').removeClass('disabled').removeAttr('disabled');
            }
            
            if ($('#table-btn-toNextPage').hasClass('disabled') && page !== totalPage) {
                $('#table-btn-toNextPage').removeClass('disabled').removeAttr('disabled');
                $('#table-btn-toLastPage').removeClass('disabled').removeAttr('disabled');
            }
            
            if (page === 1 && !$('#btn-to-previous-page').hasClass('disabled')) {
                $('#table-btn-toPreviousPage').addClass('disabled').attr('disabled', 'disabled');
                $('#table-btn-toFirstPage').addClass('disabled').attr('disabled', 'disabled');
            }
            
            if (page === totalPage && !$('#btn-to-next-page').hasClass('disabled')) {
                $('#table-btn-toNextPage').addClass('disabled').attr('disabled', 'disabled');
                $('#table-btn-toLastPage').addClass('disabled').attr('disabled', 'disabled');
            }
        }
        
        /**
         * 将三个通常会在一起使用的函数放到一个函数中：分页、更新表格状态、刷新表格
         */
        update() {
            this.calaulateTablePageList();
            this.updateTableStatus();
            this.refreshTablePage();
            this.updateTableBtnsStatus();
        }
        
        /**
         * 将表格的状态设置为默认值，清空查询条件，如果有复选框被选中，还会清除复选框
         */
        resetTable() {
            this.pageNo = 1;
            this.numberOfPerPage = 20;
            this.tablelist = this.data;
            
            $('#table-content input[type=checkbox]').prop('checked', false);
            $('#table-query-options input[type=text]').val('');
        }
        
        /**
         * 清空原来的表格内容，并显示新的内容
         */
        refreshTablePage() {
            let $tableBody = $('#table-content-body');
            $('#table-input-checkAll').prop('checked', false);
            $tableBody.html('');
            let pageItemList = this.tablePageList[this.pageNo - 1] || [];
            let index = (this.pageNo - 1) * this.numberOfPerPage + 1;
            
            for (let i = 0; i < pageItemList.length; i++) {
                let itemId = pageItemList[i]['id'];
                
                let $tr = $('<tr />').attr('data-item-id', itemId).append(
                    $('<td />').append(
                        $('<input />').attr('type', 'checkbox'),
                    ),
                    $('<td />').text(index++),
                );
                
                let item = pageItemList[i];
                let headerNameList = this.headerInfo['headerNameList'];
                let headerNameMapping = this.headerInfo['headerNameMapping'];
                
                for (let j = 0; j < headerNameList.length; j++) {
                    $tr.append(
                        $('<td />').text(item[headerNameMapping[headerNameList[j]]]),
                    );
                }
                
                let additionalInfo = this.headerInfo['additionalInfo'];
                for (let attrName in additionalInfo) {
                    $tr.attr(attrName, item[additionalInfo[attrName]]);
                }
                
                $tableBody.append($tr);
            }
        }
        
        /**
         * 改变当前页面，如果小于第一页、大于最后一页或者等于当前页，那么不进行任何操作
         * @param page 需要显示的页
         */
        changePage(page) {
            let totalPage = this.tablePageList.length;
            if (page < 1 || page > totalPage) return;
            if (page === this.pageNo) return;
            
            this.pageNo = page;
            this.updateTableStatus();
            this.refreshTablePage();
            this.updateTableBtnsStatus();
        }
        
        /**
         * 当复选框状态改变时触发此函数，根据按钮的 useableCondition 属性
         * 判断按钮当前的可用状态
         */
        updateTableBtnsStatus() {
            let $inputs = $('#table-content input:checked');
            let $btns = $('#table-btns > button');
            let len = $inputs.length;
            
            if (len === 0) {
                for (let i = 0; i < $btns.length; i++) {
                    let $btn = $($btns[i]);
                    let useableCondition = $btn.attr('data-useable-condition');
                    
                    if (useableCondition === 'oneSelectedOnly' || useableCondition === 'selectedOnly') {
                        $btn.addClass('disabled').attr('disabled', 'disabled');
                    }
                }
            }
            if (len === 1) {
                for (let i = 0; i < $btns.length; i++) {
                    let $btn = $($btns[i]);
                    let useableCondition = $btn.attr('data-useable-condition');
                    
                    if (useableCondition === 'oneSelectedOnly' || useableCondition === 'selectedOnly') {
                        $btn.removeClass('disabled').removeAttr('disabled');
                    }
                }
            }
            if (len >= 2) {
                for (let i = 0; i < $btns.length; i++) {
                    let $btn = $($btns[i]);
                    let useableCondition = $btn.attr('data-useable-condition');
                    
                    if (useableCondition === 'oneSelectedOnly') {
                        $btn.addClass('disabled').attr('disabled', 'disabled');
                    } else if (useableCondition === 'selectedOnly') {
                        $btn.removeClass('disabled').removeAttr('disabled');
                    }
                }
            }
        }
        
        /**
         * 设置监听器
         */
        setListener() {
            // 上一页
            $('#table-btn-toPreviousPage').click(e => {
                if (this.pageNo === 1) return;
                this.changePage(this.pageNo - 1);
            });
            // 第一页
            $('#table-btn-toFirstPage').click(e => {
                if (this.pageNo === 1) return;
                this.changePage(1);
            });
            // 下一页
            $('#table-btn-toNextPage').click(e => {
                if (this.pageNo === this.tablePageList.length) return;
                this.changePage(this.pageNo + 1);
            });
            // 最后一页
            $('#table-btn-toLastPage').click(e => {
                if (this.pageNo === this.tablePageList.length) return;
                this.changePage(this.tablePageList.length);
            });
            // 刷新表格
            $('#table-btn-refreshPage').click(e => {
                this.actionFunc(...this.actionArgs, tableData => {
                    this.data = tableData;
                    this.resetTable();
                    this.update();
                })
            });
            // 跳页
            $('#table-input-currentPage').change(e => {
                let page = +$(e.target).val();
                $(e.target).val('')
                if (isNaN(page)) return;
                this.changePage(page);
                
            });
            // 修改每页条数
            $('#table-input-perPage').change(e => {
                let numberOfPerpage = +$(e.target).val();
                $(e.target).val('')
                if (isNaN(numberOfPerpage)) return;
                if (numberOfPerpage === this.numberOfPerPage) return;
                if (numberOfPerpage < this.minNumberOfPerPage || numberOfPerpage > this.maxNumberOfPerPage) return;
                
                $('#table-input-perPage').attr('placeholder', numberOfPerpage);
                this.numberOfPerPage = numberOfPerpage;
                this.pageNo = 1;
                this.update();
                
            });
            // 全选
            $('#table-input-checkAll').click(e => {
                $('#table-content-body input[type=checkbox]').prop('checked', $(e.target).prop('checked'));
            });
            // 查询
            $('#table-btn-query').click(e => {
                let options = {};
                let $options = $('#table-div-queryOptions [data-name-mapping]');
                
                for (let i = 0; i < $options.length; i++) {
                    let $option = $($options[i]);
                    let optionName = $option.attr('data-name-mapping');
                    let optionValue = '';
                    
                    if ($option.hasClass('dropdown-toggle')) {
                        optionValue = $option.attr('data-item-value');
                    } else {
                        optionValue = $($options[i]).val();
                    }
                    
                    if (optionValue !== '') {
                        options[optionName] = optionValue;
                    }
                }
                
                this.updateTableList(options);
            });
            // 重置
            $('#table-btn-reset').click(e => {
                $('#table-div-queryOptions input').val('');
                let $dropdowns = $('#table-div-queryOptions .dropdown-toggle');
                
                for (let i = 0; i < $dropdowns.length; i++) {
                    let $dropdown = $($dropdowns[i]);
                    $dropdown.attr('data-item-value', '');
                    let text = $dropdown.next().find('a:eq(0)').text();
                    $dropdown.text(text);
                }
                
                $('#table-btn-query').click();
            });
            // 复选框被点击
            $('#table-content').click(e => {
                if (e.target.localName !== 'input') return;
                
                this.updateTableBtnsStatus();
            })
        }
    }
    
    namespace['func']['Table'] = Table;
})