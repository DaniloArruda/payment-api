const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente');

module.exports = {
    async index(req, res) {
        const clientes = await Cliente.find();
        return res.json(clientes);
    },

    async show(req, res) {
        const cliente = await Cliente.findById(req.params.id);
        return res.json(cliente);
    },

    async store(req, res) {
        Cliente.create(req.body)
            .then(cliente => res.status(201).json(cliente))
            .catch(erro => res.status(500).json(erro));
    },

    async update(req, res) {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(cliente);
    },

    async delete(req, res) {
        await Cliente.findByIdAndDelete(req.params.id);
        return res.send();
    }
};