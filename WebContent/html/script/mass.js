$(document).ready(function(){
	init();
	//表情索引与名称
	var expresions = {
		"0": "微笑","1": "撇嘴","2": "色","3": "发呆","4": "得意","5": "流泪",
        "6": "害羞","7": "闭嘴","8": "睡","9": "大哭","10": "尴尬","11": "发怒",
        "12": "调皮","13": "呲牙","14": "惊讶","15": "难过","16": "酷","17": "冷汗",
		"18": "抓狂","19": "吐","20": "偷笑","21": "可爱","22": "白眼","23": "傲慢",
		"24": "饥饿","25": "困","26": "惊恐","27": "流汗","28": "憨笑","29": "大兵",
		"30": "奋斗","31": "咒骂","32": "疑问","33": "嘘","34": "晕","35": "折磨","36": 
		"衰","37": "骷髅","38": "敲打","39": "再见","40": "擦汗","41": "抠鼻","42": "鼓掌",
		"43": "糗大了","44": "坏笑","45": "左哼哼","46": "右哼哼","47": "哈欠","48": "鄙视",
		"49": "委屈","50": "快哭了","51": "阴险","52": "亲亲","53": "吓","54": "可怜",
		"55": "菜刀","56": "西瓜","57": "啤酒","58": "篮球","59": "乒乓","60": "咖啡",
		"61": "饭","62": "猪头","63": "玫瑰","64": "凋谢","65": "示爱","66": "爱心","67": "心碎",
		"68": "蛋糕","69": "闪电","70": "炸弹","71": "刀","72": "足球","73": "瓢虫","74": "便便",
		"75": "月亮","76": "太阳","77": "礼物","78": "拥抱","79": "强","80": "弱","81": "握手",
		"82": "胜利","83": "抱拳","84": "勾引","85": "拳头","86": "差劲","87": "爱你","88": "NO",
		"89": "OK","90": "爱情","91": "飞吻","92": "跳跳","93": "发抖","94": "怄火","95": "转圈",
		"96": "磕头","97": "回头","98": "跳绳","99": "挥手","100": "激动","101": "街舞",
		"102": "献吻","103": "左太极","104": "右太极"			
	};
	//制作表情框
	var expre_tab = document.getElementById("expressionBox");
	for(var i = 0;i<105;i++){
		var expre_items = document.createElement("li"),
			itmes_img = document.createElement("i"),
			img_name = expresions[i],
			img_url = "..\/img\/expression.gif";
		expre_items.className = "expre_items";
		expre_items.setAttribute("name",expresions[i]);
		itmes_img.setAttribute("name",i);
		expre_items.onmousemove = function(event){
			var preTarget = this.childNodes[0];
			var preUrl = "..\/img\/icon\/" +preTarget.getAttribute("name") + ".gif";
			$(".pre-img").attr("src",preUrl);
		}//绑定表情mousemove事件
		expre_items.onclick = function(event){
			//复制表情
			var $editArea = $(".text-area") ;
			var preTarget = this.childNodes[0];
			console.log(preTarget);
			var preUrl = "..\/img\/icon\/" +preTarget.getAttribute("name") + ".gif";
			var preName = this.getAttribute("name");
			var img = document.createElement("img");
			img.setAttribute("src", preUrl);
			img.setAttribute("name", preName);
			$editArea.append(img);
			event.stopPropagation();//阻止向doucument冒泡
		}			
		
		itmes_img.className = "itmes_img";
		itmes_img.style.backgroundImage  = 'url'+'('+img_url+')';
		itmes_img.style.backgroundRepeat = "no-repeat";
		itmes_img.style.backgroundPositionX = -i*24 + 'px';
		itmes_img.style.backgroundPositionY = "0px";	
			
		expre_items.appendChild(itmes_img);
		expre_tab.appendChild(expre_items);	
	}
	//console.dir(expre_tab);
	//点击笑脸触发事件
	$(".face-icon").click(function(event){
		var flag = $("#expressionBox").css("display");
		if( flag === "none"){
			$("#expressionBox").fadeIn(500);
			$(".preview-box").fadeIn(500);
		}else{
			$("#expressionBox").fadeOut(500);
			$(".preview-box").fadeOut(500);
		}
		event.stopPropagation();//阻止触发下层的冒泡事件
	});

	$(".mass-news").click(function(){

		$(this).removeClass("no-active").addClass("active");
		$(".mass-already").removeClass("active").addClass("no-active");
		$(".mass-danger").css("display","block");
		$(".mass-edit").css("display","block");
		$(".send-history").css("display","none");

	})

	$(".mass-already").click(function(){

		$(this).removeClass("no-active").addClass("active");
		$(".mass-news").removeClass("active").addClass("no-active");
		$(".mass-danger").css("display","none");
		$(".mass-edit").css("display","none");
		$(".send-history").css("display","block");
	})

	//点击文档页面触发事件
	$(document).click(function(){
		$("#expressionBox").fadeOut(500);
			$(".preview-box").fadeOut(500);
	})

	//防止冒泡事件
	$(".text-area").focus(function(event){
		event.preventDefault();
	})

	//pic-icon点击事件触发
	$(".edit-text").click(function(){
		$(".expression").css("display","block");
		$(".text-area").css("display","block").focus();
		$(".pic-area").css("display","none");
		var $selectPic = $(".edit-active");
		$selectPic.find("i").css("backgroundPositionY",parseInt($selectPic.find("i").css("backgroundPositionY"),10)+30+'px');
		$selectPic.removeClass("edit-active");
		$(".edit-text").find("i").css("backgroundPositionY","-30px");
		$(".edit-text").addClass("edit-active");
	})


	$(".edit-pic").click(function(){
		
		//console.log(imgLoad());
		$.post("../../group",{"id":"1111"},function(data){
			picDate = data.image;
			menuGroud = data.imageGroup;
			
			if(picDate.length == 0){
				$(".select-img-box").html("").append(groupNoneImg());
				initGroud(menuGroud);
			}else{
				initSelectImg();
			}

			
		})

		showPic();
		$(".pic-area").css("display","block");
		$(".text-area").css("display","none");
		$(".expression").css("display","none");
	})

	$(".submit-bnt").click(function(){
		sendMessage();
	})

	setInterval(changeLen, 10)
})



function changeLen(){
	var cloneObj = $(".text-area").clone();
	var nowLen = 0;
	var imgList = cloneObj.find('img');
	var spanList = cloneObj.find('span');
	spanList.remove();
	imgList.remove();
	nowLen = imgList.length*2 + cloneObj.html().length;
	for(var i = 0 ,len = spanList.length;i<len;i++){
		nowLen += spanList.eq(i).html().length;
	}
	if(nowLen <= 600){
		document.getElementsByClassName("print-info")[0].childNodes[0].nodeValue = "您还可以输入";
		$(".text-num").html(600-nowLen).css("color","#333");
	}else{
		document.getElementsByClassName("print-info")[0].childNodes[0].nodeValue = "已超出";
		$(".text-num").html(nowLen-600).css("color","red");
	}
}
function sendMessage(){
	if($(".text-num").css("color") == "rgb(255, 0, 0)"){
		alert("你发送的字数超过限制");
		return false;
	}
	var text = document.getElementsByClassName("text-area")[0];
	var pic = document.getElementsByClassName("pic-area")[0];
	var messages = '';
	var picUrl = null;
	var child = null;
	if(text.childNodes.length == 0&&pic.childNodes.length == 0) {
		alert("您发送的内容不能为空");
	}else{
		for(var i = 0,len = text.childNodes.length;i<len;i++){
			child = text.childNodes[i];	
			if(child.nodeType == 3){
				messages += child.nodeValue; 
			}else{
				console.log(child.nodeName);
				if(child.nodeType == 1){
					if(child.nodeName == 'IMG'){
						messages += '['+child.getAttribute("name") + ']';
					}else{
						messages += child.innerHTML;
					}
				}
			}
			console.log(messages);
		}
	}
	if(pic.childNodes.length != 0){
		picUrl = pic.childNodes[0].getAttribute("src");
	}

	/*$.post("url",{text:"messages",url:"picUrl"},function(data){
		if(data){
			alert("群发消息成功！");
		}else{
			alert("群发消息失败！");
		}
	})*/
	
}



