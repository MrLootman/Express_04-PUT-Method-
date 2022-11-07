const database = require('./database');

const getUsers = (req, res) => {
    database
        .query('SELECT * FROM users')
        .then(([users]) => {
            if (users && users.length > 0) {
                res.status(200).json(users)
            } else {
                console.error("There's no users")
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send("Cannot reach database")
        })
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query('SELECT * FROM users WHERE id = ?', [id])
        .then(([users]) => {
            if (users[0] != null) {
                console.log(users[0])
                res.status(200).json(users[0])
            } else {
                res.status(404).send("Not Found")
            }
        })
        .catch((err) => {
            console.log(err)
            console.error("Error retrieving data in the database")
        })
}

module.exports = {
    getUsers,
    getUsersById,
}