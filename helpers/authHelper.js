import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRounds = 12
        const hashPassword = await bcrypt.hash(password, saltRounds)
        return hashPassword
    } catch (err) {
        console.log(`Error is ${err}`)
    }
}

export const comparePassword = (Password,hashPassword)=>{
    try{
        return bcrypt.compare(Password,hashPassword)

    }catch (err) {
        console.log(`Error is ${err}`)
    }

}