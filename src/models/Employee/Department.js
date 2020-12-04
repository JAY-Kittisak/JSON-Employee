import mongoose from 'mongoose'
   
const departmentSchema = new mongoose.Schema({
    departID: {
        type: String,
        required: true
    },
    nameDepart: {
        type: String,
        required: true
    }
})

const Department = mongoose.model('Department', departmentSchema)

export default Department

   