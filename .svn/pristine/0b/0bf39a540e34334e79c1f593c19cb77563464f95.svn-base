/*
setttings.js 被设置为是唯一需要链接到 html 文件里面的 js 文件。

它应当在 head 标签中引入，而不是放在 body 标签的最后面。

setting.js 的功能有：

1. 定义全局变量和在命名空间中的变量。

2. 配置在所有页面中都会使用到的外部库（Jquery、Bootstrap 以及其附属库等）和
内部库（自己写的 js 文件），并动态插入到页面中。

3. 配置特定页面的需要的脚本文件，方式是在 html 中，引入 settings.js 之前在一个
script 标签中配置，变量名约定为 modelUrls，例如：

<script>
    // 公共模块
    const modelUrls = {
        'link': [
            '../../css/xxx.css',
        ],
        'script': [
            '../../js/xxx-1.js',
            '../../js/xxx-2.js',
        ],
    };
</script>
<script src="../../js/settings.js"></script>

应当总是使用相对路径

*/

// =======================================================================
// 变量声明区
// =======================================================================

// 指明是否进入 DEBUG 模式，如果为 true，则可以使用 namespace.dataset 和日志
const DEBUG = true;
// 指明记录日志时是否同时打印内容到控制台
const LOG_PRINT = true;

// 命名空间
let namespace = {}; // 定义在不同脚本中使用的对象、函数、变量等
namespace.dataset = {}; // 用来保存想要保存的数据，主要是 action 的返回的 response
namespace.log = {}; // 保存日志
//namespace.rootUrl = 'http://172.22.203.48:8080/Annotation/'; // 调用 action 时会用到的使用的路径前缀
namespace.rootUrl = 'http://115.231.108.197/Annotation/';
namespace.linkMode = location.hostname === 'localhost' ? 'html' : 'jsp'; // 定义动态生成的页面中链接的后缀， html 或者 jsp
namespace.linkMode = location.hostname === '' ? 'html' : 'jsp';
namespace['func'] = {}; // 多个脚本共用的函数或者类
namespace['o'] = {}; // 多个脚本共用的对象或者变量

// 由于 action 无法使用而使用的一些替代值
namespace['defaultAvatarUrl'] = '../../../resources/images/defaultAvatar.jpg'; // 设置默认用户头像连接，因为默认的头像链接不可用

(function settings() {
    // 外部库
    const cssLibUrls = {
        // 该数组中的每个值会被作为 link 标签插入 head 标签中
        // 如果数组中的值是字符串，将 link 的 href 属性设置为该字符串，rel 属性设置为 stylesheet
        // 如果数组的值是对象，该对象指明 link 标签的属性与值
        'link': [
            '../../lib/font-awesome-4.7.0.min.css',
            '../../lib/bootstrap-4.3.1.min.css',
            {
                'rel': 'icon',
                'url': '../../../resources/images/logo-32×32.png',
                'sizes': '32×32',
            },
        ],
    };
    const scriptLibUrls = {
        // 该数组中的每个值会被作为 acript 标签插入 body 标签的最后
        // 如果数组中的值只能是字符串，script 的 src 属性被设置为该字符串
        'script': [
            '../../lib/jquery-3.3.1.min.js',
            '../../lib/popper-1.14.7.min.js',
            '../../lib/bootstrap-4.3.1.min.js',
        ],
    };
    
    // html 页面美加载和解析完成后调用
    document.addEventListener('DOMContentLoaded', e => {
        // let dom_body = document.getElementsByTagName('body')[0];
        // dom_body.setAttribute('hidden', 'hidden'); // 隐藏 body 直到页面生成完成
        
        setLibary(cssLibUrls);
        setLibary(scriptLibUrls);
        setLibary(modelUrls);
    });
    
    // 页面的外部资源（css，script，img）被加载完毕后调用
    window.onload = function (e) {
        let dom_body = document.getElementsByTagName('body')[0];
        // dom_body.removeAttribute('hidden');
        
    }
    
    // 辅助函数
    function setLibary(libUrls) {
        for (let tagName in libUrls) {
            let urls = libUrls[tagName];
            for (let i = 0; i < urls.length; i++) {
                let tagInfo = urls[i];
                
                if (typeof tagInfo === 'string') {
                    tagInfo = {
                        url: urls[i],
                    }
                }
                
                if (tagName === 'link') {
                    let dom_header = document.getElementsByTagName('head')[0];
                    let dom_link = document.createElement('link');
                    dom_link.setAttribute('rel', tagInfo['rel'] || 'stylesheet');
                    dom_link.setAttribute('href', tagInfo['url']);
                    
                    for (let attrName in tagInfo) {
                        if (attrName !== 'rel' && attrName !== 'url') {
                            dom_link.setAttribute(attrName, tagInfo[attrName]);
                        }
                    }
                    
                    dom_header.appendChild(dom_link);
                }
                
                if (tagName === 'script') {
                    let dom_body = document.getElementsByTagName('body')[0];
                    let dom_script = document.createElement('script');
                    dom_script.async = false;
                    
                    dom_script.setAttribute('src', tagInfo['url']);
                    
                    for (let attrName in tagInfo) {
                        if (attrName !== 'url') {
                            dom_script.setAttribute(attrName, tagInfo[attrName]);
                        }
                    }
                    
                    dom_body.appendChild(dom_script)
                }
            }
        }
    }
})();

// 全局函数
/**
 * 记录日志。
 * 如果常量 DEBUG 不为 true，则该函数无效。
 * 如果常量 LOG_PRINT 为 true，则会将日志内容同时打印到控制台
 * @param o 日志内容
 */
function log(...o) {
    if (DEBUG === true) {
        let time = getFormatDate(new Date().valueOf());
        namespace['log'][time] = [...o];
        
        if (LOG_PRINT === true) {
            console.log(...o);
        }
    }
}

/**
 * 记录数据，数据会被记录到 namespace.dataset 中。
 * 如果常量 DEBUG 不为 true，则该函数无效。
 * @param dataset 必须，要记录的数据
 * @param args 可选，该数据的附加信息，例如 action 的参数。
 */
function recordData(dataset, args) {
    if (DEBUG !== true) return;
    
    for (let datasetName in dataset) {
        let dataSetValue = dataset[datasetName];
        
        if (namespace['dataset'][datasetName] === undefined) {
            namespace['dataset'][datasetName] = [];
        }
        
        let datasetItem = {
            originalValue: dataSetValue,
            time: getFormatDate(new Date().valueOf()),
        };
        
        if (args !== undefined) {
            datasetItem['args'] = args;
        }
        
        namespace['dataset'][datasetName].push(datasetItem);
    }
}

/**
 * 调用该函数，返回以字符串形式表示的格式化的时间
 * @param dateValue 可选，用来初始化时间的毫秒数，如果使用了该参数，返回的
 * 时间会精确到毫秒。该参数应该总是使用 new Date().valueOf() 的方式传递
 * @returns {string} 以字符串形式表示的格式化的时间
 */
function getFormatDate(dateValue) {
    let setMilliseconds = false;
    let date;
    
    if (dateValue !== undefined) {
        if (typeof dateValue !== 'number') return;
        
        setMilliseconds = true;
        date = new Date(dateValue);
    } else {
        date = new Date();
    }
    
    let year = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let day = date.getDate();
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    
    let millisecond = setMilliseconds === true ? (',' + date.getMilliseconds()) : '';
    
    return `${year}-${month}-${day} ${hour}:${minute}:${second}` + millisecond;
}

namespace['func']['getTableBtnsInfo'] = function (tableBtnsMeta) {
    let tableBtnsInfo = [];
    let names = tableBtnsMeta['names'];
    let icons = tableBtnsMeta['icons'];
    let idsSuffix = tableBtnsMeta['ids-suffix'];
    let useableConditions = tableBtnsMeta['useableConditions'];
    
    for (let i = 0; i < names.length; i++) {
        let btn = {
            'btnName': names[i],
            'btnIcon': 'fa fa-' + icons[i],
            'btnAttrs': {
                'class': 'btn btn-primary',
                'id': 'table-btn-' + idsSuffix[i],
                'data-toggle': 'modal',
                'data-target': '#modal-' + idsSuffix[i],
            },
        };
        
        let useableCondition = '';
        
        switch (useableConditions[i]) {
            case 0:
                useableCondition = 'always';
                break;
            case 1:
                useableCondition = 'oneSelectedOnly';
                break;
            case 2:
                useableCondition = 'selectedOnly';
                break;
        }
        
        btn['useableCondition'] = useableCondition;
        
        tableBtnsInfo.push(btn);
    }
    
    return tableBtnsInfo;
}

namespace['func']['getNames'] = function (columnIndex = 2) {
    let $trs = $('#table-content-body input:checked').closest('tr');
    let names = '';
    
    for (let i = 0; i < $trs.length; i++) {
        let name = $($trs[i]).find(`td:eq(${columnIndex})`).text();
        names += ', ' + name;
    }
    
    return names.substring(2);  // 去掉前面的空格和逗号
}

namespace['func']['getIds'] = function (trs) {
    let $trs = trs || $('#table-content-body input:checked').closest('tr');
    let ids = '';
    
    for (let i = 0; i < $trs.length; i++) {
        let id = $($trs[i]).attr('data-item-id');
        ids += ',' + id;
    }
    
    return ids.substring(1);
}
