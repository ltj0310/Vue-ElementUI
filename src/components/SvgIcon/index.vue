<template>
  <svg
    :class="svgClass"
    aria-hidden="true">
    <use :href="iconName"/>
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>