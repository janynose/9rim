/**
 * imehangul.js
 * @author azki.
 */
"use strict";
/**
 * ImeHangul
 * public:
 * string getJasoFromKeyCode (int keyCode)
 * 키코드 값(아이폰기준)으로 한글 자소 반환(len:1 or null).
 * string getWordWithAdd (string frontChar, string jaso)
 * 앞글자(len:0~1)와 자소를 붙인 글자 반환(len:0~2).
 * string getWordWithRemove (string frontChar)
 * 글자(len:0~2)를 받아서 자소 1개를 지운다음 반환(len:0~2).
 */
(function() {

var ImeHangul = function () {
	this.init(ImeHangul.prototype);
}.members({
	/***********************************************************/
	/* variable */
	jasoKeyCodeMap: null,
	jasoMap: null,
	jasoArr: [
		["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
		["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"],
		["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
	],
	ssangJaMap: {
		"ㄲ": ["ㄱ", "ㄱ"],
		"ㄸ": ["ㄷ", "ㄷ"],
		"ㅃ": ["ㅂ", "ㅂ"],
		"ㅆ": ["ㅅ", "ㅅ"],
		"ㅉ": ["ㅈ", "ㅈ"],
		"ㄳ": ["ㄱ", "ㅅ"],
		"ㄵ": ["ㄴ", "ㅈ"],
		"ㄶ": ["ㄴ", "ㅎ"],
		"ㄺ": ["ㄹ", "ㄱ"],
		"ㄻ": ["ㄹ", "ㅁ"],
		"ㄼ": ["ㄹ", "ㅂ"],
		"ㄽ": ["ㄹ", "ㅅ"],
		"ㄾ": ["ㄹ", "ㅌ"],
		"ㄿ": ["ㄹ", "ㅍ"],
		"ㅀ": ["ㄹ", "ㅎ"],
		"ㅄ": ["ㅂ", "ㅅ"]
	},
	ssangMoMap: {
		"ㅘ": ["ㅗ", "ㅏ"],
		"ㅙ": ["ㅗ", "ㅐ"],
		"ㅚ": ["ㅗ", "ㅣ"],
		"ㅝ": ["ㅜ", "ㅓ"],
		"ㅞ": ["ㅜ", "ㅔ"],
		"ㅟ": ["ㅜ", "ㅣ"],
		"ㅢ": ["ㅡ", "ㅣ"]
	},
	/* variable */
	/***********************************************************/
	/* private */
	/**
	 * @private
	 * @return {map} "키코드=>자소" 형태의 맵 반환.
	 */
	createJasoKeyCodeMap: function () {
		var i, len, map, jaArr, moArr;
		map = {};
		jaArr = ["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
		len = jaArr.length;
		for (i = 0; i < len; i += 1) {
			map[12593 + i] = jaArr[i];
		}
		moArr = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
		len = moArr.length;
		for (i = 0; i < len; i += 1) {
			map[12623 + i] = moArr[i];
		}
		return map;
	},
	/**
	 * @private
	 * @return {array} "[map(초성=>index),map(중성=>index),map(종성=>index)" 형태의 맵 반환.
	 */
	createJasoMap: function () {
		var map, i, mapIndex, len, charArr, jasoArr;
		map = [{}, {}, {}];
		jasoArr = this.jasoArr;
		for (mapIndex = 0; mapIndex < 3; mapIndex += 1) {
			charArr = jasoArr[mapIndex];
			len = charArr.length;
			for (i = 0; i < len; i += 1) {
				map[mapIndex][charArr[i]] = i;
			}
		}
		return map;
	},
	/**
	 * @private
	 * @param {int} dec 글자 유니코드값 (10진수)
	 * @return {array} array(0=>초성 순번,1=>중성 순번,2=>종성 순번)
	 */
	getJohabDecs: function (dec) {
		var johabDecArr, tmp, hanDec;
		johabDecArr = [0, 0, 0];
		hanDec = dec - 44032;
		johabDecArr[2] = hanDec % 28;
	    tmp = (hanDec - johabDecArr[2]) / 28;
	    johabDecArr[1] = tmp % 21;
	    johabDecArr[0] = (tmp - johabDecArr[1]) / 21;
		return johabDecArr;
	},
	/**
	 * @private
	 * @param {string} ch 글자
	 * @return {array} array(0=>초성형태소,1=>중성형태소,2=>종성형태소)
	 */
	getJohab: function (ch) {
		var johab, i, len, dec, johabDecArr, jasoArr;
		johab = [];
		dec = ch.charCodeAt(0);
		johabDecArr = this.getJohabDecs(dec);
		jasoArr = this.jasoArr;
		len = 3;
		for (i = 0; i < len; i += 1) {
			johab[i] = jasoArr[i][johabDecArr[i]];
		}
		return johab;
	},
	/**
	 * @private
	 * @param {string} firstJaso 초성.
	 * @param {string} secondJaso 중성.
	 * @param {string} thirdJaso 종성.
	 * @return {string} 조합된 글자.
	 */
	getWordFromJaso: function (firstJaso, secondJaso, thirdJaso) {
		var dec, jasoMap;
		jasoMap = this.jasoMap;
		dec = jasoMap[0][firstJaso];
		dec *= 21;
		dec += jasoMap[1][secondJaso];
		dec *= 28;
		dec += jasoMap[2][thirdJaso];
		dec += 44032;
		return String.fromCharCode(dec);
	},
	/**
	 * @private
	 * @param {string} ch 글자.
	 * @return {int} 다섯가지 모드 번호.
	 * mode 1: 글자가 없거나 한글이 아님.
	 * mode 2: 자음하나.
	 * mode 3: 모음하나.
	 * mode 4: 초성+중성.
	 * mode 5: 초성+중성+종성.
	 */
	getMode: function (ch) {
		var dec, johabDecArr;
		if (ch === "") {
			return 1;
		}
		
		try {
			dec = ch.charCodeAt(0);
		} catch(e) {
			return;
		}
		if (12593 <= dec && dec < 12623) {
			return 2;/*자음하나(ㄱ~ㅎ)*/
		}
		if (12623 <= dec && dec < 12644) {
			return 3;/*모음하나(ㅏ~ㅣ)*/
		}
		if (isNaN(dec) || dec < 44032 || 55203 < dec) {
			return 1;/* (dec<"가" or "힣"<dec) */
		}
		johabDecArr = this.getJohabDecs(dec);
		if (johabDecArr[2] === 0) {
			return 4;
		}
		return 5;
	},
	/**
	 * @private
	 * @param {int} mapIndex 형태소 종류(0:초성,1:중성,2:종성).
	 * @param {string} jaso 형태소.
	 * @return {boolean} 형태소인지 여부.
	 */
	isPossibleMorpheme: function (mapIndex, jaso) {
		return jaso in this.jasoMap[mapIndex];
	},
	/**
	 * @private
	 * @param {string} firstJa 첫번째 자음.
	 * @param {string} secondJa 두번째 자음.
	 * @return {string} 조합된 쌍자음.
	 */
	getSsangJa: function (firstJa, secondJa) {
		var ssangJa, ssangJaMap;
		ssangJaMap = this.ssangJaMap;
		for (ssangJa in ssangJaMap) {
			if (ssangJaMap[ssangJa][0] === firstJa && ssangJaMap[ssangJa][1] === secondJa) {
				return ssangJa;
			}
		}
		return null;
	},
	/**
	 * @private
	 * @param {string} jaso 형태소.
	 * @return {boolean} 동일한 쌍 자음인지 여부.
	 */
	isSameSsangJa: function (jaso) {
		var ssangJaMap;
		ssangJaMap = this.ssangJaMap;
		if (jaso in ssangJaMap) {
			return ssangJaMap[jaso][0] === ssangJaMap[jaso][1];
		}
		return false;
	},
	/**
	 * @private
	 * @param {string} jaso 형태소.
	 * @return {array} 개별 자음 두개.
	 */
	splitSsangJa: function (jaso) {
		var ssangJaMap;
		ssangJaMap = this.ssangJaMap;
		if (jaso in ssangJaMap) {
			return [ssangJaMap[jaso][0], ssangJaMap[jaso][1]];//copy.
		}
		return null;
	},
	/**
	 * @private
	 * @param {string} firstMo 첫번째 모음.
	 * @param {string} secondMo 두번째 모음.
	 * @return {string} 조합된 쌍모음.
	 */
	getSsangMo: function (firstMo, secondMo) {
		var ssangMo, ssangMoMap;
		ssangMoMap = this.ssangMoMap;
		for (ssangMo in ssangMoMap) {
			if (ssangMoMap[ssangMo][0] === firstMo && ssangMoMap[ssangMo][1] === secondMo) {
				return ssangMo;
			}
		}
		return null;
	},
	/**
	 * @private
	 * @param {string} jaso 형태소.
	 * @return {array} 개별 모음 두개.
	 */
	splitSsangMo: function (jaso) {
		var ssangMoMap;
		ssangMoMap = this.ssangMoMap;
		if (jaso in ssangMoMap) {
			return [ssangMoMap[jaso][0], ssangMoMap[jaso][1]];//copy.
		}
		return null;
	},
	/**
	 * @private
	 * @param {string} fCh 앞글자.
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	simplePaste: function (fCh, jaso) {
		return fCh + jaso;
	},
	/**
	 * in mode2
	 * @private
	 * @param {string} fCh 자음 형태소.
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	addJasoToAloneJa: function (fCh, jaso) {
		var ssangJa;
		if (this.isPossibleMorpheme(1, jaso)) {/*모음.*/
			/* 초성+중성 형태로 조합.
			 */
			return this.getWordFromJaso(fCh, jaso, "");
		}
		else {/*자음.*/
			/* 쌍자음으로 변환 가능하고, 변환된 쌍자음이 초성으로 가능할 경우 초성을 쌍자음으로 변환. 
			 */
			ssangJa = this.getSsangJa(fCh, jaso);
			if (ssangJa === null || this.isPossibleMorpheme(0, ssangJa) === false) {
				return this.simplePaste(fCh, jaso);
			}
			return ssangJa;
		}
	},
	/**
	 * in mode3
	 * @private
	 * @param {string} fCh 모음 형태소.
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	addJasoToAloneMo: function (fCh, jaso) {
		var ssangMo;
		if (this.isPossibleMorpheme(1, jaso)) {/*모음.*/
			/* 쌍모음으로 변환가능하면 변환.
			 */
			ssangMo = this.getSsangMo(fCh, jaso);
			if (ssangMo === null || this.isPossibleMorpheme(1, ssangMo) === false) {
				return this.simplePaste(fCh, jaso);
			}
			return ssangMo;
		}
		else {/*자음.*/
			/* 초성이 없기 때문에 조합안됨. 
			 */
			return this.simplePaste(fCh, jaso);
		}
	},
	/**
	 * in mode4
	 * @private
	 * @param {string} fCh 초성+중성 으로 이루어진 글자(len:1).
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	addJasoToEmptyFinal: function (fCh, jaso) {
		var johab, ssangMo;
		johab = this.getJohab(fCh);
		if (this.isPossibleMorpheme(1, jaso)) {/*모음.*/
			/* 쌍모음으로 변환가능하면 변환.
			 */
			ssangMo = this.getSsangMo(johab[1], jaso);
			if (ssangMo === null || this.isPossibleMorpheme(1, ssangMo) === false) {
				return this.simplePaste(fCh, jaso);
			}
			return this.getWordFromJaso(johab[0], ssangMo, "");
		}
		else {/*자음.*/
			/* 종성으로 가능한 형태소면 조합.
			 */
			if (this.isPossibleMorpheme(2, jaso)) {
				return this.getWordFromJaso(johab[0], johab[1], jaso);
			}
			return this.simplePaste(fCh, jaso);
		}
	},
	/**
	 * in mode5
	 * @private
	 * @param {string} fCh 초성+중성+종성 으로 이루어진 글자(len:1).
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	addJasoToWithFinal: function (fCh, jaso) {
		var johab, ssangJa, frontCh, rearCh, splitedSsangJa;
		johab = this.getJohab(fCh);
		if (this.isPossibleMorpheme(1, jaso)) {/*모음.*/
			/* 쌍자음이 아닌 종성이면 분리해서 뒷글자로 옮김.
			 * 같은 종류의 쌍자음으로 된 종성이면 분리해서 뒷글자로 옮김.
			 * 다른 종류의 쌍자음으로 된 종성이면 쌍자음을 낱개로 분리해서 두번째 것만 뒷글자로 옮김.
			 */
			splitedSsangJa = this.splitSsangJa(johab[2]);
			if (splitedSsangJa === null || this.isSameSsangJa(johab[2])) {
				frontCh = this.getWordFromJaso(johab[0], johab[1], "");
				rearCh = this.getWordFromJaso(johab[2], jaso, "");
				return frontCh + rearCh;
			}
			frontCh = this.getWordFromJaso(johab[0], johab[1], splitedSsangJa[0]);
			rearCh = this.getWordFromJaso(splitedSsangJa[1], jaso, "");
			return frontCh + rearCh;
		}
		else {/*자음.*/
			/* 종성과 같은 형태소면 조합/분리 없음("각"에서 "ㄱ"을 추가시 "갂"이 되지 않고, "각ㄱ"이 됨).
			 * 쌍자음으로 변환 가능하고, 변환된 쌍자음이 종성으로 가능할 경우 종성을 쌍자음으로 변환.
			 */
			if (johab[2] === jaso) {
				return this.simplePaste(fCh, jaso);
			}
			ssangJa = this.getSsangJa(johab[2], jaso);
			if (ssangJa === null || this.isPossibleMorpheme(2, ssangJa) === false) {
				return this.simplePaste(fCh, jaso);
			}
			return this.getWordFromJaso(johab[0], johab[1], ssangJa);
		}
	},
	/**
	 * in mode2
	 * @private
	 * @param {string} fCh 앞글자(len:0~1).
	 * @param {string} rCh 자음 형태소(len:1).
	 * @return {string} 조합된 글자(len:0~2).
	 */
	removeJasoFromAloneJa: function (fCh, rCh) {
		var splitedSsangJa;
		/* 쌍자음이면 분리 적용.
		 */
		splitedSsangJa = this.splitSsangJa(rCh);
		if (splitedSsangJa === null) {
			return fCh;
		}
		return fCh + splitedSsangJa[0];
	},
	/**
	 * in mode3
	 * @private
	 * @param {string} fCh 앞글자(len:0~1).
	 * @param {string} rCh 모음 형태소(len:1).
	 * @return {string} 조합된 글자(len:0~2).
	 */
	removeJasoFromAloneMo: function (fCh, rCh) {
		var splitedSsangMo;
		/* 쌍모음이면 분리 적용.
		 */
		splitedSsangMo = this.splitSsangMo(rCh);
		if (splitedSsangMo === null) {
			return fCh;
		}
		return fCh + splitedSsangMo[0];
	},
	/**
	 * in mode4
	 * @private
	 * @param {string} fCh 앞글자(len:0~1).
	 * @param {string} rCh 초성+중성 으로 이루어진 글자(len:1).
	 * @return {string} 조합된 글자(len:0~2).
	 */
	removeJasoFromEmptyFinal: function (fCh, rCh) {
		var johab, splitedSsangMo, fChMode;
		/* 중성이 쌍모음이면 분리 변환.
		 * 쌍모음이 아닐때, 앞글자가 초성+중성이거나 초+중+종일 경우 앞글자의 종성과 조합할 수 있으면 조합하고 안되면 중성만 제거.
		 * 쌍모음이 아닐때, 앞글자가 초성+중성이 아니고, 초+중+종이 아닌 경우, 뒷글자의 중성만 제거.
		 */
		johab = this.getJohab(rCh);
		splitedSsangMo = this.splitSsangMo(johab[1]);
		if (splitedSsangMo === null) {
			fChMode = this.getMode(fCh);
			if (3 < fChMode) {/*mode:4 or 5*/
				return this.getWordWithAdd(fCh, johab[0]);
			}
			return fCh + johab[0];/*mode:0 ~ 3*/
		}
		return fCh + this.getWordFromJaso(johab[0], splitedSsangMo[0], "");
	},
	/**
	 * in mode5
	 * @private
	 * @param {string} fCh 앞글자(len:0~1).
	 * @param {string} rCh 초성+중성+종성 으로 이루어진 글자(len:1).
	 * @return {string} 조합된 글자(len:1~2).
	 */
	removeJasoFromWithFinal: function (fCh, rCh) {
		var johab, splitedSsangJa;
		/* 종성이 쌍자음인 경우, 쌍자음이 동일한 자음으로 이루어져 있지 않으면 분리 적용.
		 * 나머지 경우 종성 제거.
		 */
		johab = this.getJohab(rCh);
		splitedSsangJa = this.splitSsangJa(johab[2]);
		if (splitedSsangJa === null || splitedSsangJa[0] === splitedSsangJa[1]) {
			return fCh + this.getWordFromJaso(johab[0], johab[1], "");
		}
		return fCh + this.getWordFromJaso(johab[0], johab[1], splitedSsangJa[0]);
	},
	/* private */
	/***********************************************************/
	/* public */
	/**
	 * @param {int} key 키코드 값.
	 * @return {string} 형태소 반환.(예: "ㄱ", "ㄲ", "ㅏ", "ㅒ")
	 */
	getJasoFromKeyCode: function (key) {
		if (key in this.jasoKeyCodeMap) {
			return this.jasoKeyCodeMap[key];
		}
		return null;
	},
	/**
	 * @param {string} fCh 앞글자(len:0~1).
	 * @param {string} jaso 추가할 형태소.
	 * @return {string} 조합된 글자(len:1~2).
	 */
	getWordWithAdd: function (fCh, jaso) {
		var fChMode;
		fChMode = this.getMode(fCh);
		switch (fChMode) {
		case 1:
			return this.simplePaste(fCh, jaso);
		case 2:
			return this.addJasoToAloneJa(fCh, jaso);
		case 3:
			return this.addJasoToAloneMo(fCh, jaso);
		case 4:
			return this.addJasoToEmptyFinal(fCh, jaso);
		case 5:
			return this.addJasoToWithFinal(fCh, jaso);
		}
	},
	/**
	 * @param {string} ch 두글자(len:2).
	 */
	getWordWithRemove: function (ch) {
		var rChMode, fCh, rCh;
		if (ch.length <= 1) {
			fCh = "";
			rCh = ch;
		}
		else {
			fCh = ch.substr(0, 1);
			rCh = ch.substr(1, 1);
		}
		rChMode = this.getMode(rCh);
		switch (rChMode) {
		case 1:
			return fCh;
		case 2:
			return this.removeJasoFromAloneJa(fCh, rCh);
		case 3:
			return this.removeJasoFromAloneMo(fCh, rCh);
		case 4:
			return this.removeJasoFromEmptyFinal(fCh, rCh);
		case 5:
			return this.removeJasoFromWithFinal(fCh, rCh);
		}
	},
	/* public */
	/***********************************************************/
	/* constructor */
	/**
	 * @constructor
	 * @param {object} myPrototype 클래스 원형(prototype).
	 */
	init: function (myPrototype) {
		/*jasoKeyCodeMap*/
		if (myPrototype.jasoKeyCodeMap === null) {
			myPrototype.jasoKeyCodeMap = this.createJasoKeyCodeMap();
		}
		/*jasoMap*/
		if (myPrototype.jasoMap === null) {
			myPrototype.jasoMap = this.createJasoMap();
		}
	}
	/* constructor */
	/***********************************************************/
});
$B.ImeHangul = ImeHangul; 
})();
