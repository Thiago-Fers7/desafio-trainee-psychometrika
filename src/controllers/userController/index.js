const userController = {
    getUsers(req, res) {
        res.json({ message: "Servidor funcionando!" })
    }
}

export { userController }