<template>
  <div class="sidebar-item">
    <template v-for="i in routes">
      <el-menu-item 
        v-if="isNull(i.children)" 
        :index="i.path" 
        :key="i.path">
        <svg-icon :icon-class="i.meta.icon" />
        <span slot="title">{{i.meta.title}}</span>
      </el-menu-item>

      <el-submenu 
        v-else 
        :index="i.path" 
        :key="i.path">
        <template slot="title">
          <svg-icon :icon-class="i.meta.icon" />
          <span 
            slot="title" 
            :class="{'el-menu--display':collapse}">
            {{i.meta.title}}
          </span>
        </template>
        <template v-for="child in i.children">
          <el-menu-item 
            v-if="isNull(child.children)" 
            :index="child.path" 
            :key="child.path">
            <svg-icon :icon-class="child.meta.icon" />
            <span slot="title">{{child.meta.title}}</span>
          </el-menu-item>
          <SideBarItem 
            v-else 
            :routes="[child]" 
            :key="child.path"/>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { isNull } from '@/utils/validate'
import SideBarItem from './SideBarItem.vue'
export default {
  name: 'SideBarItem',
  components: { SideBarItem },
  props: {
    routes: {
      type: Array,
      default: () => [],
      validator: val => val instanceof Array
    },
    collapse: {
      type: Boolean,
      default: () => false,
      validator: val => typeof val === 'boolean'
    }
  },
  methods: {
    isNull(val) {
      return isNull(val)
    }
  }
}
</script>
<style lang="less" scoped>
span {
  display: inline-block;
  margin-left: 5px;
}
</style>