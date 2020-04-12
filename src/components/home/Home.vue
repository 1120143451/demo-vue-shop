<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="/static/logo.png" class="logo-img" alt="">
        </el-col>
        <el-col :span="16">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click.stop="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :router="true" class="menu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item>
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    let token = window.localStorage.getItem('token')
    if (!token) {
      this.$message.error('未登录')
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    logout () {
      let $this = this
      this.$confirm('确定要退出登录吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        window.localStorage.clear('token')
        $this.$message({
          message: '成功退出',
          type: 'success'
        })
        $this.$router.push({name: 'login'})
      }).catch(function () {
        return false
      })
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-header h3 {
    margin: 0;
    color: #fff;
    font-weight: normal;
  }

  .logo-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .menu {
    text-align: left;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .el-container {
    height: 100%;
  }
</style>
