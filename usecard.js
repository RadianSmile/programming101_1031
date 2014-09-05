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
                                    donateHP(cardid, current_user, targetuser);
                                }
                                else if(cardid == "ysYpQz4TW0"){
                                    donateHP(cardid, current_user, targetuser);
                                }
                                else if(cardid == "ic6YE4frVp"){
                                    donateHP(cardid, current_user, targetuser);
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
    //var s = "<input type='submit' value='"+name+"' id='"+id+"'>";
    var s = "<div  value='"+name+"' class='in' id='"+id+"'>"+name+"</div>";

    return s;
};

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
                            if(hpPlus == 100){
                                hp = 100;
                                udata2.set('HP', hp);
                                udata2.save();
                                deletecard();
                            }
                            else if(hpPlus == 50){
                                if(hp >= 50){
                                    hp = 100;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
                                else{
                                    hp += hpPlus;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
                            }
                            else if(hpPlus == 30){
                                if(hp >= 70){
                                    hp = 100;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
                                else{
                                    hp += hpPlus;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
                            }
                            else if(hpPlus == 10){
                                if(hp >= 90){
                                    hp = 100;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
                                else{
                                    hp += hpPlus;
                                    udata2.set('HP', hp);
                                    udata2.save();
                                    deletecard();
                                }
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

function stealHP(cardid, user, target){
    var getHpId = '';
    var lossHpId = '';
    if(cardid = '8x7C6LFRhH'){ //steal 50
        getHpId = 'cbACuxTVY1'; //+50 card id
        lossHpId = '4kJkiyYROw'; //-50 card id
        minusHP(lossHpId, target);
        addHP(getHpId, user);
        deletecard();
    }
    else if(cardid = 'jqxvogKdXQ'){ // steal 30
        getHpId = '7mn5hYmEWH'; //+30 card id
        lossHpId = 'ZLZIS7XbfQ'; //-30 card id
        minusHP(lossHpId, target);
        addHP(getHpId, user);
        deletecard();
    }
    else if(cardid = 'Byw6APXDGu'){ // steal 10
        getHpId = 'zLHR3S0hlb'; //+10 card id
        lossHpId = 'y0pZ66Wl4X'; //-10 card id
        minusHP(lossHpId, target);
        addHP(getHpId, user);
        deletecard();
    }
}

function donateHP(cardid, user, target){
    var getHpId = '';
    var lossHpId = '';
    if(cardid = 'ic6YE4frVp'){ //donate 50
        getHpId = 'cbACuxTVY1'; //+50 card id
        lossHpId = '4kJkiyYROw'; //-50 card id
        minusHP(lossHpId, user);
        addHP(getHpId, target);
        deletecard();
    }
    else if(cardid = 'ysYpQz4TW0'){ // donate 30
        getHpId = '7mn5hYmEWH'; //+30 card id
        lossHpId = 'ZLZIS7XbfQ'; //-30 card id
        minusHP(lossHpId, user);
        addHP(getHpId, target);
        deletecard();
    }
    else if(cardid = '10ypku2oZk'){ // donate 10
        getHpId = 'zLHR3S0hlb'; //+10 card id
        lossHpId = 'y0pZ66Wl4X'; //-10 card id
        minusHP(lossHpId, user);
        addHP(getHpId, target);
        deletecard();
    }
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