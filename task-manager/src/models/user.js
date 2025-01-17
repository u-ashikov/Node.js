const mongoose = require('../db/mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('The age must be a positive number.');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required.'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The email is not valid.');
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: [6, "The password length must be greater or equal to 6."],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('The password cannot contain password.');
            }
        },
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.statics.checkCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error("Invalid credentials.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials.');
    }

    return user;
};

userSchema.methods.createAuthToken = async function () {
    const user = this;

    const token = jwt.sign({_id:user._id.toString()}, "jwtisgreat");
    user.tokens = user.tokens.concat({token});

    user.save();

    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany({owner: user._id });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;