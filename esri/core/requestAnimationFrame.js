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

define(["dojo/_base/window","dojo/sniff","./now"],function(e,n,o){var t,i=e.global,a=n("ff"),r=n("ie"),f=n("webkit"),m=n("opera"),u=Date.now(),w=i.requestAnimationFrame;return w||(t=f&&"webkit"||a&&"moz"||m&&"o"||r&&"ms",w=i[t+"RequestAnimationFrame"],w||(w=function(e){var n=Date.now(),t=Math.max(0,16-(n-u)),a=i.setTimeout(function(){e(o())},t);return u=n+t,a})),w});