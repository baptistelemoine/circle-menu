function Utils () {
	
	
}

Utils.getRGBfromHex = function (value) {
	
	this.cutHex = function (h) {
    	return (h.charAt(0) === "#") ? h.substring(1, 7) : h;
	}
	this.hexToR = function (h) {
	    return parseInt((this.cutHex(h)).substring(0, 2), 16);
	}
	this.hexToG = function (h) {
	    return parseInt((this.cutHex(h)).substring(2, 4), 16);
	}
	this.hexToB = function (h) {
	    return parseInt((this.cutHex(h)).substring(4, 6), 16);
	}
	this.hexToRGB = function (R, G, B) {
	    return hexToR(R) + hexToG(G) + hexToB(B);
	}

	return this.hexToR(value) +',' + this.hexToG(value) + ',' + this.hexToB(value);
}

Utils.colorToHex = function (value) {
    if (value.substr(0, 1) === '#') {
        return value;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(value);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
}

Utils.hex = function (c) {
	var m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
	return m ? '#' + ( m[1] << 16 | m[2] << 8 | m[3] ).toString(16) : c;
}