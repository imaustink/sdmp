(function(exports){

const MESSAGE_PARTS_REGEX = /SAPI\s(\d\.\d)\s+((?:(?:.+)\s+)+)\s+(.+)/;
const HEADER_SPLIT_REGEX = /^.+:\s+?.+/gm;
const HEADER_REGEX = /(^.+):\s+?(.+)/;

function mergeObject(){
	var out = {};
	for(var i = 0; i < arguments.length; i++){
		for(var j in arguments[i]){
			if(arguments[i].hasOwnProperty(j)){
				var k = arguments[i][j];
				if(typeof k === 'object' && !Array.isArray(k)) k = mergeObject(out[j], k);
				out[j] = k;
			}
		}
	}
	return out;
}

function parseHeaders(rawHeaders){
	let out = {};
	let headers = rawHeaders.match(HEADER_SPLIT_REGEX);
	let length = headers.length;
	for(let i = 0; i < length; i++){
		let header = headers[i].match(HEADER_REGEX);
		if(header){
			out[header[1].toLowerCase()] = header[2];
		}
	}
	return out;
}

function parseBody(rawBody, type){
	if(type === 'json'){
		return JSON.parse(rawBody);
	}
	return rawBody;
}

exports.SAPIMessage = class SAPIMessage{
	constructor(options = {}){
		this.version = options.version || '0.0';
		this.default_headers = options.default_headers || {};
	}

	stringify(headers, body){
		let allHeaders = mergeObject(this.default_headers, headers);

		let message = `SAPI ${this.version}\n\n`;
		for(let h in allHeaders){
			message += `${h}: ${allHeaders[h]}\n`;
		}
		message += `\n\n${typeof body === 'object' ? JSON.stringify(body) : body}`;

		return message;
	}

	static parse(rawMessage){
		let parts = rawMessage.match(MESSAGE_PARTS_REGEX);
		let version = parts[1];
		let headers = parseHeaders(parts[2]);
		let body = parseBody(parts[3], headers.type);
		
		return {
			version,
			headers,
			body
		};
	}
}

})(window);