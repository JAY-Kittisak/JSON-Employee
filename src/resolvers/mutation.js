import bcrypt from 'bcryptjs'
import User from '../models/user'
import Employee from '../models/Employee/Employee'
import Department from '../models/Employee/Department'
import Product from '../models/product'
import Customer from '../models/Customer/customer'



const Mutation = {
    signUp: async (parent, args, context, info) => {

    //TODO Trim(ตัดแต่ง) and lower case user email
        //* ฟังก์ชัน trim คือการตัดค่าว่างหรือ ค่า Spec ของ String ตัวแรก และตัวสุดท้าย String = "               xxxx xxx               " ; ====> ก็จะได้ String = "xxxx xxx" 
        //* ฟังก์ชัน toLowerCase แปลงข้อความเป็นตัวเล็ก / ตัวใหญ่ toUpperCase 

        const email = args.email.trim().toLowerCase()
        //! ---------^^^^^^^^^^->args.email คือ E-mail ที่ User คีย์เข้ามาในระบบ

        //! Check if email already exist(มีอยู่) in database
        const currentUsers = await User.find({})
        //!  ---------------------^^^^^-> ไปดึง User มาจาก database มาเก็บไว้ในตัวแปร currentUsers(ผู้ใช้ปัจจุบัน)
        const isEmailExist = currentUsers.findIndex(user => user.email === email) > -1
        //!  -----------------------------------------------------------------------^-> ใช้มากกว่า -1 เพราะข้อมูลเป็น Array [0],[1],[2] ที่มากกว่า -1 / ถ้าไม่เจอจะได้ -1 = false

        if (isEmailExist) {
            throw new Error('Email already exist.')
        }

    //TODO Validate(ตรวจสอบ) password
        if (args.password.trim().length < 6) {
            throw new Error('Password must ba at least 6 characters.')
        }

        const password = await bcrypt.hash(args.password, 10)
        //!  ---------------------------------------------^^->  10 คือ ระดับความปลอดภัย

    //? <================***Before***================> "return User.create(args)"
        return User.create({...args, email, password})
        //!  -----------------^^^^-> Spread Operators ทำให้เราสามารถรวมข้อมูล หรือ กระจายข้อมูล 


        
    },
    addEmployee: (_,{ inputEmployee }) => { //เปลี่ยน args เป็น array obj 
        return Employee.create(inputEmployee)
    },




    addDepartment: (_,{ resolversInputDepartment }) => { //เปลี่ยน args เป็น array obj 
        return Department.create(resolversInputDepartment)
    },
    

    createProduct: async (parent, args, context, info) => {
        const userId = "5fc9bd0a77157b0d307649d4"

    //TODO Validate(ตรวจสอบ) provide
        if (!args.description || !args.price || !args.imageUrl) {
//!  --->ถ้าไม่ได้ Provide args.department |หรือ| !args.price |หรือ| !args.imageUrl {ให้มัน throw error}
            throw new Error('Please provide all required fields. (โปรดระบุฟิลด์ที่จำเป็นทั้งหมด)')
        }


        const product = await Product.create({...args, user: userId})
    //TODO Update Array ของ products ในตาราง User ด้วย
        const user = await User.findById(userId) //* ไปดึงข้อมูล ๊ User มา

        if (!user.products) {
//!  --->ถ้า user นั้นมีฟิลด์ที่ชื้อ products มั้ย ถ้าไม่มีก็ไปสร้างฟิลด์นี้ขึ้นมา
            user.products = [product]

        }else {
//!  --->มิฉะนั้น  ถ้ามีฟิลด์ Product อยู่แล้ว ให้ push new product ที่พึ่ง Create เข้าไป
            user.products.push(product)
        }

//!  ---> push แล้วต้อง save ด้วย
        await user.save()

        return Product.findById(product.id).populate({
            path: "user",
            populate: { path: "products"}
        })
    },

    addToCart: async (parent, args, context, info) => {
        //!  id --> productId
        const { id } = args

        try {
            //! Find user who perform add to cart --> from logged in
            const userId = "5fc9fb43a3e5cd1734e3fd7f"

            //! Check if the new addToCart item is already in user.carts
            const user = await User.findById(userId).populate({
                path: "carts",
                populate: { path: "product" }
            })

            const findCartItemIndex = user.carts.findIndex(cartItem => cartItem.product.id === id)

            if (findCartItemIndex > -1) {
                //! กรณี A. The new addToCart item is already in cart
                //! กรณี A.1 Find the cartItem and Update in database
                user.carts[findCartItemIndex].quantity += 1

                await CartItem.findByIdAndUpdate(user.carts[findCartItemIndex].id, {
                    quantity: user.carts[findCartItemIndex].quantity
                })

                //! กรณี A.2 Update quantity of that cartItem --> increase(เพิ่มขึ้น)
                //!! กรณี A.2 Find updated cartItem
                const updatedCartItem = await CartItem.findById(
                    user.carts[findCartItemIndex].id
                ).populate({
                    path: "product"
                })
                    .populate({
                        path: "user"
                    })

                return updatedCartItem

            }

            //! กรณี B. The new addToCart item is not in cart yet
            //! กรณี B.1 Create new cartItem
            //! กรณี B.2 Update user.carts
        } catch (error) {
            console.log(error)
        }
    },


    createCustomer: async (parent, args, context, info) => {
        const userId = "5fc9fb43a3e5cd1734e3fd7f"

    //TODO Validate(ตรวจสอบ) provide
        if (!args.customerCode || !args.customerName || !args.customerStatus) {
//!  --->ถ้าไม่ได้ Provide args.department |หรือ| !args.price |หรือ| !args.imageUrl {ให้มัน throw error}
            throw new Error('Please provide all required fields. (โปรดระบุฟิลด์ที่จำเป็นทั้งหมด)')
        }


        const customer = await Customer.create({...args, user: userId})
    //TODO Update Array ของ products ในตาราง User ด้วย
        const user = await User.findById(userId) //* ไปดึงข้อมูล ๊ User มา

        if (!user.customers) {
//!  --->ถ้า user นั้นมีฟิลด์ที่ชื้อ products มั้ย ถ้าไม่มีก็ไปสร้างฟิลด์นี้ขึ้นมา
            user.customers = [customer]

        }else {
//!  --->มิฉะนั้น  ถ้ามีฟิลด์ Product อยู่แล้ว ให้ push new product ที่พึ่ง Create เข้าไป
            user.customers.push(customer)
        }

//!  ---> push แล้วต้อง save ด้วย
        await user.save()

        return Customer.findById(customer.id).populate({
            path: "user",
            populate: { path: "customers"}
        })
    },
}

export default Mutation