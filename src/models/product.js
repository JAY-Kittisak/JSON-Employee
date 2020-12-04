import mongoose from 'mongoose'
   
const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    //TODO เวลาเราเก็บ User ไว้ใน Database เราไม่เก็บทั้งหมด เราดึงเฉพาะ ID ของ User นั้น
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product