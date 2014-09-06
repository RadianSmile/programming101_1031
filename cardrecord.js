$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var strings = "";
        var notif = Parse.Object.extend("Card_record");
        var query = new Parse.Query(notif);
        query.equalTo('user', Parse.User.current());
        query.include('Card_info');
        query.include('User');
        query.descending('date');
        query.find({
            success:function(data){
                for(var i = 0; i<data.length; i++){
                    var s = recordToString(data[i], data[i].get('User').id);
                    strings += s;
                    var string = "<div class='cardnotification'>" + strings + "</div>";
                    $('div.notificationbox').append(string);
                    strings = "";
                }
            },
            error:function(error){
                console.log(error.toString());
            }
        });

        var strings1 = "";
        var notif1 = Parse.Object.extend("Card_record");
        var query1 = new Parse.Query(notif1);
        query1.equalTo('User', Parse.User.current());
        query.include('Card_info');
        query.include('User');
        query.descending('date');
        query.find({
            success:function(data){
                for(var i=0; i<data.length; i++){
                    var s = berecordToString(data[i]);
                    strings1 += s;
                    var string = "<div class='cardnotification'>" + strings1 + "</div>";
                    $('div.notificationbox').append(string);
                    strings1 = "";
                }
            },
            error:function(error){
                console.log(error.toString());
            }
        });

    }
})

function recordToString(data, id){
    var type = data.get('type');
    var useeName = data.get('User').get('name');
    var useeId = data.get('User').id;
    var cardName = data.get('Card_info').get('name');
    
    var s = "";
    if(type == 'get'){
        s = "<h2>你抽到了"+ cardName + "。</h2>";
    }
    else if(type == 'use'){
        if(useeId == Parse.User.current().id){
            s = "<h2>你對自己使用了" + cardName + "。</h2>";
        }
        else if(useeId == id){
            s = "<h2>你對" + useeName + "使用了" + cardName + "。</h2>";
        }
    }
    else if(type == 'draw'){
        s = "<h2>你有一次抽卡機會！</h2>";
    }
    return s;
}

function berecordToString(data){
    var type = data.get('type');
    var useeName = data.get('user').get('name');
    var cardName = data.get('Card_info').get('name');
    var useeId = data.get('user').id;
    var UserId = data.get('User').id;

    if(type == 'use'){
        if(useeId == UserId){
            s="";
        }
        else{
            s = "<h2>你被某人使用了" + cardName + "。</h2>";
        }
        return s;
    }
}