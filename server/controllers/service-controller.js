const Service = require('../models/service-model')

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({ message: 'Service not found' })
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Services: ${error}`);
    }
}

const singleservices = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await Service.findById(id);
        if (!data) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching single service: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
};

const servicesForm = async (req, res) => {
    try {
        const response = req.body
        await Service.create(response)
        return res.status(200).json({ message: "Service added" })
    } catch (error) {
        return res.status(500).json({ message: "Service not added" })
    }
}

const servicesFormDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({ _id: id });
        return res.status(200).json({ msg: "Service deleted" });
    } catch (error) {
        console.log(`Services: ${error}`);
    }
}

const servicesForUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updateData = await Service.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        res.status(200).json(updateData);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { services,singleservices, servicesForm, servicesFormDelete, servicesForUpdate }