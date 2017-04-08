const MESSAGE_PARTS_REGEX = /SAPI\s(\d\.\d)\s+((?:(?:.+)\s+)+)\s+(.+)/;
const HEADER_SPLIT_REGEX = /^.+:\s+?.+/gm;
const HEADER_REGEX = /(^.+):\s+?(.+)/;

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

class SAPI{

	constructor(version){
		this.version = version;
	}

	stringify(body, headers){

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

export {SAPI as default};
