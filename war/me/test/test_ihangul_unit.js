module('Unit Test Module.');
var iHangul = new ImeHangul();

test("simplePaste", function () {
	
	equals(iHangul.simplePaste("ㄱ", "ㄲ"), "ㄱㄲ");
	equals(iHangul.simplePaste("ㄴ", "ㄴ"), "ㄴㄴ");
	equals(iHangul.simplePaste("ㅏ", "ㅏ"), "ㅏㅏ");
	equals(iHangul.simplePaste("ㄱ", "ㅏ"), "ㄱㅏ");
	equals(iHangul.simplePaste("바", "ㅂ"), "바ㅂ");
});

test("getWordFromJaso", function () {
	
	equals(iHangul.getWordFromJaso("ㄱ", "ㅏ", ""), "가");
	equals(iHangul.getWordFromJaso("ㅎ", "ㅣ", "ㅎ"), "힣");
	equals(iHangul.getWordFromJaso("ㅎ", "ㅏ", ""), "하");
	equals(iHangul.getWordFromJaso("ㅂ", "ㅞ", "ㄺ"), "뷁");
	equals(iHangul.getWordFromJaso("ㅋ", "ㅣ", "ㅎ"), "킿");
});

test("addJasoToAloneJa", function () {
	
	equals(iHangul.addJasoToAloneJa("ㄱ", "ㄱ"), "ㄲ");
	equals(iHangul.addJasoToAloneJa("ㄴ", "ㄴ"), "ㄴㄴ");
	equals(iHangul.addJasoToAloneJa("ㄷ", "ㄷ"), "ㄸ");
	equals(iHangul.addJasoToAloneJa("ㄹ", "ㄱ"), "ㄹㄱ");
	equals(iHangul.addJasoToAloneJa("ㅅ", "ㅅ"), "ㅆ");
	equals(iHangul.addJasoToAloneJa("ㅈ", "ㅈ"), "ㅉ");
	equals(iHangul.addJasoToAloneJa("ㅎ", "ㅎ"), "ㅎㅎ");
	equals(iHangul.addJasoToAloneJa("ㄱ", "ㅏ"), "가");
	equals(iHangul.addJasoToAloneJa("ㄴ", "ㅏ"), "나");
	equals(iHangul.addJasoToAloneJa("ㄱ", "ㅖ"), "계");
	equals(iHangul.addJasoToAloneJa("ㅎ", "ㅣ"), "히");
	equals(iHangul.addJasoToAloneJa("ㅋ", "ㅠ"), "큐");
});

test("addJasoToAloneMo", function () {
	
	equals(iHangul.addJasoToAloneMo("ㅏ", "ㅏ"), "ㅏㅏ");
	equals(iHangul.addJasoToAloneMo("ㅜ", "ㅏ"), "ㅜㅏ");
	equals(iHangul.addJasoToAloneMo("ㅜ", "ㅓ"), "ㅝ");
	equals(iHangul.addJasoToAloneMo("ㅠ", "ㅓ"), "ㅠㅓ");
	equals(iHangul.addJasoToAloneMo("ㅛ", "ㅣ"), "ㅛㅣ");
	equals(iHangul.addJasoToAloneMo("ㅗ", "ㅣ"), "ㅚ");
	equals(iHangul.addJasoToAloneMo("ㅣ", "ㅡ"), "ㅣㅡ");
	equals(iHangul.addJasoToAloneMo("ㅡ", "ㅣ"), "ㅢ");
	equals(iHangul.addJasoToAloneMo("ㅏ", "ㅣ"), "ㅏㅣ");
	equals(iHangul.addJasoToAloneMo("ㅖ", "ㅜ"), "ㅖㅜ");
	equals(iHangul.addJasoToAloneMo("ㅜ", "ㅔ"), "ㅞ");
	equals(iHangul.addJasoToAloneMo("ㅕ", "ㅣ"), "ㅕㅣ");
});

test("addJasoToEmptyFinal", function () {
	
	equals(iHangul.addJasoToEmptyFinal("가", "ㅏ"), "가ㅏ");
	equals(iHangul.addJasoToEmptyFinal("가", "ㄱ"), "각");
	equals(iHangul.addJasoToEmptyFinal("궤", "ㄱ"), "궥");
	equals(iHangul.addJasoToEmptyFinal("귀", "ㅣ"), "귀ㅣ");
	equals(iHangul.addJasoToEmptyFinal("구", "ㅣ"), "귀");
	equals(iHangul.addJasoToEmptyFinal("기", "ㅎ"), "깋");
	equals(iHangul.addJasoToEmptyFinal("랴", "ㄸ"), "랴ㄸ");
	equals(iHangul.addJasoToEmptyFinal("랴", "ㅆ"), "럈");
	equals(iHangul.addJasoToEmptyFinal("랴", "ㅉ"), "랴ㅉ");
	equals(iHangul.addJasoToEmptyFinal("히", "ㅎ"), "힣");
	equals(iHangul.addJasoToEmptyFinal("하", "ㅣ"), "하ㅣ");
	equals(iHangul.addJasoToEmptyFinal("후", "ㅔ"), "훼");
	equals(iHangul.addJasoToEmptyFinal("비", "ㅜ"), "비ㅜ");
	equals(iHangul.addJasoToEmptyFinal("체", "ㅜ"), "체ㅜ");
	equals(iHangul.addJasoToEmptyFinal("그", "ㅣ"), "긔");
});

test("addJasoToWithFinal", function () {
	
	equals(iHangul.addJasoToWithFinal("각", "ㄱ"), "각ㄱ");
	equals(iHangul.addJasoToWithFinal("뷀", "ㄱ"), "뷁");
	equals(iHangul.addJasoToWithFinal("힣", "ㄱ"), "힣ㄱ");
	equals(iHangul.addJasoToWithFinal("힣", "ㅎ"), "힣ㅎ");
	equals(iHangul.addJasoToWithFinal("퀡", "ㄱ"), "퀡ㄱ");
	equals(iHangul.addJasoToWithFinal("돋", "ㄴ"), "돋ㄴ");
	equals(iHangul.addJasoToWithFinal("달", "ㄱ"), "닭");
	equals(iHangul.addJasoToWithFinal("녹", "ㅅ"), "녻");
	equals(iHangul.addJasoToWithFinal("잦", "ㅈ"), "잦ㅈ");
	equals(iHangul.addJasoToWithFinal("갑", "ㅅ"), "값");
	
	equals(iHangul.addJasoToWithFinal("각", "ㅏ"), "가가");
	equals(iHangul.addJasoToWithFinal("갑", "ㅖ"), "가볘");
	equals(iHangul.addJasoToWithFinal("뷁", "ㅏ"), "뷀가");
	equals(iHangul.addJasoToWithFinal("손", "ㅣ"), "소니");
	equals(iHangul.addJasoToWithFinal("힣", "ㅏ"), "히하");
	equals(iHangul.addJasoToWithFinal("힣", "ㅣ"), "히히");
	equals(iHangul.addJasoToWithFinal("훆", "ㅣ"), "후끼");
	equals(iHangul.addJasoToWithFinal("뀄", "ㅠ"), "꿰쓔");
	equals(iHangul.addJasoToWithFinal("웅", "ㅏ"), "우아");
	equals(iHangul.addJasoToWithFinal("밁", "ㅗ"), "밀고");
});

test("removeJasoFromAloneJa", function () {
	
	equals(iHangul.removeJasoFromAloneJa("가", "ㄱ"), "가");
	equals(iHangul.removeJasoFromAloneJa("가", "ㅎ"), "가");
	equals(iHangul.removeJasoFromAloneJa("궭", "ㅋ"), "궭");
	equals(iHangul.removeJasoFromAloneJa("갑", "ㅅ"), "갑");
	equals(iHangul.removeJasoFromAloneJa("사", "ㅆ"), "사ㅅ");
	equals(iHangul.removeJasoFromAloneJa("잦", "ㅉ"), "잦ㅈ");
	equals(iHangul.removeJasoFromAloneJa("ㄱ", "ㅆ"), "ㄱㅅ");
	equals(iHangul.removeJasoFromAloneJa("ㅠ", "ㅇ"), "ㅠ");
	equals(iHangul.removeJasoFromAloneJa("ㅂ", "ㅃ"), "ㅂㅂ");
	equals(iHangul.removeJasoFromAloneJa("", "ㄱ"), "");
	equals(iHangul.removeJasoFromAloneJa("", "ㅃ"), "ㅂ");
	equals(iHangul.removeJasoFromAloneJa("", "ㅎ"), "");
});

test("splitSsangMo", function () {
	
	equals(iHangul.splitSsangMo("ㅏ"), null);
	equals(iHangul.splitSsangMo("ㅖ"), null);
	equals(iHangul.splitSsangMo("ㅠ"), null);
	equals(iHangul.splitSsangMo("ㅣ"), null);
	same(iHangul.splitSsangMo("ㅘ"), ["ㅗ", "ㅏ"]);
	same(iHangul.splitSsangMo("ㅢ"), ["ㅡ", "ㅣ"]);
	same(iHangul.splitSsangMo("ㅞ"), ["ㅜ", "ㅔ"]);
});

test("removeJasoFromAloneMo", function () {
	
	equals(iHangul.removeJasoFromAloneMo("가", "ㅏ"), "가");
	equals(iHangul.removeJasoFromAloneMo("가", "ㅜ"), "가");
	equals(iHangul.removeJasoFromAloneMo("궭", "ㅞ"), "궭ㅜ");
	equals(iHangul.removeJasoFromAloneMo("갑", "ㅘ"), "갑ㅗ");
	equals(iHangul.removeJasoFromAloneMo("사", "ㅣ"), "사");
	equals(iHangul.removeJasoFromAloneMo("잦", "ㅕ"), "잦");
	equals(iHangul.removeJasoFromAloneMo("ㄱ", "ㅑ"), "ㄱ");
	equals(iHangul.removeJasoFromAloneMo("ㅠ", "ㅔ"), "ㅠ");
	equals(iHangul.removeJasoFromAloneMo("ㅂ", "ㅞ"), "ㅂㅜ");
	equals(iHangul.removeJasoFromAloneMo("ㅁ", "ㅖ"), "ㅁ");
	equals(iHangul.removeJasoFromAloneMo("ㅜ", "ㅓ"), "ㅜ");
	equals(iHangul.removeJasoFromAloneMo("ㅞ", "ㅖ"), "ㅞ");
});

test("removeJasoFromEmptyFinal", function () {
	
	equals(iHangul.removeJasoFromEmptyFinal("가", "가"), "각");
	equals(iHangul.removeJasoFromEmptyFinal("가", "궤"), "가구");
	equals(iHangul.removeJasoFromEmptyFinal("달", "기"), "닭");
	equals(iHangul.removeJasoFromEmptyFinal("하", "따"), "하ㄸ");
	equals(iHangul.removeJasoFromEmptyFinal("하", "다"), "핟");
	equals(iHangul.removeJasoFromEmptyFinal("콜", "로"), "콜ㄹ");
	equals(iHangul.removeJasoFromEmptyFinal("미", "워"), "미우");
	equals(iHangul.removeJasoFromEmptyFinal("방", "시"), "방ㅅ");
	equals(iHangul.removeJasoFromEmptyFinal("매", "눠"), "매누");
	equals(iHangul.removeJasoFromEmptyFinal("각", "가"), "각ㄱ");
	
	equals(iHangul.removeJasoFromEmptyFinal("ㄱ", "가"), "ㄱㄱ");
	equals(iHangul.removeJasoFromEmptyFinal("ㄸ", "다"), "ㄸㄷ");
	equals(iHangul.removeJasoFromEmptyFinal("ㄷ", "다"), "ㄷㄷ");
	equals(iHangul.removeJasoFromEmptyFinal("ㅋ", "킈"), "ㅋ크");
	equals(iHangul.removeJasoFromEmptyFinal("ㄴ", "후"), "ㄴㅎ");
	equals(iHangul.removeJasoFromEmptyFinal("ㅎ", "훼"), "ㅎ후");
	equals(iHangul.removeJasoFromEmptyFinal("ㄷ", "돼"), "ㄷ도");
	equals(iHangul.removeJasoFromEmptyFinal("ㅏ", "가"), "ㅏㄱ");
	equals(iHangul.removeJasoFromEmptyFinal("ㅜ", "쿠"), "ㅜㅋ");
	equals(iHangul.removeJasoFromEmptyFinal("ㅚ", "도"), "ㅚㄷ");
});

test("removeJasoFromWithFinal", function () {
	
	equals(iHangul.removeJasoFromWithFinal("가", "갈"), "가가");
	equals(iHangul.removeJasoFromWithFinal("궭", "쀍"), "궭쀌");
	equals(iHangul.removeJasoFromWithFinal("달", "깋"), "달기");
	equals(iHangul.removeJasoFromWithFinal("하", "땅"), "하따");
	equals(iHangul.removeJasoFromWithFinal("하", "닷"), "하다");
	equals(iHangul.removeJasoFromWithFinal("콜", "롮"), "콜롭");
	equals(iHangul.removeJasoFromWithFinal("미", "큭"), "미크");
	equals(iHangul.removeJasoFromWithFinal("방", "실"), "방시");
	equals(iHangul.removeJasoFromWithFinal("", "뒹"), "뒤");
	equals(iHangul.removeJasoFromWithFinal("", "갂"), "가");
	equals(iHangul.removeJasoFromWithFinal("", "쌌"), "싸");
	equals(iHangul.removeJasoFromWithFinal("", "힏"), "히");
	
});