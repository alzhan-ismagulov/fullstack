const express = require('express')
const authRoutes = require('./routes/auth') //Регистрируем роуты
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const roleRoutes = require('./routes/role')
const app = express()

app.use('/api/auth', authRoutes) //Показываем, по какому пути будет найден роут
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/role', roleRoutes)

module.exports = app