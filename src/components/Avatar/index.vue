<template>
  <div class="avatar">
    <el-dropdown 
      trigger="click" 
      @command="handleClick">
      <span class="el-dropdown-link">
        <div class="dropdown-head">
          <img :src="avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item 
          icon="el-icon-house" 
          command="index">首页
        </el-dropdown-item>
        <el-dropdown-item 
          divided 
          icon="el-icon-switch-button" 
          command="logout">退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'avatar',
  computed: {
    ...mapGetters(['name','avatar'])
  },
  methods: {
    async handleClick($event) {
      switch($event) {
        case 'index':
          this.$router.push({ path: '/' })
          break;
        case 'logout':
          // ...todo
          await this.$store.dispatch('user/logout')
          this.$router.push({ path: `/login?redirect=${this.$route.fullPath}` })
          break;
        default: 
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avatar {
  height: 100%;
  display: flex;
  align-items: center;
  .dropdown-head {
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      display: block;
    }
  }
}
</style>
