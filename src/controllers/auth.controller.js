exports.allaccess = (req, res) => {
    res.status(200).send({message: "All can access"})
}
exports.isuser = (req, res) => {
    res.status(200).send({ message: "User can access" })
}
exports.isadmin = (req, res) => {
    res.status(200).send({ message: "Admin can access" })
}
exports.ismoderator = (req, res) => {
    res.status(200).send({ message: "Moderator can access" })
}