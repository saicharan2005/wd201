const http = require("http");
const fs = require("fs");


const minimist = require("minimist");
const args = minimist(process.argv.slice(2));

const port = parseInt(args.port);

let homeContent = "";
let projectContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    console.log(err);
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    console.log(err);
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    console.log(err);
  }
  registrationContent = registration;
});

http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        res.write(projectContent);
        res.end();
        break;
      case "/registration":
        res.write(registrationContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
        break;
    }
  })
  .listen(port);
