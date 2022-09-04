//Контроллер auth

//Подключаем express
const { response } = require('express')
//Подключаем модуль хэширования
const bcrypt = require('bcryptjs')
//Подключает пакет для токенов
const jwt = require('jsonwebtoken')
//Подключаем модель User
const User = require('../models/User')
//Подключаем keys
const keys = require('../config/keys')

//Функция авторизации
module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`
            }) 
        }else{
            //пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })    
        }
    } else {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким емайл не найден.'
        })
    }
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