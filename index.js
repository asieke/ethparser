const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

let getStuff = async () => {
  await fs.writeFile("eth.csv", "", () => {});

  for (let i = 1; i <= 100; i++) {
    let response = await axios.get(
      "https://etherscan.io/accounts/" + i + "?ps=100"
    );
    let $ = await cheerio.load(response.data);
    let data = [];
    $("td").each(function (index) {
      data.push($(this).text());
    });

    let out = [];
    for (let i = 0; i < data.length; i += 6) {
      let temp = data.slice(i, i + 6);
      temp[3] = temp[3].slice(0, -6);
      out.push(temp);
    }

    console.log("Writing Addresses ", i * 100 - 99, " - ", i * 100);
    let text = out.map((x) => '"' + x.join('","') + '"').join("\n") + "\n";

    await fs.appendFile("eth.csv", text, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //done!
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

getStuff();
