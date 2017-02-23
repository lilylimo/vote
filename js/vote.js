//涣美-投票js

//电话咨询
$("body").on('tap','.callTel',function(){
	var telNumb = $(this).attr("data-tel");
	location.href=telNumb;
})

//投票按钮样式
$("body").on('tap','.votebtn',function(){
	$(this).addClass("voteYes");
	$(this).html("已投票");
	openCPop("voteTip");
})

//打开弹层方法
function openCPop(id){
	$(".popBg").fadeIn();
	$("#"+id).css("z-index","6").animate({"opacity":"1"},500);
}
//关闭弹层方法
function closeCPop(){
	$(".popBg").fadeOut();
	$(".centerPop").css("z-index","-1").animate({"opacity":"0"},500);
}
//点击问号 打开弹层
$("#openTip").on("tap",function(){
	openCPop("acRule");
});
//点击背景 关闭弹层
$(".popBg").on("tap",function(){
	closeCPop();
});
//点击 关闭弹层
$("#voteTip span").on("tap",function(){
	closeCPop();
});


//打开弹层方法
function openRPop(id){
	$(".rightpopBg").fadeIn();
	$("#"+id).animate({"right":"0"},500);
}
//关闭弹层方法
function closeRPop(){
	$(".rightpopBg").fadeOut();
	$(".rightPop").animate({"right":"-100%"},500);
}
//点击搜搜 打开弹层
$("#openSearch").on("tap",function(){
	openRPop("searchPop");
});
//点击背景 关闭弹层
$(".rightpopBg").on("tap",function(){
	closeRPop();
});

//打开视频弹层
$("body").on("tap",".videoIcon",function(){
	$(".videoPop").fadeIn();
	
})
//关闭视频弹层
$("body").on("tap",".closeVideo",function(){
	$(".videoPop").fadeOut();
})


//投票倒计时
$(".settime").attr("data-time",2017+"-"+02+"-"+04+" "+10+":"+17+":"+00);  //2016-08-30 13:00:00	
updateEndTime();
var updateTime;
function updateEndTime(){
	 var date = new Date();
	 var time = date.getTime();  //当前时间距1970年1月1日之间的毫秒数
	 $(".settime").each(function(){
		 var endDate =this.getAttribute("data-time"); //结束时间字符串
		 //转换为时间日期类型
		 var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, 
		 function (a) {  
		 	return parseInt(a, 10) - 1; 
		 	}).match(/\d+/g) + ')'
		 );
		 var endTime = endDate1.getTime(); //结束时间毫秒数
		 var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
		  if(lag > 0){
			   var second = Math.floor(lag % 60);   
			   var minite = Math.floor((lag / 60) % 60);
			   var hour = Math.floor((lag / 3600) % 24);
			   var day = Math.floor((lag / 3600) / 24);
			   
			   if(second<10){second = "0" + second;}
			   if(minite<10){minite ="0" + minite;}
			   if(hour<10){hour ="0" + hour; }
			   if(day<10){day ="0" + day;}
			   $(this).html('<i>'+day+'</i><b>天</b><i>'+hour+'</i><b>时</b><i>'+minite+'</i><b>分</b><i>'+second+'</i><b>秒</b>');
		  }else{
		  		clearTimeout(updateTime);
		  		$(this).html('<i>00</i><b>天</b><i>00</i><b>时</b><i>00</i><b>分</b><i>00</i><b>秒</b>');
				return false; 
		  }
	 });
	 updateTime =  setTimeout(function(){  updateEndTime()},1000);
	
}

//数据加载
/*$(document).ready(function(){  
    loadMore();  
});   


function pullDownAction(){
	loadMore(); 		
}
var userId =0;
function loadMore()  {  
   	var  $row, iHeight, iTempHeight;  
   	
    for(var i=0; i<6; i++){  
        var fragment = document.createDocumentFragment();
        // 找出当前高度最小的列, 新内容添加到该列  
        iHeight = -1; 
       	$('.voteList li').each(function(){  
        	iTempHeight = $(this).height(); 
        	if(iHeight==-1 || iHeight>iTempHeight) {  
            	iHeight = iTempHeight;  
            	$row = $(this);  
        	}  
//	        	console.log(iTempHeight+"===="+$row.index()+"======"+$(this).find(".voteBox dl").height());
    	});  
    	var round =  Math.round(Math.random()*1+1)
    	var $item = $('<div class="voteBox"><dl><dt><img class="img" src="img/user'+round+'.jpg"><span class="videoIcon"></span><cite id="'+userId+'"  data-title = "1号-李美丽" data-slogan="做真实的自我,用时尚与魅力演绎完美的瞬间。"><span class="picIcon" data-src="img/user1.jpg"></span><span data-src="img/user1.jpg"></span></cite><h3>1号 卜蕾蕾</h3></dt><dd><span class="votebtn">投票</span><label>11票</label></dd></dl></div>');  
    	$row.append($item);  
    	//$item.fadeIn();  
//  	console.log(userId);
    	//放大图片初始化
    	$("#"+userId).lightGallery({
			loop:false,
			auto:false,
			speed: 500,
			pause:500
		});
    	userId = userId+1;
    	
    }  
    
}  
*/

$(".voteList").waterfall({
	    itemClass: ".voteBox",
	    minColCount: 2,
	    spacingHeight: 10,
	    resizeable: true,
	    ajaxCallback: function(success, end) {
	    	$(".loadmore").addClass("showLoad");
	    	$(".loading").addClass("loadingAniment").html("拼命加载中...");
    	    mui.later(function(){
		        for(var i = 0; i < 6; i++) {
			           var round =  Math.round(Math.random()*1+1)
			           console.log(round);
			         var templ = '<div class="voteBox" style="opacity:0;filter:alpha(opacity=0);"><dl><dt><img class="img" src="img/user'+round+'.jpg"><span class="videoIcon"></span><cite data-title = "1号-李美丽" data-slogan="做真实的自我,用时尚与魅力演绎完美的瞬间。"><span class="picIcon" data-src="img/user1.jpg"></span><span data-src="img/user1.jpg"></span></cite><h3>1号 卜蕾蕾</h3></dt><dd><span class="votebtn">投票</span><label>11票</label></dd></dl></div>';
			           $(".voteList").append(templ);
			          
			        }
		        mui.later(function(){
		            success();
		         	end();
		         	$(".loading").removeClass("loadingAniment");
	         	},100)
			       
			       
			    },2000);
    	    }
	    
	});



//页面跳转
$("body").on("tap",".voteBox dl dt img",function(){
	window.location.href="voteDetail.html";	
})


