<template>
  <el-row>
    <el-col :span="24">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <!-- 搜索框 -->
    <el-col :span="8" style="margin-top: 10px;">
      <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click.stop="searchGet"></el-button>
      </el-input>
    </el-col>
    <!-- 添加用户 -->
    <el-col :span="3" style="margin-top: 10px;">
      <el-button type="primary" plain @click.stop="createUserFormVisible = true">添加用户</el-button>
    </el-col>
    <el-dialog title="添加用户" :visible.sync="createUserFormVisible" destroy-on-close>
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="userForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="createUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-col :span="24">
      <!-- 列表 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 10px">
        <el-table-column
          label="id"
          prop="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="updateState(scope)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click.stop="showEditForm(scope)"></el-button>
            <el-button type="warning" icon="el-icon-user" size="mini" plain @click.stop="rolesShow(scope)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click.stop="deleteUser(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <!-- 修改用户弹窗 -->
      <el-dialog title="修改用户" :visible.sync="editUserFormVisible" destroy-on-close>
        <el-form ref="editUserForm" :model="editUserForm" :rules="editRules">
          <el-form-item label="用户名" label-width="120px" prop="username">
            <el-input v-model="editUserForm.username" placeholder="请输入用户名" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px" prop="email">
            <el-input v-model="editUserForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="120px" prop="mobile">
            <el-input v-model="editUserForm.mobile" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.stop="editUserFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.stop="updateUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改角色弹窗 -->
      <el-dialog title="修改角色" :visible.sync="rolesFormVisible" destroy-on-close>
        <el-form ref="rolesForm" :model="rolesForm" :rules="rolesRules">
          <el-form-item label="用户名" label-width="120px" prop="username">
            <el-input v-model="rolesForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="120px">
            <el-select v-model="roleId" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in rolesOptions"
                :key="item.roleName"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.stop="rolesFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.stop="updateRole">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Users',
  mounted () {
    this.getUsers()
  },
  data () {
    return {
      searchInput: '',
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 6, message: '长度最少 6 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      },
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      editRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      },
      rolesForm: {},
      roleId: '',
      rolesOptions: {},
      rolesRules: {
        username: []
      },
      createUserFormVisible: false,
      editUserFormVisible: false,
      rolesFormVisible: false,
      tableData: [],
      currentPage: 1
    }
  },
  methods: {
    // 获取用户列表
    getUsers (query = '') {
      let vueThis = this
      let url = ''
      if (query === '') {
        url = 'users?pagenum=1&pagesize=20'
      } else {
        url = 'users?pagenum=1&pagesize=20&query=' + query
      }
      vueThis.$myHttp({
        url: url,
        method: 'get'
      }).then(function (res) {
        let {data, meta} = res.data
        if (meta.status === 200) {
          vueThis.tableData = data.users
        }
      })
    },
    // 模糊搜索
    searchGet () {
      this.getUsers(this.searchInput)
    },
    // 添加用户
    addUser () {
      let $this = this
      $this.$refs['userForm'].validate(function (valid) {
        if (!valid) {
          return false
        }
        $this.$myHttp.post('users', $this.userForm)
          .then(function (res) {
            if (res.data.meta.status === 201) {
              $this.$message({
                message: '添加用户成功',
                type: 'success'
              })
              $this.userForm = {}
              $this.createUserFormVisible = false
              $this.getUsers()
            }
          })
      })
    },
    // 改变状态
    updateState (scope) {
      let vueThis = this
      vueThis.$myHttp({
        url: `users/${scope.row.id}/state/${scope.row.mg_state}`,
        method: 'put'
      }).then(function (res) {
        if (res.data.meta.status === 200) {
          vueThis.$message({
            message: '状态修改成功',
            type: 'success'
          })
        } else {
          vueThis.tableData[scope.$index].mg_state = !scope.row.mg_state
        }
      })
    },
    // 删除用户
    deleteUser (id) {
      let vueThis = this
      this.$confirm('确定要删除用户吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        vueThis.$myHttp({
          url: `users/${id}`,
          method: 'delete'
        }).then(function (res) {
          if (res.data.meta.status === 200) {
            vueThis.$message({
              message: '删除用户成功',
              type: 'success'
            })
            vueThis.getUsers()
          }
        })
      }).catch(function () {
        return false
      })
    },
    // 展示修改用户表单
    showEditForm (scope) {
      this.editUserFormVisible = true
      this.editUserForm = scope.row
    },
    // 修改用户
    updateUser () {
      let vueThis = this
      let data = {}
      data.id = vueThis.editUserForm.id
      data.email = vueThis.editUserForm.email
      data.mobile = vueThis.editUserForm.mobile
      vueThis.$myHttp({
        url: `users/${vueThis.editUserForm.id}`,
        method: 'put',
        data: data
      }).then(function (res) {
        if (res.data.meta.status === 200) {
          vueThis.editUserFormVisible = false
          vueThis.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          vueThis.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    // 展示角色表单
    rolesShow (scope) {
      let vueThis = this
      vueThis.rolesFormVisible = true
      vueThis.rolesForm = scope.row
      // 获取当前用户角色 id
      vueThis.$myHttp({
        url: `users/${vueThis.rolesForm.id}`,
        method: 'get'
      }).then(function (res) {
        if (res.data.meta.status === 200) {
          vueThis.roleId = res.data.data.rid <= 0 ? '' : res.data.data.rid
        }
      })
      // 获取角色列表
      vueThis.$myHttp({
        url: 'roles',
        method: 'get'
      }).then(function (res) {
        vueThis.rolesOptions = res.data.data
      })
    },
    // 更新角色
    updateRole () {
      let vueThis = this
      vueThis.$myHttp({
        url: `users/${vueThis.rolesForm.id}/role`,
        method: 'put',
        data: {
          rid: vueThis.roleId
        }
      }).then(function (res) {
        if (res.data.meta.status === 200) {
          vueThis.rolesFormVisible = false
          vueThis.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
        }
      })
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>

<style scoped>

</style>
