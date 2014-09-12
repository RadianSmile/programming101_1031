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
                    var strings = "<div class = 'cardnotification'>" + notification + "</div>";
                    $('div.notificationbox').append(strings);
                    notification = "";
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
    
    var s = "";
        if(userId == Parse.User.current().id){
            if(targetId == Parse.User.current().id){
                s = "<h2>你對自己使用了" + cardName + "。</h2>";
            }
            else{
                s = "<h2>你對" + targetName + "使用了" + cardName + "。</h2>";
            }
        }
        else if(targetId == Parse.User.current().id){
            s = "<h2>"+userName+"對你使用了" + cardName + "。</h2>";
        }
    return s;
}