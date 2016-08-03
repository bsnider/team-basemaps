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

define(["../core/declare","../core/lang","../core/jsonDictionary","dojo/_base/array","dojo/_base/lang","../symbols/support/jsonUtils","./Renderer"],function(e,a,i,s,l,n,t){var o="log",r="percent-of-total",u="field",c=i({esriNormalizeByLog:o,esriNormalizeByPercentOfTotal:r,esriNormalizeByField:u}),m=i({esriClassifyNaturalBreaks:"natural-breaks",esriClassifyEqualInterval:"equal-interval",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation",esriClassifyGeometricalInterval:"geometrical-interval"}),f=e(t,{declaredClass:"esri.renderer.ClassBreaksRenderer",type:"classBreaks",classMetadata:{properties:{requiredFields:{dependsOn:["field","normalizationField"]},expressionTree:{dependsOn:["expression"]},normalizationType:{dependsOn:["normalizationField","normalizationTotal"]}},reader:{exclude:["minValue"]}},constructor:function(){this._symbols={}},getDefaults:function(){return l.mixin(this.inherited(arguments),{field:null,expression:null,backgroundFillSymbol:null,classificationMethod:null,defaultSymbol:null,classBreakInfos:[],isMaxInclusive:!0,normalizationField:null,normalizationTotal:null,normalizationType:null})},_backgroundFillSymbolReader:n.fromJSON,_classificationMethodReader:function(e){return m.fromJSON(e)},_normalizationTypeReader:function(e){return c.fromJSON(e)},_normalizationTypeGetter:function(e){var a=e,i=!!this.normalizationField,s=null!=this.normalizationTotal;return i||s?(a=i&&u||s&&r,i&&s&&console.warn("warning: both normalizationField and normalizationTotal are set!")):(a===u||a===r)&&(a=null),a},_defaultSymbolReader:n.fromJSON,_classBreakInfosReader:function(e,a){var i=a.minValue;return e&&e[0]&&null!=e[0].classMaxValue&&s.forEach(e,function(e){var a=e.classMaxValue;e.minValue=i,e.maxValue=a,i=a},this),e},_classBreakInfosSetter:function(e){return this._symbols={},e&&e.forEach(this._processCBInfo,this),e},collectRequiredFields:function(e){this.inherited(arguments),[this.field,this.normalizationField].forEach(function(a){a&&(e[a]=!0)})},expressionTree:null,_expressionTreeGetter:function(){return this.expression?this._parseExpr(this.expression,{vars:{$feature:"any"}}):null},addClassBreakInfo:function(e,a,i){var s=l.isObject(e)?e:{minValue:e,maxValue:a,symbol:i};this.classBreakInfos.push(s),this._processCBInfo(s)},removeClassBreakInfo:function(e,a){var i,s,l=this.classBreakInfos.length,n=this._symbols;for(s=0;l>s;s++)if(i=[this.classBreakInfos[s].minValue,this.classBreakInfos[s].maxValue],i[0]==e&&i[1]==a){delete n[e+"-"+a],this.classBreakInfos.splice(s,1);break}},getBreakIndex:function(e){var a,i,s,n=this.field,t=e.attributes,c=this.classBreakInfos.length,m=this.isMaxInclusive;if(this.expression)a=this._executeExpr(this.expressionTree,this._createExprContext(e));else if(l.isFunction(n))a=n(e);else{a=parseFloat(t[n]);var f,d,h=this.normalizationType;h&&(f=parseFloat(this.normalizationTotal),d=parseFloat(t[this.normalizationField]),h===o?a=Math.log(a)*Math.LOG10E:h!==r||isNaN(f)?h!==u||isNaN(d)||(a/=d):a=a/f*100)}for(i=0;c>i;i++)if(s=[this.classBreakInfos[i].minValue,this.classBreakInfos[i].maxValue],s[0]<=a&&(m?a<=s[1]:a<s[1]))return i;return-1},getClassBreakInfo:function(e){var a=this.getBreakIndex(e);return-1!==a?this.classBreakInfos[a]:null},getSymbol:function(e){var a=this.getBreakIndex(e),i=a>-1&&[this.classBreakInfos[a].minValue,this.classBreakInfos[a].maxValue];return i?this._symbols[i[0]+"-"+i[1]]:this.defaultSymbol},toJSON:function(){var e=this.classBreakInfos||[],i=a.fixJson,n=e[0]&&e[0].minValue,t=this.backgroundFillSymbol,o=l.mixin(this.inherited(arguments),{type:this.type,field:this.field,expression:this.expression,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.toJSON(),backgroundFillSymbol:t&&t.toJSON(),defaultLabel:this.defaultLabel,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,minValue:n===-1/0?-Number.MAX_VALUE:n,classBreakInfos:s.map(e,function(e){return e=l.mixin({},e),e.symbol=e.symbol&&e.symbol.toJSON(),e.classMaxValue=1/0===e.maxValue?Number.MAX_VALUE:e.maxValue,delete e.minValue,delete e.maxValue,i(e)})});return o.classificationMethod=m.toJSON(this.classificationMethod),o.normalizationType=c.toJSON(this.normalizationType),o.hasOwnProperty("normalizationType")&&!o.normalizationType&&delete o.normalizationType,o.hasOwnProperty("classificationMethod")&&!o.classificationMethod&&delete o.classificationMethod,i(o)},clone:function(){return new f({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),classificationMethod:this.classificationMethod,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),expression:this.expression,classBreakInfos:a.clone(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:a.clone(this.visualVariables)})},_processCBInfo:function(e){var a=e.minValue,i=e.maxValue,s=e.symbol;s&&(s.declaredClass||(e.symbol=n.fromJSON(s))),this._symbols[a+"-"+i]=e.symbol}});return f});