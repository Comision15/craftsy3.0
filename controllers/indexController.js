module.exports = {
  index: (req, res) => {
    return res.render("index");
  },
  terms : (req,res) => {
    return res.render('terms')
  }
};
