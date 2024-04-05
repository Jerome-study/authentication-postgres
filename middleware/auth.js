const verify = (req,res,next) => {
    if (!req.user) {
        return res.send({ message: "You must login first!" });
    }
    next();
}

const verifyAuth = (req,res,next) => {
    if (!req.user) {
        return next();
    }
    res.send({ message: "You are already authenticated" });
}


module.exports = { verify, verifyAuth };