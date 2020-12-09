import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    customerCode: {
        type: String,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerStatus: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const Customer = mongoose.model('Customer', customerSchema)

export default Customer