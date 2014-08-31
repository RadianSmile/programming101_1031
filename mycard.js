var isClickBattle = false;
var isClickFlow = false;
var origin = '';
$(document).ready(function(){
	
	$('img.level').mouseover(function(){
		origin = $(this).attr('src');
		$(this).attr('src','img/button/readMore.jpg');
	});

	$('img.level').mouseout(function(){
		$(this).attr('src',origin);
	});

	Parse.initialize("3zNjT9EGuUYzq0Ucqj9mrYOZBQQri1u40LqDGhiJ","FhvDpueqCRBp1bvNDRL7Scbb00J9f7KoyQMmlnvC");
	var current_user = Parse.User.current();
	if(current_user){
		var BattleCard = Parse.Object.extend('BattleCard');
		var query1 = new Parse.Query(BattleCard);
		query1.include('card');
		query1.equalTo('user',current_user);
		query1.ascending('flow');
		query1.find({
			success: function(data) {
				for(var i=0;i <data.length;i++){
					var card = data[i].get('card');
					var s = getElementStringByBattleCard(card.get('name'),card.get('level')
								,card.id,data[i].get('flow'),card.get('url'));
					$('div.BattleCard').append(s);
				}
			}
		});
		var ownCard = Parse.Object.extend('ownCard');
		var query2 = new Parse.Query(ownCard);
		query2.include('card');
		query2.equalTo('user',current_user);
		query2.find({
			success: function(data) {
				var s1 = "";
				for(var i=0;i <data.length;i++){
					var card = data[i].get('card');
					var s = getElementStringByownCard(card.get('name'),card.get('level'),card.id,card.get('url'));
					s1 += s;
					if((i + 1) % 5 == 0){
						var string = "<div class='cards'>"+s1+"</div>";
						$('div.cardbox').append(string);
						s1 = "";
					}
					else if(i == data.length - 1){
						var string = "<div class='cards'>"+s1+"</div>";
						$('div.cardbox').append(string);
						s1 = "";
					}
				}
			}
		});
		
		var originArr = [];
		$('#changeBattleCard').click(function(){
			if(isClickBattle==false){
				$('.checkbox').css('display','inline-block');
				var x = $('.flow');
				for(var i = 0;i<x.length;i++){
					var id = x[i].id;
					$('.checkbox[value='+id+']').prop('checked',true);
					originArr.push(id);
				}
				isClickBattle = true;
			}
			else{
				var x = $('.flow');
				var arr = [];
				var count = 0;
				$('.checkbox').each(function(){
					if($(this).prop('checked')==true){
						var value = this.value;
						arr.push(value);
						count++;
					}
				});
				
				if(count != 5){
					if(count > 5)
						alert('點選超過五個，請重新點選');
					else
						alert('點選少於五個，請重新點選');
					for(var i = 0;i<x.length;i++){
						var id = x[i].id;
						$('.checkbox[value='+id+']').prop('checked',true);
					}
				}
				else{
					var arr = [];
					$('.checkbox').each(function(){
						if($(this).prop('checked')==true){
							arr.push(this.value);
						}
					});
					var html = $('div.BattleCard').html();
					html = html.trim();
					if(html != ""){
						$('.checkbox').each(function(){
							if($(this).prop('checked')==true){
								var value = this.value;
								var card = Parse.Object.extend('card');
								var innerQuery = new Parse.Query(card);
								innerQuery.equalTo('objectId',value);
								innerQuery.first({
									success: function(data){
										var BC = Parse.Object.extend('BattleCard');
										var query = new Parse.Query(BC);
										query.equalTo('user',Parse.User.current());
										query.ascending('flow');
										query.find({
											success: function(result){
												var id = data.id;
												var array = new Array();
												for(var i=0;i<result.length;i++){
													array.push(result[i].get('card').id);
												}
												var bool = [false,false,false,false,false];
												var a = arr;
												for(var i=0;i<5;i++){
													var no = array.indexOf(arr[i]);
													if(no != -1)
														bool[no] = true;
												}
												if(bool[0] == false)
													updateCard(arr[0],result[0]);
												if(bool[1] == false)
													updateCard(arr[1],result[1]);
												if(bool[2] == false)
													updateCard(arr[2],result[2]);
												if(bool[3] == false)
													updateCard(arr[3],result[3]);
												if(bool[4] == false)
													updateCard(arr[4],result[4]);
											}
										});
									}
								});
							}
						});
					}
					else{
						$('.checkbox').each(function(){
							if($(this).prop('checked')==true){
								var count = 1;
								var value = this.value;
								var card = Parse.Object.extend('card');
								var innerQuery = new Parse.Query(card);
								innerQuery.equalTo('objectId',value);
								innerQuery.first({
									success: function(data){
										var BC = Parse.Object.extend('BattleCard');
										var bc = new BC();
										bc.set('user',Parse.User.current());
										bc.set('card',data);
										bc.set('flow',count);
										bc.save(null,{
											success: function(bc){
												count++;
											},
											error: function(bc, error){
												console.log(error);
											}
										});
									}
								});
							}
						});
					}
					changeBattleCardHTML();
					$('.checkbox').each(function(){
					 var value = $(this).val();
						if(arr.indexOf() != -1)
							$(this).prop('checked',true);
						else
							$(this).prop('checked',false);
						$(this).css('display','none');
					});
					
					isClickBattle = false;
				}
			}
		});
		
		$('#changeFlow').click(function(){
			if(isClickFlow==false){
				$('.flow').prop('disabled',false);
				isClickFlow = true;
			}
			else{
				var x = $('.flow');
				var isDuplicated = false;
				var arrFlow = new Array("","","","","");
				for(var i=0;i<x.length;i++){
					if(x[i].value > 5){
						isDuplicated = true;
						break;
					}
					arrFlow[x[i].value - 1] = x[i].id;
				}
				for(var i=0;i<arrFlow.length;i++){
					if(arrFlow[i]==""){
						isDuplicated = true;
						break;
					}
				}
				if(isDuplicated==true){
					for(var i=0;i<5;i++)
						x[i].value = i + 1;
				}
				x.prop('disabled',true);
				if(!isDuplicated)
					changeAndSaveBattleCard(arrFlow);
				isClickFlow = false;
			}
		});
	}
	else{
		alert("請登入");
		window.location.assign("LoginPage.html");
	} 
});

function updateCard(id, bcard){
	var card = Parse.Object.extend('card');
	var query = new Parse.Query(card);
	query.equalTo('objectId',id);
	query.first({
		success: function (data){
			var BC = Parse.Object.extend('BattleCard');
			var bc = new BC();
			bc.set('objectId',bcard.id);
			bc.save(null, {
				success: function(bc){
					bc.set('card',data);
					bc.save();
				}
			});
		}
	});
}

function getElementStringByownCard(name, level, id,url){
	var s0 = "<input class='checkbox' type='checkbox' value='"+id+"'>"
	var s1 = "<h5>"+name+"</h5>";
	var s2 = "<a href='"+url+"'><img class='level' src='img/rank/"+level+".jpg' alt='"+name+"' ></a>";
	var s = "<div class='card'>"+s0+s1+s2+"</div>";
	
	return s;
}

function getElementStringByBattleCard(name, level, id, number,url){
	var s0 = "<input type='text' id='"+id+"' class='flow' value='"+number+"' disabled>";
	var s1 = "<h5>"+name+"</h5>";
	var s2 = "<a href='"+url+"'><img class='level' src='img/rank/"+level+".jpg' alt='"+name+"' ></a>";
	var s = "<div class='card'>"+s0+s1+s2+"</div>";
	
	return s;
}

function changeAndSaveBattleCard(array){
	var card = Parse.Object.extend('card');
	var BattleCard = Parse.Object.extend('BattleCard');
	var query = new Parse.Query(BattleCard);
	query.equalTo('user',Parse.User.current());
	query.ascending('flow');
	query.find({
		success: function(data){
			var x = $('.flow');
			for(var i=0;i<data.length;i++)
				saveObj(x[i],data[i]);
		},
		error: function(error){
		}
	});
}

function saveObj(x, data){
	var s = 1;
	var value = parseInt(x.value);
	if(value != data.get('flow')){
		var BC = Parse.Object.extend('BattleCard');
		var bc = new BC();
		bc.set('user',data.get('user'));
		bc.set('card',data.get('card'));
		bc.set('objectId',data.id);
		bc.save(null,{
			success: function(bc){
				bc.set('flow',value);
				bc.save();
			}
		});
	}
}
	
function changeBattleCardHTML(){
	var BC = Parse.Object.extend('BattleCard');
	var query = new Parse.Query(BC);
	query.equalTo('user',Parse.User.current());
	query.include('card');
	query.ascending('flow');
	query.find({
		success: function (data){
			$('div.BattleCard').html("");
			for(var i = 0;i<data.length;i++){
				var card = data[i].get('card');
				var s = getElementStringByBattleCard(card.get('name'),card.get('level')
							,card.id,data[i].get('flow'));
				$('div.BattleCard').append(s);
			}
		},
		error: function (error){
			console.log(error);
		}
	});
}

$('#logout').click(function(){
	
	window.fbAsyncInit = function() {
  		FB.init({
		 appId      : '243758945748336',
		 cookie     : true,  // enable cookies to allow the server to access 
                        // the session
		 xfbml      : true,  // parse social plugins on this page
		 version    : 'v2.0' // use version 2.0
  		});
	
	FB.getLoginStatus(function (response){
		if(response.status === 'connected'){
			FB.logout(function(response){
				Parse.User.logOut();
				window.location.assign("LoginPage.html");
			});
		} else if(response.status === 'not_authorized'){
			FB.logout(function (response) {     
				alert("請重新登入！");
			});
		} else{    // 使用者沒有登入 Facebook
			alert("請重新登入！");
		}
	});
	};
	
	(function(d, s, id) {
		 var js, fjs = d.getElementsByTagName(s)[0];
    		if (d.getElementById(id)) return;
    		js = d.createElement(s); js.id = id;
    		js.src = "//connect.facebook.net/en_US/sdk.js";
		 fjs.parentNode.insertBefore(js, fjs);
  		}(document, 'script', 'facebook-jssdk'));
});