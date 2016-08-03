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

define(["../core/declare","../core/lang","dojo/_base/array","dojo/_base/lang","../symbols/support/jsonUtils","./Renderer"],function(e,i,s,l,t,n){var u=e(n,{declaredClass:"esri.renderer.UniqueValueRenderer",type:"uniqueValue",classMetadata:{properties:{requiredFields:{dependsOn:["field","field2","field3"]},expressionTree:{dependsOn:["expression"]}},reader:{exclude:["field1"],add:["field"]}},constructor:function(){this._symbols={}},getDefaults:function(){return l.mixin(this.inherited(arguments),{field:null,field2:null,field3:null,expression:null,defaultLabel:null,defaultSymbol:null,fieldDelimiter:null,uniqueValueInfos:[]})},_defaultSymbolReader:t.fromJSON,_fieldReader:function(e,i){return i.field1},_uniqueValueInfosSetter:function(e){return this._symbols={},s.forEach(e,this._processUVInfo,this),e},collectRequiredFields:function(e){this.inherited(arguments),[this.field,this.field2,this.field3].forEach(function(i){i&&(e[i]=!0)})},expressionTree:null,_expressionTreeGetter:function(){return this.expression?this._parseExpr(this.expression,{vars:{$feature:"any"}}):null},addUniqueValueInfo:function(e,i){var s=l.isObject(e)?e:{value:e,symbol:i};this.uniqueValueInfos.push(s),this._processUVInfo(s)},removeUniqueValueInfo:function(e){var i=-1;s.some(this.uniqueValueInfos,function(s,l){return s.value==e?(i=l,!0):void 0}),-1!==i&&(delete this._symbols[e],this.uniqueValueInfos.splice(i,1))},getUniqueValueInfo:function(e){var i,s,t,n,u=this.field,r=e.attributes;return this.expression?n=this._executeExpr(this.expressionTree,this._createExprContext(e)):this.field2?(i=this.field2,s=this.field3,t=[],u&&t.push(r[u]),i&&t.push(r[i]),s&&t.push(r[s]),n=t.join(this.fieldDelimiter||"")):n=l.isFunction(u)?u(e):r[u],this._symbols[n]},getSymbol:function(e){var i=this.getUniqueValueInfo(e);return i&&i.symbol||this.defaultSymbol},toJSON:function(){var e=i.fixJson,t=l.mixin(this.inherited(arguments),{type:this.type,field1:this.field,field2:this.field2,field3:this.field3,expression:this.expression,fieldDelimiter:this.fieldDelimiter,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.toJSON(),defaultLabel:this.defaultLabel,uniqueValueInfos:s.map(this.uniqueValueInfos||[],function(i){return i=l.mixin({},i),i.symbol=i.symbol&&i.symbol.toJSON(),i.value=i.value+"",e(i)})});return e(t)},clone:function(){return new u({field:this.field,field2:this.field2,field3:this.field3,defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),expression:this.expression,fieldDelimiter:this.fieldDelimiter,uniqueValueInfos:i.clone(this.uniqueValueInfos),visualVariables:i.clone(this.visualVariables)})},_processUVInfo:function(e){var i=e.value,s=e.symbol;s&&(s.declaredClass||(e.symbol=t.fromJSON(s))),this._symbols[i]=e}});return u});