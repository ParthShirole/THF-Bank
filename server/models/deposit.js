import mongoose from "mongoose"

const Deposit = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        name: {
            type: String,
        },

        amount: {
            type: Number,
        },

    },
    {
        timestamps: true
    },
    { collection: 'depositData' }
)

const DepositModel = mongoose.model('DepositModel', Deposit)

export default DepositModel