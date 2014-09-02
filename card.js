//About Personal page owncard display
$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('Card_info');
        query.equalTo('user', current_user);
        query.find({
            success: function(data){
            	    var ccontainer = "";
                 var storagecard = [];
            	    for(var i = 0; i<data.length; i++){
            	        var card = data[i].get('Card_info');
                    //catch cardid
                    /*if(typeof(Storage) !== "undefined"){
                        storagecard.push(card.id);
                        localStorage["cardarray"] = JSON.stringify(storagecard);
                    }
                    else{
                        alert("Can't store to localstorage!");
                    }*/
            	        var s = getElementStringByowncard(card.get('name'), card.get('imagesrc'), data[i].id);
            	        ccontainer += s;
            	        if((i+1) % 5 == 0){
            	        	var string = "div class='cards' " + ccontainer + "</div>";
            	        	$('div.cardbox').append(string);
            	        	ccontainer = "";
            	        }
            	        else if(i == data.length - 1){
            	        	var string = "<div class = 'cards'>" + ccontainer + "</div>";
            	        	$('div.cardbox').append(string);
            	        	ccontainer = "";
            	        }
            	    }
            }
        })
    }
    else{
    	alert("Please Login!");
    	window.location.assign("http://radiansmile.github.io/CodeEDU/fblogin.html");
    }
});

/*function getElementStringByowncard(name, imagesrc, i){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<a href= usecard.html><img class = 'owncard' src='" + imagesrc + "'</a>";
    var s = "<div class='card' id = 'card"+ i + "'>" + s0 + s1 + "</div>";

    return s;
};*/

function getElementStringByowncard(name, imagesrc, id){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<input type='image' id='"+id+"' src='" + imagesrc + "' action='carddes.html'>";
    var s = "<div class='card'>" + s0 + s1 + "</div>";

    return s;
};

//useNotification
function use_notification(user, target){

};

//cardUsed
function cardUsed(){
    user = Parse.User.current();
    var ownCard = Parse.Object.extend("Owncard");
    query.include('card');
    query.equalTo('user', user);
    query.find({
        success: function(carddata){
            for(var i = 0; i<carddata.length; i++){
                //if(carddata[i].get('card') == )
            }
        }
    })
}

//Card function
function hpSteal(user, target){
    user = Parse.User.current();
    var userStatus = Parse.Object.extend("User_status");
    var query = new Parse.Query(userStatus);
    query.equalTo('user', user);
    query.find({
        success: function(data){
            var userblood = data.get('HP');

            var targetStatus = Parse.Object.extend("User_status");
            //define target
            var query1 = new Parse.Query(targetStatus);
            query1.equalTo('user', target);
            query1.find({
                success: function(data1){
                    var targetblood = data1.get('HP');
                    userblood += 10;
                    targetblood -= 10;

                    var newUserStatus = Parse.Object.extend("User_status");
                    var nUserStatus = new newUserStatus();
                    nUserStatus.set('user', user);
                    nUserStatus.set('HP', userblood);
                    nUserStatus.save(null, {
                        success:function(data2){
                            //define target
                            nUserStatus.set('user', target);
                            nUserStatus.set('HP', targetblood);
                            n.User_status.save(null, {
                                success:function(){
                                    console.log("HPsteal Status change OK!");
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};

function hpMinus(target){
    //define target
    var userStatus = Parse.Object.extend("User_status");
    var query = new Parse.Query(userStatus);
    query.equalTo('user', target);
    query.find({
        success: function(data){
            var targetblood = data.get('HP');
            targetblood -= 10;
            data.set('HP', targetblood);
            data.save(null,{
                success:function(){
                    console.log("HPminus status change ok!");
                }
            })
        }
    })
};

function hpGive(target){
    //define target
    var userStatus = Parse.Object.extend("User_status");
    var query = new Parse.Query(userStatus);
    query.equalTo('user', target);
    query.find({
        success: function(data){
            var targetblood = data.get('HP');
            targetblood += 10;
            data.set('HP', targetblood);
            data.save(null,{
                success:function(){
                    console.log("HPgive status change ok!");
                }
            })
        }
    })
};

function cardSteal(user, target){
    user = Parse.User.current();
    var ownCard = Parse.Object.extend("Owncard");
    var query = new Parse.Query(ownCard);
    query.equalTo('user', user);
    query.find({
        success: function(data){
            var ownCard1 = Parse.Object.extend("Owncard");
            var query1 = new Parse.Query(ownCard1);
            //define target
            query1.equalTo('user', target);
            query1.find({
                success: function(data1){
                    var targetcard = data1[0].get('card');
                    var newUser = Parse.Object.extend("Owncard");
                    var nUser = new newUser();
                    nUser.set('user', user);
                    nUser.set('card', targetcard);
                    nUser.save(null, {
                        success:function(){
                            console.log("Cardsteal status change ok!");
                            targetcard.destroy({
                                success:function(){
                                    console.log("Target card delete ok!");
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};

function onemoreCard(){
    window.location.assign("card_drawing.html");
};

$('div.class input').each(function(){
    $click(function(){
        var id = $(this).attr('id');
        localStorage['owncardId'] = id;
    });
});