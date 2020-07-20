const session = {};


session.all = (req, res, next)=>{
    //si existe la session no hacemos nada
    if(!req.session.name && !req.session.tipo && !req.session.iduser){
        req.session.name = "none";
        req.session.userid = "none";
        req.session.tipo = "none";   
    }
    next();
};

module.exports = session;