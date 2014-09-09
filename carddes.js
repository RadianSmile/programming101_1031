$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var owncardid = localStorage.getItem('owncardId');
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.equalTo('objectId', owncardid);
        query.include('Card_info');
        query.first({
        	success: function(data){
        	    var ccontainer = "";
                var carddata = data.get('Card_info');
                var s = getElementStringByowncard(carddata.get('name'), carddata.get('imagesrc'), carddata.get('shortdes'));
                ccontainer += s;
                var string = "<div class = 'cards'>" + ccontainer + "</div>";
                $('div.cardbox').append(string);
        	}
        });
    }
})

function getElementStringByowncard(name, imagesrc, shortdes){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<img class = 'owncard' src='" + imagesrc + "'/>";
    var s2 = "<div id='shortdes'>" + shortdes + "</div>";
    var s = "<div class='card' id = 'card'>" + s0 + s1 + s2 + "</div>";

    return s;
};