const { User, Thought } = require('../models');

const userController = {
    // get all Users
    getAllUser(req,res) {
        User.find({})
          .populate({
              path: 'friends',
              select: '-__v'
          }) 
          .populate({
              path: 'thoughts',
              select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
              path: 'friends',
              select: '-__v'
          })
          .populate({
            path: 'thoughts',
            select: '-__v'
        })
          .select('-__v')
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => {
              console.log(err);
              res.stauts(400).json(err);
          });
    },

    // create a User
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
    },

    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(400).json({ message:  'No user found with this id' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    // delete a User
    deleteUser({ params }, res) {
        User.findById(params.id).then(function(user) {
            console.log(user);
            return Thought.deleteMany({
                username: user.username
            });
        }).then(function() {
            User.findOneAndDelete({ _id: params.id })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message:  'No user found with this id!' });
                        return;
                        }
                    res.json(dbUserData);
          })
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message:  'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;