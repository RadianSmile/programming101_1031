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
    				var id = data[i].id;
    				var s = getElementStringByowncard(username, id);
    				ccontainer += s;
    				var string = "<form>" + ccontainer + "</form>";
    				//var string = "<form action='http://radiansmile.github.io/CodeEDU/dashboard.html'>" + ccontainer + "</form>";
    				$('div.userbox').append(string);
    				ccontainer = "";
    				$('input').on('click', function(){
    					var id = $(this).attr('id');
    					localStorage['userid'] = id;
                                                                 var owncardid = localStorage.getItem('owncardId');
                                                                 var owncard = Parse.Object.extend('Owncard');
                                                                 var query = new Parse.Query(owncard);
                                                                 query.equalTo('objectId', owncardid);
                                                                 query.first({
                                                                    success:function(data){
                                                                        console.log('query success!');
                                                                        var cardid = data.get('Card_info');
                                                                        var targetuser = localStorage.getItem('userid');
                                                                        if(cardid == "OSRGBnKpaP"){
                                                                            addXP10(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "4c3uX1rZ1K"){
                                                                            addXP30(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "Zm3TV6UaEP"){
                                                                            addXP50(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "wxTLT53ZZX"){
                                                                            addXP70(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "zLHR3S0hlb"){
                                                                            addHP10(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "7mn5hYmEWH"){
                                                                            addHP30(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "cbACuxTVY1"){
                                                                            addHP50(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "UDfyCM4Pyb"){
                                                                            fullHP(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "aJONHaxQtM"){
                                                                            addLife(current_user);
                                                                        }
                                                                        else if(cardid == "10ypku2oZk"){
                                                                            donateHP10(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "ysYpQz4TW0"){
                                                                            donateHP30(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "ic6YE4frVp"){
                                                                            donateHP50(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "y0pZ66Wl4X"){
                                                                            minusHP10(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "ZLZIS7XbfQ"){
                                                                            minusHP30(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "4kJkiyYROw"){
                                                                            minusHP50(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "Byw6APXDGu"){
                                                                            stealHP10(current_user, targetuser);
                                                                        }
                                                                        else if(cardid == "jqxvogKdXQ"){
                                                                            stealHP30(current_user, targetuser);
                                                                        }
                                                                        else if(carid == "8x7C6LFRhH"){
                                                                            stealHP50(current_user, targetuser);
                                                                        }
                                                                        else if(carid == "1PF6Z8XISA"){
                                                                            stealcard(current_user, targetuser);
                                                                        }
                                                                        else{

                                                                        }
                                                                    },
                                                                    error: function(error){
                                                                        console.log(error.toString());
                                                                    }
                                                                 })
    					window.location.assign("http://radiansmile.github.io/CodeEDU/dashboard.html");
    				})
    			}
    		}
    	})
    }
});

function getElementStringByowncard(name, id){
    var s = "<input type='submit' value='"+name+"' id='"+id+"'>";

    return s;
};

//Delete used card
function deletecard(owncardid){
    var owncard = localStorage.getItem('owncardId');
    var ownCard = Parse.Object.extend('Owncard');
    var query = new Parse.Query(ownCard);
    query.equalTo('objectId', owncard);
    query.first({
        success:function(data){
            data.destroy({
                success: function(data){
                    console.log("Delete used card success!!");
                }
            })
        }
    })
};

//Card function
function addLife(user){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', user);
    query.first({
        success: function(data){
            var c_user = new currentuser();
            var life = data.get('Life');
            c_user.set('Life', life);
            c_user.save(null, {
                success: function(data){
                    c_user.set('Life', ++life);
                    c_user.save();
                }

            });
        },
        error: function(error){
            console.log(error.toString());
        }
    });
};

function addXP10(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success: function(data){
            var c_user = new currentuser();
            var xp = data.get('XP');
            c_user.set('XP', xp);
            c_user.save(null, {
                success:function(data){
                    c_user.set('XP', xp+=10);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addXP30(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success: function(data){
            var c_user = new currentuser();
            var xp = data.get('XP');
            c_user.set('XP', xp);
            c_user.save(null, {
                success:function(data){
                    c_user.set('XP', xp+=30);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addXP50(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success: function(data){
            var c_user = new currentuser();
            var xp = data.get('XP');
            c_user.set('XP', xp);
            c_user.save(null, {
                success:function(data){
                    c_user.set('XP', xp+=50);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addXP70(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success: function(data){
            var c_user = new currentuser();
            var xp = data.get('XP');
            c_user.set('XP', xp);
            c_user.save(null, {
                success:function(data){
                    c_user.set('XP', xp+=70);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addHP10(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp+=10);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addHP30(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp+=30);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function addHP50(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp+=50);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function minusHP10(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp-=10);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function minusHP30(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp-=30);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function minusHP50(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp-=50);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function fullHP(user, targetuser){
    var currentuser = Parse.Object.extend('User');
    var query = new Parse.Query(currentuser);
    query.equalTo('objectId', targetuser);
    query.first({
        success:function(data){
            var c_user = new currentuser();
            var hp = data.get('HP');
            c_user.set('HP', hp);
            c_user.save(null,{
                success:function(data){
                    c_user.set('HP', hp=100);
                    c_user.save();
                }
            });
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function donateHP10(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[0].get('HP')>=10){
                var userhp = data[0].get('HP');
                data[0].set('HP', userhp-=10);
                data[0].save();
                if(data[1].get('HP')>90){
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp =100);
                    data[1].save();
                }
                else{
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp +=10);
                    data[1].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function donateHP30(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[0].get('HP')>=30){
                var userhp = data[0].get('HP');
                data[0].set('HP', userhp-=30);
                data[0].save();
                if(data[1].get('HP')>70){
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp =100);
                    data[1].save();
                }
                else{
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp +=30);
                    data[1].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function donateHP50(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[0].get('HP')>=50){
                var userhp = data[0].get('HP');
                data[0].set('HP', userhp-=50);
                data[0].save();
                if(data[1].get('HP')>50){
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp =100);
                    data[1].save();
                }
                else{
                    var targethp = data[1].get('HP');
                    data[1].set('HP', targethp +=50);
                    data[1].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function stealHP10(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[1].get('HP')>=10){
                var targethp = data[1].get('HP');
                data[1].set('HP', targethp-=10);
                data[1].save();
                if(data[0].get('HP')>90){
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp =100);
                    data[0].save();
                }
                else{
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp +=10);
                    data[0].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function stealHP30(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[1].get('HP')>=30){
                var targethp = data[1].get('HP');
                data[1].set('HP', targethp-=30);
                data[1].save();
                if(data[0].get('HP')>70){
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp =100);
                    data[0].save();
                }
                else{
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp +=30);
                    data[0].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function stealHP50(user, targetuser){
    var userquery = Parse.Object.extend('User');
    var query1 = new Parse.Query(userquery);
    query1.equalTo('objectId', user);
    var query2 = new Parse.Query(userquery);
    query2.equalTo('objectId', targetuser);
    var query = Parse.Query.or(query1, query2);
    query.find({
        success:function(data){
            if(data[1].get('HP')>=50){
                var targethp = data[1].get('HP');
                data[1].set('HP', targethp-=50);
                data[1].save();
                if(data[0].get('HP')>50){
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp =100);
                    data[0].save();
                }
                else{
                    var userhp = data[0].get('HP');
                    data[0].set('HP', userhp +=50);
                    data[0].save();
                }
            }
            else{
                alert("You don't have enough HP to donate!!");
            }
        },
        error:function(error){
            console.log(error.toString());
        }
    });
};

function stealcard(user, targetuser){
    var userquery = Parse.Object.extend('Owncard');
    var query = new Parse.Query(userquery);
    query.equalTo('user', targetuser);
    query.find({
        success: function(data){
            var card = data[1].get('Card_info');
            var user = new userquery();
            user.set('user', Parse.User.current());
            user.set('Card_info', card);
            user.save(null, {
                success: function(data){
                    data[1].destroy({
                        success: function(data){
                            console.log(data[1] + " is destroyed!");
                        }
                    })
                }
            });
        }
    });
};
