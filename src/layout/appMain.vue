<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="keepAlive">
        <router-view :key="key"/>
      </keep-alive>
      <router-view :key="key" v-else />
    </transition>
  </section>
</template>
<script>
export default {
  name: "appMain",
  computed: {
    key() {
      return this.$route.path
    },
    keepAlive() {
      return this.$route.meta.keepAlive
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.app-main {
  width: 100%;
  height: calc(100% - @tagsViewHeight - @navHeight);
  overflow-y: auto;
  overflow-x: hidden;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>