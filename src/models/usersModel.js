import pkg from 'mongoose';
const { model, Schema } = pkg;
import bcrypt from 'bcrypt'

const AdmSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true
})

AdmSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
        return
    }

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const admins = model('admins', AdmSchema)

const StudentsSchema = new Schema({
    email: String,
    password: String,
    team: Number
}, {
    timestamps: true
})

StudentsSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
        return
    }

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const students = model('students', StudentsSchema)

export { students, admins }