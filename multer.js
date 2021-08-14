const path = require("path");
const multer = require("multer");
const uploadDir = path.join(__dirname, "./assets/image");

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, uploadDir);
  },
  filename: (req, file, done) => {
    const extension = file.mimetype.split("/")[1];
    done(null, "profile-" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, done) => {
  const extension = file.mimetype.split("/")[1];
  if (extension == "jpg" || extension == "jpeg" || extension == "png") {
    done(null, true);
  } else {
    done({ message: "확장자명이 *.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다." }, false);
  }
};

exports.profileUpload = multer({ storage, fileFilter });
