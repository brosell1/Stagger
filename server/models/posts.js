const mongoose = require('mongoose');
// node-uuid
const postSchema = {
      postId: Number,
      postContent: String,
      postMedia: String,
      scheduledTime: Number,
      accountsToPostTo: [Object],
      posted: {type: Boolean, default: false}
}

var Post = mongoose.model('posts', mongoose.Schema(postSchema));

module.exports = Post;
