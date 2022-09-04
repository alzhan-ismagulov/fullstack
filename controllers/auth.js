//Подключаем express
const { response } = require('express')
//Подключаем модуль хэширования
const bcrypt = require('bcryptjs')
//Подключаем модель User
const User = require('../models/User')

module.exports.login = function(req, res){
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

//Регистрация нового пользователя

//Экспортируем функцию регистрации
module.exports.register = async function(req, res){
    //Поиск пользователя
   const candidate = await User.findOne({email: req.body.email})

     //Если такой Пользователь уже существует, нужно отправить ошибку
   if(candidate){
        res.status(409).json({
        message: 'Такой емайл уже занят'
    })
    //Если такого пользователя нет, то нужно создать пользователя
   } else {
    //Добавляем рандомные данные в пароль
    const salt = bcrypt.genSaltSync(10)
    //Берём пароль из введённых данных
    const password = req.body.password
    //Создаём пользователя
        const user = new User({
            //Берём емайл из введённых данных
            email: req.body.email,
            //Хэшируем пароль и присваиваем его пользователю
            password: bcrypt.hashSync(password, salt)
        })

        try{
            //Сохраняем пользователя в БД
            await user.save()  
            //Показываем, что регистрация прошла успешно, посылая json информацию об емайл и пароле
            res.status(201).json(user)      
        } catch(e){
            //Обработать ошибку
        }
        
   }
}