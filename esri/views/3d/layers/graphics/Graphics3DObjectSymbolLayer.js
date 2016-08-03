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

define(["../../../../core/declare","../../../../Color","./Graphics3DSymbolLayer","./Graphics3DGraphicLayer","./ElevationAligners","./Graphics3DSymbolCommonCode","../i3s/I3SSymbolLoader","../../lib/glMatrix","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/materials/Material","../../webgl-engine/lib/Util"],function(e,t,i,r,o,a,n,s,l,c,h,m,y){var p=y.assert,u=s.mat4d,g=s.vec3d,_=[1,1,1],d=_,v=_,f=[10,10,10],b=[l.ModelContentType.MATERIAL,l.ModelContentType.TEXTURE,l.ModelContentType.GEOMETRY],M=e([i],{_prepareResources:function(){var e=this.symbol,t=this._getStageIdHint();if(e.resource&&e.resource.href){var i=e.resource.href;i&&0===i.indexOf("http")&&"https:"===location.protocol&&(i=i.replace(/^http:/i,"https:")),this._prepareModelResources(i,t)}else{var r=e.resource?e.resource.primitive:"sphere";this._preparePrimitiveResources(r,t)}},_sizeToScale:function(e,t,i,r){for(var o=new Array(3),a=2;a>=0;a--){var n=e[a];o[a]=null!==n&&isFinite(n)?n/(t[a+3]-t[a]):"symbolValue"===n?i?i[a]:1:null}for(var s=r,l=0,a=2;a>=0;a--){var n=o[a];null!==n&&(s=n,l=Math.max(l,Math.abs(n)))}for(a=2;a>=0;a--)null===o[a]?o[a]=s:0===o[a]&&(o[a]=.001*l);return o},_computeSymbolScale:function(e,t){var i=[e.width,e.depth,e.height];return i[0]||i[1]||i[2]?this._sizeToScale(i,t,null,1):null},_preparePrimitiveResources:function(e,i){var r=this.symbol;if("sphere"===e)this._geometryData=h.createPolySphereGeometry(.5,2,!0),this._geometryOrigin="center";else if("cube"===e)this._geometryData=h.createBoxGeometry(1),this._geometryOrigin="center";else if("cylinder"===e)this._geometryData=h.createCylinderGeometry(1,.5,16,[0,0,1],[0,0,.5]),this._geometryOrigin="bottom";else if("cone"===e)r.height<0?(this._geometryData=h.createConeGeometry(1,.5,15,!0),r.height=-r.height):this._geometryData=h.createConeGeometry(1,.5,15,!1),h.cgToGIS(this._geometryData),this._geometryOrigin="bottom";else if("tetrahedron"===e)this._geometryData=h.createTetrahedronGeometry(1),h.cgToGIS(this._geometryData),this._geometryOrigin="bottom";else{if("diamond"!==e)return console.warn("Unknown object symbol primitive: "+e),void this.reject();this._geometryData=h.createDiamondGeometry(1),h.cgToGIS(this._geometryData),this._geometryOrigin="center"}this._geometry=new c(this._geometryData,i),this._context.stage.add(l.ModelContentType.GEOMETRY,this._geometry);var o=[-.5,-.5,-.5,.5,.5,.5];this._symbolScale=this._computeSymbolScale(r,o),this._boundingBox=o;var a=this._getMaterialOpacity(),n={specular:[0,0,0],shininess:3,opacity:a,transparent:1>a||this._isPropertyDriven("opacity"),instanced:this._hasPerInstanceColor()?["transformation","color"]:["transformation"]};if(this._isPropertyDriven("color"))n.ambient=d,n.diffuse=v;else{var s=r.material?t.toUnitRGB(r.material.color):_;n.ambient=s,n.diffuse=s}this._material=new m(n,i+"_objectmat"),this._context.stage.add(l.ModelContentType.MATERIAL,this._material),this.resolve()},_prepareModelResources:function(e,i){var r={materialParamsMixin:{instanced:this._hasPerInstanceColor()?["transformation","color"]:["transformation"]},idHint:i},o=new n(this._context.streamDataSupplier);o.fetchSymbol(e,r).then(function(e){if(!this.isRejected()){var i,r=e.stageResources,o=this._context.stage,a=this.symbol.material;if(this._isPropertyDriven("color"))i={ambient:d,diffuse:v};else if(a&&a.color){var n=t.toUnitRGB(a.color);i={ambient:n.map(function(e){return e/1.5}),diffuse:n}}var s=this._computeModelOpacityOverride();e.originalMaterialOpacities=new Array(r[l.ModelContentType.MATERIAL].length),r[l.ModelContentType.MATERIAL].forEach(function(t,r){var o=t.getParameterValues();e.originalMaterialOpacities[r]=o.opacity,i&&t.setParameterValues(i),s.overwrite?t.setParameterValues({opacity:s.overwrite,transparent:s.blendingRequired}):null!=s.multiply&&(o.opacity*=s.multiply,o.transparent=o.opacity<1,t.setParameterValues({opacity:o.opacity,transparent:o.transparent}))}),b.forEach(function(e){for(var t=r[e],i=0;t&&i<t.length;i++)o.add(e,t[i])});for(var c=r[l.ModelContentType.GEOMETRY],h=e.geometryTransformations,m=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE],y=[0,0,0],p=[0,0,0],_=0;_<c.length;_++)for(var f=c[_],M=0,E=f.getNumGroups();E>M;++M){var O=f.getBoundingInfo(M);u.multiplyVec3(h[_],O.getBBMin(),y),u.multiplyVec3(h[_],O.getBBMax(),p);for(var T=0;3>T;++T){if(y[T]>p[T]){var S=y[T];y[T]=p[T],p[T]=S}m[T]=Math.min(m[T],y[T]),m[T+3]=Math.max(m[T+3],p[T])}}this._boundingBox=m;var A=this.symbol;this._symbolScale=this._computeSymbolScale(A,m),g.scale(e.pivotOffset,-1);for(var P=h.length,G=0;P>G;G++)u.translate(h[G],e.pivotOffset);g.scale(e.pivotOffset,-1),this._i3sModel=e,this.resolve()}}.bind(this),function(){this.reject()}.bind(this))},_computeModelOpacityOverride:function(){var e={overwrite:null,blendingRequired:!1,multiply:null},t=this._getMaterialOpacity();return this._isPropertyDriven("opacity")?(e.overwrite=t,e.blendingRequired=!0):this.symbol.material&&void 0!==this.symbol.material.transparency?(e.overwrite=t,e.blendingRequired=e.overwrite<1):1>t&&(e.multiply=t,e.blendingRequired=!0),e},destroy:function(){this.isFulfilled()||this.reject();var e=this._context.stage;if(this._i3sModel){var t=this._i3sModel.stageResources;b.forEach(function(i){for(var r=t[i],o=0;r&&o<r.length;o++)e.remove(i,r[o].getId())})}else this._material&&e.remove(l.ModelContentType.MATERIAL,this._material.getId()),this._geometry&&e.remove(l.ModelContentType.GEOMETRY,this._geometry.getId())},createGraphics3DGraphic:function(e,t){var i=e.geometry;if("polyline"===i.type)i=a.placePointOnPolyline(i);else if("polygon"===i.type)i=a.placePointOnPolygon(i);else if("extent"===i.type)i=i.get("center");else if("point"!==i.type)return this._logWarning("unsupported geometry type for object symbol: "+i.type),null;var r="graphic"+e.id,o=this._getGraphicElevationInfo(e);return this._createAs3DShape(e,i,t,o,r,e.id)},layerPropertyChanged:function(e,t,i){if("opacity"===e){if(this._i3sModel){var r=this._computeModelOpacityOverride();this._i3sModel.stageResources[l.ModelContentType.MATERIAL].forEach(function(e,t){if(r.overwrite)e.setParameterValues({opacity:r.overwrite,transparent:r.blendingRequired});else{var i=this._i3sModel.originalMaterialOpacities[t];null!=r.multiply&&(i*=r.multiply),e.setParameterValues({opacity:i,transparent:1>i})}}.bind(this))}else{var n=this._getMaterialOpacity();this._material.setParameterValues({opacity:n,transparent:1>n||this._isPropertyDriven("opacity")})}return!0}if("elevationInfo"===e){this._updateElevationInfo();var s=this._context.elevationProvider,c=this._context.renderCoordsHelper,h=o.perObjectElevationAligner,m=a.ELEV_MODES.ABSOLUTE_HEIGHT;for(var y in t){var p=t[y],u=p._graphics[i];if(u){var g=p.graphic,_=this._getGraphicElevationInfo(g);u.elevationAligner=_.mode!==m?h:null,u.elevationInfo.set(_),h(u,s,c)}}return!0}return!1},_createAs3DShape:function(e,t,i,n,s,c){var h,m=this._hasPerInstanceColor()?{color:this._mixinColorAndOpacity(i.color,i.opacity)}:null,y=this._computeObjectScale(i,!this._i3sModel),p=this._context.layer.id;if(this._i3sModel){var g=this._i3sModel.stageResources[l.ModelContentType.GEOMETRY],_=this._i3sModel.materialsByComponent,d=this._i3sModel.geometryTransformations;if(h=a.createStageObjectForPoint.call(this,t,null,null,null,null,n,s,p,c),null===h)return null;for(var v=0;v<g.length;v++){var f=d[v];if(y){var b=u.identity();u.scale(b,y),u.multiply(b,f),f=b}for(var M=_[v],E=M.length,O=new Array(E),T=0;E>T;T++)O[T]=m;h.addGeometry(g[v],M,f,O)}}else{var S,A=this.symbol;"bottom"===A.anchor&&"center"===this._geometryOrigin?S=[0,0,.5]:"center"===A.anchor&&"bottom"===this._geometryOrigin&&(S=[0,0,-.5]);var P=u.identity();y&&u.scale(P,y),S&&u.translate(P,S),h=a.createStageObjectForPoint.call(this,t,[this._geometry],[[this._material]],[P],[m],n,s,p,c)}if(null===h)return null;h.setCastShadow(!0);var G=null;n.mode!==a.ELEV_MODES.ABSOLUTE_HEIGHT&&(G=o.perObjectElevationAligner);var R=new r(this,h,null,null,null,G,n,r.VisibilityModes.REMOVE_OBJECT);return a.extendPointGraphicElevationInfo(R,t,this._context.elevationProvider),R},_computeObjectScale:function(e,t){var i;e.size&&this._isPropertyDriven("size")?(i=this._sizeToScale(e.size,this._boundingBox,this._symbolScale,null),p(null!=i[0],"sizeInfo has no values")):i=this._symbolScale?this._symbolScale.slice(0):t?f.slice(0):[1,1,1];for(var r=this._context.renderCoordsHelper.unitInMeters,o=2;o>=0;o--)i[o]/=r;return 1!==i[0]||1!==i[1]||1!==i[2]?i:null},_hasPerInstanceColor:function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")}});return M});