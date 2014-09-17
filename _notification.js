		moment.locale('zh-TW');

$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        //eventnotification
        var eventnotification = "";
        var eventrecord = Parse.Object.extend("Event_Record");
        var query3 = new Parse.Query(eventrecord);
        query3.equalTo('target', Parse.User.current());
        query3.find({
            success:function(data){ // evetRecord
                for(var i = 0; i<data.length; i++){
                    data[i].set('isNoti', true);
                   
                    var eid = data[i].get('eid');
                    var datai = data[i];
                    var eventinfo = Parse.Object.extend("Event_Info");
                    var query4 = new Parse.Query(eventinfo);
                    query4.equalTo('eid', eid.toString());
                    query4.first({
                        success:function(data2){
                            var s = eventRecord(datai, data2);
                            eventnotification += s;
                            var strings = "<div class = 'notification-info'>" + eventnotification + "</div>";
                            $('#works').append(strings);
                            eventnotification = "";
                        }
                    })
                } // for
								
									 Parse.Object.saveAll(data).then(Log,Log);
            }
        })
        //Card use
        var notification = "";
        var notif = Parse.Object.extend("Card_record");
        //var query1 = new Parse.Query(notif);
        //query1.equalTo('type', "use");
        var query2 = new Parse.Query(notif);
        query2.equalTo('user', Parse.User.current());
        var query3 = new Parse.Query(notif);
        query3.equalTo('targetuser', Parse.User.current());
        var query = Parse.Query.or(query2, query3);
        query.include('Card_info');
        query.include('user');
        query.include('targetuser');
        query.descending('createdAt');
        query.find({
            success:function(data){
                for(var i = 0; i<data.length; i++){
                    data[i].set('isNotif', true);
                    data[i].save(null,{
                        success:function(data1){
                            
                        },
                        error:function(error){
                            console.log(error.toString());
                        }
                    })
                    if(data[i].get('type') == "use"){
                        var s = useRecord(data[i]);
                        notification += s;
                        var strings = "<div class = 'notification-info'>" + notification + "</div>";
                        $('#cards').append(strings);
                        notification = "";
                    }
                }
            },
            error:function(error){
                console.log(error.toString());
            }
        });

        //Card get
        var notification1 = "";
        var notif1 = Parse.Object.extend("Card_record");
        var query1 = new Parse.Query(notif1);
        query1.equalTo('type', "get");
        query1.equalTo('user', Parse.User.current());
        query1.include('Card_info');
        query1.include('User');
        query1.descending('createdAt');
        query1.find({
            success:function(data){
                for(var i = 0; i<data.length; i++){
                    var s = getRecord(data[i]);
                    notification1 += s;
                    var strings = "<div class = 'notification-info'>" + notification1 + "</div>";
                    $('#cards').append(strings);
                    notification1 = "";
                }
            },
            error:function(error){
                console.log(error.toString());
            }
        });

    }
})

function useRecord(data){
    var targetName = data.get('targetuser').get('name');
    var targetId = data.get('targetuser').id;
    var cardName = data.get('Card_info').get('name');
    var userId = data.get('user').id;
    var userName = data.get('user').get('name');
    var createTime = moment(data.createdAt).fromNow();  // Rn
		console.log ("createTime",createTime.toLocaleString());
    var container = "";
    var s = "";
        if(userId == Parse.User.current().id){
            if(targetId == Parse.User.current().id){
                s = "你對自己使用了" + cardName + "。";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'></span>"+ s +"</div>";
            }
            else{
                s = "你對" + targetName + "使用了" + cardName + "。";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'></span>"+ s +"</div>";
            }
        }
        else if(targetId == Parse.User.current().id){
            s = userName+"對你使用了" + cardName + "。";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'></span>"+ s +"</div>";
        }
    return container;
}

function getRecord(data){
    var userId = data.get('user').id;
    var cardName = data.get('Card_info').get('name');
    var createTime = moment(data.createdAt).fromNow(); //
    
    var container = "";
    var s = "";
        if(userId == Parse.User.current().id){
            s = "你抽到了"+ cardName + "。";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'></span>"+ s +"</div>";
        }
    return container;
}

function eventRecord(data, data1){
    var eventdes = data1.get('description');
		console.log (eventdes);
    var createTime = data.createdAt;
		var m = moment(data.createdAt).fromNow();
		
    var result = data1.get('effect_target');
    var xp = result[0];
    var hp = result[1];
    var cd = result[2];
    var container = "";
    var s = "";
		
		var start = (xp !== 0 || hp !== 0 || cd !== 0 ) ? "因此你" : '' ;
		var xpStr = (xp !== 0) ? (xp > 0 ) ? 'XP增加了'+Math.abs(xp)+"，" : 'XP減少了'+Math.abs(xp)+"，": '' ;
		var hpStr = (hp !== 0) ? (hp > 0 ) ? 'HP增加了'+Math.abs(hp)+"，" : 'HP減少了'+Math.abs(hp)+"，": '' ; 
		var cdStr = (cd !== 0) ? (cd > 0 ) ? '的卡片增加了'+Math.abs(cd)+"張，" : '的卡片減少了'+Math.abs(cd)+"張，": '' ; 
		s = start + xpStr + hpStr + cdStr;
		s = s.slice(0,-1) + "。";
    container =  "<span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'></span>"+eventdes+"，"+s+"<span class = 'time-gray-color'>"+m+"</span></div>";
/*=======
    if(hp >=0){
        s = "因為" + eventdes + "，所以造成你的XP增加" + xp +"、你的HP增加" + hp + "、你的抽卡機會增加" + draw + "次。";
        container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'>"+ s +"</span></div>";
    }
    else{
        s = "因為" + eventdes + "，所以造成你的XP增加" + xp +"、你的HP被" + hp + "、你的抽卡機會增加" + draw + "次。";
        container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-bullhorn' style = 'white-space: nowrap;'>"+ s +"</span></div>";
    }
>>>>>>> FETCH_HEAD*/
    return container;
}