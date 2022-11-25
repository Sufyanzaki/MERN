import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import ErrorHander from "../utils/errorhander.js";
import Comment from "../model/commentModel.js"
import { v2 as cloudinary } from 'cloudinary'

export const createPost = (async (req, res, next) => {
  
  const {caption, image, video} = req.body;

    const newPostData = {
      caption: caption,
      image: image,
      video: video,
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const findPost = await Post.findOne(newPostData).lean().populate("owner", "name pic");

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id); //adding created post to users post array

    await user.save();

    res.status(201).json({
      success: true,
      post: findPost,
    });

});

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("This post does not exist", 500));
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return next(new ErrorHander("Unauthorized", 500));
    }

    // await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    return next(new ErrorHander("Something went wrong", 500));
  }
};

export const adminDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("This post does not exist", 500));
    }

    // await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.body.userId);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    return next(new ErrorHander("Something went wrong", 500));
  }
};

export const likeAndUnlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("Session expired login again", 500));
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: null,
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: req.user._id,
      });
    }
  } catch (error) {
    return next(new ErrorHander("unable to like this post", 500));
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const pageNumber = req.params.page
    const resultPerPage = 8;
    const posts = await Post.find()
      .lean().populate("owner", "name pic")
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User'
        }
      }).skip(resultPerPage * (pageNumber - 1)).limit(resultPerPage)

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userposts= (async (req, res, next) => {
  const {userId} = req.body
  try {
    const pageNumber = req.params.page
    const resultPerPage = 8;
    const posts = await Post.find({owner : userId})
      .lean().populate("owner", "name pic")
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .skip(resultPerPage * (pageNumber - 1)).limit(resultPerPage)

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner comments.user");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("update caption failed", 500));
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return next(new ErrorHander("Unauthorized", 500));
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    return next(new ErrorHander("Something went wrong", 500));
  }
};

export const commentOnPost = (async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHander("This post does not exists", 404));
    }
    // let commentIndex = -1;

    // // Checking if comment already exists

    // post.comments.forEach((item, index) => {
    //   if (item.user.toString() === req.user._id.toString()) {
    //     commentIndex = index;
    //   }
    // });

    // if (commentIndex !== -1) {
    //   post.comments[commentIndex].comment = req.body.comment;

    //   await post.save();

    //   return res.status(200).json({
    //     success: true,
    //     response: req.body.comment
    //   });
    // }
    // else {
    // post.comments.push({
    //   user: req.user._id,
    //   comment: req.body.comment,
    // });
    const comment = await Comment.create({
      user: req.user._id,
      post: req.params.id,
      comment: req.body.comment
    })

    post.comments.unshift(comment._id);

    await post.save();

    const newComment = await Comment.findOne({
      user: req.user._id,
      post: req.params.id,
      comment: req.body.comment
    }).lean().populate('user', 'name pic')

    return res.status(200).json({
      success: true,
      response: newComment,
    });
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const deleteComment = (async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("This post does not exists", 404));
    }

    // Checking If owner wants to delete
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        if (!post) {
          return next(new ErrorHander("Comment id is required", 404));
        }
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
});

export const adminDeleteComment = (async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHander("This post does not exists", 404));
    }

    // Checking If owner wants to delete
    if (post.owner.toString() === req.body.userId.toString()) {
      if (req.body.commentId === undefined) {
        if (!post) {
          return next(new ErrorHander("Comment id is required", 404));
        }
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
});