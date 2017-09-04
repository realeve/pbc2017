function init(barWidth = 20) {
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
      barWidth,
      data: []
    }, {
      id: 'bar',
      type: 'bar',
      // stack: 'all',
      hoverAnimation: false,
      color: [lineColor],
      barMaxWidth: 20,
      barWidth,
      data: []
    }]
  };
  return option;
}

let refresh = (srcData) => {
  let Data = JSON.parse(JSON.stringify(srcData)).sort((a,b)=>a.value-b.value);
  let xAxis = Data.map(item => item.name);
  let yAxis = Data.map(item => item.value);
  let passedArr = Data.map(item=>item.passed);
  let stackData = yAxis.map(item => yAxis[yAxis.length-1]);
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
    }],
    tooltip:{
      formatter(param){
        let passed = passedArr[param.dataIndex];
        return param.name + '<br>参与人数:' + param.value + '人<br>通过人数：' + passed + '人';
      }
    }
  };
  return option;
};

export default {
  init,
  refresh
};
