
import mongoose from 'mongoose'
   
const manageCustomerSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'  
    },
    supplyCode: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const ManageCustomer = mongoose.model('ManageCustomer', manageCustomerSchema)

export default ManageCustomer