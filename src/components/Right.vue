<template>
  <div>
    <div ref="chartProvince" class="chart">
    </div>
    <div ref="chartBar" class="chart">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import util from './right/index.js';

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
          let province = params.name;
          console.log(province);
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

        let jsonName = this.registerMap(province);
        this.$http.jsonp(url, {
          params
        }).then(res => {
          let data = res.data;
          let option = {
            series: [{
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
          console.log(option);
        })
      },
      registerMap(province) {
        let jsonName = util.getProvinceName(province);
        let mapJSON = require('./right/province/' + jsonName + '.json');
        echarts.registerMap(jsonName, mapJSON);
        return jsonName;
      },
      init() {
        this.registerMap('北京');
        this.initEvent();
        this.chart.setOption(util.defaultOption);
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
    min-height: 50vh;
  }

</style>
