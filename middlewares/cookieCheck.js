module.exports = (req,res,next) => {
    if(req.cookies.userCraftsy15){
        req.session.userLogin = req.cookies.userCraftsy15
    }
    next()
}