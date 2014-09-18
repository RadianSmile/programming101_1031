Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");


if (localStorage.getItem('owncard') === '' || localStorage.getItem('owncard') === null){
	alert("沒有收到資料！請從新點取卡牌。");
	document.location = 'dashboard.html'
	
}else {
	//alert(localStorage['owncard']);
}

$(document).ready(function(){
    var current_user = Parse.User.current();
    if(current_user){
        remainCard();
    }
    var owncard = Parse.Object.extend("Owncard");
    var query = new Parse.Query(owncard);
    query.equalTo('Card_info', undefined);
    query.equalTo('user', Parse.User.current());
    query.first({
        success:function(data){
            /*if(data == undefined){
                alert("You don't have the chance to draw the card! Back to dashboard!");
                window.location.href="http://radiansmile.github.io/CodeEDU/dashboard.html";
            }
            localStorage['drawrecord'] = data.id;*/
        }
    })
});

//Drawing card function
var Imagesrc;

function randomNum(length){
        num = Math.floor(Math.random() * (length));
        return(num);
}

function getData(){  // 進行抽卡的動作
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
   // var No = randomNum();     // 
    query.greaterThan("remain", 0);
    query.find({  // 抓取Remain 還不是0的卡排列
        success: function(results){
            var randomno = randomNum(results.length);
            var object = results;

            var currentuser = Parse.User.current();
            var Cardrecord = Parse.Object.extend("Card_record");
            var cardrecord = new Cardrecord();

            //Card_record!
            cardrecord.set('user', currentuser);
            cardrecord.set('Card_info', object[randomno]);  
            cardrecord.set('User', currentuser);
            cardrecord.set('type', "get");
            cardrecord.save(null,{  								// 將抽卡結果儲存到 cardRecord
                success:function(data){
                    console.log("Card drawing record success!");
                },
                error:function(error){
                    console.log(error.toString());
                }
            })

            Imagesrc = object[randomno].get('imagesrc');

            $('#image1').attr("src", Imagesrc)
            $('#image2').attr("src", Imagesrc)
            $('#image3').attr("src", Imagesrc)

            substractCardNum(object[randomno].id); // 現在要去減少卡片的數量

							// Save Own Card
            var owncardID = localStorage.getItem('owncard');

				  	 var Owncard = Parse.Object.extend("Owncard");
						 var owncard = new Owncard ();
						 owncard.id = owncardID ; 
						 owncard.set('Card_info', object[randomno])
							owncard.save(null, {
									success:function(){
										localStorage.removeItem('owncard');
											console.log("Save draw card success!");
											alert("你得到一張卡了!返回Dashboard~");
											window.location.href="dashboard.html";
									},
									error: function(error){
											alert('Failed to create new object, with error code: ' + error.description);
									}        
							})
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function unbindAll(){
	$('.cards *' ).removeAttr('onclick');
	
}
function changeClass1(){
	unbindAll();
    if(document.getElementById("block1").className == "block col-md-2 col-md-offset-3"){
        document.getElementById("back1").className += "gone";
        document.getElementById("image1").className += "show";
        document.getElementById("image2").className += "gone";
        document.getElementById("image3").className += "gone";
    }
    else
        document.getElementById("block").className = "block";
        getData();
    };
function changeClass2(){
		unbindAll();
    if(document.getElementById("block2").className == "block col-md-2"){
        document.getElementById("back2").className += "gone";
        document.getElementById("image1").className += "gone";
        document.getElementById("image2").className += "show";
        document.getElementById("image3").className += "gone";
    }
    else
        document.getElementById("block").className = "block";
        getData();  
    };      
function changeClass3(){
		unbindAll();
    if(document.getElementById("block3").className == "block col-md-2"){
        document.getElementById("back3").className += "gone";
        document.getElementById("image1").className += "gone";
        document.getElementById("image2").className += "gone";
        document.getElementById("image3").className += "show";
    }
    else
        document.getElementById("block").className = "block";
        getData();
    };

function remainCard(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    query.greaterThan("remain",0);
    query.count({
        success: function(count){
            if(count===0)
                setRemainCard();
        },
        error: function(error){
        }
    });
}

function setRemainCard(){
    var card = Parse.Object.extend("Card_info");
    var query = new Parse.Query(card);
    query.ascending("cardno");
    query.find({
        success: function(data){
            var no = [2,12,18,8,18,8,5,18,8,18,8,18,8,5,18,8];
            data.forEach(function (element, index, array){
                var num = Parse.Object.extend('Card_info');
                var n = new num();
                
                n.id = element.id;
                n.save(null,{
                    success: function(n){
                        n.set('remain', no[index]);
                        n.save();
                    }
                });
            });
        },
        error: function(error){
        }
    });
}

function substractCardNum(id){
    var  Card = Parse.Object.extend('Card_info');
		var card = new Card ();
		card.id = id ; 
		card.increment("remain", -1);
		card.save().then(Log,Log);
}
function Log (s){
	console.log(s);
}