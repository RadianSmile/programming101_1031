$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    var current_user = Parse.User.current();
    if(current_user){
        var strings = [];
        var notif = Parse.Object.extend("Card_record");
        var query = new Parse.Query(notif);
        query.equalTo('user', Parse.User.current());
        query.include('Card_info');
        query.include('user');
        query.descending('date');
        query.find({
            success:function(data){
                for(var i = 0; i<data.length; i++){
                    var s = recordToString(data[i], Parse.User.current('objectId'));
                    strings.push(s);
                },
                error:function(error){
                    console.log(error.toString());
                }
            }
        });
        return strings;
    }
})

//get the data in parse.com and turn that into HTML DOM string
function recordToString(data, id){
    var type = data.get('type');
    var userName = '<strong>' + Parse.User.current().get('name') + '</strong>';
    var useeName = '<strong>' + data.get('target_user').get('name') + '</strong>';
    var useeId = data.get('target_user').get('objectId');
    var cardName = data.get('Card_info').get('name');
    
    var s = "";
    if(type == 'get'){
        s = '你抽到了' + cardName + '。';
    }
    else if(type == 'use'){
        if(Parse.User.current().id == useeId){
            s = '你對自己使用了' + cardName + '。';
        }
        else if(useeId = id){
            s = '你對' + useeName + '使用了' + cardName + '。';
        }
        else if(useeId == id){
            s = '你被' + userId + '使用了' + cardName + '。';
        }
    }
    return s;
}