const fs = require("fs");

const fileDelete = (destination, file) => {
  fs.unlink(destination + file, function (err) {
    if (err) {
      console.log(err);
    }
    return;
  });
};

module.exports = { fileDelete };
