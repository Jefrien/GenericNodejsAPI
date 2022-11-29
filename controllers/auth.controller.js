import User from '../models/User.js'
import {compare, hash} from 'bcrypt'
import {
    generateRefreshToken,
} from "../helpers/generateTokens.js";

const isEmailRegistered = async (email) => {
    return await User.findOne({'email': email})
}

export const RouteMethods = () => {
    return new Proxy({}, {
        get: function (target, name) {

            /**
             * Register Method
             */
            if (name === 'register') {
                return async (req, res) => {
                    try {
                        const body = req.body;

                        if (await isEmailRegistered(body.email)) {
                            return res.status(400).json({
                                message: 'Email already registered',
                                errorCode: 1
                            })
                        }

                        body.password = await hash(body.password, 10)
                        body['modules'] = [];
                        body['status'] = 'active';

                        const user = await User.create(body)
                        res.json(user)
                    } catch (error) {
                        return res.status(500).json({
                            message: 'Error in the register',
                            error
                        })
                    }
                }
            }


            /**
             * Login Method
             */
            if (name === 'login') {
                return async (req, res) => {
                    try {
                        const body = req.body;
                        const userDB = await isEmailRegistered(body.email)
                        if (!userDB) throw new Error('Email not registered!')

                        let comparePass = await compare(body.password, userDB.password)
                        if (!comparePass) throw new Error('Password or email invalids')

                        //const {token, expiresIn} = generateToken(userDB.id);
                        let token = generateRefreshToken(userDB.id, res);

                        return res.json({
                            token, uid: userDB.id
                        });

                    } catch (error) {
                        return res.status(500).json({
                            message: 'Error',
                            error: error.message
                        })
                    }
                }

            }


        }
    });
}