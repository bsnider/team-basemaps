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

define(["../../../core/declare","../../../core/Accessoire","../../../core/AccessoirePromise","dojo/Deferred","dojo/aspect","dojo/_base/lang"],function(e,t,i,n,s,r){var d=e([t,i],{"-chains-":r.mixin(t._meta.chains,{setup:"after",initializeRenderContext:"after"}),classMetadata:{properties:{gl:{readOnly:!0,getter:function(){return this._gl}},needsRender:{value:!0},visible:{value:!0},needsDepthMap:{value:!1}}},constructor:function(){this.didRender=!1,this.renderContext=null,this.watch("visible",function(){this.needsRender=!0}.bind(this)),this._contextDfd=new n},initialize:function(){this.addResolvingPromise(this._contextDfd.promise),s.around(this,"render",function(e){return function(){return this.isRejected()?(this.didRender=!0,!0):this.isResolved()&&(!this.visible||e.apply(this,arguments))?(this.didRender=!0,!0):!1}.bind(this)}.bind(this)),this.then(function(){this._accessorProps&&this.setup(this.renderContext)}.bind(this))},needsRender:!0,visible:!0,needsDepthMap:!1,initializeRenderContext:function(e){this.renderContext=e,this._contextDfd.resolve()},setup:function(){},render:function(){return!1}});return d});