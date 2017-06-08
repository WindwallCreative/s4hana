/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/format/NumberFormat'],function(q,C,L,N){"use strict";var a=C.extend("sap.ui.unified.Currency",{metadata:{library:"sap.ui.unified",properties:{value:{type:"float",group:"Appearance",defaultValue:0},currency:{type:"string",group:"Appearance",defaultValue:null},maxPrecision:{type:"int",group:"Appearance",defaultValue:3},useSymbol:{type:"boolean",group:"Appearance",defaultValue:true}}}});a.FIGURE_SPACE='\u2007';a.PUNCTUATION_SPACE='\u2008';a.prototype.init=function(){this._oFormat=N.getCurrencyInstance({showMeasure:false});};a.prototype.exit=function(){this._oFormat=null;this._$Value=null;this._$Currency=null;this._sLastCurrency=null;this._iLastCurrencyDigits=null;this._bRenderNoValClass=null;};a.prototype.onAfterRendering=function(){if(this.$()){this._$Value=this.$().find(".sapUiUfdCurrencyValue");this._$Currency=this.$().find(".sapUiUfdCurrencyCurrency");}};a.prototype.setValue=function(v){if(this.isBound("value")){this._bRenderNoValClass=v==null;if(this.$()){this.$().toggleClass("sapUiUfdCurrencyNoVal",this._bRenderNoValClass);}}this.setProperty("value",v,true);this._renderValue();return this;};a.prototype.unbindProperty=function(p){C.prototype.unbindProperty.apply(this,arguments);if(p==="value"){this._bRenderNoValClass=false;if(this.$()){this.$().toggleClass("sapUiUfdCurrencyNoVal",false);}}};a.prototype.setCurrency=function(v){var c,r;this.setProperty("currency",v,true);this._renderCurrency();c=this._oFormat.oLocaleData.getCurrencyDigits(v);if(q.isNumeric(this._iLastCurrencyDigits)&&this._iLastCurrencyDigits!==c){r=true;}this._iLastCurrencyDigits=c;if(this._sLastCurrency==="*"||v==="*"){r=true;}this._sLastCurrency=v;if(r){this._renderValue();if(v==="*"&&this.$()){this._bRenderNoValClass=false;this.$().toggleClass("sapUiUfdCurrencyNoVal",false);}}return this;};a.prototype.setUseSymbol=function(v){this.setProperty("useSymbol",v,true);this._renderCurrency();return this;};a.prototype.setMaxPrecision=function(v){this.setProperty("maxPrecision",v,true);this._renderValue();return this;};a.prototype._renderValue=function(){if(this._$Value){this._$Value.text(this.getFormattedValue());}};a.prototype._renderCurrency=function(){if(this._$Currency){this._$Currency.text(this._getCurrency());}};a.prototype._getCurrency=function(){return this.getUseSymbol()?this.getCurrencySymbol():this.getCurrency();};a.prototype.getFormattedValue=function(){var c=this.getCurrency(),m,p,i,f;if(c==="*"){return"";}i=this._oFormat.oLocaleData.getCurrencyDigits(c);m=this.getMaxPrecision();m=(m<=0&&i>0?m-1:m);p=m-i;f=this._oFormat.format(this.getValue(),c);if(p==m&&m>0){f+=a.PUNCTUATION_SPACE;}if(p>0){f=q.sap.padRight(f,a.FIGURE_SPACE,f.length+p);}else if(p<0){f=f.substr(0,f.length+p);}return f;};a.prototype.getCurrencySymbol=function(){return this._oFormat.oLocaleData.getCurrencySymbol(this.getCurrency());};a.prototype.getAccessibilityInfo=function(){if(this._bRenderNoValClass){return{};}return{description:(this.getFormattedValue()||"")+" "+(this.getCurrency()||"").trim()};};return a;},true);
