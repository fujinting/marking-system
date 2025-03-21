const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

// 创建数据库连接池
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

// 登录接口
router.post('/login', async (req, res) => {
  const { role, username, password } = req.body

  try {
    // 根据角色查询用户
    const query = `
      SELECT * FROM users 
      WHERE username = $1 AND role = $2
    `
    const result = await pool.query(query, [username, role])

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      })
    }

    const user = result.rows[0]

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      })
    }

    // 生成JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    // 返回用户信息和token
    res.json({
      success: true,
      token,
      userInfo: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    })
  } catch (error) {
    console.error('登录错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器错误'
    })
  }
})

module.exports = router 