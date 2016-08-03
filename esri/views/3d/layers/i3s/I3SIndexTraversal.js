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

define(["require","exports","../../support/PromiseLightweight","./GoogPriorityQueue","./I3SUtil"],function(e,i,t,s,n){var r=!1,o=!1,a=function(){function e(e,i,t,s,n,r,o,a,h,d,l,u,c){void 0===c&&(c={initDepthFirst:!0,neighborhood:!0,perLevelTraversal:!1}),this.baseURL=e,this.startNodeUrl=i,this.rootId=t,this.poi=s,this.nodeIndex=n,this.streamDataSupplier=r,this.viewportQueries=o,this.processNodeIndexDocument=a,this.finishedLevelCallback=h,this.debugVis=d,this.warningEvent=l,this._addTrailingSlash=u,this.traversalOptions=c,this.queues=[],this.knownNodes=new Set,this.dataLoadingPerLevel=[],this.currentLevel=0,this.numIndicesLoading=0,this.queueTraversalEnabled=!1,this.cancelled=!1}return e.prototype.start=function(){var e=this;this._nodeTraversalState={},this._nodeIsVisibleCached={},this.dataLoadingPerLevel=[],this.currentLevel=0,this.rootUrl=n.concatUrl(this.baseURL,this.startNodeUrl),this._addTrailingSlash&&(this.rootUrl=n.addTrailingSlash(this.rootUrl)),this.traversalOptions.initDepthFirst?(this.initPromise=new t.Promise,this.getNode(this.rootUrl,this.rootId,this.initQueryCallback.bind(this),this.initQueryErrback.bind(this)),this.initPromise.then(function(){e.cancelled||(e.queueTraversalEnabled=!0)})):(this.enqueue(0,{id:this.rootId,hrefConcat:this.rootUrl},0),this.queueTraversalEnabled=!0)},e.prototype.initQueryErrback=function(){this.initPromise.done()},e.prototype.continueTraversal=function(e){var i=this;if(this.queueTraversalEnabled)for(var t=null==e?5:e,s=0;s<this.queues.length;s++)if(!this.traversalOptions.perLevelTraversal||this.currentLevel===s){for(var n=this.queues[s];t-->0&&!n.isEmpty();)!function(e){var t=i.queues[e],s=t.dequeue();i.dataLoadingPerLevel[e]++;var n=function(){i.dataLoadingPerLevel[e]--};i.getNode(s.hrefConcat,s.id,function(t,s){null==s.parentNode?(i.nodeTraversalState(s.id),i.enqueueConnected(t,s,e),i.processNodeIndexDocument(s,void 0).then(n,n)):i.getNode(i.concatHref(s.parentNode,t),s.parentNode.id,function(r,o){i.nodeTraversalState(s.id),i.enqueueConnected(t,s,e),i.processNodeIndexDocument(s,o).then(n,n)})},n)}(s);this.traversalOptions.perLevelTraversal&&n.isEmpty()&&0===this.dataLoadingPerLevel[s]&&(o&&console.debug("finished level "+this.currentLevel),this.finishedLevelCallback.call(null,this.currentLevel),this.currentLevel++)}},e.prototype.isQueueTraversalEnabled=function(){return this.queueTraversalEnabled},e.prototype.getQueueSize=function(){for(var e=0,i=0;i<this.queues.length;i++)e+=this.queues[i].getCount();return e},e.prototype.cancel=function(){this.queueTraversalEnabled=!1;for(var e=0;e<this.queues.length;e++)this.queues[e].clear();this.cancelled=!0},e.prototype.isLoading=function(){return this.numIndicesLoading>0||this.getQueueSize()>0},e.prototype.nodeIsVisible=function(e){return null!=this._nodeIsVisibleCached[e.id]?this._nodeIsVisibleCached[e.id]:(this._nodeIsVisibleCached[e.id]=this.viewportQueries.isNodeVisible(e),this._nodeIsVisibleCached[e.id])},e.prototype.nodeTraversalState=function(e){if(null!=this._nodeTraversalState[e])return this._nodeTraversalState[e];var i=this.nodeIndex[e];if(null==i)return null;var t=null,s=!1;if(null!=i.parentNode){if(t=this.nodeIndex[i.parentNode.id],null==t)return null;var n=this._nodeTraversalState[t.id];null!=n&&(s=n.nodeIsTooHighLOD)}var r=this.viewportQueries.hasLOD(i),o=this.viewportQueries.isTooHighLOD(i),a=this.viewportQueries.isChosenLOD(i,t,o,s);return this._nodeTraversalState[i.id]={visited:!0,nodeHasLOD:r,nodeIsTooHighLOD:o,isChosenLOD:a},this._nodeTraversalState[e]},e.prototype.getNode=function(e,i,t,s){var n=this;this.numIndicesLoading++,this.nodeIndex[i]?(t(e,this.nodeIndex[i]),this.numIndicesLoading--):this.streamDataSupplier.request(e,"json").then(function(e,i){var s=i;n.nodeIndex[s.id]=s,s.baseUrl=e,t(e,s),n.numIndicesLoading--},function(i){null!=s&&s(i),n.loadErrorCallback(e),n.numIndicesLoading--})},e.prototype.initQueryCallback=function(e,i){if(this.cancelled)return void this.initPromise.done();if(this.nodeTraversalState(i.id),this.enqueueConnected(e,i,0),this.isLeafNode(i))this.initPromise.done();else{for(var t=1e9,s=void 0,r=0;r<i.children.length;++r){var o=i.children[r];if(this.nodeIsVisible(o)){if(this.viewportQueries.hasLOD(i)&&this.viewportQueries.isTooHighLOD(i))continue;var a=this.viewportQueries.distToPOI(o,this.poi);t>a&&(t=a,s=o)}}if(s){var h=n.concatUrl(e,s.href);this._addTrailingSlash&&(h=n.addTrailingSlash(h)),this.getNode(h,s.id,this.initQueryCallback.bind(this),this.initQueryErrback.bind(this))}else this.initPromise.done()}},e.prototype.isLeafNode=function(e){return null==e.children},e.prototype.concatHref=function(e,i){var t=n.concatUrl(i,e.href);return this._addTrailingSlash&&(t=n.addTrailingSlash(t)),t},e.prototype.enqueue=function(e,i,t){for(this.traversalOptions.perLevelTraversal||(t=0),this.knownNodes.add(i.id);this.queues.length<=t;)this.queues.push(new s.goog.structs.PriorityQueue),this.dataLoadingPerLevel.push(0);this.queues[t].enqueue(e,i),r&&this.debugVis&&this.debugVis.show(i,"brown")},e.prototype.enqueueConnected=function(e,i,t){if(!this.cancelled&&null!=i){var s=this.nodeTraversalState(i.id);if(i.id===this.rootId||null==i.parentNode||this.knownNodes.has(i.parentNode.id))i.id===this.rootId&&!this.knownNodes.has(i.id)&&this.nodeIsVisible(i)&&this.enqueue(this.viewportQueries.distToPOI(i,this.poi),{id:i.id,hrefConcat:e},t);else{var n={id:i.parentNode.id,hrefConcat:this.concatHref(i.parentNode,e)};this.enqueue(this.viewportQueries.distToPOI(i.parentNode,this.poi),n,t-1)}if(i.children)for(var r=0,o=i.children;r<o.length;r++){var a=o[r],h=this.nodeIsVisible(a);if(!(this.knownNodes.has(a.id)||s.nodeHasLOD&&s.nodeIsTooHighLOD||!h)){var n={id:a.id,hrefConcat:this.concatHref(a,e)};this.enqueue(this.viewportQueries.distToPOI(a,this.poi),n,t+1)}}if(this.traversalOptions.neighborhood&&i.neighbors)for(var d=0,l=i.neighbors;d<l.length;d++){var u=l[d],c=this.nodeIsVisible(u);if(!this.knownNodes.has(u.id)&&c){var n={id:u.id,hrefConcat:this.concatHref(u,e)};this.enqueue(this.viewportQueries.distToPOI(u,this.poi),n,t)}}}},e.prototype.loadErrorCallback=function(e){console.log("Error loading "+e),this.rootUrl===e&&this.warningEvent("Error loading root node "+e,1)},e}();return a});