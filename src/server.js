import fs from 'fs' //! เป็น build in module ของ Nodejs ใช้ อ่านไฟล์ schema.graphql แล้วก็แปลงมาเป็น String
import path from 'path' //! เป็น build in module ของ Nodejs 
import {
    ApolloServer
} from 'apollo-server-express'

import resolvers from './resolvers'
import getUser from './utils/getUser'


const typeDefs = fs
    .readFileSync(path.join(__dirname, './schema' , 'schema.graphql') , 'utf8')
    .toString()

//! ------>    __dirname เป็นตัวแปรเพื่อดึงค่า ตำแหน่ง folder หรือ directory ของเราครับ
//! ------>    __filename จะได้ชื่อไฟล์ที่โปรแกรมมันทำงานอยู่

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        //* Check token from headers
        const token = req.headers.authorization || ''

        //* Extract userId from token
        const userId = getUser(token)

        return { userId }
    }
})

export default server