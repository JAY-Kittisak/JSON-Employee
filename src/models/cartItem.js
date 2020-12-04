//! ใช้ในการสร้าง Schema ของ Database MongoDB ซึ่งจะต้องสอดคล้องกับ Database ของ Schema(schema.graphql) ของ Server ด้วย
import mongoose from 'mongoose'
   
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  
    },
    quantity: {
        type: Number
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

const CartItem = mongoose.model('CartItem', cartItemSchema)

export default CartItem

   