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
      for (cliente in clientes) {
        if (!cliente.pagamentos) {
          devedores.push(cliente);
        } else {
          const mesInicial = moment(cliente.createdAt).toDate().getMonth();
          const anoInicial = moment(cliente.createdAt).toDate().getFullYear();

          const mesAtual = moment().toDate().getMonth();
          const anoAtual = moment().toDate().getFullYear();

          const mesAux = mesInicial;
          const anoAux = anoInicial;

          while(mesAux < mesAtual && anoAux <= anoAtual) {

            pagamentoMesAtual = cliente.pagamentos.find(pagamento =>
              moment(pagamento.data).toDate().getMonth() == mesAux
                && moment(pagamento.data).toDate().getFullYear() == anoAux
            );

            if (!pagamentoMesAtual) {
              devedores.push(cliente);
            }

            if (mesAux == 11) {
              mesAux = 0;
            } else {
              mesAux++;
            }
          }
        }
      }

      return res.json(devedores);
    },

    async teste(req, res) {
      const params = req.params
      const clientes = await ClienteService.findClientes(params);

      for (cliente in clientes) {
        console.log(moment(cliente.createdAt).toDate().getMonth());
        console.log(moment(cliente.createdAt).toDate().getFullYear());
        console.log(moment().toDate().getMonth());
        console.log(moment().toDate().getFullYear());
        break;
      }

      return res.send();
    }
};
