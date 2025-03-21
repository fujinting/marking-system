<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="title">阅卷系统管理端</div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="角色" prop="role">
          <el-select v-model="loginForm.role" placeholder="请选择角色">
            <el-option label="超级管理员" value="superAdmin"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        role: '',
        username: '',
        password: ''
      },
      rules: {
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const response = await this.$axios.post('/api/auth/login', this.loginForm)
            if (response.data.success) {
              // 存储token和用户信息
              this.$store.commit('SET_TOKEN', response.data.token)
              this.$store.commit('SET_USER_INFO', response.data.userInfo)
              // 跳转到首页
              this.$router.push('/')
            } else {
              this.$message.error(response.data.message || '登录失败')
            }
          } catch (error) {
            this.$message.error('登录失败，请稍后重试')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
}
.login-card {
  width: 400px;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style> 