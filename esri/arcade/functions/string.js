// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["require","exports","../languageUtils"],function(r,t,e){function n(r,t){r.trim=function(r,n){return t(r,n,function(r,t,n){return e.pcCheck(n,1,1),e.toString(n[0]).trim()})},r.upper=function(r,n){return t(r,n,function(r,t,n){return e.pcCheck(n,1,1),e.toString(n[0]).toUpperCase()})},r.proper=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,1,2);var i=1;2===n.length&&"firstword"===e.toString(n[1]).toLowerCase()&&(i=2);for(var o=/\s/,u=e.toString(n[0]),c="",a=!0,f=0;f<u.length;f++){var s=u[f],g=o.test(s);if(g)1===i&&(a=!0);else{var l=s.toUpperCase()!==s.toLowerCase();l&&(a?(s=s.toUpperCase(),a=!1):s=s.toLowerCase())}c+=s}return c})},r.lower=function(r,n){return t(r,n,function(r,t,n){return e.pcCheck(n,1,1),e.toString(n[0]).toLowerCase()})},r.guid=function(r,n){return t(r,n,function(r,t,n){if(e.pcCheck(n,0,1),n.length>0)switch(e.toString(n[0]).toLowerCase()){case"digits":return e.generateUUID().replace("-","").replace("-","").replace("-","").replace("-","");case"digits-hyphen":return e.generateUUID();case"digits-hyphen-braces":return"{"+e.generateUUID()+"}";case"digits-hyphen-parentheses":return"("+e.generateUUID()+")"}return"{"+e.generateUUID()+"}"})},r.mid=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,2,3);var i=e.toNumber(n[1]);if(isNaN(i))return"";if(0>i&&(i=0),2===n.length)return e.toString(n[0]).substr(i);var o=e.toNumber(n[2]);return isNaN(o)?"":(0>o&&(o=0),e.toString(n[0]).substr(i,o))})},r.find=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,2,3);var i=0;if(n.length>2){if(i=e.toNumber(e.defaultUndefined(n[2],0)),isNaN(i))return-1;0>i&&(i=0)}var o=e.toString(n[1]).indexOf(e.toString(n[0]),i);return o})},r.left=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,2,2);var i=e.toNumber(n[1]);return isNaN(i)?"":(0>i&&(i=0),e.toString(n[0]).substr(0,i))})},r.right=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,2,2);var i=e.toNumber(n[1]);return isNaN(i)?"":(0>i&&(i=0),e.toString(n[0]).substr(-1*i,i))})},r.split=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,2,4);var i,o=e.toNumber(e.defaultUndefined(n[2],-1));-1===o||null===o?i=e.toString(n[0]).split(e.toString(n[1])):(isNaN(o)&&(o=-1),-1>o&&(o=-1),i=e.toString(n[0]).split(e.toString(n[1]),o));var u=e.defaultUndefined(n[3],!1);if(e.isBoolean(u)===!1)throw new Error("Invalid Parameter");if(u===!1)return i;for(var c=[],a=0;a<i.length;a++)""!==i[a]&&void 0!==i[a]&&c.push(i[a]);return c})},r.text=function(r,n){return t(r,n,function(r,t,n){return e.pcCheck(n,1,2),e.toStringExplicit(n[0],n[1])})},r.concatenate=function(r,n){return t(r,n,function(r,t,n){var i=[];if(n.length<1)return"";if(e.isArray(n[0])){for(var o=e.defaultUndefined(n[2],""),u=0;u<n[0].length;u++)i[u]=e.toStringExplicit(n[0][u],o);return i.join(n.length>1?n[1]:"")}if(e.isImmutableArray(n[0])){for(var o=e.defaultUndefined(n[2],""),u=0;u<n[0].length();u++)i[u]=e.toStringExplicit(n[0].get(u),o);return i.join(n.length>1?n[1]:"")}for(var u=0;u<n.length;u++)i[u]=e.toStringExplicit(n[u]);return i.join("")})},r.reverse=function(r,n){return t(r,n,function(r,t,n){if(e.pcCheck(n,1,1),e.isArray(n[0])){var i=n[0].slice(0);return i.reverse(),i}if(e.isImmutableArray(n[0])){var o=n[0].toArray().slice(0);return o.reverse(),o}throw new Error("Invalid Parameter")})},r.replace=function(r,n){return t(r,n,function(r,t,n){e.pcCheck(n,3,4);var i=e.toString(n[0]),o=e.toString(n[1]),u=e.toString(n[2]),c=4===n.length?e.toBoolean(n[3]):!0;return c?e.multiReplace(i,o,u):i.replace(o,u)})}}t.registerFunctions=n});