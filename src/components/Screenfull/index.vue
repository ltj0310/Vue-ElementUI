<template>
  <div class="screenfull" @click="handleClick">
    <el-tooltip
      effect="dark"
      :content="isFullscreen ? '退出全屏' : '全屏'"
      placement="top-end">
      <svg-icon :icon-class="isFullscreen ? 'exit' : 'fullscreen'" />
    </el-tooltip>
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    handleClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'your browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
}
</script>
<style lang="less" scoped>
.screenfull {
  cursor: pointer;
}
</style>