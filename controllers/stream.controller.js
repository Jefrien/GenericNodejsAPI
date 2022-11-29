export const RouterMethods = () => {
    return new Proxy({}, {
        get: function (target, name) {
            /**
             * Upload a Track File
             */
            if(name === 'upload') {
                return async (req, res) => {
                    try {
                        return res.json({'test': 'ok'});
                    } catch (error) {
                        return res.status(401).json({error: error.message});
                    }
                }
            }


            /**
             * Stream a Track File
             */
            if(name === 'stream') {
                return async (req, res) => {
                    try {
                        return res.json({'test': 'ok'});
                    } catch (error) {
                        return res.status(401).json({error: error.message});
                    }
                }
            }
        }
    })
}