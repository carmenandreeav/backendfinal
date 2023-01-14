let express = require('express')
const { Op } = require('sequelize')
let router = express.Router()
const User = require("../tabele/user")
const Aliment = require('../tabele/aliment')

User.hasMany(Aliment)
User.belongsToMany(User, { through: "Relationships", as:"Prieteni", foreignKey:"prietenId"})


// router.route('/validatePassword').post(async(req,res)=>{
//     const {email , password } = req.body;
//     try{
//         const user = await User.findAll();
//         if(user){
//             email = await user.getUsers({attribute : ['email']})
//             password= await user.getUsers({attribute : ['password']})
//             if((eml.length>0) && (psw.length>0)){
//                 res.status(200).json(eml)
//                 res.status(200).json(psw)
//             }else if(eml.length<0){
//                 res.status(404).json({error:`Email incorect`})
//             }
//          } else{
//                 res.status(404).json({ error: `Course with id ${req.params.courseId} not found!`})
//             }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error);
//     }
// })




router.route('/getUsers').get(async (req, res) => {
    const {simplified} = req.query;
    const {pIsDone} = req.query;
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json(error);
    }
})

router.route('/addUser').post(async (req, res) => {
    try {
        const newUser = await User.create(req.body) 
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;