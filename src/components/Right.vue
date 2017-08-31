<template>
  <div>
    <div ref="chartProvince" class="chart chart1">
    </div>
    <div style="display:flex;">
      <div ref="chartBar" class="chart2">
      </div>
      <div ref="chartBar" class="chart2">
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import util from './right/index.js';

  import barChart from './chart/js/barOption.js';

  export default {
    data() {
      return {
        cityData: []
      }
    },
    computed: {
      chart() {
        return echarts.init(this.$refs.chartProvince)
      },
      chartBar() {
        return echarts.init(this.$refs.chartBar)
      },
      curProvince() {
        return this.$store.state.curProvince;
      }
    },
    watch: {
      curProvince(val) {
        this.getProvinceData(val);
      }
    },
    methods: {
      resizeChart() {
        this.chart.resize();
        this.chartBar.resize();
      },
      initEvent() {
        window.onresize = () => {
          this.resizeChart();
        }
        this.chart.on('click', (params) => {
          let city = params.name;
          console.log(city);
        })
      },
      getProvinceData(province) {
        let url = this.$baseurl + 'page3/';
        let params = {
          province
        };
        if (process.env.NODE_ENV == 'development') {
          url = 'http://cbpc540.applinzi.com/';
          params = {
            s: '/addon/Api/Api/getCountByCity',
            prov: province
          };
        }

        let jsonName = util.getProvinceName(province); //this.registerMap(province);
        this.$http.jsonp(url, {
          params
        }).then(res => {
          let data = res.data;
          let option = {
            series: [{
              type: 'map',
              id: 'detail',
              name: province,
              mapType: jsonName,
              data: data
            }],
            visualMap: {
              max: 1122
            }
          };
          this.chart.setOption(option);

          this.chartBar.setOption(barChart.refresh(data));
        })
      },
      registerMap(province) {
        let jsonName = util.getProvinceName(province);
        let mapJSON = require('./right/province/' + jsonName + '.json');
        echarts.registerMap(jsonName, mapJSON);
        return jsonName;
      },
      init() {
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
          '澳门'
        ];
        provList.forEach(item => {
          this.registerMap(item);
        })
        this.initEvent();
        this.chart.setOption(util.defaultOption);
        this.chartBar.setOption(barChart.init());
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
    min-height: 50vh;
    width: 50%;
  }

</style>
