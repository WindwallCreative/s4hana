/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Component","sap/ui/fl/ChangePersistence","sap/ui/fl/Utils"],function(q,C,a,U){"use strict";var b={};b._instanceCache={};b.getChangePersistenceForComponent=function(c){var o;if(!b._instanceCache[c]){o=new a(c);b._instanceCache[c]=o;}return b._instanceCache[c];};b.getChangePersistenceForControl=function(c){var s;s=this._getComponentClassNameForControl(c);return b.getChangePersistenceForComponent(s);};b._getComponentClassNameForControl=function(c){return U.getComponentClassName(c);};b.registerLoadComponentEventHandler=function(){C._fnLoadComponentCallback=this._onLoadComponent.bind(this);};b._doLoadComponent=function(c,m){var o={oChangePersistence:{},oRequestOptions:{}};var s=U.getFlexReference(m);if(c.componentData&&c.componentData.startupParameters&&c.componentData.startupParameters["sap-app-id"]&&c.componentData.startupParameters["sap-app-id"].length===1){s=c.componentData.startupParameters["sap-app-id"][0];}else{if(c){var A=c.asyncHints;if(A&&A.requests&&Array.isArray(A.requests)){var f=this._findFlAsyncHint(A.requests);if(f&&s===f.reference){o.oRequestOptions.cacheKey=f.cachebusterToken||"<NO CHANGES>";}}}}o.oRequestOptions.siteId=U.getSiteIdByComponentData(c.componentData);o.oChangePersistence=this.getChangePersistenceForComponent(s);return o;};b._onLoadComponent=function(c,m){if(!U.isApplication(m)){return;}var o=this._doLoadComponent(c,m);o.oChangePersistence.getChangesForComponent(o.oRequestOptions);};b._getChangesForComponentAfterInstantiation=function(c,m,o){if(!U.isApplication(m)){return Promise.resolve(function(){return{mChanges:{},mDependencies:{},mDependentChangesOnMe:{}};});}var d=this._doLoadComponent(c,m);return d.oChangePersistence.loadChangesMapForComponent(o,d.oRequestOptions);};b._findFlAsyncHint=function(A){var t=this;var f;q.each(A,function(n,o){if(t._flAsyncHintMatches(o)){f=o;return false;}});return f;};b._flAsyncHintMatches=function(A){return A.name==="sap.ui.fl.changes";};return b;},true);