module('Public Method Test Module.');
var iHangul = new ImeHangul();

test("getMode", function () {
	
	equals(iHangul.getMode(""), 1, "");
	equals(iHangul.getMode("ㄱ"), 2, "ㄱ");
	equals(iHangul.getMode("ㅎ"), 2, "ㅎ");
	equals(iHangul.getMode("ㄹ"), 2, "ㄹ");
	equals(iHangul.getMode("ㅉ"), 2, "ㅉ");
	
	equals(iHangul.getMode("ㅏ"), 3, "ㅏ");
	equals(iHangul.getMode("ㅞ"), 3, "ㅞ");
	equals(iHangul.getMode("ㅖ"), 3, "ㅖ");
	equals(iHangul.getMode("ㅣ"), 3, "ㅣ");
	equals(iHangul.getMode("ㅛ"), 3, "ㅛ");
	
	equals(iHangul.getMode("가"), 4, "가");
	equals(iHangul.getMode("떄"), 4, "떄");
	equals(iHangul.getMode("훼"), 4, "훼");
	equals(iHangul.getMode("히"), 4, "히");
	equals(iHangul.getMode("쮸"), 4, "쮸");
	
	equals(iHangul.getMode("각"), 5, "각");
	equals(iHangul.getMode("힣"), 5, "힣");
	equals(iHangul.getMode("휅"), 5, "휅");
	equals(iHangul.getMode("값"), 5, "값");
	equals(iHangul.getMode("떵"), 5, "떵");
});

test("getWordWithAdd", function () {
	
	equals(iHangul.getWordWithAdd("", "ㄱ"), "ㄱ", "+ㄱ");
	equals(iHangul.getWordWithAdd("", "ㄲ"), "ㄲ", "+ㄲ");
	equals(iHangul.getWordWithAdd("", "ㅎ"), "ㅎ", "+ㅎ");
	equals(iHangul.getWordWithAdd("", "ㅏ"), "ㅏ", "+ㅏ");
	equals(iHangul.getWordWithAdd("", "ㅣ"), "ㅣ", "+ㅣ");
	equals(iHangul.getWordWithAdd("", "ㅖ"), "ㅖ", "+ㅖ");
	
	equals(iHangul.getWordWithAdd("ㄱ", "ㄲ"), "ㄱㄲ", "ㄱ+ㄲ");
	equals(iHangul.getWordWithAdd("ㄴ", "ㄴ"), "ㄴㄴ", "ㄴ+ㄴ");
	equals(iHangul.getWordWithAdd("ㅏ", "ㅏ"), "ㅏㅏ", "ㅏ+ㅏ");
	equals(iHangul.getWordWithAdd("ㄱ", "ㅏ"), "가", "ㄱ+ㅏ");
	equals(iHangul.getWordWithAdd("바", "ㅂ"), "밥", "바+ㅂ");

	equals(iHangul.getWordWithAdd("ㄱ", "ㅏ"), "가", "ㄱ+ㅏ");
	equals(iHangul.getWordWithAdd("히", "ㅎ"), "힣", "히+ㅎ");
	equals(iHangul.getWordWithAdd("ㅎ", "ㅏ"), "하", "ㅎ+ㅏ");
	equals(iHangul.getWordWithAdd("뷀", "ㄱ"), "뷁", "뷀+ㄱ");
	equals(iHangul.getWordWithAdd("키", "ㅎ"), "킿", "키+ㅎ");

	equals(iHangul.getWordWithAdd("ㄱ", "ㄱ"), "ㄲ", "ㄱ+ㄱ");
	equals(iHangul.getWordWithAdd("ㄴ", "ㄴ"), "ㄴㄴ", "ㄴ+ㄴ");
	equals(iHangul.getWordWithAdd("ㄷ", "ㄷ"), "ㄸ", "ㄷ+ㄷ");
	equals(iHangul.getWordWithAdd("ㄹ", "ㄱ"), "ㄹㄱ", "ㄹ+ㄱ");
	equals(iHangul.getWordWithAdd("ㅅ", "ㅅ"), "ㅆ", "ㅅ+ㅅ");
	equals(iHangul.getWordWithAdd("ㅈ", "ㅈ"), "ㅉ", "ㅈ+ㅈ");
	equals(iHangul.getWordWithAdd("ㅎ", "ㅎ"), "ㅎㅎ", "ㅎ+ㅎ");
	equals(iHangul.getWordWithAdd("ㄱ", "ㅏ"), "가", "ㄱ+ㅏ");
	equals(iHangul.getWordWithAdd("ㄴ", "ㅏ"), "나", "ㄴ+ㅏ");
	equals(iHangul.getWordWithAdd("ㄱ", "ㅖ"), "계", "ㄱ+ㅖ");
	equals(iHangul.getWordWithAdd("ㅎ", "ㅣ"), "히", "ㅎ+ㅣ");
	equals(iHangul.getWordWithAdd("ㅋ", "ㅠ"), "큐", "ㅋ+ㅠ");

	equals(iHangul.getWordWithAdd("ㅏ", "ㅏ"), "ㅏㅏ", "ㅏ+ㅏ");
	equals(iHangul.getWordWithAdd("ㅜ", "ㅏ"), "ㅜㅏ", "ㅜ+ㅏ");
	equals(iHangul.getWordWithAdd("ㅜ", "ㅓ"), "ㅝ", "ㅜ+ㅓ");
	equals(iHangul.getWordWithAdd("ㅠ", "ㅓ"), "ㅠㅓ", "ㅠ+ㅓ");
	equals(iHangul.getWordWithAdd("ㅛ", "ㅣ"), "ㅛㅣ", "ㅛ+ㅣ");
	equals(iHangul.getWordWithAdd("ㅗ", "ㅣ"), "ㅚ", "ㅗ+ㅣ");
	equals(iHangul.getWordWithAdd("ㅣ", "ㅡ"), "ㅣㅡ", "ㅣ+ㅡ");
	equals(iHangul.getWordWithAdd("ㅡ", "ㅣ"), "ㅢ", "ㅡ+ㅣ");
	equals(iHangul.getWordWithAdd("ㅏ", "ㅣ"), "ㅏㅣ", "ㅏ+ㅣ");
	equals(iHangul.getWordWithAdd("ㅖ", "ㅜ"), "ㅖㅜ", "ㅖ+ㅜ");
	equals(iHangul.getWordWithAdd("ㅜ", "ㅔ"), "ㅞ", "ㅜ+ㅔ");
	equals(iHangul.getWordWithAdd("ㅕ", "ㅣ"), "ㅕㅣ", "ㅕ+ㅣ");

	equals(iHangul.getWordWithAdd("가", "ㅏ"), "가ㅏ", "가+ㅏ");
	equals(iHangul.getWordWithAdd("가", "ㄱ"), "각", "가+ㄱ");
	equals(iHangul.getWordWithAdd("궤", "ㄱ"), "궥", "궤+ㄱ");
	equals(iHangul.getWordWithAdd("귀", "ㅣ"), "귀ㅣ", "귀+ㅣ");
	equals(iHangul.getWordWithAdd("구", "ㅣ"), "귀", "구+ㅣ");
	equals(iHangul.getWordWithAdd("기", "ㅎ"), "깋", "기+ㅎ");
	equals(iHangul.getWordWithAdd("랴", "ㄸ"), "랴ㄸ", "랴+ㄸ");
	equals(iHangul.getWordWithAdd("랴", "ㅆ"), "럈", "랴+ㅆ");
	equals(iHangul.getWordWithAdd("랴", "ㅉ"), "랴ㅉ", "랴+ㅉ");
	equals(iHangul.getWordWithAdd("히", "ㅎ"), "힣", "히+ㅎ");
	equals(iHangul.getWordWithAdd("하", "ㅣ"), "하ㅣ", "하+ㅣ");
	equals(iHangul.getWordWithAdd("후", "ㅔ"), "훼", "후+ㅔ");
	equals(iHangul.getWordWithAdd("비", "ㅜ"), "비ㅜ", "비+ㅜ");
	equals(iHangul.getWordWithAdd("체", "ㅜ"), "체ㅜ", "체+ㅜ");
	equals(iHangul.getWordWithAdd("그", "ㅣ"), "긔", "그+ㅣ");

	equals(iHangul.getWordWithAdd("각", "ㄱ"), "각ㄱ", "각+ㄱ");
	equals(iHangul.getWordWithAdd("뷀", "ㄱ"), "뷁", "뷀+ㄱ");
	equals(iHangul.getWordWithAdd("힣", "ㄱ"), "힣ㄱ", "힣+ㄱ");
	equals(iHangul.getWordWithAdd("힣", "ㅎ"), "힣ㅎ", "힣+ㅎ");
	equals(iHangul.getWordWithAdd("퀡", "ㄱ"), "퀡ㄱ", "퀡+ㄱ");
	equals(iHangul.getWordWithAdd("돋", "ㄴ"), "돋ㄴ", "돋+ㄴ");
	equals(iHangul.getWordWithAdd("달", "ㄱ"), "닭", "달+ㄱ");
	equals(iHangul.getWordWithAdd("녹", "ㅅ"), "녻", "녹+ㅅ");
	equals(iHangul.getWordWithAdd("잦", "ㅈ"), "잦ㅈ", "잦+ㅈ");
	equals(iHangul.getWordWithAdd("갑", "ㅅ"), "값", "갑+ㅅ");
	
	equals(iHangul.getWordWithAdd("각", "ㅏ"), "가가", "각+ㅏ");
	equals(iHangul.getWordWithAdd("갑", "ㅖ"), "가볘", "갑+ㅖ");
	equals(iHangul.getWordWithAdd("뷁", "ㅏ"), "뷀가", "뷁+ㅏ");
	equals(iHangul.getWordWithAdd("손", "ㅣ"), "소니", "손+ㅣ");
	equals(iHangul.getWordWithAdd("힣", "ㅏ"), "히하", "힣+ㅏ");
	equals(iHangul.getWordWithAdd("힣", "ㅣ"), "히히", "힣+ㅣ");
	equals(iHangul.getWordWithAdd("훆", "ㅣ"), "후끼", "훆+ㅣ");
	equals(iHangul.getWordWithAdd("뀄", "ㅠ"), "꿰쓔", "뀄+ㅠ");
	equals(iHangul.getWordWithAdd("웅", "ㅏ"), "우아", "웅+ㅏ");
	equals(iHangul.getWordWithAdd("밁", "ㅗ"), "밀고", "밁+ㅗ");

	equals(iHangul.getWordWithAdd("가", "ㅏ"), "가ㅏ", "가+ㅏ");
	equals(iHangul.getWordWithAdd("가", "ㄱ"), "각", "가+ㄱ");
	equals(iHangul.getWordWithAdd("궤", "ㄱ"), "궥", "궤+ㄱ");
	equals(iHangul.getWordWithAdd("귀", "ㅣ"), "귀ㅣ", "귀+ㅣ");
	equals(iHangul.getWordWithAdd("구", "ㅣ"), "귀", "구+ㅣ");
	equals(iHangul.getWordWithAdd("기", "ㅎ"), "깋", "기+ㅎ");
	equals(iHangul.getWordWithAdd("랴", "ㄸ"), "랴ㄸ", "랴+ㄸ");
	equals(iHangul.getWordWithAdd("랴", "ㅆ"), "럈", "랴+ㅆ");
	equals(iHangul.getWordWithAdd("랴", "ㅉ"), "랴ㅉ", "랴+ㅉ");
	equals(iHangul.getWordWithAdd("히", "ㅎ"), "힣", "히+ㅎ");
	equals(iHangul.getWordWithAdd("하", "ㅣ"), "하ㅣ", "하+ㅣ");
	equals(iHangul.getWordWithAdd("후", "ㅔ"), "훼", "후+ㅔ");
	equals(iHangul.getWordWithAdd("비", "ㅜ"), "비ㅜ", "비+ㅜ");
	equals(iHangul.getWordWithAdd("체", "ㅜ"), "체ㅜ", "체+ㅜ");
	equals(iHangul.getWordWithAdd("그", "ㅣ"), "긔", "그+ㅣ");
});

test("getWordWithRemove", function () {
	
	equals(iHangul.getWordWithRemove(""), "", "");
	
	equals(iHangul.getWordWithRemove("ㄱ"), "", "ㄱ");
	equals(iHangul.getWordWithRemove("ㅎ"), "", "ㅎ");
	equals(iHangul.getWordWithRemove("ㄲ"), "ㄱ", "ㄲ");
	equals(iHangul.getWordWithRemove("ㄸ"), "ㄷ", "ㄸ");
	equals(iHangul.getWordWithRemove("ㅉ"), "ㅈ", "ㅉ");
	
	equals(iHangul.getWordWithRemove("ㅏ"), "", "ㅏ");
	equals(iHangul.getWordWithRemove("ㅣ"), "", "ㅣ");
	equals(iHangul.getWordWithRemove("ㅢ"), "ㅡ", "ㅢ");
	equals(iHangul.getWordWithRemove("ㅘ"), "ㅗ", "ㅘ");
	equals(iHangul.getWordWithRemove("ㅖ"), "", "ㅖ");
	
	equals(iHangul.getWordWithRemove("가ㄱ"), "가", "가ㄱ");
	equals(iHangul.getWordWithRemove("궤ㄲ"), "궤ㄱ", "궤ㄲ");
	equals(iHangul.getWordWithRemove("쌋ㅅ"), "쌋", "쌋ㅅ");
	equals(iHangul.getWordWithRemove("쌋ㅆ"), "쌋ㅅ", "쌋ㅆ");
	equals(iHangul.getWordWithRemove("노ㅁ"), "노", "노ㅁ");
	equals(iHangul.getWordWithRemove("키ㅎ"), "키", "키ㅎ");
	equals(iHangul.getWordWithRemove("ㄱㅅ"), "ㄱ", "ㄱㅅ");
	equals(iHangul.getWordWithRemove("ㅓㄱ"), "ㅓ", "ㅓㄱ");
	equals(iHangul.getWordWithRemove("우ㄴ"), "우", "우ㄴ");
	equals(iHangul.getWordWithRemove("ㅞㄴ"), "ㅞ", "ㅞㄴ");
	
	equals(iHangul.getWordWithRemove("야ㅑ"), "야", "야ㅑ");
	equals(iHangul.getWordWithRemove("호ㅜ"), "호", "호ㅜ");
	equals(iHangul.getWordWithRemove("퀘ㅢ"), "퀘ㅡ", "퀘ㅢ");
	equals(iHangul.getWordWithRemove("ㄱㅑ"), "ㄱ", "ㄱㅑ");
	equals(iHangul.getWordWithRemove("ㄱㅞ"), "ㄱㅜ", "ㄱㅞ");
	equals(iHangul.getWordWithRemove("ㅎㅖ"), "ㅎ", "ㅎㅖ");
	equals(iHangul.getWordWithRemove("휅ㅠ"), "휅", "휅ㅠ");
	equals(iHangul.getWordWithRemove("뷁ㅢ"), "뷁ㅡ", "뷁ㅢ");
	equals(iHangul.getWordWithRemove("샹ㅏ"), "샹", "샹ㅏ");
	
	equals(iHangul.getWordWithRemove("가가"), "각", "가가");
	equals(iHangul.getWordWithRemove("각가"), "각ㄱ", "각가");
	equals(iHangul.getWordWithRemove("달기"), "닭", "달기");
	equals(iHangul.getWordWithRemove("모스"), "못", "모스");
	equals(iHangul.getWordWithRemove("샤"), "ㅅ", "샤");
	equals(iHangul.getWordWithRemove("쉐"), "수", "쉐");
	equals(iHangul.getWordWithRemove("과"), "고", "과");
	equals(iHangul.getWordWithRemove("힝희"), "힝흐", "힝희");
	equals(iHangul.getWordWithRemove("잉여"), "잉ㅇ", "잉여");
	equals(iHangul.getWordWithRemove("이어"), "잉", "이어");
	equals(iHangul.getWordWithRemove("쿨타"), "쿭", "쿨타");
	equals(iHangul.getWordWithRemove("돼"), "도", "돼");
	equals(iHangul.getWordWithRemove("와따"), "와ㄸ", "와따");
	equals(iHangul.getWordWithRemove("와다"), "왇", "와다");
	equals(iHangul.getWordWithRemove("ㅞ다"), "ㅞㄷ", "ㅞ다");
	equals(iHangul.getWordWithRemove("ㅏ해"), "ㅏㅎ", "ㅏ해");
	equals(iHangul.getWordWithRemove("ㅜ워"), "ㅜ우", "ㅜ워");
	equals(iHangul.getWordWithRemove("ㄱ갸"), "ㄱㄱ", "ㄱ갸");
	equals(iHangul.getWordWithRemove("ㄴ하"), "ㄴㅎ", "ㄴ하");
	
	equals(iHangul.getWordWithRemove("각"), "가", "각");
	equals(iHangul.getWordWithRemove("공각"), "공가", "공각");
	equals(iHangul.getWordWithRemove("한놈"), "한노", "한놈");
	equals(iHangul.getWordWithRemove("녀석"), "녀서", "녀석");
	equals(iHangul.getWordWithRemove("닭닭"), "닭달", "닭닭");
	equals(iHangul.getWordWithRemove("통괄"), "통과", "통괄");
	equals(iHangul.getWordWithRemove("ㄱ한"), "ㄱ하", "ㄱ한");
	equals(iHangul.getWordWithRemove("ㅜ휄"), "ㅜ훼", "ㅜ휄");
	equals(iHangul.getWordWithRemove("ㅞ뷁"), "ㅞ뷀", "ㅞ뷁");
	
});
