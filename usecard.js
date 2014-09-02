$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
    	var user = Parse.Object.extend('User');
    	var query = new Parse.Query(user);
    	query.find({
    		success: function(data){
    			var ccontainer = "";
    			for(var i = 0; i < data.length; i++){
    				var username = data[i].get('name');
    				var id = data[i].get('id');
    				var s = getElementStringByowncard(username, id);
    				ccontainer += s;
    				$('div.userbox').append(string);
    				ccontainer = "";
    				$('div.user').on('click', function(){
    					var id = $(this).attr('id');
    					localStorage['userid'] = id;
    					alert("You choose " + username + " !");
    				})
    			}
    		}
    	})
    }
});

function getElementStringByowncard(name, id){
    var s0 = "<h2>" + name + "</h2>";
    var s = "<div class='user' id='"+id+"'>" + s0 + "</div>";

    return s;
};