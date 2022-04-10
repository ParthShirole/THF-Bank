import mongoose from "mongoose"

const Transactions = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        receiverFName: {
            type: String,
        },
        receiverLName: {
            type: String,
        },
        senderFName: {
            type: String,
        },
        senderLName: {
            type: String,
        },
        amount: {
            type: Number,
        },
        desc: {
            type: String
        },
    },
    {timestamps: true},
    { collection: 'transactionData' }
)

const TransactionModel = mongoose.model('TransactionModel', Transactions)

export default TransactionModel