import mongoose from 'mongoose'
   
const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nameTH: {
        type: String,
        required: true
    },
    lastNameTH: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    Department: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        }
    ]
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee

   