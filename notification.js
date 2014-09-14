$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
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
    var createTime = data.get('createdAt');
    
    var s = "";
        if(userId == Parse.User.current().id){
            if(targetId == Parse.User.current().id){
                s = "<h2>你對自己使用了" + cardName + "。</h2>";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
            }
            else{
                s = "<h2>你對" + targetName + "使用了" + cardName + "。</h2>";
                container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
            }
        }
        else if(targetId == Parse.User.current().id){
            s = "<h2>"+userName+"對你使用了" + cardName + "。</h2>";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
        }
    return container;
}

function getRecord(data){
    var userId = data.get('user').id;
    var cardName = data.get('Card_info').get('name');
    
    var s = "";
        if(userId == Parse.User.current().id){
            s = "<h2>你抽到了"+ cardName + "。</h2>";
            container = "<div class = 'time-gray-color'>"+createTime+"</div><span class = 'glyphicon-thumbs-down' style = 'white-space: nowrap;'>"+ s +"</span></div>";
        }
    return container;
}