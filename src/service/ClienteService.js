const mongoose = require('mongoose');
const moment = require('moment');

const Cliente = mongoose.model('Cliente');
const Plano = mongoose.model('Plano');

module.exports = {
    async findClienteById(id) {
        const cliente = await Cliente.findById(id).lean();
        return cliente;
    },

    async update(cliente) {
        const clienteAtualizado = await Cliente.findByIdAndUpdate(cliente._id, cliente, { new: true });
        return clienteAtualizado;
    },

    async findClientes(params) {
      const nome = params.nome;
      const email = params.email;
      const plano = params.plano;
      const resumo = params.resumo;

      let projecao = 'nome email telefone endereco plano pagamentos createdAt';

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
      if(typeof resumo !== 'undefined') {
          projecao = 'nome';
      }

      const clientes = await Cliente.find(condicoes, projecao).lean();
      return clientes;
    },

    async findClientesDevedores(params) {
      const devedores = [];
      const clientes = await this.findClientes(params);

      for (cliente of clientes) {
        const dataAtual = moment();
        let dataAux = moment(cliente.createdAt);

        while(dataAux.isBefore(dataAtual, 'month')) {

          if (!cliente.pagamentos) {
            devedores.push(cliente);
            break;
          }

          pagamentoMesAtual = cliente.pagamentos.find(pagamento =>
            dataAux.isSame(moment(pagamento.data), 'M')
          );

          if (!pagamentoMesAtual) {
            devedores.push(cliente);
            break;
          }

          dataAux.add(1, 'M');
        }
      }

      return devedores;
    },

    async dinheiroDevendo(params) {
      let dinheiroDevendo = 0.0;
      let clientes = await this.findClientes(params);

      for (cliente of clientes) {
        cliente.planoObj = await Plano.findById(cliente.plano).lean();

        const dataAtual = moment();
        let dataAux = moment(cliente.createdAt);

        while(dataAux.isBefore(dataAtual, 'month')) {
          pagamentoMesAtual = cliente.pagamentos.find(pagamento =>
            dataAux.isSame(moment(pagamento.data), 'M')
          );

          if (!pagamentoMesAtual) {
            dinheiroDevendo += cliente.planoObj.valor;
          } else {
            const valor = cliente.planoObj.valor - pagamentoMesAtual.valor;
            dinheiroDevendo += valor >= 0 ? valor : 0;
          }

          dataAux.add(1, 'M');
        }
      }

      return dinheiroDevendo;
    }
}
