const User = require('./models/user');

const putUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((user) => res.status(201).json(user))
        .catch((err => res.status(400).json(err)))
};

const getUser = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch(err => res.json(err));
};

const getUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.sendStatus((404));
                return;
            }
            res.json(user)
        })
        .catch(error => res.json(error));
};

const updateUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.sendStatus(404);
                return;
            }
            user.update(req.body)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};

const deleteUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.sendStatus((404));
                return;
            }
            user.remove()
                .then(() => res.sendStatus(204))
                .catch(error => res.status(400).json(error));

        })
        .catch(error => res.status(400).json(error));
};

module.exports = {
    putUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
};