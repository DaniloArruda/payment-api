const mongoose = require('mongoose');
const moment = require('moment');

const Plano = mongoose.model('Plano');
const Cliente = mongoose.model('Cliente');
const ClienteService = require('../service/ClienteService');

module.exports = {
    async index(req, res) {
        const params = req.query;
        const clientes = await ClienteService.findClientes(params);
        return res.json(clientes);
    },

    async show(req, res) {
        const params = req.query;
        const paramPagamento = params.pagamento;
        const type = typeof paramPagamento;
        const comPagamento = type !== 'undefined';
        const cliente = await ClienteService.findClienteById(req.params.id);

        if (comPagamento) {
            const plano = await Plano.findById(cliente.plano).lean();
            cliente.planoObj = plano;
        }

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
    },

    async count(req, res) {
      const count = await Cliente.estimatedDocumentCount();
      return res.json({ count });
    },

    async clientesDevedores(req, res) {
      const devedores = [];
      const params = req.query;
      const clientes = await ClienteService.findClientes(params);

      for (cliente of clientes) {
        const dataAtual = moment();
        let dataAux = moment(cliente.createdAt);

        while(dataAux.isBefore(dataAtual, 'month')) {

          if (!cliente.pagamentos) {
            devedores.push(cliente);
            break;
          }

          pagamentoMesAtual = cliente.pagamentos.find(pagamento =>
            moment(pagamento.data).toDate().getMonth() === dataAux.toDate().getMonth()
            && moment(pagamento.data).toDate().getFullYear() === dataAux.toDate().getFullYear()
          );

          if (!pagamentoMesAtual) {
            devedores.push(cliente);
            break;
          }

          dataAux.add(1, 'M');
        }
      }

      return res.json(devedores);
    }
};
