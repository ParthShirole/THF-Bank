import mongoose from "mongoose"

const Fd = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        amount: {
            type: Number,
        },
        duration: {
            type: Number,
        },
    },
    {timestamps: true},
    {collection: 'fdData'}
)

const fdModel = mongoose.model('fdModel', Fd)

export default fdModel