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

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/decorateHelper","../core/accessoireSupport/typescript","../core/Error","../config","../identity/IdentityManager","../request","../geometry/Extent","../core/JSONSupporter","../core/LoadableAccessoire","./PortalQueryParams","./PortalQueryResult","./PortalUser","../core/promiseUtils","../core/requireUtils","dojo/promise/all","dojo/_base/kernel","dojo/_base/lang"],function(t,e,r,o,n,p,i,s,u,l,a,y,h,d,c,m,v,f,P,_){function S(){return a}var g,O=function(e){function a(){e.call(this),this.access=null,this.allSSL=null,this.authMode=null,this.authorizedCrossOriginDomains=null,this.bingKey=null,this.canListApps=null,this.canListData=null,this.canListPreProvisionedItems=null,this.canProvisionDirectPurchase=null,this.canSearchPublic=null,this.canShareBingPublic=null,this.canSharePublic=null,this.canSignInArcGIS=null,this.canSignInIDP=null,this.colorSetsGroupQuery=null,this.commentsEnabled=null,this.created=null,this.culture=null,this.customBaseUrl=null,this.defaultBasemap=null,this.defaultExtent=null,this.description=null,this.extraQuery=null,this.featuredGroups=null,this.featuredItemsGroupQuery=null,this.galleryTemplatesGroupQuery=null,this.homePageFeaturedContent=null,this.homePageFeaturedContentCount=null,this.httpPort=null,this.httpsPort=null,this.id=null,this.ipCntryCode=null,this.isOrganization=null,this.isPortal=null,this.layerTemplatesGroupQuery=null,this.maxTokenExpirationMinutes=null,this.modified=null,this.name=null,this.portalHostname=null,this.portalMode=null,this.portalProperties=null,this.region=null,this.restUrl=null,this.rotatorPanels=null,this.showHomePageDescription=null,this.supportsHostedServices=null,this.symbolSetsGroupQuery=null,this.templatesGroupQuery=null,this.thumbnailUrl=null,this.units=null,this.url=null,this.urlKey=null,this.user=null,this.useStandardizedQuery=null}return r(a,e),a.prototype.normalizeCtorArgs=function(t){return"string"==typeof t?{url:t}:t},a.prototype.getDefaults=function(){return _.mixin(this.inherited(arguments),{url:i.portalUrl})},a.prototype.initialize=function(){var t=this;this._esriId_credentialCreateHandle=s.on("credential-create",function(){t.loaded&&!t.credential&&t.authMode===a.AUTH_MODE_AUTO&&(t.credential=s.findCredential(t.restUrl),t.credential&&t._fetchSelf().then(function(e){t.read(e)}))})},a.prototype.destroy=function(){this._esriId_credentialCreateHandle&&(this._esriId_credentialCreateHandle.remove(),this._esriId_credentialCreateHandle=null)},a.prototype._defaultBasemapReader=function(t){return t?g.fromJSON(t):null},a.prototype._extraQueryGetter=function(){return this.id&&!this.canSearchPublic?" AND orgid:"+this.id:null},a.prototype._isOrganizationGetter=function(){return!!this.access},a.prototype._restUrlGetter=function(){var t=this.url;if(t){var e=t.indexOf("/sharing");t=e>0?t.substring(0,e):this.url.replace(/\/+$/,""),t+="/sharing/rest"}return t},a.prototype._thumbnailUrlGetter=function(){var t=this.restUrl,e=this.thumbnail;return t&&e?this._normalizeSSL(t+"/portals/self/resources/"+e):null},a.prototype._userReader=function(t){var e=null;return t&&(e=c.fromJSON(t),e.portal=this),e},a.prototype.load=function(){var e=this,r=m.resolve().then(function(){return e.authMode===a.AUTH_MODE_IMMEDIATE?s.getCredential(e.restUrl):e.authMode===a.AUTH_MODE_AUTO?s.checkSignInStatus(e.restUrl).otherwise(function(){return null}):null}).then(function(r){return e.credential=r,v.when(t,"../Basemap")}).then(function(t){g=t}).then(function(){return e._fetchSelf()}).then(function(t){e.read(t)});return this.addResolvingPromise(r),this},a.prototype.fetchBasemaps=function(){var t=new h;return t.query=this.basemapGalleryGroupQuery,this.queryGroups(t).then(function(e){return t.num=100,t.query=null,e.total?e.results[0].queryItems(t):null}).then(function(t){var e;return e=t&&t.total?t.results.map(function(t){return new g({portalItem:t})}):[]})},a.prototype.fetchFeaturedGroups=function(){var t=this.featuredGroups,e=new h;if(e.num=100,e.sortField="title",t&&t.length){for(var r=[],o=0,n=t;o<n.length;o++){var p=n[o];r.push('(title:"'+p.title+'" AND owner:'+p.owner+")")}return e.query=r.join(" OR "),this.queryGroups(e).then(function(t){return t.results})}return m.resolve([])},a.getDefault=function(){return a._default||(a._default=new a),a._default},a.prototype.queryGroups=function(t){return this._queryPortal("/community/groups",t,"PortalGroup")},a.prototype.queryItems=function(t){return this._queryPortal("/search",t,"PortalItem")},a.prototype.queryUsers=function(t){return t.sortField||(t.sortField="username"),this._queryPortal("/community/users",t,"PortalUser")},a.prototype.toJSON=function(){throw new p("internal:not-yet-implemented","Portal.toJSON is not yet implemented")},a.prototype._fetchSelf=function(){var t=this.restUrl+"/portals/self";return this._request(t,{query:{culture:P.locale}})},a.prototype._queryPortal=function(e,r,o){var n=this,p=function(t){return n._request(n.restUrl+e,r.toRequestOptions(n)).then(function(e){var o=r.clone();return o.start=e.nextStart,new d({nextQueryParams:o,queryParams:r,total:e.total,results:a._resultsToTypedArray(t,{portal:n},e)})}).then(function(t){return f(t.results).always(function(){return t})})};return o?v.when(t,"./"+o).then(function(t){return p(t)}):p()},a.prototype._normalizeSSL=function(t){var e=this.allSSL||window&&"https:"===window.location.protocol;if(this.isPortal){var r=a._getLocation(t);if(this.portalHostname.toLowerCase().indexOf(r.hostname.toLowerCase())>-1&&r.port&&"80"!==r.port&&"443"!==r.port){var o=r.pathname;return 0!==o.indexOf("/")&&(o="/"+o),e?"https://"+r.hostname+(this.httpsPort&&443!==this.httpsPort?":"+this.httpsPort:"")+o+r.search:"http://"+r.hostname+(this.httpPort&&80!==this.httpPort?":"+this.httpPort:"")+o+r.search}return e?t.replace("http:","https:"):t}return e?t.replace("http:","https:"):t},a.prototype._normalizeUrl=function(t){var e=this.credential&&this.credential.token;return this._normalizeSSL(e?t+(t.indexOf("?")>-1?"&":"?")+"token="+e:t)},a.prototype._requestToTypedArray=function(e,r,o){var n=this,p=function(t){return n._request(e,r).then(function(e){var r=a._resultsToTypedArray(t,{portal:n},e);return f(r).always(function(){return r})})};return o?v.when(t,"./"+o).then(function(t){return p(t)}):p()},a.prototype._request=function(t,e){var r,o={f:"json"},n={disableIdentityLookup:this.authMode===a.AUTH_MODE_ANONYMOUS};return e&&(_.mixin(o,e.query),r=e.responseType,n.method=e.method),u(this._normalizeSSL(t),_.mixin({callbackParamName:"callback",query:o,responseType:r,timeout:0},n)).then(function(t){return t.data})},a._getLocation=function(t){var e=document.createElement("a");return e.href=t,{protocol:e.protocol,hostname:e.hostname,port:e.port,pathname:e.pathname,search:e.search,hash:e.hash,host:e.host}},a._resultsToTypedArray=function(t,e,r){var o;return r?(o=r.listings||r.notifications||r.userInvitations||r.tags||r.items||r.groups||r.comments||r.provisions||r.results||r.relatedItems||r,(t||e)&&(o=o.map(function(r){var o=_.mixin(t?t.fromJSON(r):r,e);return"function"==typeof o.load&&o.load(),o}))):o=[],o},a.AUTH_MODE_ANONYMOUS="anonymous",a.AUTH_MODE_AUTO="auto",a.AUTH_MODE_IMMEDIATE="immediate",o([n.shared("esri.portal.Portal")],a.prototype,"declaredClass",void 0),o([n.property()],a.prototype,"access",void 0),o([n.property()],a.prototype,"allSSL",void 0),o([n.property({value:a.AUTH_MODE_AUTO})],a.prototype,"authMode",void 0),o([n.property()],a.prototype,"authorizedCrossOriginDomains",void 0),o([n.property()],a.prototype,"basemapGalleryGroupQuery",void 0),o([n.property()],a.prototype,"bingKey",void 0),o([n.property()],a.prototype,"canListApps",void 0),o([n.property()],a.prototype,"canListData",void 0),o([n.property()],a.prototype,"canListPreProvisionedItems",void 0),o([n.property()],a.prototype,"canProvisionDirectPurchase",void 0),o([n.property()],a.prototype,"canSearchPublic",void 0),o([n.property()],a.prototype,"canShareBingPublic",void 0),o([n.property()],a.prototype,"canSharePublic",void 0),o([n.property()],a.prototype,"canSignInArcGIS",void 0),o([n.property()],a.prototype,"canSignInIDP",void 0),o([n.property()],a.prototype,"colorSetsGroupQuery",void 0),o([n.property()],a.prototype,"commentsEnabled",void 0),o([n.property({type:Date})],a.prototype,"created",void 0),o([n.property()],a.prototype,"credential",void 0),o([n.property()],a.prototype,"culture",void 0),o([n.property()],a.prototype,"customBaseUrl",void 0),o([n.property()],a.prototype,"defaultBasemap",void 0),o([n.property({type:l})],a.prototype,"defaultExtent",void 0),o([n.property()],a.prototype,"description",void 0),o([n.property({dependsOn:["id","canSearchPublic"],readOnly:!0})],a.prototype,"extraQuery",void 0),o([n.property()],a.prototype,"featuredGroups",void 0),o([n.property()],a.prototype,"featuredItemsGroupQuery",void 0),o([n.property()],a.prototype,"galleryTemplatesGroupQuery",void 0),o([n.property()],a.prototype,"helpBase",void 0),o([n.property()],a.prototype,"helperServices",void 0),o([n.property()],a.prototype,"helpMap",void 0),o([n.property()],a.prototype,"homePageFeaturedContent",void 0),o([n.property()],a.prototype,"homePageFeaturedContentCount",void 0),o([n.property()],a.prototype,"httpPort",void 0),o([n.property()],a.prototype,"httpsPort",void 0),o([n.property({value:null})],a.prototype,"id",void 0),o([n.property()],a.prototype,"ipCntryCode",void 0),o([n.property({dependsOn:["access"],readOnly:!0})],a.prototype,"isOrganization",void 0),o([n.property()],a.prototype,"isPortal",void 0),o([n.property()],a.prototype,"layerTemplatesGroupQuery",void 0),o([n.property()],a.prototype,"maxTokenExpirationMinutes",void 0),o([n.property({type:Date})],a.prototype,"modified",void 0),o([n.property()],a.prototype,"name",void 0),o([n.property()],a.prototype,"portalHostname",void 0),o([n.property()],a.prototype,"portalMode",void 0),o([n.property()],a.prototype,"portalProperties",void 0),o([n.property()],a.prototype,"region",void 0),o([n.property({dependsOn:["url"],readOnly:!0})],a.prototype,"restUrl",void 0),o([n.property()],a.prototype,"rotatorPanels",void 0),o([n.property()],a.prototype,"showHomePageDescription",void 0),o([n.property()],a.prototype,"stylesGroupQuery",void 0),o([n.property()],a.prototype,"supportsHostedServices",void 0),o([n.property()],a.prototype,"symbolSetsGroupQuery",void 0),o([n.property()],a.prototype,"templatesGroupQuery",void 0),o([n.property()],a.prototype,"thumbnail",void 0),o([n.property({dependsOn:["restUrl","thumbnail"],readOnly:!0})],a.prototype,"thumbnailUrl",void 0),o([n.property()],a.prototype,"units",void 0),o([n.property()],a.prototype,"url",void 0),o([n.property()],a.prototype,"urlKey",void 0),o([n.property()],a.prototype,"user",void 0),o([n.property()],a.prototype,"useStandardizedQuery",void 0),a=o([n.subclass([y])],a)}(S());return O});