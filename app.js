const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth') //Регистрируем роуты
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const roleRoutes = require('./routes/role')
const keys = require('./config/keys')
const app = express()

//подключение бд
mongoose.connect(keys.mongoURI) 
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(error))

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes) //Показываем, по какому пути будет найден роут
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/role', roleRoutes)

module.exports = app