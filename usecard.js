$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var getcardid = JSON.parse(localStorage["cardarray"]);
        var cardid = getcardid[0];
        console.log(cardid);
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('card');
        query.equalTo('user', current_user);
        query.find({
        	success: function(data){
        	    var ccontainer = "";
        	    for(var i = 0; i<data.length; i++){
        	        var carddata = data[i].get('card');
        	        var carddataid = carddata.id;
        	        try{
        	            if(carddataid == cardid){
        	            var s = getElementStringByowncard(carddata.get('name'), carddata.get('imagesrc'), carddata.get('shortdes'));
        	            ccontainer += s;
        	            var string = "<div class = 'cards'>" + ccontainer + "</div>";
        	            $('div.cardbox').append(string);
        	        }
        	        }
        	        catch(e){

        	        }
        	    }
        	}
        })
    }
})


    


function getElementStringByowncard(name, imagesrc, shortdes){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<img class = 'owncard' src='" + imagesrc + "'/>";
    var s2 = "<div>" + shortdes + "</div>";
    var s = "<div class='card' id = 'card'>" + s0 + s1 + s2 + "</div>";

    return s;
};
