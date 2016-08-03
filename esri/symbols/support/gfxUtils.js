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

define(["require","dojo/_base/lang","dojox/gfx/_base","../../core/screenUtils"],function(e,t,a,r){var i="cartographic-line-symbol",l="picture-fill-symbol",o="picture-marker-symbol",n="simple-fill-symbol",s="simple-line-symbol",c="simple-marker-symbol",p="text-symbol",h=e.toUrl("../../images/symbol/sfs/"),u={left:"start",center:"middle",right:"end",justify:"start"},y={top:"text-before-edge",middle:"central",baseline:"alphabetic",bottom:"text-after-edge"},L=function(e){var t=e.horizontalAlignment;return t=t&&u[t.toLowerCase()]||"middle"},d=function(e){var t=e.verticalAlignment;return t&&y[t.toLowerCase()]||"alphabetic"},f=function(e){return"bottom"===e.verticalAlignment?"super":null},g=function(e){var i=null,o=e.style;if(e){var s=e.constructor;switch(e.type){case c:o!==s.STYLE_CROSS&&o!==s.STYLE_X&&(i=e.color);break;case n:o===s.STYLE_SOLID?i=e.color:o!==s.STYLE_NULL&&(i=t.mixin({},a.defaultPattern,{src:h+o+".png",width:10,height:10}));break;case l:i=t.mixin({},a.defaultPattern,{src:e.url,width:r.pt2px(e.width)*e.xscale,height:r.pt2px(e.height)*e.yscale,x:r.pt2px(e.xoffset),y:r.pt2px(e.yoffset)});break;case p:i=e.color}}return i},m=function S(e){var t=null;if(e){var a=e.constructor,o=r.pt2px(e.width);switch(e.type){case n:case l:case c:t=S(e.outline);break;case s:e.style!==a.STYLE_NULL&&0!==o&&(t={color:e.color,style:b(e.style),width:o});break;case i:e.style!==a.STYLE_NULL&&0!==o&&(t={color:e.color,style:b(e.style),width:o,cap:e.cap,join:e.join===a.JOIN_MITER?r.pt2px(e.miterLimit):e.join});break;default:t=null}}return t},b=function(){var e={};return function(t){if(e[t])return e[t];var a=t.replace(/-/g,"");return e[t]=a,a}}(),x=function(e){if(!e)return{defaultShape:null,fill:null,stroke:null};var t={fill:g(e),stroke:m(e)},h=e.constructor,u=h.defaultProps,y=null;switch(e.type){case c:var L=e.style,d=r.pt2px(e.size||u.size),f=.5*d,b=-f,x=+f,S=-f,k=+f;switch(L){case h.STYLE_CIRCLE:y={type:"circle",cx:0,cy:0,r:f};break;case h.STYLE_CROSS:y={type:"path",path:"M "+b+",0 L "+x+",0 M 0,"+S+" L 0,"+k+" E"};break;case h.STYLE_DIAMOND:y={type:"path",path:"M "+b+",0 L 0,"+S+" L "+x+",0 L 0,"+k+" L "+b+",0 E"};break;case h.STYLE_SQUARE:y={type:"path",path:"M "+b+","+k+" L "+b+","+S+" L "+x+","+S+" L "+x+","+k+" L "+b+","+k+" E"};break;case h.STYLE_X:y={type:"path",path:"M "+b+","+k+" L "+x+","+S+" M "+b+","+S+" L "+x+","+k+" E"};break;case h.STYLE_PATH:y={type:"path",path:e.path||""}}break;case s:case i:y={type:"path",path:"M -15,0 L 15,0 E"};break;case l:case n:y={type:"path",path:"M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 E"};break;case o:y={type:"image",x:-Math.round(r.pt2px(e.width)/2),y:-Math.round(r.pt2px(e.height)/2),width:r.pt2px(e.width),height:r.pt2px(e.height),src:e.source&&e.source.imageData?"data:"+e.source.contentType+";base64,"+e.source.imageData:e.url||""};break;case p:var E=e.font,w=r.pt2px(E.size);y={type:"text",text:e.text,x:0,y:.25*a.normalizedLength(E?w:0),align:"middle",decoration:e.decoration||E&&E.decoration,rotated:e.rotated,kerning:e.kerning},t.font=E&&{size:w,style:E.style,variant:E.variant,decoration:E.decoration,weight:E.weight,family:E.family}}return t.defaultShape=y,t};return{getFill:g,getStroke:m,getShapeDescriptors:x,getSVGAlign:L,getSVGBaseline:d,getSVGBaselineShift:f}});