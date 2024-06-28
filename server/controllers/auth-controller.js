const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

//* ******* */
//* Home Logic
//* ******* */
const home = async (req, res) => {
    try {
        res.status(200)
            .send('home router')
    } catch (error) {
        console.log(error)
    }
}

//* ******* */
//* Register Logic
//* ******* */

const register = async (req, res) => {
    const { username, email, phone, password } = req.body
    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            res.status(400).json({ msg: "User already exists with this email" })
        } else {
            const salt = 10
            const hash_password = await bcrypt.hash(password, 10)
            const userCreated = await User.create({ username, email, phone, password: hash_password })

            res.status(200)
                .json({
                    msg: "Registered successfully",
                    token: await userCreated.generateToken(),
                    userId: userCreated._id.toString(),
                })
                .send('register router')
        }
    } catch (error) {
        console.log(error)
    }
}

//* ******* */
//* login Logic
//* ******* */

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            res.status(400).json({ msg: "User does not exists with this email" })
        } else {
            const isMatch = await bcrypt.compare(password, userExist.password)
            if (!isMatch) {
                res.status(400).json({ msg: "Invalid password" })
            } else {
                res.status(200)
                    .json({
                        msg: "Logged in successfully",
                        token: await userExist.generateToken(),
                        userId: userExist._id.toString(),
                    })
                    .send('login router')
            }
        }
    } catch (error) {
        console.log(error)
    }
}


//* ******* */
//* Get user Logic
//* ******* */

const user = async (req, res) => {
    try {
        const userData = req.user

        return res.status(200).json({ userData})
    } catch (error) {
        console.log(error)
    }
}

//* ******* */
//* Get update Logic
//* ******* */

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, phone } = req.body;

    try {
        // Ensure the user can only update their own data
        if (req.user._id !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { username, email, phone }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { home, register, login, user , updateUser }