$(function () {
    const action = namespace['actions']['bookRead'];
    const ee = namespace['o']['ee'];
    
    class Classes {
        constructor(annManger) {
            let res = action.getClassesAction();
            this.classList = res[0];
            this.classNameList = [];
            this.annManger = annManger;
            this.currentUserName = annManger.currentUserName;
        }
        
        init() {
            let $dropdownMenu = $('#classes .dropdown-menu');
            
            for (let className in this.classList) {
                $dropdownMenu.append(
                    $('<a/>', {
                        'class': 'dropdown-item',
                        href: '#',
                    }).text(className)
                );
                this.classNameList.push(className);
            }
            
            $('#classes .dropdown-toggle').text(this.classNameList[0]);
            
            this.updateTable(this.classNameList[0]);
            this.setListener();
        }
        
        updateTable(className) {
            if (!className in this.classNameList) return;
            let $tableThead = $('#table-thead').empty();
            $tableThead.append(
                $('<tr/>').append(
                    $('<th/>').text('学号'),
                    $('<th/>').text('姓名')
                )
            );
            
            let users = this.classList[className];
            for (let i = 0; i < users.length; i++) {
                let stuInfo = users[i];
                if (stuInfo['name'] === this.currentUserName) continue;
                $tableThead.append(
                    $('<tr/>').append(
                        $('<td/>').text(stuInfo['code']),
                        $('<td/>').text(stuInfo['name'])
                    ).attr('data-userId', stuInfo['userId'])
                )
            }
        }
        
        setListener() {
            $('#classes .dropdown-menu').click(e => {
                let $currentClassName = $('#classes .dropdown-toggle');
                let $target = $(e.target);
                if ($target.text() === $currentClassName.text()) return;
                $currentClassName.text($target.text());
                this.updateTable($target.text())
            });
            
            $('#table-thead').click(e => {
                let $tr = $(e.target).parent();
                if ($tr.find('th').length !== 0) return;
                $tr.parent().children().removeAttr('style');
                $tr.css('background-color', '#b8daff');
                ee.emit('userName-changed-1', $tr.children().last().text(), $tr.attr('data-userId'));
            });
            
            $('#classes .btn-begin-read').click(e => {
                $('#table-thead tr').removeAttr('style');
                ee.emit('userName-changed-1', this.currentUserName);
            });
            
            ee.on('userName-changed-1', username => {
                if (username === this.currentUserName) {
                    $('#read-status').removeAttr('hidden');
                    $('#classes .btn-begin-read').attr('hidden', true);
                    $('#classes .btn-begin-read-text').attr('hidden', true);
                    $('#bookmark-sign').removeAttr('hidden');
                } else {
                    $('#read-status').attr('hidden', true);
                    $('#classes .btn-begin-read').removeAttr('hidden');
                    $('#classes .btn-begin-read-text').removeAttr('hidden', true);
                    $('#bookmark-sign').attr('hidden', true);
                }
            })
        }
    }
    
    namespace['func']['Classes'] = Classes;
})


