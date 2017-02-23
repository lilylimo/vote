/*
 * 涣美投票-公共js
 */

//公共滚动条
$("body").on('touchstart',function(e){e.preventDefault();});
$("body input").on("tap",function(){
	$("body").off('touchstart');
	$(this).focus();
})
$("body").on('tap','textarea',function(){
	$("body").off('touchstart');
	$(this).focus();
})

mui.init();
var aniShow = "pop-in";
 //只有ios支持的功能需要在Android平台隐藏；
if (mui.os.android) {
	var list = document.querySelectorAll('.ios-only');
	if (list) {
		for (var i = 0; i < list.length; i++) {
			list[i].style.display = 'none';
		}
	}
	//Android平台暂时使用slide-in-right动画
	if(parseFloat(mui.os.version)<4.4){
		aniShow = "slide-in-right";
	}
}
var webview_style = {
	popGesture: "close"
};
 //主列表点击a事件
mui('body').on('tap', 'a', function() {
	var id = this.getAttribute('href');
	var href = this.href;
	//不使用父子模板方案的页面
		//侧滑菜单需动态控制一下zindex值；
		if (~id.indexOf('offcanvas-')) {
			webview_style.zindex = 9998;
			webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
		}
		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			show: {
				aniShow: aniShow
			},
			waiting: {//页面等待
				autoShow: true
			}
		});
});

function openWindow(url){
	mui.openWindow({
		id: url,
		url: url,
		styles: webview_style,
		show: {
			aniShow: aniShow
		},
		waiting: {//页面等待
			autoShow: true
		}
	});
}

var scroll; Upcount=0;count=0;
	elem = document.getElementById("dataScroll");
	windheight = $(window).height();
	scrollYheight=0;
	datascroll=0;
	status = 0;//0 默认加载状态  1 数据加载锁定  2 数据加载中
	
mui.ready(function() {
	//主界面和侧滑菜单界面均支持区域滚动；
	var $scrollY =  mui('.scrollY');
	if($scrollY.length>0){
		$scrollY.scroll({
			scrollY: true,
			indicators: true,//显示滚动条
			bounce: true,
		});
	}
	var $scrollX =  mui('.scrollX')
	if($scrollX.length>0){
		$scrollX.scroll({
			scrollX: true,
			scrollY: false,
			indicators: false,//显示滚动条
			bounce: true,
		});
	}
	if(elem!=null){
		elem.addEventListener("drag",scrollDrag,false);
		scrollYheight = $('.scrollY').eq(0).height();
	}
});
function scrollDrag(){
		datascroll = elem.getAttribute("data-scroll");
	var	mathscroll = Math.abs(Math.round(datascroll));//滚动调滚动高度
    	elemheight = elem.clientHeight;//当前屏幕的高度
    	uploadheight = parseInt(elemheight - scrollYheight);
    	//console.log(mathscroll+"===="+elemheight +"++++++++"+ scrollYheight)
		//通用上拉加载更多
		if(mathscroll == uploadheight){
			//console.log('1111111111111111111111111111111111111111111111111');
			$(".loadmore").addClass("showLoad");
		}
		if(mathscroll > uploadheight + 40 && mathscroll >= 40){
			var $photoDetailsPop = $("#photoDetailsPop");
			if($photoDetailsPop.length>0){//详情页 下拉查看图文详情
				if($photoDetailsPop.attr("data-id") == 0){
					$photoDetailsPop.attr("data-id","1")
					$(".dragUp span").html("释放后，查看图文详情");
					elem.addEventListener("dragend",showPicDetails,false);
				}
			}else{
				$(".loadmore").addClass("showLoad");
				//console.log('上啦运行');
				loadingStep = 1;
				$(".loadTip").html("拼命加载中...");
				elem.addEventListener("dragend",dragendloadData,false);
			}
		}
		

}
// 上拉加载更多
function dragendloadData(){
	if(loadingStep == 1){
		$(".loading").addClass("loadingAniment");
		loadingStep = 2;
		pullDownAction();
		elem.removeEventListener("dragend",dragendloadData,false);
	}
}

function pullUpSuccess(){//上拉加载成功回调执行
	if(count == 0 ){
		$(".loadmore").removeClass("showLoad");
	}else{
		if(Upcount < count){
			$(".loadTip").html("上拉显示更多");
		}else{
			$(".loadTip").html("没有更多数据");
		}
	}
	//
	//mui('.scrollY').pullRefresh().refresh();
	//mui('.scrollY').scroll().scrollTo(0,0,1);//100毫秒滚动到顶
	$(".loading").removeClass("loadingAniment");
	loadingStep = 0;
}
//加载状态提示 
function loading(){
	$("body").append('<div class="loadingTip"></div>');
}
function removeLoad(){
	$(".loadingTip").remove();
}


//图片放大投票
$("body").on("tap",".minVoteBtn",function(){
	alert("投票成功");
})

//视频播放暂停
$(".playVideo").on("tap",function(){
	var myVideo = document.getElementById("playVideo");
	if (myVideo.paused){
        myVideo.play();
		$(this).animate({"opacity":"0"},500);
	}
    else{
        myVideo.pause();
		$(this).animate({"opacity":"1"},500);
    }
	
});