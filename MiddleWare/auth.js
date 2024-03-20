const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decode = jwt.verify(token, "sg_mart") 
            if (decode) {
                req.body.userid=decode.userid
                    next()
            } else {
                res.status(200).send({ "msg": "Please Login" })
            }

        } catch (er) {
            res.status(400).send({ "msg": er.message})
        }

    } else {
        res.status(200).send({ "msg": "Please Login" })
    }
}


module.exports={
    auth
}