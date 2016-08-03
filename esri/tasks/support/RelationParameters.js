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

define(["../../core/Accessoire","../../core/declare","../../core/jsonDictionary","../../geometry/support/jsonUtils","dojo/_base/array","dojo/_base/lang"],function(e,t,i,o,r){var n=i({esriGeometryRelationCross:"cross",esriGeometryRelationDisjoint:"disjoint",esriGeometryRelationIn:"in",esriGeometryRelationInteriorIntersection:"interior-intersection",esriGeometryRelationIntersection:"intersection",esriGeometryRelationLineCoincidence:"line-coincidence",esriGeometryRelationLineTouch:"line-touch",esriGeometryRelationOverlap:"overlap",esriGeometryRelationPointTouch:"point-touch",esriGeometryRelationTouch:"touch",esriGeometryRelationWithin:"within",esriGeometryRelationRelation:"relation"}),s=t(e,{declaredClass:"esri.tasks.support.RelationParameters",geometries1:null,geometries2:null,relation:null,relationParam:null,toJSON:function(){var e=r.map(this.geometries1,function(e){return e.toJSON()}),t=r.map(this.geometries2,function(e){return e.toJSON()}),i={},s=this.geometries1;if(s&&s.length>0){i.geometries1=JSON.stringify({geometryType:o.getJsonType(s[0]),geometries:e});var a=this.geometries1[0].spatialReference;i.sr=a.wkid?a.wkid:JSON.stringify(a.toJSON())}var l=this.geometries2;return l&&l.length>0&&(i.geometries2=JSON.stringify({geometryType:o.getJsonType(l[0]),geometries:t})),this.relation&&(i.relation=n.toJSON(this.relation)),this.relationParam&&(i.relationParam=this.relationParam),i}});return s});