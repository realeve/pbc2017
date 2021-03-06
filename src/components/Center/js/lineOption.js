let getLineData = (hour = 4) => {
    let date = '2017/6/16';
    let data = [];
    for (let i = 0; i < 60; i++) {
        data.push([date + ' ' + hour + ':' + (i <= 9 ? '0' : '') + i, Math.ceil(Math.random() * 3000)])
    }
    return data;
}

function init() {
    let axisColor = '#989bb6';
    let lineColor = '#00d7fc';
    let option = {
        grid: {
            left: '0',
            right: '3%',
            bottom: '0',
            top: '5px',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'time',
            axisTick: {
                alignWithLabel: true
            },
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: axisColor,
                    width: 2,
                }
            },
            axisLabel: {
                formatter(date) {
                    return (new Date(date)).toLocaleTimeString().substr(0, 5);
                }
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: axisColor,
                    width: 1,
                }
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            id: 'line',
            type: 'line',
            smooth: true,
            // slient: true,
            animation: false,
            // 关初始动画
            hoverAnimation: false,
            color: [lineColor, '#F7023f'],
            data: [],
            symbolSize: 0,
            dimensions: ['时间', '评论数'],
            // itemStyle: {
            //     normal: {
            //         lineStyle: {
            //             shadowColor: '#2e76fd',
            //             shadowBlur: 4,
            //             shadowOffsetX: 0,
            //             shadowOffsetY: 0
            //         }
            //     }
            // }
        }]
    };
    return option;
}

let refresh = (data) => {
    let seriesData = data.map(item => [item.name, item.value]);
    let option = {
        series: [{
            id: 'line',
            data: seriesData //: getLineData(),
        }]
    };
    return option;
};

let refreshLine = (data) => {
    let hour = 10;
    let date = '2017/6/16';

    let lastTime = data[data.length - 1][0].split(' ')[1].split(':');

    for (var i = 0; i < 1; i++) {
        data.shift();
        let second = parseInt(lastTime[1]) + 1;
        hour = parseInt(lastTime[0]);
        if (second > 59) {
            second = 0;
            hour++;
        }
        if (hour > 23) {
            hour = 0;
        }
        let dateString = date + ' ' + hour + ':' + (second <= 9 ? '0' : '') + second;
        data.push([dateString, Math.ceil(Math.random() * 3000)]);
    }

    let option = {
        series: [{
            id: 'line',
            data,
        }]
    };
    return option;
}

export default { init, refresh, refreshLine };