require("dotenv").config();
const fs = require("fs");
var Twit = require("twit");

var bot = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  app_only_auth: true,
  timeout_ms: 60 * 1000,
});

function getColors() {
  let colors = new Array();
  bot.get(
    "favorites/list",
    { screen_name: "ds_chapman", count: 200 },
    function (err, data, response) {
      if (err) {
        console.log(err);
      } else {
        data.forEach(function (tweet) {
          if (tweet.user.screen_name === "everycolorbot") {
            const color = {};
            color.text = `#${tweet.text.slice(2, 8)}`;
            color.url = `https://twitter.com/i/web/status/${tweet.id_str}`;
            colors.push(color);
          }
        });
        fs.writeFile("colors.json", JSON.stringify(colors), (err) => {
          if (err) throw err;
          console.log("Colors written to color.json");
        });
      }
    }
  );
}

getColors();
