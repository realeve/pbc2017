<template>
  <div>
    <div class="wrap-title">参与城市 TOP 20</div>
    <div ref="chart" class="chart data-wrapper">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import barChart from './js/barOption.js';

  export default {
    data() {
      return {
        cityData: []
      }
    },
    computed: {
      chart() {
        return echarts.init(this.$refs.chart);
      },
      cities(){
        return this.$store.state.top20Cities;
      }
    },
    watch:{
      cities(data){
        this.chart.setOption(barChart.refresh(data));
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
      },
      refreshChart() {
        this.chart.setOption(barChart.init());
      },
      init() {
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
    min-height: 80vh;
    width: 100%;
  }
  .wrap-title{
    margin-bottom:5px;
    color: rgb(255, 204, 0);
  }
</style>
