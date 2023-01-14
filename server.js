let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const routerAliment = require('./routes/alimente')
const routerUser = require('./routes/users')
require("dotenv").config();

const sequelize = require('./sequelize');
require("./tabele/aliment")
require("./tabele/user")

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', routerAliment)
app.use('/api', routerUser)


app.use((err, req, res, next) => {
    res.status(500).json({"ERROR": "General error"})
})

app.set("port", process.env.PORT || 3001)

app.listen(app.get("port"), async () => {
    console.log(`Server is running on http://localhost:${app.get("port")}`);
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully")
    } catch(err){
        console.log("Unable to connect to the database:", err)
    }
})