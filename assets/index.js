var dom = document.getElementById('container')
var myChart = echarts.init(dom)
var app = {}
option = null
var commonOption = {
  backgroundColor: 'rgb(60,70,86)',
  title: [{
    text: '现金使用问卷调查各地参与情况',
    subtext: '技术支持：中国印钞造币总公司',
    left: '23%',
    top: 30,
    textStyle: {
      color: '#fafafa',
      fontSize: '30'
    },
    subtextStyle: {
      color: '#fdfdfd',
      fontSize: 16
    }
  }, {
    text: '说明：微信未设置地理信息用户及\n不在中国区域用户均不显示。',
    x2: '10',
    y2: '5',
    textStyle: {
      color: '#bbb',
      fontSize: 12
    }
  }, {
    id: 'statistic',
    right: '10',
    top: '10',
    // width: 100,
    textStyle: {
      color: '#fff',
      fontSize: 16
    }
  }, {
    id: 'curNum',
    textAlign: 'left',
    left: '20',
    y2: '20',
    textStyle: {
      fontSize: 30,
      color: 'rgba(255, 255, 255, 0.9)'
    }
  }],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    y: 'bottom',
    x: 'right',
    data: [{
      icon: 'circle',
      name: '会'
    }, {
      icon: 'circle',
      name: '不会'
    }],
    textStyle: {
      color: '#fff'
    },
    selectedMode: 'single'
  },
  grid: {
    right: 20,
    top: '45%',
    bottom: 40,
    width: '14%'
  },
  xAxis: {
    id: 'bar',
    type: 'value',
    scale: true,
    position: 'top',
    boundaryGap: false,
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      margin: 2,
      textStyle: {
        color: '#aaa'
      }
    }
  },
  yAxis: {
    id: 'bar',
    type: 'category',
    nameGap: 16,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#ddd'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: '#fafafa'
      }
    },
    data: []
  },
  visualMap: {
    left: 'left',
    top: 'bottom',
    calculable: true,
    color: ['rgb(42,137,184)', 'rgb(217,78,93)'].reverse(),
    show: false,
    max: 2000
  },
  series: [{
    id: 'main',
    name: '参与人数',
    type: 'map',
    mapType: 'china',
    showLegendSymbol: false,
    roam: true,
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true,
        textStyle: {
          color: '#fefefe'
        }
      },
      emphasis: {
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: '#ddb926'
      }
    },
    left: '1%',
    right: '25%'
  }, {
    type: 'map',
    id: 'detail',
    roam: true,
    showLegendSymbol: false,
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
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
        areaColor: '#fefefe'
      },
      emphasis: {
        areaColor: '#389BB7',
        borderWidth: 0
      }
    },
    animation: true,
    left: '75%',
    right: 'auto',
    top: '10',
    bottom: '58%'
  }, {
    id: 'bar',
    name: '各地区详情',
    zlevel: 2,
    type: 'bar',
    symbol: 'none',
    label: {
      normal: {
        formatter: '{c}',
        position: 'insideRight',
        show: false,
        textStyle: {
          color: '#233'
        }
      }
    },
    data: [],
    barMaxWidth: 40
  }]
}

myChart.setOption(commonOption, true)

function refreshMainMap() {
  $.ajax({
    url: 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByProv',
    async: false, // 异步
    dataType: 'jsonp',
    callback: 'Jsonpcallback'
  }).done(function(data) {
    data.sort((b, a) => a.value - b.value)
    var max = parseInt(data[0].value) + 1
    myChart.setOption({
      series: [{
        id: 'main',
        data
      }],
      visualMap: {
        max
      }
    })
  })
}

function convProvData(prov, city) {
  var province = {
    '贵州': ['贵阳市', '六盘水市', '黔东南苗族侗族自治州', '黔西南布依族苗族自治州', '黔南布依族苗族自治州', '遵义市', '铜仁市', '毕节市', '安顺市'],
    '河南': ['孟州市', '安阳市', '鹤壁市', '焦作市', '开封市', '洛阳市', '南阳市', '平顶山市', '三门峡市', '商丘市', '新乡市', '信阳市', '许昌市',
      '郑州市', '周口市', '驻马店市', '漯河市', '濮阳市', '济源市'
    ],
    '山东': ['淄博市', '枣庄市', '滨州', '烟台市', '潍坊市', '威海市', '泰安市', '日照市', '青岛市', '临沂市', '聊城市', '莱芜市', '济宁市',
      '济南市', '菏泽市', '东营市', '德州市', '滨州市', '平度市', '蓬莱市'
    ],
    '四川': ['阿坝藏族羌族自治州', '巴中市', '广安市', '资阳市', '眉山市', '峨眉山市', '凉山彝族自治州', '成都市', '达州市', '德阳市', '广元市',
      '乐山市', '甘孜藏族自治州', '绵阳市', '南充市', '内江市', '攀枝花市', '遂宁市', '雅安市', '宜宾市', '自贡市', '泸州市'
    ],
    '江苏': ['太仓市', '江阴市', '海门市', '昆山市', '常熟市', '张家港市', '泰州市', '宿迁市', '常州市', '淮安市', '连云港市', '南京市', '南通市',
      '苏州市', '无锡市', '徐州市', '盐城市', '扬州市', '镇江市'
    ],
    '青海': ['海东市', '黄南藏族自治州', '果洛藏族自治州', '海西蒙古族藏族自治州', '海南藏族自治州', '海北藏族自治州', '玉树藏族自治州', '西宁市'],
    '新疆': ['阿拉尔市', '图木舒克', '北屯市', '哈密市', '石河子市', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '克孜勒苏柯尔克孜自治州', '伊犁哈萨克自治州',
      '伊犁市', '塔城地区', '阿克苏地区', '阿勒泰地区', '昌吉回族自治州', '哈密地区', '和田地区', '喀什地区', '克拉玛依市', '吐鲁番地区',
      '乌鲁木齐市', '五家渠市'
    ],
    '福建': ['福州市', '龙岩市', '南平市', '莆田市', '泉州市', '三明市', '厦门市', '漳州市', '石狮市', '晋江市', '宁德市', '建阳市', '福安市'],
    '浙江': ['温州市', '杭州市', '宁波市', '嘉兴市', '绍兴市', '湖州市', '金华市', '台州市', '舟山市', '衢州市', '丽水市'],
    '湖北': ['荆州市', '鄂州市', '恩施土家族苗族自治州', '黄石市', '荆门市', '武汉市', '咸宁市', '襄樊市', '黄冈市', '孝感市', '宜昌市', '仙桃市',
      '随州市', '广水市', '十堰市', '武穴市', '潜江市', '天门市', '襄阳市', '神农架林区'
    ],
    '天津': ['天津'],
    '江西': ['抚州市', '赣州市', '吉安市', '景德镇市', '九江市', '南昌市', '萍乡市', '上饶市', '新余市', '宜春市', '鹰潭市'],
    '西藏': ['扎囊', '丁青', '贡嘎', '尼玛', '八宿', '曲水', '班戈', '芒康', '洛隆', '堆龙德庆', '措勤', '比如', '尼木', '索县', '仁布',
      '巴青', '江达', '阿里地区', '那曲地区', '山南地区', '日喀则市', '林芝市', '拉萨市', '昌都市'
    ],
    '黑龙江': ['建三江市', '哈尔滨市', '鹤岗市', '大庆市', '鸡西市', '佳木斯市', '牡丹江市', '齐齐哈尔市', '双鸭山市', '绥化市', '伊春市', '黑河市',
      '七台河市', '松花江市', '大兴安岭地区'
    ],
    '广东': ['潮阳市', '南海市', '顺德市', '云浮市', '揭阳市', '广州市', '珠海市', '中山市', '肇庆市', '湛江市', '阳江市', '深圳市', '韶关市',
      '汕尾市', '汕头市', '清远市', '梅州市', '茂名市', '江门市', '惠州市', '河源市', '佛山市', '东莞市', '潮州市'
    ],
    '云南': ['昭通市', '玉溪市', '曲靖市', '昆明市', '东川市', '大理白族自治州', '楚雄彝族自治州', '保山市', '临沧市', '迪庆藏族自治州', '怒江傈僳族自治州',
      '丽江市', '德宏傣族景颇族自治州', '西双版纳傣族自治州', '普洱市', '文山壮族苗族自治州', '红河哈尼族彝族自治州'
    ],
    '北京': ['北京'],
    '广西': ['崇左市', '来宾市', '贺州市', '百色市', '防城港市', '南宁市', '梧州市', '北海市', '桂林市', '河池市', '柳州市', '钦州市', '玉林市',
      '贵港市'
    ],
    '陕西': ['商洛市', '安康市', '宝鸡市', '汉中市', '铜川市', '渭南市', '西安市', '咸阳市', '延安市', '榆林市'],
    '甘肃': ['张掖市', '武威市', '天水市', '平凉市', '临夏回族自治州', '兰州市', '酒泉市', '金昌市', '嘉峪关市', '甘南藏族自治州', '定西市', '白银市',
      '敦煌市', '陇南市', '庆阳市'
    ],
    '河北': ['保定市', '保定市', '沧州市', '承德市', '邯郸市', '衡水市', '廊坊市', '秦皇岛市', '石家庄市', '唐山市', '邢台市', '张家口市'],
    '吉林': ['白山市', '松原市', '白城市', '长春市', '吉林市', '辽源市', '四平市', '通化市', '延边朝鲜族自治州', '公主岭市', '珲春市'],
    '重庆': ['重庆'],
    '宁夏': ['吴忠市', '中卫市', '石嘴山市', '银川市', '固原市', '银南市'],
    '湖南': ['永州市', '常德市', '长沙市', '郴州市', '怀化市', '衡阳市', '零陵市', '娄底市', '邵阳市', '湘潭市', '益阳市', '岳阳市', '株洲市',
      '张家界市', '湘西土家族苗族自治州'
    ],
    '安徽': ['安庆市', '蚌埠市', '巢湖市', '池州市', '滁州市', '亳州市', '合肥市', '淮北市', '淮南市', '阜阳市', '黄山市', '六安市', '马鞍山市',
      '宿州市', '铜陵市', '芜湖市', '宣城市'
    ],
    '内蒙古': ['呼伦贝尔市', '通辽市', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布市', '巴彦淖尔市', '阿拉善盟', '临河市', '包头市', '赤峰市',
      '呼和浩特市', '乌海市', '鄂尔多斯市'
    ],
    '上海': ['上海'],
    '山西': ['长治市', '大同市', '晋城市', '临汾市', '忻州市', '太原市', '阳泉市', '运城市', '朔州市', '吕梁市', '晋中市'],
    '海南': ['琼海市', '海口市', '三亚市', '东方市', '文昌市', '儋州市', '五指山市', '万宁市', '三沙市', '临高县', '澄迈县', '定安县', '屯昌县',
      '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '琼中黎族苗族自治县', '保亭黎族苗族自治县', '陵水黎族自治县'
    ],
    '辽宁': ['鞍山市', '本溪市', '朝阳市', '大连市', '丹东市', '抚顺市', '阜新市', '锦州市', '辽阳市', '盘锦市', '沈阳市', '铁岭市', '营口市',
      '葫芦岛市'
    ],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台湾'],
    '海外': ['海外']
  }
  var cityList = province[prov]
  return city.map(function(cityName) {
    var name = cityName.name
    cityList.map(item => {
      if (item.includes(name)) {
        name = item
      }
    })
    return {
      name,
      value: cityName.value
    }
  })
}

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
    '澳门': 'aomen'
  }
  return provinceList[prov]
}

function setCityMap(data, province) {
  prov = getProvinceName(province)
  $.get('./json/province/' + prov + '.json', function(geoJson) {
    echarts.registerMap(prov, geoJson)
    myChart.setOption(option = {
      series: [{
        type: 'map',
        id: 'detail',
        name: province,
        mapType: prov,
        data
      }]
    })
  })
}

function refreshBarMap(data) {
  var yAxis = data.map(item => item.name)
  myChart.setOption(option = {
    series: [{
      id: 'bar',
      data
    }],
    yAxis: {
      id: 'bar',
      data: yAxis
    }
  })
}

function refreshProvMap(prov) {
  $.ajax({
    url: 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByCity&Prov=' + prov,
    async: false, // 异步
    dataType: 'jsonp',
    callback: 'Jsonpcallback'
  }).done(function(city) {
    var data = convProvData(prov, city)
    setCityMap(data, prov)
    refreshBarMap(data)
  })
}

function jsLeft(sl, leftn) {
  return sl.substring(0, leftn);
}

function jsRight(sr, rightn) {
  return sr.substring(sr.length - rightn, sr.length);
}

function now() {
  var date = new Date();
  var a = date.getFullYear();
  var b = jsRight(('0' + (date.getMonth() + 1)), 2);
  var c = jsRight(('0' + date.getDate()), 2);
  var d = jsRight('0' + date.getHours(), 2);
  var e = jsRight('0' + date.getMinutes(), 2);
  var f = jsRight('0' + date.getSeconds(), 2);
  var output = a + '-' + b + '-' + c + ' ' + d + ':' + e + ':' + f;
  return output;
}

function refreshPaperCount() {
  $.ajax({
    url: 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getPaperNum',
    async: false, // 异步
    dataType: 'jsonp',
    callback: 'Jsonpcallback'
  }).done(function(data) {
    myChart.setOption({
      title: [{
        id: 'curNum',
        text: '参与人数: ' + (parseInt(data[0].nums)).toLocaleString()
      }]
    })
  })
  $('[name="refreshTime"]').text('最近更新 ' + now());
}

myChart.on('click', function(params) {
  if (params.seriesIndex == 0) {
    refreshProvMap(params.name)
  }
})


refreshMainMap()
refreshPaperCount()

setInterval(function() {
  refreshMainMap()
}, 60 * 1000);
setInterval(function() {
  refreshPaperCount()
}, 5 * 1000);
