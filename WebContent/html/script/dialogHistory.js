var historyData = [
	{
		"id":"10086",
		"type":"1",
		"message":"我是谁？",
		"state":"1",//ture
		"date":"2014-5-20"
	},
	{
		"id":"10010",
		"type":"2",
		"url":"..\/img\/1024_2.jpg",
		"state":"1",
		"date":"2015-12-7"
	},
	{
		"id":"110",
		"type":"3",
		"url":"http:\/\/www.baidu.com",
		"name":"百度地址",
		"state":"1",
		"date":"2014-5-8"
	},
	{
		"id":"10086",
		"type":"1",
		"message":"我是谁？",
		"state":"1",//ture
		"date":"2014-5-20"
	},
	{
		"id":"10010",
		"type":"2",
		"url":"..\/img\/1024_2.jpg",
		"state":"1",
		"date":"2015-12-7"
	},
	{
		"id":"110",
		"type":"3",
		"url":"http:\/\/www.baidu.com",
		"name":"百度地址",
		"state":"1",
		"date":"2014-5-8"
	},
	{
		"id":"10086",
		"type":"1",
		"message":"我是谁？",
		"state":"1",//ture
		"date":"2014-5-20"
	},
	{
		"id":"10010",
		"type":"2",
		"url":"..\/img\/1024_2.jpg",
		"state":"1",
		"date":"2015-12-7"
	},
	{
		"id":"110",
		"type":"3",
		"url":"http:\/\/www.baidu.com",
		"name":"百度地址",
		"state":"1",
		"date":"2014-5-8"
	}
];

$(".send-history").scroll(function(){
	$(".delete-inner-box").fadeOut(500);
})

function dialogMessage(data){
	if(data.length == 0){
		return false;
	}
	for(var i = 0;i<data.length;i++){
		$(".send-history").append(createItem(data[i]));
	}
}

function createItem(data){
	var $itemDiv = $("<div class = 'mass-item'></div>"),
		$contentDiv = $("<div class = 'mass-content'></div>"),
		$titleInfoSpan = $("<span class = 'title-info'></span>"),
		$iconSpan = $("<span class = 'icon'></span>"),
		$titleSpan = $("<span class = 'title'></span>"),
		$sendTips = $("<span class = 'table-cell send-tips'></span"),
		$sendDate = $(" <span class = 'table-cell send-date'></span>"),
		$deleteSend = $("<span class = 'table-cell delete-send'></span>"),
		$deleteBtn = $("<a href='javascript:void(0)'>删除</a>");

	$itemDiv.attr("id",data.id);

	if (data.type == 1){
		$iconSpan.css({
			"background-image":"url("+ "..\/img\/send-type.png" +")",
			"background-repeat:":"no-repeat",
			"background-position":"0 -332px"
		});
		$titleSpan.html("[文字]"+data.message);
	}

	if(data.type == 2){
		var $urlImg = $("<img class = 'sendImgIcon'></img>")
		$urlImg.attr("src",data.url).css({
			"width":"80px",
			"height":"80px"
		});
		$iconSpan.append($urlImg);
		$titleSpan.html("[图片]");
	}

	if(data.type == 3){
		$iconSpan.css({
			"background-image":"url("+ "..\/img\/send-type.png" +")",
			"background-repeat:":"no-repeat",
			"background-position":"0 -152px"
		});

		var $link = $("<a></a>");

		$link.attr("href",data.url).html("[图文信息]"+data.name);

		$titleSpan.append($link);
	}

	console.log($iconSpan);

	if(data.state == 1){
		$sendTips.html("发送成功");
	}else{
		$sendTips.html("发送失败");
	l}

	$deleteBtn.click(function(){
		var item = $(this).parents(".mass-item");
		createDeleteBox(item.attr("id"),item.offset().top - 60);
	})

	$deleteSend.append($deleteBtn);

	$sendDate.html(data.date);

	$titleInfoSpan.append($iconSpan).append($titleSpan);

	$contentDiv.append($titleInfoSpan).append($sendTips).append($sendDate).append($deleteSend);

	$itemDiv.append($contentDiv);

	return $itemDiv;
}

function createDeleteBox(id,pos){
	var $boxDiv = $("<div class = 'delete-inner-box'></div>"),
		$contentDiv = $("<div class = 'delete-inner-content'></div>"),
		$infoDiv = $("<div class = 'delete-info'></div>"),
		$btnDiv = $("<div class = 'select-btn'></div>"),
		$btnConfirmSpan = $("<span class = 'btn confirm-btn'>确定</span>"),
		$btnCancleSpan = $("<span class = 'btn cancle-btn'>取消</span>"),
		$arrowOut = $("<i class = 'delete-arrow delete-arrow-out'></i>"),
		$arrowIn = $("<i class = 'delete-arrow delete-arrow-in'></i>");

	$infoDiv.html("确定删除？该操作只能删除历史消息中的记录，不能删除已经成功发送的消息。");

	$boxDiv.css("top",pos);

	$btnConfirmSpan.click(function(){
		$("#"+id).fadeOut(500).remove();
		$(this).parents(".delete-inner-box").remove();
	})

	$btnCancleSpan.click(function(){
		$(this).parents(".delete-inner-box").remove();
	})

	$btnDiv.append($btnConfirmSpan).append($btnCancleSpan);

	$contentDiv.append($infoDiv).append($btnDiv);

	$boxDiv.append($contentDiv).append($arrowOut).append($arrowIn);

	$("#mass").append($boxDiv);

}