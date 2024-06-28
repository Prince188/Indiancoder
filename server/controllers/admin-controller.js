const User = require('../models/user-model');
const Contact = require('../models/contact-model');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ msg: "User deleted" });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        // Check if email already exists
        if (updatedUserData.email) {
            const existingUser = await User.findOne({ email: updatedUserData.email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const updateData = await User.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, { password: 0 });
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUsers, getUserById, updateUser };
