function od(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const a in n)if(a!=="default"&&!(a in e)){const l=Object.getOwnPropertyDescriptor(n,a);l&&Object.defineProperty(e,a,l.get?l:{enumerable:!0,get:()=>n[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=r(a);fetch(a.href,l)}})();function sd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Os={exports:{}},ja={},Ms={exports:{}},A={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hn=Symbol.for("react.element"),cd=Symbol.for("react.portal"),ud=Symbol.for("react.fragment"),dd=Symbol.for("react.strict_mode"),fd=Symbol.for("react.profiler"),pd=Symbol.for("react.provider"),md=Symbol.for("react.context"),vd=Symbol.for("react.forward_ref"),hd=Symbol.for("react.suspense"),gd=Symbol.for("react.memo"),yd=Symbol.for("react.lazy"),vo=Symbol.iterator;function xd(e){return e===null||typeof e!="object"?null:(e=vo&&e[vo]||e["@@iterator"],typeof e=="function"?e:null)}var Is={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fs=Object.assign,$s={};function jr(e,t,r){this.props=e,this.context=t,this.refs=$s,this.updater=r||Is}jr.prototype.isReactComponent={};jr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};jr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function As(){}As.prototype=jr.prototype;function vi(e,t,r){this.props=e,this.context=t,this.refs=$s,this.updater=r||Is}var hi=vi.prototype=new As;hi.constructor=vi;Fs(hi,jr.prototype);hi.isPureReactComponent=!0;var ho=Array.isArray,Us=Object.prototype.hasOwnProperty,gi={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Vs(e,t,r){var n,a={},l=null,o=null;if(t!=null)for(n in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Us.call(t,n)&&!Bs.hasOwnProperty(n)&&(a[n]=t[n]);var s=arguments.length-2;if(s===1)a.children=r;else if(1<s){for(var c=Array(s),u=0;u<s;u++)c[u]=arguments[u+2];a.children=c}if(e&&e.defaultProps)for(n in s=e.defaultProps,s)a[n]===void 0&&(a[n]=s[n]);return{$$typeof:hn,type:e,key:l,ref:o,props:a,_owner:gi.current}}function wd(e,t){return{$$typeof:hn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function yi(e){return typeof e=="object"&&e!==null&&e.$$typeof===hn}function kd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var go=/\/+/g;function Va(e,t){return typeof e=="object"&&e!==null&&e.key!=null?kd(""+e.key):t.toString(36)}function An(e,t,r,n,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case hn:case cd:o=!0}}if(o)return o=e,a=a(o),e=n===""?"."+Va(o,0):n,ho(a)?(r="",e!=null&&(r=e.replace(go,"$&/")+"/"),An(a,t,r,"",function(u){return u})):a!=null&&(yi(a)&&(a=wd(a,r+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(go,"$&/")+"/")+e)),t.push(a)),1;if(o=0,n=n===""?".":n+":",ho(e))for(var s=0;s<e.length;s++){l=e[s];var c=n+Va(l,s);o+=An(l,t,r,c,a)}else if(c=xd(e),typeof c=="function")for(e=c.call(e),s=0;!(l=e.next()).done;)l=l.value,c=n+Va(l,s++),o+=An(l,t,r,c,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function _n(e,t,r){if(e==null)return e;var n=[],a=0;return An(e,n,"","",function(l){return t.call(r,l,a++)}),n}function _d(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},Un={transition:null},jd={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:Un,ReactCurrentOwner:gi};function Ws(){throw Error("act(...) is not supported in production builds of React.")}A.Children={map:_n,forEach:function(e,t,r){_n(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return _n(e,function(){t++}),t},toArray:function(e){return _n(e,function(t){return t})||[]},only:function(e){if(!yi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};A.Component=jr;A.Fragment=ud;A.Profiler=fd;A.PureComponent=vi;A.StrictMode=dd;A.Suspense=hd;A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jd;A.act=Ws;A.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Fs({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=gi.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)Us.call(t,c)&&!Bs.hasOwnProperty(c)&&(n[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){s=Array(c);for(var u=0;u<c;u++)s[u]=arguments[u+2];n.children=s}return{$$typeof:hn,type:e.type,key:a,ref:l,props:n,_owner:o}};A.createContext=function(e){return e={$$typeof:md,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:pd,_context:e},e.Consumer=e};A.createElement=Vs;A.createFactory=function(e){var t=Vs.bind(null,e);return t.type=e,t};A.createRef=function(){return{current:null}};A.forwardRef=function(e){return{$$typeof:vd,render:e}};A.isValidElement=yi;A.lazy=function(e){return{$$typeof:yd,_payload:{_status:-1,_result:e},_init:_d}};A.memo=function(e,t){return{$$typeof:gd,type:e,compare:t===void 0?null:t}};A.startTransition=function(e){var t=Un.transition;Un.transition={};try{e()}finally{Un.transition=t}};A.unstable_act=Ws;A.useCallback=function(e,t){return ke.current.useCallback(e,t)};A.useContext=function(e){return ke.current.useContext(e)};A.useDebugValue=function(){};A.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};A.useEffect=function(e,t){return ke.current.useEffect(e,t)};A.useId=function(){return ke.current.useId()};A.useImperativeHandle=function(e,t,r){return ke.current.useImperativeHandle(e,t,r)};A.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};A.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};A.useMemo=function(e,t){return ke.current.useMemo(e,t)};A.useReducer=function(e,t,r){return ke.current.useReducer(e,t,r)};A.useRef=function(e){return ke.current.useRef(e)};A.useState=function(e){return ke.current.useState(e)};A.useSyncExternalStore=function(e,t,r){return ke.current.useSyncExternalStore(e,t,r)};A.useTransition=function(){return ke.current.useTransition()};A.version="18.3.1";Ms.exports=A;var g=Ms.exports;const Hs=sd(g),Nd=od({__proto__:null,default:Hs},[g]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sd=g,Ed=Symbol.for("react.element"),bd=Symbol.for("react.fragment"),Cd=Object.prototype.hasOwnProperty,zd=Sd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Pd={key:!0,ref:!0,__self:!0,__source:!0};function Qs(e,t,r){var n,a={},l=null,o=null;r!==void 0&&(l=""+r),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(o=t.ref);for(n in t)Cd.call(t,n)&&!Pd.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:Ed,type:e,key:l,ref:o,props:a,_owner:zd.current}}ja.Fragment=bd;ja.jsx=Qs;ja.jsxs=Qs;Os.exports=ja;var i=Os.exports,wl={},Ys={exports:{}},Oe={},Xs={exports:{}},Ks={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(j,C){var D=j.length;j.push(C);e:for(;0<D;){var I=D-1>>>1,W=j[I];if(0<a(W,C))j[I]=C,j[D]=W,D=I;else break e}}function r(j){return j.length===0?null:j[0]}function n(j){if(j.length===0)return null;var C=j[0],D=j.pop();if(D!==C){j[0]=D;e:for(var I=0,W=j.length,Pe=W>>>1;I<Pe;){var J=2*(I+1)-1,E=j[J],R=J+1,F=j[R];if(0>a(E,D))R<W&&0>a(F,E)?(j[I]=F,j[R]=D,I=R):(j[I]=E,j[J]=D,I=J);else if(R<W&&0>a(F,D))j[I]=F,j[R]=D,I=R;else break e}}return C}function a(j,C){var D=j.sortIndex-C.sortIndex;return D!==0?D:j.id-C.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],u=[],v=1,m=null,h=3,y=!1,x=!1,w=!1,_=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(j){for(var C=r(u);C!==null;){if(C.callback===null)n(u);else if(C.startTime<=j)n(u),C.sortIndex=C.expirationTime,t(c,C);else break;C=r(u)}}function k(j){if(w=!1,p(j),!x)if(r(c)!==null)x=!0,Q(S);else{var C=r(u);C!==null&&b(k,C.startTime-j)}}function S(j,C){x=!1,w&&(w=!1,f(L),L=-1),y=!0;var D=h;try{for(p(C),m=r(c);m!==null&&(!(m.expirationTime>C)||j&&!re());){var I=m.callback;if(typeof I=="function"){m.callback=null,h=m.priorityLevel;var W=I(m.expirationTime<=C);C=e.unstable_now(),typeof W=="function"?m.callback=W:m===r(c)&&n(c),p(C)}else n(c);m=r(c)}if(m!==null)var Pe=!0;else{var J=r(u);J!==null&&b(k,J.startTime-C),Pe=!1}return Pe}finally{m=null,h=D,y=!1}}var z=!1,P=null,L=-1,U=5,M=-1;function re(){return!(e.unstable_now()-M<U)}function ze(){if(P!==null){var j=e.unstable_now();M=j;var C=!0;try{C=P(!0,j)}finally{C?je():(z=!1,P=null)}}else z=!1}var je;if(typeof d=="function")je=function(){d(ze)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,B=O.port2;O.port1.onmessage=ze,je=function(){B.postMessage(null)}}else je=function(){_(ze,0)};function Q(j){P=j,z||(z=!0,je())}function b(j,C){L=_(function(){j(e.unstable_now())},C)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(j){j.callback=null},e.unstable_continueExecution=function(){x||y||(x=!0,Q(S))},e.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<j?Math.floor(1e3/j):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(j){switch(h){case 1:case 2:case 3:var C=3;break;default:C=h}var D=h;h=C;try{return j()}finally{h=D}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(j,C){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var D=h;h=j;try{return C()}finally{h=D}},e.unstable_scheduleCallback=function(j,C,D){var I=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?I+D:I):D=I,j){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=D+W,j={id:v++,callback:C,priorityLevel:j,startTime:D,expirationTime:W,sortIndex:-1},D>I?(j.sortIndex=D,t(u,j),r(c)===null&&j===r(u)&&(w?(f(L),L=-1):w=!0,b(k,D-I))):(j.sortIndex=W,t(c,j),x||y||(x=!0,Q(S))),j},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(j){var C=h;return function(){var D=h;h=C;try{return j.apply(this,arguments)}finally{h=D}}}})(Ks);Xs.exports=Ks;var Ld=Xs.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Td=g,Re=Ld;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gs=new Set,Gr={};function Qt(e,t){vr(e,t),vr(e+"Capture",t)}function vr(e,t){for(Gr[e]=t,e=0;e<t.length;e++)Gs.add(t[e])}var ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),kl=Object.prototype.hasOwnProperty,Dd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yo={},xo={};function Rd(e){return kl.call(xo,e)?!0:kl.call(yo,e)?!1:Dd.test(e)?xo[e]=!0:(yo[e]=!0,!1)}function Od(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Md(e,t,r,n){if(t===null||typeof t>"u"||Od(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function _e(e,t,r,n,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){me[e]=new _e(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];me[t]=new _e(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){me[e]=new _e(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){me[e]=new _e(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){me[e]=new _e(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){me[e]=new _e(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){me[e]=new _e(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){me[e]=new _e(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){me[e]=new _e(e,5,!1,e.toLowerCase(),null,!1,!1)});var xi=/[\-:]([a-z])/g;function wi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xi,wi);me[t]=new _e(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xi,wi);me[t]=new _e(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xi,wi);me[t]=new _e(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){me[e]=new _e(e,1,!1,e.toLowerCase(),null,!1,!1)});me.xlinkHref=new _e("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){me[e]=new _e(e,1,!1,e.toLowerCase(),null,!0,!0)});function ki(e,t,r,n){var a=me.hasOwnProperty(t)?me[t]:null;(a!==null?a.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Md(t,r,a,n)&&(r=null),n||a===null?Rd(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(t=a.attributeName,n=a.attributeNamespace,r===null?e.removeAttribute(t):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var dt=Td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,jn=Symbol.for("react.element"),Jt=Symbol.for("react.portal"),Zt=Symbol.for("react.fragment"),_i=Symbol.for("react.strict_mode"),_l=Symbol.for("react.profiler"),Js=Symbol.for("react.provider"),Zs=Symbol.for("react.context"),ji=Symbol.for("react.forward_ref"),jl=Symbol.for("react.suspense"),Nl=Symbol.for("react.suspense_list"),Ni=Symbol.for("react.memo"),pt=Symbol.for("react.lazy"),qs=Symbol.for("react.offscreen"),wo=Symbol.iterator;function br(e){return e===null||typeof e!="object"?null:(e=wo&&e[wo]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,Wa;function Mr(e){if(Wa===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Wa=t&&t[1]||""}return`
`+Wa+e}var Ha=!1;function Qa(e,t){if(!e||Ha)return"";Ha=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var n=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){n=u}e.call(t.prototype)}else{try{throw Error()}catch(u){n=u}e()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),l=n.stack.split(`
`),o=a.length-1,s=l.length-1;1<=o&&0<=s&&a[o]!==l[s];)s--;for(;1<=o&&0<=s;o--,s--)if(a[o]!==l[s]){if(o!==1||s!==1)do if(o--,s--,0>s||a[o]!==l[s]){var c=`
`+a[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=s);break}}}finally{Ha=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Mr(e):""}function Id(e){switch(e.tag){case 5:return Mr(e.type);case 16:return Mr("Lazy");case 13:return Mr("Suspense");case 19:return Mr("SuspenseList");case 0:case 2:case 15:return e=Qa(e.type,!1),e;case 11:return e=Qa(e.type.render,!1),e;case 1:return e=Qa(e.type,!0),e;default:return""}}function Sl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Zt:return"Fragment";case Jt:return"Portal";case _l:return"Profiler";case _i:return"StrictMode";case jl:return"Suspense";case Nl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Zs:return(e.displayName||"Context")+".Consumer";case Js:return(e._context.displayName||"Context")+".Provider";case ji:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ni:return t=e.displayName||null,t!==null?t:Sl(e.type)||"Memo";case pt:t=e._payload,e=e._init;try{return Sl(e(t))}catch{}}return null}function Fd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Sl(t);case 8:return t===_i?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ct(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ec(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function $d(e){var t=ec(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,l=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){n=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Nn(e){e._valueTracker||(e._valueTracker=$d(e))}function tc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=ec(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function qn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function El(e,t){var r=t.checked;return ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ko(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=Ct(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function rc(e,t){t=t.checked,t!=null&&ki(e,"checked",t,!1)}function bl(e,t){rc(e,t);var r=Ct(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Cl(e,t.type,r):t.hasOwnProperty("defaultValue")&&Cl(e,t.type,Ct(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function _o(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Cl(e,t,r){(t!=="number"||qn(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Ir=Array.isArray;function cr(e,t,r,n){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&n&&(e[r].defaultSelected=!0)}else{for(r=""+Ct(r),t=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,n&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function zl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function jo(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(N(92));if(Ir(r)){if(1<r.length)throw Error(N(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Ct(r)}}function nc(e,t){var r=Ct(t.value),n=Ct(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function No(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ac(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ac(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Sn,lc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,a){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Sn=Sn||document.createElement("div"),Sn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Sn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Ar={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ad=["Webkit","ms","Moz","O"];Object.keys(Ar).forEach(function(e){Ad.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ar[t]=Ar[e]})});function ic(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Ar.hasOwnProperty(e)&&Ar[e]?(""+t).trim():t+"px"}function oc(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,a=ic(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,a):e[r]=a}}var Ud=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ll(e,t){if(t){if(Ud[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function Tl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dl=null;function Si(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Rl=null,ur=null,dr=null;function So(e){if(e=xn(e)){if(typeof Rl!="function")throw Error(N(280));var t=e.stateNode;t&&(t=Ca(t),Rl(e.stateNode,e.type,t))}}function sc(e){ur?dr?dr.push(e):dr=[e]:ur=e}function cc(){if(ur){var e=ur,t=dr;if(dr=ur=null,So(e),t)for(e=0;e<t.length;e++)So(t[e])}}function uc(e,t){return e(t)}function dc(){}var Ya=!1;function fc(e,t,r){if(Ya)return e(t,r);Ya=!0;try{return uc(e,t,r)}finally{Ya=!1,(ur!==null||dr!==null)&&(dc(),cc())}}function Zr(e,t){var r=e.stateNode;if(r===null)return null;var n=Ca(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(N(231,t,typeof r));return r}var Ol=!1;if(ot)try{var Cr={};Object.defineProperty(Cr,"passive",{get:function(){Ol=!0}}),window.addEventListener("test",Cr,Cr),window.removeEventListener("test",Cr,Cr)}catch{Ol=!1}function Bd(e,t,r,n,a,l,o,s,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(r,u)}catch(v){this.onError(v)}}var Ur=!1,ea=null,ta=!1,Ml=null,Vd={onError:function(e){Ur=!0,ea=e}};function Wd(e,t,r,n,a,l,o,s,c){Ur=!1,ea=null,Bd.apply(Vd,arguments)}function Hd(e,t,r,n,a,l,o,s,c){if(Wd.apply(this,arguments),Ur){if(Ur){var u=ea;Ur=!1,ea=null}else throw Error(N(198));ta||(ta=!0,Ml=u)}}function Yt(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function pc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Eo(e){if(Yt(e)!==e)throw Error(N(188))}function Qd(e){var t=e.alternate;if(!t){if(t=Yt(e),t===null)throw Error(N(188));return t!==e?null:e}for(var r=e,n=t;;){var a=r.return;if(a===null)break;var l=a.alternate;if(l===null){if(n=a.return,n!==null){r=n;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===r)return Eo(a),e;if(l===n)return Eo(a),t;l=l.sibling}throw Error(N(188))}if(r.return!==n.return)r=a,n=l;else{for(var o=!1,s=a.child;s;){if(s===r){o=!0,r=a,n=l;break}if(s===n){o=!0,n=a,r=l;break}s=s.sibling}if(!o){for(s=l.child;s;){if(s===r){o=!0,r=l,n=a;break}if(s===n){o=!0,n=l,r=a;break}s=s.sibling}if(!o)throw Error(N(189))}}if(r.alternate!==n)throw Error(N(190))}if(r.tag!==3)throw Error(N(188));return r.stateNode.current===r?e:t}function mc(e){return e=Qd(e),e!==null?vc(e):null}function vc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=vc(e);if(t!==null)return t;e=e.sibling}return null}var hc=Re.unstable_scheduleCallback,bo=Re.unstable_cancelCallback,Yd=Re.unstable_shouldYield,Xd=Re.unstable_requestPaint,ne=Re.unstable_now,Kd=Re.unstable_getCurrentPriorityLevel,Ei=Re.unstable_ImmediatePriority,gc=Re.unstable_UserBlockingPriority,ra=Re.unstable_NormalPriority,Gd=Re.unstable_LowPriority,yc=Re.unstable_IdlePriority,Na=null,qe=null;function Jd(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(Na,e,void 0,(e.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:ef,Zd=Math.log,qd=Math.LN2;function ef(e){return e>>>=0,e===0?32:31-(Zd(e)/qd|0)|0}var En=64,bn=4194304;function Fr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function na(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,a=e.suspendedLanes,l=e.pingedLanes,o=r&268435455;if(o!==0){var s=o&~a;s!==0?n=Fr(s):(l&=o,l!==0&&(n=Fr(l)))}else o=r&~a,o!==0?n=Fr(o):l!==0&&(n=Fr(l));if(n===0)return 0;if(t!==0&&t!==n&&!(t&a)&&(a=n&-n,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-Ye(t),a=1<<r,n|=e[r],t&=~a;return n}function tf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rf(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-Ye(l),s=1<<o,c=a[o];c===-1?(!(s&r)||s&n)&&(a[o]=tf(s,t)):c<=t&&(e.expiredLanes|=s),l&=~s}}function Il(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function xc(){var e=En;return En<<=1,!(En&4194240)&&(En=64),e}function Xa(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function gn(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ye(t),e[t]=r}function nf(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-Ye(r),l=1<<a;t[a]=0,n[a]=-1,e[a]=-1,r&=~l}}function bi(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-Ye(r),a=1<<n;a&t|e[n]&t&&(e[n]|=t),r&=~a}}var H=0;function wc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var kc,Ci,_c,jc,Nc,Fl=!1,Cn=[],wt=null,kt=null,_t=null,qr=new Map,en=new Map,vt=[],af="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Co(e,t){switch(e){case"focusin":case"focusout":wt=null;break;case"dragenter":case"dragleave":kt=null;break;case"mouseover":case"mouseout":_t=null;break;case"pointerover":case"pointerout":qr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":en.delete(t.pointerId)}}function zr(e,t,r,n,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:l,targetContainers:[a]},t!==null&&(t=xn(t),t!==null&&Ci(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function lf(e,t,r,n,a){switch(t){case"focusin":return wt=zr(wt,e,t,r,n,a),!0;case"dragenter":return kt=zr(kt,e,t,r,n,a),!0;case"mouseover":return _t=zr(_t,e,t,r,n,a),!0;case"pointerover":var l=a.pointerId;return qr.set(l,zr(qr.get(l)||null,e,t,r,n,a)),!0;case"gotpointercapture":return l=a.pointerId,en.set(l,zr(en.get(l)||null,e,t,r,n,a)),!0}return!1}function Sc(e){var t=Ot(e.target);if(t!==null){var r=Yt(t);if(r!==null){if(t=r.tag,t===13){if(t=pc(r),t!==null){e.blockedOn=t,Nc(e.priority,function(){_c(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Bn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=$l(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Dl=n,r.target.dispatchEvent(n),Dl=null}else return t=xn(r),t!==null&&Ci(t),e.blockedOn=r,!1;t.shift()}return!0}function zo(e,t,r){Bn(e)&&r.delete(t)}function of(){Fl=!1,wt!==null&&Bn(wt)&&(wt=null),kt!==null&&Bn(kt)&&(kt=null),_t!==null&&Bn(_t)&&(_t=null),qr.forEach(zo),en.forEach(zo)}function Pr(e,t){e.blockedOn===t&&(e.blockedOn=null,Fl||(Fl=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,of)))}function tn(e){function t(a){return Pr(a,e)}if(0<Cn.length){Pr(Cn[0],e);for(var r=1;r<Cn.length;r++){var n=Cn[r];n.blockedOn===e&&(n.blockedOn=null)}}for(wt!==null&&Pr(wt,e),kt!==null&&Pr(kt,e),_t!==null&&Pr(_t,e),qr.forEach(t),en.forEach(t),r=0;r<vt.length;r++)n=vt[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<vt.length&&(r=vt[0],r.blockedOn===null);)Sc(r),r.blockedOn===null&&vt.shift()}var fr=dt.ReactCurrentBatchConfig,aa=!0;function sf(e,t,r,n){var a=H,l=fr.transition;fr.transition=null;try{H=1,zi(e,t,r,n)}finally{H=a,fr.transition=l}}function cf(e,t,r,n){var a=H,l=fr.transition;fr.transition=null;try{H=4,zi(e,t,r,n)}finally{H=a,fr.transition=l}}function zi(e,t,r,n){if(aa){var a=$l(e,t,r,n);if(a===null)al(e,t,n,la,r),Co(e,n);else if(lf(a,e,t,r,n))n.stopPropagation();else if(Co(e,n),t&4&&-1<af.indexOf(e)){for(;a!==null;){var l=xn(a);if(l!==null&&kc(l),l=$l(e,t,r,n),l===null&&al(e,t,n,la,r),l===a)break;a=l}a!==null&&n.stopPropagation()}else al(e,t,n,null,r)}}var la=null;function $l(e,t,r,n){if(la=null,e=Si(n),e=Ot(e),e!==null)if(t=Yt(e),t===null)e=null;else if(r=t.tag,r===13){if(e=pc(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return la=e,null}function Ec(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kd()){case Ei:return 1;case gc:return 4;case ra:case Gd:return 16;case yc:return 536870912;default:return 16}default:return 16}}var gt=null,Pi=null,Vn=null;function bc(){if(Vn)return Vn;var e,t=Pi,r=t.length,n,a="value"in gt?gt.value:gt.textContent,l=a.length;for(e=0;e<r&&t[e]===a[e];e++);var o=r-e;for(n=1;n<=o&&t[r-n]===a[l-n];n++);return Vn=a.slice(e,1<n?1-n:void 0)}function Wn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zn(){return!0}function Po(){return!1}function Me(e){function t(r,n,a,l,o){this._reactName=r,this._targetInst=a,this.type=n,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(r=e[s],this[s]=r?r(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?zn:Po,this.isPropagationStopped=Po,this}return ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=zn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=zn)},persist:function(){},isPersistent:zn}),t}var Nr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Li=Me(Nr),yn=ee({},Nr,{view:0,detail:0}),uf=Me(yn),Ka,Ga,Lr,Sa=ee({},yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ti,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Lr&&(Lr&&e.type==="mousemove"?(Ka=e.screenX-Lr.screenX,Ga=e.screenY-Lr.screenY):Ga=Ka=0,Lr=e),Ka)},movementY:function(e){return"movementY"in e?e.movementY:Ga}}),Lo=Me(Sa),df=ee({},Sa,{dataTransfer:0}),ff=Me(df),pf=ee({},yn,{relatedTarget:0}),Ja=Me(pf),mf=ee({},Nr,{animationName:0,elapsedTime:0,pseudoElement:0}),vf=Me(mf),hf=ee({},Nr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gf=Me(hf),yf=ee({},Nr,{data:0}),To=Me(yf),xf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _f(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=kf[e])?!!t[e]:!1}function Ti(){return _f}var jf=ee({},yn,{key:function(e){if(e.key){var t=xf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?wf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ti,charCode:function(e){return e.type==="keypress"?Wn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Nf=Me(jf),Sf=ee({},Sa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Do=Me(Sf),Ef=ee({},yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ti}),bf=Me(Ef),Cf=ee({},Nr,{propertyName:0,elapsedTime:0,pseudoElement:0}),zf=Me(Cf),Pf=ee({},Sa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lf=Me(Pf),Tf=[9,13,27,32],Di=ot&&"CompositionEvent"in window,Br=null;ot&&"documentMode"in document&&(Br=document.documentMode);var Df=ot&&"TextEvent"in window&&!Br,Cc=ot&&(!Di||Br&&8<Br&&11>=Br),Ro=" ",Oo=!1;function zc(e,t){switch(e){case"keyup":return Tf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qt=!1;function Rf(e,t){switch(e){case"compositionend":return Pc(t);case"keypress":return t.which!==32?null:(Oo=!0,Ro);case"textInput":return e=t.data,e===Ro&&Oo?null:e;default:return null}}function Of(e,t){if(qt)return e==="compositionend"||!Di&&zc(e,t)?(e=bc(),Vn=Pi=gt=null,qt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cc&&t.locale!=="ko"?null:t.data;default:return null}}var Mf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Mf[e.type]:t==="textarea"}function Lc(e,t,r,n){sc(n),t=ia(t,"onChange"),0<t.length&&(r=new Li("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Vr=null,rn=null;function If(e){Bc(e,0)}function Ea(e){var t=rr(e);if(tc(t))return e}function Ff(e,t){if(e==="change")return t}var Tc=!1;if(ot){var Za;if(ot){var qa="oninput"in document;if(!qa){var Io=document.createElement("div");Io.setAttribute("oninput","return;"),qa=typeof Io.oninput=="function"}Za=qa}else Za=!1;Tc=Za&&(!document.documentMode||9<document.documentMode)}function Fo(){Vr&&(Vr.detachEvent("onpropertychange",Dc),rn=Vr=null)}function Dc(e){if(e.propertyName==="value"&&Ea(rn)){var t=[];Lc(t,rn,e,Si(e)),fc(If,t)}}function $f(e,t,r){e==="focusin"?(Fo(),Vr=t,rn=r,Vr.attachEvent("onpropertychange",Dc)):e==="focusout"&&Fo()}function Af(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ea(rn)}function Uf(e,t){if(e==="click")return Ea(t)}function Bf(e,t){if(e==="input"||e==="change")return Ea(t)}function Vf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ke=typeof Object.is=="function"?Object.is:Vf;function nn(e,t){if(Ke(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var a=r[n];if(!kl.call(t,a)||!Ke(e[a],t[a]))return!1}return!0}function $o(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ao(e,t){var r=$o(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=$o(r)}}function Rc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Rc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Oc(){for(var e=window,t=qn();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=qn(e.document)}return t}function Ri(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Wf(e){var t=Oc(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Rc(r.ownerDocument.documentElement,r)){if(n!==null&&Ri(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,l=Math.min(n.start,a);n=n.end===void 0?l:Math.min(n.end,a),!e.extend&&l>n&&(a=n,n=l,l=a),a=Ao(r,l);var o=Ao(r,n);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>n?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Hf=ot&&"documentMode"in document&&11>=document.documentMode,er=null,Al=null,Wr=null,Ul=!1;function Uo(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Ul||er==null||er!==qn(n)||(n=er,"selectionStart"in n&&Ri(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Wr&&nn(Wr,n)||(Wr=n,n=ia(Al,"onSelect"),0<n.length&&(t=new Li("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=er)))}function Pn(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var tr={animationend:Pn("Animation","AnimationEnd"),animationiteration:Pn("Animation","AnimationIteration"),animationstart:Pn("Animation","AnimationStart"),transitionend:Pn("Transition","TransitionEnd")},el={},Mc={};ot&&(Mc=document.createElement("div").style,"AnimationEvent"in window||(delete tr.animationend.animation,delete tr.animationiteration.animation,delete tr.animationstart.animation),"TransitionEvent"in window||delete tr.transitionend.transition);function ba(e){if(el[e])return el[e];if(!tr[e])return e;var t=tr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Mc)return el[e]=t[r];return e}var Ic=ba("animationend"),Fc=ba("animationiteration"),$c=ba("animationstart"),Ac=ba("transitionend"),Uc=new Map,Bo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pt(e,t){Uc.set(e,t),Qt(t,[e])}for(var tl=0;tl<Bo.length;tl++){var rl=Bo[tl],Qf=rl.toLowerCase(),Yf=rl[0].toUpperCase()+rl.slice(1);Pt(Qf,"on"+Yf)}Pt(Ic,"onAnimationEnd");Pt(Fc,"onAnimationIteration");Pt($c,"onAnimationStart");Pt("dblclick","onDoubleClick");Pt("focusin","onFocus");Pt("focusout","onBlur");Pt(Ac,"onTransitionEnd");vr("onMouseEnter",["mouseout","mouseover"]);vr("onMouseLeave",["mouseout","mouseover"]);vr("onPointerEnter",["pointerout","pointerover"]);vr("onPointerLeave",["pointerout","pointerover"]);Qt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $r="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xf=new Set("cancel close invalid load scroll toggle".split(" ").concat($r));function Vo(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,Hd(n,t,void 0,e),e.currentTarget=null}function Bc(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],a=n.event;n=n.listeners;e:{var l=void 0;if(t)for(var o=n.length-1;0<=o;o--){var s=n[o],c=s.instance,u=s.currentTarget;if(s=s.listener,c!==l&&a.isPropagationStopped())break e;Vo(a,s,u),l=c}else for(o=0;o<n.length;o++){if(s=n[o],c=s.instance,u=s.currentTarget,s=s.listener,c!==l&&a.isPropagationStopped())break e;Vo(a,s,u),l=c}}}if(ta)throw e=Ml,ta=!1,Ml=null,e}function X(e,t){var r=t[Ql];r===void 0&&(r=t[Ql]=new Set);var n=e+"__bubble";r.has(n)||(Vc(t,e,2,!1),r.add(n))}function nl(e,t,r){var n=0;t&&(n|=4),Vc(r,e,n,t)}var Ln="_reactListening"+Math.random().toString(36).slice(2);function an(e){if(!e[Ln]){e[Ln]=!0,Gs.forEach(function(r){r!=="selectionchange"&&(Xf.has(r)||nl(r,!1,e),nl(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ln]||(t[Ln]=!0,nl("selectionchange",!1,t))}}function Vc(e,t,r,n){switch(Ec(t)){case 1:var a=sf;break;case 4:a=cf;break;default:a=zi}r=a.bind(null,t,r,e),a=void 0,!Ol||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),n?a!==void 0?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):a!==void 0?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function al(e,t,r,n,a){var l=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var s=n.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(o===4)for(o=n.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;o=o.return}for(;s!==null;){if(o=Ot(s),o===null)return;if(c=o.tag,c===5||c===6){n=l=o;continue e}s=s.parentNode}}n=n.return}fc(function(){var u=l,v=Si(r),m=[];e:{var h=Uc.get(e);if(h!==void 0){var y=Li,x=e;switch(e){case"keypress":if(Wn(r)===0)break e;case"keydown":case"keyup":y=Nf;break;case"focusin":x="focus",y=Ja;break;case"focusout":x="blur",y=Ja;break;case"beforeblur":case"afterblur":y=Ja;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Lo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ff;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=bf;break;case Ic:case Fc:case $c:y=vf;break;case Ac:y=zf;break;case"scroll":y=uf;break;case"wheel":y=Lf;break;case"copy":case"cut":case"paste":y=gf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Do}var w=(t&4)!==0,_=!w&&e==="scroll",f=w?h!==null?h+"Capture":null:h;w=[];for(var d=u,p;d!==null;){p=d;var k=p.stateNode;if(p.tag===5&&k!==null&&(p=k,f!==null&&(k=Zr(d,f),k!=null&&w.push(ln(d,k,p)))),_)break;d=d.return}0<w.length&&(h=new y(h,x,null,r,v),m.push({event:h,listeners:w}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",h&&r!==Dl&&(x=r.relatedTarget||r.fromElement)&&(Ot(x)||x[st]))break e;if((y||h)&&(h=v.window===v?v:(h=v.ownerDocument)?h.defaultView||h.parentWindow:window,y?(x=r.relatedTarget||r.toElement,y=u,x=x?Ot(x):null,x!==null&&(_=Yt(x),x!==_||x.tag!==5&&x.tag!==6)&&(x=null)):(y=null,x=u),y!==x)){if(w=Lo,k="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(w=Do,k="onPointerLeave",f="onPointerEnter",d="pointer"),_=y==null?h:rr(y),p=x==null?h:rr(x),h=new w(k,d+"leave",y,r,v),h.target=_,h.relatedTarget=p,k=null,Ot(v)===u&&(w=new w(f,d+"enter",x,r,v),w.target=p,w.relatedTarget=_,k=w),_=k,y&&x)t:{for(w=y,f=x,d=0,p=w;p;p=Kt(p))d++;for(p=0,k=f;k;k=Kt(k))p++;for(;0<d-p;)w=Kt(w),d--;for(;0<p-d;)f=Kt(f),p--;for(;d--;){if(w===f||f!==null&&w===f.alternate)break t;w=Kt(w),f=Kt(f)}w=null}else w=null;y!==null&&Wo(m,h,y,w,!1),x!==null&&_!==null&&Wo(m,_,x,w,!0)}}e:{if(h=u?rr(u):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var S=Ff;else if(Mo(h))if(Tc)S=Bf;else{S=Af;var z=$f}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(S=Uf);if(S&&(S=S(e,u))){Lc(m,S,r,v);break e}z&&z(e,h,u),e==="focusout"&&(z=h._wrapperState)&&z.controlled&&h.type==="number"&&Cl(h,"number",h.value)}switch(z=u?rr(u):window,e){case"focusin":(Mo(z)||z.contentEditable==="true")&&(er=z,Al=u,Wr=null);break;case"focusout":Wr=Al=er=null;break;case"mousedown":Ul=!0;break;case"contextmenu":case"mouseup":case"dragend":Ul=!1,Uo(m,r,v);break;case"selectionchange":if(Hf)break;case"keydown":case"keyup":Uo(m,r,v)}var P;if(Di)e:{switch(e){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else qt?zc(e,r)&&(L="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(L="onCompositionStart");L&&(Cc&&r.locale!=="ko"&&(qt||L!=="onCompositionStart"?L==="onCompositionEnd"&&qt&&(P=bc()):(gt=v,Pi="value"in gt?gt.value:gt.textContent,qt=!0)),z=ia(u,L),0<z.length&&(L=new To(L,e,null,r,v),m.push({event:L,listeners:z}),P?L.data=P:(P=Pc(r),P!==null&&(L.data=P)))),(P=Df?Rf(e,r):Of(e,r))&&(u=ia(u,"onBeforeInput"),0<u.length&&(v=new To("onBeforeInput","beforeinput",null,r,v),m.push({event:v,listeners:u}),v.data=P))}Bc(m,t)})}function ln(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ia(e,t){for(var r=t+"Capture",n=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=Zr(e,r),l!=null&&n.unshift(ln(e,l,a)),l=Zr(e,t),l!=null&&n.push(ln(e,l,a))),e=e.return}return n}function Kt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Wo(e,t,r,n,a){for(var l=t._reactName,o=[];r!==null&&r!==n;){var s=r,c=s.alternate,u=s.stateNode;if(c!==null&&c===n)break;s.tag===5&&u!==null&&(s=u,a?(c=Zr(r,l),c!=null&&o.unshift(ln(r,c,s))):a||(c=Zr(r,l),c!=null&&o.push(ln(r,c,s)))),r=r.return}o.length!==0&&e.push({event:t,listeners:o})}var Kf=/\r\n?/g,Gf=/\u0000|\uFFFD/g;function Ho(e){return(typeof e=="string"?e:""+e).replace(Kf,`
`).replace(Gf,"")}function Tn(e,t,r){if(t=Ho(t),Ho(e)!==t&&r)throw Error(N(425))}function oa(){}var Bl=null,Vl=null;function Wl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hl=typeof setTimeout=="function"?setTimeout:void 0,Jf=typeof clearTimeout=="function"?clearTimeout:void 0,Qo=typeof Promise=="function"?Promise:void 0,Zf=typeof queueMicrotask=="function"?queueMicrotask:typeof Qo<"u"?function(e){return Qo.resolve(null).then(e).catch(qf)}:Hl;function qf(e){setTimeout(function(){throw e})}function ll(e,t){var r=t,n=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(n===0){e.removeChild(a),tn(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=a}while(r);tn(t)}function jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Sr=Math.random().toString(36).slice(2),Ze="__reactFiber$"+Sr,on="__reactProps$"+Sr,st="__reactContainer$"+Sr,Ql="__reactEvents$"+Sr,ep="__reactListeners$"+Sr,tp="__reactHandles$"+Sr;function Ot(e){var t=e[Ze];if(t)return t;for(var r=e.parentNode;r;){if(t=r[st]||r[Ze]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Yo(e);e!==null;){if(r=e[Ze])return r;e=Yo(e)}return t}e=r,r=e.parentNode}return null}function xn(e){return e=e[Ze]||e[st],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function rr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function Ca(e){return e[on]||null}var Yl=[],nr=-1;function Lt(e){return{current:e}}function K(e){0>nr||(e.current=Yl[nr],Yl[nr]=null,nr--)}function Y(e,t){nr++,Yl[nr]=e.current,e.current=t}var zt={},ye=Lt(zt),Ee=Lt(!1),Ut=zt;function hr(e,t){var r=e.type.contextTypes;if(!r)return zt;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in r)a[l]=t[l];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function be(e){return e=e.childContextTypes,e!=null}function sa(){K(Ee),K(ye)}function Xo(e,t,r){if(ye.current!==zt)throw Error(N(168));Y(ye,t),Y(Ee,r)}function Wc(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var a in n)if(!(a in t))throw Error(N(108,Fd(e)||"Unknown",a));return ee({},r,n)}function ca(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||zt,Ut=ye.current,Y(ye,e),Y(Ee,Ee.current),!0}function Ko(e,t,r){var n=e.stateNode;if(!n)throw Error(N(169));r?(e=Wc(e,t,Ut),n.__reactInternalMemoizedMergedChildContext=e,K(Ee),K(ye),Y(ye,e)):K(Ee),Y(Ee,r)}var nt=null,za=!1,il=!1;function Hc(e){nt===null?nt=[e]:nt.push(e)}function rp(e){za=!0,Hc(e)}function Tt(){if(!il&&nt!==null){il=!0;var e=0,t=H;try{var r=nt;for(H=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}nt=null,za=!1}catch(a){throw nt!==null&&(nt=nt.slice(e+1)),hc(Ei,Tt),a}finally{H=t,il=!1}}return null}var ar=[],lr=0,ua=null,da=0,Ie=[],Fe=0,Bt=null,at=1,lt="";function Dt(e,t){ar[lr++]=da,ar[lr++]=ua,ua=e,da=t}function Qc(e,t,r){Ie[Fe++]=at,Ie[Fe++]=lt,Ie[Fe++]=Bt,Bt=e;var n=at;e=lt;var a=32-Ye(n)-1;n&=~(1<<a),r+=1;var l=32-Ye(t)+a;if(30<l){var o=a-a%5;l=(n&(1<<o)-1).toString(32),n>>=o,a-=o,at=1<<32-Ye(t)+a|r<<a|n,lt=l+e}else at=1<<l|r<<a|n,lt=e}function Oi(e){e.return!==null&&(Dt(e,1),Qc(e,1,0))}function Mi(e){for(;e===ua;)ua=ar[--lr],ar[lr]=null,da=ar[--lr],ar[lr]=null;for(;e===Bt;)Bt=Ie[--Fe],Ie[Fe]=null,lt=Ie[--Fe],Ie[Fe]=null,at=Ie[--Fe],Ie[Fe]=null}var De=null,Te=null,G=!1,Qe=null;function Yc(e,t){var r=$e(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Go(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,Te=jt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Bt!==null?{id:at,overflow:lt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=$e(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,De=e,Te=null,!0):!1;default:return!1}}function Xl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Kl(e){if(G){var t=Te;if(t){var r=t;if(!Go(e,t)){if(Xl(e))throw Error(N(418));t=jt(r.nextSibling);var n=De;t&&Go(e,t)?Yc(n,r):(e.flags=e.flags&-4097|2,G=!1,De=e)}}else{if(Xl(e))throw Error(N(418));e.flags=e.flags&-4097|2,G=!1,De=e}}}function Jo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Dn(e){if(e!==De)return!1;if(!G)return Jo(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Wl(e.type,e.memoizedProps)),t&&(t=Te)){if(Xl(e))throw Xc(),Error(N(418));for(;t;)Yc(e,t),t=jt(t.nextSibling)}if(Jo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Te=jt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=De?jt(e.stateNode.nextSibling):null;return!0}function Xc(){for(var e=Te;e;)e=jt(e.nextSibling)}function gr(){Te=De=null,G=!1}function Ii(e){Qe===null?Qe=[e]:Qe.push(e)}var np=dt.ReactCurrentBatchConfig;function Tr(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(N(309));var n=r.stateNode}if(!n)throw Error(N(147,e));var a=n,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var s=a.refs;o===null?delete s[l]:s[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(N(284));if(!r._owner)throw Error(N(290,e))}return e}function Rn(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Zo(e){var t=e._init;return t(e._payload)}function Kc(e){function t(f,d){if(e){var p=f.deletions;p===null?(f.deletions=[d],f.flags|=16):p.push(d)}}function r(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function n(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function a(f,d){return f=bt(f,d),f.index=0,f.sibling=null,f}function l(f,d,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<d?(f.flags|=2,d):p):(f.flags|=2,d)):(f.flags|=1048576,d)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,d,p,k){return d===null||d.tag!==6?(d=pl(p,f.mode,k),d.return=f,d):(d=a(d,p),d.return=f,d)}function c(f,d,p,k){var S=p.type;return S===Zt?v(f,d,p.props.children,k,p.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pt&&Zo(S)===d.type)?(k=a(d,p.props),k.ref=Tr(f,d,p),k.return=f,k):(k=Jn(p.type,p.key,p.props,null,f.mode,k),k.ref=Tr(f,d,p),k.return=f,k)}function u(f,d,p,k){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=ml(p,f.mode,k),d.return=f,d):(d=a(d,p.children||[]),d.return=f,d)}function v(f,d,p,k,S){return d===null||d.tag!==7?(d=$t(p,f.mode,k,S),d.return=f,d):(d=a(d,p),d.return=f,d)}function m(f,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=pl(""+d,f.mode,p),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case jn:return p=Jn(d.type,d.key,d.props,null,f.mode,p),p.ref=Tr(f,null,d),p.return=f,p;case Jt:return d=ml(d,f.mode,p),d.return=f,d;case pt:var k=d._init;return m(f,k(d._payload),p)}if(Ir(d)||br(d))return d=$t(d,f.mode,p,null),d.return=f,d;Rn(f,d)}return null}function h(f,d,p,k){var S=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(f,d,""+p,k);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case jn:return p.key===S?c(f,d,p,k):null;case Jt:return p.key===S?u(f,d,p,k):null;case pt:return S=p._init,h(f,d,S(p._payload),k)}if(Ir(p)||br(p))return S!==null?null:v(f,d,p,k,null);Rn(f,p)}return null}function y(f,d,p,k,S){if(typeof k=="string"&&k!==""||typeof k=="number")return f=f.get(p)||null,s(d,f,""+k,S);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case jn:return f=f.get(k.key===null?p:k.key)||null,c(d,f,k,S);case Jt:return f=f.get(k.key===null?p:k.key)||null,u(d,f,k,S);case pt:var z=k._init;return y(f,d,p,z(k._payload),S)}if(Ir(k)||br(k))return f=f.get(p)||null,v(d,f,k,S,null);Rn(d,k)}return null}function x(f,d,p,k){for(var S=null,z=null,P=d,L=d=0,U=null;P!==null&&L<p.length;L++){P.index>L?(U=P,P=null):U=P.sibling;var M=h(f,P,p[L],k);if(M===null){P===null&&(P=U);break}e&&P&&M.alternate===null&&t(f,P),d=l(M,d,L),z===null?S=M:z.sibling=M,z=M,P=U}if(L===p.length)return r(f,P),G&&Dt(f,L),S;if(P===null){for(;L<p.length;L++)P=m(f,p[L],k),P!==null&&(d=l(P,d,L),z===null?S=P:z.sibling=P,z=P);return G&&Dt(f,L),S}for(P=n(f,P);L<p.length;L++)U=y(P,f,L,p[L],k),U!==null&&(e&&U.alternate!==null&&P.delete(U.key===null?L:U.key),d=l(U,d,L),z===null?S=U:z.sibling=U,z=U);return e&&P.forEach(function(re){return t(f,re)}),G&&Dt(f,L),S}function w(f,d,p,k){var S=br(p);if(typeof S!="function")throw Error(N(150));if(p=S.call(p),p==null)throw Error(N(151));for(var z=S=null,P=d,L=d=0,U=null,M=p.next();P!==null&&!M.done;L++,M=p.next()){P.index>L?(U=P,P=null):U=P.sibling;var re=h(f,P,M.value,k);if(re===null){P===null&&(P=U);break}e&&P&&re.alternate===null&&t(f,P),d=l(re,d,L),z===null?S=re:z.sibling=re,z=re,P=U}if(M.done)return r(f,P),G&&Dt(f,L),S;if(P===null){for(;!M.done;L++,M=p.next())M=m(f,M.value,k),M!==null&&(d=l(M,d,L),z===null?S=M:z.sibling=M,z=M);return G&&Dt(f,L),S}for(P=n(f,P);!M.done;L++,M=p.next())M=y(P,f,L,M.value,k),M!==null&&(e&&M.alternate!==null&&P.delete(M.key===null?L:M.key),d=l(M,d,L),z===null?S=M:z.sibling=M,z=M);return e&&P.forEach(function(ze){return t(f,ze)}),G&&Dt(f,L),S}function _(f,d,p,k){if(typeof p=="object"&&p!==null&&p.type===Zt&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case jn:e:{for(var S=p.key,z=d;z!==null;){if(z.key===S){if(S=p.type,S===Zt){if(z.tag===7){r(f,z.sibling),d=a(z,p.props.children),d.return=f,f=d;break e}}else if(z.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===pt&&Zo(S)===z.type){r(f,z.sibling),d=a(z,p.props),d.ref=Tr(f,z,p),d.return=f,f=d;break e}r(f,z);break}else t(f,z);z=z.sibling}p.type===Zt?(d=$t(p.props.children,f.mode,k,p.key),d.return=f,f=d):(k=Jn(p.type,p.key,p.props,null,f.mode,k),k.ref=Tr(f,d,p),k.return=f,f=k)}return o(f);case Jt:e:{for(z=p.key;d!==null;){if(d.key===z)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){r(f,d.sibling),d=a(d,p.children||[]),d.return=f,f=d;break e}else{r(f,d);break}else t(f,d);d=d.sibling}d=ml(p,f.mode,k),d.return=f,f=d}return o(f);case pt:return z=p._init,_(f,d,z(p._payload),k)}if(Ir(p))return x(f,d,p,k);if(br(p))return w(f,d,p,k);Rn(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(r(f,d.sibling),d=a(d,p),d.return=f,f=d):(r(f,d),d=pl(p,f.mode,k),d.return=f,f=d),o(f)):r(f,d)}return _}var yr=Kc(!0),Gc=Kc(!1),fa=Lt(null),pa=null,ir=null,Fi=null;function $i(){Fi=ir=pa=null}function Ai(e){var t=fa.current;K(fa),e._currentValue=t}function Gl(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function pr(e,t){pa=e,Fi=ir=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Se=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(Fi!==e)if(e={context:e,memoizedValue:t,next:null},ir===null){if(pa===null)throw Error(N(308));ir=e,pa.dependencies={lanes:0,firstContext:e}}else ir=ir.next=e;return t}var Mt=null;function Ui(e){Mt===null?Mt=[e]:Mt.push(e)}function Jc(e,t,r,n){var a=t.interleaved;return a===null?(r.next=r,Ui(t)):(r.next=a.next,a.next=r),t.interleaved=r,ct(e,n)}function ct(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var mt=!1;function Bi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Zc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function it(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Nt(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,V&2){var a=n.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),n.pending=t,ct(e,r)}return a=n.interleaved,a===null?(t.next=t,Ui(n)):(t.next=a.next,a.next=t),n.interleaved=t,ct(e,r)}function Hn(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,bi(e,r)}}function qo(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var a=null,l=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};l===null?a=l=o:l=l.next=o,r=r.next}while(r!==null);l===null?a=l=t:l=l.next=t}else a=l=t;r={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function ma(e,t,r,n){var a=e.updateQueue;mt=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var c=s,u=c.next;c.next=null,o===null?l=u:o.next=u,o=c;var v=e.alternate;v!==null&&(v=v.updateQueue,s=v.lastBaseUpdate,s!==o&&(s===null?v.firstBaseUpdate=u:s.next=u,v.lastBaseUpdate=c))}if(l!==null){var m=a.baseState;o=0,v=u=c=null,s=l;do{var h=s.lane,y=s.eventTime;if((n&h)===h){v!==null&&(v=v.next={eventTime:y,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var x=e,w=s;switch(h=t,y=r,w.tag){case 1:if(x=w.payload,typeof x=="function"){m=x.call(y,m,h);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=w.payload,h=typeof x=="function"?x.call(y,m,h):x,h==null)break e;m=ee({},m,h);break e;case 2:mt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=a.effects,h===null?a.effects=[s]:h.push(s))}else y={eventTime:y,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},v===null?(u=v=y,c=m):v=v.next=y,o|=h;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;h=s,s=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);if(v===null&&(c=m),a.baseState=c,a.firstBaseUpdate=u,a.lastBaseUpdate=v,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);Wt|=o,e.lanes=o,e.memoizedState=m}}function es(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],a=n.callback;if(a!==null){if(n.callback=null,n=r,typeof a!="function")throw Error(N(191,a));a.call(n)}}}var wn={},et=Lt(wn),sn=Lt(wn),cn=Lt(wn);function It(e){if(e===wn)throw Error(N(174));return e}function Vi(e,t){switch(Y(cn,t),Y(sn,e),Y(et,wn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Pl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Pl(t,e)}K(et),Y(et,t)}function xr(){K(et),K(sn),K(cn)}function qc(e){It(cn.current);var t=It(et.current),r=Pl(t,e.type);t!==r&&(Y(sn,e),Y(et,r))}function Wi(e){sn.current===e&&(K(et),K(sn))}var Z=Lt(0);function va(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ol=[];function Hi(){for(var e=0;e<ol.length;e++)ol[e]._workInProgressVersionPrimary=null;ol.length=0}var Qn=dt.ReactCurrentDispatcher,sl=dt.ReactCurrentBatchConfig,Vt=0,q=null,oe=null,ue=null,ha=!1,Hr=!1,un=0,ap=0;function ve(){throw Error(N(321))}function Qi(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ke(e[r],t[r]))return!1;return!0}function Yi(e,t,r,n,a,l){if(Vt=l,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qn.current=e===null||e.memoizedState===null?sp:cp,e=r(n,a),Hr){l=0;do{if(Hr=!1,un=0,25<=l)throw Error(N(301));l+=1,ue=oe=null,t.updateQueue=null,Qn.current=up,e=r(n,a)}while(Hr)}if(Qn.current=ga,t=oe!==null&&oe.next!==null,Vt=0,ue=oe=q=null,ha=!1,t)throw Error(N(300));return e}function Xi(){var e=un!==0;return un=0,e}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?q.memoizedState=ue=e:ue=ue.next=e,ue}function Be(){if(oe===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=oe.next;var t=ue===null?q.memoizedState:ue.next;if(t!==null)ue=t,oe=e;else{if(e===null)throw Error(N(310));oe=e,e={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},ue===null?q.memoizedState=ue=e:ue=ue.next=e}return ue}function dn(e,t){return typeof t=="function"?t(e):t}function cl(e){var t=Be(),r=t.queue;if(r===null)throw Error(N(311));r.lastRenderedReducer=e;var n=oe,a=n.baseQueue,l=r.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}n.baseQueue=a=l,r.pending=null}if(a!==null){l=a.next,n=n.baseState;var s=o=null,c=null,u=l;do{var v=u.lane;if((Vt&v)===v)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:e(n,u.action);else{var m={lane:v,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(s=c=m,o=n):c=c.next=m,q.lanes|=v,Wt|=v}u=u.next}while(u!==null&&u!==l);c===null?o=n:c.next=s,Ke(n,t.memoizedState)||(Se=!0),t.memoizedState=n,t.baseState=o,t.baseQueue=c,r.lastRenderedState=n}if(e=r.interleaved,e!==null){a=e;do l=a.lane,q.lanes|=l,Wt|=l,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function ul(e){var t=Be(),r=t.queue;if(r===null)throw Error(N(311));r.lastRenderedReducer=e;var n=r.dispatch,a=r.pending,l=t.memoizedState;if(a!==null){r.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);Ke(l,t.memoizedState)||(Se=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),r.lastRenderedState=l}return[l,n]}function eu(){}function tu(e,t){var r=q,n=Be(),a=t(),l=!Ke(n.memoizedState,a);if(l&&(n.memoizedState=a,Se=!0),n=n.queue,Ki(au.bind(null,r,n,e),[e]),n.getSnapshot!==t||l||ue!==null&&ue.memoizedState.tag&1){if(r.flags|=2048,fn(9,nu.bind(null,r,n,a,t),void 0,null),de===null)throw Error(N(349));Vt&30||ru(r,t,a)}return a}function ru(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function nu(e,t,r,n){t.value=r,t.getSnapshot=n,lu(t)&&iu(e)}function au(e,t,r){return r(function(){lu(t)&&iu(e)})}function lu(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ke(e,r)}catch{return!0}}function iu(e){var t=ct(e,1);t!==null&&Xe(t,e,1,-1)}function ts(e){var t=Je();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:dn,lastRenderedState:e},t.queue=e,e=e.dispatch=op.bind(null,q,e),[t.memoizedState,e]}function fn(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function ou(){return Be().memoizedState}function Yn(e,t,r,n){var a=Je();q.flags|=e,a.memoizedState=fn(1|t,r,void 0,n===void 0?null:n)}function Pa(e,t,r,n){var a=Be();n=n===void 0?null:n;var l=void 0;if(oe!==null){var o=oe.memoizedState;if(l=o.destroy,n!==null&&Qi(n,o.deps)){a.memoizedState=fn(t,r,l,n);return}}q.flags|=e,a.memoizedState=fn(1|t,r,l,n)}function rs(e,t){return Yn(8390656,8,e,t)}function Ki(e,t){return Pa(2048,8,e,t)}function su(e,t){return Pa(4,2,e,t)}function cu(e,t){return Pa(4,4,e,t)}function uu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function du(e,t,r){return r=r!=null?r.concat([e]):null,Pa(4,4,uu.bind(null,t,e),r)}function Gi(){}function fu(e,t){var r=Be();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Qi(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function pu(e,t){var r=Be();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Qi(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function mu(e,t,r){return Vt&21?(Ke(r,t)||(r=xc(),q.lanes|=r,Wt|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=r)}function lp(e,t){var r=H;H=r!==0&&4>r?r:4,e(!0);var n=sl.transition;sl.transition={};try{e(!1),t()}finally{H=r,sl.transition=n}}function vu(){return Be().memoizedState}function ip(e,t,r){var n=Et(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},hu(e))gu(t,r);else if(r=Jc(e,t,r,n),r!==null){var a=we();Xe(r,e,n,a),yu(r,t,n)}}function op(e,t,r){var n=Et(e),a={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(hu(e))gu(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,s=l(o,r);if(a.hasEagerState=!0,a.eagerState=s,Ke(s,o)){var c=t.interleaved;c===null?(a.next=a,Ui(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}r=Jc(e,t,a,n),r!==null&&(a=we(),Xe(r,e,n,a),yu(r,t,n))}}function hu(e){var t=e.alternate;return e===q||t!==null&&t===q}function gu(e,t){Hr=ha=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function yu(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,bi(e,r)}}var ga={readContext:Ue,useCallback:ve,useContext:ve,useEffect:ve,useImperativeHandle:ve,useInsertionEffect:ve,useLayoutEffect:ve,useMemo:ve,useReducer:ve,useRef:ve,useState:ve,useDebugValue:ve,useDeferredValue:ve,useTransition:ve,useMutableSource:ve,useSyncExternalStore:ve,useId:ve,unstable_isNewReconciler:!1},sp={readContext:Ue,useCallback:function(e,t){return Je().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:rs,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Yn(4194308,4,uu.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Yn(4194308,4,e,t)},useInsertionEffect:function(e,t){return Yn(4,2,e,t)},useMemo:function(e,t){var r=Je();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=Je();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=ip.bind(null,q,e),[n.memoizedState,e]},useRef:function(e){var t=Je();return e={current:e},t.memoizedState=e},useState:ts,useDebugValue:Gi,useDeferredValue:function(e){return Je().memoizedState=e},useTransition:function(){var e=ts(!1),t=e[0];return e=lp.bind(null,e[1]),Je().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=q,a=Je();if(G){if(r===void 0)throw Error(N(407));r=r()}else{if(r=t(),de===null)throw Error(N(349));Vt&30||ru(n,t,r)}a.memoizedState=r;var l={value:r,getSnapshot:t};return a.queue=l,rs(au.bind(null,n,l,e),[e]),n.flags|=2048,fn(9,nu.bind(null,n,l,r,t),void 0,null),r},useId:function(){var e=Je(),t=de.identifierPrefix;if(G){var r=lt,n=at;r=(n&~(1<<32-Ye(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=un++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=ap++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},cp={readContext:Ue,useCallback:fu,useContext:Ue,useEffect:Ki,useImperativeHandle:du,useInsertionEffect:su,useLayoutEffect:cu,useMemo:pu,useReducer:cl,useRef:ou,useState:function(){return cl(dn)},useDebugValue:Gi,useDeferredValue:function(e){var t=Be();return mu(t,oe.memoizedState,e)},useTransition:function(){var e=cl(dn)[0],t=Be().memoizedState;return[e,t]},useMutableSource:eu,useSyncExternalStore:tu,useId:vu,unstable_isNewReconciler:!1},up={readContext:Ue,useCallback:fu,useContext:Ue,useEffect:Ki,useImperativeHandle:du,useInsertionEffect:su,useLayoutEffect:cu,useMemo:pu,useReducer:ul,useRef:ou,useState:function(){return ul(dn)},useDebugValue:Gi,useDeferredValue:function(e){var t=Be();return oe===null?t.memoizedState=e:mu(t,oe.memoizedState,e)},useTransition:function(){var e=ul(dn)[0],t=Be().memoizedState;return[e,t]},useMutableSource:eu,useSyncExternalStore:tu,useId:vu,unstable_isNewReconciler:!1};function We(e,t){if(e&&e.defaultProps){t=ee({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Jl(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:ee({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var La={isMounted:function(e){return(e=e._reactInternals)?Yt(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=we(),a=Et(e),l=it(n,a);l.payload=t,r!=null&&(l.callback=r),t=Nt(e,l,a),t!==null&&(Xe(t,e,a,n),Hn(t,e,a))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=we(),a=Et(e),l=it(n,a);l.tag=1,l.payload=t,r!=null&&(l.callback=r),t=Nt(e,l,a),t!==null&&(Xe(t,e,a,n),Hn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=we(),n=Et(e),a=it(r,n);a.tag=2,t!=null&&(a.callback=t),t=Nt(e,a,n),t!==null&&(Xe(t,e,n,r),Hn(t,e,n))}};function ns(e,t,r,n,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,l,o):t.prototype&&t.prototype.isPureReactComponent?!nn(r,n)||!nn(a,l):!0}function xu(e,t,r){var n=!1,a=zt,l=t.contextType;return typeof l=="object"&&l!==null?l=Ue(l):(a=be(t)?Ut:ye.current,n=t.contextTypes,l=(n=n!=null)?hr(e,a):zt),t=new t(r,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=La,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function as(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&La.enqueueReplaceState(t,t.state,null)}function Zl(e,t,r,n){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},Bi(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=Ue(l):(l=be(t)?Ut:ye.current,a.context=hr(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Jl(e,t,l,r),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&La.enqueueReplaceState(a,a.state,null),ma(e,r,a,n),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function wr(e,t){try{var r="",n=t;do r+=Id(n),n=n.return;while(n);var a=r}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function dl(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function ql(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var dp=typeof WeakMap=="function"?WeakMap:Map;function wu(e,t,r){r=it(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){xa||(xa=!0,ci=n),ql(e,t)},r}function ku(e,t,r){r=it(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var a=t.value;r.payload=function(){return n(a)},r.callback=function(){ql(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(r.callback=function(){ql(e,t),typeof n!="function"&&(St===null?St=new Set([this]):St.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),r}function ls(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new dp;var a=new Set;n.set(t,a)}else a=n.get(t),a===void 0&&(a=new Set,n.set(t,a));a.has(r)||(a.add(r),e=Sp.bind(null,e,t,r),t.then(e,e))}function is(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function os(e,t,r,n,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=it(-1,1),t.tag=2,Nt(r,t,1))),r.lanes|=1),e)}var fp=dt.ReactCurrentOwner,Se=!1;function xe(e,t,r,n){t.child=e===null?Gc(t,null,r,n):yr(t,e.child,r,n)}function ss(e,t,r,n,a){r=r.render;var l=t.ref;return pr(t,a),n=Yi(e,t,r,n,l,a),r=Xi(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,ut(e,t,a)):(G&&r&&Oi(t),t.flags|=1,xe(e,t,n,a),t.child)}function cs(e,t,r,n,a){if(e===null){var l=r.type;return typeof l=="function"&&!ao(l)&&l.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=l,_u(e,t,l,n,a)):(e=Jn(r.type,null,n,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&a)){var o=l.memoizedProps;if(r=r.compare,r=r!==null?r:nn,r(o,n)&&e.ref===t.ref)return ut(e,t,a)}return t.flags|=1,e=bt(l,n),e.ref=t.ref,e.return=t,t.child=e}function _u(e,t,r,n,a){if(e!==null){var l=e.memoizedProps;if(nn(l,n)&&e.ref===t.ref)if(Se=!1,t.pendingProps=n=l,(e.lanes&a)!==0)e.flags&131072&&(Se=!0);else return t.lanes=e.lanes,ut(e,t,a)}return ei(e,t,r,n,a)}function ju(e,t,r){var n=t.pendingProps,a=n.children,l=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Y(sr,Le),Le|=r;else{if(!(r&1073741824))return e=l!==null?l.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Y(sr,Le),Le|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=l!==null?l.baseLanes:r,Y(sr,Le),Le|=n}else l!==null?(n=l.baseLanes|r,t.memoizedState=null):n=r,Y(sr,Le),Le|=n;return xe(e,t,a,r),t.child}function Nu(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function ei(e,t,r,n,a){var l=be(r)?Ut:ye.current;return l=hr(t,l),pr(t,a),r=Yi(e,t,r,n,l,a),n=Xi(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,ut(e,t,a)):(G&&n&&Oi(t),t.flags|=1,xe(e,t,r,a),t.child)}function us(e,t,r,n,a){if(be(r)){var l=!0;ca(t)}else l=!1;if(pr(t,a),t.stateNode===null)Xn(e,t),xu(t,r,n),Zl(t,r,n,a),n=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,u=r.contextType;typeof u=="object"&&u!==null?u=Ue(u):(u=be(r)?Ut:ye.current,u=hr(t,u));var v=r.getDerivedStateFromProps,m=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==n||c!==u)&&as(t,o,n,u),mt=!1;var h=t.memoizedState;o.state=h,ma(t,n,o,a),c=t.memoizedState,s!==n||h!==c||Ee.current||mt?(typeof v=="function"&&(Jl(t,r,v,n),c=t.memoizedState),(s=mt||ns(t,r,s,n,h,c,u))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),o.props=n,o.state=c,o.context=u,n=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{o=t.stateNode,Zc(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:We(t.type,s),o.props=u,m=t.pendingProps,h=o.context,c=r.contextType,typeof c=="object"&&c!==null?c=Ue(c):(c=be(r)?Ut:ye.current,c=hr(t,c));var y=r.getDerivedStateFromProps;(v=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==m||h!==c)&&as(t,o,n,c),mt=!1,h=t.memoizedState,o.state=h,ma(t,n,o,a);var x=t.memoizedState;s!==m||h!==x||Ee.current||mt?(typeof y=="function"&&(Jl(t,r,y,n),x=t.memoizedState),(u=mt||ns(t,r,u,n,h,x,c)||!1)?(v||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,x,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,x,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=x),o.props=n,o.state=x,o.context=c,n=u):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),n=!1)}return ti(e,t,r,n,l,a)}function ti(e,t,r,n,a,l){Nu(e,t);var o=(t.flags&128)!==0;if(!n&&!o)return a&&Ko(t,r,!1),ut(e,t,l);n=t.stateNode,fp.current=t;var s=o&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&o?(t.child=yr(t,e.child,null,l),t.child=yr(t,null,s,l)):xe(e,t,s,l),t.memoizedState=n.state,a&&Ko(t,r,!0),t.child}function Su(e){var t=e.stateNode;t.pendingContext?Xo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Xo(e,t.context,!1),Vi(e,t.containerInfo)}function ds(e,t,r,n,a){return gr(),Ii(a),t.flags|=256,xe(e,t,r,n),t.child}var ri={dehydrated:null,treeContext:null,retryLane:0};function ni(e){return{baseLanes:e,cachePool:null,transitions:null}}function Eu(e,t,r){var n=t.pendingProps,a=Z.current,l=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Y(Z,a&1),e===null)return Kl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=n.children,e=n.fallback,l?(n=t.mode,l=t.child,o={mode:"hidden",children:o},!(n&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=Ra(o,n,0,null),e=$t(e,n,r,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=ni(r),t.memoizedState=ri,e):Ji(t,o));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return pp(e,t,o,n,s,a,r);if(l){l=n.fallback,o=t.mode,a=e.child,s=a.sibling;var c={mode:"hidden",children:n.children};return!(o&1)&&t.child!==a?(n=t.child,n.childLanes=0,n.pendingProps=c,t.deletions=null):(n=bt(a,c),n.subtreeFlags=a.subtreeFlags&14680064),s!==null?l=bt(s,l):(l=$t(l,o,r,null),l.flags|=2),l.return=t,n.return=t,n.sibling=l,t.child=n,n=l,l=t.child,o=e.child.memoizedState,o=o===null?ni(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~r,t.memoizedState=ri,n}return l=e.child,e=l.sibling,n=bt(l,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Ji(e,t){return t=Ra({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function On(e,t,r,n){return n!==null&&Ii(n),yr(t,e.child,null,r),e=Ji(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function pp(e,t,r,n,a,l,o){if(r)return t.flags&256?(t.flags&=-257,n=dl(Error(N(422))),On(e,t,o,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=n.fallback,a=t.mode,n=Ra({mode:"visible",children:n.children},a,0,null),l=$t(l,a,o,null),l.flags|=2,n.return=t,l.return=t,n.sibling=l,t.child=n,t.mode&1&&yr(t,e.child,null,o),t.child.memoizedState=ni(o),t.memoizedState=ri,l);if(!(t.mode&1))return On(e,t,o,null);if(a.data==="$!"){if(n=a.nextSibling&&a.nextSibling.dataset,n)var s=n.dgst;return n=s,l=Error(N(419)),n=dl(l,n,void 0),On(e,t,o,n)}if(s=(o&e.childLanes)!==0,Se||s){if(n=de,n!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(n.suspendedLanes|o)?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,ct(e,a),Xe(n,e,a,-1))}return no(),n=dl(Error(N(421))),On(e,t,o,n)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Ep.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,Te=jt(a.nextSibling),De=t,G=!0,Qe=null,e!==null&&(Ie[Fe++]=at,Ie[Fe++]=lt,Ie[Fe++]=Bt,at=e.id,lt=e.overflow,Bt=t),t=Ji(t,n.children),t.flags|=4096,t)}function fs(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Gl(e.return,t,r)}function fl(e,t,r,n,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=r,l.tailMode=a)}function bu(e,t,r){var n=t.pendingProps,a=n.revealOrder,l=n.tail;if(xe(e,t,n.children,r),n=Z.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fs(e,r,t);else if(e.tag===19)fs(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(Y(Z,n),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(r=t.child,a=null;r!==null;)e=r.alternate,e!==null&&va(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),fl(t,!1,a,r,l);break;case"backwards":for(r=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&va(e)===null){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}fl(t,!0,r,null,l);break;case"together":fl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Xn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ut(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Wt|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,r=bt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=bt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function mp(e,t,r){switch(t.tag){case 3:Su(t),gr();break;case 5:qc(t);break;case 1:be(t.type)&&ca(t);break;case 4:Vi(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,a=t.memoizedProps.value;Y(fa,n._currentValue),n._currentValue=a;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(Y(Z,Z.current&1),t.flags|=128,null):r&t.child.childLanes?Eu(e,t,r):(Y(Z,Z.current&1),e=ut(e,t,r),e!==null?e.sibling:null);Y(Z,Z.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return bu(e,t,r);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Y(Z,Z.current),n)break;return null;case 22:case 23:return t.lanes=0,ju(e,t,r)}return ut(e,t,r)}var Cu,ai,zu,Pu;Cu=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ai=function(){};zu=function(e,t,r,n){var a=e.memoizedProps;if(a!==n){e=t.stateNode,It(et.current);var l=null;switch(r){case"input":a=El(e,a),n=El(e,n),l=[];break;case"select":a=ee({},a,{value:void 0}),n=ee({},n,{value:void 0}),l=[];break;case"textarea":a=zl(e,a),n=zl(e,n),l=[];break;default:typeof a.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=oa)}Ll(r,n);var o;r=null;for(u in a)if(!n.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var s=a[u];for(o in s)s.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Gr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in n){var c=n[u];if(s=a!=null?a[u]:void 0,n.hasOwnProperty(u)&&c!==s&&(c!=null||s!=null))if(u==="style")if(s){for(o in s)!s.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in c)c.hasOwnProperty(o)&&s[o]!==c[o]&&(r||(r={}),r[o]=c[o])}else r||(l||(l=[]),l.push(u,r)),r=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(l=l||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(l=l||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Gr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&X("scroll",e),l||s===c||(l=[])):(l=l||[]).push(u,c))}r&&(l=l||[]).push("style",r);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Pu=function(e,t,r,n){r!==n&&(t.flags|=4)};function Dr(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function he(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags&14680064,n|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function vp(e,t,r){var n=t.pendingProps;switch(Mi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return he(t),null;case 1:return be(t.type)&&sa(),he(t),null;case 3:return n=t.stateNode,xr(),K(Ee),K(ye),Hi(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Dn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qe!==null&&(fi(Qe),Qe=null))),ai(e,t),he(t),null;case 5:Wi(t);var a=It(cn.current);if(r=t.type,e!==null&&t.stateNode!=null)zu(e,t,r,n,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(N(166));return he(t),null}if(e=It(et.current),Dn(t)){n=t.stateNode,r=t.type;var l=t.memoizedProps;switch(n[Ze]=t,n[on]=l,e=(t.mode&1)!==0,r){case"dialog":X("cancel",n),X("close",n);break;case"iframe":case"object":case"embed":X("load",n);break;case"video":case"audio":for(a=0;a<$r.length;a++)X($r[a],n);break;case"source":X("error",n);break;case"img":case"image":case"link":X("error",n),X("load",n);break;case"details":X("toggle",n);break;case"input":ko(n,l),X("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!l.multiple},X("invalid",n);break;case"textarea":jo(n,l),X("invalid",n)}Ll(r,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var s=l[o];o==="children"?typeof s=="string"?n.textContent!==s&&(l.suppressHydrationWarning!==!0&&Tn(n.textContent,s,e),a=["children",s]):typeof s=="number"&&n.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&Tn(n.textContent,s,e),a=["children",""+s]):Gr.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&X("scroll",n)}switch(r){case"input":Nn(n),_o(n,l,!0);break;case"textarea":Nn(n),No(n);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(n.onclick=oa)}n=a,t.updateQueue=n,n!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ac(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=o.createElement(r,{is:n.is}):(e=o.createElement(r),r==="select"&&(o=e,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):e=o.createElementNS(e,r),e[Ze]=t,e[on]=n,Cu(e,t,!1,!1),t.stateNode=e;e:{switch(o=Tl(r,n),r){case"dialog":X("cancel",e),X("close",e),a=n;break;case"iframe":case"object":case"embed":X("load",e),a=n;break;case"video":case"audio":for(a=0;a<$r.length;a++)X($r[a],e);a=n;break;case"source":X("error",e),a=n;break;case"img":case"image":case"link":X("error",e),X("load",e),a=n;break;case"details":X("toggle",e),a=n;break;case"input":ko(e,n),a=El(e,n),X("invalid",e);break;case"option":a=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},a=ee({},n,{value:void 0}),X("invalid",e);break;case"textarea":jo(e,n),a=zl(e,n),X("invalid",e);break;default:a=n}Ll(r,a),s=a;for(l in s)if(s.hasOwnProperty(l)){var c=s[l];l==="style"?oc(e,c):l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&lc(e,c)):l==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Jr(e,c):typeof c=="number"&&Jr(e,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Gr.hasOwnProperty(l)?c!=null&&l==="onScroll"&&X("scroll",e):c!=null&&ki(e,l,c,o))}switch(r){case"input":Nn(e),_o(e,n,!1);break;case"textarea":Nn(e),No(e);break;case"option":n.value!=null&&e.setAttribute("value",""+Ct(n.value));break;case"select":e.multiple=!!n.multiple,l=n.value,l!=null?cr(e,!!n.multiple,l,!1):n.defaultValue!=null&&cr(e,!!n.multiple,n.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=oa)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return he(t),null;case 6:if(e&&t.stateNode!=null)Pu(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(N(166));if(r=It(cn.current),It(et.current),Dn(t)){if(n=t.stateNode,r=t.memoizedProps,n[Ze]=t,(l=n.nodeValue!==r)&&(e=De,e!==null))switch(e.tag){case 3:Tn(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Tn(n.nodeValue,r,(e.mode&1)!==0)}l&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[Ze]=t,t.stateNode=n}return he(t),null;case 13:if(K(Z),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Te!==null&&t.mode&1&&!(t.flags&128))Xc(),gr(),t.flags|=98560,l=!1;else if(l=Dn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!l)throw Error(N(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(N(317));l[Ze]=t}else gr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;he(t),l=!1}else Qe!==null&&(fi(Qe),Qe=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||Z.current&1?se===0&&(se=3):no())),t.updateQueue!==null&&(t.flags|=4),he(t),null);case 4:return xr(),ai(e,t),e===null&&an(t.stateNode.containerInfo),he(t),null;case 10:return Ai(t.type._context),he(t),null;case 17:return be(t.type)&&sa(),he(t),null;case 19:if(K(Z),l=t.memoizedState,l===null)return he(t),null;if(n=(t.flags&128)!==0,o=l.rendering,o===null)if(n)Dr(l,!1);else{if(se!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=va(e),o!==null){for(t.flags|=128,Dr(l,!1),n=o.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)l=r,e=n,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Y(Z,Z.current&1|2),t.child}e=e.sibling}l.tail!==null&&ne()>kr&&(t.flags|=128,n=!0,Dr(l,!1),t.lanes=4194304)}else{if(!n)if(e=va(o),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Dr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!G)return he(t),null}else 2*ne()-l.renderingStartTime>kr&&r!==1073741824&&(t.flags|=128,n=!0,Dr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(r=l.last,r!==null?r.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ne(),t.sibling=null,r=Z.current,Y(Z,n?r&1|2:r&1),t):(he(t),null);case 22:case 23:return ro(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?Le&1073741824&&(he(t),t.subtreeFlags&6&&(t.flags|=8192)):he(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function hp(e,t){switch(Mi(t),t.tag){case 1:return be(t.type)&&sa(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xr(),K(Ee),K(ye),Hi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Wi(t),null;case 13:if(K(Z),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));gr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return K(Z),null;case 4:return xr(),null;case 10:return Ai(t.type._context),null;case 22:case 23:return ro(),null;case 24:return null;default:return null}}var Mn=!1,ge=!1,gp=typeof WeakSet=="function"?WeakSet:Set,T=null;function or(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){te(e,t,n)}else r.current=null}function li(e,t,r){try{r()}catch(n){te(e,t,n)}}var ps=!1;function yp(e,t){if(Bl=aa,e=Oc(),Ri(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var a=n.anchorOffset,l=n.focusNode;n=n.focusOffset;try{r.nodeType,l.nodeType}catch{r=null;break e}var o=0,s=-1,c=-1,u=0,v=0,m=e,h=null;t:for(;;){for(var y;m!==r||a!==0&&m.nodeType!==3||(s=o+a),m!==l||n!==0&&m.nodeType!==3||(c=o+n),m.nodeType===3&&(o+=m.nodeValue.length),(y=m.firstChild)!==null;)h=m,m=y;for(;;){if(m===e)break t;if(h===r&&++u===a&&(s=o),h===l&&++v===n&&(c=o),(y=m.nextSibling)!==null)break;m=h,h=m.parentNode}m=y}r=s===-1||c===-1?null:{start:s,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(Vl={focusedElem:e,selectionRange:r},aa=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var w=x.memoizedProps,_=x.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:We(t.type,w),_);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(k){te(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return x=ps,ps=!1,x}function Qr(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var a=n=n.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&li(t,r,l)}a=a.next}while(a!==n)}}function Ta(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function ii(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Lu(e){var t=e.alternate;t!==null&&(e.alternate=null,Lu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ze],delete t[on],delete t[Ql],delete t[ep],delete t[tp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Tu(e){return e.tag===5||e.tag===3||e.tag===4}function ms(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Tu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function oi(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=oa));else if(n!==4&&(e=e.child,e!==null))for(oi(e,t,r),e=e.sibling;e!==null;)oi(e,t,r),e=e.sibling}function si(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(si(e,t,r),e=e.sibling;e!==null;)si(e,t,r),e=e.sibling}var fe=null,He=!1;function ft(e,t,r){for(r=r.child;r!==null;)Du(e,t,r),r=r.sibling}function Du(e,t,r){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(Na,r)}catch{}switch(r.tag){case 5:ge||or(r,t);case 6:var n=fe,a=He;fe=null,ft(e,t,r),fe=n,He=a,fe!==null&&(He?(e=fe,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):fe.removeChild(r.stateNode));break;case 18:fe!==null&&(He?(e=fe,r=r.stateNode,e.nodeType===8?ll(e.parentNode,r):e.nodeType===1&&ll(e,r),tn(e)):ll(fe,r.stateNode));break;case 4:n=fe,a=He,fe=r.stateNode.containerInfo,He=!0,ft(e,t,r),fe=n,He=a;break;case 0:case 11:case 14:case 15:if(!ge&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){a=n=n.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&li(r,t,o),a=a.next}while(a!==n)}ft(e,t,r);break;case 1:if(!ge&&(or(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(s){te(r,t,s)}ft(e,t,r);break;case 21:ft(e,t,r);break;case 22:r.mode&1?(ge=(n=ge)||r.memoizedState!==null,ft(e,t,r),ge=n):ft(e,t,r);break;default:ft(e,t,r)}}function vs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new gp),t.forEach(function(n){var a=bp.bind(null,e,n);r.has(n)||(r.add(n),n.then(a,a))})}}function Ve(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var a=r[n];try{var l=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:fe=s.stateNode,He=!1;break e;case 3:fe=s.stateNode.containerInfo,He=!0;break e;case 4:fe=s.stateNode.containerInfo,He=!0;break e}s=s.return}if(fe===null)throw Error(N(160));Du(l,o,a),fe=null,He=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(u){te(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ru(t,e),t=t.sibling}function Ru(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),Ge(e),n&4){try{Qr(3,e,e.return),Ta(3,e)}catch(w){te(e,e.return,w)}try{Qr(5,e,e.return)}catch(w){te(e,e.return,w)}}break;case 1:Ve(t,e),Ge(e),n&512&&r!==null&&or(r,r.return);break;case 5:if(Ve(t,e),Ge(e),n&512&&r!==null&&or(r,r.return),e.flags&32){var a=e.stateNode;try{Jr(a,"")}catch(w){te(e,e.return,w)}}if(n&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=r!==null?r.memoizedProps:l,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&rc(a,l),Tl(s,o);var u=Tl(s,l);for(o=0;o<c.length;o+=2){var v=c[o],m=c[o+1];v==="style"?oc(a,m):v==="dangerouslySetInnerHTML"?lc(a,m):v==="children"?Jr(a,m):ki(a,v,m,u)}switch(s){case"input":bl(a,l);break;case"textarea":nc(a,l);break;case"select":var h=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var y=l.value;y!=null?cr(a,!!l.multiple,y,!1):h!==!!l.multiple&&(l.defaultValue!=null?cr(a,!!l.multiple,l.defaultValue,!0):cr(a,!!l.multiple,l.multiple?[]:"",!1))}a[on]=l}catch(w){te(e,e.return,w)}}break;case 6:if(Ve(t,e),Ge(e),n&4){if(e.stateNode===null)throw Error(N(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(w){te(e,e.return,w)}}break;case 3:if(Ve(t,e),Ge(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{tn(t.containerInfo)}catch(w){te(e,e.return,w)}break;case 4:Ve(t,e),Ge(e);break;case 13:Ve(t,e),Ge(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(eo=ne())),n&4&&vs(e);break;case 22:if(v=r!==null&&r.memoizedState!==null,e.mode&1?(ge=(u=ge)||v,Ve(t,e),ge=u):Ve(t,e),Ge(e),n&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!v&&e.mode&1)for(T=e,v=e.child;v!==null;){for(m=T=v;T!==null;){switch(h=T,y=h.child,h.tag){case 0:case 11:case 14:case 15:Qr(4,h,h.return);break;case 1:or(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){n=h,r=h.return;try{t=n,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(w){te(n,r,w)}}break;case 5:or(h,h.return);break;case 22:if(h.memoizedState!==null){gs(m);continue}}y!==null?(y.return=h,T=y):gs(m)}v=v.sibling}e:for(v=null,m=e;;){if(m.tag===5){if(v===null){v=m;try{a=m.stateNode,u?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=m.stateNode,c=m.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=ic("display",o))}catch(w){te(e,e.return,w)}}}else if(m.tag===6){if(v===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(w){te(e,e.return,w)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;v===m&&(v=null),m=m.return}v===m&&(v=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ve(t,e),Ge(e),n&4&&vs(e);break;case 21:break;default:Ve(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Tu(r)){var n=r;break e}r=r.return}throw Error(N(160))}switch(n.tag){case 5:var a=n.stateNode;n.flags&32&&(Jr(a,""),n.flags&=-33);var l=ms(e);si(e,l,a);break;case 3:case 4:var o=n.stateNode.containerInfo,s=ms(e);oi(e,s,o);break;default:throw Error(N(161))}}catch(c){te(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xp(e,t,r){T=e,Ou(e)}function Ou(e,t,r){for(var n=(e.mode&1)!==0;T!==null;){var a=T,l=a.child;if(a.tag===22&&n){var o=a.memoizedState!==null||Mn;if(!o){var s=a.alternate,c=s!==null&&s.memoizedState!==null||ge;s=Mn;var u=ge;if(Mn=o,(ge=c)&&!u)for(T=a;T!==null;)o=T,c=o.child,o.tag===22&&o.memoizedState!==null?ys(a):c!==null?(c.return=o,T=c):ys(a);for(;l!==null;)T=l,Ou(l),l=l.sibling;T=a,Mn=s,ge=u}hs(e)}else a.subtreeFlags&8772&&l!==null?(l.return=a,T=l):hs(e)}}function hs(e){for(;T!==null;){var t=T;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ge||Ta(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!ge)if(r===null)n.componentDidMount();else{var a=t.elementType===t.type?r.memoizedProps:We(t.type,r.memoizedProps);n.componentDidUpdate(a,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&es(t,l,n);break;case 3:var o=t.updateQueue;if(o!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}es(t,o,r)}break;case 5:var s=t.stateNode;if(r===null&&t.flags&4){r=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var v=u.memoizedState;if(v!==null){var m=v.dehydrated;m!==null&&tn(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}ge||t.flags&512&&ii(t)}catch(h){te(t,t.return,h)}}if(t===e){T=null;break}if(r=t.sibling,r!==null){r.return=t.return,T=r;break}T=t.return}}function gs(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var r=t.sibling;if(r!==null){r.return=t.return,T=r;break}T=t.return}}function ys(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Ta(4,t)}catch(c){te(t,r,c)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var a=t.return;try{n.componentDidMount()}catch(c){te(t,a,c)}}var l=t.return;try{ii(t)}catch(c){te(t,l,c)}break;case 5:var o=t.return;try{ii(t)}catch(c){te(t,o,c)}}}catch(c){te(t,t.return,c)}if(t===e){T=null;break}var s=t.sibling;if(s!==null){s.return=t.return,T=s;break}T=t.return}}var wp=Math.ceil,ya=dt.ReactCurrentDispatcher,Zi=dt.ReactCurrentOwner,Ae=dt.ReactCurrentBatchConfig,V=0,de=null,ie=null,pe=0,Le=0,sr=Lt(0),se=0,pn=null,Wt=0,Da=0,qi=0,Yr=null,Ne=null,eo=0,kr=1/0,rt=null,xa=!1,ci=null,St=null,In=!1,yt=null,wa=0,Xr=0,ui=null,Kn=-1,Gn=0;function we(){return V&6?ne():Kn!==-1?Kn:Kn=ne()}function Et(e){return e.mode&1?V&2&&pe!==0?pe&-pe:np.transition!==null?(Gn===0&&(Gn=xc()),Gn):(e=H,e!==0||(e=window.event,e=e===void 0?16:Ec(e.type)),e):1}function Xe(e,t,r,n){if(50<Xr)throw Xr=0,ui=null,Error(N(185));gn(e,r,n),(!(V&2)||e!==de)&&(e===de&&(!(V&2)&&(Da|=r),se===4&&ht(e,pe)),Ce(e,n),r===1&&V===0&&!(t.mode&1)&&(kr=ne()+500,za&&Tt()))}function Ce(e,t){var r=e.callbackNode;rf(e,t);var n=na(e,e===de?pe:0);if(n===0)r!==null&&bo(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&bo(r),t===1)e.tag===0?rp(xs.bind(null,e)):Hc(xs.bind(null,e)),Zf(function(){!(V&6)&&Tt()}),r=null;else{switch(wc(n)){case 1:r=Ei;break;case 4:r=gc;break;case 16:r=ra;break;case 536870912:r=yc;break;default:r=ra}r=Vu(r,Mu.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Mu(e,t){if(Kn=-1,Gn=0,V&6)throw Error(N(327));var r=e.callbackNode;if(mr()&&e.callbackNode!==r)return null;var n=na(e,e===de?pe:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=ka(e,n);else{t=n;var a=V;V|=2;var l=Fu();(de!==e||pe!==t)&&(rt=null,kr=ne()+500,Ft(e,t));do try{jp();break}catch(s){Iu(e,s)}while(!0);$i(),ya.current=l,V=a,ie!==null?t=0:(de=null,pe=0,t=se)}if(t!==0){if(t===2&&(a=Il(e),a!==0&&(n=a,t=di(e,a))),t===1)throw r=pn,Ft(e,0),ht(e,n),Ce(e,ne()),r;if(t===6)ht(e,n);else{if(a=e.current.alternate,!(n&30)&&!kp(a)&&(t=ka(e,n),t===2&&(l=Il(e),l!==0&&(n=l,t=di(e,l))),t===1))throw r=pn,Ft(e,0),ht(e,n),Ce(e,ne()),r;switch(e.finishedWork=a,e.finishedLanes=n,t){case 0:case 1:throw Error(N(345));case 2:Rt(e,Ne,rt);break;case 3:if(ht(e,n),(n&130023424)===n&&(t=eo+500-ne(),10<t)){if(na(e,0)!==0)break;if(a=e.suspendedLanes,(a&n)!==n){we(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Hl(Rt.bind(null,e,Ne,rt),t);break}Rt(e,Ne,rt);break;case 4:if(ht(e,n),(n&4194240)===n)break;for(t=e.eventTimes,a=-1;0<n;){var o=31-Ye(n);l=1<<o,o=t[o],o>a&&(a=o),n&=~l}if(n=a,n=ne()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*wp(n/1960))-n,10<n){e.timeoutHandle=Hl(Rt.bind(null,e,Ne,rt),n);break}Rt(e,Ne,rt);break;case 5:Rt(e,Ne,rt);break;default:throw Error(N(329))}}}return Ce(e,ne()),e.callbackNode===r?Mu.bind(null,e):null}function di(e,t){var r=Yr;return e.current.memoizedState.isDehydrated&&(Ft(e,t).flags|=256),e=ka(e,t),e!==2&&(t=Ne,Ne=r,t!==null&&fi(t)),e}function fi(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function kp(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var a=r[n],l=a.getSnapshot;a=a.value;try{if(!Ke(l(),a))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ht(e,t){for(t&=~qi,t&=~Da,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Ye(t),n=1<<r;e[r]=-1,t&=~n}}function xs(e){if(V&6)throw Error(N(327));mr();var t=na(e,0);if(!(t&1))return Ce(e,ne()),null;var r=ka(e,t);if(e.tag!==0&&r===2){var n=Il(e);n!==0&&(t=n,r=di(e,n))}if(r===1)throw r=pn,Ft(e,0),ht(e,t),Ce(e,ne()),r;if(r===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Rt(e,Ne,rt),Ce(e,ne()),null}function to(e,t){var r=V;V|=1;try{return e(t)}finally{V=r,V===0&&(kr=ne()+500,za&&Tt())}}function Ht(e){yt!==null&&yt.tag===0&&!(V&6)&&mr();var t=V;V|=1;var r=Ae.transition,n=H;try{if(Ae.transition=null,H=1,e)return e()}finally{H=n,Ae.transition=r,V=t,!(V&6)&&Tt()}}function ro(){Le=sr.current,K(sr)}function Ft(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Jf(r)),ie!==null)for(r=ie.return;r!==null;){var n=r;switch(Mi(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&sa();break;case 3:xr(),K(Ee),K(ye),Hi();break;case 5:Wi(n);break;case 4:xr();break;case 13:K(Z);break;case 19:K(Z);break;case 10:Ai(n.type._context);break;case 22:case 23:ro()}r=r.return}if(de=e,ie=e=bt(e.current,null),pe=Le=t,se=0,pn=null,qi=Da=Wt=0,Ne=Yr=null,Mt!==null){for(t=0;t<Mt.length;t++)if(r=Mt[t],n=r.interleaved,n!==null){r.interleaved=null;var a=n.next,l=r.pending;if(l!==null){var o=l.next;l.next=a,n.next=o}r.pending=n}Mt=null}return e}function Iu(e,t){do{var r=ie;try{if($i(),Qn.current=ga,ha){for(var n=q.memoizedState;n!==null;){var a=n.queue;a!==null&&(a.pending=null),n=n.next}ha=!1}if(Vt=0,ue=oe=q=null,Hr=!1,un=0,Zi.current=null,r===null||r.return===null){se=1,pn=t,ie=null;break}e:{var l=e,o=r.return,s=r,c=t;if(t=pe,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,v=s,m=v.tag;if(!(v.mode&1)&&(m===0||m===11||m===15)){var h=v.alternate;h?(v.updateQueue=h.updateQueue,v.memoizedState=h.memoizedState,v.lanes=h.lanes):(v.updateQueue=null,v.memoizedState=null)}var y=is(o);if(y!==null){y.flags&=-257,os(y,o,s,l,t),y.mode&1&&ls(l,u,t),t=y,c=u;var x=t.updateQueue;if(x===null){var w=new Set;w.add(c),t.updateQueue=w}else x.add(c);break e}else{if(!(t&1)){ls(l,u,t),no();break e}c=Error(N(426))}}else if(G&&s.mode&1){var _=is(o);if(_!==null){!(_.flags&65536)&&(_.flags|=256),os(_,o,s,l,t),Ii(wr(c,s));break e}}l=c=wr(c,s),se!==4&&(se=2),Yr===null?Yr=[l]:Yr.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=wu(l,c,t);qo(l,f);break e;case 1:s=c;var d=l.type,p=l.stateNode;if(!(l.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(St===null||!St.has(p)))){l.flags|=65536,t&=-t,l.lanes|=t;var k=ku(l,s,t);qo(l,k);break e}}l=l.return}while(l!==null)}Au(r)}catch(S){t=S,ie===r&&r!==null&&(ie=r=r.return);continue}break}while(!0)}function Fu(){var e=ya.current;return ya.current=ga,e===null?ga:e}function no(){(se===0||se===3||se===2)&&(se=4),de===null||!(Wt&268435455)&&!(Da&268435455)||ht(de,pe)}function ka(e,t){var r=V;V|=2;var n=Fu();(de!==e||pe!==t)&&(rt=null,Ft(e,t));do try{_p();break}catch(a){Iu(e,a)}while(!0);if($i(),V=r,ya.current=n,ie!==null)throw Error(N(261));return de=null,pe=0,se}function _p(){for(;ie!==null;)$u(ie)}function jp(){for(;ie!==null&&!Yd();)$u(ie)}function $u(e){var t=Bu(e.alternate,e,Le);e.memoizedProps=e.pendingProps,t===null?Au(e):ie=t,Zi.current=null}function Au(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=hp(r,t),r!==null){r.flags&=32767,ie=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{se=6,ie=null;return}}else if(r=vp(r,t,Le),r!==null){ie=r;return}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);se===0&&(se=5)}function Rt(e,t,r){var n=H,a=Ae.transition;try{Ae.transition=null,H=1,Np(e,t,r,n)}finally{Ae.transition=a,H=n}return null}function Np(e,t,r,n){do mr();while(yt!==null);if(V&6)throw Error(N(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var l=r.lanes|r.childLanes;if(nf(e,l),e===de&&(ie=de=null,pe=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||In||(In=!0,Vu(ra,function(){return mr(),null})),l=(r.flags&15990)!==0,r.subtreeFlags&15990||l){l=Ae.transition,Ae.transition=null;var o=H;H=1;var s=V;V|=4,Zi.current=null,yp(e,r),Ru(r,e),Wf(Vl),aa=!!Bl,Vl=Bl=null,e.current=r,xp(r),Xd(),V=s,H=o,Ae.transition=l}else e.current=r;if(In&&(In=!1,yt=e,wa=a),l=e.pendingLanes,l===0&&(St=null),Jd(r.stateNode),Ce(e,ne()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)a=t[r],n(a.value,{componentStack:a.stack,digest:a.digest});if(xa)throw xa=!1,e=ci,ci=null,e;return wa&1&&e.tag!==0&&mr(),l=e.pendingLanes,l&1?e===ui?Xr++:(Xr=0,ui=e):Xr=0,Tt(),null}function mr(){if(yt!==null){var e=wc(wa),t=Ae.transition,r=H;try{if(Ae.transition=null,H=16>e?16:e,yt===null)var n=!1;else{if(e=yt,yt=null,wa=0,V&6)throw Error(N(331));var a=V;for(V|=4,T=e.current;T!==null;){var l=T,o=l.child;if(T.flags&16){var s=l.deletions;if(s!==null){for(var c=0;c<s.length;c++){var u=s[c];for(T=u;T!==null;){var v=T;switch(v.tag){case 0:case 11:case 15:Qr(8,v,l)}var m=v.child;if(m!==null)m.return=v,T=m;else for(;T!==null;){v=T;var h=v.sibling,y=v.return;if(Lu(v),v===u){T=null;break}if(h!==null){h.return=y,T=h;break}T=y}}}var x=l.alternate;if(x!==null){var w=x.child;if(w!==null){x.child=null;do{var _=w.sibling;w.sibling=null,w=_}while(w!==null)}}T=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,T=o;else e:for(;T!==null;){if(l=T,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Qr(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,T=f;break e}T=l.return}}var d=e.current;for(T=d;T!==null;){o=T;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,T=p;else e:for(o=d;T!==null;){if(s=T,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ta(9,s)}}catch(S){te(s,s.return,S)}if(s===o){T=null;break e}var k=s.sibling;if(k!==null){k.return=s.return,T=k;break e}T=s.return}}if(V=a,Tt(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(Na,e)}catch{}n=!0}return n}finally{H=r,Ae.transition=t}}return!1}function ws(e,t,r){t=wr(r,t),t=wu(e,t,1),e=Nt(e,t,1),t=we(),e!==null&&(gn(e,1,t),Ce(e,t))}function te(e,t,r){if(e.tag===3)ws(e,e,r);else for(;t!==null;){if(t.tag===3){ws(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(St===null||!St.has(n))){e=wr(r,e),e=ku(t,e,1),t=Nt(t,e,1),e=we(),t!==null&&(gn(t,1,e),Ce(t,e));break}}t=t.return}}function Sp(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=we(),e.pingedLanes|=e.suspendedLanes&r,de===e&&(pe&r)===r&&(se===4||se===3&&(pe&130023424)===pe&&500>ne()-eo?Ft(e,0):qi|=r),Ce(e,t)}function Uu(e,t){t===0&&(e.mode&1?(t=bn,bn<<=1,!(bn&130023424)&&(bn=4194304)):t=1);var r=we();e=ct(e,t),e!==null&&(gn(e,t,r),Ce(e,r))}function Ep(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Uu(e,r)}function bp(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(N(314))}n!==null&&n.delete(t),Uu(e,r)}var Bu;Bu=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ee.current)Se=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Se=!1,mp(e,t,r);Se=!!(e.flags&131072)}else Se=!1,G&&t.flags&1048576&&Qc(t,da,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Xn(e,t),e=t.pendingProps;var a=hr(t,ye.current);pr(t,r),a=Yi(null,t,n,e,a,r);var l=Xi();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,be(n)?(l=!0,ca(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Bi(t),a.updater=La,t.stateNode=a,a._reactInternals=t,Zl(t,n,e,r),t=ti(null,t,n,!0,l,r)):(t.tag=0,G&&l&&Oi(t),xe(null,t,a,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Xn(e,t),e=t.pendingProps,a=n._init,n=a(n._payload),t.type=n,a=t.tag=zp(n),e=We(n,e),a){case 0:t=ei(null,t,n,e,r);break e;case 1:t=us(null,t,n,e,r);break e;case 11:t=ss(null,t,n,e,r);break e;case 14:t=cs(null,t,n,We(n.type,e),r);break e}throw Error(N(306,n,""))}return t;case 0:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:We(n,a),ei(e,t,n,a,r);case 1:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:We(n,a),us(e,t,n,a,r);case 3:e:{if(Su(t),e===null)throw Error(N(387));n=t.pendingProps,l=t.memoizedState,a=l.element,Zc(e,t),ma(t,n,null,r);var o=t.memoizedState;if(n=o.element,l.isDehydrated)if(l={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=wr(Error(N(423)),t),t=ds(e,t,n,r,a);break e}else if(n!==a){a=wr(Error(N(424)),t),t=ds(e,t,n,r,a);break e}else for(Te=jt(t.stateNode.containerInfo.firstChild),De=t,G=!0,Qe=null,r=Gc(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(gr(),n===a){t=ut(e,t,r);break e}xe(e,t,n,r)}t=t.child}return t;case 5:return qc(t),e===null&&Kl(t),n=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,Wl(n,a)?o=null:l!==null&&Wl(n,l)&&(t.flags|=32),Nu(e,t),xe(e,t,o,r),t.child;case 6:return e===null&&Kl(t),null;case 13:return Eu(e,t,r);case 4:return Vi(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=yr(t,null,n,r):xe(e,t,n,r),t.child;case 11:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:We(n,a),ss(e,t,n,a,r);case 7:return xe(e,t,t.pendingProps,r),t.child;case 8:return xe(e,t,t.pendingProps.children,r),t.child;case 12:return xe(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,Y(fa,n._currentValue),n._currentValue=o,l!==null)if(Ke(l.value,o)){if(l.children===a.children&&!Ee.current){t=ut(e,t,r);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var s=l.dependencies;if(s!==null){o=l.child;for(var c=s.firstContext;c!==null;){if(c.context===n){if(l.tag===1){c=it(-1,r&-r),c.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var v=u.pending;v===null?c.next=c:(c.next=v.next,v.next=c),u.pending=c}}l.lanes|=r,c=l.alternate,c!==null&&(c.lanes|=r),Gl(l.return,r,t),s.lanes|=r;break}c=c.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(N(341));o.lanes|=r,s=o.alternate,s!==null&&(s.lanes|=r),Gl(o,r,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}xe(e,t,a.children,r),t=t.child}return t;case 9:return a=t.type,n=t.pendingProps.children,pr(t,r),a=Ue(a),n=n(a),t.flags|=1,xe(e,t,n,r),t.child;case 14:return n=t.type,a=We(n,t.pendingProps),a=We(n.type,a),cs(e,t,n,a,r);case 15:return _u(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:We(n,a),Xn(e,t),t.tag=1,be(n)?(e=!0,ca(t)):e=!1,pr(t,r),xu(t,n,a),Zl(t,n,a,r),ti(null,t,n,!0,e,r);case 19:return bu(e,t,r);case 22:return ju(e,t,r)}throw Error(N(156,t.tag))};function Vu(e,t){return hc(e,t)}function Cp(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $e(e,t,r,n){return new Cp(e,t,r,n)}function ao(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zp(e){if(typeof e=="function")return ao(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ji)return 11;if(e===Ni)return 14}return 2}function bt(e,t){var r=e.alternate;return r===null?(r=$e(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Jn(e,t,r,n,a,l){var o=2;if(n=e,typeof e=="function")ao(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Zt:return $t(r.children,a,l,t);case _i:o=8,a|=8;break;case _l:return e=$e(12,r,t,a|2),e.elementType=_l,e.lanes=l,e;case jl:return e=$e(13,r,t,a),e.elementType=jl,e.lanes=l,e;case Nl:return e=$e(19,r,t,a),e.elementType=Nl,e.lanes=l,e;case qs:return Ra(r,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Js:o=10;break e;case Zs:o=9;break e;case ji:o=11;break e;case Ni:o=14;break e;case pt:o=16,n=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=$e(o,r,t,a),t.elementType=e,t.type=n,t.lanes=l,t}function $t(e,t,r,n){return e=$e(7,e,n,t),e.lanes=r,e}function Ra(e,t,r,n){return e=$e(22,e,n,t),e.elementType=qs,e.lanes=r,e.stateNode={isHidden:!1},e}function pl(e,t,r){return e=$e(6,e,null,t),e.lanes=r,e}function ml(e,t,r){return t=$e(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Pp(e,t,r,n,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xa(0),this.expirationTimes=Xa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xa(0),this.identifierPrefix=n,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function lo(e,t,r,n,a,l,o,s,c){return e=new Pp(e,t,r,s,c),t===1?(t=1,l===!0&&(t|=8)):t=0,l=$e(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bi(l),e}function Lp(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jt,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function Wu(e){if(!e)return zt;e=e._reactInternals;e:{if(Yt(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(be(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var r=e.type;if(be(r))return Wc(e,r,t)}return t}function Hu(e,t,r,n,a,l,o,s,c){return e=lo(r,n,!0,e,a,l,o,s,c),e.context=Wu(null),r=e.current,n=we(),a=Et(r),l=it(n,a),l.callback=t??null,Nt(r,l,a),e.current.lanes=a,gn(e,a,n),Ce(e,n),e}function Oa(e,t,r,n){var a=t.current,l=we(),o=Et(a);return r=Wu(r),t.context===null?t.context=r:t.pendingContext=r,t=it(l,o),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=Nt(a,t,o),e!==null&&(Xe(e,a,o,l),Hn(e,a,o)),o}function _a(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ks(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function io(e,t){ks(e,t),(e=e.alternate)&&ks(e,t)}function Tp(){return null}var Qu=typeof reportError=="function"?reportError:function(e){console.error(e)};function oo(e){this._internalRoot=e}Ma.prototype.render=oo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));Oa(e,t,null,null)};Ma.prototype.unmount=oo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Oa(null,e,null,null)}),t[st]=null}};function Ma(e){this._internalRoot=e}Ma.prototype.unstable_scheduleHydration=function(e){if(e){var t=jc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<vt.length&&t!==0&&t<vt[r].priority;r++);vt.splice(r,0,e),r===0&&Sc(e)}};function so(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ia(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _s(){}function Dp(e,t,r,n,a){if(a){if(typeof n=="function"){var l=n;n=function(){var u=_a(o);l.call(u)}}var o=Hu(t,n,e,0,null,!1,!1,"",_s);return e._reactRootContainer=o,e[st]=o.current,an(e.nodeType===8?e.parentNode:e),Ht(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof n=="function"){var s=n;n=function(){var u=_a(c);s.call(u)}}var c=lo(e,0,!1,null,null,!1,!1,"",_s);return e._reactRootContainer=c,e[st]=c.current,an(e.nodeType===8?e.parentNode:e),Ht(function(){Oa(t,c,r,n)}),c}function Fa(e,t,r,n,a){var l=r._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var s=a;a=function(){var c=_a(o);s.call(c)}}Oa(t,o,e,a)}else o=Dp(r,t,e,a,n);return _a(o)}kc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Fr(t.pendingLanes);r!==0&&(bi(t,r|1),Ce(t,ne()),!(V&6)&&(kr=ne()+500,Tt()))}break;case 13:Ht(function(){var n=ct(e,1);if(n!==null){var a=we();Xe(n,e,1,a)}}),io(e,1)}};Ci=function(e){if(e.tag===13){var t=ct(e,134217728);if(t!==null){var r=we();Xe(t,e,134217728,r)}io(e,134217728)}};_c=function(e){if(e.tag===13){var t=Et(e),r=ct(e,t);if(r!==null){var n=we();Xe(r,e,t,n)}io(e,t)}};jc=function(){return H};Nc=function(e,t){var r=H;try{return H=e,t()}finally{H=r}};Rl=function(e,t,r){switch(t){case"input":if(bl(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var a=Ca(n);if(!a)throw Error(N(90));tc(n),bl(n,a)}}}break;case"textarea":nc(e,r);break;case"select":t=r.value,t!=null&&cr(e,!!r.multiple,t,!1)}};uc=to;dc=Ht;var Rp={usingClientEntryPoint:!1,Events:[xn,rr,Ca,sc,cc,to]},Rr={findFiberByHostInstance:Ot,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Op={bundleType:Rr.bundleType,version:Rr.version,rendererPackageName:Rr.rendererPackageName,rendererConfig:Rr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:dt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=mc(e),e===null?null:e.stateNode},findFiberByHostInstance:Rr.findFiberByHostInstance||Tp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fn=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fn.isDisabled&&Fn.supportsFiber)try{Na=Fn.inject(Op),qe=Fn}catch{}}Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rp;Oe.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!so(t))throw Error(N(200));return Lp(e,t,null,r)};Oe.createRoot=function(e,t){if(!so(e))throw Error(N(299));var r=!1,n="",a=Qu;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=lo(e,1,!1,null,null,r,!1,n,a),e[st]=t.current,an(e.nodeType===8?e.parentNode:e),new oo(t)};Oe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=mc(t),e=e===null?null:e.stateNode,e};Oe.flushSync=function(e){return Ht(e)};Oe.hydrate=function(e,t,r){if(!Ia(t))throw Error(N(200));return Fa(null,e,t,!0,r)};Oe.hydrateRoot=function(e,t,r){if(!so(e))throw Error(N(405));var n=r!=null&&r.hydratedSources||null,a=!1,l="",o=Qu;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(l=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),t=Hu(t,null,e,1,r??null,a,!1,l,o),e[st]=t.current,an(e),n)for(e=0;e<n.length;e++)r=n[e],a=r._getVersion,a=a(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,a]:t.mutableSourceEagerHydrationData.push(r,a);return new Ma(t)};Oe.render=function(e,t,r){if(!Ia(t))throw Error(N(200));return Fa(null,e,t,!1,r)};Oe.unmountComponentAtNode=function(e){if(!Ia(e))throw Error(N(40));return e._reactRootContainer?(Ht(function(){Fa(null,null,e,!1,function(){e._reactRootContainer=null,e[st]=null})}),!0):!1};Oe.unstable_batchedUpdates=to;Oe.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Ia(r))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return Fa(e,t,r,!1,n)};Oe.version="18.3.1-next-f1338f8080-20240426";function Yu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yu)}catch(e){console.error(e)}}Yu(),Ys.exports=Oe;var co=Ys.exports,js=co;wl.createRoot=js.createRoot,wl.hydrateRoot=js.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mn(){return mn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},mn.apply(this,arguments)}var xt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(xt||(xt={}));const Ns="popstate";function Mp(e){e===void 0&&(e={});function t(n,a){let{pathname:l,search:o,hash:s}=n.location;return pi("",{pathname:l,search:o,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(n,a){return typeof a=="string"?a:Xu(a)}return Fp(t,r,null,e)}function ce(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function uo(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ip(){return Math.random().toString(36).substr(2,8)}function Ss(e,t){return{usr:e.state,key:e.key,idx:t}}function pi(e,t,r,n){return r===void 0&&(r=null),mn({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Er(t):t,{state:r,key:t&&t.key||n||Ip()})}function Xu(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Er(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Fp(e,t,r,n){n===void 0&&(n={});let{window:a=document.defaultView,v5Compat:l=!1}=n,o=a.history,s=xt.Pop,c=null,u=v();u==null&&(u=0,o.replaceState(mn({},o.state,{idx:u}),""));function v(){return(o.state||{idx:null}).idx}function m(){s=xt.Pop;let _=v(),f=_==null?null:_-u;u=_,c&&c({action:s,location:w.location,delta:f})}function h(_,f){s=xt.Push;let d=pi(w.location,_,f);u=v()+1;let p=Ss(d,u),k=w.createHref(d);try{o.pushState(p,"",k)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;a.location.assign(k)}l&&c&&c({action:s,location:w.location,delta:1})}function y(_,f){s=xt.Replace;let d=pi(w.location,_,f);u=v();let p=Ss(d,u),k=w.createHref(d);o.replaceState(p,"",k),l&&c&&c({action:s,location:w.location,delta:0})}function x(_){let f=a.location.origin!=="null"?a.location.origin:a.location.href,d=typeof _=="string"?_:Xu(_);return d=d.replace(/ $/,"%20"),ce(f,"No window.location.(origin|href) available to create URL for href: "+d),new URL(d,f)}let w={get action(){return s},get location(){return e(a,o)},listen(_){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(Ns,m),c=_,()=>{a.removeEventListener(Ns,m),c=null}},createHref(_){return t(a,_)},createURL:x,encodeLocation(_){let f=x(_);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:h,replace:y,go(_){return o.go(_)}};return w}var Es;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Es||(Es={}));function $p(e,t,r){return r===void 0&&(r="/"),Ap(e,t,r)}function Ap(e,t,r,n){let a=typeof t=="string"?Er(t):t,l=Ju(a.pathname||"/",r);if(l==null)return null;let o=Ku(e);Up(o);let s=null;for(let c=0;s==null&&c<o.length;++c){let u=qp(l);s=Gp(o[c],u)}return s}function Ku(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let a=(l,o,s)=>{let c={relativePath:s===void 0?l.path||"":s,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};c.relativePath.startsWith("/")&&(ce(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let u=At([n,c.relativePath]),v=r.concat(c);l.children&&l.children.length>0&&(ce(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Ku(l.children,t,v,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:Xp(u,l.index),routesMeta:v})};return e.forEach((l,o)=>{var s;if(l.path===""||!((s=l.path)!=null&&s.includes("?")))a(l,o);else for(let c of Gu(l.path))a(l,o,c)}),t}function Gu(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,a=r.endsWith("?"),l=r.replace(/\?$/,"");if(n.length===0)return a?[l,""]:[l];let o=Gu(n.join("/")),s=[];return s.push(...o.map(c=>c===""?l:[l,c].join("/"))),a&&s.push(...o),s.map(c=>e.startsWith("/")&&c===""?"/":c)}function Up(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Kp(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Bp=/^:[\w-]+$/,Vp=3,Wp=2,Hp=1,Qp=10,Yp=-2,bs=e=>e==="*";function Xp(e,t){let r=e.split("/"),n=r.length;return r.some(bs)&&(n+=Yp),t&&(n+=Wp),r.filter(a=>!bs(a)).reduce((a,l)=>a+(Bp.test(l)?Vp:l===""?Hp:Qp),n)}function Kp(e,t){return e.length===t.length&&e.slice(0,-1).every((n,a)=>n===t[a])?e[e.length-1]-t[t.length-1]:0}function Gp(e,t,r){let{routesMeta:n}=e,a={},l="/",o=[];for(let s=0;s<n.length;++s){let c=n[s],u=s===n.length-1,v=l==="/"?t:t.slice(l.length)||"/",m=Jp({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},v),h=c.route;if(!m)return null;Object.assign(a,m.params),o.push({params:a,pathname:At([l,m.pathname]),pathnameBase:im(At([l,m.pathnameBase])),route:h}),m.pathnameBase!=="/"&&(l=At([l,m.pathnameBase]))}return o}function Jp(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Zp(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:n.reduce((u,v,m)=>{let{paramName:h,isOptional:y}=v;if(h==="*"){let w=s[m]||"";o=l.slice(0,l.length-w.length).replace(/(.)\/+$/,"$1")}const x=s[m];return y&&!x?u[h]=void 0:u[h]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:o,pattern:e}}function Zp(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),uo(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,c)=>(n.push({paramName:s,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function qp(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return uo(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Ju(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}const em=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tm=e=>em.test(e);function rm(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:a=""}=typeof e=="string"?Er(e):e,l;if(r)if(tm(r))l=r;else{if(r.includes("//")){let o=r;r=r.replace(/\/\/+/g,"/"),uo(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+r))}r.startsWith("/")?l=Cs(r.substring(1),"/"):l=Cs(r,t)}else l=t;return{pathname:l,search:om(n),hash:sm(a)}}function Cs(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function vl(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nm(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function am(e,t){let r=nm(e);return t?r.map((n,a)=>a===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function lm(e,t,r,n){n===void 0&&(n=!1);let a;typeof e=="string"?a=Er(e):(a=mn({},e),ce(!a.pathname||!a.pathname.includes("?"),vl("?","pathname","search",a)),ce(!a.pathname||!a.pathname.includes("#"),vl("#","pathname","hash",a)),ce(!a.search||!a.search.includes("#"),vl("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,s;if(o==null)s=r;else{let m=t.length-1;if(!n&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),m-=1;a.pathname=h.join("/")}s=m>=0?t[m]:"/"}let c=rm(a,s),u=o&&o!=="/"&&o.endsWith("/"),v=(l||o===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(u||v)&&(c.pathname+="/"),c}const At=e=>e.join("/").replace(/\/\/+/g,"/"),im=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),om=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,sm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function cm(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Zu=["post","put","patch","delete"];new Set(Zu);const um=["get",...Zu];new Set(um);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vn(){return vn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},vn.apply(this,arguments)}const fo=g.createContext(null),dm=g.createContext(null),$a=g.createContext(null),Aa=g.createContext(null),Xt=g.createContext({outlet:null,matches:[],isDataRoute:!1}),qu=g.createContext(null);function Ua(){return g.useContext(Aa)!=null}function ed(){return Ua()||ce(!1),g.useContext(Aa).location}function td(e){g.useContext($a).static||g.useLayoutEffect(e)}function kn(){let{isDataRoute:e}=g.useContext(Xt);return e?Nm():fm()}function fm(){Ua()||ce(!1);let e=g.useContext(fo),{basename:t,future:r,navigator:n}=g.useContext($a),{matches:a}=g.useContext(Xt),{pathname:l}=ed(),o=JSON.stringify(am(a,r.v7_relativeSplatPath)),s=g.useRef(!1);return td(()=>{s.current=!0}),g.useCallback(function(u,v){if(v===void 0&&(v={}),!s.current)return;if(typeof u=="number"){n.go(u);return}let m=lm(u,JSON.parse(o),l,v.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:At([t,m.pathname])),(v.replace?n.replace:n.push)(m,v.state,v)},[t,n,o,l,e])}function po(){let{matches:e}=g.useContext(Xt),t=e[e.length-1];return t?t.params:{}}function pm(e,t){return mm(e,t)}function mm(e,t,r,n){Ua()||ce(!1);let{navigator:a}=g.useContext($a),{matches:l}=g.useContext(Xt),o=l[l.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=ed(),v;if(t){var m;let _=typeof t=="string"?Er(t):t;c==="/"||(m=_.pathname)!=null&&m.startsWith(c)||ce(!1),v=_}else v=u;let h=v.pathname||"/",y=h;if(c!=="/"){let _=c.replace(/^\//,"").split("/");y="/"+h.replace(/^\//,"").split("/").slice(_.length).join("/")}let x=$p(e,{pathname:y}),w=xm(x&&x.map(_=>Object.assign({},_,{params:Object.assign({},s,_.params),pathname:At([c,a.encodeLocation?a.encodeLocation(_.pathname).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?c:At([c,a.encodeLocation?a.encodeLocation(_.pathnameBase).pathname:_.pathnameBase])})),l,r,n);return t&&w?g.createElement(Aa.Provider,{value:{location:vn({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:xt.Pop}},w):w}function vm(){let e=jm(),t=cm(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return g.createElement(g.Fragment,null,g.createElement("h2",null,"Unexpected Application Error!"),g.createElement("h3",{style:{fontStyle:"italic"}},t),r?g.createElement("pre",{style:a},r):null,null)}const hm=g.createElement(vm,null);class gm extends g.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?g.createElement(Xt.Provider,{value:this.props.routeContext},g.createElement(qu.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ym(e){let{routeContext:t,match:r,children:n}=e,a=g.useContext(fo);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),g.createElement(Xt.Provider,{value:t},n)}function xm(e,t,r,n){var a;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var l;if(!r)return null;if(r.errors)e=r.matches;else if((l=n)!=null&&l.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,s=(a=r)==null?void 0:a.errors;if(s!=null){let v=o.findIndex(m=>m.route.id&&(s==null?void 0:s[m.route.id])!==void 0);v>=0||ce(!1),o=o.slice(0,Math.min(o.length,v+1))}let c=!1,u=-1;if(r&&n&&n.v7_partialHydration)for(let v=0;v<o.length;v++){let m=o[v];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=v),m.route.id){let{loaderData:h,errors:y}=r,x=m.route.loader&&h[m.route.id]===void 0&&(!y||y[m.route.id]===void 0);if(m.route.lazy||x){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((v,m,h)=>{let y,x=!1,w=null,_=null;r&&(y=s&&m.route.id?s[m.route.id]:void 0,w=m.route.errorElement||hm,c&&(u<0&&h===0?(Sm("route-fallback"),x=!0,_=null):u===h&&(x=!0,_=m.route.hydrateFallbackElement||null)));let f=t.concat(o.slice(0,h+1)),d=()=>{let p;return y?p=w:x?p=_:m.route.Component?p=g.createElement(m.route.Component,null):m.route.element?p=m.route.element:p=v,g.createElement(ym,{match:m,routeContext:{outlet:v,matches:f,isDataRoute:r!=null},children:p})};return r&&(m.route.ErrorBoundary||m.route.errorElement||h===0)?g.createElement(gm,{location:r.location,revalidation:r.revalidation,component:w,error:y,children:d(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):d()},null)}var rd=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(rd||{}),nd=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(nd||{});function wm(e){let t=g.useContext(fo);return t||ce(!1),t}function km(e){let t=g.useContext(dm);return t||ce(!1),t}function _m(e){let t=g.useContext(Xt);return t||ce(!1),t}function ad(e){let t=_m(),r=t.matches[t.matches.length-1];return r.route.id||ce(!1),r.route.id}function jm(){var e;let t=g.useContext(qu),r=km(),n=ad();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function Nm(){let{router:e}=wm(rd.UseNavigateStable),t=ad(nd.UseNavigateStable),r=g.useRef(!1);return td(()=>{r.current=!0}),g.useCallback(function(a,l){l===void 0&&(l={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,vn({fromRouteId:t},l)))},[e,t])}const zs={};function Sm(e,t,r){zs[e]||(zs[e]=!0)}function Em(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Gt(e){ce(!1)}function bm(e){let{basename:t="/",children:r=null,location:n,navigationType:a=xt.Pop,navigator:l,static:o=!1,future:s}=e;Ua()&&ce(!1);let c=t.replace(/^\/*/,"/"),u=g.useMemo(()=>({basename:c,navigator:l,static:o,future:vn({v7_relativeSplatPath:!1},s)}),[c,s,l,o]);typeof n=="string"&&(n=Er(n));let{pathname:v="/",search:m="",hash:h="",state:y=null,key:x="default"}=n,w=g.useMemo(()=>{let _=Ju(v,c);return _==null?null:{location:{pathname:_,search:m,hash:h,state:y,key:x},navigationType:a}},[c,v,m,h,y,x,a]);return w==null?null:g.createElement($a.Provider,{value:u},g.createElement(Aa.Provider,{children:r,value:w}))}function Cm(e){let{children:t,location:r}=e;return pm(mi(t),r)}new Promise(()=>{});function mi(e,t){t===void 0&&(t=[]);let r=[];return g.Children.forEach(e,(n,a)=>{if(!g.isValidElement(n))return;let l=[...t,a];if(n.type===g.Fragment){r.push.apply(r,mi(n.props.children,l));return}n.type!==Gt&&ce(!1),!n.props.index||!n.props.children||ce(!1);let o={id:n.props.id||l.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(o.children=mi(n.props.children,l)),r.push(o)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const zm="6";try{window.__reactRouterVersion=zm}catch{}const Pm="startTransition",Ps=Nd[Pm];function Lm(e){let{basename:t,children:r,future:n,window:a}=e,l=g.useRef();l.current==null&&(l.current=Mp({window:a,v5Compat:!0}));let o=l.current,[s,c]=g.useState({action:o.action,location:o.location}),{v7_startTransition:u}=n||{},v=g.useCallback(m=>{u&&Ps?Ps(()=>c(m)):c(m)},[c,u]);return g.useLayoutEffect(()=>o.listen(v),[o,v]),g.useEffect(()=>Em(n),[n]),g.createElement(bm,{basename:t,children:r,location:s.location,navigationType:s.action,navigator:o,future:n})}var Ls;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ls||(Ls={}));var Ts;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ts||(Ts={}));const $=g.forwardRef(function({children:t,variant:r="primary",size:n="md",fullWidth:a=!1,loading:l=!1,disabled:o=!1,icon:s,iconPosition:c="left",className:u="",...v},m){const h=["btn",`btn--${r}`,n!=="md"&&`btn--${n}`,a&&"btn--full",l&&"btn--loading",u].filter(Boolean).join(" ");return i.jsxs("button",{ref:m,className:h,disabled:o||l,...v,children:[s&&c==="left"&&i.jsx("span",{className:"btn__icon","aria-hidden":"true",children:s}),t,s&&c==="right"&&i.jsx("span",{className:"btn__icon","aria-hidden":"true",children:s})]})});function Kr({isOpen:e,onClose:t,title:r,children:n,footer:a,size:l="md",sheet:o=!1}){const s=g.useRef(null),c=g.useRef(null);if(g.useEffect(()=>{var v,m;return e?(c.current=document.activeElement,document.body.style.overflow="hidden",(v=s.current)==null||v.focus()):(document.body.style.overflow="",(m=c.current)==null||m.focus()),()=>{document.body.style.overflow=""}},[e]),g.useEffect(()=>{const v=m=>{m.key==="Escape"&&e&&t()};return document.addEventListener("keydown",v),()=>document.removeEventListener("keydown",v)},[e,t]),!e)return null;const u={sm:"max-width: 360px",md:"max-width: 500px",lg:"max-width: 700px",xl:"max-width: 900px"};return co.createPortal(i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"modal-backdrop",onClick:t,"aria-hidden":"true"}),i.jsxs("div",{ref:s,className:`modal ${o?"modal--sheet":""}`,style:{[u[l]]:!0},role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",tabIndex:-1,children:[r&&i.jsx("header",{className:"modal__header",children:i.jsx("h2",{id:"modal-title",className:"modal__title",children:r})}),i.jsx("div",{className:"modal__body",children:n}),a&&i.jsx("footer",{className:"modal__footer",children:a})]})]}),document.body)}const hl="eventually_onboarding_complete";function Tm(){const[e,t]=g.useState(!1),[r,n]=g.useState(0);return g.useEffect(()=>{localStorage.getItem(hl)||setTimeout(()=>t(!0),500)},[]),{showOnboarding:e,currentStep:r,setCurrentStep:n,completeOnboarding:()=>{localStorage.setItem(hl,"true"),t(!1)},resetOnboarding:()=>{localStorage.removeItem(hl),n(0),t(!0)}}}const gl=[{icon:"🎯",title:"¡Bienvenido a Eventually!",description:"La forma más fácil de coordinar eventos con tus amigos, familia o equipo de trabajo.",image:null},{icon:"📅",title:"Creá tu evento",description:"Dale un nombre a tu evento, agregá una descripción opcional y seleccioná las fechas posibles.",tip:"Podés arrastrar para seleccionar múltiples fechas de una vez"},{icon:"🔗",title:"Compartí el link",description:"Enviá el link a los participantes por WhatsApp o cualquier otro medio. ¡Es así de simple!",tip:"También podés compartir un link de solo lectura para ver resultados"},{icon:"✅",title:"¡Encontrá la mejor fecha!",description:"Cada participante marca su disponibilidad y vos podés ver en tiempo real cuál es la mejor opción.",tip:"Usá las acciones rápidas para marcar todo como disponible o no disponible"}];function Dm({isOpen:e,currentStep:t,onStepChange:r,onComplete:n}){const a=gl[t],l=t===gl.length-1,o=t===0,s=()=>{l?n():r(t+1)},c=()=>{o||r(t-1)},u=()=>{n()};return i.jsxs(Kr,{isOpen:e,onClose:u,size:"md",children:[i.jsxs("div",{className:"onboarding",children:[i.jsx("div",{className:"onboarding__dots",children:gl.map((v,m)=>i.jsx("button",{className:`onboarding__dot ${m===t?"active":""} ${m<t?"completed":""}`,onClick:()=>r(m),"aria-label":`Ir al paso ${m+1}`},m))}),i.jsxs("div",{className:"onboarding__content",children:[i.jsx("div",{className:"onboarding__icon",children:a.icon}),i.jsx("h2",{className:"onboarding__title",children:a.title}),i.jsx("p",{className:"onboarding__description",children:a.description}),a.tip&&i.jsxs("div",{className:"onboarding__tip",children:[i.jsx("span",{className:"onboarding__tip-icon",children:"💡"}),i.jsx("span",{children:a.tip})]})]},t),i.jsxs("div",{className:"onboarding__actions",children:[o?i.jsx($,{variant:"ghost",onClick:u,children:"Omitir"}):i.jsx($,{variant:"ghost",onClick:c,children:"Atrás"}),i.jsx($,{variant:"primary",onClick:s,children:l?"¡Empezar!":"Siguiente"})]})]}),i.jsx("style",{children:`
        .onboarding {
          text-align: center;
        }
        
        .onboarding__dots {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }
        
        .onboarding__dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background: var(--color-bg-tertiary);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        
        .onboarding__dot:hover {
          background: var(--color-border-strong);
        }
        
        .onboarding__dot.active {
          width: 24px;
          background: var(--color-accent-primary);
        }
        
        .onboarding__dot.completed {
          background: var(--color-success);
        }
        
        .onboarding__content {
          animation: fade-in-up 0.4s ease;
        }
        
        .onboarding__icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
          animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .onboarding__title {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-3);
        }
        
        .onboarding__description {
          font-size: var(--text-base);
          color: var(--color-text-secondary);
          max-width: 380px;
          margin: 0 auto var(--space-5);
          line-height: var(--leading-relaxed);
        }
        
        .onboarding__tip {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          color: var(--color-accent-primary);
        }
        
        .onboarding__tip-icon {
          font-size: var(--text-lg);
        }
        
        .onboarding__actions {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-8);
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})}function Rm(){const e=kn(),{showOnboarding:t,currentStep:r,setCurrentStep:n,completeOnboarding:a,resetOnboarding:l}=Tm(),[o,s]=g.useState([]);return g.useEffect(()=>{const c=[];for(let u=0;u<localStorage.length;u++){const v=localStorage.key(u);if(v!=null&&v.startsWith("eventually_participant_"))try{const m=v.replace("eventually_participant_",""),h=JSON.parse(localStorage.getItem(v));c.push({id:m,name:h.name,eventTitle:h.eventTitle||null,votedAt:h.votedAt||null})}catch{}}c.sort((u,v)=>u.votedAt?v.votedAt?new Date(v.votedAt)-new Date(u.votedAt):-1:1),s(c)},[]),i.jsxs("div",{className:"page home-page",children:[i.jsx(Dm,{isOpen:t,currentStep:r,onStepChange:n,onComplete:a}),i.jsxs("section",{className:"hero",children:[i.jsxs("div",{className:"hero__background",children:[i.jsx("div",{className:"hero__gradient"}),i.jsx("div",{className:"hero__pattern"})]}),i.jsxs("div",{className:"container hero__content",children:[i.jsx("div",{className:"hero__badge animate-fade-in-up",children:"✨ Gratis y sin registro"}),i.jsxs("h1",{className:"hero__title animate-fade-in-up",style:{animationDelay:"0.1s"},children:["Encontrá el día perfecto",i.jsx("br",{}),i.jsx("span",{className:"hero__title-accent",children:"para tu evento"})]}),i.jsxs("p",{className:"hero__subtitle animate-fade-in-up",style:{animationDelay:"0.2s"},children:["Coordiná con amigos, familia o equipo de trabajo.",i.jsx("br",{}),"Todos votan su disponibilidad y vos encontrás la mejor fecha."]}),i.jsxs("div",{className:"hero__actions animate-fade-in-up",style:{animationDelay:"0.3s"},children:[i.jsx($,{variant:"primary",size:"xl",onClick:()=>e("/create"),icon:"📅",children:"Crear evento"}),i.jsx($,{variant:"ghost",size:"lg",onClick:l,icon:"❓",children:"¿Cómo funciona?"})]})]})]}),o.length>0&&i.jsx("section",{className:"history",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"history-card card",children:[i.jsx("h3",{className:"history-title",children:"📋 Tus eventos recientes"}),i.jsx("p",{className:"history-subtitle",children:"Eventos en los que participaste desde este dispositivo"}),i.jsx("div",{className:"history-list",children:o.map(c=>i.jsxs("div",{className:"history-item",onClick:()=>e(`/event/${c.id}`),children:[i.jsxs("div",{className:"history-item__info",children:[i.jsx("span",{className:"history-item__name",children:c.eventTitle||`Evento #${c.id.slice(0,6)}`}),i.jsxs("span",{className:"history-item__participant",children:["Votaste como: ",c.name,c.votedAt&&` · ${new Date(c.votedAt).toLocaleDateString("es-AR")}`]})]}),i.jsx("span",{className:"history-item__arrow",children:"→"})]},c.id))})]})})}),i.jsx("section",{className:"features",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"features__grid stagger-children",children:[i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-card__icon",children:"📅"}),i.jsx("h3",{className:"feature-card__title",children:"Seleccioná fechas"}),i.jsx("p",{className:"feature-card__description",children:"Elegí las fechas posibles arrastrando en el calendario"})]}),i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-card__icon",children:"🔗"}),i.jsx("h3",{className:"feature-card__title",children:"Compartí el link"}),i.jsx("p",{className:"feature-card__description",children:"Envialo por WhatsApp, email o cualquier medio"})]}),i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-card__icon",children:"✓"}),i.jsx("h3",{className:"feature-card__title",children:"Votá disponibilidad"}),i.jsx("p",{className:"feature-card__description",children:"Cada participante marca: disponible, quizás o no disponible"})]}),i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-card__icon",children:"🎯"}),i.jsx("h3",{className:"feature-card__title",children:"¡Listo!"}),i.jsx("p",{className:"feature-card__description",children:"Mirá en tiempo real cuál es la mejor opción para todos"})]})]})})}),i.jsx("section",{className:"cta",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta__card",children:[i.jsx("h2",{className:"cta__title",children:"¿Listo para coordinar?"}),i.jsx("p",{className:"cta__subtitle",children:"Creá tu primer evento en segundos"}),i.jsx($,{variant:"primary",size:"xl",onClick:()=>e("/create"),children:"Empezar ahora →"})]})})}),i.jsx("footer",{className:"footer",children:i.jsx("div",{className:"container",children:i.jsx("p",{className:"footer__text",children:"Eventually © 2024 · Hecho con 💜"})})}),i.jsx("style",{children:`
        .home-page {
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: var(--space-16) 0;
        }
        
        .hero__background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .hero__gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, var(--color-accent-primary-subtle) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
        }
        
        .hero__pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--color-border-subtle) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
        }
        
        .hero__content {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-6);
        }
        
        .hero__title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: var(--space-6);
          letter-spacing: -0.03em;
        }
        
        .hero__title-accent {
          background: linear-gradient(135deg, var(--color-accent-primary), #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero__subtitle {
          font-size: var(--text-xl);
          color: var(--color-text-secondary);
          max-width: 500px;
          margin: 0 auto var(--space-8);
          line-height: var(--leading-relaxed);
        }
        
        .hero__actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* Features Section */
        .features {
          padding: var(--space-16) 0;
          background: var(--color-bg-tertiary);
        }
        
        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-6);
        }
        
        .feature-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          transition: all var(--transition-normal);
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .feature-card__icon {
          font-size: 48px;
          margin-bottom: var(--space-4);
        }
        
        .feature-card__title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }
        
        .feature-card__description {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        /* CTA Section */
        .cta {
          padding: var(--space-16) 0;
        }
        
        .cta__card {
          text-align: center;
          padding: var(--space-12);
          background: linear-gradient(135deg, var(--color-accent-primary-subtle), rgba(168, 85, 247, 0.1));
          border: 1px solid var(--color-accent-primary-muted);
          border-radius: var(--radius-2xl);
        }
        
        .cta__title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .cta__subtitle {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }
        
        /* History Section */
        .history {
          padding: var(--space-8) 0 0;
        }
        
        .history-card {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .history-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-1);
        }
        
        .history-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-bottom: var(--space-4);
        }
        
        .history-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        
        .history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .history-item:hover {
          background: var(--color-accent-primary-subtle);
          transform: translateX(4px);
        }
        
        .history-item__info {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        
        .history-item__name {
          font-weight: 500;
        }
        
        .history-item__participant {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .history-item__arrow {
          color: var(--color-accent-primary);
          font-size: var(--text-lg);
        }
        
        /* Footer */
        .footer {
          padding: var(--space-8) 0;
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .footer__text {
          text-align: center;
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        @media (max-width: 640px) {
          .hero {
            min-height: auto;
            padding: var(--space-12) 0;
          }
          
          .hero__subtitle {
            font-size: var(--text-base);
          }
          
          .hero__actions {
            flex-direction: column;
            align-items: center;
          }
          
          .cta__card {
            padding: var(--space-8);
          }
        }
      `})]})}const Zn=g.forwardRef(function({label:t,hint:r,error:n,required:a=!1,optional:l=!1,maxLength:o,showCounter:s=!1,className:c="",...u},v){var w;const[m,h]=g.useState(((w=u.value)==null?void 0:w.length)||0),y=u.id||u.name||Math.random().toString(36).slice(2),x=_=>{var f;h(_.target.value.length),(f=u.onChange)==null||f.call(u,_)};return i.jsxs("div",{className:"form-group",children:[t&&i.jsxs("label",{htmlFor:y,className:"form-label",children:[t,a&&i.jsx("span",{className:"form-label__required",children:"*"}),l&&i.jsx("span",{className:"form-label__optional",children:"(opcional)"})]}),i.jsx("input",{ref:v,id:y,className:`form-input ${n?"form-input--error":""} ${c}`,maxLength:o,"aria-invalid":!!n,"aria-describedby":n?`${y}-error`:r?`${y}-hint`:void 0,...u,onChange:x}),n&&i.jsxs("p",{id:`${y}-error`,className:"form-error",role:"alert",children:[i.jsx("span",{"aria-hidden":"true",children:"⚠"})," ",n]}),r&&!n&&i.jsx("p",{id:`${y}-hint`,className:"form-hint",children:r}),s&&o&&i.jsxs("p",{className:"form-counter",children:[m,"/",o]})]})});function Om({steps:e,currentStep:t,showLabels:r=!0,showPercentage:n=!0}){const a=Math.round((t+1)/e.length*100);return i.jsxs("div",{className:"progress-container",children:[n&&i.jsxs("div",{className:"progress-header",children:[i.jsxs("span",{className:"progress-step-label",children:["Paso ",t+1," de ",e.length]}),i.jsxs("span",{className:"progress-percentage",children:[a,"%"]})]}),i.jsx("div",{className:"progress",role:"progressbar","aria-valuenow":a,"aria-valuemin":"0","aria-valuemax":"100",children:i.jsx("div",{className:"progress__bar",style:{width:`${a}%`}})}),r&&i.jsx("div",{className:"progress-steps",children:e.map((l,o)=>i.jsxs("div",{className:`progress-step ${o<=t?"progress-step--active":""} ${o<t?"progress-step--completed":""}`,children:[i.jsx("div",{className:"progress-step__indicator",children:o<t?i.jsx("span",{"aria-hidden":"true",children:"✓"}):i.jsx("span",{children:o+1})}),i.jsx("span",{className:"progress-step__label",children:l})]},o))}),i.jsx("style",{children:`
        .progress-container {
          margin-bottom: var(--space-8);
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-2);
          font-size: var(--text-sm);
        }
        
        .progress-step-label {
          color: var(--color-text-secondary);
        }
        
        .progress-percentage {
          font-weight: 600;
          color: var(--color-accent-primary);
        }
        
        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-4);
          gap: var(--space-2);
        }
        
        .progress-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          text-align: center;
        }
        
        .progress-step__indicator {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          border: 2px solid var(--color-border-default);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-tertiary);
          transition: all var(--transition-normal);
        }
        
        .progress-step--active .progress-step__indicator {
          background: var(--color-accent-primary);
          border-color: var(--color-accent-primary);
          color: white;
        }
        
        .progress-step--completed .progress-step__indicator {
          background: var(--color-success);
          border-color: var(--color-success);
          color: white;
        }
        
        .progress-step__label {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          max-width: 80px;
        }
        
        .progress-step--active .progress-step__label {
          color: var(--color-text-primary);
          font-weight: 500;
        }
        
        @media (max-width: 640px) {
          .progress-steps {
            display: none;
          }
        }
      `})]})}const Mm=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],Im=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],tt=e=>{const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${n}`},Fm=e=>{const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},Ds=e=>Fm(e).toLocaleDateString("es-AR",{weekday:"short",day:"numeric",month:"short"});function $m({selectedDates:e=[],onDatesChange:t,minDate:r=new Date,showQuickButtons:n=!0,showSelectedList:a=!0,showLegend:l=!0}){const o=g.useMemo(()=>{const E=new Date;return E.setHours(0,0,0,0),E},[]),[s,c]=g.useState(()=>r.getMonth()),[u,v]=g.useState(()=>r.getFullYear()),[m,h]=g.useState(!1),[y,x]=g.useState(null),[w,_]=g.useState(new Set),[f,d]=g.useState("add"),p=g.useRef(null),k=g.useCallback((E,R)=>new Date(R,E+1,0).getDate(),[]),S=g.useCallback((E,R)=>new Date(R,E,1).getDay(),[]),z=g.useMemo(()=>{const E=k(s,u),R=S(s,u),F=[];for(let ae=0;ae<R;ae++)F.push(null);for(let ae=1;ae<=E;ae++)F.push(ae);return F},[s,u,k,S]),P=()=>{s===0?(c(11),v(u-1)):c(s-1)},L=()=>{s===11?(c(0),v(u+1)):c(s+1)},U=g.useMemo(()=>{const E=s===0?11:s-1,R=s===0?u-1:u;return new Date(R,E+1,0)>=o},[s,u,o]),M=g.useCallback(E=>new Date(u,s,E)<o,[s,u,o]),re=g.useCallback(E=>{if(!E)return!1;const R=tt(new Date(u,s,E));return e.includes(R)},[e,s,u]),ze=g.useCallback(E=>{if(!E||!m)return!1;const R=tt(new Date(u,s,E));return w.has(R)},[m,w,s,u]),je=(E,R)=>{if(!E||M(E))return;R.preventDefault();const F=tt(new Date(u,s,E)),ae=e.includes(F);h(!0),x(F),d(ae?"remove":"add"),_(new Set([F]))},O=E=>{if(!m||!E||M(E))return;const R=tt(new Date(u,s,E));_(F=>new Set([...F,R]))},B=g.useCallback(()=>{if(!m)return;let E;f==="add"?E=[...new Set([...e,...w])]:E=e.filter(R=>!w.has(R)),t==null||t(E.sort()),h(!1),x(null),_(new Set)},[m,f,e,w,t]);g.useEffect(()=>{const E=()=>{m&&B()};return document.addEventListener("mouseup",E),()=>document.removeEventListener("mouseup",E)},[m,B]);const Q=(E,R)=>{!E||M(E)||je(E,R)},b=E=>{if(!m)return;const R=E.touches[0],F=document.elementFromPoint(R.clientX,R.clientY),ae=F==null?void 0:F.getAttribute("data-day");ae&&O(parseInt(ae))},j=()=>{B()},C=()=>{const E=[],R=new Date(o),F=new Date(o);for(F.setDate(F.getDate()+(7-F.getDay()));R<=F;)E.push(tt(R)),R.setDate(R.getDate()+1);t==null||t([...new Set([...e,...E])].sort())},D=()=>{const E=[],R=new Date(o);R.setDate(R.getDate()+(7-R.getDay())+1);for(let F=0;F<7;F++){const ae=new Date(R);ae.setDate(ae.getDate()+F),E.push(tt(ae))}t==null||t([...new Set([...e,...E])].sort())},I=()=>{const E=[],R=new Date(o),F=new Date(o);for(F.setDate(F.getDate()+14);R<=F;){const ae=R.getDay();ae!==0&&ae!==6&&E.push(tt(R)),R.setDate(R.getDate()+1)}t==null||t([...new Set([...e,...E])].sort())},W=()=>{t==null||t([])},Pe=E=>{t==null||t(e.filter(R=>R!==E))},J=g.useCallback(E=>{if(!E)return"calendar-day calendar-day--empty";const R=["calendar-day"];if(M(E))R.push("calendar-day--disabled");else{R.push("calendar-day--selectable"),re(E)&&R.push("calendar-day--selected"),ze(E)&&R.push(f==="add"?"calendar-day--drag-add":"calendar-day--drag-remove");const F=tt(new Date(u,s,E)),ae=tt(o);F===ae&&R.push("calendar-day--today")}return R.join(" ")},[M,re,ze,f,s,u,o]);return i.jsxs("div",{className:"calendar-picker",children:[n&&i.jsxs("div",{className:"calendar-quick-actions",children:[i.jsx($,{variant:"ghost",size:"sm",onClick:C,children:"Esta semana"}),i.jsx($,{variant:"ghost",size:"sm",onClick:D,children:"Próxima semana"}),i.jsx($,{variant:"ghost",size:"sm",onClick:I,children:"Solo días hábiles"}),e.length>0&&i.jsx($,{variant:"ghost",size:"sm",onClick:W,children:"Limpiar todo"})]}),i.jsxs("div",{className:"calendar-header",children:[i.jsx("button",{className:"calendar-nav-btn",onClick:P,disabled:!U,"aria-label":"Mes anterior",children:"‹"}),i.jsxs("h3",{className:"calendar-month-title",children:[Im[s]," ",u]}),i.jsx("button",{className:"calendar-nav-btn",onClick:L,"aria-label":"Mes siguiente",children:"›"})]}),i.jsx("div",{className:"calendar-day-headers",children:Mm.map(E=>i.jsx("div",{className:"calendar-day-header",children:E},E))}),i.jsx("div",{ref:p,className:"calendar-grid",onTouchMove:b,onTouchEnd:j,role:"grid","aria-label":"Calendario para selección de fechas",children:z.map((E,R)=>i.jsx("div",{"data-day":E||void 0,className:J(E),onMouseDown:E?F=>je(E,F):void 0,onMouseEnter:E?()=>O(E):void 0,onTouchStart:E?F=>Q(E,F):void 0,role:E?"gridcell":void 0,"aria-selected":E?re(E):void 0,tabIndex:E&&!M(E)?0:-1,children:E&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"calendar-day__number",children:E}),re(E)&&i.jsx("span",{className:"calendar-day__check",children:"✓"})]})},R))}),l&&i.jsxs("div",{className:"calendar-legend",children:[i.jsxs("div",{className:"legend-item",children:[i.jsx("div",{className:"legend-color legend-color--selected"}),i.jsx("span",{children:"Seleccionado"})]}),i.jsxs("div",{className:"legend-item",children:[i.jsx("div",{className:"legend-color",style:{background:"var(--color-bg-tertiary)",border:"1px solid var(--color-border-default)"}}),i.jsx("span",{children:"Disponible"})]}),i.jsx("div",{className:"legend-item",children:i.jsx("span",{style:{color:"var(--color-text-tertiary)",fontSize:"var(--text-xs)"},children:"💡 Arrastrá para seleccionar varias fechas"})})]}),a&&e.length>0&&i.jsxs("div",{className:"calendar-selected-list",children:[i.jsx("div",{className:"calendar-selected-header",children:i.jsxs("span",{className:"calendar-selected-count",children:[e.length," ",e.length===1?"fecha seleccionada":"fechas seleccionadas"]})}),i.jsx("div",{className:"calendar-selected-tags",children:e.slice().sort().map(E=>i.jsxs("div",{className:"calendar-date-tag",children:[i.jsx("span",{children:Ds(E)}),i.jsx("button",{className:"calendar-date-tag__remove",onClick:()=>Pe(E),"aria-label":`Quitar ${Ds(E)}`,children:"×"})]},E))})]}),i.jsx("style",{children:`
        .calendar-picker {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
        }
        
        .calendar-quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        
        .calendar-nav-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);
          font-size: var(--text-xl);
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .calendar-nav-btn:hover:not(:disabled) {
          background: var(--color-bg-tertiary);
        }
        
        .calendar-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .calendar-month-title {
          font-size: var(--text-lg);
          font-weight: 600;
        }
        
        .calendar-day-headers {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: var(--space-2);
        }
        
        .calendar-day-header {
          text-align: center;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-text-tertiary);
          padding: var(--space-2);
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          user-select: none;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 500;
          position: relative;
          transition: all var(--transition-fast);
        }
        
        .calendar-day--empty {
          background: transparent;
        }
        
        .calendar-day--disabled {
          color: var(--color-text-tertiary);
          opacity: 0.5;
        }
        
        .calendar-day--selectable {
          background: var(--color-bg-tertiary);
          cursor: pointer;
        }
        
        .calendar-day--selectable:hover {
          background: var(--color-accent-primary-subtle);
          border-color: var(--color-accent-primary);
        }
        
        .calendar-day--today {
          border: 2px solid var(--color-accent-primary);
        }
        
        .calendar-day--selected {
          background: var(--color-accent-primary);
          color: white;
        }
        
        .calendar-day--selected:hover {
          background: var(--color-accent-primary-hover);
        }
        
        .calendar-day--drag-add {
          background: var(--color-accent-primary-muted);
          transform: scale(1.05);
        }
        
        .calendar-day--drag-remove {
          background: var(--color-error-bg);
          transform: scale(0.95);
        }
        
        .calendar-day__number {
          z-index: 1;
        }
        
        .calendar-day__check {
          position: absolute;
          bottom: 2px;
          font-size: 10px;
        }
        
        .calendar-legend {
          margin-top: var(--space-4);
        }
        
        .calendar-selected-list {
          margin-top: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .calendar-selected-header {
          margin-bottom: var(--space-3);
        }
        
        .calendar-selected-count {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-accent-primary);
        }
        
        .calendar-selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        
        .calendar-date-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-2);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
        }
        
        .calendar-date-tag__remove {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-accent-primary);
          cursor: pointer;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
        }
        
        .calendar-date-tag__remove:hover {
          background: var(--color-accent-primary);
          color: white;
        }
        
        @media (max-width: 640px) {
          .calendar-picker {
            padding: var(--space-4);
          }
          
          .calendar-quick-actions {
            justify-content: center;
          }
          
          .calendar-day {
            font-size: var(--text-xs);
          }
        }
      `})]})}const ld=g.createContext(null);function Am({children:e}){const[t,r]=g.useState([]),n=g.useCallback((o,s="info",c=4e3)=>{const u=Date.now()+Math.random();return r(v=>[...v,{id:u,message:o,type:s}]),c>0&&setTimeout(()=>{r(v=>v.filter(m=>m.id!==u))},c),u},[]),a=g.useCallback(o=>{r(s=>s.filter(c=>c.id!==o))},[]),l={success:(o,s)=>n(o,"success",s),error:(o,s)=>n(o,"error",s),info:(o,s)=>n(o,"info",s),remove:a};return i.jsxs(ld.Provider,{value:l,children:[e,co.createPortal(i.jsx("div",{className:"toast-container",role:"region","aria-label":"Notificaciones",children:t.map(o=>i.jsx(Um,{toast:o,onClose:()=>a(o.id)},o.id))}),document.body)]})}function Um({toast:e,onClose:t}){const r={success:"✓",error:"✕",info:"ℹ"};return i.jsxs("div",{className:`toast toast--${e.type}`,role:"alert","aria-live":"polite",children:[i.jsx("span",{className:"toast__icon",children:r[e.type]}),i.jsx("span",{className:"toast__message",children:e.message}),i.jsx("button",{className:"toast__close",onClick:t,"aria-label":"Cerrar notificación",children:"✕"})]})}function Ba(){const e=g.useContext(ld);if(!e)throw new Error("useToast debe usarse dentro de ToastProvider");return e}const yl=["Detalles","Fechas","Revisar"],$n="eventually_event_draft",Bm=[{value:"#6366f1",name:"Índigo"},{value:"#8b5cf6",name:"Violeta"},{value:"#ec4899",name:"Rosa"},{value:"#ef4444",name:"Rojo"},{value:"#f59e0b",name:"Ámbar"},{value:"#10b981",name:"Esmeralda"},{value:"#3b82f6",name:"Azul"},{value:"#06b6d4",name:"Cian"}];function Vm(){const e=kn(),t=Ba(),[r,n]=g.useState(0),[a,l]=g.useState(!1),[o,s]=g.useState({}),[c,u]=g.useState({title:"",description:"",location:"",themeColor:"#6366f1",dates:[],organizerName:"",organizerEmail:""});g.useEffect(()=>{const f=localStorage.getItem($n);if(f)try{const d=JSON.parse(f);u(d),t.info("Borrador recuperado")}catch{}},[]),g.useEffect(()=>{const f=setTimeout(()=>{(c.title||c.dates.length>0)&&localStorage.setItem($n,JSON.stringify(c))},1e3);return()=>clearTimeout(f)},[c]);const v=g.useCallback((f,d)=>{u(p=>({...p,[f]:d})),o[f]&&s(p=>({...p,[f]:null}))},[o]),m=g.useCallback(()=>{const f={};return r===0&&(c.title.trim()?c.title.length<3&&(f.title="El nombre debe tener al menos 3 caracteres"):f.title="El nombre del evento es requerido"),r===1&&c.dates.length===0&&(f.dates="Seleccioná al menos una fecha"),s(f),Object.keys(f).length===0},[r,c]),h=()=>{m()&&r<yl.length-1&&(n(r+1),window.scrollTo(0,0))},y=()=>{r>0&&(n(r-1),window.scrollTo(0,0))},x=async()=>{if(m()){l(!0);try{const f=await fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:c.title.trim(),description:c.description.trim(),location:c.location.trim(),dates:c.dates,theme_color:c.themeColor,organizer_name:c.organizerName.trim()||"Organizador",organizer_email:c.organizerEmail.trim()})});if(!f.ok)throw new Error("Error al crear el evento");const d=await f.json();localStorage.removeItem($n),t.success("¡Evento creado exitosamente!"),e(`/admin/${d.admin_id}`)}catch(f){console.error("Error:",f),t.error("Error al crear el evento. Intentá de nuevo.")}finally{l(!1)}}},w=()=>{localStorage.removeItem($n),u({title:"",description:"",location:"",themeColor:"#6366f1",dates:[],organizerName:"",organizerEmail:""}),n(0),t.success("Borrador eliminado")},_=f=>{const[d,p,k]=f.split("-").map(Number);return new Date(d,p-1,k).toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})};return i.jsxs("div",{className:"page create-page",children:[i.jsxs("div",{className:"container container--narrow",children:[i.jsxs("header",{className:"create-header",children:[i.jsx("button",{className:"create-back-btn",onClick:()=>e("/"),"aria-label":"Volver al inicio",children:"← Inicio"}),i.jsx("h1",{className:"create-title",children:"Crear evento"})]}),i.jsx(Om,{steps:yl,currentStep:r,showLabels:!0,showPercentage:!0}),r===0&&i.jsx("div",{className:"create-step animate-fade-in-up",children:i.jsxs("div",{className:"card",children:[i.jsxs("div",{className:"card__header",children:[i.jsxs("h2",{className:"card__title",children:[i.jsx("span",{children:"📝"})," Detalles del evento"]}),i.jsx("p",{className:"card__description",children:"Contanos sobre tu evento"})]}),i.jsx(Zn,{label:"Nombre del evento",placeholder:"Ej: Asado de fin de año",value:c.title,onChange:f=>v("title",f.target.value),maxLength:100,showCounter:!0,error:o.title,required:!0,autoFocus:!0}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label",children:["Descripción",i.jsx("span",{className:"form-label__optional",children:"(opcional)"})]}),i.jsx("textarea",{className:"form-input form-textarea",placeholder:"Detalles adicionales sobre el evento...",value:c.description,onChange:f=>v("description",f.target.value),maxLength:500,rows:3}),i.jsxs("p",{className:"form-counter",children:[c.description.length,"/500"]})]}),i.jsx(Zn,{label:"Ubicación",placeholder:"Ej: Casa de Juan, Palermo",value:c.location,onChange:f=>v("location",f.target.value),maxLength:200,optional:!0,hint:"Dirección o lugar del evento"}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Color del tema"}),i.jsx("div",{className:"color-picker",children:Bm.map(f=>i.jsx("button",{className:`color-option ${c.themeColor===f.value?"active":""}`,style:{backgroundColor:f.value},onClick:()=>v("themeColor",f.value),"aria-label":f.name,title:f.name,children:c.themeColor===f.value&&i.jsx("span",{className:"color-check",children:"✓"})},f.value))})]}),i.jsx(Zn,{label:"Tu nombre",placeholder:"Ej: Juan",value:c.organizerName,onChange:f=>v("organizerName",f.target.value),maxLength:50,optional:!0,hint:"Aparecerá como organizador del evento"})]})}),r===1&&i.jsx("div",{className:"create-step animate-fade-in-up",children:i.jsxs("div",{className:"card",children:[i.jsxs("div",{className:"card__header",children:[i.jsxs("h2",{className:"card__title",children:[i.jsx("span",{children:"📅"})," Fechas posibles"]}),i.jsx("p",{className:"card__description",children:"Seleccioná las fechas en las que podría hacerse el evento"})]}),o.dates&&i.jsxs("div",{className:"form-error",role:"alert",style:{marginBottom:"var(--space-4)"},children:[i.jsx("span",{children:"⚠"})," ",o.dates]}),i.jsx($m,{selectedDates:c.dates,onDatesChange:f=>v("dates",f),showQuickButtons:!0,showSelectedList:!0,showLegend:!0})]})}),r===2&&i.jsx("div",{className:"create-step animate-fade-in-up",children:i.jsxs("div",{className:"card",children:[i.jsxs("div",{className:"card__header",children:[i.jsxs("h2",{className:"card__title",children:[i.jsx("span",{children:"👁️"})," Revisar y crear"]}),i.jsx("p",{className:"card__description",children:"Verificá que todo esté correcto antes de crear el evento"})]}),i.jsxs("div",{className:"review-section",children:[i.jsxs("div",{className:"review-item",children:[i.jsx("span",{className:"review-label",children:"Nombre"}),i.jsx("span",{className:"review-value",children:c.title}),i.jsx("button",{className:"review-edit",onClick:()=>n(0),children:"Editar"})]}),c.description&&i.jsxs("div",{className:"review-item",children:[i.jsx("span",{className:"review-label",children:"Descripción"}),i.jsx("span",{className:"review-value",children:c.description})]}),c.location&&i.jsxs("div",{className:"review-item",children:[i.jsx("span",{className:"review-label",children:"Ubicación"}),i.jsx("span",{className:"review-value",children:c.location})]}),i.jsxs("div",{className:"review-item",children:[i.jsx("span",{className:"review-label",children:"Color"}),i.jsx("span",{className:"review-value",children:i.jsx("span",{className:"review-color",style:{backgroundColor:c.themeColor}})})]}),i.jsxs("div",{className:"review-item",children:[i.jsx("span",{className:"review-label",children:"Organizador"}),i.jsx("span",{className:"review-value",children:c.organizerName||"Organizador"})]}),i.jsxs("div",{className:"review-item review-item--dates",children:[i.jsxs("div",{className:"review-label-row",children:[i.jsxs("span",{className:"review-label",children:["Fechas (",c.dates.length,")"]}),i.jsx("button",{className:"review-edit",onClick:()=>n(1),children:"Editar"})]}),i.jsx("div",{className:"review-dates",children:c.dates.slice().sort().map(f=>i.jsx("span",{className:"review-date-tag",children:_(f)},f))})]})]}),i.jsxs("div",{className:"review-notice",children:[i.jsx("span",{className:"review-notice__icon",children:"ℹ️"}),i.jsxs("p",{children:["Al crear el evento recibirás un ",i.jsx("strong",{children:"link de administrador"})," para compartir y ver los resultados. ¡Guardalo bien!"]})]})]})}),i.jsxs("div",{className:"create-nav",children:[i.jsxs("div",{className:"create-nav__left",children:[r>0&&i.jsx($,{variant:"ghost",onClick:y,children:"← Atrás"}),(c.title||c.dates.length>0)&&i.jsx($,{variant:"ghost",size:"sm",onClick:w,children:"Limpiar borrador"})]}),i.jsx("div",{className:"create-nav__right",children:r<yl.length-1?i.jsx($,{variant:"primary",onClick:h,children:"Continuar →"}):i.jsx($,{variant:"success",size:"lg",onClick:x,loading:a,disabled:a,children:a?"Creando...":"¡Crear evento!"})})]})]}),i.jsx("style",{children:`
        .create-page {
          padding: var(--space-8) 0;
        }
        
        .create-header {
          margin-bottom: var(--space-6);
        }
        
        .create-back-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) 0;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
          margin-bottom: var(--space-2);
        }
        
        .create-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .create-title {
          font-size: var(--text-3xl);
        }
        
        .create-step {
          margin-bottom: var(--space-6);
        }
        
        /* Color picker */
        .color-picker {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        
        .color-option {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 3px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .color-option:hover {
          transform: scale(1.1);
        }
        
        .color-option.active {
          border-color: var(--color-text-primary);
          box-shadow: 0 0 0 2px var(--color-bg-secondary);
        }
        
        .color-check {
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        /* Review section */
        .review-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .review-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .review-item--dates {
          flex-direction: column;
          align-items: stretch;
        }
        
        .review-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .review-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-tertiary);
          min-width: 100px;
        }
        
        .review-value {
          flex: 1;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .review-edit {
          background: none;
          border: none;
          color: var(--color-accent-primary);
          font-size: var(--text-sm);
          cursor: pointer;
          padding: var(--space-1) var(--space-2);
        }
        
        .review-edit:hover {
          text-decoration: underline;
        }
        
        .review-color {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
        }
        
        .review-dates {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-top: var(--space-2);
        }
        
        .review-date-tag {
          padding: var(--space-1) var(--space-3);
          background: var(--color-accent-primary-subtle);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
        }
        
        .review-notice {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-info-bg);
          border-radius: var(--radius-lg);
          margin-top: var(--space-4);
        }
        
        .review-notice__icon {
          font-size: var(--text-lg);
        }
        
        .review-notice p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        /* Navigation */
        .create-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .create-nav__left,
        .create-nav__right {
          display: flex;
          gap: var(--space-3);
        }
        
        @media (max-width: 640px) {
          .create-page {
            padding: var(--space-4) 0;
          }
          
          .review-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .review-value {
            width: 100%;
          }
          
          .create-nav {
            flex-direction: column-reverse;
            gap: var(--space-3);
          }
          
          .create-nav__left,
          .create-nav__right {
            width: 100%;
          }
          
          .create-nav__right .btn {
            width: 100%;
          }
        }
      `})]})}function _r({variant:e="text",width:t,height:r,className:n="",count:a=1}){const l=`skeleton skeleton--${e}`,o={width:t||void 0,height:r||void 0};return a>1?i.jsx("div",{className:"skeleton-group",style:{display:"flex",flexDirection:"column",gap:"8px"},children:Array.from({length:a}).map((s,c)=>i.jsx("div",{className:`${l} ${n}`,style:o},c))}):i.jsx("div",{className:`${l} ${n}`,style:o})}function mo(){return i.jsxs("div",{className:"card",children:[i.jsx(_r,{variant:"title",width:"60%"}),i.jsx("div",{style:{marginTop:"16px"},children:i.jsx(_r,{variant:"text",count:3})})]})}const le={NONE:null,AVAILABLE:"available",FLEXIBLE:"flexible",UNAVAILABLE:"unavailable"},xl=[le.NONE,le.AVAILABLE,le.FLEXIBLE,le.UNAVAILABLE],Or={[le.AVAILABLE]:{label:"Disponible",icon:"✓",colorClass:"state--available"},[le.FLEXIBLE]:{label:"Quizás",icon:"~",colorClass:"state--flexible"},[le.UNAVAILABLE]:{label:"No disponible",icon:"✕",colorClass:"state--unavailable"}},Rs=e=>{const[t,r,n]=e.split("-").map(Number),a=new Date(t,r-1,n);return{weekday:a.toLocaleDateString("es-AR",{weekday:"short"}),day:n,month:a.toLocaleDateString("es-AR",{month:"short"}),full:a.toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})}},Wm=e=>{const t={};return e.forEach(r=>{const[n,a]=r.split("-"),l=`${n}-${a}`;t[l]||(t[l]={year:parseInt(n),month:parseInt(a)-1,dates:[]}),t[l].dates.push(r)}),Object.values(t)};function Hm({eventDates:e=[],availability:t={},onAvailabilityChange:r,participantName:n="",readOnly:a=!1,viewMode:l="calendar",onViewModeChange:o,showQuickActions:s=!0}){const[c,u]=g.useState(null),v=g.useMemo(()=>[...e].sort((d,p)=>d.localeCompare(p)),[e]);g.useMemo(()=>Wm(v),[v]);const m=g.useCallback(d=>t[d]||le.NONE,[t]),h=g.useCallback(d=>{if(a)return;const p=m(d),S=(xl.indexOf(p)+1)%xl.length,z=xl[S];r==null||r({...t,[d]:z})},[a,m,t,r]),y=g.useCallback((d,p)=>{a||r==null||r({...t,[d]:p})},[a,t,r]),x=g.useCallback(d=>{if(a)return;const p={};v.forEach(k=>{p[k]=d}),r==null||r(p)},[a,v,r]),w=g.useMemo(()=>{const d={[le.AVAILABLE]:0,[le.FLEXIBLE]:0,[le.UNAVAILABLE]:0,[le.NONE]:0};return v.forEach(p=>{const k=m(p);d[k]++}),d},[v,m]),_=d=>{const p=m(d),k=Rs(d),S=p?Or[p]:null;return i.jsxs("div",{className:`vote-cell ${(S==null?void 0:S.colorClass)||"state--none"} ${a?"vote-cell--readonly":""}`,onClick:()=>h(d),onMouseEnter:()=>u(d),onMouseLeave:()=>u(null),role:"button","aria-label":`${k.full}: ${(S==null?void 0:S.label)||"Sin respuesta"}`,"aria-pressed":!!p,tabIndex:a?-1:0,onKeyDown:z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),h(d))},children:[i.jsxs("div",{className:"vote-cell__date",children:[i.jsx("span",{className:"vote-cell__weekday",children:k.weekday}),i.jsx("span",{className:"vote-cell__day",children:k.day}),i.jsx("span",{className:"vote-cell__month",children:k.month})]}),i.jsx("div",{className:"vote-cell__indicator",children:S?i.jsx("span",{className:"vote-cell__icon",children:S.icon}):i.jsx("span",{className:"vote-cell__empty",children:"-"})}),!a&&c===d&&i.jsx("div",{className:"vote-cell__hint",children:"Click para cambiar"})]},d)},f=d=>{var S,z,P;const p=m(d),k=Rs(d);return i.jsxs("div",{className:"vote-list-row",children:[i.jsxs("div",{className:"vote-list-row__date",children:[i.jsx("span",{className:"vote-list-row__weekday",children:k.weekday}),i.jsx("span",{className:"vote-list-row__full",children:k.full})]}),!a&&i.jsx("div",{className:"vote-list-row__actions",children:Object.entries(Or).map(([L,U])=>i.jsxs("button",{className:`vote-state-btn ${U.colorClass} ${p===L?"active":""}`,onClick:()=>y(d,L),"aria-label":U.label,"aria-pressed":p===L,children:[i.jsx("span",{className:"vote-state-btn__icon",children:U.icon}),i.jsx("span",{className:"vote-state-btn__label",children:U.label})]},L))}),a&&i.jsxs("div",{className:`vote-list-row__status ${((S=Or[p])==null?void 0:S.colorClass)||""}`,children:[((z=Or[p])==null?void 0:z.icon)||"-",i.jsx("span",{children:((P=Or[p])==null?void 0:P.label)||"Sin respuesta"})]})]},d)};return i.jsxs("div",{className:"voting-calendar",children:[i.jsxs("div",{className:"voting-header",children:[i.jsx("div",{className:"voting-header__left",children:n&&i.jsxs("span",{className:"voting-participant",children:["Votando como: ",i.jsx("strong",{children:n})]})}),i.jsx("div",{className:"voting-header__right",children:i.jsxs("div",{className:"toggle-group",children:[i.jsx("button",{className:`toggle-btn ${l==="calendar"?"active":""}`,onClick:()=>o==null?void 0:o("calendar"),children:"📅 Calendario"}),i.jsx("button",{className:`toggle-btn ${l==="list"?"active":""}`,onClick:()=>o==null?void 0:o("list"),children:"📋 Lista"})]})})]}),s&&!a&&i.jsxs("div",{className:"voting-quick-actions",children:[i.jsx("span",{className:"voting-quick-label",children:"Acciones rápidas:"}),i.jsxs("div",{className:"voting-quick-buttons",children:[i.jsx($,{variant:"ghost",size:"sm",onClick:()=>x(le.AVAILABLE),icon:"✓",children:"Todo disponible"}),i.jsx($,{variant:"ghost",size:"sm",onClick:()=>x(le.FLEXIBLE),icon:"~",children:"Todo flexible"}),i.jsx($,{variant:"ghost",size:"sm",onClick:()=>x(le.UNAVAILABLE),icon:"✕",children:"Todo no disponible"}),i.jsx($,{variant:"ghost",size:"sm",onClick:()=>x(le.NONE),icon:"↺",children:"Limpiar"})]})]}),i.jsxs("div",{className:"voting-legend",children:[i.jsxs("div",{className:"legend",children:[i.jsxs("div",{className:"legend-item",children:[i.jsx("div",{className:"legend-color legend-color--available"}),i.jsx("span",{children:"Disponible"})]}),i.jsxs("div",{className:"legend-item",children:[i.jsx("div",{className:"legend-color legend-color--flexible"}),i.jsx("span",{children:"Quizás"})]}),i.jsxs("div",{className:"legend-item",children:[i.jsx("div",{className:"legend-color legend-color--unavailable"}),i.jsx("span",{children:"No disponible"})]})]}),!a&&i.jsx("p",{className:"voting-hint",children:"💡 Hacé click en cada fecha para cambiar tu disponibilidad"})]}),l==="calendar"&&i.jsx("div",{className:"voting-grid",children:v.map(d=>_(d))}),l==="list"&&i.jsx("div",{className:"voting-list",children:v.map(d=>f(d))}),i.jsxs("div",{className:"voting-summary",children:[i.jsxs("div",{className:"voting-summary__item state--available",children:[i.jsx("span",{className:"voting-summary__count",children:w[le.AVAILABLE]}),i.jsx("span",{className:"voting-summary__label",children:"Disponible"})]}),i.jsxs("div",{className:"voting-summary__item state--flexible",children:[i.jsx("span",{className:"voting-summary__count",children:w[le.FLEXIBLE]}),i.jsx("span",{className:"voting-summary__label",children:"Quizás"})]}),i.jsxs("div",{className:"voting-summary__item state--unavailable",children:[i.jsx("span",{className:"voting-summary__count",children:w[le.UNAVAILABLE]}),i.jsx("span",{className:"voting-summary__label",children:"No disponible"})]}),i.jsxs("div",{className:"voting-summary__item state--none",children:[i.jsx("span",{className:"voting-summary__count",children:w[le.NONE]}),i.jsx("span",{className:"voting-summary__label",children:"Sin respuesta"})]})]}),i.jsx("style",{children:`
        .voting-calendar {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
        }
        
        .voting-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        
        .voting-participant {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .voting-quick-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }
        
        .voting-quick-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        
        .voting-quick-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        
        .voting-legend {
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .voting-hint {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-top: var(--space-3);
        }
        
        /* Calendar grid view */
        .voting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        
        .vote-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-border-default);
          background: var(--color-bg-tertiary);
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
        }
        
        .vote-cell:hover:not(.vote-cell--readonly) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .vote-cell--readonly {
          cursor: default;
        }
        
        .vote-cell__date {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: var(--space-2);
        }
        
        .vote-cell__weekday {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          text-transform: uppercase;
        }
        
        .vote-cell__day {
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1;
        }
        
        .vote-cell__month {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .vote-cell__indicator {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          font-size: var(--text-lg);
          font-weight: 600;
        }
        
        .vote-cell__empty {
          color: var(--color-text-tertiary);
        }
        
        .vote-cell__hint {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          white-space: nowrap;
        }
        
        /* State colors */
        .state--none .vote-cell__indicator {
          background: var(--color-bg-secondary);
        }
        
        .state--available {
          border-color: var(--color-available);
          background: var(--color-available-bg);
        }
        
        .state--available .vote-cell__indicator {
          background: var(--color-available);
          color: white;
        }
        
        .state--flexible {
          border-color: var(--color-flexible);
          background: var(--color-flexible-bg);
        }
        
        .state--flexible .vote-cell__indicator {
          background: var(--color-flexible);
          color: white;
        }
        
        .state--unavailable {
          border-color: var(--color-unavailable);
          background: var(--color-unavailable-bg);
        }
        
        .state--unavailable .vote-cell__indicator {
          background: var(--color-unavailable);
          color: white;
        }
        
        /* List view */
        .voting-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }
        
        .vote-list-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          gap: var(--space-3);
        }
        
        .vote-list-row__date {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .vote-list-row__weekday {
          font-weight: 600;
          color: var(--color-accent-primary);
          width: 40px;
        }
        
        .vote-list-row__full {
          color: var(--color-text-primary);
        }
        
        .vote-list-row__actions {
          display: flex;
          gap: var(--space-2);
        }
        
        .vote-list-row__status {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 500;
        }
        
        .vote-state-btn {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border-default);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .vote-state-btn:hover {
          background: var(--color-bg-tertiary);
        }
        
        .vote-state-btn.active {
          border-color: currentColor;
        }
        
        .vote-state-btn.state--available.active {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .vote-state-btn.state--flexible.active {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .vote-state-btn.state--unavailable.active {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .vote-state-btn__label {
          display: none;
        }
        
        /* Summary */
        .voting-summary {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .voting-summary__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
        }
        
        .voting-summary__count {
          font-size: var(--text-xl);
          font-weight: 700;
        }
        
        .voting-summary__label {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .voting-summary__item.state--available {
          background: var(--color-available-bg);
        }
        
        .voting-summary__item.state--available .voting-summary__count {
          color: var(--color-available);
        }
        
        .voting-summary__item.state--flexible {
          background: var(--color-flexible-bg);
        }
        
        .voting-summary__item.state--flexible .voting-summary__count {
          color: var(--color-flexible);
        }
        
        .voting-summary__item.state--unavailable {
          background: var(--color-unavailable-bg);
        }
        
        .voting-summary__item.state--unavailable .voting-summary__count {
          color: var(--color-unavailable);
        }
        
        @media (max-width: 640px) {
          .voting-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .vote-list-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .vote-list-row__actions {
            justify-content: space-between;
          }
          
          .vote-state-btn__label {
            display: inline;
          }
          
          .voting-summary {
            flex-wrap: wrap;
            gap: var(--space-2);
          }
          
          .voting-quick-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .voting-quick-buttons {
            justify-content: center;
          }
        }
      `})]})}function id({eventId:e,participantName:t="Anónimo",isAdmin:r=!1}){const n=Ba(),[a,l]=g.useState([]),[o,s]=g.useState(""),[c,u]=g.useState(!1),[v,m]=g.useState(!0),h=g.useCallback(async()=>{try{const _=await fetch(`/api/events/${e}/comments`);if(_.ok){const f=await _.json();l(f)}}catch(_){console.error("Error fetching comments:",_)}finally{m(!1)}},[e]);g.useEffect(()=>{h()},[h]);const y=async _=>{_.preventDefault();const f=o.trim();if(f){u(!0);try{const d=await fetch(`/api/events/${e}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({author:t,content:f})});if(!d.ok)throw new Error("Error al enviar comentario");const p=await d.json();l(k=>[...k,p]),s(""),n.success("Comentario agregado")}catch(d){console.error("Error:",d),n.error("Error al enviar el comentario")}finally{u(!1)}}},x=async _=>{if(confirm("¿Eliminar este comentario?"))try{if(!(await fetch(`/api/events/${e}/comments/${_}`,{method:"DELETE"})).ok)throw new Error("Error al eliminar comentario");l(d=>d.filter(p=>p.id!==_)),n.success("Comentario eliminado")}catch(f){console.error("Error:",f),n.error("Error al eliminar el comentario")}},w=_=>new Date(_).toLocaleDateString("es-AR",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});return i.jsxs("section",{className:"comments-section card",children:[i.jsxs("h3",{className:"comments-title",children:["💬 Comentarios ",a.length>0&&`(${a.length})`]}),i.jsx("div",{className:"comments-list",children:v?i.jsx("p",{className:"comments-empty",children:"Cargando comentarios..."}):a.length===0?i.jsx("p",{className:"comments-empty",children:"No hay comentarios todavía. ¡Sé el primero en comentar!"}):a.map(_=>i.jsxs("div",{className:"comment",children:[i.jsxs("div",{className:"comment__header",children:[i.jsx("span",{className:"comment__avatar",children:_.author.charAt(0).toUpperCase()}),i.jsx("span",{className:"comment__author",children:_.author}),i.jsx("span",{className:"comment__date",children:w(_.created_at)}),r&&i.jsx("button",{className:"comment__delete",onClick:()=>x(_.id),"aria-label":"Eliminar comentario",children:"🗑️"})]}),i.jsx("p",{className:"comment__content",children:_.content})]},_.id))}),i.jsxs("form",{className:"comment-form",onSubmit:y,children:[i.jsx("div",{className:"comment-form__input-wrapper",children:i.jsx("textarea",{className:"form-input form-textarea",placeholder:`Comentar como ${t}...`,value:o,onChange:_=>s(_.target.value),rows:2,maxLength:500})}),i.jsxs("div",{className:"comment-form__actions",children:[i.jsxs("span",{className:"comment-form__counter",children:[o.length,"/500"]}),i.jsx($,{type:"submit",variant:"primary",size:"sm",disabled:!o.trim()||c,loading:c,children:"Enviar"})]})]}),i.jsx("style",{children:`
        .comments-section {
          margin-bottom: var(--space-6);
        }
        
        .comments-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
        }
        
        .comments-list {
          margin-bottom: var(--space-4);
          max-height: 400px;
          overflow-y: auto;
        }
        
        .comments-empty {
          text-align: center;
          color: var(--color-text-tertiary);
          padding: var(--space-6);
          font-size: var(--text-sm);
        }
        
        .comment {
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-3);
        }
        
        .comment:last-child {
          margin-bottom: 0;
        }
        
        .comment__header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
        }
        
        .comment__avatar {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }
        
        .comment__author {
          font-weight: 600;
          font-size: var(--text-sm);
        }
        
        .comment__date {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
          margin-left: auto;
        }
        
        .comment__delete {
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity var(--transition-fast);
        }
        
        .comment__delete:hover {
          opacity: 1;
        }
        
        .comment__content {
          font-size: var(--text-sm);
          color: var(--color-text-primary);
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .comment-form {
          border-top: 1px solid var(--color-border-subtle);
          padding-top: var(--space-4);
        }
        
        .comment-form__input-wrapper {
          margin-bottom: var(--space-2);
        }
        
        .comment-form__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .comment-form__counter {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
      `})]})}function Qm(){var B,Q;const{id:e}=po(),t=kn(),r=Ba(),[n,a]=g.useState(null),[l,o]=g.useState(!0),[s,c]=g.useState(null),[u,v]=g.useState(""),[m,h]=g.useState(!1),[y,x]=g.useState(!1),[w,_]=g.useState(""),[f,d]=g.useState({}),[p,k]=g.useState("calendar"),[S,z]=g.useState(!1),[P,L]=g.useState(!1);g.useEffect(()=>{const b=localStorage.getItem(`eventually_participant_${e}`);if(b){const{name:j,availability:C}=JSON.parse(b);v(j),d(C||{}),h(!0),L(!0)}else x(!0)},[e]),g.useEffect(()=>{if(n&&n.dates&&!P&&Object.keys(f).length===0){const b={};n.dates.forEach(j=>{b[j]="available"}),d(b)}},[n,P]),g.useEffect(()=>{(async()=>{try{const j=await fetch(`/api/events/${e}`);if(!j.ok){if(j.status===404)c("Evento no encontrado");else throw new Error("Error al cargar el evento");return}const C=await j.json();a(C)}catch(j){console.error("Error:",j),c("Error al cargar el evento")}finally{o(!1)}})()},[e]);const U=()=>{var j;const b=u.trim();if(!b){_("Ingresá tu nombre para votar");return}if(b.length<2){_("El nombre debe tener al menos 2 caracteres");return}if((j=n==null?void 0:n.participants)!=null&&j.some(C=>C.name.toLowerCase()===b.toLowerCase())){const C=n.participants.find(D=>D.name.toLowerCase()===b.toLowerCase());if(C!=null&&C.availability){const D={};C.availability.forEach(I=>{D[I.date]=I.status}),d(D),L(!0)}}h(!0),x(!1),_(""),r.info(`Hola ${b}! Marcá tu disponibilidad`)},M=async()=>{var C;const b=Object.entries(f).filter(([D,I])=>I!==null),j=((C=n==null?void 0:n.dates)==null?void 0:C.length)||0;if(b.length<j){const D=j-b.length;r.error(`Tenés que votar en todas las fechas. Faltan ${D} fecha(s).`);return}z(!0);try{if(!(await fetch(`/api/events/${e}/vote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:u.trim(),availability:b.map(([Pe,J])=>({date:Pe,status:J}))})})).ok)throw new Error("Error al guardar el voto");localStorage.setItem(`eventually_participant_${e}`,JSON.stringify({name:u.trim(),availability:f,eventTitle:n==null?void 0:n.title,votedAt:new Date().toISOString()})),L(!0),r.success("¡Tu voto fue guardado!");const W=await(await fetch(`/api/events/${e}`)).json();a(W)}catch(D){console.error("Error:",D),r.error("Error al guardar el voto. Intentá de nuevo.")}finally{z(!1)}},re=()=>{v("Anónimo"),h(!0),x(!1)},ze=b=>{if(!(n!=null&&n.participants)||n.participants.length===0)return{available:0,flexible:0,unavailable:0,percentage:0};let j=0,C=0,D=0;n.participants.forEach(Pe=>{var E;const J=(E=Pe.availability)==null?void 0:E.find(R=>R.date===b);(J==null?void 0:J.status)==="available"?j++:(J==null?void 0:J.status)==="flexible"?C++:(J==null?void 0:J.status)==="unavailable"&&D++});const I=n.participants.length,W=Math.round((j+C*.5)/I*100);return{available:j,flexible:C,unavailable:D,percentage:W}},je=b=>{const[j,C,D]=b.split("-").map(Number);return new Date(j,C-1,D).toLocaleDateString("es-AR",{weekday:"short",day:"numeric",month:"short"})},O=()=>!(n!=null&&n.dates)||!(n!=null&&n.participants)?[]:n.dates.map(b=>{const j=ze(b);return{date:b,...j,score:j.available*3+j.flexible-j.unavailable*2}}).sort((b,j)=>j.score-b.score);return l?i.jsx("div",{className:"page event-page",children:i.jsxs("div",{className:"container container--medium",children:[i.jsxs("div",{className:"event-header",children:[i.jsx(_r,{variant:"title",width:"60%"}),i.jsx(_r,{variant:"text",width:"40%"})]}),i.jsx(mo,{})]})}):s?i.jsx("div",{className:"page event-page",children:i.jsx("div",{className:"container container--narrow",children:i.jsxs("div",{className:"error-card card",children:[i.jsx("div",{className:"error-icon",children:"😕"}),i.jsx("h2",{children:"Evento no encontrado"}),i.jsx("p",{children:"Este evento no existe o el link es incorrecto."}),i.jsx($,{variant:"primary",onClick:()=>t("/"),children:"Volver al inicio"})]})})}):i.jsxs("div",{className:"page event-page",children:[i.jsxs(Kr,{isOpen:y,onClose:()=>{},title:"¿Cómo te llamás?",sheet:!0,footer:i.jsxs("div",{className:"name-modal-footer",children:[i.jsx($,{variant:"ghost",onClick:re,children:"Votar anónimo"}),i.jsx($,{variant:"primary",onClick:U,children:"Continuar"})]}),children:[i.jsx(Zn,{placeholder:"Tu nombre",value:u,onChange:b=>{v(b.target.value),_("")},error:w,autoFocus:!0,onKeyDown:b=>{b.key==="Enter"&&U()}}),i.jsx("p",{className:"name-modal-hint",children:"Así sabrán quién votó cada fecha"})]}),i.jsxs("div",{className:"container container--medium",children:[i.jsxs("header",{className:"event-header",style:{"--theme-color":n.theme_color||"#6366f1"},children:[i.jsxs("div",{className:"event-header__top",children:[i.jsx("button",{className:"event-back-btn",onClick:()=>t("/"),children:"← Inicio"}),P&&i.jsx("span",{className:"badge badge--success",children:"✓ Ya votaste"})]}),i.jsx("h1",{className:"event-title",children:n.title}),n.description&&i.jsx("p",{className:"event-description",children:n.description}),i.jsxs("div",{className:"event-meta",children:[n.location&&i.jsxs("span",{className:"event-meta__item",children:["📍 ",n.location]}),i.jsxs("span",{className:"event-meta__item",children:["👤 Organizado por ",n.organizer_name||"Organizador"]}),i.jsxs("span",{className:"event-meta__item",children:["📅 ",((B=n.dates)==null?void 0:B.length)||0," fechas posibles"]})]})]}),m&&i.jsxs("section",{className:"event-voting animate-fade-in-up",children:[!P&&i.jsxs("div",{className:"prepopulated-notice",children:[i.jsx("span",{className:"prepopulated-notice__icon",children:"💡"}),i.jsxs("div",{children:[i.jsx("strong",{children:'Todos los días están marcados como "Disponible"'}),i.jsx("p",{children:"Cambiá los que no te sirvan. Tenés que votar en todas las fechas."})]})]}),i.jsx(Hm,{eventDates:n.dates||[],availability:f,onAvailabilityChange:d,participantName:u,viewMode:p,onViewModeChange:k,showQuickActions:!0}),i.jsxs("div",{className:"voting-submit",children:[i.jsx($,{variant:"success",size:"lg",onClick:M,loading:S,disabled:S,fullWidth:!0,children:S?"Guardando...":P?"Actualizar mi voto":"Guardar mi voto"}),m&&i.jsxs("button",{className:"change-name-btn",onClick:()=>x(!0),children:["Cambiar nombre (",u,")"]})]})]}),n.participants&&n.participants.length>0&&i.jsxs("section",{className:"event-results card animate-fade-in-up",children:[i.jsx("h3",{className:"section-title",children:"🎯 Resultados de la votación"}),i.jsx("p",{className:"section-subtitle",children:"Disponibilidad de todos los participantes"}),i.jsx("div",{className:"matrix-scroll",children:i.jsxs("table",{className:"availability-matrix",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{className:"matrix-header-name",children:"Participante"}),(Q=n.dates)==null?void 0:Q.sort().map(b=>i.jsx("th",{className:"matrix-header-date",children:i.jsx("div",{className:"matrix-date",children:je(b)})},b))]})}),i.jsx("tbody",{children:n.participants.map((b,j)=>{var C;return i.jsxs("tr",{className:b.name===u?"matrix-row--current":"",children:[i.jsxs("td",{className:"matrix-name",children:[i.jsx("span",{className:"matrix-avatar",children:b.name.charAt(0).toUpperCase()}),b.name,b.name===u&&i.jsx("span",{className:"matrix-you",children:"(vos)"})]}),(C=n.dates)==null?void 0:C.sort().map(D=>{var Pe;const I=(Pe=b.availability)==null?void 0:Pe.find(J=>J.date===D),W=(I==null?void 0:I.status)||"none";return i.jsxs("td",{className:`matrix-cell matrix-cell--${W}`,children:[W==="available"&&"✓",W==="flexible"&&"~",W==="unavailable"&&"✕",W==="none"&&"-"]},D)})]},j)})})]})}),i.jsxs("div",{className:"best-dates-section",children:[i.jsx("h4",{className:"best-dates-title",children:"🏆 Mejores fechas"}),i.jsx("div",{className:"best-dates-list",children:O().slice(0,3).map((b,j)=>i.jsxs("div",{className:`best-date-item ${j===0?"best-date-item--winner":""}`,children:[i.jsx("span",{className:"best-date-medal",children:j===0?"🥇":j===1?"🥈":"🥉"}),i.jsxs("div",{className:"best-date-info",children:[i.jsx("span",{className:"best-date-name",children:je(b.date)}),i.jsxs("span",{className:"best-date-stats",children:["✓ ",b.available," disponibles",b.flexible>0&&` · ~ ${b.flexible} quizás`]})]}),i.jsxs("span",{className:"best-date-percent",children:[b.percentage,"%"]})]},b.date))})]})]}),n.participants&&n.participants.length>0&&i.jsxs("section",{className:"event-participants card animate-fade-in-up",children:[i.jsxs("h3",{className:"section-title",children:["Participantes (",n.participants.length,")"]}),i.jsx("div",{className:"participants-list",children:n.participants.map((b,j)=>i.jsxs("div",{className:`participant-item ${b.name===u?"participant-item--current":""}`,children:[i.jsx("span",{className:"participant-avatar",children:b.name.charAt(0).toUpperCase()}),i.jsx("span",{className:"participant-name",children:b.name}),b.name===u&&i.jsx("span",{className:"badge badge--info",children:"Vos"})]},j))})]}),i.jsx(id,{eventId:e,participantName:u})]}),i.jsx("style",{children:`
        .event-page {
          padding: var(--space-6) 0;
        }
        
        .event-header {
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .event-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .event-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
          padding: var(--space-2) 0;
        }
        
        .event-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .event-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-3);
          color: var(--theme-color, var(--color-accent-primary));
        }
        
        .event-description {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
        
        .event-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .event-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .event-voting {
          margin-bottom: var(--space-6);
        }
        
        .voting-submit {
          margin-top: var(--space-4);
          text-align: center;
        }
        
        .change-name-btn {
          background: none;
          border: none;
          color: var(--color-text-tertiary);
          font-size: var(--text-sm);
          cursor: pointer;
          margin-top: var(--space-2);
        }
        
        .change-name-btn:hover {
          color: var(--color-accent-primary);
          text-decoration: underline;
        }
        
        .event-participants {
          margin-bottom: var(--space-6);
        }
        
        .section-title {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
        }
        
        .participants-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        
        .participant-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-full);
        }
        
        .participant-item--current {
          background: var(--color-accent-primary-subtle);
        }
        
        .participant-avatar {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }
        
        .participant-name {
          font-size: var(--text-sm);
          font-weight: 500;
        }
        
        .name-modal-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        
        .name-modal-hint {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-top: var(--space-2);
          text-align: center;
        }
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        .error-card h2 {
          margin-bottom: var(--space-2);
        }
        
        .error-card p {
          margin-bottom: var(--space-6);
        }
        
        /* Pre-populated notice */
        .prepopulated-notice {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }
        
        .prepopulated-notice__icon {
          font-size: var(--text-xl);
        }
        
        .prepopulated-notice strong {
          display: block;
          margin-bottom: var(--space-1);
          color: var(--color-success);
        }
        
        .prepopulated-notice p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }
        
        /* Results section */
        .event-results {
          margin-bottom: var(--space-6);
        }
        
        .section-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          margin-bottom: var(--space-4);
        }
        
        /* Availability Matrix */
        .matrix-scroll {
          overflow-x: auto;
          margin-bottom: var(--space-6);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-lg);
        }
        
        .availability-matrix {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        
        .matrix-header-name {
          text-align: left;
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          font-weight: 600;
          position: sticky;
          left: 0;
          z-index: 1;
        }
        
        .matrix-header-date {
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-tertiary);
          min-width: 70px;
          text-align: center;
        }
        
        .matrix-date {
          font-size: var(--text-xs);
          text-transform: capitalize;
          font-weight: 500;
        }
        
        .matrix-row--current {
          background: var(--color-accent-primary-subtle);
        }
        
        .matrix-name {
          padding: var(--space-3);
          background: var(--color-bg-secondary);
          position: sticky;
          left: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .matrix-row--current .matrix-name {
          background: var(--color-accent-primary-subtle);
        }
        
        .matrix-avatar {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .matrix-you {
          font-size: var(--text-xs);
          color: var(--color-accent-primary);
          margin-left: var(--space-1);
        }
        
        .matrix-cell {
          text-align: center;
          padding: var(--space-2);
          font-weight: 600;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .matrix-cell--available {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .matrix-cell--flexible {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .matrix-cell--unavailable {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .matrix-cell--none {
          color: var(--color-text-tertiary);
        }
        
        /* Best Dates */
        .best-dates-section {
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }
        
        .best-dates-title {
          font-size: var(--text-base);
          margin-bottom: var(--space-3);
        }
        
        .best-dates-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        
        .best-date-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .best-date-item--winner {
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
        }
        
        .best-date-medal {
          font-size: var(--text-xl);
        }
        
        .best-date-info {
          flex: 1;
        }
        
        .best-date-name {
          font-weight: 600;
          display: block;
          text-transform: capitalize;
        }
        
        .best-date-stats {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .best-date-percent {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-success);
        }
        
        .best-date-item--winner .best-date-percent {
          color: var(--color-success);
        }
        
        @media (max-width: 640px) {
          .event-page {
            padding: var(--space-4) 0;
          }
          
          .event-title {
            font-size: var(--text-2xl);
          }
          
          .event-meta {
            flex-direction: column;
            gap: var(--space-2);
          }
          
          .result-date-item {
            flex-wrap: wrap;
          }
          
          .result-date-bar {
            width: 100%;
            order: 3;
          }
        }
      `})]})}function Ym(){var M,re,ze,je;const{adminId:e}=po(),t=kn(),r=Ba(),[n,a]=g.useState(null),[l,o]=g.useState(!0),[s,c]=g.useState(null),[u,v]=g.useState(!1),[m,h]=g.useState(!1),[y,x]=g.useState(!1),[w,_]=g.useState(!1),[f,d]=g.useState(!1);g.useEffect(()=>{(async()=>{try{const B=await fetch(`/api/admin/${e}`);if(!B.ok){if(B.status===404)c("Evento no encontrado");else throw new Error("Error al cargar el evento");return}const Q=await B.json();a(Q)}catch(B){console.error("Error:",B),c("Error al cargar el evento")}finally{o(!1)}})()},[e]);const p=g.useMemo(()=>{if(!n)return{};const O=window.location.origin;return{participant:`${O}/event/${n.id}`,readonly:`${O}/readonly/${n.id}`,admin:`${O}/admin/${e}`}},[n,e]),k=async(O,B)=>{try{await navigator.clipboard.writeText(O),r.success(`Link ${B} copiado!`)}catch{const b=document.createElement("textarea");b.value=O,document.body.appendChild(b),b.select(),document.execCommand("copy"),document.body.removeChild(b),r.success(`Link ${B} copiado!`)}},S=(O,B)=>{const Q=encodeURIComponent(`${B}

${O}`);window.open(`https://wa.me/?text=${Q}`,"_blank")},z=async()=>{_(!0);try{if(!(await fetch(`/api/admin/${e}`,{method:"DELETE"})).ok)throw new Error("Error al eliminar");r.success("Evento eliminado"),t("/")}catch(O){console.error("Error:",O),r.error("Error al eliminar el evento")}finally{_(!1),h(!1)}},P=async()=>{d(!0);try{const O=await fetch(`/api/admin/${e}/duplicate`,{method:"POST"});if(!O.ok)throw new Error("Error al duplicar");const B=await O.json();r.success("Evento duplicado!"),t(`/admin/${B.admin_id}`)}catch(O){console.error("Error:",O),r.error("Error al duplicar el evento")}finally{d(!1),x(!1)}},L=g.useMemo(()=>{var B;if(!(n!=null&&n.participants)||n.participants.length===0)return[];const O={};return(B=n.dates)==null||B.forEach(Q=>{O[Q]={available:0,flexible:0,unavailable:0,total:n.participants.length}}),n.participants.forEach(Q=>{var b;(b=Q.availability)==null||b.forEach(({date:j,status:C})=>{O[j]&&(C==="available"?O[j].available++:C==="flexible"?O[j].flexible++:C==="unavailable"&&O[j].unavailable++)})}),Object.entries(O).map(([Q,b])=>({date:Q,...b,score:b.available*3+b.flexible*1-b.unavailable*2,percentage:Math.round((b.available+b.flexible*.5)/b.total*100)})).sort((Q,b)=>b.score-Q.score)},[n]),U=O=>{const[B,Q,b]=O.split("-").map(Number);return new Date(B,Q-1,b).toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})};return l?i.jsx("div",{className:"page admin-page",children:i.jsxs("div",{className:"container container--medium",children:[i.jsx("div",{className:"admin-header",children:i.jsx(_r,{variant:"title",width:"60%"})}),i.jsx(mo,{})]})}):s?i.jsx("div",{className:"page admin-page",children:i.jsx("div",{className:"container container--narrow",children:i.jsxs("div",{className:"error-card card",children:[i.jsx("div",{className:"error-icon",children:"😕"}),i.jsx("h2",{children:"Evento no encontrado"}),i.jsx("p",{children:"Este link de administrador no es válido."}),i.jsx($,{variant:"primary",onClick:()=>t("/"),children:"Volver al inicio"})]})})}):i.jsxs("div",{className:"page admin-page",children:[i.jsx(Kr,{isOpen:u,onClose:()=>v(!1),title:"Compartir evento",size:"md",children:i.jsxs("div",{className:"share-links",children:[i.jsxs("div",{className:"share-link-item",children:[i.jsxs("div",{className:"share-link-header",children:[i.jsx("span",{className:"share-link-icon",children:"🔗"}),i.jsxs("div",{children:[i.jsx("h4",{children:"Link para participantes"}),i.jsx("p",{children:"Compartí este link para que voten"})]})]}),i.jsxs("div",{className:"share-link-actions",children:[i.jsx("input",{type:"text",value:p.participant,readOnly:!0,className:"form-input"}),i.jsx($,{variant:"secondary",size:"sm",onClick:()=>k(p.participant,"de participantes"),children:"Copiar"}),i.jsx($,{variant:"primary",size:"sm",onClick:()=>S(p.participant,`¡Hola! Te invito a votar en "${n.title}". Marcá tu disponibilidad:`),children:"WhatsApp"})]})]}),i.jsxs("div",{className:"share-link-item",children:[i.jsxs("div",{className:"share-link-header",children:[i.jsx("span",{className:"share-link-icon",children:"👁️"}),i.jsxs("div",{children:[i.jsx("h4",{children:"Link de solo lectura"}),i.jsx("p",{children:"Para ver resultados sin votar"})]})]}),i.jsxs("div",{className:"share-link-actions",children:[i.jsx("input",{type:"text",value:p.readonly,readOnly:!0,className:"form-input"}),i.jsx($,{variant:"secondary",size:"sm",onClick:()=>k(p.readonly,"de solo lectura"),children:"Copiar"})]})]}),i.jsxs("div",{className:"share-link-item share-link-item--warning",children:[i.jsxs("div",{className:"share-link-header",children:[i.jsx("span",{className:"share-link-icon",children:"🔐"}),i.jsxs("div",{children:[i.jsx("h4",{children:"Link de administrador"}),i.jsx("p",{children:"⚠️ Solo vos deberías tener este link"})]})]}),i.jsxs("div",{className:"share-link-actions",children:[i.jsx("input",{type:"text",value:p.admin,readOnly:!0,className:"form-input"}),i.jsx($,{variant:"secondary",size:"sm",onClick:()=>k(p.admin,"de administrador"),children:"Copiar"})]})]})]})}),i.jsx(Kr,{isOpen:m,onClose:()=>h(!1),title:"¿Eliminar evento?",size:"sm",footer:i.jsxs(i.Fragment,{children:[i.jsx($,{variant:"ghost",onClick:()=>h(!1),children:"Cancelar"}),i.jsx($,{variant:"danger",onClick:z,loading:w,children:"Eliminar"})]}),children:i.jsx("p",{children:"Esta acción no se puede deshacer. Se eliminarán todos los votos y comentarios."})}),i.jsx(Kr,{isOpen:y,onClose:()=>x(!1),title:"¿Duplicar evento?",size:"sm",footer:i.jsxs(i.Fragment,{children:[i.jsx($,{variant:"ghost",onClick:()=>x(!1),children:"Cancelar"}),i.jsx($,{variant:"primary",onClick:P,loading:f,children:"Duplicar"})]}),children:i.jsx("p",{children:"Se creará una copia del evento con las mismas fechas pero sin votos."})}),i.jsxs("div",{className:"container container--medium",children:[i.jsxs("header",{className:"admin-header",children:[i.jsxs("div",{className:"admin-header__top",children:[i.jsx("button",{className:"admin-back-btn",onClick:()=>t("/"),children:"← Inicio"}),i.jsx("span",{className:"badge badge--info",children:"Admin"})]}),i.jsx("h1",{className:"admin-title",children:n.title}),n.description&&i.jsx("p",{className:"admin-description",children:n.description}),i.jsxs("div",{className:"admin-meta",children:[n.location&&i.jsxs("span",{className:"admin-meta__item",children:["📍 ",n.location]}),i.jsxs("span",{className:"admin-meta__item",children:["👥 ",((M=n.participants)==null?void 0:M.length)||0," participantes"]}),i.jsxs("span",{className:"admin-meta__item",children:["📅 ",((re=n.dates)==null?void 0:re.length)||0," fechas"]})]})]}),i.jsxs("div",{className:"admin-actions card",children:[i.jsx("h3",{children:"Acciones"}),i.jsxs("div",{className:"admin-actions__buttons",children:[i.jsx($,{variant:"primary",onClick:()=>v(!0),icon:"🔗",children:"Compartir"}),i.jsx($,{variant:"secondary",onClick:()=>x(!0),icon:"📋",children:"Duplicar"}),i.jsx($,{variant:"danger",onClick:()=>h(!0),icon:"🗑️",children:"Eliminar"})]})]}),i.jsxs("section",{className:"admin-best-dates card",children:[i.jsx("h3",{children:"🎯 Mejores fechas"}),L.length===0||((ze=n.participants)==null?void 0:ze.length)===0?i.jsxs("div",{className:"empty-state",children:[i.jsx("p",{children:"Aún no hay votos. ¡Compartí el link!"}),i.jsx($,{variant:"primary",onClick:()=>v(!0),children:"Compartir evento"})]}):i.jsx("div",{className:"best-dates-list",children:L.slice(0,5).map((O,B)=>i.jsxs("div",{className:`best-date-item ${B===0?"best-date-item--winner":""}`,children:[i.jsx("div",{className:"best-date-rank",children:B===0?"🥇":B===1?"🥈":B===2?"🥉":`#${B+1}`}),i.jsxs("div",{className:"best-date-info",children:[i.jsx("span",{className:"best-date-name",children:U(O.date)}),i.jsxs("div",{className:"best-date-stats",children:[i.jsxs("span",{className:"stat stat--available",children:["✓ ",O.available]}),i.jsxs("span",{className:"stat stat--flexible",children:["~ ",O.flexible]}),i.jsxs("span",{className:"stat stat--unavailable",children:["✕ ",O.unavailable]})]})]}),i.jsxs("div",{className:"best-date-percentage",children:[i.jsx("div",{className:"percentage-bar",style:{"--percentage":`${O.percentage}%`,"--color":O.percentage>70?"var(--color-success)":O.percentage>40?"var(--color-warning)":"var(--color-error)"},children:i.jsx("div",{className:"percentage-fill"})}),i.jsxs("span",{className:"percentage-text",children:[O.percentage,"%"]})]})]},O.date))})]}),n.participants&&n.participants.length>0&&i.jsxs("section",{className:"admin-matrix card",children:[i.jsx("h3",{children:"📊 Matriz de disponibilidad"}),i.jsx("div",{className:"matrix-scroll",children:i.jsxs("table",{className:"availability-matrix",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{className:"matrix-header-name",children:"Participante"}),(je=n.dates)==null?void 0:je.sort().map(O=>i.jsx("th",{className:"matrix-header-date",children:i.jsx("div",{className:"matrix-date",children:U(O).split(" ").slice(0,2).join(" ")})},O))]})}),i.jsx("tbody",{children:n.participants.map((O,B)=>{var Q;return i.jsxs("tr",{children:[i.jsxs("td",{className:"matrix-name",children:[i.jsx("span",{className:"matrix-avatar",children:O.name.charAt(0).toUpperCase()}),O.name]}),(Q=n.dates)==null?void 0:Q.sort().map(b=>{var D;const j=(D=O.availability)==null?void 0:D.find(I=>I.date===b),C=(j==null?void 0:j.status)||"none";return i.jsxs("td",{className:`matrix-cell matrix-cell--${C}`,children:[C==="available"&&"✓",C==="flexible"&&"~",C==="unavailable"&&"✕",C==="none"&&"-"]},b)})]},B)})})]})})]}),i.jsx(id,{eventId:n.id,participantName:"Admin",isAdmin:!0})]}),i.jsx("style",{children:`
        .admin-page {
          padding: var(--space-6) 0;
        }
        
        .admin-header {
          margin-bottom: var(--space-6);
        }
        
        .admin-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .admin-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
        }
        
        .admin-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .admin-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .admin-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }
        
        .admin-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .admin-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .admin-actions {
          margin-bottom: var(--space-6);
        }
        
        .admin-actions h3 {
          margin-bottom: var(--space-4);
        }
        
        .admin-actions__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        
        /* Share Links */
        .share-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .share-link-item {
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .share-link-item--warning {
          background: var(--color-warning-bg);
          border: 1px solid var(--color-warning-border);
        }
        
        .share-link-header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        
        .share-link-icon {
          font-size: var(--text-xl);
        }
        
        .share-link-header h4 {
          font-size: var(--text-sm);
          margin-bottom: var(--space-1);
        }
        
        .share-link-header p {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
        
        .share-link-actions {
          display: flex;
          gap: var(--space-2);
        }
        
        .share-link-actions .form-input {
          flex: 1;
          font-size: var(--text-xs);
        }
        
        /* Best Dates */
        .admin-best-dates {
          margin-bottom: var(--space-6);
        }
        
        .admin-best-dates h3 {
          margin-bottom: var(--space-4);
        }
        
        .empty-state {
          text-align: center;
          padding: var(--space-8);
        }
        
        .empty-state p {
          margin-bottom: var(--space-4);
        }
        
        .best-dates-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .best-date-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .best-date-item--winner {
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
        }
        
        .best-date-rank {
          font-size: var(--text-xl);
          min-width: 40px;
          text-align: center;
        }
        
        .best-date-info {
          flex: 1;
        }
        
        .best-date-name {
          font-weight: 500;
          display: block;
          margin-bottom: var(--space-1);
        }
        
        .best-date-stats {
          display: flex;
          gap: var(--space-3);
          font-size: var(--text-xs);
        }
        
        .stat--available { color: var(--color-available); }
        .stat--flexible { color: var(--color-flexible); }
        .stat--unavailable { color: var(--color-unavailable); }
        
        .best-date-percentage {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-width: 100px;
        }
        
        .percentage-bar {
          flex: 1;
          height: 8px;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .percentage-fill {
          height: 100%;
          width: var(--percentage);
          background: var(--color);
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }
        
        .percentage-text {
          font-size: var(--text-sm);
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }
        
        /* Matrix */
        .admin-matrix {
          margin-bottom: var(--space-6);
        }
        
        .admin-matrix h3 {
          margin-bottom: var(--space-4);
        }
        
        .matrix-scroll {
          overflow-x: auto;
        }
        
        .availability-matrix {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        
        .matrix-header-name {
          text-align: left;
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          position: sticky;
          left: 0;
          z-index: 1;
        }
        
        .matrix-header-date {
          padding: var(--space-2);
          background: var(--color-bg-tertiary);
          min-width: 80px;
        }
        
        .matrix-date {
          font-size: var(--text-xs);
          text-transform: capitalize;
        }
        
        .matrix-name {
          padding: var(--space-3);
          background: var(--color-bg-secondary);
          position: sticky;
          left: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .matrix-avatar {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }
        
        .matrix-cell {
          text-align: center;
          padding: var(--space-2);
          font-weight: 600;
        }
        
        .matrix-cell--available {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .matrix-cell--flexible {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .matrix-cell--unavailable {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .matrix-cell--none {
          color: var(--color-text-tertiary);
        }
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        @media (max-width: 640px) {
          .admin-page {
            padding: var(--space-4) 0;
          }
          
          .admin-title {
            font-size: var(--text-2xl);
          }
          
          .admin-actions__buttons {
            flex-direction: column;
          }
          
          .admin-actions__buttons .btn {
            width: 100%;
          }
          
          .share-link-actions {
            flex-direction: column;
          }
          
          .best-date-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .best-date-percentage {
            width: 100%;
          }
        }
      `})]})}function Xm(){var v,m,h;const{id:e}=po(),t=kn(),[r,n]=g.useState(null),[a,l]=g.useState(!0),[o,s]=g.useState(null);g.useEffect(()=>{(async()=>{try{const x=await fetch(`/api/events/${e}`);if(!x.ok){if(x.status===404)s("Evento no encontrado");else throw new Error("Error al cargar el evento");return}const w=await x.json();n(w)}catch(x){console.error("Error:",x),s("Error al cargar el evento")}finally{l(!1)}})()},[e]);const c=g.useMemo(()=>{var x;if(!(r!=null&&r.participants)||r.participants.length===0)return[];const y={};return(x=r.dates)==null||x.forEach(w=>{y[w]={available:0,flexible:0,unavailable:0,total:r.participants.length}}),r.participants.forEach(w=>{var _;(_=w.availability)==null||_.forEach(({date:f,status:d})=>{y[f]&&(d==="available"?y[f].available++:d==="flexible"?y[f].flexible++:d==="unavailable"&&y[f].unavailable++)})}),Object.entries(y).map(([w,_])=>({date:w,..._,score:_.available*3+_.flexible*1-_.unavailable*2,percentage:Math.round((_.available+_.flexible*.5)/_.total*100)})).sort((w,_)=>_.score-w.score)},[r]),u=y=>{const[x,w,_]=y.split("-").map(Number);return new Date(x,w-1,_).toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"})};return a?i.jsx("div",{className:"page readonly-page",children:i.jsxs("div",{className:"container container--medium",children:[i.jsx(_r,{variant:"title",width:"60%"}),i.jsx(mo,{})]})}):o?i.jsx("div",{className:"page readonly-page",children:i.jsx("div",{className:"container container--narrow",children:i.jsxs("div",{className:"error-card card",children:[i.jsx("div",{className:"error-icon",children:"😕"}),i.jsx("h2",{children:"Evento no encontrado"}),i.jsx("p",{children:"Este evento no existe o el link es incorrecto."}),i.jsx($,{variant:"primary",onClick:()=>t("/"),children:"Volver al inicio"})]})})}):i.jsxs("div",{className:"page readonly-page",children:[i.jsxs("div",{className:"container container--medium",children:[i.jsxs("header",{className:"readonly-header",children:[i.jsxs("div",{className:"readonly-header__top",children:[i.jsx("button",{className:"readonly-back-btn",onClick:()=>t("/"),children:"← Inicio"}),i.jsx("span",{className:"badge badge--neutral",children:"Solo lectura"})]}),i.jsx("h1",{className:"readonly-title",children:r.title}),r.description&&i.jsx("p",{className:"readonly-description",children:r.description}),i.jsxs("div",{className:"readonly-meta",children:[r.location&&i.jsxs("span",{className:"readonly-meta__item",children:["📍 ",r.location]}),i.jsxs("span",{className:"readonly-meta__item",children:["👥 ",((v=r.participants)==null?void 0:v.length)||0," participantes"]})]})]}),i.jsxs("section",{className:"readonly-best-dates card",children:[i.jsx("h3",{children:"🎯 Mejores fechas"}),c.length===0||((m=r.participants)==null?void 0:m.length)===0?i.jsx("div",{className:"empty-state",children:i.jsx("p",{children:"Aún no hay votos registrados."})}):i.jsx("div",{className:"best-dates-list",children:c.slice(0,5).map((y,x)=>i.jsxs("div",{className:`best-date-item ${x===0?"best-date-item--winner":""}`,children:[i.jsx("div",{className:"best-date-rank",children:x===0?"🥇":x===1?"🥈":x===2?"🥉":`#${x+1}`}),i.jsxs("div",{className:"best-date-info",children:[i.jsx("span",{className:"best-date-name",children:u(y.date)}),i.jsxs("div",{className:"best-date-stats",children:[i.jsxs("span",{className:"stat stat--available",children:["✓ ",y.available]}),i.jsxs("span",{className:"stat stat--flexible",children:["~ ",y.flexible]}),i.jsxs("span",{className:"stat stat--unavailable",children:["✕ ",y.unavailable]})]})]}),i.jsxs("div",{className:"best-date-percentage",children:[i.jsx("div",{className:"percentage-bar",style:{"--percentage":`${y.percentage}%`,"--color":y.percentage>70?"var(--color-success)":y.percentage>40?"var(--color-warning)":"var(--color-error)"},children:i.jsx("div",{className:"percentage-fill"})}),i.jsxs("span",{className:"percentage-text",children:[y.percentage,"%"]})]})]},y.date))})]}),r.participants&&r.participants.length>0&&i.jsxs("section",{className:"readonly-matrix card",children:[i.jsx("h3",{children:"📊 Matriz de disponibilidad"}),i.jsx("div",{className:"matrix-scroll",children:i.jsxs("table",{className:"availability-matrix",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{className:"matrix-header-name",children:"Participante"}),(h=r.dates)==null?void 0:h.sort().map(y=>i.jsx("th",{className:"matrix-header-date",children:i.jsx("div",{className:"matrix-date",children:u(y).split(" ").slice(0,2).join(" ")})},y))]})}),i.jsx("tbody",{children:r.participants.map((y,x)=>{var w;return i.jsxs("tr",{children:[i.jsxs("td",{className:"matrix-name",children:[i.jsx("span",{className:"matrix-avatar",children:y.name.charAt(0).toUpperCase()}),y.name]}),(w=r.dates)==null?void 0:w.sort().map(_=>{var p;const f=(p=y.availability)==null?void 0:p.find(k=>k.date===_),d=(f==null?void 0:f.status)||"none";return i.jsxs("td",{className:`matrix-cell matrix-cell--${d}`,children:[d==="available"&&"✓",d==="flexible"&&"~",d==="unavailable"&&"✕",d==="none"&&"-"]},_)})]},x)})})]})})]}),i.jsxs("div",{className:"readonly-cta card",children:[i.jsx("p",{children:"¿Querés votar tu disponibilidad?"}),i.jsx($,{variant:"primary",onClick:()=>t(`/event/${e}`),children:"Ir a votar →"})]})]}),i.jsx("style",{children:`
        .readonly-page {
          padding: var(--space-6) 0;
        }
        
        .readonly-header {
          margin-bottom: var(--space-6);
        }
        
        .readonly-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        
        .readonly-back-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          cursor: pointer;
        }
        
        .readonly-back-btn:hover {
          color: var(--color-text-primary);
        }
        
        .readonly-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }
        
        .readonly-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }
        
        .readonly-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .readonly-meta__item {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }
        
        .readonly-best-dates,
        .readonly-matrix {
          margin-bottom: var(--space-6);
        }
        
        .readonly-best-dates h3,
        .readonly-matrix h3 {
          margin-bottom: var(--space-4);
        }
        
        .empty-state {
          text-align: center;
          padding: var(--space-8);
          color: var(--color-text-tertiary);
        }
        
        .best-dates-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .best-date-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .best-date-item--winner {
          background: var(--color-success-bg);
          border: 1px solid var(--color-success-border);
        }
        
        .best-date-rank {
          font-size: var(--text-xl);
          min-width: 40px;
          text-align: center;
        }
        
        .best-date-info {
          flex: 1;
        }
        
        .best-date-name {
          font-weight: 500;
          display: block;
          margin-bottom: var(--space-1);
        }
        
        .best-date-stats {
          display: flex;
          gap: var(--space-3);
          font-size: var(--text-xs);
        }
        
        .stat--available { color: var(--color-available); }
        .stat--flexible { color: var(--color-flexible); }
        .stat--unavailable { color: var(--color-unavailable); }
        
        .best-date-percentage {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-width: 100px;
        }
        
        .percentage-bar {
          flex: 1;
          height: 8px;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .percentage-fill {
          height: 100%;
          width: var(--percentage);
          background: var(--color);
          border-radius: var(--radius-full);
        }
        
        .percentage-text {
          font-size: var(--text-sm);
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }
        
        .matrix-scroll {
          overflow-x: auto;
        }
        
        .availability-matrix {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        
        .matrix-header-name {
          text-align: left;
          padding: var(--space-3);
          background: var(--color-bg-tertiary);
          position: sticky;
          left: 0;
        }
        
        .matrix-header-date {
          padding: var(--space-2);
          background: var(--color-bg-tertiary);
          min-width: 80px;
        }
        
        .matrix-date {
          font-size: var(--text-xs);
          text-transform: capitalize;
        }
        
        .matrix-name {
          padding: var(--space-3);
          background: var(--color-bg-secondary);
          position: sticky;
          left: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        
        .matrix-avatar {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-primary);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }
        
        .matrix-cell {
          text-align: center;
          padding: var(--space-2);
          font-weight: 600;
        }
        
        .matrix-cell--available {
          background: var(--color-available-bg);
          color: var(--color-available);
        }
        
        .matrix-cell--flexible {
          background: var(--color-flexible-bg);
          color: var(--color-flexible);
        }
        
        .matrix-cell--unavailable {
          background: var(--color-unavailable-bg);
          color: var(--color-unavailable);
        }
        
        .matrix-cell--none {
          color: var(--color-text-tertiary);
        }
        
        .readonly-cta {
          text-align: center;
          padding: var(--space-6);
        }
        
        .readonly-cta p {
          margin-bottom: var(--space-4);
        }
        
        .error-card {
          text-align: center;
          padding: var(--space-12);
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: var(--space-4);
        }
        
        @media (max-width: 640px) {
          .readonly-page {
            padding: var(--space-4) 0;
          }
          
          .readonly-title {
            font-size: var(--text-2xl);
          }
          
          .best-date-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .best-date-percentage {
            width: 100%;
          }
        }
      `})]})}function Km(){return i.jsxs(Cm,{children:[i.jsx(Gt,{path:"/",element:i.jsx(Rm,{})}),i.jsx(Gt,{path:"/create",element:i.jsx(Vm,{})}),i.jsx(Gt,{path:"/event/:id",element:i.jsx(Qm,{})}),i.jsx(Gt,{path:"/admin/:adminId",element:i.jsx(Ym,{})}),i.jsx(Gt,{path:"/readonly/:id",element:i.jsx(Xm,{})})]})}wl.createRoot(document.getElementById("root")).render(i.jsx(Hs.StrictMode,{children:i.jsx(Lm,{children:i.jsx(Am,{children:i.jsx(Km,{})})})}));
