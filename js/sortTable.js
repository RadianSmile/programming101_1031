(function(){
var idArr = [] ;

var u = Parse.Object.extend("User_status");
var q =  new Parse.Query (u);
q.include("User");
q.find().then(function(s){
	var arr = [] ;
	for (var i = 0 ; i < s.length ; i++){
		var arr2 = [];
		var ss = s[i];
		var uu = s[i].get("User") ;
		var ID = parseInt(uu.get("ID"));
		console.log (s[i]);
		arr2[0] = uu.get("photo");
		arr2[2] = ID;
		arr2[1] = uu.get("name")+"<span class='uid'>"+ID+"</span>";
		arr2[3] = ss.get("Level");
		arr2[4] = ss.get("XP");
		arr2[5] = ss.get("HP");		
		arr2[6] = ss.get("Life");				
		arr.push(arr2);
	}
	main(arr);
},function (){
	
});

$(document).on('click','.user',function(e){
	e.preventDefault();
	var uid = $(this).find('.uid').first().text();
	document.location="profile.html?uid="+uid;
});



// JavaScript Document
var dataArray;
var attrNum=7;
var attrTypeArr;
var studentNum=15;
var tableDom="#tableArea";
var clickStatusArr;
//main();
function main (array) {
	feedData(array);
	clickStatusArr=new Array()
	for (var i = 0; i < attrNum; i++) {
		clickStatusArr.push(0);
	};
	clickStatusArr[2]=1;
	tableInitialize("ID Number");
	tableBuilder (numSort("ID Number","DESC"),"ID Number");
}
//---------------------------click reaction---------------
$(document).on('click','.table-head th', function(e) {
//$(tableDom).click(function(e) {
  var targetDom=e.target;
	var distinctWord=$(targetDom).text();
	var actualPlace;
	//console.log("enter");
	if (distinctWord.indexOf("▼")!=-1) {
		distinctWord=distinctWord.slice(0,distinctWord.indexOf("▼"));
		actualPlace=attrToPlace(distinctWord);
		//console.log(distinctWord);
		clickStatusArr[actualPlace]=2;
		$(tableDom).empty();
		tableInitialize(distinctWord);
		tableBuilder(numSort(distinctWord,"ASC"),distinctWord);
	}else if (distinctWord.indexOf("▲")!=-1) {
		distinctWord=distinctWord.slice(0,distinctWord.indexOf("▲"));
		actualPlace=attrToPlace(distinctWord);
		//console.log(distinctWord);
		clickStatusArr[actualPlace]=1;
		$(tableDom).empty();
		tableInitialize(distinctWord);
		tableBuilder(numSort(distinctWord,"DESC"),distinctWord);
	}else{
		actualPlace=attrToPlace(distinctWord);
		$.each(clickStatusArr,function(i,value){
			value=0;
		})
		clickStatusArr[actualPlace]=1;
		$(tableDom).empty();
		//console.log(distinctWord);
		tableInitialize(distinctWord);
		tableBuilder(numSort(distinctWord,"DESC"),distinctWord);
	};
});

//---------------------------ranking & coreData-------------------
function feedData (array) {
	dataArray=array;
	studentNum=dataArray.length;
	console.log (dataArray);
	//-----------------------------------------------------
	attrTypeArr=new Array(attrNum);
	attrTypeArr[0]="img";
	attrTypeArr[1]="stay";
	attrTypeArr[2]="stay";
	attrTypeArr[3]="stay";
	attrTypeArr[4]="stay";
	attrTypeArr[5]="addAfter";
	attrTypeArr[6]="sign";
}

function numSort (sortBy,sol) {
	var sortVarArray=new Array();
	var rNum=attrToPlace(sortBy);
	for (var i = 0; i < dataArray.length; i++) {
		sortVarArray.push(dataArray[i][rNum]);
	};
	switch(sol){
		case "ASC":
		sortVarArray.sort(function(a, b){return a-b});
		break;
		case "DESC":
		sortVarArray.sort(function(a, b){return b-a});
		break;
	}
	
	return sortVarArray;
	
}
//---------------------------generate table-----------------------
function tableInitialize (sortBy) {
	var tableHeader;
	var sortPlace=attrToPlace(sortBy);
	var wordArray=new Array(attrNum-1);
	tableHeader=tH("照片");
	wordArray[0]="Name";
	wordArray[1]="ID Number";
	wordArray[2]="Level";
	wordArray[3]="XP";
	wordArray[4]="HP";
	wordArray[5]="Life";
	for (var i = 0; i < wordArray.length; i++) {
		var tmpWord=wordArray[i];
		if (i+1==sortPlace) {
			var status=clickStatusArr[sortPlace];
			switch(status){
				case 1:
					tmpWord+="▼";
				break;
				case 2:
					tmpWord+="▲";
				break;
			}
		};
		tableHeader+=tH(tmpWord);
	};
	$(tableDom).append("<tr class='table-head'>"+tableHeader+"</tr>");
}
function tableBuilder (rankArray,sortBy) {
	var sorting=attrToPlace(sortBy);
	var checkArr=new Array(studentNum);
	for (var k = 0; k < checkArr.length; k++) {
		checkArr[k]=false;
	};
	for (var i = 0; i < rankArray.length; i++) {
		for (var j = 0; j < dataArray.length; j++) {
			if (rankArray[i]==dataArray[j][sorting]) {
				if (!checkArr[j]) {
					rowBuilder(j);
					checkArr[j]=true;
					break;
				};
			};
		};
	};
}

function rowBuilder (serial) {
	var roContent="<tr class='user'>";
	for (var i = 0; i < attrNum; i++) {
		if (attrTypeArr[i]=="img"||attrTypeArr[i]=="stay") {
			roContent+= tD(formatter(attrTypeArr[i],dataArray[serial][i]));
		}else if (attrTypeArr[i]=="addAfter") {
			roContent+= tD(formatter(attrTypeArr[i],dataArray[serial][i]));
		}else if (attrTypeArr[i]=="sign") {
			roContent+= tD(formatter(attrTypeArr[i],dataArray[serial][i]));
		};
		
	};
	roContent+="</tr>";
	$(tableDom).append(roContent);
}
function tH (hContent) {
	return "<th>"+hContent+"</th>"
}
function tD (tContent) {
	return ("<td>"+tContent+"</td>");
}

//----------------transform Data---------------------
function attrToPlace (name) {
	var place=0;
	switch(name){
		case "ID Number":
			place=2;
		break;
		case "Level":
			place=3;
		break;
		case "XP":
			place=4;
		break;
		case "HP":
			place=5;
		break;
		case "Life":
			place=6;
		break;
	}
	return place;
}
function formatter (type,rData) {
	var rItem="";
	switch(type){
		case "img":
			rItem="<img width='50' height='50' src="+rData+" />";
		break;
		case "stay":
			rItem=rData;
		break;
		case "addAfter":
			rItem=rData+"%";
		break;
		case "sign":
			for (var i = 0; i < rData; i++) {
				rItem+="♥";
			};
		break;
	}
	return rItem;
}
/* sort by myself
function singleSort (array,marker) {
	var less=new Array();
	var more=new Array();
	var startPoint=marker+1;
	for (var i = startPoint; i < array.length; i++) {
		var tmpNum=array[i];
		if(array[i]<=array[marker]){	
			less.push(tmpNum);
		}else{
			more.push(tmpNum);
		}
	}
	if (less.length!=0) {
		var cuPlace=0;
		array[less.length+1]=array[marker];
		while(less.length>0){
			array[cuPlace]=less.pop();
			cuPlace++;
		}
		cuPlace=less.length+2;
		while(more.length>0){
			array[cuPlace]=more.pop();
			cuPlace++;
		}
		return marker
	}else if(less.length==0){
		return marker++
	};
	
}

function quickSort(array){
	var marker=0;
	while(marker<=array.length-2){
		marker=singleSort(array,marker);
	}
}
*/
})();