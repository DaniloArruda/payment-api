const mongoose = require('mongoose');

const Plan = mongoose.model('Plan');

module.exports = {
    async index(req, res) {
        const plans = await Plan.find();
        return res.json(plans);
    },

    async show(req, res) {
        const plan = await Plan.findById(req.params.id);
        return res.json(plan);
    },

    async store(req, res) {
        const plan = await Plan.create(req.body);
        return res.json(plan);
    },

    async update(req, res) {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(plan);
    },

    async delete(req, res) {
        await Plan.findByIdAndDelete(req.params.id);
        return res.send();
    }
};