const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server has been started'
    })
})

app.listen(5000, ()=>console.log(`Server has been started on`)) //Слушаем сервер