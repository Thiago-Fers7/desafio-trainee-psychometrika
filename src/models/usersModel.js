import pkg from 'mongoose';
const { model, Schema } = pkg;
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
        return
    }

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const students = model('students', UserSchema)
const admins = model('admins', UserSchema)

export { students, admins }