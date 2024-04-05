const logoutController = async (req,res) => {
    res.clearCookie('connect.sid'); 
    req.logOut((err) => {
        if (err) return res.status(400).send({ message: err.message});
        req.session.destroy();
        res.send({ message: "Logout"})
    });
}

module.exports = logoutController ;