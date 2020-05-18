const Post = require('./models/post');
const HttpStatus = require('http-status-codes');

const putPost = (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then((post) => res.status(HttpStatus.CREATED).json(post))
        .catch((error) => res.status(HttpStatus.BAD_REQUEST).json(error));
};

const getPost = (req, res) => {
  Post.find()
      .then((posts) => res.json(posts))
      .catch((error) => res.status(HttpStatus.NOT_FOUND).json(error));
};

const getPostById = (req, res) => {
  Post.findById(req.params.id)
      .then((post) => {
          console.log(post);
        if (!post) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }
        res.json(post);
      })
      .catch((error) => {
          res.status(HttpStatus.BAD_REQUEST).json(error);
      });
};

const updatePost = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return Promise.reject(HttpStatus.NOT_FOUND);
            }
            return post.updateOne(req.body);
        })
        .then(() => res.sendStatus(HttpStatus.OK))
        .catch((error) => {
            if (error === HttpStatus.NOT_FOUND) {
                return res.sendStatus(HttpStatus.NOT_FOUND);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        });
};

const deletePost = (req, res) => {
    Post.findOneAndDelete({_id: req.params.id})
        .then((post) => {
            if (!post) {
                return res.sendStatus(HttpStatus.NOT_FOUND);
            }
            res.status(HttpStatus.OK).json(post);
        })
        .catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        });
};

const showUserPosts = (req, res) => {
    Post.find({userId: req.params.id})
        .then((postsArray) => {
            if (!postsArray.length) {
                return res.sendStatus(HttpStatus.NOT_FOUND);
            }
            res.json(postsArray);
        })
        .catch((error) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
};

module.exports = {
    putPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    showUserPosts
};