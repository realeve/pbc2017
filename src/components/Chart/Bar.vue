<template>
  <div>
    <div class="wrap-title">参与城市 TOP 20</div>
    <div ref="chart" class="chart data-wrapper">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import pieChart from './js/barOption.js';

  export default {
    data() {
      return {
        cityData: []
      }
    },
    computed: {
      chart() {
        return echarts.init(this.$refs.chart);
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
      getData() {
        let url = 'http://cbpc540.applinzi.com/index.php';
        let params = {
          s: '/addon/Api/Api/commentByCity',
          curid: this.curId
        }
        this.$http.jsonp(url, {
          params
        }).then(res => {
          this.cityData = res.data;
          this.chart.setOption(pieChart.refresh(this.cityData));
        })
      },
      refreshChart() {
        this.chart.setOption(pieChart.init());
      },
      init() {
        this.getData();
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

</style>
