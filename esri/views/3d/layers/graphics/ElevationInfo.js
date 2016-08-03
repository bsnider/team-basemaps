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

define(["dojo/_base/lang"],function(e){var t=function(e){e?this.set(e):(this.mode=null,this.offset=0,this.featureExpression=null)};return t.prototype.set=function(t){this.mode=t.mode,this.offset=t.offset,this.featureExpression=t.featureExpression?e.clone(t.featureExpression):null},t.MODES={ABSOLUTE_HEIGHT:"absolute-height",RELATIVE_TO_GROUND:"relative-to-ground",ON_THE_GROUND:"on-the-ground"},t});