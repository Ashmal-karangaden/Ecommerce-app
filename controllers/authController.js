import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body
        //validation
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }

        //check user
        const existngUser = await userModel.findOne({ email })
        //existing user
        if (existngUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered. Please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = new userModel({ name, password: hashedPassword, email, phone, address, answer}).save()

        res.status(201).send(({
            success: true,
            message: 'User Registered Successfully',
            user

        }))

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            err
        })
    }
}

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or Password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'email is not registerd'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
            })
        }
        const token = await JWT.sign({ _id: user.id },
            process.env.JWT_SECRET, {
            expiresIn: '7d',
        })
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer:user.answer,
                role: user.role,
            },
            token,
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            err
        })
    }
}

// test controller

export const testController = (req, res) => {
    res.send('Protected Routes')
}

export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body
        
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }
        if (!newPassword) {
            return res.send({ message: 'New password is required' })
        }

        const User = await userModel.findOne({ email, answer })

        if (!User) {
            return res.status(404).send({
                success:false, 
                message: 'Invalid Email Or Answer'
             });
        }

        const hashed = await hashPassword(newPassword)

        if (!hashed) {
            return res.status(404).send({ message: 'Somthing Went Wrong' })
        }

       await userModel.findByIdAndUpdate(User._id,{password:hashed})

        res.status(200).send({
            success:true,
            message:'Password reset Successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Something Went Wrong',
            err
        })
    }



}
