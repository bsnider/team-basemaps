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

/*
 * Poly2Tri Copyright (c) 2009-2013, Poly2Tri Contributors
 * http://code.google.com/p/poly2tri/
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * * Neither the name of Poly2Tri nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

define([],function(){"use strict";function t(t,e,n){var i=(t.x-n.x)*(e.y-n.y),o=(t.y-n.y)*(e.x-n.x),r=i-o;return r>-l&&l>r?d.COLLINEAR:r>0?d.CCW:d.CW}function e(t,e,n,i){var o=i.x,r=i.y,s=t.x-o,a=t.y-r,p=e.x-o,h=e.y-r,d=s*h,g=p*a,u=d-g;if(l>=u)return!1;var f=n.x-o,_=n.y-r,c=f*a,y=s*_,v=c-y;return l>=v?!1:!0}var n={},i=function(t,e){this.name="PointError",this.points=e=e||[],this.message=t||"Invalid Points!";for(var n=0;n<e.length;n++)this.message+=" "+o.toString(e[n])};i.prototype=new Error,i.prototype.constructor=i;var o=function(t,e,n){this.x=+t||0,this.y=+e||0,this.metaZ=+n||0,this._p2t_edge_list=null};o.prototype.toString=function(){return"("+this.x+";"+this.y+")"},o.prototype.clone=function(){return new o(this.x,this.y)},o.prototype.set_zero=function(){return this.x=0,this.y=0,this},o.prototype.set=function(t,e){return this.x=+t||0,this.y=+e||0,this},o.prototype.negate=function(){return this.x=-this.x,this.y=-this.y,this},o.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},o.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},o.prototype.mul=function(t){return this.x*=t,this.y*=t,this},o.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},o.prototype.normalize=function(){var t=this.length();return this.x/=t,this.y/=t,t},o.prototype.equals=function(t){return this.x===t.x&&this.y===t.y},o.negate=function(t){return new o(-t.x,-t.y)},o.add=function(t,e){return new o(t.x+e.x,t.y+e.y)},o.sub=function(t,e){return new o(t.x-e.x,t.y-e.y)},o.mul=function(t,e){return new o(t*e.x,t*e.y)},o.cross=function(t,e){return"number"==typeof t?"number"==typeof e?t*e:new o(-t*e.y,t*e.x):"number"==typeof e?new o(e*t.y,-e*t.x):t.x*e.y-t.y*e.x},o.toString=function(t){var e=t.toString();return"[object Object]"===e?o.prototype.toString.call(t):e},o.compare=function(t,e){return t.y===e.y?t.x-e.x:t.y-e.y},o.cmp=o.compare,o.equals=function(t,e){return t.x===e.x&&t.y===e.y},o.dot=function(t,e){return t.x*e.x+t.y*e.y};var r=function(t,e){if(this.p=t,this.q=e,t.y>e.y)this.q=t,this.p=e;else if(t.y===e.y)if(t.x>e.x)this.q=t,this.p=e;else if(t.x===e.x)throw new i("poly2tri Invalid Edge constructor: repeated points!",[t]);this.q._p2t_edge_list||(this.q._p2t_edge_list=[]),this.q._p2t_edge_list.push(this)},s=function(t,e,n){this.points_=[t,e,n],this.neighbors_=[null,null,null],this.interior_=!1,this.constrained_edge=[!1,!1,!1],this.delaunay_edge=[!1,!1,!1]};s.prototype.toString=function(){var t=o.toString;return"["+t(this.points_[0])+t(this.points_[1])+t(this.points_[2])+"]"},s.prototype.getPoint=function(t){return this.points_[t]},s.prototype.GetPoint=s.prototype.getPoint,s.prototype.getNeighbor=function(t){return this.neighbors_[t]},s.prototype.containsPoint=function(t){var e=this.points_;return t===e[0]||t===e[1]||t===e[2]},s.prototype.containsEdge=function(t){return this.containsPoint(t.p)&&this.containsPoint(t.q)},s.prototype.containsPoints=function(t,e){return this.containsPoint(t)&&this.containsPoint(e)},s.prototype.isInterior=function(){return this.interior_},s.prototype.setInterior=function(t){return this.interior_=t,this},s.prototype.markNeighborPointers=function(t,e,n){var i=this.points_;if(t===i[2]&&e===i[1]||t===i[1]&&e===i[2])this.neighbors_[0]=n;else if(t===i[0]&&e===i[2]||t===i[2]&&e===i[0])this.neighbors_[1]=n;else{if(!(t===i[0]&&e===i[1]||t===i[1]&&e===i[0]))throw new Error("poly2tri Invalid Triangle.markNeighborPointers() call");this.neighbors_[2]=n}},s.prototype.markNeighbor=function(t){var e=this.points_;t.containsPoints(e[1],e[2])?(this.neighbors_[0]=t,t.markNeighborPointers(e[1],e[2],this)):t.containsPoints(e[0],e[2])?(this.neighbors_[1]=t,t.markNeighborPointers(e[0],e[2],this)):t.containsPoints(e[0],e[1])&&(this.neighbors_[2]=t,t.markNeighborPointers(e[0],e[1],this))},s.prototype.clearNeigbors=function(){this.neighbors_[0]=null,this.neighbors_[1]=null,this.neighbors_[2]=null},s.prototype.clearDelunayEdges=function(){this.delaunay_edge[0]=!1,this.delaunay_edge[1]=!1,this.delaunay_edge[2]=!1},s.prototype.pointCW=function(t){var e=this.points_;return t===e[0]?e[2]:t===e[1]?e[0]:t===e[2]?e[1]:null},s.prototype.pointCCW=function(t){var e=this.points_;return t===e[0]?e[1]:t===e[1]?e[2]:t===e[2]?e[0]:null},s.prototype.neighborCW=function(t){return t===this.points_[0]?this.neighbors_[1]:t===this.points_[1]?this.neighbors_[2]:this.neighbors_[0]},s.prototype.neighborCCW=function(t){return t===this.points_[0]?this.neighbors_[2]:t===this.points_[1]?this.neighbors_[0]:this.neighbors_[1]},s.prototype.getConstrainedEdgeCW=function(t){return t===this.points_[0]?this.constrained_edge[1]:t===this.points_[1]?this.constrained_edge[2]:this.constrained_edge[0]},s.prototype.getConstrainedEdgeCCW=function(t){return t===this.points_[0]?this.constrained_edge[2]:t===this.points_[1]?this.constrained_edge[0]:this.constrained_edge[1]},s.prototype.setConstrainedEdgeCW=function(t,e){t===this.points_[0]?this.constrained_edge[1]=e:t===this.points_[1]?this.constrained_edge[2]=e:this.constrained_edge[0]=e},s.prototype.setConstrainedEdgeCCW=function(t,e){t===this.points_[0]?this.constrained_edge[2]=e:t===this.points_[1]?this.constrained_edge[0]=e:this.constrained_edge[1]=e},s.prototype.getDelaunayEdgeCW=function(t){return t===this.points_[0]?this.delaunay_edge[1]:t===this.points_[1]?this.delaunay_edge[2]:this.delaunay_edge[0]},s.prototype.getDelaunayEdgeCCW=function(t){return t===this.points_[0]?this.delaunay_edge[2]:t===this.points_[1]?this.delaunay_edge[0]:this.delaunay_edge[1]},s.prototype.setDelaunayEdgeCW=function(t,e){t===this.points_[0]?this.delaunay_edge[1]=e:t===this.points_[1]?this.delaunay_edge[2]=e:this.delaunay_edge[0]=e},s.prototype.setDelaunayEdgeCCW=function(t,e){t===this.points_[0]?this.delaunay_edge[2]=e:t===this.points_[1]?this.delaunay_edge[0]=e:this.delaunay_edge[1]=e},s.prototype.neighborAcross=function(t){return t===this.points_[0]?this.neighbors_[0]:t===this.points_[1]?this.neighbors_[1]:this.neighbors_[2]},s.prototype.oppositePoint=function(t,e){var n=t.pointCW(e);return this.pointCW(n)},s.prototype.legalize=function(t,e){var n=this.points_;if(t===n[0])n[1]=n[0],n[0]=n[2],n[2]=e;else if(t===n[1])n[2]=n[1],n[1]=n[0],n[0]=e;else{if(t!==n[2])throw new Error("poly2tri Invalid Triangle.legalize() call");n[0]=n[2],n[2]=n[1],n[1]=e}},s.prototype.index=function(t){var e=this.points_;if(t===e[0])return 0;if(t===e[1])return 1;if(t===e[2])return 2;throw new Error("poly2tri Invalid Triangle.index() call")},s.prototype.edgeIndex=function(t,e){var n=this.points_;if(t===n[0]){if(e===n[1])return 2;if(e===n[2])return 1}else if(t===n[1]){if(e===n[2])return 0;if(e===n[0])return 2}else if(t===n[2]){if(e===n[0])return 1;if(e===n[1])return 0}return-1},s.prototype.markConstrainedEdgeByIndex=function(t){this.constrained_edge[t]=!0},s.prototype.markConstrainedEdgeByEdge=function(t){this.markConstrainedEdgeByPoints(t.p,t.q)},s.prototype.markConstrainedEdgeByPoints=function(t,e){var n=this.points_;e===n[0]&&t===n[1]||e===n[1]&&t===n[0]?this.constrained_edge[2]=!0:e===n[0]&&t===n[2]||e===n[2]&&t===n[0]?this.constrained_edge[1]=!0:(e===n[1]&&t===n[2]||e===n[2]&&t===n[1])&&(this.constrained_edge[0]=!0)};var a=3*Math.PI/4,p=Math.PI/2,l=1e-12,h=.3,d={CW:1,CCW:-1,COLLINEAR:0},g=function(t,e){this.point=t,this.triangle=e||null,this.next=null,this.prev=null,this.value=t.x},u=function(t,e){this.head_=t,this.tail_=e,this.search_node_=t};u.prototype.head=function(){return this.head_},u.prototype.setHead=function(t){this.head_=t},u.prototype.tail=function(){return this.tail_},u.prototype.setTail=function(t){this.tail_=t},u.prototype.search=function(){return this.search_node_},u.prototype.setSearch=function(t){this.search_node_=t},u.prototype.findSearchNode=function(){return this.search_node_},u.prototype.locateNode=function(t){var e=this.search_node_;if(t<e.value){for(;e=e.prev;)if(t>=e.value)return this.search_node_=e,e}else for(;e=e.next;)if(t<e.value)return this.search_node_=e.prev,e.prev;return null},u.prototype.locatePoint=function(t){var e=t.x,n=this.findSearchNode(e),i=n.point.x;if(e===i){if(t!==n.point)if(t===n.prev.point)n=n.prev;else{if(t!==n.next.point)throw new Error("poly2tri Invalid AdvancingFront.locatePoint() call");n=n.next}}else if(i>e)for(;(n=n.prev)&&t!==n.point;);else for(;(n=n.next)&&t!==n.point;);return n&&(this.search_node_=n),n};var f=function(){this.left_node=null,this.bottom_node=null,this.right_node=null,this.width=0,this.left_highest=!1};f.prototype.clear=function(){this.left_node=null,this.bottom_node=null,this.right_node=null,this.width=0,this.left_highest=!1};var _=function(){this.constrained_edge=null,this.right=!1},c=function(t,e){e=e||{},this.triangles_=[],this.map_=[],this.points_=e.cloneArrays?t.slice(0):t,this.edge_list=[],this.pmin_=this.pmax_=null,this.front_=null,this.head_=null,this.tail_=null,this.af_head_=null,this.af_middle_=null,this.af_tail_=null,this.basin=new f,this.edge_event=new _,this.initEdges(this.points_)};c.prototype.addHole=function(t){this.initEdges(t);var e,n=t.length;for(e=0;n>e;e++)this.points_.push(t[e]);return this},c.prototype.AddHole=c.prototype.addHole,c.prototype.addPoint=function(t){return this.points_.push(t),this},c.prototype.AddPoint=c.prototype.addPoint,c.prototype.addPoints=function(t){return this.points_=this.points_.concat(t),this},c.prototype.triangulate=function(){return y.triangulate(this),this},c.prototype.getBoundingBox=function(){return{min:this.pmin_,max:this.pmax_}},c.prototype.getTriangles=function(){return this.triangles_},c.prototype.GetTriangles=c.prototype.getTriangles,c.prototype.front=function(){return this.front_},c.prototype.pointCount=function(){return this.points_.length},c.prototype.head=function(){return this.head_},c.prototype.setHead=function(t){this.head_=t},c.prototype.tail=function(){return this.tail_},c.prototype.setTail=function(t){this.tail_=t},c.prototype.getMap=function(){return this.map_},c.prototype.initTriangulation=function(){var t,e=this.points_[0].x,n=this.points_[0].x,i=this.points_[0].y,r=this.points_[0].y,s=this.points_.length;for(t=1;s>t;t++){var a=this.points_[t];a.x>e&&(e=a.x),a.x<n&&(n=a.x),a.y>i&&(i=a.y),a.y<r&&(r=a.y)}this.pmin_=new o(n,r),this.pmax_=new o(e,i);var p=h*(e-n),l=h*(i-r);this.head_=new o(e+p,r-l),this.tail_=new o(n-p,r-l),this.points_.sort(o.compare)},c.prototype.initEdges=function(t){var e,n=t.length;for(e=0;n>e;++e)this.edge_list.push(new r(t[e],t[(e+1)%n]))},c.prototype.getPoint=function(t){return this.points_[t]},c.prototype.addToMap=function(t){this.map_.push(t)},c.prototype.locateNode=function(t){return this.front_.locateNode(t.x)},c.prototype.createAdvancingFront=function(){var t,e,n,i=new s(this.points_[0],this.tail_,this.head_);this.map_.push(i),t=new g(i.getPoint(1),i),e=new g(i.getPoint(0),i),n=new g(i.getPoint(2)),this.front_=new u(t,n),t.next=e,e.next=n,e.prev=t,n.prev=e},c.prototype.removeNode=function(){},c.prototype.mapTriangleToNodes=function(t){for(var e=0;3>e;++e)if(!t.getNeighbor(e)){var n=this.front_.locatePoint(t.pointCW(t.getPoint(e)));n&&(n.triangle=t)}},c.prototype.removeFromMap=function(t){var e,n=this.map_,i=n.length;for(e=0;i>e;e++)if(n[e]===t){n.splice(e,1);break}},c.prototype.meshClean=function(t){for(var e,n,i=[t];e=i.pop();)if(!e.isInterior())for(e.setInterior(!0),this.triangles_.push(e),n=0;3>n;n++)e.constrained_edge[n]||i.push(e.getNeighbor(n))};var y={};return y.triangulate=function(t){t.initTriangulation(),t.createAdvancingFront(),y.sweepPoints(t),y.finalizationPolygon(t)},y.sweepPoints=function(t){var e,n=t.pointCount();for(e=1;n>e;++e)for(var i=t.getPoint(e),o=y.pointEvent(t,i),r=i._p2t_edge_list,s=0;r&&s<r.length;++s)y.edgeEventByEdge(t,r[s],o)},y.finalizationPolygon=function(t){for(var e=t.front().head().next.triangle,n=t.front().head().next.point;!e.getConstrainedEdgeCW(n);)e=e.neighborCCW(n);t.meshClean(e)},y.pointEvent=function(t,e){var n=t.locateNode(e),i=y.newFrontTriangle(t,e,n);return e.x<=n.point.x+l&&y.fill(t,n),y.fillAdvancingFront(t,i),i},y.edgeEventByEdge=function(t,e,n){t.edge_event.constrained_edge=e,t.edge_event.right=e.p.x>e.q.x,y.isEdgeSideOfTriangle(n.triangle,e.p,e.q)||(y.fillEdgeEvent(t,e,n),y.edgeEventByPoints(t,e.p,e.q,n.triangle,e.q))},y.edgeEventByPoints=function(e,n,o,r,s){if(null!==r&&!y.isEdgeSideOfTriangle(r,n,o)){var a=r.pointCCW(s),p=t(o,a,n);if(p===d.COLLINEAR){if(!r.containsPoints(o,a))throw new i("poly2tri EdgeEvent: Collinear not supported!",[o,a,n]);return r.markConstrainedEdgeByPoints(o,a),e.edge_event.constrained_edge.q=a,r=r.neighborAcross(s),y.edgeEventByPoints(e,n,a,r,a),void 0}var l=r.pointCW(s),h=t(o,l,n);if(h===d.COLLINEAR){if(!r.containsPoints(o,l))throw new i("poly2tri EdgeEvent: Collinear not supported!",[o,a,n]);return r.markConstrainedEdgeByPoints(o,l),e.edge_event.constrained_edge.q=l,r=r.neighborAcross(s),y.edgeEventByPoints(e,n,l,r,l),void 0}p===h?(r=p===d.CW?r.neighborCCW(s):r.neighborCW(s),y.edgeEventByPoints(e,n,o,r,s)):y.flipEdgeEvent(e,n,o,r,s)}},y.isEdgeSideOfTriangle=function(t,e,n){var i=t.edgeIndex(e,n);if(-1!==i){t.markConstrainedEdgeByIndex(i);var o=t.getNeighbor(i);return o&&o.markConstrainedEdgeByPoints(e,n),!0}return!1},y.newFrontTriangle=function(t,e,n){var i=new s(e,n.point,n.next.point);i.markNeighbor(n.triangle),t.addToMap(i);var o=new g(e);return o.next=n.next,o.prev=n,n.next.prev=o,n.next=o,y.legalize(t,i)||t.mapTriangleToNodes(i),o},y.fill=function(t,e){var n=new s(e.prev.point,e.point,e.next.point);n.markNeighbor(e.prev.triangle),n.markNeighbor(e.triangle),t.addToMap(n),e.prev.next=e.next,e.next.prev=e.prev,y.legalize(t,n)||t.mapTriangleToNodes(n)},y.fillAdvancingFront=function(t,e){for(var n,i=e.next;i.next&&(n=y.holeAngle(i),!(n>p||-p>n));)y.fill(t,i),i=i.next;for(i=e.prev;i.prev&&(n=y.holeAngle(i),!(n>p||-p>n));)y.fill(t,i),i=i.prev;e.next&&e.next.next&&(n=y.basinAngle(e),a>n&&y.fillBasin(t,e))},y.basinAngle=function(t){var e=t.point.x-t.next.next.point.x,n=t.point.y-t.next.next.point.y;return Math.atan2(n,e)},y.holeAngle=function(t){var e=t.next.point.x-t.point.x,n=t.next.point.y-t.point.y,i=t.prev.point.x-t.point.x,o=t.prev.point.y-t.point.y;return Math.atan2(e*o-n*i,e*i+n*o)},y.legalize=function(t,e){for(var n=0;3>n;++n)if(!e.delaunay_edge[n]){var i=e.getNeighbor(n);if(i){var o=e.getPoint(n),r=i.oppositePoint(e,o),s=i.index(r);if(i.constrained_edge[s]||i.delaunay_edge[s]){e.constrained_edge[n]=i.constrained_edge[s];continue}var a=y.inCircle(o,e.pointCCW(o),e.pointCW(o),r);if(a){e.delaunay_edge[n]=!0,i.delaunay_edge[s]=!0,y.rotateTrianglePair(e,o,i,r);var p=!y.legalize(t,e);return p&&t.mapTriangleToNodes(e),p=!y.legalize(t,i),p&&t.mapTriangleToNodes(i),e.delaunay_edge[n]=!1,i.delaunay_edge[s]=!1,!0}}}return!1},y.inCircle=function(t,e,n,i){var o=t.x-i.x,r=t.y-i.y,s=e.x-i.x,a=e.y-i.y,p=o*a,l=s*r,h=p-l;if(0>=h)return!1;var d=n.x-i.x,g=n.y-i.y,u=d*r,f=o*g,_=u-f;if(0>=_)return!1;var c=s*g,y=d*a,v=o*o+r*r,x=s*s+a*a,C=d*d+g*g,E=v*(c-y)+x*_+C*h;return E>0},y.rotateTrianglePair=function(t,e,n,i){var o,r,s,a;o=t.neighborCCW(e),r=t.neighborCW(e),s=n.neighborCCW(i),a=n.neighborCW(i);var p,l,h,d;p=t.getConstrainedEdgeCCW(e),l=t.getConstrainedEdgeCW(e),h=n.getConstrainedEdgeCCW(i),d=n.getConstrainedEdgeCW(i);var g,u,f,_;g=t.getDelaunayEdgeCCW(e),u=t.getDelaunayEdgeCW(e),f=n.getDelaunayEdgeCCW(i),_=n.getDelaunayEdgeCW(i),t.legalize(e,i),n.legalize(i,e),n.setDelaunayEdgeCCW(e,g),t.setDelaunayEdgeCW(e,u),t.setDelaunayEdgeCCW(i,f),n.setDelaunayEdgeCW(i,_),n.setConstrainedEdgeCCW(e,p),t.setConstrainedEdgeCW(e,l),t.setConstrainedEdgeCCW(i,h),n.setConstrainedEdgeCW(i,d),t.clearNeigbors(),n.clearNeigbors(),o&&n.markNeighbor(o),r&&t.markNeighbor(r),s&&t.markNeighbor(s),a&&n.markNeighbor(a),t.markNeighbor(n)},y.fillBasin=function(e,n){for(e.basin.left_node=t(n.point,n.next.point,n.next.next.point)===d.CCW?n.next.next:n.next,e.basin.bottom_node=e.basin.left_node;e.basin.bottom_node.next&&e.basin.bottom_node.point.y>=e.basin.bottom_node.next.point.y;)e.basin.bottom_node=e.basin.bottom_node.next;if(e.basin.bottom_node!==e.basin.left_node){for(e.basin.right_node=e.basin.bottom_node;e.basin.right_node.next&&e.basin.right_node.point.y<e.basin.right_node.next.point.y;)e.basin.right_node=e.basin.right_node.next;e.basin.right_node!==e.basin.bottom_node&&(e.basin.width=e.basin.right_node.point.x-e.basin.left_node.point.x,e.basin.left_highest=e.basin.left_node.point.y>e.basin.right_node.point.y,y.fillBasinReq(e,e.basin.bottom_node))}},y.fillBasinReq=function(e,n){if(!y.isShallow(e,n)){y.fill(e,n);var i;if(n.prev!==e.basin.left_node||n.next!==e.basin.right_node){if(n.prev===e.basin.left_node){if(i=t(n.point,n.next.point,n.next.next.point),i===d.CW)return;n=n.next}else if(n.next===e.basin.right_node){if(i=t(n.point,n.prev.point,n.prev.prev.point),i===d.CCW)return;n=n.prev}else n=n.prev.point.y<n.next.point.y?n.prev:n.next;y.fillBasinReq(e,n)}}},y.isShallow=function(t,e){var n;return n=t.basin.left_highest?t.basin.left_node.point.y-e.point.y:t.basin.right_node.point.y-e.point.y,t.basin.width>n?!0:!1},y.fillEdgeEvent=function(t,e,n){t.edge_event.right?y.fillRightAboveEdgeEvent(t,e,n):y.fillLeftAboveEdgeEvent(t,e,n)},y.fillRightAboveEdgeEvent=function(e,n,i){for(;i.next.point.x<n.p.x;)t(n.q,i.next.point,n.p)===d.CCW?y.fillRightBelowEdgeEvent(e,n,i):i=i.next},y.fillRightBelowEdgeEvent=function(e,n,i){i.point.x<n.p.x&&(t(i.point,i.next.point,i.next.next.point)===d.CCW?y.fillRightConcaveEdgeEvent(e,n,i):(y.fillRightConvexEdgeEvent(e,n,i),y.fillRightBelowEdgeEvent(e,n,i)))},y.fillRightConcaveEdgeEvent=function(e,n,i){y.fill(e,i.next),i.next.point!==n.p&&t(n.q,i.next.point,n.p)===d.CCW&&t(i.point,i.next.point,i.next.next.point)===d.CCW&&y.fillRightConcaveEdgeEvent(e,n,i)},y.fillRightConvexEdgeEvent=function(e,n,i){t(i.next.point,i.next.next.point,i.next.next.next.point)===d.CCW?y.fillRightConcaveEdgeEvent(e,n,i.next):t(n.q,i.next.next.point,n.p)===d.CCW&&y.fillRightConvexEdgeEvent(e,n,i.next)},y.fillLeftAboveEdgeEvent=function(e,n,i){for(;i.prev.point.x>n.p.x;)t(n.q,i.prev.point,n.p)===d.CW?y.fillLeftBelowEdgeEvent(e,n,i):i=i.prev},y.fillLeftBelowEdgeEvent=function(e,n,i){i.point.x>n.p.x&&(t(i.point,i.prev.point,i.prev.prev.point)===d.CW?y.fillLeftConcaveEdgeEvent(e,n,i):(y.fillLeftConvexEdgeEvent(e,n,i),y.fillLeftBelowEdgeEvent(e,n,i)))},y.fillLeftConvexEdgeEvent=function(e,n,i){t(i.prev.point,i.prev.prev.point,i.prev.prev.prev.point)===d.CW?y.fillLeftConcaveEdgeEvent(e,n,i.prev):t(n.q,i.prev.prev.point,n.p)===d.CW&&y.fillLeftConvexEdgeEvent(e,n,i.prev)},y.fillLeftConcaveEdgeEvent=function(e,n,i){y.fill(e,i.prev),i.prev.point!==n.p&&t(n.q,i.prev.point,n.p)===d.CW&&t(i.point,i.prev.point,i.prev.prev.point)===d.CW&&y.fillLeftConcaveEdgeEvent(e,n,i)},y.flipEdgeEvent=function(n,i,o,r,s){var a=r.neighborAcross(s);if(!a)throw new Error("poly2tri [BUG:FIXME] FLIP failed due to missing triangle!");var p=a.oppositePoint(r,s);if(e(s,r.pointCCW(s),r.pointCW(s),p))if(y.rotateTrianglePair(r,s,a,p),n.mapTriangleToNodes(r),n.mapTriangleToNodes(a),s===o&&p===i)o===n.edge_event.constrained_edge.q&&i===n.edge_event.constrained_edge.p&&(r.markConstrainedEdgeByPoints(i,o),a.markConstrainedEdgeByPoints(i,o),y.legalize(n,r),y.legalize(n,a));else{var l=t(o,p,i);r=y.nextFlipTriangle(n,l,r,a,s,p),y.flipEdgeEvent(n,i,o,r,s)}else{var h=y.nextFlipPoint(i,o,a,p);y.flipScanEdgeEvent(n,i,o,r,a,h),y.edgeEventByPoints(n,i,o,r,s)}},y.nextFlipTriangle=function(t,e,n,i,o,r){var s;return e===d.CCW?(s=i.edgeIndex(o,r),i.delaunay_edge[s]=!0,y.legalize(t,i),i.clearDelunayEdges(),n):(s=n.edgeIndex(o,r),n.delaunay_edge[s]=!0,y.legalize(t,n),n.clearDelunayEdges(),i)},y.nextFlipPoint=function(e,n,o,r){var s=t(n,r,e);if(s===d.CW)return o.pointCCW(r);if(s===d.CCW)return o.pointCW(r);throw new i("poly2tri [Unsupported] nextFlipPoint: opposing point on constrained edge!",[n,r,e])},y.flipScanEdgeEvent=function(t,n,i,o,r,s){var a=r.neighborAcross(s);if(!a)throw new Error("poly2tri [BUG:FIXME] FLIP failed due to missing triangle");var p=a.oppositePoint(r,s);if(e(i,o.pointCCW(i),o.pointCW(i),p))y.flipEdgeEvent(t,i,p,a,p);else{var l=y.nextFlipPoint(n,i,a,p);y.flipScanEdgeEvent(t,n,i,o,a,l)}},n.PointError=i,n.Point=o,n.Triangle=s,n.SweepContext=c,n.triangulate=y.triangulate,n.sweep={Triangulate:y.triangulate},n});