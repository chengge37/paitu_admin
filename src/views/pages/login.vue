<template>
  <div class="staffLogin-box">
    <img class="login-logo" src="./staff-login.png" alt />
    <div class="login-txt">派图运维管理系统</div>
    <div class="login-box">
      <div class="login-title">登陆</div>
      <div class="staff-txt">派图运维管理系统</div>
      <input type="text" v-model="loginForm.mobile" placeholder="请输入用户名" />
      <input type="text" v-model="loginForm.pwd" @keyup.enter="loginAction" placeholder="请输入密码" />
      <button class="login-btn" @click="loginAction">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      loginForm: {
        mobile: "",
        pwd: ""
      },
      fullscreenLoading: false
    };
  },
  created() {},
  methods: {
    loginAction() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.6)"
      });
      this.$store
        .dispatch("Login", this.loginForm)
        .then(() => {
          loading.close();
          console.log("login Succ", this.$router);
          this.$router.push({
            path: "/"
          });
        })
        .catch(error => {
          loading.close();
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.staffLogin-box {
  width: 100vw;
  height: 100vh;
  background: #fafafa;
  overflow: hidden;

  & .login-logo {
    display: block;
    width: 59px;
    height: 88px;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 21px;
    box-sizing: border-box;
  }

  & .login-txt {
    width: 100%;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: #666;
    margin-bottom: 83px;
    box-sizing: border-box;
  }

  & .login-box {
    width: 398px;
    height: 382px;
    background: #ffffff;
    border: 1px solid rgba(240, 240, 240, 1);
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 30px;
    box-sizing: border-box;

    & .login-title {
      width: 60px;
      height: 42px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #651fff;
      line-height: 42px;
      margin-bottom: 12px;
    }

    & .staff-txt {
      width: 144px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #333333;
      line-height: 25px;
      margin-bottom: 30px;
    }

    & input {
      width: 338px;
      height: 46px;
      background: #fafafa;
      border: 1px solid rgba(240, 240, 240, 1);
      font-size: 14px;
      padding-left: 16px;
      margin-bottom: 12px;
    }

    & .login-btn {
      width: 338px;
      height: 46px;
      line-height: 46px;
      background: #651fff;
      color: #fff;
      text-align: center;
      margin-top: 25px;
      cursor: pointer;
      border: 0;
    }
  }
}
</style>
