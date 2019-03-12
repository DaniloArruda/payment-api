const mongoose = require('mongoose');
const PlanoSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    qtdDados: {
        type: Number,
        required: true,
    },
});

mongoose.model('Plano', PlanoSchema);