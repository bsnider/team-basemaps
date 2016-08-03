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

define(["require","exports","./GLSLShader","./gl-matrix"],function(t,i,n,e){function r(t,i){return t[0]===i[0]&&t[1]===i[1]&&t[2]===i[2]&&t[3]===i[3]&&t[4]===i[4]&&t[5]===i[5]&&t[6]===i[6]&&t[7]===i[7]&&t[8]===i[8]&&t[9]===i[9]&&t[10]===i[10]&&t[11]===i[11]&&t[12]===i[12]&&t[13]===i[13]&&t[14]===i[14]&&t[15]===i[15]}var o=e.vec2d,s=e.vec3d,a=e.vec4d,h=e.mat4d,m=function(){function t(i,n){this.gl=n,this.shaders=i,this.globalIndex=t.nextGlobalProgramIndex++,this.glName=void 0,this.name2uniformLoc={},this.name2attribLoc={},this.name2uniform1={},this.name2uniform2={},this.name2uniform3={},this.name2uniform4={},this.name2uniformMatrix4={}}return t.prototype.init=function(){if(void 0===this.glName){this.glName=this.gl.createProgram();for(var t=0;t<this.shaders.length;++t)this.gl.attachShader(this.glName,this.shaders[t].getGLName());this.linkShaders()}},t.prototype.linkShaders=function(){if(null!=this.glName){var t=this.gl;t.linkProgram(this.glName),t.getProgramParameter(this.glName,this.gl.LINK_STATUS)||console.error("Could not initialize shader\nVALIDATE_STATUS: "+t.getProgramParameter(this.glName,t.VALIDATE_STATUS)+", gl error ["+t.getError()+"]infoLog: "+t.getProgramInfoLog(this.glName)),this.name2uniformLoc={},this.name2attribLoc={}}},t.prototype.clearLookupTables=function(){this.name2uniformLoc={},this.name2attribLoc={},this.name2uniform1={},this.name2uniform2={},this.name2uniform3={},this.name2uniform4={},this.name2uniformMatrix4={}},t.prototype.getId=function(){return this.globalIndex},t.prototype.getShader=function(t){return this.shaders["vertex"===t?0:1]},t.prototype.changeShaderDefines=function(t,i){var n=this.shaders[t].changeDefines(i);n&&this.linkShaders()},t.prototype.use=function(){t.lastUsedProgram!==this&&(this.init(),this.gl.useProgram(this.glName),t.lastUsedProgram=this)},t.prototype.getLocation=function(t){return this.init(),null==this.name2uniformLoc[t]&&(this.name2uniformLoc[t]=this.gl.getUniformLocation(this.glName,t)),this.name2uniformLoc[t]},t.prototype.hasUniform=function(t){return null!==this.getLocation(t)},t.prototype.getAttribLocation=function(t){return this.init(),null==this.name2attribLoc[t]&&(this.name2attribLoc[t]=this.gl.getAttribLocation(this.glName,t)),this.name2attribLoc[t]},t.prototype.uniform1i=function(t,i){var n=this.name2uniform1[t];(null==n||i!==n)&&(this.use(),this.gl.uniform1i(this.getLocation(t),i),this.name2uniform1[t]=i)},t.prototype.uniform1f=function(t,i){var n=this.name2uniform1[t];(null==n||i!==n)&&(this.use(),this.gl.uniform1f(this.getLocation(t),i),this.name2uniform1[t]=i)},t.prototype.uniform2f=function(t,i,n){var e=this.name2uniform2[t];(null==e||i!==e[0]||n!==e[1])&&(this.use(),this.gl.uniform2f(this.getLocation(t),i,n),null==e?this.name2uniform2[t]=o.createFrom(i,n):o.set2(i,n,e))},t.prototype.uniform2fv=function(t,i){var n=this.name2uniform2[t];(i.length>2||null==n||i[0]!==n[0]||i[1]!==n[1])&&(this.use(),this.gl.uniform2fv(this.getLocation(t),i),null==n?this.name2uniform2[t]=o.create(i):o.set(i,n))},t.prototype.uniform3f=function(t,i,n,e){var r=this.name2uniform3[t];(null==r||i!==r[0]||n!==r[1]||e!==r[2])&&(this.use(),this.gl.uniform3f(this.getLocation(t),i,n,e),null==r?this.name2uniform3[t]=s.createFrom(i,n,e):s.set3(i,n,e,r))},t.prototype.uniform3fv=function(t,i){var n=this.name2uniform3[t];(i.length>3||null==n||i[0]!==n[0]||i[1]!==n[1]||i[2]!==n[2])&&(this.use(),this.gl.uniform3fv(this.getLocation(t),i),null==n?this.name2uniform3[t]=s.create(i):s.set(i,n))},t.prototype.uniform4f=function(t,i,n,e,r){var o=this.name2uniform4[t];(null==o||i!==o[0]||n!==o[1]||e!==o[2]||r!==o[3])&&(this.use(),this.gl.uniform4f(this.getLocation(t),i,n,e,r),null==o?this.name2uniform4[t]=a.createFrom(i,n,e,r):a.set4(i,n,e,r,o))},t.prototype.uniform4fv=function(t,i){var n=this.name2uniform4[t];(i.length>4||null==n||i[0]!==n[0]||i[1]!==n[1]||i[2]!==n[2]||i[3]!==n[3])&&(this.use(),this.gl.uniform4fv(this.getLocation(t),i),null==n?this.name2uniform4[t]=a.create(i):a.set(i,n))},t.prototype.uniformMatrix4fv=function(t,i){var n=this.name2uniformMatrix4[t];(i.length>16||null==n||!r(n,i))&&(this.use(),this.gl.uniformMatrix4fv(this.getLocation(t),!1,i),null==n?this.name2uniformMatrix4[t]=h.create(i):h.set(i,n))},t.prototype.dispose=function(){if(null!=this.glName){for(var t=0;t<this.shaders.length;++t){var i=this.shaders[t].getGLName();this.gl.detachShader(this.glName,i),this.gl.deleteShader(i)}this.gl.deleteProgram(this.glName)}},t.fromSnippets=function(i,e,r,o,s){var a=[];i=Array.isArray(i)?i:[i],e=Array.isArray(e)?e:[e];for(var h=0;h<i.length;h++)a.push(new n(o.VERTEX_SHADER,r[i[h]],o,s));for(var h=0;h<e.length;h++)a.push(new n(o.FRAGMENT_SHADER,r[e[h]],o,s));return new t(a,o)},t.unuse=function(i){t.lastUsedProgram=null,i.useProgram(null)},t.nextGlobalProgramIndex=0,t.lastUsedProgram=null,t}();return m});