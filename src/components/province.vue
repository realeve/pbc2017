<template>
  <div>
    <full-image/>
    <v-header/>
    <span class="info">说明：数据每分钟更新一次<br>点击省份或城市查看详情</span>
    <flexbox :gutter="0" wrap="wrap" class="content">
      <flexbox-item :span="1/7">
        <v-left class="left-content" />
      </flexbox-item>
      <flexbox-item :span="4/7">
        <v-center class="center-content" />
      </flexbox-item>
      <flexbox-item :span="2/7">
        <v-right class="right-content" />
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import FullImage from './IFullImage/index'
  import VHeader from './Header/';
  import VCenter from './Center.vue';
  import VLeft from './Left.vue';
  import VRight from './Right.vue';

  import {
    Flexbox,
    FlexboxItem
  } from 'vux';

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      FullImage,
      VHeader,
      VLeft,
      VCenter,
      VRight
    }
  }

</script>
<style scoped lang="less">
  @padding-top: 0px;
  @div-offset: 50px;
  .content {
    margin-top: @div-offset;
    color: #fff;
  }

  .center-content {
    padding: @padding-top 0px 0 0px;
  }

  .left-content {
    padding: @padding-top 5px 0px 0px;
  }

  .right-content {
    padding: @padding-top 0px 0px 0px;
    margin-top:-150px;
  }
  .info{
    position: absolute;
    right: 5px;
    top:5px;
    color:#f2f2f2;
    line-height: 14px;
    font-size:9pt;
  }
</style>
