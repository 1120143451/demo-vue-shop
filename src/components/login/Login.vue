<template>
  <div class="login-warp">
    <el-form status-icon ref="ruleForm" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px" class="login-from">
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入用密码" type="password"></el-input>
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
  mounted () {
    let token = window.localStorage.getItem('token')
    if (token) {
      this.$router.push({name: 'home'})
    }
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 6, message: '长度最少 6 个字符', trigger: 'blur' }
        ]
      },
      labelPosition: 'top'
    }
  },
  methods: {
    loginClick () {
      let $this = this
      $this.$refs['ruleForm'].validate(function (valid) {
        if (valid) {
          $this.$myHttp.post('login', $this.ruleForm)
            .then(function (res) {
              if (res.data.meta.status === 200) {
                window.localStorage.setItem('token', res.data.data.token)
                $this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                $this.$router.push('/')
              }
            })
        } else {
          $this.$message({
            message: '登录失败',
            type: 'error'
          })
        }
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
