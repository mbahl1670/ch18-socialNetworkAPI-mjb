const { Thought, User } = require('../models');

const thoughtController = {
    
    // get all Thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));

    },

    // get Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought by that ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // create a Thought
    createThought({ params, body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
              return User.findOneAndUpdate(
                  { _id: body.userId },
                  { $push: { thoughts: _id } },
                  { new: true }
              );
          })
          .then(dbThoughtData => {
              if(!dbThoughtData) {
                  res.status(404).json({ message: 'No thought with that ID!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with that ID!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Update a Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete a Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message:  'No thought with ID!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message:  'No thought with ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;