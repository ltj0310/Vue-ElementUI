<template>
  <div class="navbar">
    <ToggleSidebar />
    <div class="navbar-right">
      <Screenfull class="navbar-tool"/>
      <Avatar class="navbar-tool"/>
    </div>
  </div>
</template>
<script>
import ToggleSidebar from '@/components/ToggleSidebar'
import Screenfull from '@/components/Screenfull'
import Avatar from '@/components/Avatar'
export default {
  name: 'navbar',
  components: { ToggleSidebar, Screenfull, Avatar }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.navbar {
  height: @navHeight;
  line-height: @navHeight;
  border-bottom: 1px solid rgba(0,21,41,.08);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 20px;
  .navbar-right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar-tool + .navbar-tool {
    margin-left: 10px;
  }
}
</style>