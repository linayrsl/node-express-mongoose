const User = require('../models/user');
const HttpStatus = require('http-status-codes');

const putUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((user) => res.status(HttpStatus.CREATED).json(user))
        .catch((err => res.status(HttpStatus.BAD_REQUEST).json(err)))
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
                res.sendStatus((HttpStatus.NOT_FOUND));
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
                res.sendStatus(HttpStatus.NOT_FOUND);
                return;
            }
            user.update(req.body)
                .then(() => res.sendStatus(HttpStatus.OK)
                .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};

const deleteUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.sendStatus((HttpStatus.NOT_FOUND));
                return;
            }
            user.remove()
                .then(() => res.sendStatus(HttpStatus.NO_CONTENT)
                .catch(error => res.status(HttpStatus.BAD_REQUEST).json(error));

        })
        .catch(error => res.status(HttpStatus.BAD_REQUEST).json(error));
};

module.exports = {
    putUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
};