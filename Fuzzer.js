const fs = require("fs");
const axios = require("axios").default;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var logger = fs.createWriteStream("log.txt", {
  flags: "a", //[...]
});

const FetchStatsu = (url, paths) => {
  let i = 0;

  axios
    .get(url + `/${paths}`)
    .then(function (response) {
      if (response.status !== 404) {
        logger.write(`${url}/${paths} status--> ${response.status}\n`);
        console.log(`Found one with status ${response.status} count:${++i}`);
      }
    })
    .catch(function (error) {
    })
    .then(function () {});
};

const wordlist = (url) => {
  fs.readFile("World.list.txt", "utf8", function (err, data) {
    data = data.trim().split("\n");
    for (let i of data) {
      FetchStatsu(url, i);
    }
    console.log("ended");
  });
};

readline.question("Target Url" + "\n", (url) => {
  if (!url || !url.includes("https" || "http") || url[url.length - 1] == "/")
    return console.log(
      "No url specified or url doenst contain http or https or last index got a /"
    );

  wordlist(url);
  readline.close();
});


