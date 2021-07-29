import bcrypt from 'bcrypt'
import { students, admins } from '../../models/usersModel'

const userController = {
    async authentication(req, res) {
        const { email, password } = req.body

        try {
            const admin = await admins.findOne({ email })

            if (admin) {
                if (admin && bcrypt.compareSync(password, admin.password))
                    res.json({ authentication: "admin", pass: true })
                else
                    throw "Login ou senha inválidos!"
            } else {
                const student = await students.findOne({ email })

                if (student && bcrypt.compareSync(password, student.password))
                    res.json({ authentication: "student", pass: true })
                else
                    throw "Login ou senha inválidos!"
            }
        } catch (err) {
            console.log(err)
            res.json({ error: err, message: "Usuário não encontrado!" })
        }
    }
}

export { userController }