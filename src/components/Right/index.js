function getProvinceName(prov) {
  var provinceList = {
    '上海': 'shanghai',
    '河北': 'hebei',
    '山西': 'shanxi',
    '内蒙古': 'neimenggu',
    '辽宁': 'liaoning',
    '吉林': 'jilin',
    '黑龙江': 'heilongjiang',
    '江苏': 'jiangsu',
    '浙江': 'zhejiang',
    '安徽': 'anhui',
    '福建': 'fujian',
    '江西': 'jiangxi',
    '山东': 'shandong',
    '河南': 'henan',
    '湖北': 'hubei',
    '湖南': 'hunan',
    '广东': 'guangdong',
    '广西': 'guangxi',
    '海南': 'hainan',
    '四川': 'sichuan',
    '贵州': 'guizhou',
    '云南': 'yunnan',
    '西藏': 'xizang',
    '陕西': 'shanxi1',
    '甘肃': 'gansu',
    '青海': 'qinghai',
    '宁夏': 'ningxia',
    '新疆': 'xinjiang',
    '北京': 'beijing',
    '天津': 'tianjin',
    '重庆': 'chongqing',
    '香港': 'xianggang',
    '澳门': 'aomen',
    '台湾': 'taiwan'
  }
  return provinceList[prov]
}

function defaultOption(map = 'beijing') {
  return {
    tooltip: {
      trigger: 'item',
      formatter(param) {
        return param.name + '<br>参与人数:' + param.data.value + '人<br>通过人数：' + param.data.passed + '人';
      }
    },
    grid: {
      right: 0,
      top: 0,
      bottom: 0,
      width: 0
    },
    visualMap: {
      left: 'left',
      top: 'bottom',
      calculable: true,
      color: ['#43f', 'rgb(255,58,73)'].reverse(),
      // color: ['rgb(42,137,184)', 'rgb(217,78,93)'].reverse(),
      show: false,
      max: 2000
    },
    series: [{
      type: 'map',
      id: 'detail',
      mapType: map,
      roam: true,
      showLegendSymbol: false,
      label: {
        normal: {
          formatter: '{b}',
          position: 'center',
          show: true,
          textStyle: {
            color: '#fefefe'
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#fefefe'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#389BB7',
          areaColor: '#fefefe',
          opacity: 0.5
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      animation: true
    }]
  };
}

export default {
  getProvinceName,
  defaultOption
}
