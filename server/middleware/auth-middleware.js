const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No token, authorization denied' })
    }

    const jwtToken = token.replace("Bearer", "").trim()
    console.log(jwtToken);

    try {

        const isVerify = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({email :  isVerify.email})
        .select({password : 0})

        console.log(userData);

        req.user = userData;
        req.token = token
        req.userID = userData._id

        next()
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }

}

module.exports = authMiddleware;