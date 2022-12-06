/*
 * iviewer Widget for jQuery UI
 * https://github.com/can3p/iviewer
 *
 * Copyright (c) 2009 - 2013 Dmitry Petrov
 * Dual licensed under the MIT license.
 *  - http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Dmitry Petrov
 * Version: 0.7.11
 */
!function(i,t){var o={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"},e="ongesturestart"in document.createElement("div");function s(t){var e=t.originalEvent.changedTouches[0];return i.extend(t,{type:o[t.type],which:1,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY,isTouchEvent:!0})}var n=i.ui.mouse.prototype,h=i.ui.mouse.prototype._mouseInit;n._mouseInit=function(){var t=this;t._touchActive=!1,this.element.bind("touchstart."+this.widgetName,function(i){if(!(e&&i.originalEvent.touches.length>1))return t._touchActive=!0,t._mouseDown(s(i))}),this._mouseMoveDelegate=function(i){if(!(e&&i.originalEvent.touches&&i.originalEvent.touches.length>1))return t._touchActive?t._mouseMove(s(i)):void 0},this._mouseUpDelegate=function(i){if(t._touchActive)return t._touchActive=!1,t._mouseUp(s(i))},i(document).bind("touchmove."+this.widgetName,this._mouseMoveDelegate).bind("touchend."+this.widgetName,this._mouseUpDelegate),h.apply(this)};var r=function(i,t){return function(o){if(0===arguments.length)return t.apply(this);i.apply(this,arguments)}},a={0:{marginLeft:0,marginTop:0,filter:'progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, SizingMethod="auto expand")'},90:{marginLeft:-1,marginTop:1,filter:'progid:DXImageTransform.Microsoft.Matrix(M11=0, M12=-1, M21=1, M22=0, SizingMethod="auto expand")'},180:{marginLeft:0,marginTop:0,filter:'progid:DXImageTransform.Microsoft.Matrix(M11=-1, M12=0, M21=0, M22=-1, SizingMethod="auto expand")'},270:{marginLeft:-1,marginTop:1,filter:'progid:DXImageTransform.Microsoft.Matrix(M11=0, M12=1, M21=-1, M22=0, SizingMethod="auto expand")'}},c=function(){for(var i=document.createElement("modernizr").style,o=("transform "+"Webkit Moz O ms".toLowerCase().split(" ").join("Transform ")+"Transform").split(" "),e=0;e<o.length;e++){var s=o[e];if(-1==s.indexOf("-")&&i[s]!==t)return!1}return!0}();i.widget("ui.iviewer",i.ui.mouse,{widgetEventPrefix:"iviewer",options:{zoom:"fit",zoom_base:100,zoom_max:800,zoom_min:25,zoom_delta:1.4,zoom_animation:!0,ui_disabled:!1,mousewheel:!0,update_on_resize:!0,zoom_on_dblclick:!0,fill_container:!1,onZoom:jQuery.noop,onAfterZoom:jQuery.noop,onStartDrag:jQuery.noop,onDrag:jQuery.noop,onStopDrag:jQuery.noop,onMouseMove:jQuery.noop,onClick:jQuery.noop,onDblClick:null,onStartLoad:null,onFinishLoad:null,onErrorLoad:null},_create:function(){var t=this;if(this.dx=0,this.dy=0,this.img_object={},this.zoom_object={},this._angle=0,this.current_zoom=this.options.zoom,null!==this.options.src){if(this.container=this.element,this._updateContainerInfo(),this.container.css("overflow","hidden"),1==this.options.update_on_resize&&i(window).resize(function(){t.update()}),this.img_object=new i.ui.iviewer.ImageObject(this.options.zoom_animation),this.options.mousewheel&&(this.container.bind("mousewheel.iviewer",function(i,o){var e=o>0?1:-1,s=t.container.offset(),n={x:(i.pageX||i.originalEvent.pageX)-s.left,y:(i.pageY||i.originalEvent.pageX)-s.top};return t.zoom_by(e,n),!1}),e)){var o,s,n=+new Date;this.img_object.object().bind("touchstart",function(i){o=t.current_zoom;var e,n=i.originalEvent.touches;2==n.length?(e=t.container.offset(),s={x:(n[0].pageX+n[1].pageX)/2-e.left,y:(n[0].pageY+n[1].pageY)/2-e.top}):s=null}).bind("gesturechange.iviewer",function(i){var e=+new Date;if(!(e-n<50)){n=e;var h=o*i.originalEvent.scale;t.set_zoom(h,s),i.preventDefault()}}).bind("gestureend.iviewer",function(i){s=null})}var h=!!this.options.onDblClick||this.options.zoom_on_dblclick,r=null,a=0;this.img_object.object().prependTo(this.container),h?this.img_object.object().click(function(i){a++,clearTimeout(r),r=setTimeout(function(){a=0,t._click(i)},300)}).dblclick(function(i){2===a&&(clearTimeout(r),a=0,t._dblclick(i))}):this.img_object.object().click(function(i){t._click(i)}),this.container.bind("mousemove.iviewer",function(i){t._handleMouseMove(i)}),this.loadImage(this.options.src),this.options.ui_disabled||this.createui(),this.controls=this.container.find(".iviewer_common")||{},this._mouseInit()}},destroy:function(){i.Widget.prototype.destroy.call(this),this._mouseDestroy(),this.img_object.object().remove(),this.controls.remove(),this.container.off(".iviewer"),this.container.css("overflow","")},_updateContainerInfo:function(){this.options.height=this.container.height(),this.options.width=this.container.width()},update:function(){this._updateContainerInfo(),this.setCoords(this.img_object.x(),this.img_object.y())},loadImage:function(i){this.current_zoom=this.options.zoom;var t=this;this._trigger("onStartLoad",0,i),this.container.addClass("iviewer_loading"),this.img_object.load(i,function(){t._fill_orig_dimensions={width:t.img_object.orig_width(),height:t.img_object.orig_height()},t._imageLoaded(i)},function(){t._trigger("onErrorLoad",0,i)})},_imageLoaded:function(i){this.container.removeClass("iviewer_loading"),this.container.addClass("iviewer_cursor"),"fit"==this.options.zoom?this.fit(!0):this.set_zoom(this.options.zoom,!0),this._trigger("onFinishLoad",0,i),this.options.fill_container&&this.fill_container(!0)},fit:function(i){var t=0;t=this.img_object.orig_width()/this.img_object.orig_height()>this.options.width/this.options.height?this.options.width/this.img_object.orig_width()*100:this.options.height/this.img_object.orig_height()*100,this.set_zoom(t,i)},center:function(){this.setCoords(-Math.round((this.img_object.display_width()-this.options.width)/2),-Math.round((this.img_object.display_height()-this.options.height)/2))},moveTo:function(i,t){var o=i-Math.round(this.options.width/2),e=t-Math.round(this.options.height/2),s=this.img_object.x()-o,n=this.img_object.y()-e;this.setCoords(s,n)},getContainerOffset:function(){return jQuery.extend({},this.container.offset())},setCoords:function(i,t){if(this.img_object.loaded()){var o=this._correctCoords(i,t);this.img_object.x(o.x),this.img_object.y(o.y)}},_correctCoords:function(i,t){return i=parseInt(i,10),(t=parseInt(t,10))>0&&(t=0),i>0&&(i=0),t+this.img_object.display_height()<this.options.height&&(t=this.options.height-this.img_object.display_height()),i+this.img_object.display_width()<this.options.width&&(i=this.options.width-this.img_object.display_width()),this.img_object.display_width()<=this.options.width&&(i=-(this.img_object.display_width()-this.options.width)/2),this.img_object.display_height()<=this.options.height&&(t=-(this.img_object.display_height()-this.options.height)/2),{x:i,y:t}},containerToImage:function(i,t){var o={x:i-this.img_object.x(),y:t-this.img_object.y()};return o=this.img_object.toOriginalCoords(o),{x:_.descaleValue(o.x,this.current_zoom),y:_.descaleValue(o.y,this.current_zoom)}},imageToContainer:function(i,t){var o={x:_.scaleValue(i,this.current_zoom),y:_.scaleValue(t,this.current_zoom)};return this.img_object.toRealCoords(o)},_getMouseCoords:function(i){var t=this.container.offset();return this.containerToImage(i.pageX-t.left,i.pageY-t.top)},fill_container:function(i){if(this.options.fill_container=i,i){var t=this.options.width/this.options.height;t>1?this.img_object.orig_width(this.img_object.orig_height()*t):this.img_object.orig_height(this.img_object.orig_width()*t)}else this.img_object.orig_width(this._fill_orig_dimensions.width),this.img_object.orig_height(this._fill_orig_dimensions.height);this.set_zoom(this.current_zoom)},set_zoom:function(i,t,o){if(0!=this._trigger("onZoom",0,i)&&this.img_object.loaded()){var e,s;o=o||{x:Math.round(this.options.width/2),y:Math.round(this.options.height/2)},i<this.options.zoom_min?i=this.options.zoom_min:i>this.options.zoom_max&&(i=this.options.zoom_max),"fit"==this.current_zoom?(e=o.x+Math.round(this.img_object.orig_width()/2),s=o.y+Math.round(this.img_object.orig_height()/2),this.current_zoom=100):(e=-this.img_object.x()+o.x,s=-this.img_object.y()+o.y);var n=_.scaleValue(this.img_object.orig_width(),i),h=_.scaleValue(this.img_object.orig_height(),i),r=_.scaleValue(_.descaleValue(e,this.current_zoom),i),a=_.scaleValue(_.descaleValue(s,this.current_zoom),i);r=o.x-r,a=o.y-a,n=Math.floor(n),h=Math.floor(h),r=Math.floor(r),a=Math.floor(a),this.img_object.display_width(n),this.img_object.display_height(h);var c=this._correctCoords(r,a),g=this;this.img_object.setImageProps(n,h,c.x,c.y,t,function(){g._trigger("onAfterZoom",0,i)}),this.current_zoom=i,this.update_status()}},showControls:function(i){i?this.controls.fadeIn():this.controls.fadeOut()},zoom_by:function(i,o){var e=this.find_closest_zoom_rate(this.current_zoom)+i,s=this.options.zoom_base*Math.pow(this.options.zoom_delta,e);i>0&&s<this.current_zoom&&(s*=this.options.zoom_delta),i<0&&s>this.current_zoom&&(s/=this.options.zoom_delta),this.set_zoom(s,t,o)},angle:function(i,t){if(0===arguments.length)return this.img_object.angle();i<-270||i>270||i%90!=0||(t||(i+=this.img_object.angle()),i<0&&(i+=360),i>=360&&(i-=360),i!==this.img_object.angle()&&(this.img_object.angle(i),this.center(),this._trigger("angle",0,{angle:this.img_object.angle()})))},find_closest_zoom_rate:function(i){if(i==this.options.zoom_base)return 0;for(var t=i>this.options.zoom_base?function(i,t){return i*t}:function(i,t){return i/t},o=i>this.options.zoom_base?1:-1,e=this.options.zoom_delta,s=1;Math.abs(t(this.options.zoom_base,Math.pow(e,s))-i)>Math.abs(t(this.options.zoom_base,Math.pow(e,s+1))-i);)s++;return o*s},update_status:function(){if(!this.options.ui_disabled){var i=Math.round(100*this.img_object.display_height()/this.img_object.orig_height());i&&this.zoom_object.html(i+"%")}},info:function(i,t){if(i)switch(i){case"orig_width":case"orig_height":return t?this.img_object.angle()%180==0?this.img_object[i]():"orig_width"===i?this.img_object.orig_height():this.img_object.orig_width():this.img_object[i]();case"display_width":case"display_height":case"angle":return this.img_object[i]();case"zoom":return this.current_zoom;case"options":return this.options;case"src":return this.img_object.object().attr("src");case"coords":return{x:this.img_object.x(),y:this.img_object.y()}}},_mouseStart:function(t){return i.ui.mouse.prototype._mouseStart.call(this,t),!1!==this._trigger("onStartDrag",0,this._getMouseCoords(t))&&(this.container.addClass("iviewer_drag_cursor"),this._dragInitialized=!(t.originalEvent.changedTouches&&1==t.originalEvent.changedTouches.length),this.dx=t.pageX-this.img_object.x(),this.dy=t.pageY-this.img_object.y(),!0)},_mouseCapture:function(i){return!0},_handleMouseMove:function(i){this._trigger("onMouseMove",i,this._getMouseCoords(i))},_mouseDrag:function(t){i.ui.mouse.prototype._mouseDrag.call(this,t),this._dragInitialized||(this.dx=t.pageX-this.img_object.x(),this.dy=t.pageY-this.img_object.y(),this._dragInitialized=!0);var o=t.pageY-this.dy,e=t.pageX-this.dx;return this.setCoords(e,o),this._trigger("onDrag",t,this._getMouseCoords(t)),!1},_mouseStop:function(t){i.ui.mouse.prototype._mouseStop.call(this,t),this.container.removeClass("iviewer_drag_cursor"),this._trigger("onStopDrag",0,this._getMouseCoords(t))},_click:function(i){this._trigger("onClick",0,this._getMouseCoords(i))},_dblclick:function(i){if(this.options.onDblClick&&this._trigger("onDblClick",0,this._getMouseCoords(i)),this.options.zoom_on_dblclick){var t=this.container.offset(),o={x:i.pageX-t.left,y:i.pageY-t.top};this.zoom_by(1,o)}},createui:function(){var t=this;i("<div>",{class:"iviewer_zoom_in iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.zoom_by(1),!1}).appendTo(this.container),i("<div>",{class:"iviewer_zoom_out iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.zoom_by(-1),!1}).appendTo(this.container),i("<div>",{class:"iviewer_zoom_zero iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.set_zoom(100),!1}).appendTo(this.container),i("<div>",{class:"iviewer_zoom_fit iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.fit(this),!1}).appendTo(this.container),this.zoom_object=i("<div>").addClass("iviewer_zoom_status iviewer_common").appendTo(this.container),i("<div>",{class:"iviewer_rotate_left iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.angle(-90),!1}).appendTo(this.container),i("<div>",{class:"iviewer_rotate_right iviewer_common iviewer_button"}).bind("mousedown touchstart",function(){return t.angle(90),!1}).appendTo(this.container),this.update_status()}}),i.ui.iviewer.ImageObject=function(t){this._img=i("<img>").css({position:"absolute",top:"0px",left:"0px"}),this._loaded=!1,this._swapDimensions=!1,this._do_anim=t||!1,this.x(0,!0),this.y(0,!0),this.angle(0)},function(){this._reset=function(i,t){this._angle=0,this._swapDimensions=!1,this.x(0),this.y(0),this.orig_width(i),this.orig_height(t),this.display_width(i),this.display_height(t)},this.loaded=function(){return this._loaded},this.load=function(i,t,o){var e=this;t=t||jQuery.noop,this._loaded=!1;var s=new Image;s.onload=function(){e._loaded=!0,e._reset(this.width,this.height),e._img.removeAttr("width").removeAttr("height").removeAttr("style").css({position:"absolute",top:"0px",left:"0px",maxWidth:"none"}),e._img[0].src=i,t()},s.onerror=o,setTimeout(function(){s.src=i},0),this.angle(0)},this._dimension=function(i,t){var o="_"+i+"_"+t,e="_"+i+"_"+("height"===t?"width":"height");return r(function(i){this[this._swapDimensions?o:e]=i},function(){return this[this._swapDimensions?o:e]})},this.display_width=this._dimension("display","width"),this.display_height=this._dimension("display","height"),this.display_diff=function(){return Math.floor(this.display_width()-this.display_height())},this.orig_width=this._dimension("orig","width"),this.orig_height=this._dimension("orig","height"),this.x=r(function(i,t){this._x=i,t||(this._finishAnimation(),this._img.css("left",this._x+(this._swapDimensions?this.display_diff()/2:0)+"px"))},function(){return this._x}),this.y=r(function(i,t){this._y=i,t||(this._finishAnimation(),this._img.css("top",this._y-(this._swapDimensions?this.display_diff()/2:0)+"px"))},function(){return this._y}),this.angle=r(function(i){var t=this._swapDimensions;if(this._angle=i,this._swapDimensions=i%180!=0,t!==this._swapDimensions){var o=this._swapDimensions?-1:1;this.x(this.x()-o*this.display_diff()/2,!0),this.y(this.y()+o*this.display_diff()/2,!0)}var e="rotate("+i+"deg)",s=this._img;jQuery.each(["","-webkit-","-moz-","-o-","-ms-"],function(i,t){s.css(t+"transform",e)}),c&&(jQuery.each(["-ms-",""],function(t,o){s.css(o+"filter",a[i].filter)}),s.css({marginLeft:a[i].marginLeft*this.display_diff()/2,marginTop:a[i].marginTop*this.display_diff()/2}))},function(){return this._angle}),this.toOriginalCoords=function(i){switch(this.angle()){case 0:return{x:i.x,y:i.y};case 90:return{x:i.y,y:this.display_width()-i.x};case 180:return{x:this.display_width()-i.x,y:this.display_height()-i.y};case 270:return{x:this.display_height()-i.y,y:i.x}}},this.toRealCoords=function(i){switch(this.angle()){case 0:return{x:this.x()+i.x,y:this.y()+i.y};case 90:return{x:this.x()+this.display_width()-i.y,y:this.y()+i.x};case 180:return{x:this.x()+this.display_width()-i.x,y:this.y()+this.display_height()-i.y};case 270:return{x:this.x()+i.y,y:this.y()+this.display_height()-i.x}}},this.object=r(jQuery.noop,function(){return this._img}),this.setImageProps=function(i,t,o,e,s,n){n=n||jQuery.noop,this.display_width(i),this.display_height(t),this.x(o,!0),this.y(e,!0);var h={width:this._swapDimensions?t:i,height:this._swapDimensions?i:t,top:e-(this._swapDimensions?this.display_diff()/2:0)+"px",left:o+(this._swapDimensions?this.display_diff()/2:0)+"px"};c&&jQuery.extend(h,{marginLeft:a[this.angle()].marginLeft*this.display_diff()/2,marginTop:a[this.angle()].marginTop*this.display_diff()/2});var r=this._swapDimensions,_=this._img;if(c&&r){var g=this._img.width(),u=this._img.height(),d=h.height-g;iedw=h.width-u,delete h.width,delete h.height}this._do_anim&&!s?this._img.stop(!0).animate(h,{duration:200,complete:n,step:function(i,t){if(c&&r&&"top"===t.prop){var o=(i-t.start)/(t.end-t.start);_.height(g+d*o),_.width(u+iedw*o),_.css("top",i)}}}):(this._img.css(h),setTimeout(n,0))},this._finishAnimation=function(){this._img.stop(!0,!0)}}.apply(i.ui.iviewer.ImageObject.prototype);var _={scaleValue:function(i,t){return i*t/100},descaleValue:function(i,t){return 100*i/t}}}(jQuery,void 0);