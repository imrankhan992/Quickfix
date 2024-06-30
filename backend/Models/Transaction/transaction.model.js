const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProviderRegistration', required: true },
    type: { type: String, required: true }, // e.g., "deduction", "deposit"
    amount: { type: Number, required: true },
    
    description: { type: String },
}, { timestamps: true } );

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
