const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        console.log("No encontro Authorization")
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        console.log("No encontro Token")
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, '17abdi.sofi23.SECRET')
    } catch (err) {
        console.log("No decodifico Token1" + err)
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        console.log("No decodifico Token2")
        req.isAuth = false;
        return next();
    }
    console.log("Por IsAuth todo working")
    req.isAuth = true;
    req.userId = decodedToken.userId;

    next();

}