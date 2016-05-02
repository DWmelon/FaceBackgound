var tipUtil = {

	warningTip:function(content){
		var windowWidth = $('html body').width(),
			_left = (windowWidth - 340) / 2;
		var $p = $('<p></p>').html(content).addClass('warning-tip').css({
			left: _left,
			top:"0px",
			position: 'fixed',
			width : "340px",
			height: "35px",
			fontSize:"14px",
			lineHeight: "35px",
			color:"#fff",
			textAlign: "center",
			backgroundColor: "rgb(234,160,0)"
		});

		$('body').append($p);
		window.setTimeout(function(){
			$('body').children('.warning-tip').remove();
		},2500);
	},
	successTip:function(content){
		var windowWidth = $('html body').width(),
			_left = (windowWidth - 340) / 2;
		var $p = $('<p></p>').html(content).addClass('success-tip').css('left',_left);
		$p.css({
			left: _left,
			top:"0px",
			position: 'fixed',
			width : "340px",
			height: "35px",
			fontSize:"14px",
			lineHeight: "35px",
			color:"#fff",
			textAlign: "center",
			backgroundColor: "rgb(66,139,202)",
		});
		$('body').append($p);
		window.setTimeout(function(){
			$('body').children('.success-tip').remove();
		},2500);
	}
}