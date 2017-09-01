<template>
  <div>
    <div class="wrap-title">参与城市 TOP 20</div>
    <div ref="chart" class="chart data-wrapper">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import barOption from './js/baroption.js';

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
      cities() {
        return this.$store.state.top20Cities;
      },
      curCity: {
        get() {
          return this.$store.state.curCity;
        },
        set(val) {
          this.$store.commit('setCurCity', val);
        }
      }
    },
    watch: {
      cities(data) {
        this.chart.setOption(barOption.refresh(data));
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

        this.chart.on('click', params => {
          let city = params.name;
          if (typeof city == 'undefined') {
            return;
          }
          this.curCity = city;
        });
      },
      refreshChart() {
        this.chart.setOption(barOption.init());
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

  .wrap-title {
    margin-bottom: 5px;
    color: rgb(255, 204, 0);
  }

</style>
