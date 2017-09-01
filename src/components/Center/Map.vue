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
        cityData: [],
        provData: 0
      }
    },
    computed: {
      chart() {
        return echarts.init(this.$refs.chart)
      },
      peopleCount: {
        get() {
          return this.$store.state.peopleCount;
        },
        set(val) {
          this.$store.commit('setPeopleCount', val);
        }
      },
      needRefresh:{
        get(){
          return this.$store.state.needRefresh;
        },
        set(val){
          this.$store.commit('refresh',val);
        }
      }
    },
    watch: {
      needRefresh(val){
        if(val){
          this.getData();
        }
      },
      provData(data) {
        let sum = 0;
        data.forEach(item => {
          sum += parseInt(item.value);
        });
        this.peopleCount = sum;
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
        this.chart.on('click', (params) => {
          if (params.seriesIndex == 0) {
            let province = params.name;
            if(province == '香港' || province == '澳门'){
              province += '特别行政区';
            }
            this.$store.commit('setCurProvince', province);
          }
        })
      },
      getData() {
        let url = this.$baseurl + 'page/';
        // if (process.env.NODE_ENV == 'development') {
        //   url = 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByProv';
        // }
        this.$http.jsonp(url).then(res => {
          this.provData = res.data;
          this.chart.setOption(mapChart.refreshMain(this.provData));
        }).catch(e => console.log(e));

        url = this.$baseurl + 'page2/';
        // if (process.env.NODE_ENV == 'development') {
        //   url = 'http://cbpc540.applinzi.com/?s=/addon/Api/Api/getCountByCity&Prov=四川';
        // }
        this.$http.jsonp(url).then(res => {
          let provData = res.data;
          let option = mapChart.refreshScatter(provData);
          this.chart.setOption(option);
          this.$store.commit('setTop20Cities', provData);
          this.needRefresh = false;
        }).catch(e => console.log(e))
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
