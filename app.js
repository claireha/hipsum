const express = require("express"); // include all contents in the express directory
const app = express(); // to call the express methods
const fetch = require("node-fetch");

app.set("view engine","ejs");
app.use(express.static('public'));


app.get("/", function(req,res){
	var data = "";
	var paras = 5;
	res.render("home", {data:data , paras:paras});
})

app.get("/results", function(req,res){

	var paras = Number(req.query.paras);
	var type = req.query.type;

	var url = "https://hipsum.co/api/?paras="+ paras + "&type=" + type;

	fetch(url)
	  .then(response => {
	    return response.json()
	  })
	  .then(data => {
	    res.render("results", {data:data, paras:paras, type:type})
	  })
	  .catch(err => {
	    console.log('Error:' + err)
	  })

})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log('Hipsum has started!')
})


