const { putUser, getUser, getUserById, updateUser, deleteUser } = require('./handlers/users');
const { putPost, getPost, getPostById, updatePost, deletePost, showUserPosts }  = require('./handlers/posts');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/social', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('connected to mongoDB'));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.put('/user', putUser);
app.get('/user', getUser);
app.get('/user/:id', getUserById);
app.post('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);
app.get('/user/:id/posts', showUserPosts);

app.put('/post', putPost);
app.get('/post', getPost);
app.get('/post/:id', getPostById);
app.post('/post/:id', updatePost);
app.delete('/post/:id', deletePost);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
