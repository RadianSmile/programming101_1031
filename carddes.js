$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var owncardid = localStorage.getItem('owncardid');
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('Card_info');
        query.equalTo('user', current_user);
        query.equalTo('objectId', owncardid);
        query.first({
        	success: function(data){
        	    var ccontainer = "";
                var carddata = data.get('Card_info');
                var s = getElementStringByowncard(carddata.get('name'), carddata.get('imagesrc'), carddata.get('shortdes'));
                ccontainer += s;
                var string = "<div class = 'cards'>" + ccontainer + "</div>";
                $('div.cardbox').append(string);
        	    /*for(var i = 0; i<data.length; i++){
                    var owncardid1 = data[i].id;
        	        var carddata = data[i].get('Card_info');
        	        var carddataid = carddata.id;
        	        try{
        	            if(owncardid == owncardid1){
                            var carddata = data[i].get('Card_info');
        	                var s = getElementStringByowncard(carddata.get('name'), carddata.get('imagesrc'), carddata.get('shortdes'));
        	                ccontainer += s;
        	                var string = "<div class = 'cards'>" + ccontainer + "</div>";
        	                $('div.cardbox').append(string);
        	            }
        	        }
        	        catch(e){

        	        }
        	    }*/
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
