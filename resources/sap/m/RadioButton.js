/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','./RadioButtonGroup'],function(q,l,C,E,R){"use strict";var a=C.extend("sap.m.RadioButton",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},selected:{type:"boolean",group:"Data",defaultValue:false},groupName:{type:"string",group:"Behavior",defaultValue:'sapMRbDefaultGroup'},text:{type:"string",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},useEntireWidth:{type:"boolean",group:"Appearance",defaultValue:false},activeHandling:{type:"boolean",group:"Appearance",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin}},events:{select:{parameters:{selected:{type:"boolean"}}}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designTime:true}});E.call(a.prototype);a.prototype._groupNames={};var K={HOME:"first",END:"last",NEXT:"next",PREV:"prev"};a.prototype.ontap=function(e){if(!this.getEnabled()||!this.getEditable()){return;}var p=this.getParent();if(p instanceof R&&(!p.getEnabled()||!p.getEditable())){return;}e&&e.setMarked();this.applyFocusInfo();if(!this.getSelected()){this.setSelected(true);var t=this;setTimeout(function(){t.fireSelect({selected:true});},0);}};a.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true;if(this.getEnabled()&&this.getActiveHandling()){this.$().toggleClass("sapMRbBTouched",true);}};a.prototype.ontouchend=function(e){this.$().toggleClass("sapMRbBTouched",false);};a.prototype.onsapnext=function(e){this._keyboardHandler(K.NEXT,true);e.setMarked();return this;};a.prototype.onsapnextmodifiers=function(e){this._keyboardHandler(K.NEXT,!e.ctrlKey);e.setMarked();return this;};a.prototype.onsapprevious=function(e){this._keyboardHandler(K.PREV,true);e.setMarked();return this;};a.prototype.onsappreviousmodifiers=function(e){this._keyboardHandler(K.PREV,!e.ctrlKey);e.setMarked();return this;};a.prototype.onsaphome=function(e){this._keyboardHandler(K.HOME,true);e.setMarked();return this;};a.prototype.onsaphomemodifiers=function(e){this._keyboardHandler(K.HOME,!e.ctrlKey);e.setMarked();return this;};a.prototype.onsapend=function(e){this._keyboardHandler(K.END,true);e.setMarked();return this;};a.prototype.onsapendmodifiers=function(e){this._keyboardHandler(K.END,!e.ctrlKey);e.setMarked();return this;};a.prototype._keyboardHandler=function(p,s){if(this.getParent()instanceof sap.m.RadioButtonGroup){return;}var n=this._getNextFocusItem(p);n.focus();s&&n.setSelected(true);};a.prototype._getNextFocusItem=function(n){var v=this._groupNames[this.getGroupName()].filter(function(r){return(r.getDomRef()&&r.getEnabled());});var b=v.indexOf(this),i=b,V=v.length;switch(n){case K.NEXT:i=b===V-1?b:b+1;break;case K.PREV:i=b===0?0:i-1;break;case K.HOME:i=0;break;case K.END:i=V-1;break;}return v[i]||this;};a.prototype.onsapselect=function(e){e.preventDefault();this.ontap(e);};a.prototype.setEnabled=function(e){this.setProperty("enabled",e,false);return this;};a.prototype.setSelected=function(s){var c,S=this.getSelected(),g=this.getGroupName(),b=this._groupNames[g],L=b&&b.length;this.setProperty("selected",s,true);this._changeGroupName(this.getGroupName());if(!!s&&g&&g!==""){for(var i=0;i<L;i++){c=b[i];if(c instanceof a&&c!==this&&c.getSelected()){c.fireSelect({selected:false});c.setSelected(false);}}}if((S!==!!s)&&this.getDomRef()){this.$().toggleClass("sapMRbSel",s);if(s){this.getDomRef().setAttribute("aria-checked","true");this.getDomRef("RB").checked=true;this.getDomRef("RB").setAttribute("checked","checked");}else{this.getDomRef().removeAttribute("aria-checked");this.getDomRef("RB").checked=false;this.getDomRef("RB").removeAttribute("checked");}}return this;};a.prototype.setText=function(t){this.setProperty("text",t,true);if(this._oLabel){this._oLabel.setText(this.getText());}else{this._createLabel("text",this.getText());}this.addStyleClass("sapMRbHasLabel");return this;};a.prototype._setWidth=function(u){if(!u){this._setLableWidth();}else{this._setLableWidth("auto");}};a.prototype._setLableWidth=function(w){w=w||this.getWidth();if(this._oLabel){this._oLabel.setWidth(w);}else{this._createLabel("width",w);}};a.prototype.setTextDirection=function(d){this.setProperty("textDirection",d,true);if(this._oLabel){this._oLabel.setTextDirection(this.getTextDirection());}else{this._createLabel("textDirection",this.getTextDirection());}return this;};a.prototype.setGroupName=function(g){this._changeGroupName(g,this.getGroupName());return this.setProperty("groupName",g,true);};a.prototype.onBeforeRendering=function(){this._setWidth(this.getUseEntireWidth());return this._changeGroupName(this.getGroupName());};a.prototype.exit=function(){var g=this.getGroupName(),c=this._groupNames[g],G=c&&c.indexOf(this);this._iTabIndex=null;if(this._oLabel){this._oLabel.destroy();}if(G>=-1){c.splice(G,1);}};a.prototype._createLabel=function(p,v){this._oLabel=new sap.m.Label(this.getId()+"-label").addStyleClass("sapMRbBLabel").setParent(this,null,true);this._oLabel.setProperty(p,v,false);};a.prototype.setTabIndex=function(t){var f=this.getFocusDomRef();this._iTabIndex=t;if(f){f.setAttribute("tabindex",t);}return this;};a.prototype.setTextAlign=function(A){this.setProperty("textAlign",A,true);if(this._oLabel){this._oLabel.setTextAlign(this.getTextAlign());}else{this._createLabel("textAlign",this.getTextAlign());}return this;};a.prototype._changeGroupName=function(n,o){var N=this._groupNames[n],O=this._groupNames[o];if(O&&O.indexOf(this)!==-1){O.splice(O.indexOf(this),1);}if(!N){N=this._groupNames[n]=[];}if(N.indexOf(this)===-1){N.push(this);}};return a;},true);
