const MESSAGE_PARTS_REGEX = /SAPI\s(.+)\s\s([\s\S]+)\s\s([\s\S]+)/;
const HEADER_REGEX = /([^:]*):\s?(.+)/;
const LINE_RETURN_REGEX = /\s/gm;

class SAPI{
  static parseMessage(rawMessage){
    let parts = rawMessage.match(MESSAGE_PARTS_REGEX);
    let version = parts[1];
    let headers = this.parseHeaders(parts[2]);
    let body = this.parseBody(parts[3]);
    
    return {
      version,
      headers,
      body
    };
  }
  
  static parseHeaders(rawHeaders){
    let out = {};
    let headers = rawHeaders.split(LINE_RETURN_REGEX);
    let length = headers.length;
    for(let i = 0; i < length; i++){
      let header = headers[i].match(HEADER_REGEX);
      if(header){
        out[header[1].toLowerCase()] = header[2];
      }
    }
    return out;
  }
  
  static parseBody(rawBody, type){
    if(type === 'json'){
      try{
        return JSON.parse(rawBody);
      }catch(e){
          //TODO don't silence the error
      }
    }
    return rawBody;
  }
}

export {SAPI as default};
