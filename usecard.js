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

                                var user = Parse.Object.extend('User');
                                var query = new Parse.Query(user);
                                query.equalTo('objectId', targetuser);
                                query.first({
                                    success:function(data1){
                                        var Cardrecord = Parse.Object.extend("Card_record");
                                        var cardrecord = new Cardrecord();
                                        cardrecord.set('user', Parse.User.current());
                                        cardrecord.set('Card_info', card);
                                        cardrecord.set('target_user', data1);
                                        cardrecord.set('type', "use");
                                        cardrecord.save(null,{
                                            success:function(data){
                                                console.log("Card used record success!");
                                            },
                                            error:function(error){
                                                console.log(error.toString());
                                            }
                                        })
                                    }
                                })

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
                                    addLife(cardid, targetuser);
                                }
                                else if(cardid == "10ypku2oZk"){
                                    donateHP(cardid, targetuser);
                                }
                                else if(cardid == "ysYpQz4TW0"){
                                    donateHP(cardid, targetuser);
                                }
                                else if(cardid == "ic6YE4frVp"){
                                    donateHP(cardid, targetuser);
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
                                    stealHP(cardid, targetuser);
                                }
                                else if(cardid == "jqxvogKdXQ"){
                                    stealHP(cardid, targetuser);
                                }
                                else if(cardid == "8x7C6LFRhH"){
                                    stealHP(cardid, targetuser);
                                }
                                else if(cardid == "1PF6Z8XISA"){
                                    stealCard(targetuser);
                                }
                                else{
                                    //再抽一張
                                }
                            },
                            error: function(error){
                                console.log(error.toString());
                            }
                        })
    				})
    			}
    		}
    	})
    }
});

function getElementStringByowncard(name, id){
    var s = "<div  value='"+name+"' class='in' id='"+id+"'>"+name+"</div>";

    return s;
};

/*function cardusedrecord(){
    var currentuser = Parse.User.current();
    var owncardid = localStorage.getItem('owncardId');
    var owncard = Parse.Object.extend('Owncard');
    var query = new Parse.Query(owncard);
    query.include('Card_info');
    query.equalTo('objectId', owncardid)
    query.first({
        success:function(data){
            var targetuser = localStorage.getItem('userid');
            var cardid = data.get('Card_info');
            var user = Parse.Object.extend('User');
            var query = new Parse.Query(user);
            query.equalTo('objectId', targetuser);
            query.first({
                success:function(data1){
                    var Cardrecord = Parse.Object.extend("Card_record");
                    var cardrecord = new Cardrecord();
                    cardrecord.set('user', currentuser);
                    cardrecord.set('Card_info', cardid);
                    cardrecord.set('target_user', data1);
                    cardrecord.set('type', "use");
                    cardrecord.save(null,{
                        success:function(data){
                            console.log("Card used record success!");
                        },
                        error:function(error){
                            console.log(error.toString());
                        }
                    })
                }
            })
        }
    })
}*/

//Delete used card
function deletecard(){
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
                            hp =+ hpPlus;
                            if(hp > 100)
                                hp = 100;
                            udata2.set('HP',hp);
                            udata2.save();
                            deletecard();
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
                            hp -= hpMinus
                            if(hp < 0)
                                hp = 0;
                            udata2.set('HP', hp);
                            udata2.save();
                            deletecard();
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
                                deletecard();
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

function addLife(cardid, target){
    var lifePlus = 0;
    if(cardid="wxTLT53ZZX") //+1
        lifePlus = 1;
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
                    var life = result.get('Life');
                    var udata2 = new udata();
                    udata2.set('objectId',result.id);
                    udata2.save(null,{
                        success: function(udata2){
                                life += lifePlus;
                                udata2.set('Life', life);
                                udata2.save();
                                deletecard();
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

function stealCard(targetId){
    var user = Parse.User.current();
    var target1 = Parse.Object.extend('User');
    var query1 = new Parse.Query(target1);
    query1.equalTo('objectId',targetId);
    query1.first({
        success: function(data){
            var owncard = Parse.Object.extend('Owncard');
            var query2 = new Parse.Query(owncard);
            query2.equalTo('user',data);
            query2.include('user');
            query2.include('Card_info');
            query2.find({
                success: function(data2){
                    var random = Math.floor(Math.random() * data2.length);
                    var own = new owncard();
                    own.set('objectId',data2[random].id);
                    own.save(null,{
                        success: function(own){
                            own.set('user',user);
                            own.save();
                            deletecard();
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        error: function(error){
        }
    });
}

function stealHP(cardid, target){
    var hpSteal = 0;
    if(cardid = '8x7C6LFRhH') //steal 50
        hpSteal = 50;
    else if(cardid = 'jqxvogKdXQ') // steal 30
        hpSteal = 30;
    else if(cardid = 'Byw6APXDGu') // steal 10
        hpSteal = 10;
        
    var u = Parse.Object.extend('User');
    var query = new Parse.Query(u);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query1 = new Parse.Query(udata);
            query1.equalTo('User',data); 
            var query2 = new Parse.Query(udata);
            query2.equalTo('User',Parse.User.current());
            var query = Parse.Query.or(query1, query2);
            query.find({
                success: function(results){
                    if(results[0].get('User').id == Parse.User.current().id){
                        //+ user hp
                        var udata1 = new udata();
                        var hp = results[0].get('HP');
                        udata1.set('objectId', results[0].id);
                        udata1.save(null,{
                            success: function(udata1){
                                var hpAfter = hp + hpSteal;
                                if(hpAfter > 100)
                                    hpAfter = 100;
                                udata1.set('HP',hpAfter);
                                udata1.save();
                            }
                        });
                        //- target hp
                        var udata2 = new udata();
                        var hp2 = results[1].get('HP');
                        udata2.set('objectId', results[1].id);
                        udata2.save(null,{
                            success: function(udata2){
                                var hpAfter = hp2 - hpSteal;
                                if(hpAfter < 0)
                                    hpAfter = 0;
                                udata2.set('HP',hpAfter);
                                udata2.save();
                            }
                        });
                    }
                    if(results[0].get('User').id == target){
                        //- target hp
                        var udata1 = new udata();
                        var hp = results[0].get('HP');
                        udata1.set('objectId', results[0].id);
                        udata1.save(null,{
                            success: function(udata1){
                                var hpAfter = hp - hpSteal;
                                if(hpAfter < 0)
                                    hpAfter = 0;
                                udata1.set('HP',hpAfter);
                                udata1.save();
                            }
                        });
                        //+ user hp
                        var udata2 = new udata();
                        var hp2 = results[1].get('HP');
                        udata2.set('objectId', results[1].id);
                        udata2.save(null,{
                            success: function(udata2){
                                var hpAfter = hp2 + hpSteal;
                                if(hpAfter > 100)
                                    hpAfter = 100;
                                udata2.set('HP',hpAfter);
                                udata2.save();
                            }
                        });
                    }
                    deletecard();
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

function donateHP(cardid, target){
    var hpDonate = 0;
    if(cardid = '8x7C6LFRhH') //steal 50
        hpDonate = 50;
    else if(cardid = 'jqxvogKdXQ') // steal 30
        hpDonate = 30;
    else if(cardid = 'Byw6APXDGu') // steal 10
        hpDonate = 10;
        
    var u = Parse.Object.extend('User');
    var query = new Parse.Query(u);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query1 = new Parse.Query(udata);
            query1.equalTo('User',data); 
            var query2 = new Parse.Query(udata);
            query2.equalTo('User',Parse.User.current());
            var query = Parse.Query.or(query1, query2);
            query.find({
                success: function(results){
                    if(results[0].get('User').id == Parse.User.current().id){
                        //- user hp
                        var udata1 = new udata();
                        var hp = results[0].get('HP');
                        udata1.set('objectId', results[0].id);
                        udata1.save(null,{
                            success: function(udata1){
                                var hpAfter = hp - hpDonate;
                                if(hpAfter < 0)
                                    hpAfter = 0;
                                udata1.set('HP',hpAfter);
                                udata1.save();
                            }
                        });
                        //+ target hp
                        var udata2 = new udata();
                        var hp2 = results[1].get('HP');
                        udata2.set('objectId', results[1].id);
                        udata2.save(null,{
                            success: function(udata2){
                                var hpAfter = hp2 + hpDonate;
                                if(hpAfter > 100)
                                    hpAfter = 100;
                                udata2.set('HP',hpAfter);
                                udata2.save();
                            }
                        });
                    }
                    if(results[0].get('User').id == target){
                        //+ target hp
                        var udata1 = new udata();
                        var hp = results[0].get('HP');
                        udata1.set('objectId', results[0].id);
                        udata1.save(null,{
                            success: function(udata1){
                                var hpAfter = hp + hpSteal;
                                if(hpAfter > 100)
                                    hpAfter = 100;
                                udata1.set('HP',hpAfter);
                                udata1.save();
                            }
                        });
                        //- user hp
                        var udata2 = new udata();
                        var hp2 = results[1].get('HP');
                        udata2.set('objectId', results[1].id);
                        udata2.save(null,{
                            success: function(udata2){
                                var hpAfter = hp2 - hpSteal;
                                if(hpAfter < 0)
                                    hpAfter = 0;
                                udata2.set('HP',hpAfter);
                                udata2.save();
                            }
                        });
                    }
                    deletecard();
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