import settings from './geoCoord';

let geoCoordMap = settings.geoCoord;

let convertScatterData = data => {
  let arr = [];
  data.forEach(item => {
    if (typeof geoCoordMap[item.name] != 'undefined') {
      arr.push({
        name: item.name,
        value: geoCoordMap[item.name].concat([item.value])
      });
    }
  });
  return arr;
}

let getTopData = data => {
  data.sort((a, b) => b.value - a.value);

  return {
    data: convertScatterData(data.slice(0, 9)),
    sort: {
      max: data[0].value,
      min: data[data.length - 1].value
    }
  }
}

let getSymbolSize = (sort, val) => {
  return Math.ceil(10 * (val - sort.min) / (sort.max - sort.min)) + 3;
}

function init() {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter(param) {
        if (param.seriesIndex == 0) {
          return param.seriesName + ':<br>' + param.name + ':' + param.value + '人';
        }
        return '参与人数:<br>' + param.name + ':' + param.value[2] + '人';
      }
    },
    visualMap: {
      left: 'left',
      top: 'bottom',
      calculable: true,
      color: ['#43f', 'rgb(255,58,73)'].reverse(),
      show: false,
      max: 50000,
      seriesIndex: 0
    },
    geo: {
      show: true,
      roam: false,
      map: 'china',
      center: [105, 38],
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
      regions: [{
        name: '北京',
        selected: true
      }]
    },
    series: [{
      id: 'main',
      name: '参与人数',
      type: 'map',
      mapType: 'china',
      showLegendSymbol: false,
      roam: false,
      center: [105, 38],
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
    }]
  };

  return option;
}

let refreshMain = Data => {
  let option = {
    series: [{
      id: 'main',
      data: Data
    }]
  };
  return option;
};

let refreshScatter = Data => {
  let topData = getTopData(Data);
  let option = {
    series: [{
      id: 'scatter',
      symbolSize: val => getSymbolSize(topData.sort, val[2]),
      data: convertScatterData(Data)
    }]
  };
  return option;
};

export default {
  init,
  refreshMain,
  refreshScatter
};
