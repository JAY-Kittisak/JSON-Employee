import User from '../models/user'
import Product from '../models/product'
import Employee from '../models/Employee/Employee'
import Department from '../models/Employee/Department'



const Query = {
        user: (parent, args, context, info) =>
                User.findById(args.id)
                        .populate({
                        path: 'products',
                        populate: {
                                path: 'user'
                        }
                }).populate({
                        path: "carts",
                        populate: {
                                path: "product"
                        }
                }),
        users: (parent, args, context, info) =>
                User.find({})
                        .populate({
                        path: 'products',
                        populate: {
                                path: 'user'
                        }
                }).populate({
                        path: "carts",
                        populate: {
                                path: "product"
                        }
                }),

        product: (parent, args, context, info) =>
                Product.findById(args.id).populate({
                        path: 'user',
                        populate: {
                                path: 'products'
                        }
                }),
        products: (parent, args, context, info) =>
                Product.find().populate({
                        path: 'user',
                        populate: {
                                path: 'products'
                        }
                }),
        productAll: (parent, args, context, info) => Product.find({}),

        employee: (parent, args, context, info) => Employee.findById(args.id),
        employees: (parent, args, context, info) => Employee.find({}),

        department: (parent, args, context, info) => Department.findById(args.id),
        departments: (parent, args, context, info) => Department.find({})
}

export default Query