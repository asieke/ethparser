const cheerio = require('cheerio');
const axios = require('axios');


axios.get("https://etherscan.io/accounts/1?ps=100")
  .then(function (response) {
    // handle success
    let $ = cheerio.load(response.data);
    let html = $('.table').html();

    console.log(html);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });