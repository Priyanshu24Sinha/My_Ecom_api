import express from 'express'
import { login, profile, register, users } from '../Controllers/user.js';
import {Authenticated} from '../Middlewares/auth.js'

const router = express.Router();

// register user

router.post('/register',register)



// login user

router.post('/login',login)



// get all user

router.get('/all',users)


// GET USER PROFILE

router.get('/profile',Authenticated,profile)



export default router