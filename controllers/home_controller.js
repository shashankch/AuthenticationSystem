// home controller action to render home page
module.exports.home = function (req, res) {
  return res.render('home', {
    title: 'Auth|Home',
  });
};
