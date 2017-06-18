var twit = require('twit');
var config = require('./config.js');

var twitter = new twit(config);

var retweet = function () {
	var param = {
		q: '#tech, #Tech, #gadget',
		result_type:'recent',
		lang: 'en'
	}

	twitter.get('search/tweets', param, function(err,data) {
		if (!err) {
			console.log("LOG: " + data);
			var rtID = data.statuses[0].id_str;

			twitter.post('statuses/retweet/:id', {id: rtID}, function(err, response) {
				if (response) {
					console.log("LOG: retweet!!");
				}

				if (err) {
					console.log("LOG: Error when retweet!!");
				}
			});
		} else {
			console.log("LOG: Error when searching!!");
		}
	});
}


retweet();
setInterval(retweet, 1500000);


var favoriteTweet = function(){  
  var params = {
      q: '#tech, #Tech, #gadget',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference

  // find the tweet
  twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('LOG: CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('LOG: FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();  
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 1500000);

// function to generate a random tweet tweet
function ranDom (arr) {  
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};