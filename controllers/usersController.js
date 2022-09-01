const {loadUsers, storeUsers} = require('../data/db_Module');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const {firstName, lastName, email, password} = req.body;
            const users = loadUsers();
    
           const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                firstName : firstName.trim(),
                lastName : lastName.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password.trim(),10),
                rol : 'user',
                birthday : null,
                avatar : null,
                gender : null,
                hobbies : [],
                address : null,
                city : null,
                province : null,
                about : null
           }
    
           const usersModify = [...users, newUser];
    
           storeUsers(usersModify);
           return res.redirect('/users/login')
        }else {
            return res.render('register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            let {id, firstName, rol, avatar} = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                firstName,
                rol,
                avatar
            }
            return res.redirect('/')
        }else {
            return res.render('login',{
                errors : errors.mapped()
            })
        }
    },
    profile : (req,res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('profile', {
            user,
            cities : require('../data/cities'),
            provinces : require('../data/provinces')
        })
    },
    update : (req, res) => {

        const {firstName, lastName, birthday, address, city, province, about} = req.body;

        let usersModify = loadUsers().map(user => {
            if(user.id === +req.params.id){
                return {
                    ...user,
                    ...req.body
                }
            }
            return user
        });

        req.session.userLogin = {
            ...req.session.userLogin,
            firstName
        }

        storeUsers(usersModify);
        return res.redirect('/users/profile')
    },
    logout : (req,res) => {
        req.session.destroy()
        return res.redirect('/')
    }
}