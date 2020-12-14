import jwt from 'jsonwebtoken'
const getUser = token => {
    if (!token) return null

    //* 'Bearer zbowltoblaldfiaasdfjhfut...' --> หลัักจากทำการ split [Bearer, zbowltoblaldfiaasdfjhfut...]
    const parsedToken = token.split(' ')[1]

    try {
        const decodedToken = jwt.verify(parsedToken, process.env.SECRET)

        return decodedToken.userId

    } catch (error) {
        return null
    }
}

export default getUser