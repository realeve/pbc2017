<template>
  <div v-if="isPC">
    <div ref="chartProvince" class="chart chart1">
    </div>
    <div class="chart2">
      <div class="item">
        <div class="sub-title">{{curProvince}}</div>
        <div ref="chartBar" class="bar-chart">
        </div>
      </div>
      <div class="item">
        <div class="sub-title">{{curCity}}</div>
        <div ref="chartBar2" class="bar-chart">
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="item" style="margin-top:40px;">
      <div class="sub-title">{{curProvince}}</div>
      <div ref="chartBar" class="mobile">
      </div>
      <div ref="chartBar2" class="mobile">
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import util from './right/index.js';

  import barChart from './Chart/js/baroption.js';

  export default {
    data() {
      return {
        cityData: [],
        map: ''
      }
    },
    computed: {
      chartBar() {
        return echarts.init(this.$refs.chartBar);
      },
      chart() {
        if (!this.isPC) {
          return;
        }
        return echarts.init(this.$refs.chartProvince);
      },
      chartBar2() {
        // if (!this.isPC) {
        //   return;
        // }
        return echarts.init(this.$refs.chartBar2);
      },
      curProvince: {
        get() {
          return this.$store.state.curProvince;
        },
        set(val) {
          this.$store.commit('setCurProvince', val);
        }
      },
      curCity: {
        get() {
          return this.$store.state.curCity;
        },
        set(val) {
          this.$store.commit('setCurCity', val);
        }
      },
      needRefresh: {
        get() {
          return this.$store.state.needRefresh;
        },
        set(val) {
          this.$store.commit('refresh', val);
        }
      },
      isPC() {
        return this.$store.state.isPC;
      }
    },
    watch: {
      needRefresh(val) {
        if (val) {
          this.getProvinceData(this.curProvince);
          this.getCityData(this.curCity);
        }
      },
      curProvince(val) {
        this.getProvinceData(val);
        this.updateLocalStorage();
      },
      curCity(val) {
        // if (!this.isPC) {
        //   return;
        // }
        this.getCityData(val);
        this.updateLocalStorage();
      }
    },
    methods: {
      loadStorage() {
        let setting = localStorage.getItem('setting');
        if (setting == null) {
          return;
        }
        setting = JSON.parse(setting);
        this.curProvince = setting.prov;
        this.curCity = setting.city;
        this.map = setting.map;
      },
      updateLocalStorage() {
        let setting = {
          city: this.curCity,
          prov: this.curProvince,
          map: util.getProvinceName(this.curProvince)
        };
        localStorage.setItem('setting', JSON.stringify(setting));
      },
      resizeChart() {
        this.chart.resize();
        this.chartBar.resize();
      },
      initEvent() {
        window.onresize = () => {
          this.resizeChart();
        }
        let refreshCity = params => {
          let city = params.name;
          if (typeof city == 'undefined') {
            return;
          }
          this.curCity = city;
        };
        this.chartBar.on('click', params => refreshCity(params));
        if (!this.isPC) {
          return;
        }
        this.chart.on('click', params => refreshCity(params));
      },
      getCityData(city) {
        // if (!this.isPC) {
        //   return;
        // }
        // this.curCity = city;
        let url = this.$baseurl + 'page6/';
        let params = {
          city
        };
        // if (process.env.NODE_ENV == 'development') {
        //   url = 'http://cbpc540.applinzi.com/';
        //   params = {
        //     s: '/addon/Api/Api/getCountByCity',
        //     prov: '江苏'
        //   };
        // }
        this.$http.jsonp(url, {
          params
        }).then(res => {
          let option = barChart.refresh(res.data);
          this.chartBar2.setOption(option);
          this.needRefresh = false;
        })

      },
      getProvinceData(province) {
        this.curProvince = province;
        let url = this.$baseurl + 'page3/';
        let params = {
          province
        };
        // if (process.env.NODE_ENV == 'development') {
        //   url = 'http://cbpc540.applinzi.com/';
        //   params = {
        //     s: '/addon/Api/Api/getCountByCity',
        //     prov: province
        //   };
        // }

        this.map = util.getProvinceName(province);
        this.$http.jsonp(url, {
          params
        }).then(res => {
          let data = res.data;

          let maxCity = data.sort((b, a) => a.value - b.value)[0]
          let max = typeof maxCity == 'undefined' ? 0 : Math.ceil(maxCity.value / 100) * 100;
          let option = {
            series: [{
              type: 'map',
              id: 'detail',
              name: province,
              mapType: this.map,
              data: data
            }],
            visualMap: {
              max
            }
          };
          // console.log(option);
          if(this.isPC){            
            this.chart.setOption(option);
          }
          this.curCity = typeof maxCity == 'undefined' ? '' : maxCity.name;
          this.chartBar.setOption(barChart.refresh(data));

          this.needRefresh = false;
        })
      },
      registerMap(province) {
        let jsonName = util.getProvinceName(province);
        let mapJSON = require('./right/province/' + jsonName + '.json');
        echarts.registerMap(jsonName, mapJSON);
        return jsonName;
      },
      initEChartsData() {
        if (!this.isPC) {
          return;
        }
        let provList = [
          '上海',
          '河北',
          '山西',
          '内蒙古',
          '辽宁',
          '吉林',
          '黑龙江',
          '江苏',
          '浙江',
          '安徽',
          '福建',
          '江西',
          '山东',
          '河南',
          '湖北',
          '湖南',
          '广东',
          '广西',
          '海南',
          '四川',
          '贵州',
          '云南',
          '西藏',
          '陕西',
          '甘肃',
          '青海',
          '宁夏',
          '新疆',
          '北京',
          '天津',
          '重庆',
          '香港',
          '澳门',
          '台湾'
        ];
        provList.forEach(item => {
          this.registerMap(item);
        })
      },
      init() {
        this.initEChartsData();
        this.loadStorage();
        this.initEvent();
        this.chartBar.setOption(barChart.init(this.isPC ? 10 : 20));
        this.chartBar2.setOption(barChart.init(10));
        if (!this.isPC) {
          return;
        }
        this.chart.setOption(util.defaultOption(this.map));
      }
    },
    mounted() {
      this.init();
    }
  }

</script>

<style scoped lang="less">
  .chart {
    width: 100%;
    margin: 15px auto;
  }

  .chart1 {
    min-height: 40vh;
  }

  .chart2 {
    min-height: 55vh;
    width: 100%;
    display: flex;
    .item {
      width: 50%;
    }
    .bar-chart {
      min-height: 55vh;
    }
  }

  .mobile {
    width: 100%;
    min-height: 90vh;
  }

</style>
