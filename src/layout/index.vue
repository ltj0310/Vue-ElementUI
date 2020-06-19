<template>
  <div class="app-weaper">
    <div class="app-weaper-left">
      <SideBar />
    </div>
    <div class="app-weaper-right">
      <NavBar />
      <TagsView />
      <AppMain />
    </div>
  </div>
</template>
<script>
import SideBar from './components/SideBar'
import AppMain from './appMain'
import NavBar from './components/NavBar'
import TagsView from './components/TagsView'
export default {
  name: 'layout',
  components: {
    SideBar,
    NavBar,
    TagsView,
    AppMain
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.app-weaper {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f2f2f2;
  .app-weaper-left,.app-weaper-right {
    height: 100%;
  }
  .app-weaper-right {
    flex: 1;
    overflow: hidden;
  }
}
</style>