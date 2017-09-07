import settings from './geoCoord';

let geoCoordMap = settings.geoCoord;

let convertScatterData = data => {
    let arr = [];
    data.forEach(item => {
        let geo = geoCoordMap(item.name);
        if (geo.length == 0) {
            return;
        }
        arr.push({
            name: item.name,
            value: geo.concat([item.value])
        });
    });
    return arr;
}

let getTopData = srcData => {
    srcData.sort((a, b) => b.value - a.value);
    let data = convertScatterData(srcData.slice(0, 20));
    data = data.map((item, i) => {
        item.name = `${i + 1}.${item.name}`;
        return item;
    });
    return {
        data,
        sort: {
            max: data[0].value,
            min: data[data.length - 1].value
        }
    }
}

let getSymbolSize = (sort, val) => {
    return Math.ceil(10 * (val - sort.min[2]) / (sort.max[2] - sort.min[2])) + 1;
}

function init() {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter(param) {
                return param.name + '<br>参与人数:' + param.data.value + '人<br>通过人数：' + param.data.passed + '人';
            }
        },
        visualMap: {
            type: 'piecewise',
            left: 'left',
            top: 'bottom',
            calculable: true,
            color: ['#21f', '#ff202a'].reverse(),            
            pieces: [
                {
                    max: 10000
                }, {
                    min: 10001,
                    max: 20000
                }, {
                    min: 20001,
                    max: 30000
                }, {
                    min: 30001,
                    max: 45000
                }, {
                    min: 60001
                }
            ],
            textStyle: {
                color: '#fff'
            },
            // show: false,
            max: 50000,
            seriesIndex: 0
        },
        geo: {
            show: true,
            roam: false,
            map: 'china',
            center: [
                105, 38
            ],
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#282b76',
                    borderColor: '#fff',
                    opacity: 0
                },
                emphasis: {
                    areaColor: '#1273bc'
                }
            },
            zoom: 1.2,
            regions: [
                {
                    name: '北京',
                    selected: true
                }
            ]
        },
        series: [
            {
                id: 'main',
                name: '参与人数',
                type: 'map',
                mapType: 'china',
                showLegendSymbol: false,
                roam: false,
                center: [
                    105, 38
                ],
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#282b76',
                        borderColor: '#fff',
                        opacity: 0.7
                    },
                    emphasis: {
                        areaColor: '#1273bc'
                    }
                },
                zoom: 1.2
            }, {
                id: 'scatter',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    normal: {
                        color: '#fff', // '#f4e925',
                        opacity: 0.7
                    }
                },
                data: []
            }, {
                id: 'top20',
                name: 'Top20',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 3,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        textStyle: {
                            color: '#fc0'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fc0',
                        // color: '#0ecdec',
                    }
                },
                data: []
            }
        ]
    };

    return option;
}

let refreshMain = Data => {
    let option = {
        series: [
            {
                id: 'main',
                data: Data
            }
        ],
        visualMap: {
            max: Math.ceil(Data.sort((b, a) => a.value - b.value)[0].value / 100) * 100
        }
    };
    return option;
};

let refreshScatter = Data => {
    let topData = getTopData(Data);
    let data = convertScatterData(Data);
    let option = {
        series: [
            {
                id: 'scatter',
                symbolSize: val => getSymbolSize(topData.sort, val[2]),
                data
            }, {
                id: 'top20',
                symbolSize: val => getSymbolSize(topData.sort, val[2]),
                data: topData.data
            }
        ]
    };
    return option;
};

export default {
    init,
    refreshMain,
    refreshScatter
};
