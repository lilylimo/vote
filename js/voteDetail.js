//涣美-投票详情js

//图片放大
$("#auto-loop").lightGallery({
	loop:false,
	auto:false,
	speed: 500,
	pause:500
});

//投票
$(".voteYesBtn").on("tap",function(){
	$(this).addClass("voteYes").html("已投票");
})













