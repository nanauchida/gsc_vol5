var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
} else {
  res.send('Error, wrong validation token');
}
});

router.post('/webhook/', function (req, res) {
  const events = req.body.entry[0].messaging;
  for (i = 0; i < events.length; i++) {
    const event = req.body.entry[0].messaging[i];
    if (event.message && event.message.text) {
      const text = event.message.text;
      console.log(text)
    }
  }
  res.sendStatus(200);
});

var request = require('request')

const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN

function sendTextMessage(sender, text) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
      sendTextMessage(sender, "Text received, echo: " + text);
    }
  });
}


module.exports = router;
