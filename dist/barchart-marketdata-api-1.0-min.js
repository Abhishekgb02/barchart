!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.Barchart||(t.Barchart={})).RealtimeData=e()}}(function(){return function e(t,r,n){function s(i,o){if(!r[i]){if(!t[i]){var u="function"==typeof require&&require;if(!o&&u)return u(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[i]={exports:{}};t[i][0].call(l.exports,function(e){var r=t[i][1][e];return s(r?r:e)},l,l.exports,e,t,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)s(n[i]);return s}({1:[function(e,t,r){t.exports=function(){"use strict";var e={getInstance:function(){var t=window.$||window.jQuery||window.jquery;if(!t)throw new Error("jQuery is required for the browser-based version of Barchart utilities.");return e.getInstance=function(){return t},t}};return e}()},{}],2:[function(e,t,r){var n=e("class.extend");t.exports=function(){"use strict";return n.extend({init:function(){},parse:function(e){if("string"!=typeof e)throw new Error('The "textDocument" argument must be a string.');return this._parse(e)},_parse:function(e){return null},toString:function(){return"[XmlDomParserBase]"}})}()},{"class.extend":41}],3:[function(e,t,r){var n=e("./../XmlDomParserBase");t.exports=function(){"use strict";return n.extend({init:function(){window.DOMParser?this._xmlDomParser=new DOMParser:this._xmlDomParser=null},_parse:function(e){var t;return this._xmlDomParser?t=this._xmlDomParser.parseFromString(e,"text/xml"):(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)),t},toString:function(){return"[XmlDomParser]"}})}()},{"./../XmlDomParserBase":2}],4:[function(e,t,r){var n=e("./websocket/Connection");t.exports=function(){"use strict";return n}()},{"./websocket/Connection":13}],5:[function(e,t,r){var n=e("class.extend");t.exports=function(){"use strict";return n.extend({init:function(){},connect:function(e,t,r){this._connect(e,t,r)},_connect:function(e,t,r){},disconnect:function(){this._disconnect()},_disconnect:function(){},on:function(){this._on.apply(this,arguments)},_on:function(){},off:function(){this._off.apply(this,arguments)},_off:function(){},getMarketState:function(){return this._getMarketState()},_getMarketState:function(){return null},getActiveSymbolCount:function(){return this._getActiveSymbolCount()},_getActiveSymbolCount:function(){return null},getPassword:function(){return this._getPassword()},_getPassword:function(){return null},getUsername:function(){return this._getUsername()},_getUsername:function(){return null},toString:function(){return"[ConnectionBase]"}})}()},{"class.extend":41}],6:[function(e,t,r){var n=e("./http/HistoricalDataProvider");t.exports=function(){"use strict";return n}()},{"./http/HistoricalDataProvider":10}],7:[function(e,t,r){var n=e("class.extend");t.exports=function(){"use strict";return n.extend({init:function(){},getHistoricalData:function(e,t){return this._getHistoricalData(e,t)},_getHistoricalData:function(e,t){return null},toString:function(){return"[HistoricalDataProviderBase]"}})}()},{"class.extend":41}],8:[function(e,t,r){var n=e("./http/ProfileProvider");t.exports=function(){"use strict";return n}()},{"./http/ProfileProvider":11}],9:[function(e,t,r){var n=e("class.extend");t.exports=function(){"use strict";return n.extend({init:function(){},loadProfileData:function(e,t){return this._loadProfileData(e,t)},_loadProfileData:function(e,t){return null},toString:function(){return"[ProfileProviderBase]"}})}()},{"class.extend":41}],10:[function(e,t,r){var n=e("./../../HistoricalDataProviderBase"),s=e("./../../../common/jQuery/jQueryProvider");t.exports=function(){"use strict";var e=s.getInstance();return n.extend({init:function(){},_getHistoricalData:function(t,r){e.ajax({url:"proxies/historicaldata",dataType:"text",data:t}).done(function(e){return r(e)})},toString:function(){return"[HistoricalDataProvider]"}})}()},{"./../../../common/jQuery/jQueryProvider":1,"./../../HistoricalDataProviderBase":7}],11:[function(e,t,r){var n=e("./../../ProfileProviderBase"),s=e("./../../../common/jQuery/jQueryProvider");t.exports=function(){"use strict";var e=s.getInstance();return n.extend({init:function(){},_loadProfileData:function(t,r){e.ajax({url:"proxies/instruments/?lookup="+t.join(","),dataType:"json"}).done(function(e){var t=[];t=200===e.status?e.instruments:[],r(t)})},toString:function(){return"[ProfileProvider]"}})}()},{"./../../../common/jQuery/jQueryProvider":1,"./../../ProfileProviderBase":9}],12:[function(e,t,r){var n=e("./Connection");t.exports=function(){"use strict";return n}()},{"./Connection":4}],13:[function(e,t,r){var n=e("./../../ConnectionBase"),s=e("./../../../marketState/MarketState"),a=e("./../../../messageParser/parseMessage"),i=e("./../../../common/jQuery/jQueryProvider");t.exports=function(){"use strict";var e=4,t=i.getInstance(),r=function(){function r(e,t){var r=D.pop();return r?r.id==e?(r.symbols.push(t),void D.push(r)):(D.push(r),void D.push({id:e,symbols:[t]})):void D.push({id:e,symbols:[t]})}function n(e,t){var r;switch(e){case"events":r=_.events;break;case"marketDepth":r=_.marketDepth[t.symbol];break;case"marketUpdate":r=_.marketUpdate[t.symbol];break;case"timestamp":r=_.timestamp}if(r)for(var n=0;n<r.length;n++)r[n](t)}function i(e,t,s){x||I!==!0&&(E.username=t,E.password=s,E.server=e,window.WebSocket?(k="DISCONNECTED",x=new WebSocket("wss://"+E.server+"/jerq"),x.onclose=function(e){console.warn(new Date+" connection closed."),x=null,"LOGGED_IN"==k&&(k="DISCONNECTED",n("events",{event:"disconnect"}),setTimeout(function(){x=null,i(E.server,E.username,E.password);for(var e in w)r("MU_GO",e);for(var e in T)r("MD_GO",e)},5e3))},x.onmessage=function(e){N.push(e.data)},x.onopen=function(e){console.log(new Date+" connection open.")}):(console.warn("Websockets are not supported by this browser. Invoking refreshing quotes."),setTimeout(P,1e3)))}function o(){k="DISCONNECTED",null!==x&&(x.send("LOGOUT\r\n"),x.close(),x=null),C=[],S=[],T={},w={}}function u(t){if("DISCONNECTED"==k&&(k="CONNECTING"),"CONNECTING"==k)for(var r=t.split("\n"),s=0;s<r.length;s++)if("+++"==r[s])return k="LOGGING_IN",void C.push("LOGIN "+E.username+":"+E.password+" VERSION="+e+"\r\n");"LOGGING_IN"==k&&("+"==t.substr(0,1)?(k="LOGGED_IN",n("events",{event:"login success"})):"-"==t.substr(0,1)&&(o(),k="LOGIN_FAILED",n("events",{event:"login fail"}))),"LOGGED_IN"==k&&S.push(t)}function c(){return O}function l(){return E.password}function d(){return E.username}function m(){if(arguments.length<2)throw new Error("Bad number of arguments. Must pass in an evnetId and handler.");var e=arguments[0],t=arguments[1];switch(e){case"events":for(var n=0;n<_.events.length;n++)_.events[n]==t&&_.events.splice(n,1);break;case"marketDepth":if(arguments.length<3)throw new Error("Bad number of arguments. For marketUpdate events, please specify a symbol. on('marketUpdate', handler, symbol).");var s=arguments[2];if(!_.marketDepth[s])return;for(var n=0;n<_.marketDepth[s].length;n++)_.marketDepth[s][n]==t&&_.marketDepth[s].splice(n,1);_.marketDepth[s]&&0!==_.marketDepth[s].length||(delete _.marketDepth[s],delete T[s],r("MD_STOP",s));break;case"marketUpdate":if(arguments.length<3)throw new Error("Bad number of arguments. For marketUpdate events, please specify a symbol. on('marketUpdate', handler, symbol).");var s=arguments[2];if(!_.marketUpdate[s])return;for(var n=0;n<_.marketUpdate[s].length;n++)_.marketUpdate[s][n]==t&&_.marketUpdate[s].splice(n,1);_.marketUpdate[s]&&0!==_.marketUpdate[s].length||(delete _.marketUpdate[s],delete w[s],r("MU_STOP",s))}}function p(){if(arguments.length<2)throw new Error("Bad number of arguments. Must pass in an evnetId and handler.");var e=arguments[0],t=arguments[1];switch(e){case"events":for(var n=!0,s=0;s<_.events.length;s++)_.events[s]==t&&(n=!1);n&&_.events.push(t);break;case"marketDepth":if(arguments.length<3)throw new Error("Bad number of arguments. For marketUpdate events, please specify a symbol. on('marketUpdate', handler, symbol).");var a=arguments[2];T[a]||(r("MD_GO",a),T[a]=!0),_.marketDepth[a]||(_.marketDepth[a]=[]);for(var n=!0,s=0;s<_.marketDepth[a].length;s++)_.marketDepth[a][s]==t&&(n=!1);n&&_.marketDepth[a].push(t);var i=c().getBook(a);i&&t({type:"INIT",symbol:a});break;case"marketUpdate":if(arguments.length<3)throw new Error("Bad number of arguments. For marketUpdate events, please specify a symbol. on('marketUpdate', handler, symbol).");var a=arguments[2];w[a]||(r("MU_GO",a),w[a]=!0),_.marketUpdate[a]||(_.marketUpdate[a]=[]);for(var n=!0,s=0;s<_.marketUpdate[a].length;s++)_.marketUpdate[a][s]==t&&(n=!1);n&&_.marketUpdate[a].push(t);var o=c().getQuote(a);o&&t({type:"INIT",symbol:a});break;case"timestamp":for(var n=!0,s=0;s<_.timestamp.length;s++)_.timestamp[s]==t&&(n=!1);n&&_.timestamp.push(t)}}function f(e){var t;try{if(t=a(e),t.type)switch(O.processMessage(t),t.type){case"BOOK":n("marketDepth",t);break;case"TIMESTAMP":n("timestamp",O.getTimestamp());break;default:n("marketUpdate",t)}else console.log(e)}catch(r){console.error(r),console.log(t),console.trace()}}function v(){for(var e=C.shift();e;)console.log(e),x.send(e),e=C.shift();setTimeout(v,200)}function h(){for(var e=!1,t=9;!e;){var r=S.shift();if(r){var n=!1,s=1,a=-1,i=r.indexOf(""),o=r.indexOf("\n");if(o>-1&&(i<0||o<i)?(a=o,s=2):i>-1&&(a=i),a>-1){var u=a+1;if(1==s&&(r.length<a+t+1?(S.length>0?S[0]=r+S[0]:(S.unshift(r),e=!0),n=!0):""==r.substr(a+1,1)&&(u+=t+1)),!n){var c=r.substring(0,u);2==s?c=c.trim():(a=c.indexOf(""),a>0&&(c=c.substring(a))),c.length>0&&f(c),r=r.substring(u),r.length>0&&(S.length>0?S[0]=r+S[0]:S.unshift(r))}}else r.length>0&&(S.length>0?S[0]=r+S[0]:(S.unshift(r),e=!0))}else e=!0;0===S.length&&(e=!0)}setTimeout(h,125)}function b(){for(var e=N.shift();e;)e&&u(e),e=N.shift();setTimeout(b,125)}function g(){if("LOGGED_IN"==k)for(;D.length>0;){var e=D.shift(),t="",r="";switch(e.id){case"MD_GO":t="GO",r="Bb";break;case"MU_GO":t="GO",r="SsV";break;case"MD_STOP":t="STOP",r="Bb";break;case"MU_STOP":t="STOP",r="Ss"}for(var n=t+" ",s=0;s<e.symbols.length;s++)s>0&&(n+=","),n+=e.symbols[s]+"="+r;C.push(n)}setTimeout(g,250)}function P(){var e=[];for(var r in w)e.push(r);t.ajax({url:"quotes.php?username="+E.username+"&password="+E.password+"&symbols="+e.join(",")}).done(function(e){t(e).find("QUOTE").each(function(){f("%"+this.outerHTML)})}),setTimeout(P,5e3)}function y(){var e={};for(var t in w)w[t]===!0&&(e[t]=!0);for(var t in T)T[t]===!0&&(e[t]=!0);return Object.keys(e).length}e=4;var k="DISCONNECTED",I=!1,T={},w={},D=[],C=[],x=null,S=[],O=new s,N=[],_={events:[],marketDepth:{},marketUpdate:{},timestamp:[]},E={username:null,password:null,server:null};return setTimeout(v,200),setTimeout(b,125),setTimeout(g,250),setTimeout(h,125),{connect:function(e,t,r){return I=!1,i(e,t,r),this},disconnect:function(){return I=!0,o(),this},getMarketState:c,getPassword:l,getUsername:d,off:m,on:p,getActiveSymbolCount:y}};return n.extend({init:function(){this._wrapppedConnection=new r},_connect:function(e,t,r){this._wrapppedConnection.connect(e,t,r)},_disconnect:function(){this._wrapppedConnection.disconnect()},_on:function(){this._wrapppedConnection.on.apply(this._wrapppedConnection,arguments)},_off:function(){this._wrapppedConnection.off.apply(this._wrapppedConnection,arguments)},_getMarketState:function(){return this._wrapppedConnection.getMarketState()},_getActiveSymbolCount:function(){return this._wrapppedConnection.getActiveSymbolCount()},_getPassword:function(){return this._wrapppedConnection.getPassword()},_getUsername:function(){return this._wrapppedConnection.getUsername()},toString:function(){return"[ConnectionBase]"}})}()},{"./../../../common/jQuery/jQueryProvider":1,"./../../../marketState/MarketState":16,"./../../../messageParser/parseMessage":21,"./../../ConnectionBase":5}],14:[function(e,t,r){var n=e("./../connection/HistoricalDataProvider");t.exports=function(){"use strict";return n}()},{"./../connection/HistoricalDataProvider":6}],15:[function(e,t,r){var n=e("./connection/index"),s=e("./historicalData/index"),a=e("./marketState/index"),i=e("./messageParser/index"),o=e("./util/index");t.exports=function(){"use strict";return{Connection:n,historicalData:s,HistoricalData:s,MarketState:a,MessageParser:i,messageParser:i,Util:o,util:o}}()},{"./connection/index":12,"./historicalData/index":14,"./marketState/index":19,"./messageParser/index":20,"./util/index":28}],16:[function(e,t,r){var n=e("./Profile"),s=e("./Quote"),a=e("./../util/convertDayCodeToNumber"),i=e("./../connection/ProfileProvider");t.exports=function(){"use strict";var e=function(){var e,t={},r={},o={},u=new i,c=function(e,t){var r=function(e){for(var r=0;r<e.length;r++){var s=e[r];200===s.status&&new n(s.lookup,s.symbol_description,s.exchange_channel,s.base_code.toString(),s.point_value,s.tick_increment)}t()};u.loadProfileData(e,r)},l=function(e){return t[e]||(t[e]={symbol:e,bids:[],asks:[]}),t[e]},d=function(e){return o[e]||(o[e]=new s,o[e].symbol=e),o[e]},m=function(t){if("TIMESTAMP"==t.type)return void(e=t.timestamp);if("BOOK"==t.type){var r=l(t.symbol);return r.asks=t.asks,void(r.bids=t.bids)}var s=n.prototype.Profiles[t.symbol];if(!s&&"REFRESH_QUOTE"!=t.type)return console.warn("No profile found for "+t.symbol),void console.log(t);var i=d(t.symbol);if(!i.day&&t.day&&(i.day=t.day,i.dayNum=a(i.day)),i.day&&t.day){var o=a(t.day);(o>i.dayNum||i.dayNum-o>5)&&(i.day=t.day,i.dayNum=o,i.flag="p",i.bidPrice=0,i.bidSize=void 0,i.askPrice=void 0,i.askSize=void 0,i.settlementPrice?i.previousPrice=i.settlementPrice:i.lastPrice&&(i.previousPrice=i.lastPrice),i.lastPrice=void 0,i.tradePrice=void 0,i.tradeSize=void 0,i.numberOfTrades=void 0,i.openPrice=void 0,i.highPrice=void 0,i.lowPrice=void 0,i.volume=void 0)}switch(t.type){case"HIGH":i.highPrice=t.value;break;case"LOW":i.lowPrice=t.value;break;case"OPEN":i.flag=void 0,i.openPrice=t.value,i.highPrice=t.value,i.lowPrice=t.value,i.lastPrice=t.value;break;case"OPEN_INTEREST":i.openInterest=t.value;break;case"REFRESH_DDF":switch(t.subrecord){case"1":case"2":case"3":i.message=t,null===t.openPrice?i.openPrice=void 0:t.openPrice&&(i.openPrice=t.openPrice),null===t.highPrice?i.highPrice=void 0:t.highPrice&&(i.highPrice=t.highPrice),null===t.lowPrice?i.lowPrice=void 0:t.lowPrice&&(i.lowPrice=t.lowPrice),null===t.lastPrice?i.lastPrice=void 0:t.lastPrice&&(i.lastPrice=t.lastPrice),null===t.bidPrice?i.bidPrice=void 0:t.bidPrice&&(i.bidPrice=t.bidPrice),null===t.askPrice?i.askPrice=void 0:t.askPrice&&(i.askPrice=t.askPrice),null===t.previousPrice?i.previousPrice=void 0:t.previousPrice&&(i.previousPrice=t.previousPrice),null===t.settlementPrice?(i.settlementPrice=void 0,"s"==i.flag&&(i.flag=void 0)):t.settlementPrice&&(i.settlementPrice=t.settlementPrice),null===t.volume?i.volume=void 0:t.volume&&(i.volume=t.volume),null===t.openInterest?i.openInterest=void 0:t.openInterest&&(i.openInterest=t.openInterest),"1"==t.subsrecord&&(i.lastUpdate=t.time)}break;case"REFRESH_QUOTE":s=new n(t.symbol,t.name,t.exchange,t.unitcode,t.pointValue,t.tickIncrement),i.message=t,i.flag=t.flag,i.mode=t.mode,i.lastUpdate=t.lastUpdate,i.bidPrice=t.bidPrice,i.bidSize=t.bidSize,i.askPrice=t.askPrice,i.askSize=t.askSize,i.lastPrice=t.lastPrice,i.tradeSize=t.tradeSize,i.numberOfTrades=t.numberOfTrades,i.previousPrice=t.previousPrice,i.settlementPrice=t.settlementPrice,i.openPrice=t.openPrice,i.highPrice=t.highPrice,i.lowPrice=t.lowPrice,i.volume=t.volume,i.openInterest=t.openInterest,t.tradeTime?i.time=t.tradeTime:t.timeStamp&&(i.time=t.timeStamp);break;case"SETTLEMENT":i.lastPrice=t.value,i.settlement=t.value,"D"==t.element&&(i.flag="s");break;case"TOB":i.bidPrice=t.bidPrice,i.bidSize=t.bidSize,i.askPrice=t.askPrice,i.askSize=t.askSize,t.time&&(i.time=t.time);break;case"TRADE":for(i.tradePrice=t.tradePrice,i.lastPrice=t.tradePrice,t.tradeSize&&(i.tradeSize=t.tradeSize,i.volume+=t.tradeSize),i.ticks.push({price:i.tradePrice,size:i.tradeSize});i.ticks.length>50;)i.ticks.shift();i.numberOfTrades||(i.numberOfTrades=0),i.numberOfTrades++,t.time&&(i.time=t.time),i.flag=void 0;break;case"TRADE_OUT_OF_SEQUENCE":i.volume+=t.tradeSize;break;case"VOLUME":i.volume=t.value;break;case"VOLUME_YESTERDAY":break;case"VWAP":i.vwap1=t.value;break;default:console.error("Unhandled Market Message:"),console.log(t)}};return{getBook:function(e){return t[e]},getCVol:function(e){return r[e]},getProfile:function(e,t){var r=n.prototype.Profiles[e];r?t(r):c([e],function(){r=n.prototype.Profiles[e],t(r)})},getQuote:function(e){return o[e]},getTimestamp:function(){return e},processMessage:m}};return e.Profile=n,e.Quote=s,e}()},{"./../connection/ProfileProvider":8,"./../util/convertDayCodeToNumber":26,"./Profile":17,"./Quote":18}],17:[function(e,t,r){var n=e("./../util/parseSymbolType"),s=e("./../util/priceFormatter");t.exports=function(){"use strict";var e=function(t,r,s,a,i,o){this.symbol=t,this.name=r,this.exchange=s,this.unitCode=a,this.pointValue=i,this.tickIncrement=o;var u=n(this.symbol);u&&"future"===u.type&&(this.root=u.root,this.month=u.month,this.year=u.year),e.prototype.Profiles[t]=this};return e.prototype.Profiles={},e.prototype.PriceFormatter=function(t,r,n){var a=s(t,r,n).format;e.prototype.formatPrice=function(e){return a(e,this.unitCode)}},e.prototype.PriceFormatter("-",!0),e}()},{"./../util/parseSymbolType":30,"./../util/priceFormatter":31}],18:[function(e,t,r){t.exports=function(){"use strict";return function(){this.symbol=null,this.message=null,this.flag=null,this.mode=null,this.day=null,this.dayNum=0,this.session=null,this.lastUpdate=null,this.bidPrice=null,this.bidSize=null,this.askPrice=null,this.askSize=null,this.lastPrice=null,this.tradePrice=null,this.tradeSize=null,this.numberOfTrades=null,this.vwap1=null,this.vwap2=null,this.settlementPrice=null,this.openPrice=null,this.highPrice=null,this.lowPrice=null,this.volume=null,this.openInterest=null,this.previousPrice=null,this.time=null,this.ticks=[]}}()},{}],19:[function(e,t,r){var n=e("./MarketState");t.exports=function(){"use strict";return n}()},{"./MarketState":16}],20:[function(e,t,r){var n=e("./parseMessage"),s=e("./parseTimestamp"),a=e("./parseValue");t.exports=function(){"use strict";return{parseMessage:n,parseTimestamp:s,parseValue:a,Parse:n,ParseTimestamp:s,ParseValue:a}}()},{"./parseMessage":21,"./parseTimestamp":22,"./parseValue":23}],21:[function(e,t,r){var n=e("./../common/xml/XmlDomParser"),s=e("./parseValue"),a=e("./parseTimestamp");t.exports=function(){"use strict";return function(e){var t={message:e,type:null};switch(e.substr(0,1)){case"%":var r;try{var i=new n;r=i.parse(e.substring(1))}catch(o){r=void 0}if(r){var u=r.firstChild;switch(u.nodeName){case"BOOK":t.symbol=u.attributes.getNamedItem("symbol").value,t.unitcode=u.attributes.getNamedItem("basecode").value,t.askDepth=parseInt(u.attributes.getNamedItem("bidcount").value),t.bidDepth=parseInt(u.attributes.getNamedItem("bidcount").value),t.asks=[],t.bids=[];var c,l;if(u.attributes.getNamedItem("askprices")&&u.attributes.getNamedItem("asksizes")){c=u.attributes.getNamedItem("askprices").value.split(","),l=u.attributes.getNamedItem("asksizes").value.split(",");for(var d=0;d<c.length;d++)t.asks.push({price:s(c[d],t.unitcode),size:parseInt(l[d])})}if(u.attributes.getNamedItem("bidprices")&&u.attributes.getNamedItem("bidsizes")){c=u.attributes.getNamedItem("bidprices").value.split(","),l=u.attributes.getNamedItem("bidsizes").value.split(",");for(var d=0;d<c.length;d++)t.bids.push({price:s(c[d],t.unitcode),size:parseInt(l[d])})}t.type="BOOK";break;case"QUOTE":for(var d=0;d<u.attributes.length;d++){switch(u.attributes[d].name){case"symbol":t.symbol=u.attributes[d].value;break;case"name":t.name=u.attributes[d].value;break;case"exchange":t.exchange=u.attributes[d].value;break;case"basecode":t.unitcode=u.attributes[d].value;break;case"pointvalue":t.pointValue=parseFloat(u.attributes[d].value);break;case"tickincrement":t.tickIncrement=parseInt(u.attributes[d].value);break;case"flag":t.flag=u.attributes[d].value;break;case"lastupdate":var m=u.attributes[d].value;t.lastUpdate=new Date(parseInt(m.substr(0,4)),parseInt(m.substr(4,2))-1,parseInt(m.substr(6,2)),parseInt(m.substr(8,2)),parseInt(m.substr(10,2)),parseInt(m.substr(12,2)));break;case"bid":t.bidPrice=s(u.attributes[d].value,t.unitcode);break;case"bidsize":t.bidSize=parseInt(u.attributes[d].value);break;case"ask":t.askPrice=s(u.attributes[d].value,t.unitcode);break;case"asksize":t.askSize=parseInt(u.attributes[d].value);break;case"mode":t.mode=u.attributes[d].value}for(var p={},f=0;f<u.childNodes.length;f++)if("SESSION"==u.childNodes[f].nodeName){var v={},h=u.childNodes[f].attributes;if(h.getNamedItem("id")&&(v.id=h.getNamedItem("id").value),h.getNamedItem("day")&&(v.day=h.getNamedItem("day").value),h.getNamedItem("last")&&(v.lastPrice=s(h.getNamedItem("last").value,t.unitcode)),h.getNamedItem("previous")&&(v.previousPrice=s(h.getNamedItem("previous").value,t.unitcode)),h.getNamedItem("open")&&(v.openPrice=s(h.getNamedItem("open").value,t.unitcode)),h.getNamedItem("high")&&(v.highPrice=s(h.getNamedItem("high").value,t.unitcode)),h.getNamedItem("low")&&(v.lowPrice=s(h.getNamedItem("low").value,t.unitcode)),h.getNamedItem("tradesize")&&(v.tradeSize=parseInt(h.getNamedItem("tradesize").value)),h.getNamedItem("numtrades")&&(v.numberOfTrades=parseInt(h.getNamedItem("numtrades").value)),h.getNamedItem("settlement")&&(v.settlementPrice=s(h.getNamedItem("settlement").value,t.unitcode)),h.getNamedItem("volume")&&(v.volume=parseInt(h.getNamedItem("volume").value)),h.getNamedItem("openinterest")&&(v.openInterest=parseInt(h.getNamedItem("openinterest").value)),h.getNamedItem("timestamp")){var m=h.getNamedItem("timestamp").value;v.timeStamp=new Date(parseInt(m.substr(0,4)),parseInt(m.substr(4,2))-1,parseInt(m.substr(6,2)),parseInt(m.substr(8,2)),parseInt(m.substr(10,2)),parseInt(m.substr(12,2)))}if(h.getNamedItem("tradetime")){var m=h.getNamedItem("tradetime").value;v.tradeTime=new Date(parseInt(m.substr(0,4)),parseInt(m.substr(4,2))-1,parseInt(m.substr(6,2)),parseInt(m.substr(8,2)),parseInt(m.substr(10,2)),parseInt(m.substr(12,2)))}v.id&&(p[v.id]=v)}var b="undefined"==typeof p.combined.lastPrice,g=!b&&"undefined"!=typeof p.combined.settlementPrice,P=b?p.previous:p.combined;P.lastPrice&&(t.lastPrice=P.lastPrice),P.previousPrice&&(t.previousPrice=P.previousPrice),P.openPrice&&(t.openPrice=P.openPrice),P.highPrice&&(t.highPrice=P.highPrice),P.lowPrice&&(t.lowPrice=P.lowPrice),P.tradeSize&&(t.tradeSize=P.tradeSize),P.numberOfTrades&&(t.numberOfTrades=P.numberOfTrades),P.settlementPrice&&(t.settlementPrice=P.settlementPrice),P.volume&&(t.volume=P.volume),P.openInterest&&(t.openInterest=P.openInterest),"combined"===P.id&&p.previous.openInterest&&(t.openInterest=p.previous.openInterest),P.timeStamp&&(t.timeStamp=P.timeStamp),P.tradeTime&&(t.tradeTime=P.tradeTime),p.combined.day&&(t.day=p.combined.day),b&&"undefined"==typeof t.flag&&(t.flag="p");var y=p.previous;if(t.previousPreviousPrice=y.previousPrice,t.previousSettlementPrice=y.settlementPrice,t.previousOpenPrice=y.openPrice,t.previousHighPrice=y.highPrice,t.previousLowPrice=y.lowPrice,t.previousTimeStamp=y.timeStamp,p.combined.day){var k="session_"+p.combined.day+"_T";if(p.hasOwnProperty(k)){var I=p[k],T=I.lastPrice;if(T){var w=I.tradeTime,D=I.tradeSize;if(t.lastPriceT=T,w){var C=new Date(w.getFullYear(),w.getMonth(),w.getDate(),12,0,0,0);t.sessionT=w.getTime()>C.getTime()}w&&(t.tradeTime=w),D&&(t.tradeSize=D),(b||g)&&(t.session="T",b&&(I.volume&&(t.volume=I.volume),I.previousPrice&&(t.previousPrice=I.previousPrice)))}}}}t.type="REFRESH_QUOTE";break;default:console.log(e)}}break;case"":switch(e.substr(1,1)){case"#":t.type="TIMESTAMP",t.timestamp=new Date(parseInt(e.substr(2,4)),parseInt(e.substr(6,2))-1,parseInt(e.substr(8,2)),parseInt(e.substr(10,2)),parseInt(e.substr(12,2)),parseInt(e.substr(14,2)));break;case"2":t.record="2";var x=e.indexOf(",",0);switch(t.symbol=e.substring(2,x),t.subrecord=e.substr(x+1,1),t.unitcode=e.substr(x+3,1),t.exchange=e.substr(x+4,1),t.delay=parseInt(e.substr(x+5,2)),t.subrecord){case"0":var S=e.indexOf(",",x+7);switch(t.value=s(e.substring(x+7,S),t.unitcode),t.element=e.substr(S+1,1),t.modifier=e.substr(S+2,1),t.element){case"A":t.type="OPEN";break;case"C":"1"==t.modifier&&(t.type="OPEN_INTEREST");break;case"D":case"d":"0"==t.modifier&&(t.type="SETTLEMENT");break;case"V":"0"==t.modifier&&(t.type="VWAP");break;case"0":"0"==t.modifier&&(t.tradePrice=t.value,t.type="TRADE");break;case"5":t.type="HIGH";break;case"6":t.type="LOW";break;case"7":"1"==t.modifier?t.type="VOLUME_YESTERDAY":"6"==t.modifier&&(t.type="VOLUME")}t.day=e.substr(S+3,1),t.session=e.substr(S+4,1),t.time=a(e.substr(e.indexOf("")+1,9));break;case"1":case"2":case"3":case"4":var O=e.substring(x+8).split(",");t.openPrice=s(O[0],t.unitcode),t.highPrice=s(O[1],t.unitcode),t.lowPrice=s(O[2],t.unitcode),t.lastPrice=s(O[3],t.unitcode),t.bidPrice=s(O[4],t.unitcode),t.askPrice=s(O[5],t.unitcode),t.previousPrice=s(O[7],t.unitcode),t.settlementPrice=s(O[10],t.unitcode),t.volume=O[13].length>0?parseInt(O[13]):void 0,t.openInterest=O[12].length>0?parseInt(O[12]):void 0,t.day=O[14].substr(0,1),t.session=O[14].substr(1,1),t.time=a(e.substr(e.indexOf("")+1,9)),t.type="REFRESH_DDF";break;case"7":var S=e.indexOf(",",x+7);t.tradePrice=s(e.substring(x+7,S),t.unitcode),x=S+1,S=e.indexOf(",",x),t.tradeSize=parseInt(e.substring(x,S)),x=S+1,t.day=e.substr(x,1),t.session=e.substr(x+1,1),t.time=a(e.substr(e.indexOf("")+1,9)),t.type="TRADE";break;case"8":var S=e.indexOf(",",x+7);t.bidPrice=s(e.substring(x+7,S),t.unitcode),x=S+1,S=e.indexOf(",",x),t.bidSize=parseInt(e.substring(x,S)),x=S+1,S=e.indexOf(",",x),t.askPrice=s(e.substring(x,S),t.unitcode),x=S+1,S=e.indexOf(",",x),t.askSize=parseInt(e.substring(x,S)),x=S+1,t.day=e.substr(x,1),t.session=e.substr(x+1,1),t.time=a(e.substr(e.indexOf("")+1,9)),t.type="TOB";break;case"Z":var S=e.indexOf(",",x+7);t.tradePrice=s(e.substring(x+7,S),t.unitcode),x=S+1,S=e.indexOf(",",x),t.tradeSize=parseInt(e.substring(x,S)),x=S+1,t.day=e.substr(x,1),t.session=e.substr(x+1,1),t.time=a(e.substr(e.indexOf("")+1,9)),t.type="TRADE_OUT_OF_SEQUENCE"}break;case"3":var x=e.indexOf(",",0);switch(t.symbol=e.substring(2,x),t.subrecord=e.substr(x+1,1),t.subrecord){case"B":t.unitcode=e.substr(x+3,1),t.exchange=e.substr(x+4,1),t.bidDepth="A"==e.substr(x+5,1)?10:parseInt(e.substr(x+5,1)),t.askDepth="A"==e.substr(x+6,1)?10:parseInt(e.substr(x+6,1)),t.bids=[],t.asks=[];for(var O=e.substring(x+8).split(","),d=0;d<O.length;d++){var l=O[d].split(/[A-Z]/),N=O[d].substr(l[0].length,1);N<="J"?t.asks.push({price:s(l[0],t.unitcode),size:parseInt(l[1])}):t.bids.push({price:s(l[0],t.unitcode),size:parseInt(l[1])})}t.type="BOOK"}break;default:t.type="UNKNOWN"}}return t}}()},{"./../common/xml/XmlDomParser":3,"./parseTimestamp":22,"./parseValue":23}],22:[function(e,t,r){t.exports=function(){"use strict";return function(e){if(9!==e.length)return null;var t=100*e.charCodeAt(0)+e.charCodeAt(1)-64,r=e.charCodeAt(2)-64-1,n=e.charCodeAt(3)-64,s=e.charCodeAt(4)-64,a=e.charCodeAt(5)-64,i=e.charCodeAt(6)-64,o=(255&e.charCodeAt(7))+((255&e.charCodeAt(8))<<8);return new Date(t,r,n,s,a,i,o)}}()},{}],23:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.priceParser}()},{"barchart-marketdata-utilities":35}],24:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.convert.baseCodeToUnitCode}()},{"barchart-marketdata-utilities":35}],25:[function(e,t,r){t.exports=function(){"use strict";return function(e){var t=e.getDate();return t>=1&&t<=9?String.fromCharCode("1".charCodeAt(0)+t-1):10==t?"0":String.fromCharCode("A".charCodeAt(0)+t-11)}}()},{}],26:[function(e,t,r){t.exports=function(){"use strict";return function(e){var t=e.charCodeAt(0);return t>="1".charCodeAt(0)&&e<="9".charCodeAt(0)?t-"0".charCodeAt(0):"0"==e?10:t-"A".charCodeAt(0)+11}}()},{}],27:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.convert.unitCodeToBaseCode}()},{"barchart-marketdata-utilities":35}],28:[function(e,t,r){var n=e("./convertBaseCodeToUnitCode"),s=e("./convertDateToDayCode"),a=e("./convertDayCodeToNumber"),i=e("./convertUnitCodeToBaseCode"),o=e("./monthCodes"),u=e("./parseSymbolType"),c=e("./priceFormatter"),l=e("./timeFormatter");t.exports=function(){"use strict";return{convertBaseCodeToUnitCode:n,convertUnitCodeToBaseCode:i,convertDateToDayCode:s,convertDayCodeToNumber:a,monthCodes:o,parseSymbolType:u,BaseCode2UnitCode:n,DateToDayCode:s,DayCodeToNumber:a,MonthCodes:o,ParseSymbolType:u,PriceFormatter:c,TimeFormatter:l,UnitCode2BaseCode:i}}()},{"./convertBaseCodeToUnitCode":24,"./convertDateToDayCode":25,"./convertDayCodeToNumber":26,"./convertUnitCodeToBaseCode":27,"./monthCodes":29,"./parseSymbolType":30,"./priceFormatter":31,"./timeFormatter":32}],29:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.monthCodes.getCodeToNameMap()}()},{"barchart-marketdata-utilities":35}],30:[function(e,t,r){t.exports=function(){"use strict";return function(e){if("_S_"==e.substring(0,3))return{type:"future_spread"};var t=/[0-9]$/;if(t.test(e)){var r=/^(.{1,3})([A-Z])([0-9]{1,4})$/i,n=r.exec(e),s=parseInt(n[3]);return s<10?s+=2010:s<100&&(s+=2e3),{type:"future",symbol:n[0],root:n[1],month:n[2],year:s}}return null}}()},{}],31:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.priceFormatter}()},{"barchart-marketdata-utilities":35}],32:[function(e,t,r){var n=e("barchart-marketdata-utilities");t.exports=function(){"use strict";return n.timeFormatter}()},{"barchart-marketdata-utilities":35}],33:[function(e,t,r){t.exports=function(){"use strict";return{unitCodeToBaseCode:function(e){switch(e){case"2":return-1;case"3":return-2;case"4":return-3;case"5":return-4;case"6":return-5;case"7":return-6;case"8":return 0;case"9":return 1;case"A":return 2;case"B":return 3;case"C":return 4;case"D":return 5;case"E":return 6;case"F":return 7;default:return 0}},baseCodeToUnitCode:function(e){switch(e){case-1:return"2";case-2:return"3";case-3:return"4";case-4:return"5";case-5:return"6";case-6:return"7";case 0:return"8";case 1:return"9";case 2:return"A";case 3:return"B";case 4:return"C";case 5:return"D";case 6:return"E";case 7:return"F";default:return 0}}}}()},{}],34:[function(e,t,r){var n=e("lodash.isnan");t.exports=function(){"use strict";return function(e,t,r){if(""===e||void 0===e||null===e||n(e))return"";var s=e.toFixed(t);if(r&&!(e<1e3)){for(var a=s.length,i=0===t,o=0,u=[],c=a-1;!(c<0);c--){3===o&&(u.unshift(","),o=0);var l=s.charAt(c);u.unshift(l),i?o+=1:"."===l&&(i=!0)}s=u.join("")}return s}}()},{"lodash.isnan":42}],35:[function(e,t,r){var n=e("./convert"),s=e("./decimalFormatter"),a=e("./monthCodes"),i=e("./priceFormatter"),o=e("./symbolFormatter"),u=e("./priceParser"),c=e("./timeFormatter");t.exports=function(){"use strict";return{convert:n,decimalFormatter:s,monthCodes:a,priceFormatter:i,priceParser:u,symbolFormatter:o,timeFormatter:c}}()},{"./convert":33,"./decimalFormatter":34,"./monthCodes":36,"./priceFormatter":37,"./priceParser":38,"./symbolFormatter":39,"./timeFormatter":40}],36:[function(e,t,r){t.exports=function(){"use strict";var e={},t={},r=function(r,n,s){e[r]=n,t[r]=s};return r("F","January",1),r("G","February",2),r("H","March",3),r("J","April",4),r("K","May",5),r("M","June",6),r("N","July",7),r("Q","August",8),r("U","September",9),r("V","October",10),r("X","November",11),r("Z","December",12),r("Y","Cash",0),{getCodeToNameMap:function(){return e},getCodeToNumberMap:function(){return t}}}()},{}],37:[function(e,t,r){var n=e("lodash.isnan"),s=e("./decimalFormatter");t.exports=function(){"use strict";function e(e,t){return["000",Math.floor(e)].join("").substr(-1*t)}return function(t,r,a){
function i(e){var r=Math.floor(e);return 0===r&&""===t?"":r}function o(e,t){return s(e,t,a)}var u;return u="."==t?function(e,t){switch(t){case"2":return o(e,3);case"3":return o(e,4);case"4":return o(e,5);case"5":return o(e,6);case"6":return o(e,7);case"7":return o(e,8);case"8":return o(e,0);case"9":return o(e,1);case"A":return o(e,2);case"B":return o(e,3);case"C":return o(e,4);case"D":return o(e,5);case"E":return o(e,6);default:return""===e||void 0===e||null===e||n(e)?"":e}}:function(s,a){if(""===s||void 0===s||null===s||n(s))return"";var u=s>=0?"":"-";switch(s=Math.abs(s),a){case"2":return[u,i(s),t,e(8*(s-Math.floor(s)),1)].join("");case"3":return[u,i(s),t,e(16*(s-Math.floor(s)),2)].join("");case"4":return[u,i(s),t,e(32*(s-Math.floor(s)),2)].join("");case"5":return[u,i(s),t,e((s-Math.floor(s))*(r?320:64),r?3:2)].join("");case"6":return[u,i(s),t,e((s-Math.floor(s))*(r?320:128),3)].join("");case"7":return[u,i(s),t,e((s-Math.floor(s))*(r?320:256),3)].join("");case"8":return u+o(s,0);case"9":return u+o(s,1);case"A":return u+o(s,2);case"B":return u+o(s,3);case"C":return u+o(s,4);case"D":return u+o(s,5);case"E":return u+o(s,6);default:return u+s}},{format:u}}}()},{"./decimalFormatter":34,"lodash.isnan":42}],38:[function(e,t,r){t.exports=function(){"use strict";function e(e){return t.hasOwnProperty(e)||(t[e]=new RegExp(e,"g")),t[e]}var t={};return function(t,r,n){if(!(t.length<1)){if("-"===t)return null;if(n&&(t=t.replace(e(n),"")),t.indexOf(".")>0)return parseFloat(t);var s="-"==t.substr(0,1)?-1:1;switch(s===-1&&(t=t.substr(1)),r){case"2":return s*((t.length>1?parseInt(t.substr(0,t.length-1)):0)+parseInt(t.substr(-1))/8);case"3":return s*((t.length>2?parseInt(t.substr(0,t.length-2)):0)+parseInt(t.substr(-2))/16);case"4":return s*((t.length>2?parseInt(t.substr(0,t.length-2)):0)+parseInt(t.substr(-2))/32);case"5":return s*((t.length>2?parseInt(t.substr(0,t.length-2)):0)+parseInt(t.substr(-2))/64);case"6":return s*((t.length>3?parseInt(t.substr(0,t.length-3)):0)+parseInt(t.substr(-3))/128);case"7":return s*((t.length>3?parseInt(t.substr(0,t.length-3)):0)+parseInt(t.substr(-3))/256);case"8":return s*parseInt(t);case"9":return s*(parseInt(t)/10);case"A":return s*(parseInt(t)/100);case"B":return s*(parseInt(t)/1e3);case"C":return s*(parseInt(t)/1e4);case"D":return s*(parseInt(t)/1e5);case"E":return s*(parseInt(t)/1e6);default:return s*parseInt(t)}}}}()},{}],39:[function(e,t,r){t.exports=function(){"use strict";return{format:function(e){var t;return t=null!==e&&"string"==typeof e?e.toUpperCase():e}}}()},{}],40:[function(e,t,r){t.exports=function(){"use strict";function e(e){var t,r=e.getHours();return 0===r?(r=12,t="AM"):12===r?(r=r,t="PM"):r>12?(r-=12,t="PM"):(r=r,t="AM"),s(r)+":"+s(e.getMinutes())+":"+s(e.getSeconds())+" "+t}function t(e){var t,r=e.getHours();return 0===r?(r=12,t="A"):12===r?(r=r,t="P"):r>12?(r-=12,t="P"):(r=r,t="A"),s(r)+":"+s(e.getMinutes())+t}function r(e){return s(e.getHours())+":"+s(e.getMinutes())+":"+s(e.getSeconds())}function n(e){return s(e.getHours())+":"+s(e.getMinutes())}function s(e){return("00"+e).substr(-2)}return function(a,i){var o;o=a?i?t:e:i?n:r;var u={format:function(e){var t=e.time;return t?e.lastPrice&&!e.flag?u.formatTime(t,e.timezone):u.formatDate(t):""},formatTime:function(e,t){var r;return e?(r=o(e),t&&(r=r+" "+t)):r="",r},formatDate:function(e){return e?s(e.getMonth()+1)+"/"+s(e.getDate())+"/"+s(e.getFullYear()):""}};return u}}()},{}],41:[function(e,t,r){!function(){var e=!1,r=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(t,n){function s(){!e&&this.init&&this.init.apply(this,arguments)}void 0==n&&(n=t,t="Class");var a=this.prototype;e=!0;var i=new this;e=!1;for(var o in n)i[o]="function"==typeof n[o]&&"function"==typeof a[o]&&r.test(n[o])?function(e,t){return function(){var r=this._super;this._super=a[e];var n=t.apply(this,arguments);return this._super=r,n}}(o,n[o]):n[o];s.prototype=i;var u=new Function("return function "+t+"(){ }")();return s.prototype.constructor=u,s.extend=arguments.callee,s},t.exports=Class}()},{}],42:[function(e,t,r){function n(e){return!!e&&"object"==typeof e}function s(e){return a(e)&&e!=+e}function a(e){return"number"==typeof e||n(e)&&u.call(e)==i}var i="[object Number]",o=Object.prototype,u=o.toString;t.exports=s},{}]},{},[15])(15)});