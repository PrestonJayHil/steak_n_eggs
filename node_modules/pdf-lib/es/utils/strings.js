export var toCharCode = function (character) { return character.charCodeAt(0); };
export var toCodePoint = function (character) { return character.codePointAt(0); };
export var toHexStringOfMinLength = function (num, minLength) {
    return padStart(num.toString(16), minLength, '0').toUpperCase();
};
export var toHexString = function (num) { return toHexStringOfMinLength(num, 2); };
export var charFromCode = function (code) { return String.fromCharCode(code); };
export var charFromHexCode = function (hex) { return charFromCode(parseInt(hex, 16)); };
export var padStart = function (value, length, padChar) {
    var padding = '';
    for (var idx = 0, len = length - value.length; idx < len; idx++) {
        padding += padChar;
    }
    return padding + value;
};
export var copyStringIntoBuffer = function (str, buffer, offset) {
    var length = str.length;
    for (var idx = 0; idx < length; idx++) {
        buffer[offset++] = str.charCodeAt(idx);
    }
    return length;
};
export var addRandomSuffix = function (prefix, suffixLength) {
    if (suffixLength === void 0) { suffixLength = 4; }
    return prefix + "-" + Math.floor(Math.random() * Math.pow(10, suffixLength));
};
export var escapeRegExp = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
export var cleanText = function (text) {
    return text.replace(/\t/g, '    ').replace(/[\b\v]/g, '');
};
var buildWordBreakRegex = function (wordBreaks) {
    var escapedRules = ['$'];
    for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
        var wordBreak = wordBreaks[idx];
        if (wordBreak.includes('\n') || wordBreak.includes('\r')) {
            throw new TypeError('`wordBreak` must not include \\n or \\r');
        }
        escapedRules.push(wordBreak === '' ? '.' : escapeRegExp(wordBreak));
    }
    var breakRules = escapedRules.join('|');
    return new RegExp("(\\n|\\r)|((.*?)(" + breakRules + "))", 'gm');
};
export var breakTextIntoLines = function (text, wordBreaks, maxWidth, computeWidthOfText) {
    var regex = buildWordBreakRegex(wordBreaks);
    var words = cleanText(text).match(regex);
    var currLine = '';
    var currWidth = 0;
    var lines = [];
    var pushCurrLine = function () {
        if (currLine !== '')
            lines.push(currLine);
        currLine = '';
        currWidth = 0;
    };
    for (var idx = 0, len = words.length; idx < len; idx++) {
        var word = words[idx];
        if (word === '\n' || word === '\r') {
            pushCurrLine();
        }
        else {
            var width = computeWidthOfText(word);
            if (currWidth + width > maxWidth)
                pushCurrLine();
            currLine += word;
            currWidth += width;
        }
    }
    pushCurrLine();
    return lines;
};
// See section "7.9.4 Dates" of the PDF specification
var dateRegex = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/;
export var parseDate = function (dateStr) {
    var match = dateStr.match(dateRegex);
    if (!match)
        return undefined;
    var year = match[1], _a = match[2], month = _a === void 0 ? '01' : _a, _b = match[3], day = _b === void 0 ? '01' : _b, _c = match[4], hours = _c === void 0 ? '00' : _c, _d = match[5], mins = _d === void 0 ? '00' : _d, _e = match[6], secs = _e === void 0 ? '00' : _e, _f = match[7], offsetSign = _f === void 0 ? 'Z' : _f, _g = match[8], offsetHours = _g === void 0 ? '00' : _g, _h = match[9], offsetMins = _h === void 0 ? '00' : _h;
    // http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
    var tzOffset = offsetSign === 'Z' ? 'Z' : "" + offsetSign + offsetHours + ":" + offsetMins;
    var date = new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secs + tzOffset);
    return date;
};
//# sourceMappingURL=strings.js.map