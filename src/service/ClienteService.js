const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente');

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
    }
}
