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

define(["./GLVBO","./GLSLProgram","./VertexBufferLayout","./GLUtil","./Camera","./Util","./gl-matrix"],function(e,t,a,r,i,n,o){var s=o.vec2d,c=o.vec3d,f=o.vec4d,u=o.mat3d,E=o.mat4d,d=o.mat4,l=function(o,l){function T(e,t,a,r,i,o,c,f){s.set2(0,0,tt);var u;for(u=0;4>u;++u)s.add(tt,e[u],tt);for(s.scale(tt,.25),s.set2(0,0,at),u=4;8>u;++u)s.add(at,e[u],at);s.scale(at,.25),s.lerp(e[4],e[5],.5,rt[0]),s.lerp(e[5],e[6],.5,rt[1]),s.lerp(e[6],e[7],.5,rt[2]),s.lerp(e[7],e[4],.5,rt[3]);var E=0,d=s.dist2(rt[0],tt);for(u=1;4>u;++u){var l=s.dist2(rt[u],tt);d>l&&(d=l,E=u)}s.subtract(rt[E],e[E+4],it);var T=it[0];it[0]=-it[1],it[1]=T,s.subtract(at,tt,nt),s.lerp(it,nt,a),s.normalize(it);var R,h;for(R=h=s.dot(s.subtract(e[0],tt,ot),it),u=1;8>u;++u){var b=s.dot(s.subtract(e[u],tt,ot),it);R>b?R=b:b>h&&(h=b)}s.set(tt,r),s.scale(it,R-t,ot),s.add(r,ot,r);var m=-1,v=1,M=0,x=0;for(u=0;8>u;++u){s.subtract(e[u],r,st),s.normalize(st);var F=it[0]*st[1]-it[1]*st[0];F>0?F>m&&(m=F,M=u):v>F&&(v=F,x=u)}n.verify(m>0,"leftArea"),n.verify(0>v,"rightArea"),s.scale(it,R,ct),s.add(ct,tt,ct),s.scale(it,h,ft),s.add(ft,tt,ft),ut[0]=-it[1],ut[1]=it[0];var p=n.rayRay2D(r,e[x],ft,s.add(ft,ut,ot),1,i),U=n.rayRay2D(r,e[M],ft,ot,1,o),_=n.rayRay2D(r,e[M],ct,s.add(ct,ut,ot),1,c),g=n.rayRay2D(r,e[x],ct,ot,1,f);n.verify(p,"rayRay"),n.verify(U,"rayRay"),n.verify(_,"rayRay"),n.verify(g,"rayRay")}function R(e,t){return 3*t+e}function h(e,t){return c.set3(e[t],e[t+3],e[t+6],Et),Et}function b(e,t,a,r,i){s.scale(s.subtract(a,r,dt),.5),lt[0]=dt[0],lt[1]=dt[1],lt[2]=0,lt[3]=dt[1],lt[4]=-dt[0],lt[5]=0,lt[6]=dt[0]*dt[0]+dt[1]*dt[1],lt[7]=dt[0]*dt[1]-dt[1]*dt[0],lt[8]=1,lt[R(0,2)]=-s.dot(h(lt,0),e),lt[R(1,2)]=-s.dot(h(lt,1),e);var n=s.dot(h(lt,0),a)+lt[R(0,2)],o=s.dot(h(lt,1),a)+lt[R(1,2)],c=s.dot(h(lt,0),r)+lt[R(0,2)],f=s.dot(h(lt,1),r)+lt[R(1,2)];n=-(n+c)/(o+f),lt[R(0,0)]+=lt[R(1,0)]*n,lt[R(0,1)]+=lt[R(1,1)]*n,lt[R(0,2)]+=lt[R(1,2)]*n,n=1/(s.dot(h(lt,0),a)+lt[R(0,2)]),o=1/(s.dot(h(lt,1),a)+lt[R(1,2)]),lt[R(0,0)]*=n,lt[R(0,1)]*=n,lt[R(0,2)]*=n,lt[R(1,0)]*=o,lt[R(1,1)]*=o,lt[R(1,2)]*=o,lt[R(2,0)]=lt[R(1,0)],lt[R(2,1)]=lt[R(1,1)],lt[R(2,2)]=lt[R(1,2)],lt[R(1,2)]+=1,n=s.dot(h(lt,1),t)+lt[R(1,2)],o=s.dot(h(lt,2),t)+lt[R(2,2)],c=s.dot(h(lt,1),a)+lt[R(1,2)],f=s.dot(h(lt,2),a)+lt[R(2,2)],n=-.5*(n/o+c/f),lt[R(1,0)]+=lt[R(2,0)]*n,lt[R(1,1)]+=lt[R(2,1)]*n,lt[R(1,2)]+=lt[R(2,2)]*n,n=s.dot(h(lt,1),t)+lt[R(1,2)],o=s.dot(h(lt,2),t)+lt[R(2,2)],c=-o/n,lt[R(1,0)]*=c,lt[R(1,1)]*=c,lt[R(1,2)]*=c,i[0]=lt[0],i[1]=lt[1],i[2]=0,i[3]=lt[2],i[4]=lt[3],i[5]=lt[4],i[6]=0,i[7]=lt[5],i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=lt[6],i[13]=lt[7],i[14]=0,i[15]=lt[8]}var m,v,M,x,F,p,U=!1,_=4096,g=r.createEmptyTexture(l),D=1,A=2,y=[0,0,0,0,0],w=function(){this.camera=new i,this.lightMat=E.create()},S=[];for(x=0;4>x;++x)S[x]=new w;this.getIsSupported=function(){return l.getExtension("OES_standard_derivatives")},this.setTextureResolution=function(e){_=e},this.getTextureResolution=function(){return _},this.setMaxNumCascades=function(e){A=n.clamp(Math.floor(e),1,4)},this.getMaxNumCascades=function(){return A},this.setEnableState=function(e){n.assert(e!==this.getEnableState()),e?this.enable():this.disable()},this.getEnableState=function(){return void 0!==m},this.enable=function(){n.assert(!this.getEnableState()),n.assert(this.getIsSupported(),"Shadow maps not supported"),m=l.createTexture(),l.bindTexture(l.TEXTURE_2D,m),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.NEAREST),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MAG_FILTER,l.NEAREST),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE),l.texImage2D(l.TEXTURE_2D,0,l.RGBA,_,_,0,l.RGBA,l.UNSIGNED_BYTE,null),v=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,v),l.renderbufferStorage(l.RENDERBUFFER,l.DEPTH_COMPONENT16,_,_),M=l.createFramebuffer(),l.bindFramebuffer(l.FRAMEBUFFER,M),l.framebufferTexture2D(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,m,0),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.RENDERBUFFER,v),r.checkFramebufferStatus(l.FRAMEBUFFER,l),l.bindTexture(l.TEXTURE_2D,null),l.bindRenderbuffer(l.RENDERBUFFER,null),l.bindFramebuffer(l.FRAMEBUFFER,null)},this.disable=function(){n.assert(this.getEnableState()),l.deleteFramebuffer(M),l.deleteRenderbuffer(v),l.deleteTexture(m),M=void 0,v=void 0,m=void 0};var B=E.create(),X=E.create(),P=f.create(),N=new Array(8);for(x=0;8>x;++x)N[x]=f.create();var C=c.create(),L=c.create(),I=s.create(),G=s.create(),O=s.create(),j=s.create(),H=s.create(),V=E.create(),z=c.create();this.prepare=function(e,t,a,r,i){n.assert(this.getEnableState()),E.multiply(e.projectionMatrix,e.viewMatrix,B);var o=i[0],s=i[1];2>o&&(o=2),2>s&&(s=2),o>=s&&(o=2,s=4),D=Math.min(1+Math.floor(n.logWithBase(s/o,4)),A);for(var u=Math.pow(s/o,1/D),d=0;D+1>d;++d)y[d]=o*Math.pow(u,d);E.inverse(B,X),E.lookAt([0,0,0],[-t[0],-t[1],-t[2]],[0,1,0],V);var R=e.viewMatrix,h=e.projectionMatrix;for(d=0;D>d;++d){var m=S[d],v=-y[d],x=-y[d+1],U=(h[10]*v+h[14])/Math.abs(h[11]*v+h[15]),g=(h[10]*x+h[14])/Math.abs(h[11]*x+h[15]);for(n.assert(g>U),F=0;8>F;++F){var w=F%4===0||F%4==3?-1:1,W=F%4===0||F%4==1?-1:1,k=4>F?U:g;for(f.set4(w,W,k,1,P),E.multiplyVec4(X,P,N[F]),p=0;3>p;++p)N[F][p]/=N[F][3]}for(c.negate(N[0],z),E.translate(V,z,m.camera.viewMatrix),F=0;8>F;++F)E.multiplyVec3(m.camera.viewMatrix,N[F]);for(c.set(N[0],C),c.set(N[0],L),F=1;8>F;++F)for(p=0;3>p;++p)C[p]=Math.min(C[p],N[F][p]),L[p]=Math.max(L[p],N[F][p]);C[2]-=200,L[2]+=200,m.camera.near=-L[2],m.camera.far=-C[2];var Y=!0;if(Y){o=1/N[0][3],s=1/N[4][3],n.assert(s>o);var q=o+Math.sqrt(o*s),Q=Math.sin(Math.acos(R[2]*t[0]+R[6]*t[1]+R[10]*t[2]));q/=Q,T(N,q,Q,I,G,O,j,H),b(I,G,j,H,m.camera.projectionMatrix),m.camera.projectionMatrix[10]=2/(C[2]-L[2]),m.camera.projectionMatrix[14]=-(C[2]+L[2])/(C[2]-L[2])}else E.ortho(C[0],L[0],C[1],L[1],m.camera.near,m.camera.far,m.camera.projectionMatrix);E.multiply(m.camera.projectionMatrix,m.camera.viewMatrix,m.lightMat);var J=_/2;m.camera.viewport[0]=d%2===0?0:J,m.camera.viewport[1]=0===Math.floor(d/2)?0:J,m.camera.viewport[2]=J,m.camera.viewport[3]=J}y[D]=100*s,l.bindFramebuffer(l.FRAMEBUFFER,M),l.activeTexture(l.TEXTURE7),l.bindTexture(l.TEXTURE_2D,null),l.activeTexture(l.TEXTURE0),l.clearColor(1,1,1,1),l.clear(l.COLOR_BUFFER_BIT|l.DEPTH_BUFFER_BIT)};var W=[];this.getCascades=function(){for(var e=0;D>e;++e)W[e]=S[e];return W.length=D,W},this.finish=function(e){n.assert(this.getEnableState()),t.unuse(l),l.bindFramebuffer(l.FRAMEBUFFER,e),U&&(l.bindTexture(l.TEXTURE_2D,m),l.generateMipmap(l.TEXTURE_2D))},this.bind=function(e){var t=this.getEnableState();l.activeTexture(l.TEXTURE7),l.bindTexture(l.TEXTURE_2D,t?m:g),l.activeTexture(l.TEXTURE0),e.use(),e.uniform1i("depthTex",7),e.uniform1f("depthHalfPixelSz",t?.5/_:-1),e.uniform1i("shadowMapNum",D),e.uniform4f("shadowMapDistance",y[0],y[1],y[2],y[3])},this.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])};var k=d.create(),Y=new Float32Array(64);this.bindView=function(e,t){if(this.getEnableState()){var a;for(d.translate(S[0].lightMat,t,k),a=0;16>a;++a)Y[a]=k[a];for(d.translate(S[1].lightMat,t,k),a=0;16>a;++a)Y[16+a]=k[a];for(d.translate(S[2].lightMat,t,k),a=0;16>a;++a)Y[32+a]=k[a];for(d.translate(S[3].lightMat,t,k),a=0;16>a;++a)Y[48+a]=k[a];e.uniformMatrix4fv("shadowMapMatrix",Y)}};var q=0,Q=0,J=256,K=256,Z=new Float32Array(16);Z[0]=q,Z[1]=Q,Z[2]=0,Z[3]=0,Z[4]=q+J,Z[5]=Q,Z[6]=1,Z[7]=0,Z[8]=q,Z[9]=Q+K,Z[10]=0,Z[11]=1,Z[12]=q+J,Z[13]=Q+K,Z[14]=1,Z[15]=1;var $=a.Defaults.Pos2Tex,et=new e(Z,$,l);this.drawDebugQuad=function(e){n.assert(this.getEnableState());var a=o.get("showDepth");l.disable(l.DEPTH_TEST),a.use(),a.uniformMatrix4fv("proj",e),a.uniform1i("depthTex",0),l.bindTexture(l.TEXTURE_2D,m),$.enableVertexAttribArrays(l,a),et.bind(),et.setPointers(a),l.drawArrays(l.TRIANGLE_STRIP,0,et.getNum()),l.bindBuffer(l.ARRAY_BUFFER,null),$.disableVertexAttribArrays(l,a),l.bindTexture(l.TEXTURE_2D,null),t.unuse(l),l.enable(l.DEPTH_TEST)};var tt=s.create(),at=s.create(),rt=[s.create(),s.create(),s.create(),s.create()],it=s.create(),nt=s.create(),ot=s.create(),st=s.create(),ct=s.create(),ft=s.create(),ut=s.create(),Et=c.create(),dt=s.create(),lt=u.create()};return l});