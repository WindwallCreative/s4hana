/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/TreeBinding','sap/ui/model/ClientTreeBinding','sap/ui/model/TreeAutoExpandMode','sap/ui/model/ChangeReason','sap/ui/model/TreeBindingUtils','sap/ui/model/odata/OperationMode'],function(q,T,C,c,d,e,O){"use strict";var f=function(){if(!(this instanceof T)||this._bIsAdapted){return;}for(var a in f.prototype){if(f.prototype.hasOwnProperty(a)){this[a]=f.prototype[a];}}this.mParameters=this.mParameters||{};this._aRowIndexMap=[];this._iThreshold=0;this._iPageSize=0;this.setAutoExpandMode(this.mParameters.autoExpandMode||c.Sequential);if(this.mParameters.collapseRecursive===undefined){this.bCollapseRecursive=true;}else{this.bCollapseRecursive=!!this.mParameters.collapseRecursive;}this._createTreeState();this._bIsAdapted=true;};f.prototype.getCurrentTreeState=function(){var D=";";var E={};for(var g in this._mTreeState.expanded){E[g]=true;}var m={};for(var g in this._mTreeState.collapsed){m[g]=true;}var s={};for(var g in this._mTreeState.selected){s[g]=true;}return{_getExpandedList:function(){return Object.keys(E).join(D);},_getCollapsedList:function(){return Object.keys(m).join(D);},_getSelectedList:function(){return Object.keys(s).join(D);},_isExpanded:function(g){return!!E[g];},_isCollapsed:function(g){return!!m[g];},_remove:function(g){delete E[g];delete m[g];delete s[g];}};};f.prototype.setTreeState=function(t){this._oInitialTreeState=t;};f.prototype.setAutoExpandMode=function(a){this._autoExpandMode=a;};f.prototype.getLength=function(){if(!this._oRootNode){return 0;}return this._oRootNode.magnitude;};f.prototype.getContextByIndex=function(i){if(this.isInitial()){return;}var n=this.findNode(i);return n?n.context:undefined;};f.prototype.getNodeByIndex=function(i){if(this.isInitial()){return;}if(i>=this.getLength()){return undefined;}return this.findNode(i);};f.prototype.findNode=function(p){if(this.isInitial()){return;}var P=typeof p;var F;var s=[];if(P==="number"){F=this._aRowIndexMap[p];if(!F){var i=-1;this._match(this._oRootNode,s,1,function(n){if(i===p){return true;}i+=1;});F=s[0];}}return F;};f.prototype._createTreeState=function(r){if(!this._mTreeState||r){this._mTreeState={expanded:{},collapsed:{},selected:{},deselected:{}};}};f.prototype._updateTreeState=function(p){p=p||{};var t=p.expanded?this._mTreeState.expanded:this._mTreeState.collapsed;var s=p.expanded?this._mTreeState.collapsed:this._mTreeState.expanded;var n=this._getNodeState(p.groupID);if(!n){n=p.fallbackNodeState||this._createNodeState({groupID:p.groupID,expanded:p.expanded,sum:p.sum});}delete s[p.groupID];t[p.groupID]=n;n.expanded=p.expanded;return n;};f.prototype._createNodeState=function(p){if(!p.groupID){return;}var i;var I;if(this._oInitialTreeState){i=this._oInitialTreeState._isExpanded(p.groupID);I=this._oInitialTreeState._isCollapsed(p.groupID);this._oInitialTreeState._remove(p.groupID);}var b=p.expanded||i||false;var a=p.selected||false;var n={groupID:p.groupID,expanded:b,sections:p.sections||[{startIndex:0,length:this._iPageSize}],sum:p.sum||false,selected:a};if(i||I){this._updateTreeState({groupID:p.groupID,fallbackNodeState:n,expanded:i,collapsed:I});}return n;};f.prototype._getNodeState=function(g){var E=this._mTreeState.expanded[g];var o=this._mTreeState.collapsed[g];var s=this._mTreeState.selected[g];var D=this._mTreeState.deselected[g];return E||o||s||D;};f.prototype._updateNodeSections=function(g,n){var N=this._getNodeState(g);if(!N){return;}else if(!n){return;}else if(n.length<=0){return;}else if(n.startIndex<0){return;}N.sections=e.mergeSections(N.sections,n);return N.sections;};f.prototype._increaseSections=function(){var I=function(n){if(!n){return;}var m=this._getMaxGroupSize(n);var N=n.nodeState;if(m===undefined){var a=[];for(var i=0;i<N.sections.length;i++){var o=N.sections[i];o.length=Math.max(o.length,this._iPageSize);a=e.mergeSections(a,o);}N.sections=a;}};this._map(this._oRootNode,I);};f.prototype._getMaxGroupSize=function(n){var m=0;if(n.isArtificial){var i=this.oModel.isList(this.sPath,this.getContext());if(this.bDisplayRootNode&&!i&&!this._bRootMissing){m=1;}else{m=this._getGroupSize(n)||0;}}else{m=this.nodeHasChildren(n)?this._getGroupSize(n):0;}return m;};f.prototype.getContexts=function(s,l,t,r){if(this.isInitial()){return[];}if(!l){l=this.oModel.iSizeLimit;}if(!t){t=0;}if(l>this._iPageSize){this._iPageSize=l;this._increaseSections();}this._iThreshold=Math.max(this._iThreshold,t);this._aRowIndexMap=[];this._buildTree(s,l);var n=[];if(this._oRootNode){n=this._retrieveNodeSection(this._oRootNode,s,l);}this._updateRowIndexMap(n,s);var a=[];var m;for(var i=0;i<n.length;i++){var N=n[i];if(!N.context){m=m||{};var p=N.parent;m[p.groupID]=p;this._updateNodeSections(p.groupID,{startIndex:N.positionInParent,length:1});}a.push(N.context);}if(m){var b=this;q.each(m,function(g,N){N.magnitude=0;N.numberOfTotals=0;b._loadChildContexts(N);});a=[];for(var j=0;j<n.length;j++){var N=n[j];a.push(N.context);}}if(r){return n;}else{return a;}};f.prototype.getNodes=function(s,l,t){return this.getContexts(s,l,t,true);};f.prototype._updateRowIndexMap=function(n,s){this._aRowIndexMap=[];for(var i=0;i<n.length;i++){this._aRowIndexMap[s+i]=n[i];}};f.prototype._retrieveNodeSection=function(n,s,l){var N=-1;var a=[];this._match(this._oRootNode,[],l,function(n,p,P){if(!n||!n.isArtificial){N++;}if(N>=s&&N<s+l){if(!n){n=this._createNode({parent:P,positionInParent:p});P.children[p]=n;}a.push(n);return true;}});return a;};f.prototype._buildTree=function(s,l){this._oRootNode=undefined;var r=null;var R=this._calculateGroupID({context:r,parent:null});var o=this._getNodeState(R);if(!o){var o=this._createNodeState({groupID:R,sum:true,sections:[{startIndex:s,length:l}]});this._updateTreeState({groupID:o.groupID,fallbackNodeState:o,expanded:true});}this._oRootNode=this._createNode({context:r,parent:null,level:this.bDisplayRootNode&&!(r===null)?0:-1,nodeState:o,isLeaf:false,autoExpand:this.getNumberOfExpandedLevels()+1});this._oRootNode.isArtificial=true;if(this._mTreeState.expanded[this._oRootNode.groupID]){this._loadChildContexts(this._oRootNode);}};f.prototype._calculateRequestLength=function(m,s){var r;if(!m){r=s.length;}else{r=Math.max(Math.min(s.length,m-s.startIndex),0);}return r;};f.prototype._loadChildContexts=function(n){var N=n.nodeState;var m=this._getMaxGroupSize(n);if(m>0){if(!n.children[m-1]){n.children[m-1]=undefined;}N.leafCount=m;}if(this.bClientOperation){N.sections=[{startIndex:0,length:m}];}for(var i=0;i<N.sections.length;i++){var o=N.sections[i];var r=this._calculateRequestLength(m,o);if(n.autoExpand>=0&&this._autoExpandMode===c.Bundled){r=Math.max(0,m);}var a;if(n.isArtificial){a=this.getRootContexts(o.startIndex,r,this._iThreshold);}else{a=this.nodeHasChildren(n)?this.getNodeContexts(n.context,o.startIndex,r,this._iThreshold):[];}for(var j=0;j<a.length;j++){var b=a[j];if(!b){continue;}var g=j+o.startIndex;var h=n.children[g];var u={context:a[j],parent:n,level:n.level+1,positionInParent:g,autoExpand:Math.max(n.autoExpand-1,-1)};if(h){h.context=u.context;h.parent=u.parent;h.level=u.level;h.positionInParent=u.positionInParent;h.magnitude=0;h.numberOfTotals=0;h.autoExpand=u.autoExpand;var G;if(b){G=this._calculateGroupID(h);}h.groupID=G;}else{h=this._createNode(u);}h.nodeState=this._getNodeState(h.groupID);if(!h.nodeState){h.nodeState=this._createNodeState({groupID:h.groupID,expanded:false});}h.nodeState.parentGroupID=n.groupID;h.isLeaf=!this.nodeHasChildren(h);n.children[g]=h;if(h.isLeaf){n.numberOfLeafs+=1;}if(h.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[h.groupID]){this.setNodeSelection(h.nodeState,true);}if((h.autoExpand>0||h.nodeState.expanded)&&this.isGrouped()){if(!this._mTreeState.collapsed[h.groupID]&&!h.isLeaf){this._updateTreeState({groupID:h.nodeState.groupID,fallbackNodeState:h.nodeState,expanded:true});this._loadChildContexts(h);}n.magnitude+=Math.max(h.magnitude||0,0);n.numberOfLeafs+=h.numberOfLeafs;}}}n.magnitude+=Math.max(m||0,0);};f.prototype.isGrouped=function(){return true;};f.prototype._calculateGroupID=function(n){q.sap.log.error("TreeBindingAdapter#_calculateGroupID: Not implemented. Needs to be implemented in respective sub-classes.");};f.prototype._createNode=function(p){p=p||{};var o=p.context;var l=p.level||0;var n={context:o,level:l,children:p.children||[],parent:p.parent,nodeState:p.nodeState,isLeaf:p.isLeaf||false,positionInParent:p.positionInParent,magnitude:p.magnitude||0,numberOfTotals:p.numberOfTotals||0,numberOfLeafs:p.numberOfLeafs||0,autoExpand:p.autoExpand||0,absoluteNodeIndex:p.absoluteNodeIndex||0,totalNumberOfLeafs:0};if(o!==undefined){n.groupID=this._calculateGroupID(n);}return n;};f.prototype.expand=function(i){var n=this.findNode(i);if(!n){return;}this._updateTreeState({groupID:n.nodeState.groupID,fallbackNodeState:n.nodeState,expanded:true});this._fireChange({reason:d.Expand});};f.prototype.expandToLevel=function(l){this._mTreeState.collapsed={};this.setNumberOfExpandedLevels(l);this._fireChange({reason:d.Expand});};f.prototype.isExpanded=function(i){var n=this.findNode(i);return n&&n.nodeState?n.nodeState.expanded:false;};f.prototype.collapse=function(p,s){var n;var t=this;if(typeof p==="object"){n=p;}else if(typeof p==="number"){var N=this.findNode(p);if(!N){return;}n=N.nodeState;}this._updateTreeState({groupID:n.groupID,fallbackNodeState:n,expanded:false});n.selectAllMode=false;if(this.bCollapseRecursive){var g=n.groupID;q.each(this._mTreeState.expanded,function(G,o){if(q.sap.startsWith(G,g)){t._updateTreeState({groupID:G,expanded:false});}});}q.each(this._mTreeState.selected,function(G,o){if(q.sap.startsWith(G,g)&&G!==g){o.selectAllMode=false;t.setNodeSelection(o,false);}});if(!s){this._fireChange({reason:d.Collapse});}};f.prototype.collapseToLevel=function(l){if(!l||l<0){l=0;}var t=this;q.each(this._mTreeState.expanded,function(g,n){var N=t._getGroupIdLevel(g)-1;if(N===l){t.collapse(n,true);}});this._fireChange({reason:d.Collapse});};f.prototype._map=function(n,m){m.call(this,n);if(!n){return;}for(var i=0;i<n.children.length;i++){var o=n.children[i];this._map(o,m);}if(this._afterMapHook){this._afterMapHook(n,m);}};f.prototype._match=function(n,r,m,M,p,P){if(r.length===m){return true;}var N=M.call(this,n,p,P);if(N){r.push(n);}if(!n){return false;}for(var i=0;i<n.children.length;i++){var o=n.children[i];var b=this._match(o,r,m,M,i,n);if(b){return true;}}return this._afterMatchHook?this._afterMatchHook(n,r,m,M,p,P):false;};f.prototype.toggleIndex=function(i){var n=this.findNode(i);if(!n){return;}if(n.nodeState.expanded){this.collapse(i);}else{this.expand(i);}};f.prototype._getGroupIdLevel=function(g){if(g==null){q.sap.log.warning("assertion failed: no need to determine level of group ID = null");return-1;}return g.split("/").length-2;};f.prototype._getGroupSize=function(n){return this.getChildCount(n.context);};f.prototype.setNodeSelection=function(n,i){if(!n.groupID){return;}n.selected=i;if(i){this._mTreeState.selected[n.groupID]=n;delete this._mTreeState.deselected[n.groupID];}else{delete this._mTreeState.selected[n.groupID];this._mTreeState.deselected[n.groupID]=n;}};f.prototype.isIndexSelected=function(r){var n=this.getNodeByIndex(r);return n&&n.nodeState?n.nodeState.selected:false;};f.prototype.isIndexSelectable=function(r){var n=this.getNodeByIndex(r);return this._isNodeSelectable(n);};f.prototype._isNodeSelectable=function(n){return!!n&&!n.isArtificial;};f.prototype.setSelectedIndex=function(r){var n=this.findNode(r);if(n&&this._isNodeSelectable(n)){var o=this._clearSelection();var i=o.rowIndices.indexOf(r);if(i>=0){o.rowIndices.splice(i,1);}else{o.rowIndices.push(r);}o.leadGroupID=n.groupID;o.leadIndex=r;this.setNodeSelection(n.nodeState,true);this._publishSelectionChanges(o);}else{q.sap.log.warning("TreeBindingAdapter: The selection was ignored. Please make sure to only select rows, for which data has been fetched to the client. For AnalyticalTables, some rows might not be selectable at all.");}};f.prototype.getSelectedIndex=function(){if(!this._sLeadSelectionGroupID||q.isEmptyObject(this._mTreeState.selected)){return-1;}var n=-1;var m=function(N){if(!N||!N.isArtificial){n++;}if(N){if(N.groupID===this._sLeadSelectionGroupID){return true;}}};this._match(this._oRootNode,[],1,m);return n;};f.prototype.getSelectedIndices=function(){var r=[];var t=this;if(q.isEmptyObject(this._mTreeState.selected)){return r;}var n=Object.keys(this._mTreeState.selected).length;var N=-1;var m=function(o){if(!o||!o.isArtificial){N++;}if(o){if(o.nodeState&&o.nodeState.selected&&!o.isArtificial){r.push(N);t._aRowIndexMap[N]=o;return true;}}};this._match(this._oRootNode,[],n,m);return r;};f.prototype.getSelectedNodesCount=function(){var s;if(this._oRootNode&&this._oRootNode.nodeState.selectAllMode){var g,v,p,G;v=0;for(g in this._mTreeState.expanded){G=this._mTreeState.expanded[g];if(!G.selectAllMode&&G.leafCount!==undefined){v+=G.leafCount;}}for(g in this._mTreeState.selected){G=this._mTreeState.selected[g];p=this._mTreeState.expanded[G.parentGroupID];if(p&&!p.selectAllMode){v--;}}for(g in this._mTreeState.deselected){G=this._mTreeState.deselected[g];p=this._mTreeState.expanded[G.parentGroupID];if(p&&p.selectAllMode){v++;}}s=this._getSelectableNodesCount(this._oRootNode)-v;}else{s=Object.keys(this._mTreeState.selected).length;}return s;};f.prototype._getSelectableNodesCount=function(n){if(n){return n.magnitude;}else{return 0;}};f.prototype.getSelectedContexts=function(){var r=[];var t=this;if(q.isEmptyObject(this._mTreeState.selected)){return r;}var n=Object.keys(this._mTreeState.selected).length;var N=-1;var m=function(o){if(!o||!o.isArtificial){N++;}if(o){if(o.nodeState&&o.nodeState.selected&&!o.isArtificial){r.push(o.context);t._aRowIndexMap[N]=o;return true;}}};this._match(this._oRootNode,[],n,m);return r;};f.prototype.setSelectionInterval=function(F,t){var m=this._clearSelection();var s=this._setSelectionInterval(F,t,true);var I={};var r=[];for(var i=0;i<m.rowIndices.length;i++){var a=m.rowIndices[i];I[a]=true;}for(i=0;i<s.rowIndices.length;i++){a=s.rowIndices[i];if(I[a]){delete I[a];}else{I[a]=true;}}for(a in I){if(I[a]){r.push(parseInt(a,10));}}this._publishSelectionChanges({rowIndices:r,oldIndex:m.oldIndex,leadIndex:s.leadIndex,leadGroupID:s.leadGroupID});};f.prototype._setSelectionInterval=function(F,t,s){var n=Math.min(F,t);var N=Math.max(F,t);var a=[];var b=[];var i=Math.abs(N-n)+1;var o;var g=-1;var m=function(h){if(!h||!h.isArtificial){g++;}if(h){if(g>=n&&g<=N){if(this._isNodeSelectable(h)){if(h.nodeState.selected!==!!s){b.push(g);}if(h.groupID===this._sLeadSelectionGroupID){o=g;}this.setNodeSelection(h.nodeState,!!s);}return true;}}};this._match(this._oRootNode,a,i,m);var p={rowIndices:b,oldIndex:o,leadIndex:o&&!s?-1:undefined};if(a.length>0&&s){var l=a[a.length-1];p.leadGroupID=l.groupID;p.leadIndex=N;}return p;};f.prototype.addSelectionInterval=function(F,t){var p=this._setSelectionInterval(F,t,true);this._publishSelectionChanges(p);};f.prototype.removeSelectionInterval=function(F,t){var p=this._setSelectionInterval(F,t,false);this._publishSelectionChanges(p);};f.prototype.selectAll=function(){this._mTreeState.deselected={};var p={rowIndices:[],oldIndex:-1,selectAll:true};var n=-1;this._map(this._oRootNode,function(N){if(!N||!N.isArtificial){n++;}if(N){if(N.groupID===this._sLeadSelectionGroupID){p.oldIndex=n;}if(this._isNodeSelectable(N)){if(N.nodeState.selected!==true){p.rowIndices.push(n);}this.setNodeSelection(N.nodeState,true);p.leadGroupID=N.groupID;p.leadIndex=n;}if(N.nodeState.expanded){N.nodeState.selectAllMode=true;}}});this._publishSelectionChanges(p);};f.prototype._clearSelection=function(){var n=-1;var o=-1;var m=0;var a=[];for(var g in this._mTreeState.selected){if(g){m++;}}var M=function(N){if(!N||!N.isArtificial){n++;}if(N){N.nodeState.selectAllMode=false;if(this._mTreeState.selected[N.groupID]){if(!N.isArtificial){a.push(n);}this.setNodeSelection(N.nodeState,false);if(N.groupID===this._sLeadSelectionGroupID){o=n;}return true;}}};this._match(this._oRootNode,[],m,M);if(this._oRootNode&&this._oRootNode.nodeState&&this._oRootNode.isArtificial){this._oRootNode.nodeState.selectAllMode=false;}return{rowIndices:a,oldIndex:o,leadIndex:-1};};f.prototype.clearSelection=function(s){var o=this._clearSelection();if(!s){this._publishSelectionChanges(o);}};f.prototype._publishSelectionChanges=function(p){p.oldIndex=p.oldIndex||this.getSelectedIndex();p.rowIndices.sort(function(a,b){return a-b;});if(p.leadIndex>=0&&p.leadGroupID){this._sLeadSelectionGroupID=p.leadGroupID;}else if(p.leadIndex===-1){this._sLeadSelectionGroupID=undefined;}else{p.leadIndex=p.oldIndex;}if(p.rowIndices.length>0||(p.leadIndex!=undefined&&p.leadIndex!==-1)){this.fireSelectionChanged(p);}};f.prototype.setCollapseRecursive=function(b){this.bCollapseRecursive=!!b;};f.prototype.getCollapseRecursive=function(){return this.bCollapseRecursive;};f.prototype.attachSelectionChanged=function(D,F,l){this.attachEvent("selectionChanged",D,F,l);return this;};f.prototype.detachSelectionChanged=function(F,l){this.detachEvent("selectionChanged",F,l);return this;};f.prototype.fireSelectionChanged=function(a){this.fireEvent("selectionChanged",a);return this;};return f;},true);
