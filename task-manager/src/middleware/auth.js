const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

const auth = async (req,res,next) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken.replace('Bearer ', '');

        const decoded = jwt.verify(token,'jwtisgreat');
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token });
        
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate.');
    }
}

module.exports = auth;