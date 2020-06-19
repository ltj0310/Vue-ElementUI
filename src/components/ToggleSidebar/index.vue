<template>
  <div class="toggleSidebar" @click="handleClick">
    <el-tooltip
      effect="dark"
      content="关闭菜单"
      placement="top-start">
    <svg-icon :icon-class="collapse ? 'indent' : 'outdent'" />
    </el-tooltip>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'toggleSidebar',
  computed: { ...mapGetters(['collapse']) },
  methods: {
    handleClick() {
      this.$store.dispatch('system/toggleSideBar')
    }
  }
}
</script>
<style lang="less" scoped>
.toggleSidebar {
  cursor: pointer;
}
</style>