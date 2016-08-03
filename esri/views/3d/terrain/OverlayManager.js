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

define(["../../../core/declare","dojo/on","../support/mathUtils","../support/earthUtils","../support/projectionUtils","../support/aaBoundingRect","../lib/glMatrix","../webgl-engine/Stage","../webgl-engine/lib/Texture","../webgl-engine/lib/Util"],function(e,t,i,a,r,s,n,l,o,c){var h=n.vec2d,v=n.vec3d,y=n.vec4d,_=c.assert,d=2048,u=3.5,g=10,p={width:0,height:0,pixelRatio:0,views:null},f=[{viewport:y.create(),extent:y.create()}],x=[f[0],{viewport:y.create(),extent:y.create()}],w=y.create(),S=v.create(),R=[y.create(),y.create()],C=e(null,{constructor:function(e,t){this._view=t,this._stage=t._stage,this._overlaySR=null,this._renderSR=null,this._overlaySREqualsRenderSR=!0,this.terrainSurface=e,this._renderer=this._stage.getTextureGraphicsRenderer(),this._connectedLayers={},this._overlays=void 0,this._scale=0,this._dirty=!1},destroy:function(){for(var e in this._connectedLayers)this.unregisterLayerView(this._connectedLayers[e]);this._disposeOverlays()},hasOverlays:function(){return!!this._overlays},setSpatialReference:function(e,t){this._overlaySR=e,e?(this._renderSR=this._view.renderSpatialReference,this._overlaySREqualsRenderSR=this._overlaySR.equals(this._renderSR),this._isSpherical=t,this._longitudeCyclical=t?e.isWebMercator?new i.Cyclical(-20037508.342788905,20037508.342788905):new i.Cyclical(-180,180):null):(this._disposeOverlays(),this._longitudeCyclical=null)},registerLayerView:function(e){var i=e.layer.uid;_(!this._connectedLayers[i],"layer already connected");var a=t(e,"draped-data-change",function(){this.setOverlayDirty()}.bind(this));if(this._connectedLayers[i]={eventHandles:[a],layerView:e},e.setDrapingExtent&&this._overlays)for(var r=0;r<this._overlays.length;r++)e.setDrapingExtent(r,this._overlays[r].extent,this._overlaySR,d);this.setOverlayDirty()},unregisterLayerView:function(e){for(var t in this._connectedLayers){var i=this._connectedLayers[t];if(i.layerView===e){if(i.eventHandles)for(var a=0;a<i.eventHandles;a++)i.eventHandles[a].remove();delete this._connectedLayers[t],this.setOverlayDirty(),e._accessorProps&&(e._overlayUpdating=!1,e._evaluateUpdatingState())}}},setOverlayDirty:function(){this._dirty||(this._setOverlayUpdating(!0),this._dirty=!0)},_setOverlayUpdating:function(e){for(var t in this._connectedLayers){var i=this._connectedLayers[t].layerView;(!e||!i.suspended&&i.hasDraped)&&(i._overlayUpdating=e,i._evaluateUpdatingState())}var a=this._view._graphicsView;a&&(a._overlayUpdating=e,a._evaluateUpdatingState())},updateOverlay:function(){if(this._overlaySR){var e=this._computeOverlayExtents();if(e){this._overlays||this._initOverlays();for(var t=0;t<this._overlays.length;t++)if(m(e[t],this._overlays[t].extent)){y.set(e[t],this._overlays[t].extent);for(var i in this._connectedLayers){var a=this._connectedLayers[i].layerView;a.setDrapingExtent&&a.setDrapingExtent(t,e[t],this._overlaySR,d)}}this._setOverlayUpdating(!1),this._drawOverlays(),this.terrainSurface._updateTileOverlayParams(),this._dirty=!1}}},overlaysNeedUpdate:function(){return this._dirty&&this._overlaySR},updateOpacity:function(e){var t=1;if(this._overlays){var a=this._scale,r=this._view.renderCoordsHelper.getAltitude(e);a>r*u&&(t=(r-a/g)/(a/u-a/g),t=Math.sqrt(i.clamp(t,0,1)))}return t},setOverlayParamsOfTile:function(e,t,i){var a=e.extent,r=-1;if(this._rectInsideRect(a,this._overlays[0].extent)?r=0:this._rectanglesOverlap(a,this._overlays[1].extent)&&(r=1),r>=0){var s=this._overlays[r].extent;t.overlayTexScale[0]=(a[2]-a[0])/(s[2]-s[0]),t.overlayTexScale[1]=(a[3]-a[1])/(s[3]-s[1]);var n=a[0];if(this._longitudeCyclical){n=this._longitudeCyclical.minimalMonotonic(s[0],n);var l=this._longitudeCyclical.minimalMonotonic(s[0],a[2]);n>l&&(n=l-(a[2]-a[0]))}h.set2((n-s[0])/(s[2]-s[0]),(a[1]-s[1])/(s[3]-s[1]),t.overlayTexOffset),t.overlayTexId=this._overlays[r].texture.getId(),t.overlayOpacity=void 0!==i?i:1}else t.overlayTexId=null},overlayPixelSizeInMapUnits:function(e){var t;return this._overlays&&(this._overlays[0]&&this._pointIsInExtent(e,this._overlays[0].extent)?t=this._overlays[0].extent:this._overlays[1]&&(t=this._overlays[1].extent)),t?(t[2]-t[0])/d:0},_initOverlays:function(){this._overlays=new Array(2);for(var e=0;2>e;e++){var t=new o(null,"overlay",{wrapClamp:!0,mipmap:!0});this._stage.add(l.ModelContentType.TEXTURE,t),this._overlays[e]={texture:t,extent:y.create()}}},_disposeOverlays:function(){if(this._overlays){var e=this._stage;this._overlays.forEach(function(t){e.remove(l.ModelContentType.TEXTURE,t.texture.getId())}),this._overlays=null}},_overlayExtentIncTable:[[0,-1,2,1],[0,-2,2,0],[-1,-2,1,0],[-2,-2,0,0],[-2,-1,0,1],[-2,0,0,2],[-1,0,1,2],[0,0,2,2]],_computeOverlayExtents:function(){var e=this._view.navigation.currentCamera,t=this.terrainSurface.extent,s=v.create();v.set(e.center,s),this._scale=this._view.renderCoordsHelper.getAltitude(e.eye);var n=r.vectorToPoint(s,this._renderSR,this.terrainSurface.spatialReference),l=this.terrainSurface.getElevation(n);l?this._view.renderCoordsHelper.setAltitude(l,s):this._view.navigation.getCenterIntersectManifold(e.eye,e.center,s);var o=v.dist(e.eye,s),c=e.angleOfElevation;if(!isNaN(c)){this._overlaySREqualsRenderSR||r.vectorToVector(s,this._renderSR,s,this._overlaySR);var _=.5*d*e.perPixelRatio*o*2,u=!1,g=1/0;this._isSpherical&&(this._overlaySR.isWebMercator?(_/=Math.cos(r.webMercator.y2lat(s[1])),g=this.terrainSurface.extent[3],g*=.999):(u=!0,_/=a.metersPerDegree,g=90),_>=g&&(_=g,s[1]=0,this._overlaySR.isWebMercator&&(s[0]=0)));var p=1;u&&(p=1/Math.max(.2,Math.cos(Math.abs(i.deg2rad(s[1])))),_*p>180&&(p=180/_));var f=_*p,x=R[0];x[0]=s[0]-f,x[1]=s[1]-_,x[2]=s[0]+f,x[3]=s[1]+_,this._isSpherical&&this._shiftExtentToFitBounds(x,1/0,g);var C=R[1];if(y.set(x,C),6*f>t[2]-t[0])y.set(t,C);else if(c>.25*Math.PI)C[0]-=f,C[1]-=_,C[2]+=f,C[3]+=_;else{r.vectorToVector(e.eye,this._renderSR,S,this._overlaySR),h.subtract(s,S,w);var m=-Math.atan2(w[1],w[0])+.125*Math.PI;0>m&&(m+=2*Math.PI);var M=Math.floor(m/(.25*Math.PI));y.scale(this._overlayExtentIncTable[M],2*_,w),w[0]*=p,w[2]*=p,y.add(C,w,C)}return this._isSpherical&&(C[0]=this._longitudeCyclical.clamp(C[0]),C[2]=this._longitudeCyclical.clamp(C[2]),C[1]=Math.max(C[1],-g),C[3]=Math.min(C[3],g)),this.opacity=1,R}},_drawOverlays:function(){for(var e=this._overlays[0].extent[2]-this._overlays[0].extent[0],t=this._stage.getTextureGraphicsRenderer(),i=0;i<this._overlays.length;i++){var a=this._overlays[i].extent,r=this._longitudeCyclical?a[2]>this._longitudeCyclical.max:!1,s=this._longitudeCyclical?a[0]<this._longitudeCyclical.min:!1;if(r||s){p.views=x;var n;n=r?this._longitudeCyclical.max-a[0]:this._longitudeCyclical.min-a[0];var l=Math.round(n/(a[2]-a[0])*d),o=p.views[0];y.set4(0,0,l,d,o.viewport),y.set4(a[0],a[1],this._longitudeCyclical.max,a[3],o.extent),r||(o.extent[0]+=this._longitudeCyclical.range);var c=p.views[1];y.set4(l,0,d-l,d,c.viewport),y.set4(this._longitudeCyclical.min,a[1],a[2],a[3],c.extent),r&&(c.extent[2]-=this._longitudeCyclical.range)}else p.views=f,y.set(a,p.views[0].extent),y.set4(0,0,d,d,p.views[0].viewport);p.width=d,p.height=d,p.pixelRatio=e/(a[2]-a[0]),t.draw(this._overlays[i].texture,p)}},_rectanglesOverlap:function(e,t){return this._longitudeCyclical?(this._longitudeCyclical.contains(t[0],t[2],e[0])||this._longitudeCyclical.contains(t[0],t[2],e[2]))&&!(e[1]>t[3]||e[3]<t[1]):!(e[0]>t[2]||e[2]<t[0]||e[1]>t[3]||e[3]<t[1])},_rectInsideRect:function(e,t){return this._longitudeCyclical?this._longitudeCyclical.contains(t[0],t[2],e[0])&&this._longitudeCyclical.contains(t[0],t[2],e[2])&&e[1]>t[1]&&e[3]<t[3]:e[0]>t[0]&&e[2]<t[2]&&e[1]>t[1]&&e[3]<t[3]},_pointIsInExtent:function(e,t){if(this._longitudeCyclical)return this._longitudeCyclical.contains(t[0],t[2],e.x)&&e.y>=t[1]&&e.y<=t[3];var i=e.x,a=e.y;return i>t[0]&&i<t[2]&&a>t[1]&&a<t[3]},_shiftExtentToFitBounds:function(e,t,i){var a=0,r=0;e[0]<-t?a=e[0]+t:e[2]>t&&(a=t-e[2]),e[1]<-i?r=e[1]+i:e[3]>i&&(r=i-e[3]),s.offset(e,a,r)}}),m=function(e,t){for(var i=1e-5*Math.max(e[2]-e[0],e[3]-e[1],t[2]-t[0],t[3]-t[1]),a=0;4>a;a++)if(Math.abs(t[a]-e[a])>i)return!0;return!1};return C});