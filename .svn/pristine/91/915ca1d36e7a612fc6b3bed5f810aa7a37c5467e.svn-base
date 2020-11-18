const onCompleteFunc = function(){
    var ctx = this.chart.ctx;
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';

    this.config.data.datasets.forEach(function (dataset) {
        let bars = [];
        let data = dataset.data;
        let metaData = dataset['_meta']['0'] || dataset['_meta']['1'] || dataset['_meta']['2'];
        for(let i=0;i<dataset.data.length;i++){
            bars.push({
                value:data[i],
                x:metaData['data'][i]['_model']['x'],
                y:metaData['data'][i]['_model']['y']
            })
        }
        bars.forEach(function (bar) {
            ctx.fillText(bar.value, bar.x - 10, bar.y + 5);
        });
    });
}
const globalOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive:false,
        animation:{
            onComplete: onCompleteFunc
        }
    }

const ctx1 = document.getElementById('myChart-1').getContext('2d');
const ctx2 = document.getElementById('myChart-2').getContext('2d');
const ctx3 = document.getElementById('myChart-3').getContext('2d');

const myChart1 = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
        labels: ['批注总数（条）', '批注总字数（字）', '阅读总人数（人）', '所有学生总阅读的本数（本）', '所有学生阅读的总字数（百字）'],
        datasets: [{
            label: '信息统计',
            data: [17, 79, 4, 6, 10.65],
            backgroundColor: 'rgba(24, 144, 255, 1)',
        }]
    },
    options: globalOptions,
});
const myChart2 = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels: ['批注总条数（条）', '批注总字数（字）'],
        datasets: [{
            label: '获批注最多的书籍: 迟暮，bookId: 150',
            data: [8, 79],
            backgroundColor: 'rgba(24, 144, 255, 1)',
        }]
    },
    options: globalOptions,
});
const myChart3 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: {
        labels: ['总回复数（条）', '老师回复数（字）', '学生回复数（条）'],
        datasets: [{
            label: '信息统计',
            data: [10, 1, 9],
            backgroundColor: 'rgba(24, 144, 255, 1)',
        }]
    },
    options: globalOptions,
});

// =========================================================================
const post = function(url, config) {
    let res;
    $.ajaxSettings.async = false;
    $.post(url, config, response => {
            res = response;
        }
    )
    $.ajaxSettings.async = true;
    
    return res;
}

const urls = {
    getAllStatistics: namespace['rootUrl'] + 'statistics/allStatistics.action'
}

const getAllStatistics = function() {
    let response = post(urls.getAllStatistics, {});
    
    let information = {};
    for (let i = 0; i < response.length; i++) {
        for (let attr in response[i]) {
            information[attr] = response[i][attr];
        }
    }
    return information;
}

const information = getAllStatistics();

$('#card-4').append(
    // 评论最多的批注
    $('<div/>').append(
        $('<span class="card-content-item-left"/>').text('获评论最多的批注'),
        $('<span class="maohao"/>').text('：'),
        $('<span class="card-content-item-right"/>').text(information['annotationContent']),
    ),
    $('<div/>').append(
        $('<span class="card-content-item-left"/>').text('该批注对应的原文内容'),
        $('<span class="maohao"/>').text('：'),
        $('<span class="card-content-item-right"/>').text(information['text']),
    ),
    $('<div/>').append(
        $('<span class="card-content-item-left"/>').text('该批注获得的回复条数'),
        $('<span class="maohao"/>').text('：'),
        $('<span class="card-content-item-right"/>').text(information['annotationNum'] + '条'),
    ),
    $('<div/>').append(
        $('<span class="card-content-item-left"/>').text('评论最多的学生'),
        $('<span class="maohao"/>').text('：'),
        $('<span class="card-content-item-right"/>').text(information['USER_NAME']),
    ),
);

$('#myChart-1').css('width','1160px');