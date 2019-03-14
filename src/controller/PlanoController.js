const mongoose = require('mongoose');

const Plano = mongoose.model('Plano');

module.exports = {
    async index(req, res) {
        const planos = await Plano.find();
        return res.json(planos);
    },

    async show(req, res) {
        const plano = await Plano.findById(req.params.id);
        return res.json(plano);
    },

    async store(req, res) {
        const plano = await Plano.create(req.body);
        return res.status(201).json(plano);
    },

    async update(req, res) {
        const plano = await Plano.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(plano);
    },

    async delete(req, res) {
        await Plano.findByIdAndDelete(req.params.id);
        return res.send();
    }
};