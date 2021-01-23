exports.testMetodAuth = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first Content' }]
    });
}


// IMPORT CONFIG AND DEPENDENCIES
const jwt = require('jsonwebtoken');

// IMPORT MODELS
const User = require('../../models/user');
const User_roles = require('../../models/user_role');


exports.testMetodAuth = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first Content' }]
    });
}



exports.signUp = (req, res, next) => {
    
    const {username , email,surname,telephone,password,photo,role} = req.body
    
    let userData = null
    return User.create({
        email,
        name: username,
        password,
        telephone,
        surname,
        deleted: false
    })
   .then((user) => {
            
            console.log(userData.id ,user , "user")
            return User_roles.create({
                roleName: role,
                accountId: user.id,
                deleted: false
            })
        })
       
        .then((result) => {
            console.log(result.roleName , "result")
            if(result.roleName === "mosqueAdmin" ){
                console.log("user mos")
                return Mosque_Admin.create({
                    deleted : false,
                    userId : userData.id
                })
            }else {
                console.log("mos")
                res.status(200).json({
                    responseStatus: 200,
                    response : result ,
                    responseMessage: "User  created!"
                })
            }
            
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

    return Account.findAll({
        where: {
            email: email,
            password: password
        }
    })
        .then((result) => {
            console.log(result , "result 1")
            resultresponse = result;

            if (result === undefined) {
                res.status(200).json({
                    responseStatus: 401,
                    responseMessage: "user Incorrect Password"
                });
            }

            else if (result[0].email === email && result[0].password === password) {
                console.log(result[0].id , "userid")
                return User_roles.findAll({
                    where: {
                        accountId : result[0].id
                    }
                })
            }

            else {
                res.status(200).json({
                    responseStatus: 401,

                    responseMessage: "user Incorrect Password"
                });
            }

        })
       .then((userRoles) => {
           console.log("userrole")
            if (userRoles) {

                return User.findAll({
                        where : {
                            id : resultresponse[0].userId
                        }
                })
               
            }

        })
        .then((result)=>{
           
            if(result){
                const token = jwt.sign({
                    email : resultresponse[0].email,
                    role : resultresponse[0].accountType,
                    name : result[0].name,
                    surname : result[0].surname,
                    telephone : result[0].telephone,
                },"mosqueapi")
                res.status(200).json({
                    responseStatus : 200,
                    response : result[0],
                    token : token,
                    responseMessage : "Succesful login"
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
    //const username = req.body.
}




