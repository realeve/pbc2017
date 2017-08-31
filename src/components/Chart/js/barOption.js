function init() {
  let axisColor = '#fefefe';
  let lineColor = '#17b8f0';
  let option = {
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '0',
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: axisColor,
          width: 2,
        }
      },
      data: []
    },
    xAxis: [{
      type: 'value',
      splitNumber: 4,
      axisLabel: {
        show: false
      },
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
      id: 'stack',
      type: 'bar',
      // stack: 'all',
      silent: true,
      barGap: '-100%',
      color: ['#153465'],
      barMaxWidth: 20,
      barWidth:20,
      data: []
    }, {
      id: 'bar',
      type: 'bar',
      // stack: 'all',
      hoverAnimation: false,
      color: [lineColor],
      barMaxWidth: 20,
      barWidth:20,
      data: []
    }]
  };
  return option;
}

let refresh = (Data) => {
  let xAxis = Data.map(item => item.name);
  let yAxis = Data.map(item => item.value);
  let stackData = yAxis.map(item => yAxis[0]);
  let option = {
    yAxis: {
      data: xAxis
    },
    series: [{
      id: 'bar',
      data: yAxis,
    }, {
      id: 'stack',
      data: stackData
    }]
  };
  return option;
};

export default {
  init,
  refresh
};
