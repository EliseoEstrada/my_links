const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    return hash;
}

helpers.matchPassword = async( password, savedPassword) => {
    
    try{
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }

}

helpers.isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/signin');
    }
}

helpers.isNotLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/profile');
    }
}

module.exports = helpers;