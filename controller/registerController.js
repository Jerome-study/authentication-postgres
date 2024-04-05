const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function registerController(req,res) {
    const { username, password, confirmPassword } = req.body;
    if (!username, !password, !confirmPassword) return res.send({ message: "Please enter all fields" });
    if (password !== confirmPassword) return res.send({ message: "Password do not match" });
    try {
        const userExist = await pool.query('SELECT * FROM "user" WHERE username = $1', [username] );
        if (userExist.rows[0]) return res.send({ message: "User already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO "user"(username, password) VALUES($1, $2)', [username, hashedPassword]);
        res.send({ message: "Registered"});
    } catch(error) {
        console.log(error.message);
    }
};

module.exports = registerController;