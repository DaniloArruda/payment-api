const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente');
const ClienteService = require('../service/ClienteService');

module.exports = {
    async index(req, res) {
        const params = req.query;
        const nome = params.nome;
        const email = params.email;
        const plano = params.plano;

        const condicoes = {};
        if (nome) {
            condicoes.nome = new RegExp(nome, "i");
        }
        if (email) {
            condicoes.email = new RegExp(email, "i");
        }
        if(plano) {
            condicoes.plano = plano;
        }

        const clientes = await Cliente.find(condicoes, 'nome email telefone endereco plano');
        return res.json(clientes);
    },

    async show(req, res) {
        const cliente = await ClienteService.findClienteById(req.params.id);
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