const session = {};


session.all = (req, res, next) => {
    //si existe la session no hacemos nada
    console.log(req.session.user);

    if (typeof (req.session.user) == "undefined") {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = session;