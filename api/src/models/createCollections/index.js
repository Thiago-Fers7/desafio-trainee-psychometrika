import { admins, students } from '../usersModel'

import pkg from '../../documents/userData.json'
import pkg2 from '../../documents/chaptersData.json'

const { adminsData, studentsData } = pkg
const { seriesData } = pkg2

const seriesAmount  = seriesData.length
export { seriesAmount }

import { series } from '../chaptersModel'

// Criando e inserindo dados no banco para que o sistema possa ser acessado sem um sistema de cadastro
function createAdmin() {
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

function createStudent() {
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

function createChapters() {
    // Adicionando capítulos de conteúdo de chaptersData.json
    seriesData.forEach((grade, index) => {
        let serie = series[index]

        grade.chaptersContent.forEach(async (chapter, index) => {
            const isChapter = await serie.findOne({ id: chapter.id })

            if (!isChapter) {
                serie.create(chapter, function (err, doc) {
                    if (err) {
                        throw err
                    }

                    console.log('Chapter created: ' + doc.id)
                })
            } else {
                console.log('Chapter exists: ' + chapter.id)
            }
        })
    })
}

export { createAdmin, createStudent, createChapters }