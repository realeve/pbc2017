<template>
  <v-chart class="margin-top-15" />
</template>

<script>
  import VChart from './Chart/Bar.vue';

  export default {
    components: {
      VChart
    },
  }

</script>

<style scoped lang="less">
  .margin-top-15 {
    margin-top: 10px;
  }

</style>
