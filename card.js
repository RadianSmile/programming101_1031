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
            	    for(var i = 0; i<data.length; i++){
            	        var card = data[i].get('Card_info');
                        if(card == undefined){
                            alert("你有一次抽卡機會!");
                            window.location.href="http://radiansmile.github.io/CodeEDU/card_drawing.html";
                        }
            	        var s = getElementStringByowncard(card.get('name'), card.get('imagesrc'), data[i].id);
            	        ccontainer += s;
            	        if((i+1) % 5 == 0){
            	        	var string = "<div class='cards'> " + ccontainer + "</div>";
            	        	$('div.cardbox').append(string);
            	        	ccontainer = "";
                            $('img').on('click', function(){
                                var id = $(this).attr('id');
                                localStorage['owncardId'] = id;
                                window.location.assign("http://radiansmile.github.io/CodeEDU/carddes.html");
                            })
            	        }
            	        else if(i == data.length - 1){
            	        	var string = "<div class = 'cards'>" + ccontainer + "</div>";
            	        	$('div.cardbox').append(string);
            	        	ccontainer = "";
                          $('img').on('click', function(){
                                var id = $(this).attr('id');
                                localStorage['owncardId'] = id;
                                window.location.assign("http://radiansmile.github.io/CodeEDU/carddes.html");
                            })
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

function getElementStringByowncard(name, imagesrc, id){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<img id='"+id+"' src='" + imagesrc + "'>";
    var s = "<div class='card'>" + s0 + s1 + "</div>";

    return s;
};