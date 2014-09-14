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
            success:function(data){
                console.log(data);
                for(var i = 0; i<data.length; i++){
                    data[i].set('isNoti', true);
                    data[i].save(null,{
                        success:function(data1){
                            console.log("IsNoti change to true!");
                        },
                        error:function(error){
                            console.log(error.toString());
                        }
                    })
                    var eid = data[i].get('eid');
                    console.log(eid);
                    var eventinfo = Parse.Object.extend("Event_Info");
                    var query4 = new Parse.Query(eventinfo);
                    query4.equalTo('eid', eid);
                    query4.first({
                        success:function(data2){
                            console.log(data2);
                            var s = eventRecord(data[i], data2);
                            eventnotification += s;
                            var strings = "<div class = 'notification-info'>" + eventnotification + "</div>";
                            $('div#notificationrows').append(strings);
                            eventnotification = "";
                        }
                    })
                }
            }
        })
        //Card use
        var notification = "";
        var notif = Parse.Object.extend("Card_record");
        var query = new Parse.Query(notif);
        query.equalTo('type', "use");
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
                            console.log("IsNotif change to true!");
                        },
                        error:function(error){
                            console.log(error.toString());
                        }
                    })
                    var s = useRecord(data[i]);
                    notification += s;
                    var strings = "<div class = 'notification-info'>" + notification + "</div>";
                    $('div#notificationrows').append(strings);
                    notification = "";
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
        query1.include('Card_info');
        query1.include('User');
        query1.ascending('createdAt');
        query1.find({
            success:function(data){
                for(var i = 0; i<data.length; i++){
                    var s = getRecord(data[i]);
                    notification1 += s;
                    var strings = "<div class = 'notification-info'>" + notification1 + "</div>";
                    $('div#notificationrows').append(strings);
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
    var createTime = data.createdAt;
    
    var s = "";
        if(userId == Parse.User.current().id){
            if(targetId == Parse.User.current().id){
                s = "你對自己使用了" + cardName + "。";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
            }
            else{
                s = "你對" + targetName + "使用了" + cardName + "。";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
            }
        }
        else if(targetId == Parse.User.current().id){
            s = userName+"對你使用了" + cardName + "。";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
        }
    return container;
}

function getRecord(data){
    var userId = data.get('user').id;
    var cardName = data.get('Card_info').get('name');
    var createTime = data.createdAt;
    
    var s = "";
        if(userId == Parse.User.current().id){
            s = "你抽到了"+ cardName + "。";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
        }
    return container;
}

function eventRecord(data, data1){
    var eventdes = data1.get('description');
    var createTime = data.createdAt;
    var result = data1.get('effect_target');
    var xp = result[0];
    var hp = result[1];
    var life = result[2];
    var s = "";
    s = "因為" + eventdes + "，所以造成你的XP變動" + xp +"、你的HP變動" + hp + "、你的Life變動" + life + "。";
    container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
    return container;
}