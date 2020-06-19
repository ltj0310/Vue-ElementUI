<template>
  <div class="tagsView">
    <div class="tags-box">
      <el-tabs
        v-model="active"
        type="card"
        ref="tabs"
        :closable="tagsView.length > 1"
        @tab-click="routeChange"
        @edit="closeTag">
        <template v-for="i in tagsView">
          <el-tab-pane 
            :label="i.title"
            :name="i.path"
            :key="i.path"></el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="tags-dropdown">
      <el-dropdown 
        trigger="click" 
        @command="handleClick">
        <span class="el-dropdown-link">
          <el-button type="primary">
            更  多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tagsView',
  computed: {
    ...mapGetters(['tagsView'])
  },
  watch: {
    $route() {
      this.active = this.$route.path
      this.$store.dispatch('system/addTags', this.$route)
    }
  },
  data() {
    return {
      active: null
    }
  },
  methods: {
    // 判断是否为当前页面
    isActive(route) {
      return route === this.$route.path
    },
    // 关闭当前页面则跳转至tags数组的最后一个页面
    toLastTag(routes) {
      const route = routes.slice(-1)[0]
      this.$router.push({
        name: route.name,
        path: route.path,
        params: route.params,
        query: route.query
      })
    },
    handleClick($event) {
      switch($event) {
        case 'closeOther':
          this.closeOtherTags()
          break;
        case 'closeAll':
          this.closeAllTags()
          break;
        default: 
          break
      }
    },
    // 点击tags并且路由跳转至与tags对应的页面
    routeChange(tags) {
      const { name } = tags
      const tag = this.tagsView.filter(i => i.fullPath === name)[0]
      this.$router.push({
        name: tag.name,
        path: tag.path,
        params: tag.params,
        query: tag.query
      })
    },
    // 关闭点击的tags
    closeTag(targetUrl) {
      this.$store.dispatch('system/closeTag', targetUrl).then(routes => {
        if (this.isActive(targetUrl)) {
          this.toLastTag(routes)
        }
      })
    },
    // 关闭除了首页和当前页之外的所有页面
    closeOtherTags() {
      this.$store.dispatch('system/closeOtherTags', this.$route.path)
    },
    // 关闭所有tags，剩下首页
    closeAllTags() {
      this.$store.dispatch('system/closeAllTags').then(res => {
        const route = res[0]
        this.$router.push({
          path: route.path,
          name: route.name,
          query: route.query,
          params: route.params
        })
      })
    },
    // 初始化tagsView
    initTagsView() {
      this.$store.dispatch('system/addTags', this.$route)
    }
  },
  mounted() {
    this.initTagsView()
    this.active = this.$route.path
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.tagsView {
  height: @tagsViewHeight;
  padding: 0 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
  user-select: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  background-color: #ffffff;
  .tags_box {
    flex: 1;
    overflow: hidden;
    padding-right: 20px
  }
  .tags_dropdown {
    width: 80px
  }
}
</style>