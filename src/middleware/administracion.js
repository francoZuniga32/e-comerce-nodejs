const administracionMiddleware = {};

administracionMiddleware.midelware = (req, res, next)=>{
    if(typeof (req.session.user) == "undefined"){
        res.redirect('/');
    }else{
        if(req.session.user.tipo != "admin"){
            res.redirect('/');
        }
    }
    next();
};

module.exports = administracionMiddleware;