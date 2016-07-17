var Website = require('../models/website');

exports.create = function(req, res) {
  var newWebsite = new Website();

  newWebsite.title = req.body.title;
  newWebsite.url = req.body.url;
  newWebsite.description = req.body.description;
  newWebsite.submittedBy.id = req.body.id;

  newWebsite.save(function (err, result) {
    if(err){
      console.log(err);
    } else {
      console.log(result);
      res.status(200).end();
    }
  });
};

exports.searchResults = function(req, res) {
  var searchText = req.body.searchText;
  //Using Mongoose Search Plugin for Website Model
  Website.search(searchText, {
    title: 1
  }, {
    conditions: {
      title: {
        $exists: true
      },
      description: {
        $exists: true
      },
      url: {
        $exists: true
      }
    },
    sort:{
      title:1
    },
    limit:10
  }, function(err, data) {
    if(err){
      console.log("Cant Fetch Results!");
    } else {
      console.log(data);
      res.send(data.results);
    }
  });
}
