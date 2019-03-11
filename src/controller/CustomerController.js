const mongoose = require('mongoose');

const Customer = mongoose.model('Customer');

module.exports = {
    async index(req, res) {
        const customers = await Customer.find();
        return res.json(customers);
    },

    async show(req, res) {
        const customer = await Customer.findById(req.params.id);
        return res.json(customer);
    },

    async store(req, res) {
        Customer.create(req.body)
            .then(customer => res.json(customer))
            .catch(error => res.status(500).json(error));
    },

    async update(req, res) {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(customer);
    },

    async delete(req, res) {
        await Customer.findByIdAndDelete(req.params.id);
        return res.send();
    }
};