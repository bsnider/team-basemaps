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

define(["../../../../core/declare","dojo/_base/lang","../../support/PromiseLightweight","../../lib/glMatrix","../../webgl-engine/Stage","../../webgl-engine/lib/Util","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/materials/Material","../../webgl-engine/lib/Texture"],function(e,t,n,r,a,o,i,s,l,u){var m=r.mat4d,c=o.assert,p=e(null,{constructor:function(e){this.streamDataSupplier=e},destroy:function(){},fetchSymbol:function(e,t){t=t||{};var r=new n.Promise;return this.streamDataSupplier.request(e,"json").then(function(e,n){var a=this._createStageResources(n,t);r.done(a)}.bind(this),function(){r.reject()}),r},_gatherExternalTextures:function(e){for(var t in e.textureDefinitions)for(var n=e.textureDefinitions[t],r=0;r<n.images.length;r++){var a=n.images[r];"href"in a&&console.warn("External image resources not yet supported")}return{}},_extractTextureImageFromBin:function(e,t){var r=new n.Promise,a=new Uint8Array(e,t.byteOffset,t.length),o=new Blob([a],{type:t.encoding}),i=window.URL.createObjectURL(o),s=new Image;return s.onerror=function(){window.URL.revokeObjectURL(i),r.reject(),s.url="",s.onerror=void 0,s.onload=void 0},s.onload=function(){window.URL.revokeObjectURL(i),t.img=s,r.done(),s.url="",s.onerror=void 0,s.onload=void 0},s.src=i,r},_createStageResources:function(e,n){var r=[],o=[],p=[],f=[],g=[],v=[],y="meshsymbol_"+e.model.name,b=e.textureDefinitions,x={};for(var h in b){var w=b[h],R=w.images[0].data;c(R,"symbol resources must have embedded texture data (at the moment)");var I=w.encoding+";base64,"+R,T="/textureDefinitions/"+h,U=new u(I,y,{noUnpackFlip:!0});g.push(U),x[T]={engineTexObj:U,transparent:"rgba"===w.channels}}for(var O=e.model.geometries,S=e.materialDefinitions,j=0;j<O.length;j++){var A=O[j];A.params.components||this._createSingleComponent(A);var M,D=A.params.components,E=D.length,L=A.params.faces,_=A.params.vertexAttributes,P=A.params.topology||"Indexed",C={};for(M in _){var k=_[M];c(k.values,"symbol resources with external geometry bin not yet supported"),C[M]={data:k.values,size:k.valuesPerElement}}var B,F,G=new Array(E);if("Indexed"===P){B=L.componentIndices,F={};for(M in L)F[M]=L[M].byteOffset}else"PerAttributeArray"!==P?console.warn("I3S symbol loader: unsupported topology type "+P):1!==E&&console.warn("I3S symbol loader: if topology is not Indexed, only single component geometries are supported");p.push([]);for(var z=0;z<D.length;z++){var q=D[z],K={type:"triangle",positionKey:"position",indices:{}};if(B){var V=E-1>z?B[z+1]-B[z]:L.position.count-B[z];for(M in L)if("componentIndices"!==M){var X=L[M];c(X.values,"symbol resources with external geometry bin not yet supported"),K.indices[M]=new Uint32Array(X.values),F[M]+=4*V}}else{var Y=d(C.position.data.length/C.position.size);for(M in C)K.indices[M]=Y}G[z]=K;var H;q.texture&&(H=x[q.texture].engineTexObj.getId());var J=f[q.material]?f[q.material][q.texture]:null;if(!J){var N=q.material.substring(q.material.lastIndexOf("/")+1),Q=S[N].params;1===Q.transparency&&(Q.transparency=0);var W={ambient:Q.diffuse,diffuse:Q.diffuse,specular:Q.specular,shininess:Q.shininess,opacity:1-Q.transparency,textureId:H,doubleSided:!0,cullFace:"none",flipV:!1};W.transparent=W.opacity<1,n.materialParamsMixin&&t.mixin(W,n.materialParamsMixin),J=new l(W,y),f[q.material]||(f[q.material]={}),f[q.material][q.texture]=J,o.push(J)}p[j].push(J)}var Z=new i(new s(G,C),y),$=m.create(A.transformation);r.push(Z),v.push($)}var et={};return et.stageResources={},et.stageResources[a.ModelContentType.TEXTURE]=g,et.stageResources[a.ModelContentType.MATERIAL]=o,et.stageResources[a.ModelContentType.GEOMETRY]=r,et.geometryTransformations=v,et.materialsByComponent=p,et.pivotOffset=e.model.pivotOffset,et},_createSingleComponent:function(e){var t=e.params;c(t.material),t.components=[{id:1,material:e.params.material,texture:e.params.texture,region:e.params.texture}],t.faces&&(t.faces.componentIndices=[t.faces.position.count])}}),d=function(e){for(var t=new Uint32Array(e),n=0;e>n;n++)t[n]=n;return t};return p});