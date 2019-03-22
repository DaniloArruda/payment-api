const mongoose = require('mongoose');
const ClienteService = require('../service/ClienteService');

const Pagamento = mongoose.model('Pagamento');

module.exports = {
    async store(req, res) {
        const clienteId = req.body.cliente;
        const pagamento = req.body.pagamento;

        const cliente = await ClienteService.findClienteById(clienteId);
        if (cliente.pagamentos) {
            cliente.pagamentos.push(pagamento);
        } else {
            cliente.pagamentos = [pagamento];
        }

        const clienteAtualizado = await ClienteService.update(cliente);
        return res.status(201).json(clienteAtualizado);
    }
};