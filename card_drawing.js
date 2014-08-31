Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");

//Drawing card function
var Shortdescription;
var Title;
var Imagesrc;

function randomNum(){
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
        num = 1;
        var no = vac + num;
        return(no);
    }
    else if(vac == 'b'){
        num = Math.floor(Math.random() * 4 + 1);
        var no = vac + num;
        return(no);
    }
    else{
        num = Math.floor(Math.random() * 9 + 1);
        var no = vac + num;
        return(no);
    }
}

var current_user = Parse.User.current();
if(current_user){
    function getData(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    var No = randomNum();
    query.equalTo("cardno", No);
    query.first({
        success: function(results){
            var object = results;
            if(typeof(Storage) !== "undefined"){
                  localStorage.setItem("cardid", object.id);
            }
            else{
                  alert("Can't store to localstorage!");
            }
            Shortdescription = object.get('shortdes');
            Title = object.get('name');
            Imagesrc = object.get('imagesrc');

            $('h2#title').html(Title);

            $('#image1').attr("src", Imagesrc)
            $('#image2').attr("src", Imagesrc)
            $('#image3').attr("src", Imagesrc)

            var owncard = Parse.Object.extend("Owncard");
            var own = new owncard();

            own.set("user", current_user);
            own.set("card", object.id);
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
}

//getNotification
function getNotification(){

};

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