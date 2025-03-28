const AppError = require("../utils/AppError")

const checkProfile = (req,profileParam) => {
    if(req.session && 
        req.session.userLogued &&
        req.session.userLogued.data &&
        req.session.userLogued.data.profile &&
        req.session.userLogued.data.profile == profileParam
    ){
        return true
    }else if(req.user && req.user.profile){
        console.log("Profile en sesión:", req.user.profile);
        return req.user.profile === profileParam;
    }  
    else{
        return false
    }
}

// Admin tiene acceso total (CRUD)
exports.requireAdmin = (req,res,next) => {
    if(checkProfile(req,"ADMIN") || checkProfile(req,"Superadministrador")){
        next()
    }else{
        next(new AppError("No estás autorizado", 403)) //Forbidden
    }
}

// User tiene acceso limitado (CR)
exports.requireUser = (req,res,next) => {
    if(checkProfile(req,"USER") || checkProfile(req,"ADMIN") || checkProfile(req,"Superadministrador")){
        next()
    }else{
        next(new AppError("No estás autorizado", 403))
    }
}


