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

define(["require","exports","../../geometry/Geometry","../languageUtils","../../geometry/geometryEngine","../kernel","../Feature"],function(e,n,t,r,i,a,o){function s(e,n,t,r){try{if(n===e.length)return t;var a=e[n];if(null===a)return s(e,n+1,t,r);var o=i.planarArea(a,r);return t+=o,s(e,n+1,t,r)}catch(c){throw c}}function c(e,n,t,r){try{if(n===e.length)return t;var a=e[n];if(null===a)return c(e,n+1,t,r);var o=i.planarLength(a,r);return t+=o,c(e,n+1,t,r)}catch(s){throw s}}function u(e,n,o,s){return s(e,n,function(e,n,s){if(r.pcCheck(s,2,2),s[0]instanceof t){if(!(s[1]instanceof t)){if(null===s[1])return!1;throw new Error("Spatial Relation cannot accept this parameter type")}switch(o){case"esriSpatialRelEnvelopeIntersects":return i.intersects(a.shapeExtent(s[0]),a.shapeExtent(s[1]));case"esriSpatialRelIntersects":return i.intersects(s[0],s[1]);case"esriSpatialRelContains":return i.contains(s[0],s[1]);case"esriSpatialRelOverlaps":return i.overlaps(s[0],s[1]);case"esriSpatialRelWithin":return i.within(s[0],s[1]);case"esriSpatialRelTouches":return i.touches(s[0],s[1]);case"esriSpatialRelCrosses":return i.crosses(s[0],s[1]);default:throw new Error("Unrecognised Relationship")}}else{if(null!==s[0])throw new Error("Spatial Relation cannot accept this parameter type");if(s[1]instanceof t||null===s[1])return!1}})}function l(e,n,a,o){return o(e,n,function(e,n,o){if(r.pcCheck(o,2,3),o[0]instanceof t){if(void 0===o[1]&&"union"===a)return o[0];if(o[1]instanceof t){var s=r.defaultUndefined(o[2],!0),c=null;switch(a){case"difference":c=i.difference(o[0],o[1]);break;case"intersection":c=i.intersect(o[0],o[1]);break;case"symmetricdifference":c=i.symmetricDifference(o[0],o[1]);break;case"union":c=i.union([o[0],o[1]]);break;default:throw new Error("Unrecognised Relationship")}return s&&null!==c&&c.type!==o[0].type&&(c=null),c}if(null!==o[1])throw new Error("Spatial Topo cannot accept this parameter type");switch(a){case"difference":return o[0];case"intersection":return null;case"symmetricdifference":return o[0];case"union":return o[0];default:throw new Error("Unrecognised Relationship")}}else{if(null!==o[0])throw new Error("Spatial Topo cannot accept this parameter type");if(!(o[1]instanceof t)){if(null===o[1])return null;throw new Error("Spatial Topo cannot accept this parameter type")}switch(a){case"difference":return null;case"intersection":return null;case"symmetricdifference":return o[1];case"union":return o[1];default:throw new Error("Unrecognised Relationship")}}})}function f(e,n){e.buffer=function(e,s){return n(e,s,function(e,n,s){if(r.pcCheck(s,2,4),s[0]instanceof t)return i.buffer(s[0],s[1],a.convertLinearUnitsToCode(s[2]),r.defaultUndefined(s[3],!1));if(s[0]instanceof o){var c=new o(s[0]);return c.geometry=i.buffer(c.geometry,s[1],a.convertLinearUnitsToCode(s[2]),r.defaultUndefined(s[3],!1)),c}throw new Error("Buffer cannot accept this parameter type")})},e.sumarea=function(e,c){return n(e,c,function(e,n,c){r.pcCheck(c,1,2);var u=a.convertSquareUnitsToCode(c[1]);if(r.isArray(c[0]))return s(c[0],0,0,u);if(c[0]instanceof t)return i.planarArea(c[0],u);if(r.isImmutableArray(c[0]))return s(c[0].toArray(),0,0,u);if(c[0]instanceof o)return null===c[0].geometry?0:i.planarArea(c[0].geometry,u);if(null===c[0])return 0;throw new Error("Invalid Parameters for Area")})},e.area=e.sumarea,e.sumlength=function(e,s){return n(e,s,function(e,n,s){r.pcCheck(s,1,2);var u=a.convertLinearUnitsToCode(s[1]);if(r.isArray(s[0]))return c(s[0],0,0,u);if(r.isImmutableArray(s[0]))return c(s[0].toArray(),0,0,u);if(s[0]instanceof t)return i.planarLength(s[0],u);if(s[0]instanceof o)return null===s[0].geometry?0:i.planarLength(s[0].geometry,u);if(null===s[0])return 0;throw new Error("Invalid Parameters for Length")})},e.length=e.sumlength,e.intersects=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelIntersects",n)},e.envelopeintersects=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelEnvelopeIntersects",n)},e.contains=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelContains",n)},e.overlaps=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelOverlaps",n)},e.within=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelWithin",n)},e.touches=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelTouches",n)},e.crosses=function(e,t){return this.spatialrelationFunction(e,t,"esriSpatialRelCrosses",n)},e.equals=function(e,a){return n(e,a,function(e,n,a){return r.pcCheck(a,2,2),a[0]===a[1]?!0:a[0]instanceof t&&a[1]instanceof t?i.equals(a[0],a[1]):r.isDate(a[0])&&r.isDate(a[1])?a[0].getTime()===a[1].getTime():!1})},e.intersection=function(e,t){return this.spatialTopoFunction(e,t,"intersection",n)},e.difference=function(e,t){return this.spatialTopoFunction(e,t,"difference",n)},e.symmetricdifference=function(e,t){return this.spatialTopoFunction(e,t,"symmetricdifference",n)},e.union=function(e,t){return this.spatialTopoFunction(e,t,"union",n)}}n.spatialrelationFunction=u,n.spatialTopoFunction=l,n.registerFunctions=f});