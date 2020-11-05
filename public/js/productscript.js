var comments=[];

function addtocart(p_id){
		console.log(p_id);
	var x={product_id:p_id};
	$.ajax({ url: "/addtocart",
      data:x,
      success: function(result){
        console.log('adding to cart sending to backend');
        console.log(result);
                
        }});

}


function gohome(){
	window.location.href='http://localhost:3000/home';

}

function gotocart()
{

	
 
var x="go to cart";
  

	$.ajax({ url: "/getcart",
      data:x,
      success: function(result){
        console.log('viewing cart');
        console.log(result);
        window.location.href='http://localhost:3000/cart';
        
        
        }});
}


function changeimage(id)
{
console.log("stylemod");
console.log(id);
document.getElementById("zoomimage").style.backgroundImage=document.getElementById(id).style.backgroundImage;
}





function comment() {
  console.log("comment initials");
  console.log(comments);


      var p_id=document.getElementById("addtocart").name;
  var x={product_id:p_id};
  console.log(x);
  
  $.ajax({ url: "/comment",
      data:x,
      success: function(result){
        console.log("comments are");
        console.log(result);
        x=JSON.parse(result);
        console.log(x);
        var y=x.comment_array;
        comments=y;
        console.log("comment final");
  console.log(comments);
  if(y==null){
     document.getElementById("commentssection").innerHTML=document.getElementById("commentssection").innerHTML+"<div id=\"new\"><input id=\"newcomment\"><button id=\"addcomment\" onclick=\"addcomment()\"></button></div>";
     comments=[];

  }
        for(i=0;i<y.length;i++)
        {
          document.getElementById("commentssection").innerHTML=document.getElementById("commentssection").innerHTML+"<div class=\"comment\">"+y[i]+"</div><hr>";
        }
        document.getElementById("commentssection").innerHTML=document.getElementById("commentssection").innerHTML+"<div id=\"new\"><input id=\"newcomment\"><button id=\"addcomment\" onclick=\"addcomment()\"></button></div>";
        
                
        }});

    
};


function addcomment(){
  newcomment=document.getElementById("newcomment").value;
  comments.push(newcomment);
  var p_id=document.getElementById("addtocart").name;

  var x={new_comment_array:comments,
    product_id:p_id
  };


  $.ajax({ url: "/addcomment",
      data:x,
      success: function(result){
        console.log('viewing cart');
        console.log(result);
        document.getElementById("commentssection").innerHTML="";

        for(i=0;i<comments.length;i++)
        {
          document.getElementById("commentssection").innerHTML=document.getElementById("commentssection").innerHTML+"<div class=\"comment\">"+comments[i]+"</div><hr>";
        }
        document.getElementById("commentssection").innerHTML=document.getElementById("commentssection").innerHTML+"<div id=\"new\"><input id=\"newcomment\"><button id=\"addcomment\" onclick=\"addcomment()\"></button></div>";


        
        
        
        }});

}