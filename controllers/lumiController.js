// lumi router controller functions
const User = require('../models/userModel')

const getData = () => {
    try {
        const users = User.find()
        return users
    } catch (err) {
        res.send(err.message)
    }
}

const create = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}



module.exports = {
    getData,
    create
}