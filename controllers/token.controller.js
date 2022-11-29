import {
    generateToken
} from "../helpers/generateTokens.js";
import {errorTokens} from "../utils/errorsToken.js";
import jwt from "jsonwebtoken";

export const TokenRouterMethods = () => {
    return new Proxy({}, {
        get: function (target, name) {
            /**
             * Refresh Token Method
             */
            if(name === 'refresh') {
                return async (req, res) => {
                    try {
                        let refreshTokenCookie = req.body.token;
                        if (!refreshTokenCookie) throw new Error("No existe el refreshToken");
                        const {id} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
                        const {token, expiresIn} = generateToken(id);
                        return res.json({token, expiresIn});
                    } catch (error) {
                        const data = errorTokens(error.message);
                        return res.status(401).json({error: data});
                    }
                }
            }
        }
    })
}