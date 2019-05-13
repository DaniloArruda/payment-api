const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    endereco: {
        type: {},
        required: true,
    },
    plano: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plano'
    },
    pagamentos: {},
    createdAt: {
      type: Date,
      default: Date.now
    }
});

mongoose.model('Cliente', ClienteSchema);
