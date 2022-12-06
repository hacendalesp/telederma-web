/**
 * Usage for accepting signatures:
 *  $('.sigPad').signaturePad()
 *
 * Usage for displaying previous signatures:
 *  $('.sigPad').signaturePad({displayOnly:true}).regenerate(sig)
 *  or
 *  var api = $('.sigPad').signaturePad({displayOnly:true})
 *  api.regenerate(sig)
 */
!function(e){function t(t,n){var a=this,i=e.extend({},e.fn.signaturePad.defaults,n),r=e(t),o=e(i.canvas,r),s=o.get(0),l=null,u={x:null,y:null},d=[],c=!1,p=!1,f=!1,h=!1,g=30,v=g,m=0;function y(){clearTimeout(c),c=!1,p=!1}function w(t,n){var r,o,s;if(t.preventDefault(),r=e(t.target).offset(),clearTimeout(c),c=!1,void 0!==t.targetTouches?(o=Math.floor(t.targetTouches[0].pageX-r.left),s=Math.floor(t.targetTouches[0].pageY-r.top)):(o=Math.floor(t.pageX-r.left),s=Math.floor(t.pageY-r.top)),u.x===o&&u.y===s)return!0;null===u.x&&(u.x=o),null===u.y&&(u.y=s),n&&(s+=n),l.beginPath(),l.moveTo(u.x,u.y),l.lineTo(o,s),l.lineCap=i.penCap,l.stroke(),l.closePath(),d.push({lx:o,ly:s,mx:u.x,my:u.y}),u.x=o,u.y=s,i.onDraw&&"function"==typeof i.onDraw&&i.onDraw.apply(a)}function C(){b()}function b(t){t?w(t,1):(f?o.each(function(){this.removeEventListener("touchmove",w)}):o.unbind("mousemove.signaturepad"),d.length>0&&i.onDrawEnd&&"function"==typeof i.onDrawEnd&&i.onDrawEnd.apply(a)),u.x=null,u.y=null,i.output&&d.length>0&&e(i.output,r).val(JSON.stringify(d))}function I(){l.clearRect(0,0,s.width,s.height),l.fillStyle=i.bgColour,l.fillRect(0,0,s.width,s.height),i.displayOnly||function(){if(!i.lineWidth)return!1;l.beginPath(),l.lineWidth=i.lineWidth,l.strokeStyle=i.lineColour,l.moveTo(i.lineMargin,i.lineTop),l.lineTo(s.width-i.lineMargin,i.lineTop),l.stroke(),l.closePath()}(),l.lineWidth=i.penWidth,l.strokeStyle=i.penColour,e(i.output,r).val(""),d=[],b()}function x(e,t){null==u.x?w(e,1):w(e,t)}function D(e,t){f?t.addEventListener("touchmove",x,!1):o.bind("mousemove.signaturepad",x),w(e,1)}function E(t){if(h)return!1;h=!0,e("input").blur(),void 0!==t.targetTouches&&(f=!0),f?(o.each(function(){this.addEventListener("touchend",C,!1),this.addEventListener("touchcancel",C,!1)}),o.unbind("mousedown.signaturepad")):(e(document).bind("mouseup.signaturepad",function(){p&&(b(),y())}),o.bind("mouseleave.signaturepad",function(e){p&&b(e),p&&!c&&(c=setTimeout(function(){b(),y()},500))}),o.each(function(){this.ontouchstart=null}))}function k(){e(i.typed,r).hide(),I(),o.each(function(){this.ontouchstart=function(e){e.preventDefault(),p=!0,E(e),D(e,this)}}),o.bind("mousedown.signaturepad",function(e){if(e.preventDefault(),e.which>1)return!1;p=!0,E(e),D(e)}),e(i.clear,r).bind("click.signaturepad",function(e){e.preventDefault(),I()}),e(i.typeIt,r).bind("click.signaturepad",function(e){e.preventDefault(),O()}),e(i.drawIt,r).unbind("click.signaturepad"),e(i.drawIt,r).bind("click.signaturepad",function(e){e.preventDefault()}),e(i.typeIt,r).removeClass(i.currentClass),e(i.drawIt,r).addClass(i.currentClass),e(i.sig,r).addClass(i.currentClass),e(i.typeItDesc,r).hide(),e(i.drawItDesc,r).show(),e(i.clear,r).show()}function O(){I(),h=!1,o.each(function(){this.removeEventListener&&(this.removeEventListener("touchend",C),this.removeEventListener("touchcancel",C),this.removeEventListener("touchmove",w)),this.ontouchstart&&(this.ontouchstart=null)}),e(document).unbind("mouseup.signaturepad"),o.unbind("mousedown.signaturepad"),o.unbind("mousemove.signaturepad"),o.unbind("mouseleave.signaturepad"),e(i.clear,r).unbind("click.signaturepad"),e(i.typed,r).show(),e(i.drawIt,r).bind("click.signaturepad",function(e){e.preventDefault(),k()}),e(i.typeIt,r).unbind("click.signaturepad"),e(i.typeIt,r).bind("click.signaturepad",function(e){e.preventDefault()}),e(i.output,r).val(""),e(i.drawIt,r).removeClass(i.currentClass),e(i.typeIt,r).addClass(i.currentClass),e(i.sig,r).removeClass(i.currentClass),e(i.drawItDesc,r).hide(),e(i.clear,r).hide(),e(i.typeItDesc,r).show(),v=g=e(i.typed,r).css("font-size").replace(/px/,"")}function P(t){var n=e(i.typed,r),a=e.trim(t.replace(/>/g,"&gt;").replace(/</g,"&lt;")),o=m,l=.5*v;if(m=a.length,n.html(a),a){if(m>o&&n.outerWidth()>s.width)for(;n.outerWidth()>s.width;)v--,n.css("font-size",v+"px");if(m<o&&n.outerWidth()+l<s.width&&v<g)for(;n.outerWidth()+l<s.width&&v<g;)v++,n.css("font-size",v+"px")}else n.css("font-size",g+"px")}function T(){var t=!0,n={drawInvalid:!1,nameInvalid:!1},o=[r,i],s=[n,r,i];return i.onBeforeValidate&&"function"==typeof i.onBeforeValidate?i.onBeforeValidate.apply(a,o):function(t,n){e("p."+n.errorClass,t).remove(),t.removeClass(n.errorClass),e("input, label",t).removeClass(n.errorClass)}.apply(a,o),i.drawOnly&&d.length<1&&(n.drawInvalid=!0,t=!1),""===e(i.name,r).val()&&(n.nameInvalid=!0,t=!1),i.onFormError&&"function"==typeof i.onFormError?i.onFormError.apply(a,s):function(t,n,a){t.nameInvalid&&(n.prepend(['<p class="',a.errorClass,'">',a.errorMessage,"</p>"].join("")),e(a.name,n).focus(),e(a.name,n).addClass(a.errorClass),e("label[for="+e(a.name).attr("id")+"]",n).addClass(a.errorClass)),t.drawInvalid&&n.prepend(['<p class="',a.errorClass,'">',a.errorMessageDraw,"</p>"].join(""))}.apply(a,s),t}function S(e,t,n){for(var a in e)"object"==typeof e[a]&&(t.beginPath(),t.moveTo(e[a].mx,e[a].my),t.lineTo(e[a].lx,e[a].ly),t.lineCap=i.penCap,t.stroke(),t.closePath(),n&&d.push({lx:e[a].lx,ly:e[a].ly,mx:e[a].mx,my:e[a].my}))}console.log(s),e.extend(a,{signaturePad:"{{version}}",init:function(){parseFloat((/CPU.+OS ([0-9_]{3}).*AppleWebkit.*Mobile/i.exec(navigator.userAgent)||[0,"4_2"])[1].replace("_","."))<4.1&&(e.fn.Oldoffset=e.fn.offset,e.fn.offset=function(){var t=e(this).Oldoffset();return t.top-=window.scrollY,t.left-=window.scrollX,t}),e(i.typed,r).bind("selectstart.signaturepad",function(t){return e(t.target).is(":input")}),o.bind("selectstart.signaturepad",function(t){return e(t.target).is(":input")}),!s.getContext&&FlashCanvas&&FlashCanvas.initElement(s),s.getContext&&(l=s.getContext("2d"),e(i.sig,r).show(),i.displayOnly||(i.drawOnly||(e(i.name,r).bind("keyup.signaturepad",function(){P(e(this).val())}),e(i.name,r).bind("blur.signaturepad",function(){P(e(this).val())}),e(i.drawIt,r).bind("click.signaturepad",function(e){e.preventDefault(),k()})),i.drawOnly||"drawIt"===i.defaultAction?k():O(),i.validateFields&&(e(t).is("form")?e(t).bind("submit.signaturepad",function(){return T()}):e(t).parents("form").bind("submit.signaturepad",function(){return T()})),e(i.sigNav,r).show()))},updateOptions:function(t){e.extend(i,t)},regenerate:function(t){a.clearCanvas(),e(i.typed,r).hide(),"string"==typeof t&&(t=JSON.parse(t)),S(t,l,!0),i.output&&e(i.output,r).length>0&&e(i.output,r).val(JSON.stringify(d))},clearCanvas:function(){I()},getSignature:function(){return d},getSignatureString:function(){return JSON.stringify(d)},getSignatureImage:function(){var e,t=document.createElement("canvas"),n=null;return t.style.position="absolute",t.style.top="-999em",t.width=s.width,t.height=s.height,document.body.appendChild(t),!t.getContext&&FlashCanvas&&FlashCanvas.initElement(t),(n=t.getContext("2d")).fillStyle=i.bgColour,n.fillRect(0,0,s.width,s.height),n.lineWidth=i.penWidth,n.strokeStyle=i.penColour,S(d,n),e=t.toDataURL.apply(t,arguments),document.body.removeChild(t),t=null,e},validateForm:function(){return T()}})}e.fn.signaturePad=function(n){var a=null;return this.each(function(){e.data(this,"plugin-signaturePad")?(a=e.data(this,"plugin-signaturePad")).updateOptions(n):((a=new t(this,n)).init(),e.data(this,"plugin-signaturePad",a))}),a},e.fn.signaturePad.defaults={defaultAction:"typeIt",displayOnly:!1,drawOnly:!1,canvas:"canvas",sig:".sig",sigNav:".sigNav",bgColour:"#ffffff",penColour:"#145394",penWidth:2,penCap:"round",lineColour:"#ccc",lineWidth:2,lineMargin:5,lineTop:35,name:".name",typed:".typed",clear:".clearButton",typeIt:".typeIt a",drawIt:".drawIt a",typeItDesc:".typeItDesc",drawItDesc:".drawItDesc",output:".output",currentClass:"current",validateFields:!0,errorClass:"error",errorMessage:"Please enter your name",errorMessageDraw:"Please sign the document",onBeforeValidate:null,onFormError:null,onDraw:null,onDrawEnd:null}}(jQuery);