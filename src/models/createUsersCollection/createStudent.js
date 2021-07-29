// Criando e inserindo usuário no banco para que o sistema possar ser acessado sem um sistema de cadastro

import { mongoose } from '../database'
import { students } from '../usersModel'

async function createStudent() {
    mongoose

    const newUserEmail = "thiago@email.com"
    const newUserPassword = "psychostudent"

    const isUser = await students.findOne({ email: newUserEmail })

    if (!isUser) {
        students.create({ email: newUserEmail, password: newUserPassword }, function (err, doc) {
            if (err) {
                throw err
            }

            console.log("User Created: " + doc.email)
        })
    } else {
        console.log("User already exists: " + newUserEmail)
    }
}

export { createStudent }