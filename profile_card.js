//About Personal page owncard display
function showPersonAndCard(profileUser){ 
    Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");
    //front-end user_status
    var userStatus=Parse.Object.extend('User_status');
    var query = new Parse.Query(userStatus);
    query.equalTo('User', profileUser);
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
		
	//	}//else{ alert ("你還沒登入");}   Rn
		
    //back-end owncard
  //  if(profileUser){
        var ownCard = Parse.Object.extend('Owncard');
        var query = new Parse.Query(ownCard);
        query.include('Card_info');
        query.equalTo('user', profileUser);
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
        });
   // }
}

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

