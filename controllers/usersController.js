module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    login : (req,res) => {
        return res.render('login')
    },
    profile : (req,res) => {
        return res.render('profile')
    },
    update : (req, res) => {
        return res.send(req.file)
    }
}