//! ใช้ในการสร้าง Schema ของ Database MongoDB ซึ่งจะต้องสอดคล้องกับ Database ของ Schema(schema.graphql) ของ Server ด้วย
import mongoose from 'mongoose'
   
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ],
    customers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    ],
    manageCustomer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ManageCustomer'
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const User = mongoose.model('User', userSchema)

export default User

   