Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");

$(document).ready(function(){
    var current_user = Parse.User.current();
    if(current_user){
        remainCard();
    }
    var owncard = Parse.Object.extend("Owncard");
    var query = new Parse.Query(owncard);
    query.equalTo('Card_info', undefined);
    query.equalTo('user', Parse.User.current());
    query.first({
        success:function(data){
            if(data != undefined){
                alert("You can draw one card!");
            }
            else{
                alert("You don't have the chance to draw the card! Back to dashboard!");
                window.location.href="http://radiansmile.github.io/CodeEDU/dashboard.html";
            }
            localStorage['drawrecord'] = data.id;
        }
    })
});

//Drawing card function
var Shortdescription;
var Title;
var Imagesrc;

function randomNum(length){
        num = Math.floor(Math.random() * (length));
        return(num);
}

function getData(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    var No = randomNum();
    query.greaterThan("remain", 0);
    query.find({
        success: function(results){
            var randomno = randomNum(results.length);
            var object = results;

            Shortdescription = object[randomno].get('shortdes');
            Title = object[randomno].get('name');
            Imagesrc = object[randomno].get('imagesrc');

            $('h2#title').html(Title);

            $('#image1').attr("src", Imagesrc)
            $('#image2').attr("src", Imagesrc)
            $('#image3').attr("src", Imagesrc)

            substractCardNum(object[randomno].id);

            var drawrecordid = localStorage.getItem('drawrecord');
            var owncard = Parse.Object.extend("Owncard");
            var query = new Parse.Query(owncard);
            query.equalTo('objectId', drawrecordid);
            query.first({
                success:function(data){
                    data.set('Card_info', object[randomno]);
                    data.save(null, {
                        success:function(){
                            console.log("Save draw card success!");
                            alert("你得到一張卡了!返回Dashboard~");
                            window.location.href="http://radiansmile.github.io/CodeEDU/dashboard.html";
                        },
                        error: function(error){
                            alert('Failed to create new object, with error code: ' + error.description);
                        }        
                    })
                }
            })
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function changeClass1(){
    if(document.getElementById("block1").className == "block"){
        document.getElementById("block1").className += " rotated";
        document.getElementById("block2").className += " gone";
        document.getElementById("block3").className += " gone";
    }
    else
        document.getElementById("block").className = "block";
        getData();
    };
function changeClass2(){
    if(document.getElementById("block2").className == "block"){
        document.getElementById("block2").className += " rotated";
        document.getElementById("block1").className += " gone";
        document.getElementById("block3").className += " gone";
    }
    else
        document.getElementById("block").className = "block";
        getData();  
    };      
function changeClass3(){
    if(document.getElementById("block3").className == "block"){
        document.getElementById("block3").className += " rotated";
        document.getElementById("block2").className += " gone";
        document.getElementById("block1").className += " gone";
    }
    else
        document.getElementById("block").className = "block";
        getData();
    };

function remainCard(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    query.greaterThan("remain",0);
    query.count({
        success: function(count){
            if(count==0)
                setRemainCard();
        },
        error: function(error){
        }
    });
}

function setRemainCard(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    query.ascending("cardno");
    query.find({
        success: function(data){
            var no = [1,6,20,15,10,5,15,10,5,1,30,15,5,10,5,3,10,5,3,3];
            data.forEach(function (element, index, array){
                var num = Parse.Object.extend('Card_info');
                var n = new num();
                
                n.set('objectId',element.id);
                n.save(null,{
                    success: function(n){
                        n.set('remain', no[index]);
                        n.save();
                    }
                });
            });
        },
        error: function(error){
        }
    });
}

function substractCardNum(id){
    var  card = Parse.Object.extend('Card_info');
    var query = new Parse.Query(card);
    query.equalTo('objectId',id);
    query.first({
        success: function(data) {
            var c = new card();
            var no = data.get('remain');
            c.set('objectId',data.id);
            c.set('remain',no);

            c.save(null,{
                success: function(data){
                    c.set('remain',--no);
                    c.save();
                }
            });
        },
        error: function (error) {
            console.log(error.toString());
        }
    });
}