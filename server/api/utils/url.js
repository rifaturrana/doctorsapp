module.exports = (req) => {
  return req.protocol + "://" + req.get("host") + "/";
  console.log(req.protocol + "://" + req.get("host") + "/");
};
