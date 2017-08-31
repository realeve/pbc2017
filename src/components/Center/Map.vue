<template>
  <div>
    <div ref="chart" class="chart">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import chinaJson from './js/china.json';
  import mapChart from './js/mapOption.js';

  export default {
    data() {
      return {
        cityData: []
      }
    },
    computed: {
      chart() {
        return echarts.init(this.$refs.chart)
      }
    },
    methods: {
      resizeChart() {
        this.chart.resize();
      },
      initEvent() {
        window.onresize = () => {
          this.resizeChart();
        }
        this.chart.on('click',(params)=>{
          if(params.seriesIndex == 0){
            let province = params.name;
            this.$store.commit('setCurProvince',province);
          }
        })
      },
      getData() {
        let url = this.$baseurl + 'page/';
        if(process.env.NODE_ENV == 'development'){
          url = 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByProv';
        }
        this.$http.jsonp(url).then(res => {
          let provData = res.data;
          this.chart.setOption(mapChart.refreshMain(provData));

        }).catch(e=>console.log(e));
        
        url = this.$baseurl + 'page2/';
        if(process.env.NODE_ENV == 'development'){
          url = 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByCity&Prov=四川';
        }
        this.$http.jsonp(url).then(res => {
          let provData = res.data;
          let option = mapChart.refreshScatter(provData);
          this.chart.setOption(option);
          this.$store.commit('setTop20Cities',provData);
        }).catch(e=>console.log(e))
      },
      refreshChart() {
        this.chart.setOption(mapChart.init());
        this.getData();

        // 20秒更新一次数据
        // setInterval(() => {
        //   this.getData();
        // }, 20000);
      },
      init() {
        echarts.registerMap('china', chinaJson);
        this.refreshChart();
        this.initEvent();
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
    min-height: 100vh;
  }

</style>
