<template>
  <div class="login-warp">
    <el-form status-icon :label-position="labelPosition" label-width="100px" class="login-from">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" placeholder="请输入用密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="loginClick">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      labelPosition: 'top'
    }
  },
  methods: {
    loginClick () {
      this.$myHttp.post('http://localhost:8888/api/private/v1/login', {
        username: this.username,
        password: this.password
      }).then(function (data) {
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
.login-warp {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-warp .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-warp .login-from .login-btn {
  width: 100%;
}
</style>
