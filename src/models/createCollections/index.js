import pkg from '../../../userData.json'
const { adminsData, studentsData } = pkg

import { admins, students } from '../usersModel'

// Criando e inserindo dados no banco para que o sistema possa ser acessado sem um sistema de cadastro
async function createAdmin() {
    // Adicionando admins de userData.json
    adminsData.forEach(async admin => {
        const isUser = await admins.findOne({ email: admin.email })

        if (!isUser) {
            admins.create(admin, function (err, doc) {
                if (err) {
                    throw err
                }

                console.log('Admin Created: ' + doc.email)
            })
        } else {
            console.log('Admin exists: ' + admin.email)
        }
    })
}

async function createStudent() {
    // Adicionando estudantes de userData.json
    studentsData.forEach(async student => {
        const isUser = await students.findOne({ email: student.email })

        if (!isUser) {
            students.create(student, function (err, doc) {
                if (err) {
                    throw err
                }

                console.log('Student Created: ' + doc.email)
            })
        } else {
            console.log('Student exists: ' + student.email)
        }
    })
}

export { createAdmin, createStudent }