const mongoose = require('mongoose');
const PlanSchema = new mongoose.Schema({
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    qtdData: {
        type: Number,
        required: true,
    },
});

mongoose.model('Plan', PlanSchema);