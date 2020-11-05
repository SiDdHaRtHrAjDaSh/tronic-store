var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var hogan = require('hogan.js');
var fs = require('fs');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://siddhu:Siddhu@12345@cluster0.ylszd.mongodb.net/mydb?retryWrites=true&w=majority";



var current_product;
var cart;
var grandtotal;
var current_user;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.listen(3000);
console.log("this is working");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'siddhu.dash@gmail.com',
    pass: '65477412'
  }
});


var modcart;

app.get('/', function(req, res){
	res.render('authentication');
});

app.get('/faq', function(req, res){
	res.render('faq');
});
app.get('/thankyou', function(req, res){
	
	console.log(grandtotal);
	
	
var template=fs.readFileSync('./views/billing.ejs','utf-8');
var compiledTemplate=ejs.compile(template);
cart.gtotal=grandtotal;
console.log(cart)
	
	var mailOptions = {
  from: 'siddhu.dash@gmail.com',
  to: 'siddharth.dash07@gmail.com',
  subject: 'Bill',
  html:compiledTemplate(cart)
  
};

	transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

    dbo.collection("Cart").deleteMany({});
    db.close();
    
});

	res.render('thankyou');
});

app.get('/home', function(req, res){
	res.render('landing');
});
app.get('/checkout', function(req, res){
	res.render('checkout',grandtotal);


});

app.get('/gtotal', function(req, res){
	console.log("gtotal");
	console.log("gtotal");
	console.log("gtotal");
	grandtotal=req.query;

	res.write("hi");
	res.end();
});


app.get('/authenticate', function(req, res){

var que=req.query.email;
console.log(que);

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { customer_email: que };
  dbo.collection("customers").find(myquery).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

    if(result[0]===undefined){
    	res.write("False");
    	res.end();
    }
    console.log(result[0].password);
    console.log(req.query.password);

    if(result[0].password==req.query.password){
	res.write('True');
	current_user=result[0];
}
else
	res.write('False');
	
res.end();
    
db.close();
    
  });
});
	
});



function checkexists(que){

	console.log("chkexists");
	console.log("chkexists");
	console.log("chkexists");
	console.log("que");
	console.log(que);

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { customer_email: que.email };

  console.log("myquery");
  console.log(myquery);
  dbo.collection("customers").find(myquery).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    

    if(result[0]===undefined){
    	console.log("inside if");
    	return("False");
    }
    else{
    	console.log("inside else");
    	return("True");
    }

    db.close();
    
  });
});

}

app.get('/adduser', function(req, res){

console.log("inside adduser");
console.log("inside adduser");
console.log("inside adduser");
var que=req.query;
console.log(que);


	var chk=checkexists(que);
	console.log("chk======");
	console.log(chk);



if(chk=="True"){
	console.log("inside adduser if");
	res.write("exists");
	res.end();
}

else{
	console.log("inside adduser else");

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
    dbo.collection("customers").insertOne(que, function(err, response) {
    if (err) throw err;
       


    
db.close();
    
  });
    res.write("all done");
res.end();
});

}
	
});



app.get('/comment', function(req, res){


	console.log("comment section");
	console.log("comment section");
	console.log("comment section");
	console.log("comment section");
	console.log("comment section");
	var que=req.query;
	console.log(que);
	var x="nhi chala";


		
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("comments").find(que).toArray(function(err, result) {
    if (err) throw err;

    console.log(result);
    x=JSON.stringify(result[0]);
    
	res.write(x);
	res.end();
    
db.close();
    
  });
});

});

app.get('/addcomment', function(req, res){


	console.log("add comment section");
	console.log("add comment section");
	console.log("add comment section");
	console.log("add comment section");
	console.log("add comment section");
	var que=req.query;
	console.log(que);
	var x="nhi chala";
	


		
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("comments").findOneAndUpdate({product_id:que.product_id},{$set:{comment_array:que.new_comment_array}})
    if (err) throw err;

    console.log("updated");
    
    
	res.write("updated");
	res.end();
    
db.close();
    
  
});

});



app.get('/cart', function(req, res){
	console.log("rendering cart");
	console.log("cart content is");
	console.log("cart content is");
	console.log("cart content is");
	console.log("cart content is");
	console.log(cart.cart_content[0]);
	
	if(cart.cart_content[0]===undefined)
	{
		console.log("inside if");
		cart={cart_content:[{product_name:"none"}]};
		console.log(cart);

	res.render('cart',cart);
}

else
	console.log("inside else");
	{res.render('cart',cart);
}
});


app.get('/delcart', function(req, res){
	console.log(" delitem cart");
	console.log("delitem");
	console.log("delitem");
	console.log("delitem");
	console.log("delitem");

	console.log("i am in view products");
	console.log(req.query);
	que=req.query.product_id;
	console.log("query is");
	console.log(que);	

	for(i=0;i<cart.cart_content.length;i++)
	{
		if(cart.cart_content[i].product_id==que)
			cart.cart_content.splice(i,1);
	}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { product_id: que };
  dbo.collection("Cart").deleteMany(req.query, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    res.write("deleted");
    res.end();
    db.close();
  });
});
	
});





app.get('/getcart', function(req, res){


	console.log("i am in get cart");
	console.log("i am in get cart");
	console.log("i am in get cart");
	console.log("i am in get cart");
	console.log("i am in get cart");
	var x;
		
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("Cart").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    cart={cart_content:result};
    console.log(x);
	res.write('cart');
	res.end();
    
db.close();
    
  });
});

});




app.get('/productspage', function(req, res){
	res.render('productspage',current_product);
});





app.get('/viewproduct', function(req, res){
	
	console.log("i am in view products");
	console.log(req.query);
	que=req.query.product_id;
	console.log("query is");
	console.log(que);	
		
		MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { product_id:que };
  dbo.collection("Products").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0]);
    current_product=result[0];

    console.log("current product is : ");
    console.log(current_product);
res.write("current_product");
	res.end();
    db.close();
  });
});


	
});

app.get('/getproduct', function(req, res){
	console.log("i am in get products");
	var result1;
	console.log(req.query);
	var que=req.query.product_name;
	console.log(que);
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { product_type:que };
  dbo.collection("Products").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    var products = JSON.stringify(result);

	res.write(products);
	console.log(products);
	res.end();
    
    db.close();
  });
});
	

	});


app.get('/addtocart', function(req, res){
	

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("Cart").insertOne(current_product, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

console.log("data fetched");
  

});

	
	console.log("data added");
	res.write("added successfully");
	res.end();

	});


