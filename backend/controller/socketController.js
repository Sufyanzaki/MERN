const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
// const cloudinary = require("cloudinary");
exports.socketConnect = catchAsyncErrors(async (req, res, next) => {
res.send('socket is up');
});

