//About Personal page owncard display
$(document).ready(function(){
    Parse.initialize("sdPsOfCJu21F7DIrFF08tDwuVtfZZbx1sLwMbMDB", "11wLPl0BPrkmtTlba00jZfvPtxKR9TNCxoLp3Rrb");
    //front-end user_status
    var userStatus=Parse.Object.extend('User_status');
    var query = new Parse.Query(userStatus);
		if (Parse.User.current()){
    query.equalTo('User', Parse.User.current());
    query.include('User');
		query.include('LevelInfo');
    query.first({	
        success:function(data){
					 console.log (data);
            var photo = data.get('User').get('photo');
            var name = data.get('User').get('name');
            var level = data.get('Level');
            var hp = data.get('HP');
            var xp = data.get('XP');
/** Radina */
						var levelInfo = data.get('LevelInfo');
						var diota = levelInfo.get("diota") ;
						var sum = levelInfo.get("sum");
						console.log (diota);
						var currentXp = xp - sum ;
						console.log (currentXp);
						 $('#individual-level').append('LEVEL '+level);						 
						 var xpP = parseInt(currentXp / diota * 100)+'%'  ; 
						 

             var life = data.get('Life');
						 $("#life-block .life-img").each(function(i, e) {
							if (i < life){
								 setTimeout(function(){
								$(e).delay(i * 1000).addClass('exist');
								 },i*500);
							}
						});
						 /*function controlLife(life){
								var $lifes = $('.life-img');
							 for (var i = lifeElement ; i >=0 ; i-- ){
									 $$lifes.get(i))
							 }
						 	
						 }*/
/****/						 
            $('#individual-name').append(name);           
            $(".bighead").attr("src",photo);  // Rn
            $(".bighead").attr("width","100%"); // Rn	
            // Rn : 這裡是 animation 如果要調整%數或其他的，可以從這裡調整變數
            $('#individual-hp').text(hp+'%').css('width',hp+'%');
            $('#individual-exp').text(xpP).css('width',xpP );
							$('#individual-exp').closest('.progress').attr('title',xp + '  / '+(sum + diota)).tooltip();
	         }
    });
		}//else{ alert ("你還沒登入");}   Rn
		
    //back-end owncard
    var current_user = Parse.User.current();
    if(current_user){
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('Card_info');
        query.equalTo('user', current_user);
        query.descending('createdAt');
        query.find({
            success: function(data){
											
                    var ccontainer = "";
                    for(var i = 0; i<data.length; i++){
                        var card = data[i].get('Card_info');
                        
													if(card == undefined){
                            var backcard = "<div class='card-box card-box-back col-md-2' data-owncard='"+data[i].id+"'><a data-toggle='tooltip' title='你有一張抽卡機會'><img id='backcard' src='img/choosecard/back.png'></a></div>"; // Rn
                            $('div#OwnCardData').append(backcard);
                        }
                        else{
																var target_type = card.get("target_type");
																var s = getElementStringByowncard(card.get('imagesrc'), data[i].id);
																ccontainer += s;
																var string = "<div class='card-box card-box-use col-md-2' data-targettype='"+target_type+"'> " + ccontainer + "</div>";
																$('div#OwnCardData').append(string); 
																ccontainer = "";
                        }
                    }
											$('a[data-toggle="tooltip"]').tooltip({
												animated: 'fade',
												placement: 'top',
											});
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
        })    
        $('#modalClose').on('click', function () {
            localStorage.removeItem('owncardId');
            $('#CardTitle').html("");
            $('#CardData').html("");
        })

        //Determine notification
        var eventrecord = Parse.Object.extend("Event_Record");
        var query1 = new Parse.Query(eventrecord);
        query1.equalTo('target', Parse.User.current());
        query1.equalTo('isNoti',false)
        query1.first({
            success:function(data){
                if(data == undefined){

                }
                else{
                    $("#bell").css("background-color", "red");
                } 
            },
            error:function(error){
                console.log(error.toString());
            }
        })

        var cardrecord = Parse.Object.extend("Card_record");
        var query2 = new Parse.Query(cardrecord);
        query2.equalTo('targetuser', Parse.User.current());
        query2.equalTo('isNotif', false);
        query2.include('targetuser');
        query2.first({
            success:function(data){
                if(data == undefined){

                }
                else{
                    $("#bell").css("background-color", "red");
                }              
            },
            error:function(error){
                console.log(error.toString());
            }
        })
    }
});

function getElementStringByowncard(imagesrc, id){ // img and id 
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

$(document).on('click','.card-box-back',function (){
	document.location='card_drawing.html';
	var o = $(this).data('owncard') ; 
	localStorage['owncard'] = o ;	
});
$(document).on('click','.card-box-use',function (){
	if ($(this).data('targettype')){
		
		
	}
});
