<template>
  <div class="app-sidebar">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router
               unique-opened
               mode="vertical"
               class="el-menu-vertical"
               :collapse="collapse"
               :default-active="activeMenu"
               :background-color="variables.sidebarBg"
               :text-color="variables.menuText"
               :active-text-color="variables.menuActiveText">
        <SideBarItem :routes="menu"
                     :collapse="collapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Logo from './logo.vue'
import SideBarItem from './SideBarItem'
import variables from '@/styles/variable.less'
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  components: { Logo, SideBarItem },
  computed: {
    ...mapGetters(['collapse','menu']),
    variables() {
      return variables
    },
    activeMenu() {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.app-sidebar {
  height: 100%;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: @sidebarWidth;
    border-color: @sidebarBg;
    min-height: 100%;
  }
}
</style>