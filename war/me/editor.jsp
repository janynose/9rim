<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>아이폰 사파리용 에디터 프로토타이핑 - 저작권 있음</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link href="http://www.daum.net/favicon.ico" rel="shortcut icon" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
	<meta name="format-detection" content="telephone=no" />
	<link href="http://icon.daum-img.net/mobile/iphone_icon3/cafe.png" rel="apple-touch-icon-precomposed">
	<link rel="stylesheet" type="text/css" href="http://m.cafe.daum.net/_static/css/mobile_common.css?ver=9" />
	<link rel="stylesheet" type="text/css" href="http://m.cafe.daum.net/_static/css/h.css?ver=9" />

${pageContext.request.contextPath}
<%
	String path = "/me";
%>


<!-- 
#set($ver = "1.0.40")
<link rel="stylesheet" href="http://editor.daum.net/mobile/${ver}/css/editor.css" type="text/css"/>
<script language="javascript" type="text/javascript" src="http://editor.daum.net/mobile/${ver}/js/jigu.mobile.min.js"></script>
<script language="javascript" type="text/javascript" src="http://editor.daum.net/mobile/${ver}/js/editor.js"></script>
 -->	

	<link rel="stylesheet" href="<%=path%>/mobileeditor/css/editor.css" type="text/css"  charset="utf-8"/>
	<script language="javascript" type="text/javascript" src="<%=path%>/mobileeditor/js/lib/jigu.mobile.min.js"></script>
	<script language="javascript" type="text/javascript" src="<%=path%>/mobileeditor/js/editor.js"></script>



</head>

<body>

<div id="daumWrap" class="tmp_cafe webkit iphone">
<hr />
<div id="daumContent" class="new_article">
	<form id="writeForm" name="writeForm" class="article" method="post" action="/open.api/Eoy0">
	<fieldset>
		<input type="hidden" name="TOKEN" value="Rk_AUjdwy1T__i_A-BUI-KK7_2dUcx4Exwvtr4AnCInmzeQYi7plBw00" />
		<input type="hidden" name="boardType" value="" />
		<input type="hidden" name="parid" id="parid" value="" />
		<input type="hidden" name="parbbsdepth" id="parbbsdepth" value="" />

		<div class="formitem haslabel" id="wf-board">
	    	<label for="fldid">게시판</label>
	    	<p>
			<select id="fldid" name="fldid" onchange="alert(this.value);">
				<option value="">게시판 선택</option>
							<option value="Eoy0" selected="selected">Event 1. 어플/서비스 개발
				</option>
							<option value="Eoxz">Event 2. API 아이디어
				</option>
							<option value="Eqrj">버그 신고 및 질문
				</option>
							<option value="Eb8d">카페 API References
				</option>
							<option value="EbAb">카페 API 샘플 코드
				</option>
						</select>
		</p>
		</div>
	
			<div id="wf-title" class="formitem haslabel">
			<label for="subject">제목</label>
			<p class="textBox"><input type="text" name="subject" id="subject" class="input_text" maxlength="80" value="" /></p>
		</div>
		<!--<p id="wf-content" class="formitem textBox">-->
		<p>
			<textarea id="content" name="content" rows="4" cols="40" style="width:307px;margin-top:10px;">ㅠㅠ 살려줘요<br />뉴라인<br />비알 ㅠㅠ ㅠㅠ배고파<br />adfasadf as a red red ●♧다음으로<br />안녕녕ㅎㅏㅅ세세 새새로롱로 줄<br />http://naver.com</textarea>
			<!--<style>
				#content { margin-top: 5px; border:1px solid #888; width:307px; }
			</style>
			<textarea name="content" id="content" class="txt_input"></textarea>-->
		</p>
		 		<div id="wf-scrap" class="formitem haslabel">
			<label>스크랩</label>
			<p>
				<input type="radio" name="h_scrappermyn" id="h_scrappermyn1" class="input_radio" value="Y" checked="checked" /> <label for="h_scrappermyn1">허용</label>&nbsp;&nbsp;&nbsp;
				<input type="radio" name="h_scrappermyn" id="h_scrappermyn2" class="input_radio" value="N" /> <label for="h_scrappermyn2">금지</label>
			</p>
		</div>
				<div id="wf-copy" class="formitem haslabel">
			<label>복사</label>
			<p>
				<input type="radio" name="dragpermyn" id="dragpermyn1" class="input_radio" value="Y" checked="checked" class="selected" onclick="" /> <label for="dragpermyn1">허용</label>&nbsp;&nbsp;&nbsp; 
				<!--input type="radio" name="dragpermyn" id="dragpermyn1" class="input_radio" value="Y" checked="checked" class="selected" onclick="daum.$$('.bottombtnbar button', document.body).each(function(item){item.disabled = false;});" /> <label for="dragpermyn1">허용</label--> 
				<input type="radio" name="dragpermyn" id="dragpermyn2" class="input_radio" value="N" onclick="" /> <label for="dragpermyn2">금지</label>
				<!--input type="radio" name="dragpermyn" id="dragpermyn2" class="input_radio" value="N" onclick="daum.$$('.bottombtnbar button', document.body).each(function(item){item.disabled = true;});" /> <label for="dragpermyn2">금지</label-->
			</p>
		</div>
		<div id="wf-map" class="formitem">
			<input type="checkbox" name="mapyn" id="mapyn" value="y" onclick="testOrientation();return false;" />
			<label onclick="testOrientation();">내 위치 첨부</label>
			<p>
				<input type="hidden" name="rcode" id="rcode" /> 
				<input type="hidden" name="mapx" id="mapx" /> 
				<input type="hidden" name="mapy" id="mapy" /> 
				<input type="hidden" name="mapaddress" id="mapaddress" />
			</p>
		</div>
		<div class="content_map">
			<div id="locationAddress" class="preview"></div>
			<span id="locationImage"></span> 
		</div>
					<p id="wf-buttons" class="formitem">
			<input type="button" value="등록" onclick="Editor.submit();" class="irt bt_record3" />&nbsp;
			<input type="button" value="취소" onclick="Editor.clear();" class="irt bt_cancel3" />
		</p>
	</fieldset>
	</form>
</div><!-- // daumContent -->
<div id="daumAd">
<iframe src="http://amsv2.daum.net/ad/adview?secid=0Bm28&amp;replace=viewport.320" name="ad0Bm28" id="ad0Bm28" width="100%" height="35" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" title="광고"></iframe>
</div>

<hr />

<div id="daumFoot">
	<div id="daumMinidaum"></div>
	<address>ⓒ Daum</address>
	<ul>
		<li><a class="pc" href="#" onclick="alert('hello!!');return false;"><span class="on">PC화면</span></a></li>
		<li><a class="top" href="#daumWrap" onclick="window.scrollTo(0, 1); return false;"><span>맨위로</span></a></li>		
	</ul>
</div>
<script type="text/javascript" src="http://go.daum.net/bin/minidaum.cgi?minidaum_mobile=y&amp;js_url=minidaumMobile2010&amp;tracker=off&amp;viewport=320" charset="euc-kr"></script>

<hr />

<div id="daumTotalSearchBack"></div>
<form id="daumTotalSearchLayer" name="daumTotalSearchLayer" action="http://m.search.daum.net/mobile/search">
	<div class="daumTotalSearch_outwrap">
		<div class="daumTotalSearch_midwrap">
			<div class="daumTotalSearch_inwrap">
				<input placeholder="통합검색"  type="search"   name="q" value="" id="query" autocomplete="off" />
				<span id="btnTotalSearchClear" class=""></span>
			</div>
		</div>
				<div id="daumTotalSearchClipWrap">
			<div class="daumTotalSearchClipLeft"></div>
			<div class="daumTotalSearchClipRight"></div>
		</div>
			</div>
	<a href="javascript:;" class="round " id="btnTotalSearch"><span><span>검색</span></span></a>
	<a href="javascript:;" class="round" id="btnTotalSearchClose"><span><span>닫기</span></span></a> 
</form>
<div id="daumTotalSuggestLayer"></div>

</div><!-- // daumWrap -->

<textarea id="modifyContent" style="display:none"><%=request.getParameter("modifyContent")%></textarea>	
<!-- 자동저장 폼 -->
<form action="" target="autosaveFrame" method="post" id="autosaveForm">
	<input type="hidden" name="service" value="" />
	<input type="hidden" name="filename" value="" />
	<input type="hidden" name="asid" value="" />
	<input type="hidden" name="type" value="" />
	<input type="hidden" name="seq" value="" />
	<input type="hidden" name="meta" value="" />
	<input type="hidden" name="contents" value="" />
</form>
<iframe name="autosaveFrame" style="position:absolute; top:-5px; width:1px; height:1px;"></iframe>
<!-- 자동저장 폼 끝 -->
<div style="clear:both; border-bottom:5px dashed red;"></div>
<a id="viewSource" onclick='javascript:document.getElementById("source").value = document.getElementById("panel").innerHTML.trim();' style="margin:6px;text-decoration:underline;">SHOW HTML</a>
<textarea name="source" id="source" rows="10" style="width:290px;font-size:12pt"><span>가나다라&nbsp;</span><img src="http://icon.daum-img.net/top/2010/logo2010.gif" width="120" height="120" style="border:1px solid black"/></textarea>
<!--에디터 로딩 스크립트-->
<script type="text/javascript">
	//document.domain = "daum.net";
		new Editor({
			formId: "writeForm",
			textareaId: "content",
			serviceCode: "cafe",
			avkey: "mobile.cafe_test",
			daumId: daum.getCookie("D_sid"), // 테스트용. 서비스에서 받아야 함
			version: "${ver}",
			autosaveUrl: "http://uf-test.hosts.daum.net/autosave"
		}/*, function(){
			return true;
		}*/);
		Editor.modify({
			content: $("content").value,
			attachments: []
		});
		<%
			if (request.getParameter("editor") == "modify") {
		%>
				Editor.modify({
					content: "<p><span>내용</span><a href='http://www.daum.net'>www.daum.net</a><img src='http://uf-test.hosts.daum.net/image/03126A014C06161821B58D'/></p>",
					attachments: [{attacher: "image", fileName: "03126A014C06161821B58D", imageUrl: "http://uf-test.hosts.daum.net/image/03126A014C06161821B58D", thumUrl: "http://uf-test.hosts.daum.net/T120x120/03126A014C06161821B58D"}]
				});
		<%
			}
		%>

/* //modify text && image 첨부 테스트
	Bronto.Editor.modify({
		content:"<p><span>안녕하세요&nbsp;</span><span>이가영입니다.</span></p>"
	});
	var panel = document.getElementById("panel");
	var data = {
				fname: "jany.jpg",
				url: "http://uf-test.hosts.daum.net/R120x120/03126A014C06161821B58D",
				size: 100
			};
	setTimeout(function(){
		Bronto.Tool.ImageAttacher.onPasteImage(null, data);
	},2000);
*/
</script>
<!-- daum mobile editor -->
<script type="text/javascript">
	
	/**
	 * Editor.submit()을 실행하면 호출됨. 
	 * Form validation이 필요한 경우 정의하여 사용.
	 * @param {Function} editor (== Editor)
	 */
	function isValidForm(editor) {
		if (editor.isEmpty()) {
			alert("내용을 입력하세요.")
			return false;
		}
		if ($("writeForm").subject.value.trim() == "") {
			alert("제목을 입력하세요.")
			return false;
		}
		return true;;
	}
	
	/**
	 * Editor.submit() -> isValidForm() -> 다음에 호출됨.
	 * submit할 때 세팅할 폼필드가 있는 경우 정의하여 사용.
	 * Editor.submit()을 호출하면 글내용은 textarea의 value로 자동 세팅되어 있으므로 생략해도 됨
	 * @param {Function} editor (== Editor)
	 * @example 생성되는 Element
	 * <input type=​"hidden" name=​"useAutosave" value=​"true">​
	 * <input type=​"hidden" name=​"attacher" value=​"image">​
	 * <input type=​"hidden" name=​"fileName" value=​"03126A014C06161821B58D">​
	 * <input type=​"hidden" name=​"imageUrl" value=​"http:​/​/​uf-test.hosts.daum.net/​image/​03126A014C06161821B58D">​
	 * <input type=​"hidden" name=​"thumUrl" value=​"http:​/​/​uf-test.hosts.daum.net/​T120x120/​03126A014C06161821B58D">​
	 */
	function setFormField(editor) {
		// alert(editor.getContent());		// 글 내용
		// console.log(editor.getAttachments());	// 첨부 데이터
		
		var form = editor.elForm;
		if (editor.config.useEditor === true) { // 서버에서 자동저장된글 삭제 여부 판단을 위해
			form.appendChild(daum.createElement("input", {type: "hidden", name: "useAutosave", value: "true"}));
		}
		editor.getAttachments().each(function(data) {
			for (name in data) {
				var hidden = daum.createElement("input", {type: "hidden", name: name, value: data[name]});
				form.appendChild(hidden);
			}
		});
		return true;
	}
	
	
</script>
<button onclick="alert(Editor.getContent())">Editor.getContent</button>
</body>
</html>