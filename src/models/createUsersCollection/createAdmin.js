// Criando e inserindo administrador no banco para que o sistema possar ser acessado sem um sistema de cadastro

import { mongoose } from '../database'
import { admins } from '../usersModel'

async function createAdmin() {
    mongoose

    const newUserEmail = "admin@email.com"
    const newUserPassword = "psychoadmin"

    const isUser = await admins.findOne({ email: newUserEmail })

    if (!isUser) {
        admins.create({ email: newUserEmail, password: newUserPassword }, function (err, doc) {
            if (err) {
                throw err
            }

            console.log("Admin Created: " + doc.email)
        })
    } else {
        console.log("Admin already exists: " + newUserEmail)
    }
}

export { createAdmin }