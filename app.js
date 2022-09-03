const express = require('express')
const authRoutes = require('./routes/auth') //Регистрируем роуты
const app = express()

app.use('/api/auth', authRoutes) //Показываем, по какому пути будет найден роут

module.exports = app