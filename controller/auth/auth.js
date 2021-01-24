exports.testMetodAuth = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first Content' }]
    });
}


// IMPORT CONFIG AND DEPENDENCIES
const jwt = require('jsonwebtoken');

// IMPORT MODELS
const User = require('../../model/user');
const User_roles = require('../../model/user_roles');


exports.testMetodAuth = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first Content' }]
    });
}



exports.signUp = (req, res, next) => {
    
    const {name , email,surname,telephone,password,photo,role} = req.body
    console.log("deneme")
    let userData = null
    return User.create({
        email,
        name: name,
        password,
        telephone,
        surname,
        deleted: false
    })
   .then((user) => {
            
            console.log("user")
            return User_roles.create({
                roleName: role,
                userId: user.id,
                deleted: false
            })
        })
       
      
        .then((user)=>{
            console.log(user , "und")
            if(user != undefined){
                res.status(200).json({
                    responseStatus: 200,
                    response : user ,
                    responseMessage: "User  created!"
                })
            }
        })
        .catch((error) => {
            res.status(200).json({
                responseStatus: 400,
                data: {
                    errorMessage: error
                },
                responseMessage: "User coulldn't be created!"
            });

        })
}






exports.signIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let resultresponse = null;
    console.log("dene")

    return User.findAll({
        where : {
            email,
            password,
        }
    })
    .then((user)=>{
        console.log("dene2")
        resultresponse = user[0]
        if(user != undefined){
                return User_roles.findAll({
                    where : {
                        userId : resultresponse.id
                    }
                })
        }
        else {
            res.status(200).json({
                response : null,
                responseMessage : "user not found",
                responseStatus : 400
            })
        }
    })
    .then((role)=>{
        if(role != undefined || role != null){
            const token = jwt.sign({
                name  : resultresponse.name,
                surname : resultresponse.surname,
                email : resultresponse.email,
                telephone : resultresponse.telephone,
                role : role[0].roleName

            },"socialnetwork")
            res.status(200).json({
                response : resultresponse,
                token : token,
                responseMessage  :"Succesfull login",
                responseStatus : 200
            })
        }
        else{
            res.status(200).json({
                response : null,
                responseMessage  :"User not found",
                responseStatus : 400
            })
        }
    })
    .catch((err) => {
                res.status(200).json({
                    responseStatus: 401,
    
                    responseMessage: "user err Password"
                });
                console.log(err)
            })

   
}




