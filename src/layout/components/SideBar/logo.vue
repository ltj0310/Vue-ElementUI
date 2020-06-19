<template>
  <div class="logo">
    <transition name="fade" 
                mode="out-in">
      <div :key="collapse ? 'D' : 'DASCOM'" 
           @click="redirect">{{ collapse ? 'D' : 'DASCOM' }}
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'logo',
  computed: {
    ...mapGetters(['collapse'])
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/styles/variable.less';
.logo {
  cursor: pointer;
  color: #ffffff;
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  height: @navHeight;
  line-height: @navHeight;
  background-color: @sidebarBg;
}

.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>