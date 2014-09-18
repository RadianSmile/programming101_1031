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
                                                    var photo = data[i].get('photo');
    				var s = getElementStringByowncard(username, id, photo);
    				ccontainer += s;
                                                    if((i+1) % 6 ==0){
                                                        var string = "<div class='row-fluid'>" + ccontainer + "</div>";
                                                        $('div.container-fluid').append(string);
                                                        ccontainer = "";
                                                    }
                                                    else if(i==data.length -1){
                                                        var string = "<div class="+"row-fluid"+">" + ccontainer + "</div>";
                                                        $('div.container-fluid').append(string);
                                                        ccontainer = "";                                                        
                                                    }
                                        }

    				$('.in').on('click', function(){
                        $('div#bigdiv').append("<img id='loading' src='img/loading.gif'>");
                        $('div#bigdiv').css("top", "10%");
                        $('div#bigdiv').css("left", "10%");
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
                                        var targetuserid = data1.id;
                                        var targetusername = data1.get('name');
                                        if(cardid == "OSRGBnKpaP"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("你讓自己增加10XP!");
                                                cardUseRecord();
                                                addXP(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "4c3uX1rZ1K"){
                                            if(data1.id == Parse.User.current().id){                                            
                                                alert("你讓自己增加30XP!");
                                                cardUseRecord();
                                                addXP(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "zLHR3S0hlb"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("你讓自己增加10HP!");                                               
                                                cardUseRecord();
                                                addHP(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "7mn5hYmEWH"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("你讓自己增加30HP!");                                               
                                                cardUseRecord();
                                                addHP(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "xJmFmNA97H"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你讓" + targetusername + "增加10HP!");                                              
                                                cardUseRecord();
                                                addHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "CsG1I2kDXT"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你讓" + targetusername + "增加30HP!");                                                
                                                cardUseRecord();
                                                addHP(cardid, targetuserid);
                                            }
                                        }                                         
                                        else if(cardid == "UDfyCM4Pyb"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("你補滿自己的HP!");                                               
                                                cardUseRecord();
                                                addHP(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "aJONHaxQtM"){
                                            if(data1.id == Parse.User.current().id){                                              
                                                alert("你讓自己增加1條命!");
                                                cardUseRecord();
                                                addLife(cardid, targetuserid);
                                            }
                                            else{
                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                        }
                                        else if(cardid == "10ypku2oZk"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你對" + targetusername + "捐了10HP!你自己扣了10HP!");                                               
                                                cardUseRecord();
                                                donateHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "ysYpQz4TW0"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你對" + targetusername + "捐了30HP!你自己扣了30HP!");                                               
                                                cardUseRecord();
                                                donateHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "y0pZ66Wl4X"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你讓" + targetusername + "減少10HP!");                                               
                                                cardUseRecord();
                                                minusHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "ZLZIS7XbfQ"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你讓" + targetusername + "減少30HP!");                                               
                                                cardUseRecord();
                                                minusHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "Byw6APXDGu"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你向" + targetusername + "偷了10HP!你自己增加10HP!");                                              
                                                cardUseRecord();
                                                stealHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "jqxvogKdXQ"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你向" + targetusername + "偷了30HP!你自己增加30HP!");                                               
                                                cardUseRecord();
                                                stealHP(cardid, targetuserid);
                                            }
                                        }
                                        else if(cardid == "1PF6Z8XISA"){
                                            if(data1.id == Parse.User.current().id){
                                                alert("這張卡片只能使用在其他人！請選擇其他使用者！");
                                                $('div#bigdiv').html("");
                                                $('div#bigdiv').css("top", "");
                                                $('div#bigdiv').css("left", "");
                                            }
                                            else{
                                                alert("你選擇向" + targetusername + "偷了一張卡!");                                              
                                                cardUseRecord();
                                                stealCard(targetuserid);
                                            }
                                        }
                                        //onemorecard
                                        else{
                                            var targetuser = localStorage.getItem('userid');
                                            var user = Parse.Object.extend('User');
                                            var query = new Parse.Query(user);
                                            query.equalTo('objectId', targetuser);
                                            query.first({
                                                success:function(data){
                                                    var Owncard = Parse.Object.extend("Owncard");
                                                    var owncard = new Owncard();
													owncard.set('user', Parse.User.current());
													owncard.set('Card_info', undefined);
													owncard.save(null,{
                                                        success:function(data1){
                                                            if(data.id == Parse.User.current().id){
                                                                alert("你自己多了一次抽卡機會!");                                                                
                                                                console.log("Draw record success!");
                                                                cardUseRecord();
                                                                deletecard();
                                                            }
                                                            else{
                                                                alert("這張卡片只能使用在自己身上！請選擇自己！");
                                                                $('div#bigdiv').html("");
                                                                $('div#bigdiv').css("top", "");
                                                                $('div#bigdiv').css("left", "");
                                                            }
                                                        },
                                                        error:function(error){
                                                            console.log(error.toString());
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        //Record used card!
                                        function cardUseRecord(){
                                            var Cardrecord = Parse.Object.extend("Card_record");
                                            var cardrecord = new Cardrecord();
                                            cardrecord.set('user', Parse.User.current());
                                            cardrecord.set('Card_info', card);
                                            cardrecord.set('targetuser', data1);
                                            cardrecord.set('type', "use");
                                            cardrecord.set('isNotif', false);
                                            cardrecord.save(null,{
                                                success:function(data){
                                                    console.log("Card used record success!");
                                                },
                                                error:function(error){
                                                    console.log(error.toString());
                                                }
                                            })
                                        }
                                    }
                                })
                            },
                            error: function(error){
                                console.log(error.toString());
                            }
                        })
    				})
    		}
    	})
    }
});

function getElementStringByowncard(name, id, photo){
    var s = "<h4>"+name+"</h4>";
    var s1 = "<img id='alluserphoto' src ='"+photo+"''>";
    var all = "<div class ='in' id='"+id+"'>"+ s + s1 + "</div>";

    return all;
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
                    alert("卡片成功使用！返回dashboard!");
                    localStorage.removeItem('owncardId');
                    window.location.href = "dashboard.html";
                }
            })
        }
    })
};

//Card function
function addHP(cardid, target){
    var hpPlus = 0;
    if(cardid == "UDfyCM4Pyb") //+full
        hpPlus = 100;
    else if(cardid == "7mn5hYmEWH") //+30
        hpPlus = 30;
    else if(cardid == "zLHR3S0hlb") //+10
        hpPlus = 10;
    else if(cardid == "CsG1I2kDXT")
        hpPlus = 30;
    else if(cardid == "xJmFmNA97H")
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
                            hp += hpPlus;
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
    if(cardid == "ZLZIS7XbfQ") //-30
        hpMinus = 30;
    else if(cardid == "y0pZ66Wl4X") //-10
        hpMinus = 10;
    var user = Parse.Object.extend('User');
    var query = new Parse.Query(user);
    query.equalTo('objectId',target);
    query.first({
        success: function(data){
            var udata = Parse.Object.extend('User_status');
            var query = new Parse.Query(udata);
            query.equalTo('User', data); 
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
    if(cardid == "4c3uX1rZ1K") //+30
        xpPlus = 30;
    else if(cardid == "OSRGBnKpaP") //+10
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
    if(cardid=="aJONHaxQtM") //+1
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
                        if(data2[random] != undefined){
                            own.set('objectId',data2[random].id);
                            own.save(null,{
                                success: function(own){
                                    own.set('user',user);
                                    own.save();
                                    deletecard();
                                }
                            });
                        }
                        else{
                            alert("你使用的對象沒有任何卡片，偷卡失敗，再選其他人吧！!");
                            $('div#bigdiv').html("");
                            $('div#bigdiv').css("top", "");
                            $('div#bigdiv').css("left", "");
                        }
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
    if(cardid == 'jqxvogKdXQ') // steal 30
        hpSteal = 30;
    else if(cardid == 'Byw6APXDGu') // steal 10
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
    if(cardid == 'ysYpQz4TW0') // donate 30
        hpDonate = 30;
    else if(cardid == '10ypku2oZk') // donate 10
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