//About Personal page owncard display
$(document).ready(function(){
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    //front-end user_status
    var userStatus=Parse.Object.extend('User_status');
    var query = new Parse.Query(userStatus);
		if (Parse.User.current()){
    query.equalTo('User', Parse.User.current());
    query.include('User');
    query.first({
        success:function(data){
            var photo = data.get('User').get('photo');
            var name = data.get('User').get('name');
            var level = data.get('Level');
            var hp = data.get('HP');
            var xp = data.get('XP');
             var life = data.get('Life');
         var hpblocks = 100;//parseInt(hp)|100;
         var xpblocks = 100;//parseInt(xp)|100;
            $('#individual-name').append(name);
            $('#individual-level').append('Level:'+level);
            
            $(".bighead").attr("src",photo);  // Rn
            $(".bighead").attr("width","100%"); // Rn
            // Rn : 這裡是 animation 如果要調整%數或其他的，可以從這裡調整變數
            $('#individual-hp').animate({
                width:hp+'%'
            },1000);        // Rn
            $('#individual-exp').animate({
                width:xp+'%'     
            },2000);         // Rn

          }
    });
		}else{ alert ("你還沒登入");}
    //back-end owncard
    var current_user = Parse.User.current();
    if(current_user){
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('Card_info');
        query.equalTo('user', current_user);
        query.find({
            success: function(data){
                    var ccontainer = "";
                    for(var i = 0; i<data.length; i++){
                        var card = data[i].get('Card_info');
                        if(card == undefined){
                            var backcard = "<a href='card_drawing.html'><img id='backcard' src='img/choosecard/back.png'></a>"; // Rn
                            $('div#OwnCardData').append(backcard);
                        }
                        else{
                            var s = getElementStringByowncard(card.get('imagesrc'), data[i].id);
                            ccontainer += s;
                                var string = "<div class='card-box col-md-2'> " + ccontainer + "</div>";
                                $('div#OwnCardData').append(string);
                                ccontainer = "";
                                $('.card').on('click', function(){
                                    var id = $(this).attr('id');
                                    localStorage['owncardId'] = id;
                                    var owncardid = localStorage.getItem('owncardId');
                                    var ownCard = Parse.Object.extend('Owncard');
                                    var query = new Parse.Query(ownCard);
                                    query.equalTo('objectId', owncardid);
                                    query.include('Card_info');
                                    query.first({
                                        success: function(data){
                                            var carddata = data.get('Card_info');
                                            var cardtitle = carddata.get('name');
                                            $('h4#CardTitle').append(cardtitle);
                                            var s = getUsecard(carddata.get('imagesrc'), carddata.get('shortdes'));
                                            $('div#CardData').append(s);
                                        }
                                    });
                                })
                        }
                    }
            }
        })    
        $('#modalClose').on('click', function () {
            localStorage.removeItem('owncardId');
            $('#CardTitle').html("");
            $('#CardData').html("");
        })
    }
});

function getElementStringByowncard(imagesrc, id){
    var s1 = "<img src='" + imagesrc + "'>";
    var s = "<a href='#' data-toggle='modal' data-target='#cardModal'><div class='card' id='"+id+"'>" + s1 + "</div></a>";

    return s;
};

function getUsecard(imagesrc, shortdes){
    var s1 = "<img class = 'owncard' src='" + imagesrc + "'/>";
    var s2 = "<div id='shortdes'>" + shortdes + "</div>";
    var s = "<div>" + s1 + s2 + "</dvi>";

    return s;
};