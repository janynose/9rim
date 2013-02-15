
	var HangulUtil = {
		startCharMap: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
		middleCharMap: ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"],
		finalCharMap: [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
		HangulChar: function(ch) {
			var chCode = this.chCode = ch.charCodeAt(0);
			this.sCode = Math.floor((chCode - 44032 ) / ( 21 * 28));
			this.mCode = Math.floor((chCode - 44032 ) % ( 21 * 28) / 28);
			this.fCode = ((chCode -  44032) % (21 * 28)) % 28;
		},
		remove: function(ch) {
			hc = new this.HangulChar(ch);
			if (hc.fCode > 0) {
				return String.fromCharCode(hc.chCode - hc.fCode); // 종성 삭제
			} else if (hc.mCode >= 0){ // 중성 삭제
				var mCh = this.middleCharMap[hc.mCode];
				switch(mCh) {
					case "ㅘ": case "ㅙ": case "ㅚ":
						hc.mCode = 8;
						break;
					case "ㅝ": case "ㅞ": case "ㅟ":
						hc.mCode = 13;
						break;
					case "ㅢ":
						hc.mCode = 18;
						break;
					default:
						return this.startCharMap[hc.sCode];
				}
				return String.fromCharCode(hc.sCode * 588 + (hc.mCode) * 28 + 44032); // [{(초성)×588}+{(중성)×28}+(종성)]+44032
				
			} else {
				return "";
			}
		}
	};
	