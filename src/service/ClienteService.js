const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente');

module.exports = {
    findClienteById(id) {
        const cliente = Cliente.findById(id);
        return cliente;
    },

    update(cliente) {
        const clienteAtualizado = Cliente.findByIdAndUpdate(cliente._id, cliente, { new: true });
        return clienteAtualizado;
    }
}