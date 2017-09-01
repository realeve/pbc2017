<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      needRefresh: {
        get() {
          return this.$store.state.needRefresh;
        },
        set(val) {
          this.$store.commit('refresh', val);
        }
      }
    },
    mounted(){
      setInterval(()=>{
        this.needRefresh = true;
      },this.$store.state.refreshInterval);
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

</style>
