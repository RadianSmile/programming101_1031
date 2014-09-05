Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");

$(document).ready(function(){
    var current_user = Parse.User.current();
    if(current_user){
        remainCard();
    }
});

//Drawing card function
var Shortdescription;
var Title;
var Imagesrc;

function randomNum(){
        num = Math.floor(Math.random() * 20 + 1);
        return(num);
}

/*function randomNum(){
    var n = Math.floor(Math.random() * 2);
    var vac;

    switch(n){
        case 0:
            vac = 'a';
            break;
        case 1:
            vac = 'b';
            break;
        case 2:
            vac = 'c';
            break;
    }

    if(vac == 'a'){
        num = Math.floor(Math.random() * 2 + 1);
        var no = vac + num;
        return(no);
    }
    else if(vac == 'b'){
        num = Math.floor(Math.random() * 8 + 1);
        var no = vac + num;
        return(no);
    }
    else{
        num = Math.floor(Math.random() * 9 + 1);
        var no = vac + num;
        return(no);
    }
}*/

/*function getData(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    query.greaterThan("remain", 0);
    query.first({
        success: function(results){
            var object = results;
            var remain = object.get('remain');
            Shortdescription = object.get('shortdes');
            Title = object.get('name');
            Imagesrc = object.get('imagesrc');

            $('h2#title').html(Title);

            $('#image1').attr("src", Imagesrc)
            $('#image2').attr("src", Imagesrc)
            $('#image3').attr("src", Imagesrc)

            substractCardNum(object.id);
            var owncard = Parse.Object.extend("Owncard");
            var own = new owncard();

            own.set('user', Parse.User.current());
            own.set('Card_info', object);
            own.save(null, {
                success: function(){

                },
                error: function(error){
                    alert('Failed to create new object, with error code: ' + error.description);
                }
            })
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
}*/

function getData(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    var No = randomNum();
    query.equalTo("cardno", No);
    query.greaterThan("remain", 0);
    query.first({
        success: function(results){
            var object = results;
            Shortdescription = object.get('shortdes');
            Title = object.get('name');
            Imagesrc = object.get('imagesrc');

            $('h2#title').html(Title);

            $('#image1').attr("src", Imagesrc)
            $('#image2').attr("src", Imagesrc)
            $('#image3').attr("src", Imagesrc)

            substractCardNum(results.id);
            var owncard = Parse.Object.extend("Owncard");
            var own = new owncard();

            own.set('user', Parse.User.current());
            own.set('Card_info', object);
            own.save(null, {
                success: function(){

                },
                error: function(error){
                    alert('Failed to create new object, with error code: ' + error.description);
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
            var no = [1,9,20,15,10,5,15,10,5,1,30,3,15,5,10,5,3,10,5,3];
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