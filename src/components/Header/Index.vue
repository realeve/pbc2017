<template>
  <div class="header">
    <div class="main_wrapper">
      <div class="main_img"></div>
    </div>
    <div class="back_wrapper">
      <div class="back_img"></div>
    </div>
    <div class="main-text">
      <div class="word">
        <div class="title">反假币宣传活动</div>
        <div class="main-title">各地区参与情况</div>
      </div>
    </div>
    <div class="center">
      <div class="cbpc">中国人民银行 货币金银局</div>
    </div>
    <div class="counter-container">
      <span class="prefix">参与人数</span>
      <countup :end-val="counter.end" :duration="2" :options="counter.options"></countup>
    </div>
    <div class="center">
      <div class="cbpc info">技术支持：中国印钞造币总公司</div>
    </div>
  </div>
</template>

<script>
  import Countup from './Countup/';
  // 此处使用自定义Countup,将数值分离
  export default {
    components: {
      Countup
    },
    data() {
      return {
        counter: {
          start: 0,
          end: 0,
          // options: {
          //   useGrouping: false
          // }
        }
      }
    },
    computed:{
      peopleCount(){
        return this.$store.state.peopleCount;
      }
    },
    watch:{
      peopleCount(){
        this.autoAdd();
      }
    },
    methods: {
      autoAdd() {
        this.counter.end = this.peopleCount;
        this.refreshCounter(this.counter.end);
      },
      refreshCounter(val) {
        this.counter.start = this.counter.end;
        this.counter.end = val;
      }
    },
    mounted() {
      this.autoAdd();
    }
  }

</script>

<style scoped lang="less">
  @white: #fff;

  .center {
    display: flex;
    justify-content: center;
  }

  .main_wrapper {
    .center;
    margin-top: -10px;
    .main_img {
      width: 800px;
      height: 160px;
      background-image: url('./img/header_back.png');
      background-repeat: no-repeat;
      background-size: 100% 120px;
    }
  }

  .back_wrapper {
    .center;
    .back_img {
      margin-top: -150px;
      width: 500px;
      height: 235px;
      background-image: url('./img/main.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  @main-text-size: 90pt;
  .main-text {
    .center;
    margin-top: -235px;
    color: @white; // text-shadow: 0 5px 14px #c4b59d, 1px -1px 1px #fff;
    .number {
      line-height: 0pt;
      font-size: @main-text-size;
      .center;
      align-items: center;
    }

    .word {
      .title,
      .main-title {
        font-weight: bold;
        text-align: center;
        line-height: 35pt;
        letter-spacing: 25px;
        font-size: 25pt;
        padding-left: 20px;
      }
      .main-title {
        border-top: 3px solid rgb(253, 192, 5);
      }
    }
  }

  .cbpc {
    .center; // height: 30px;
    // padding-top: 10px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(255, 204, 0);
    font-weight: normal;
    font-size: 14pt;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 8pt;
    overflow: hidden;
  }

  .info {
    font-size: 10pt;
    letter-spacing: 3pt;
  }

  .counter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(255, 204, 0);
    text-align: center;
    white-space: nowrap;
    line-height: normal;
    font-family: "Microsoft Yahei";
    margin-top: 5px;
    .prefix {
      font-size: 30px;
      font-size: 16pt;
      color: rgb(255, 204, 0);
      vertical-align: super;
      padding-right: 15px; //transform: scale(1,2);
    }
    .number {
      background-color: rgb(52, 19, 68);
      display: inline-block;
      letter-spacing: 0.02em;
      text-indent: 0.02em;
      height: auto;
      line-height: normal;
      font-size: 56px;
      letter-spacing: 0.02em;
      margin-right: 0.2em;
    }
  }

</style>
