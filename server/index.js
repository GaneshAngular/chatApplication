const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./src/routes/auth.route')
const session = require('express-session')

const app = express()
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(cors())
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB', err)
})

app.use(express.json())
app.use('/auth', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})   
