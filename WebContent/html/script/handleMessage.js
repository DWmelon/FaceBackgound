var handleMessage = {
	//检查单图文消息是否符合规则
	checkMessageForOne:function(){
		var topHeight,
			isSuccess = true,
			warningContent;

		//判断正文数目-----start
		var $val = $('#edui1_wordcount').html();
		var i = 5;
		var sum = 0;
		while(1){
			var temp = parseInt($val.charAt(i));
			if(temp || temp == 0){
				sum = sum * 10 + temp;
				i++;
			}else{
				break;
			}
		}
		if(sum > 10000 || sum <= 0){
			isSuccess = false;
			topHeight = (-50) + $('.main-article').offset().top;
			warningContent = '正文不能为空且长度不能超过10000字';
			$('.main-article').find('.fail').show();
		}else{
			//正文内容输入正确
		}
		//判断正文数目-----end

		//判断摘要数目-----start
		if($('.add-summary').find('textarea').val().length > 120){
			isSuccess = false;
			topHeight = (-50) + $('.add-summary').offset().top;
			warningContent = '摘要长度不能超过120字';
			$('.add-summary').find('.fail').show();
		}
		else{
			//摘要输入正确
		}
		//判断摘要数目-----end

		//判断是否附有图片-----start
		if($('.up-load-img').css('display') == 'none'){
			isSuccess = false;
			topHeight = (-50) + $('#upload-from-local').offset().top;
			warningContent = '必须插入一张图片';
			$('#upload-from-local').siblings('.fail').show();
		}else{
			//有插入图片
		}
		//判断是否附有图片-----end

		//判断作者输入是否合法-----start
		if($('#editAuthor').val().length > 8){
			isSuccess = false;
			topHeight = (-50) + $('#editAuthor').offset().top;
			warningContent = '作者不能超过8个字';
			$('#editAuthor').siblings('.fail').show();
		}else{
			//输入正确
		}
		//判断作者输入是否合法-----end

		//判断标题长度-----start
		if($('#editTitle').val().length > 64 || $('#editTitle').val().length <= 0){
			topHeight = (-50) + $('#editTitle').offset().top;
			isSuccess = false;
			warningContent = '标题不能为空且长度不能超过64字';
			$('#editTitle').siblings('.fail').show();
		}
		//判断标题长度-----end

		//判断结束
		if(isSuccess){
			return true;
		}else{
			$('html,body').animate({
				scrollTop:topHeight
			},500);
			tipUtil.warningTip(warningContent);
			return false;
		}
	},
	//检查多图文消息是否符合规则
	checkMessageForMore:function(){
		var topHeight,
			isSuccess = true,
			warningContent,
			editAreaDataLen = editAreaData.length,
			mainContentSuccess = true,//正文是否符合规则
			imgSuccess = true,//图片是否符合规则
			authorSuccess = true,//作者是否符合规则
			titleSuccess = true;//标题是否符合规则

		for(var i = 0; i < editAreaDataLen; i++){
			//判断正文数目-----start
			
			if(editAreaData[i].ueditorValIsRight){
				//正文内容输入正确
			}else{
				isSuccess = false;
				mainContentSuccess = false;
				//topHeight = (-50) + $('.main-article').offset().top;
				warningContent = '正文不能为空且长度不能超过10000字';
				//$('.main-article').find('.fail').show();
			}
			//判断正文数目-----end

			//判断是否附有图片-----start
			if(editAreaData[i].imgUrl && editAreaData[i].imgUrl != ' '){
				//有插入图片
			}else{
				isSuccess = false;
				imgSuccess = false;
				//topHeight = (-50) + $('#upload-from-local').offset().top;
				warningContent = '必须插入一张图片';
				//$('#upload-from-local').siblings('.fail').show();
			}
			//判断是否附有图片-----end

			//判断作者输入是否合法-----start
			if(editAreaData[i].author.length > 8){
				isSuccess = false;
				authorSuccess = false;
				//topHeight = (-50) + $('#editAuthor').offset().top;
				warningContent = '作者不能超过8个字';
				//$('#editAuthor').siblings('.fail').show();
			}else{
				//输入正确
			}
			//判断作者输入是否合法-----end

			//判断标题长度-----start
			if(editAreaData[i].tit.length > 64 || editAreaData[i].tit.length <= 0){
				//topHeight = (-50) + $('#editTitle').offset().top;
				isSuccess = false;
				titleSuccess = false;
				warningContent = '标题不能为空且长度不能超过64字';
				//$('#editTitle').siblings('.fail').show();
			}
			//判断标题长度-----end

			//判断完毕,根据判断结果进行其他操作-----start
			if(isSuccess){
				continue;
			}else{
				//1.移动编辑区-----start
				var marginTop = (i==0) ? 0 : (100 * i)+88;
				$("#edit-area").css("margin-top",marginTop);
				//1.移动编辑区-----end

				//2.显示错误信息-----start
				if(!mainContentSuccess){
					topHeight = $('.main-article-limit').show().offset().top;
				}
				if(!imgSuccess){
					topHeight = $('.img-limit').show().offset().top;
				}
				if(!authorSuccess){
					topHeight = $('.author-limit').show().offset().top;
				}
				if(!titleSuccess){
					topHeight = $('.title-limit').show().offset().top;
				}
				tipUtil.warningTip(warningContent);
				//2.显示错误信息-----end

				//3.滑动窗口，显示错误信息-----start
				$('html,body').animate({
					scrollTop:topHeight-80
				},500);
				$('#detail-info').find('.item').siblings('.now').removeClass('now').end().siblings('.last').removeClass('last').end().eq(i).addClass('now');
				//3.滑动窗口，显示错误信息-----end

				//4.恢复编辑区的数据-----start
				showEditDataByIdx(i);
				//4.恢复编辑区的数据-----end
				break;
			}
			//判断完毕,根据判断结果进行其他操作-----end
		}
		return isSuccess;
	},
	//上传单图文消息给服务器
	uploadMessageForOne:function(){
		//整理要上传的数据-----start
		var editTitle = $('#editTitle').val(),
			editAuthor = $('#editAuthor').val(),
			editImgUrl = $('.up-load-img').children('img').attr('src'),
			editSummary  = $('.add-summary').children('textarea').val(),
			editMainContent = $($("#ueditor_0")[0].contentWindow.document.body).html();
		//整理要上传的数据-----end
		//判断是否是修改还是新建素材
		var sourceId = getRequest().sourceId;
		//如果是修改消息
		if(sourceId){
			getEditData.loading(true);//显示加载中
			//上传数据-----start
			var url = 'http://localhost:8080/MesClouds/UpdateMaterial';
			var message = {
				"material" :{
					"id":sourceId,
					"userId":"1111",
					"publishTime":null,
					"summary" : editSummary,
					"isMulti": "0",
					"materialBody":[
						{
							"materialId":sourceId,
							"title" : editTitle,
							"author" : editAuthor,
							"url" : "http://www.baidu.com",
							"imgUrl" : editImgUrl,
							"isShow" : "1",
							"mainContent" : editMainContent
						}
					]
				}
			};
			var param = {data:JSON.stringify(message)};
			$.post(url,param,function(data){
				//console.log(data);
				getEditData.loading(true);//隐藏加载中的提示
				window.location.href="http://localhost:8080/MesClouds/html/html/source.html"//页面跳转到素材显示主页
			});
		}else{
			//新建消息
			getEditData.loading(true);//显示加载中
			//上传数据-----start
			var url = 'http://localhost:8080/MesClouds/InsertMaterial';
			var message = {
				"material" :{
					"userId":"1111",
					"publishTime":null,
					"summary" : editSummary,
					"isMulti": "0",
					"materialBody":[
						{
							"title" : editTitle,
							"author" : editAuthor,
							"url" : "http://www.baidu.com",
							"imgUrl" : editImgUrl,
							"isShow" : "1",
							"mainContent" : editMainContent
						}
					]
				}
			}

			var param = {data:JSON.stringify(message)};
			$.post(url,param,function(data){
				//console.log(data);
				getEditData.loading(true);//隐藏加载中的提示
				window.location.href="http://localhost:8080/MesClouds/html/html/source.html"//页面跳转到素材显示主页
			})
			//上传数据-----end
		}
	},
	//上传多图文消息给服务器
	uploadMessageForMore:function(){
		//整理要上传的数据-----start
		var editDataLen = editAreaData.length,
			materialArr = new Array(editDataLen);
		for(var i = 0; i < editDataLen; i++){
			var editData = {
				"title" : null,
				"author" : null,
				"url" : null,
				"imgUrl" : null,
				"isShow" : "1",
				"mainContent" : null
			};
			editData.title = editAreaData[i].tit;
			editData.author = editAreaData[i].author;
			editData.url = "www.baidu.com";
			editData.imgUrl = editAreaData[i].imgUrl;
			editData.mainContent = editAreaData[i].ueditor;

			materialArr[i] = editData;//添加到数组当中
			//materialArr.length++;
		}
		//整理要上传的数据-----end

		//上传数据-----start
		getEditData.loading(true);//显示加载中的提示
		var url = 'http://localhost:8080/MesClouds/InsertMaterial';
		var message = {
			"material" :{
				"userId":"1111",
				"publishTime":" 11",
				"summary" : "摘要",
				"isMulti": "1",
				"materialBody":materialArr
			}
		}
		console.log(message);
		var param = {data:JSON.stringify(message)};
		console.log(param);
		$.post(url,param,function(data){
			data = $.parseJSON(data);
			console.log(data);
			getEditData.loading(false);//隐藏加载中的提示
			window.location.href="http://localhost:8080/MesClouds/html/html/source.html"//页面跳转到素材显示主页
		});
		//上传数据-----end
	}
}