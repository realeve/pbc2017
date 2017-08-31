<template>
  <div>
    <full-image/>
    <v-header/>
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
    padding: @padding-top 10px 0 10px;
  }

  .left-content {
    padding: @padding-top 25px 0px 10px;
  }

  .right-content {
    padding: @padding-top 10px 0px 0px;
  }

</style>
