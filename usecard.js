Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
var current_user = Parse.User.current();
$('#card0').click(function(){
    if(current_user){
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('card');
        query.equalTo('user', current_user);
        query.find({
        	success: function(data){
        	    var ccontainer = "";
        	    var getcardid = localStorage.getItem('cardarray');
        	    var cardid = getcardid[0];
        	    var carddata = data[i].get('card');
        	    if(carddata == cardid){
        	        var s = getElementStringByowncard(carddata.get('name'), carddata.get('imagesrc'), carddata.get('shortdes'));
        	        ccontainer += s;
        	        var string = "<div class = 'cards'>" + ccontainer + "</div>";
        	        $('div.cardbox').append(string);
        	    }
        	    else{
        	        alert("Your data is broken!!!");
        	    }
        	}
        })
    }
});
    


function getElementStringByowncard(name, imagesrc, shortdes){
    var s0 = "<h2>" + name + "</h2>";
    var s1 = "<img class = 'owncard' src='" + imagesrc + "'/>";
    var s2 = "<div>" + shortdes + "</div>";
    var s = "<div class='card' id = 'card"+ i + "'>" + s0 + s1 + s2 + "</div>";

    return s;
};
