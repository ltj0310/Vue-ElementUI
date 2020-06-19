<template>
  <div class="app-login">
    <div class="app-login-weaper">
      <div class="app-login-weaper-left">
        <div class="app-login-time">{{time}}</div>
        <div class="app-login-logo">
          <div>VUE FOR</div>
          <div>DSCOM DEVELOPER</div>
        </div>
      </div>
      <div class="app-login-weaper-right">
        <div class="app-login-title">DASCOM</div>
        <div class="app-login-form">
          <el-form
            :model="userInfo"
            :rules="rules"
            ref="form">
            <el-form-item
              prop="user">
              <el-input 
                clearable
                placeholder="请输入用户名"
                v-model="userInfo.user"
                prefix-icon="el-icon-user"/>
            </el-form-item>
            <el-form-item
              prop="password">
              <el-input 
                clearable
                type="password"
                placeholder="请输入密码"
                v-model="userInfo.password"
                prefix-icon="el-icon-lock"/>
            </el-form-item>
          </el-form>
          <el-button 
            type="primary"
            class="app-login-button"
            :loading="loading"
            @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '@/utils'
export default {
  name: 'login',
  data() {
    return {
      time: '',
      timer: null,
      loading: false,
      redirect: null,
      userInfo: {
        user: 'admin',
        password: '123456'
      },
      rules: {
        user: [{ required: true, message: "请输入账号", trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: 'blur' }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  methods: {
    getTime() {
      this.time = dateFormat(new Date());
    },
    login() {
      this.loading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login',this.userInfo)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        }
      })
    }
  },
  mounted() {
    this.getTime()
    this.timer = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.app-login {
  width: 100%;
  height: 100%;
  background: url("../../images/cloud.jpg") 0 bottom repeat-x #049ec4;
  animation: animate-cloud 20s linear infinite;
  overflow: hidden;
  .app-login-weaper {
    width: 1000px;
    height: 500px;
    background-color: #ffffff;
    border-radius: 8px;
    margin: 0 auto;
    animation: weaper 1.5s ease 1 forwards;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .app-login-weaper-left,.app-login-weaper-right {
      width: 50%;
      height: 100%;
    }
    .app-login-weaper-left {
      background-color: #409eff;
      color: #ffffff;
      position: relative;
      .app-login-time {
        position: absolute;
        left: 15px;
        top: 15px;
        font-weight: lighter;
        font-size: 20px;
        overflow: hidden;
      }
      .app-login-logo {
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        white-space:nowrap;
        font-size: 36px;
        letter-spacing: .1em;
      }
    }
    .app-login-weaper-right {
      position: relative;
      .app-login-title {
        position: absolute;
        top: 80px;
        width: 100%;
        text-align: center;
        font-weight: 500;
        font-size: 22px;
        letter-spacing: .5em;
        margin-bottom: 40px;
      }
      .app-login-form {
        width: 80%;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      .app-login-button {
        width: 100%;
        margin-top: 40px;
      }
    }
  }
}

@keyframes animate-cloud {
  from {
    background-position: 600px 100%;
  }
  to {
    background-position: 0 100%;
  }
}

@keyframes weaper {
  form { transform: translateY(0); opacity: 0; }
  to { transform: translateY(180px); opacity: 1; }
}
</style>