const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    }
});

mongoose.model('Pagamento', PagamentoSchema);

module.exports = PagamentoSchema;