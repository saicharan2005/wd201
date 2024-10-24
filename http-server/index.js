const http = require("http");

const fs = require("fs");
const { log } = require("console");


// fs.readFile("home.html",(err,home)=>{
//   console.log(home.toString());

//   if(err){
//     throw err;

//   }

//   http
//  .createServer((req,res)=>{
//   res.writeHeader(200,{"content-type":"text/html"});
//   res.write(home);
//   res.end();
  
// }).listen(3000);
// })



fs.readFile("home.html",(err,home)=>{
  console.log(home.toString());

  if(err){
    throw err;

  }

  homeContent=home;
})

fs.readFile("project.html",(err,project)=>{
  console.log(project.toString());

  if(err){
    throw err;

  }

  projectContent=project;
})

fs.readFile("registration.html" ,(err,registration)=>{
  console.log(registration.toString());
  
    if(err){
      throw err;
    }

    registrationContent =registration;
})

const args = process.argv;
const port = parseInt(args[2]);


http.createServer((req,res)=>{
  let url =req.url;

  res.writeHeader(200,{'content-type':"text/html"});

  switch(url){
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
}).listen(port)




