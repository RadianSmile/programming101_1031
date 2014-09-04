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
    				$('.in').on('click', function(){
    					var id = $(this).attr('id');
    					localStorage['userid'] = id;
                        var owncardid = localStorage.getItem('owncardId');
                        var owncard = Parse.Object.extend('Owncard');
                        var query = new Parse.Query(owncard);
                        query.include('Card_info');
                        query.equalTo('objectId', owncardid);
                        query.first({
                            success:function(data){
                                var card = data.get('Card_info');
                                var cardid = card.id;
                                var targetuser = localStorage.getItem('userid');
                                if(cardid == "OSRGBnKpaP"){
                                    addXP(cardid, targetuser);
                                }
                                else if(cardid == "4c3uX1rZ1K"){
                                    addXP(cardid, targetuser);
                                }
                                else if(cardid == "Zm3TV6UaEP"){
                                    addXP(cardid, targetuser);
                                }
                                else if(cardid == "wxTLT53ZZX"){
                                    addXP(cardid, targetuser);
                                }
                                else if(cardid == "zLHR3S0hlb"){
                                    addHP(cardid, targetuser);
                                }
                                else if(cardid == "7mn5hYmEWH"){
                                    addHP(cardid, targetuser);
                                }
                                else if(cardid == "cbACuxTVY1"){
                                    addHP(cardid, targetuser);
                                }
                                else if(cardid == "UDfyCM4Pyb"){
                                    addHP(cardid, targetuser);
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
                                    minusHP(cardid, targetuser);
                                }
                                else if(cardid == "ZLZIS7XbfQ"){
                                    minusHP(cardid, targetuser);
                                }
                                else if(cardid == "4kJkiyYROw"){
                                    minusHP(cardid, targetuser);
                                }
                                else if(cardid == "Byw6APXDGu"){
                                    stealHP(cardid, current_user, targetuser);
                                }
                                else if(cardid == "jqxvogKdXQ"){
                                    stealHP(cardid, current_user, targetuser);
                                }
                                else if(cardid == "8x7C6LFRhH"){
                                    stealHP(cardid, current_user, targetuser);
                                }
                                else if(cardid == "1PF6Z8XISA"){
                                    stealcard(current_user, targetuser);
                                }
                                else{

                                }
                            },
                            error: function(error){
                                console.log(error.toString());
                            }
                        })
    					//window.location.href("http://radiansmile.github.io/CodeEDU/dashboard.html");
    				})
    			}
    		}
    	})
    }
});

function getElementStringByowncard(name, id){
    //var s = "<input type='submit' value='"+name+"' id='"+id+"'>";
    var s = "<div  value='"+name+"' class='in' id='"+id+"'>"+name+"</div>";

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

function addHP(cardid, target){
    var hpPlus = 0;
    if(cardid="UDfyCM4Pyb") //+full
        hpPlus = 100;
    else if(cardid="cbACuxTVY1") //+50
        hpPlus = 50;
    else if(cardid="7mn5hYmEWH") //+30
        hpPlus = 30;
    else if(cardid="zLHR3S0hlb") //+10
        hpPlus = 10;
    var user = Parse.Object.extend('User');
    var query = new Parse.Query(user);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query = new Parse.Query(udata);
            query.equalTo('User',data); 
            query.first({
                success: function(result){
                    var hp = result.get('HP');
                    var udata2 = new udata();
                    udata2.set('objectId',result.id);
                    udata2.save(null,{
                        success: function(udata2){
                            if(hpPlus == 100){
                                hp = 100;
                                udata2.set('HP', hp);
                                udata2.save();
                            }
                            else{
                                hp += hpPlus;
                                udata2.set('HP', hp);
                                udata2.save();
                            }
                            
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        error: function(error){
            console.log(error);
        }
    });
}

function minusHP(cardid, target){
    var hpMinus = 0;
    if(cardid="4kJkiyYROw") //-50
        hpMinus = 50;
    else if(cardid="ZLZIS7XbfQ") //-30
        hpMinus = 30;
    else if(cardid="y0pZ66Wl4X") //-10
        hpMinus = 10;
    var user = Parse.Object.extend('User');
    var query = new Parse.Query(user);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query = new Parse.Query(udata);
            query.equalTo('User',data); 
            query.first({
                success: function(result){
                    var hp = result.get('HP');
                    var udata2 = new udata();
                    udata2.set('objectId',result.id);
                    udata2.save(null,{
                        success: function(udata2){
                            hp -= hpPlus
                            udata2.set('HP', hp);
                            udata2.save();
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        error: function(error){
            console.log(error);
        }
    });
}

function addXP(cardid, target){
    var xpPlus = 0;
    if(cardid="wxTLT53ZZX") //+70
        xpPlus = 70;
    else if(cardid="Zm3TV6UaEP") //+50
        xpPlus = 50;
    else if(cardid="4c3uX1rZ1K") //+30
        xpPlus = 30;
    else if(cardid="OSRGBnKpaP") //+10
        xpPlus = 10;
    var user = Parse.Object.extend('User');
    var query = new Parse.Query(user);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query = new Parse.Query(udata);
            query.equalTo('User',data); 
            query.first({
                success: function(result){
                    var xp = result.get('XP');
                    var udata2 = new udata();
                    udata2.set('objectId',result.id);
                    udata2.save(null,{
                        success: function(udata2){
                                xp += xpPlus;
                                udata2.set('XP', xp);
                                udata2.save();
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        error: function(error){
            console.log(error);
        }
    });
}

function stealHP(cardid, user, target){
    var getHpId = '';
    var lossHpId = '';
    if(cardid = '8x7C6LFRhH'){ //steal 50
        getHpId = 'cbACuxTVY1'; //+50 card id
        lossHpId = '4kJkiyYROw'; //-50 card id
    }
    else if(cardid = 'jqxvogKdXQ'){ // steal 30
        getHpId = '7mn5hYmEWH'; //+30 card id
        lossHpId = 'ZLZIS7XbfQ'; //-30 card id
    }
    else if(cardid = 'Byw6APXDGu'){ // steal 10
        getHpId = 'zLHR3S0hlb'; //+10 card id
        lossHpId = 'y0pZ66Wl4X'; //-10 card id
    }
    minusHP(lossHpId, target);
    addHP(getHpId, user);
}