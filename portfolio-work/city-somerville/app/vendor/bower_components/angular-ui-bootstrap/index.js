/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.13.0 - 2015-05-02
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.datepicker","ui.bootstrap.dateparser","ui.bootstrap.position"]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).constant("datepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null,shortcutPropagation:!1}).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$timeout","$log","dateFilter","datepickerConfig",function(e,t,a,r,n,i,o,s){var l=this,u={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","minMode","maxMode","showWeeks","startingDay","yearRange","shortcutPropagation"],function(a,n){l[a]=angular.isDefined(t[a])?8>n?r(t[a])(e.$parent):e.$parent.$eval(t[a]):s[a]}),angular.forEach(["minDate","maxDate"],function(r){t[r]?e.$parent.$watch(a(t[r]),function(e){l[r]=e?new Date(e):null,l.refreshView()}):l[r]=s[r]?new Date(s[r]):null}),e.datepickerMode=e.datepickerMode||s.datepickerMode,e.maxMode=l.maxMode,e.uniqueId="datepicker-"+e.$id+"-"+Math.floor(1e4*Math.random()),angular.isDefined(t.initDate)?(this.activeDate=e.$parent.$eval(t.initDate)||new Date,e.$parent.$watch(t.initDate,function(e){e&&(u.$isEmpty(u.$modelValue)||u.$invalid)&&(l.activeDate=e,l.refreshView())})):this.activeDate=new Date,e.isActive=function(t){return 0===l.compare(t.date,l.activeDate)?(e.activeDateId=t.uid,!0):!1},this.init=function(e){u=e,u.$render=function(){l.render()}},this.render=function(){if(u.$viewValue){var e=new Date(u.$viewValue),t=!isNaN(e);t?this.activeDate=e:i.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'),u.$setValidity("date",t)}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var e=u.$viewValue?new Date(u.$viewValue):null;u.$setValidity("date-disabled",!e||this.element&&!this.isDisabled(e))}},this.createDateObject=function(e,t){var a=u.$viewValue?new Date(u.$viewValue):null;return{date:e,label:o(e,t),selected:a&&0===this.compare(e,a),disabled:this.isDisabled(e),current:0===this.compare(e,new Date),customClass:this.customClass(e)}},this.isDisabled=function(a){return this.minDate&&this.compare(a,this.minDate)<0||this.maxDate&&this.compare(a,this.maxDate)>0||t.dateDisabled&&e.dateDisabled({date:a,mode:e.datepickerMode})},this.customClass=function(t){return e.customClass({date:t,mode:e.datepickerMode})},this.split=function(e,t){for(var a=[];e.length>0;)a.push(e.splice(0,t));return a},e.select=function(t){if(e.datepickerMode===l.minMode){var a=u.$viewValue?new Date(u.$viewValue):new Date(0,0,0,0,0,0,0);a.setFullYear(t.getFullYear(),t.getMonth(),t.getDate()),u.$setViewValue(a),u.$render()}else l.activeDate=t,e.datepickerMode=l.modes[l.modes.indexOf(e.datepickerMode)-1]},e.move=function(e){var t=l.activeDate.getFullYear()+e*(l.step.years||0),a=l.activeDate.getMonth()+e*(l.step.months||0);l.activeDate.setFullYear(t,a,1),l.refreshView()},e.toggleMode=function(t){t=t||1,e.datepickerMode===l.maxMode&&1===t||e.datepickerMode===l.minMode&&-1===t||(e.datepickerMode=l.modes[l.modes.indexOf(e.datepickerMode)+t])},e.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var c=function(){n(function(){l.element[0].focus()},0,!1)};e.$on("datepicker.focus",c),e.keydown=function(t){var a=e.keys[t.which];if(a&&!t.shiftKey&&!t.altKey)if(t.preventDefault(),l.shortcutPropagation||t.stopPropagation(),"enter"===a||"space"===a){if(l.isDisabled(l.activeDate))return;e.select(l.activeDate),c()}else!t.ctrlKey||"up"!==a&&"down"!==a?(l.handleKeyDown(a,t),l.refreshView()):(e.toggleMode("up"===a?1:-1),c())}}]).directive("datepicker",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{datepickerMode:"=?",dateDisabled:"&",customClass:"&",shortcutPropagation:"&?"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(e,t,a,r){var n=r[0],i=r[1];i&&n.init(i)}}}).directive("daypicker",["dateFilter",function(e){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/day.html",require:"^datepicker",link:function(t,a,r,n){function i(e,t){return 1!==t||e%4!==0||e%100===0&&e%400!==0?l[t]:29}function o(e,t){var a=new Array(t),r=new Date(e),n=0;for(r.setHours(12);t>n;)a[n++]=new Date(r),r.setDate(r.getDate()+1);return a}function s(e){var t=new Date(e);t.setDate(t.getDate()+4-(t.getDay()||7));var a=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((a-t)/864e5)/7)+1}t.showWeeks=n.showWeeks,n.step={months:1},n.element=a;var l=[31,28,31,30,31,30,31,31,30,31,30,31];n._refreshView=function(){var a=n.activeDate.getFullYear(),r=n.activeDate.getMonth(),i=new Date(a,r,1),l=n.startingDay-i.getDay(),u=l>0?7-l:-l,c=new Date(i);u>0&&c.setDate(-u+1);for(var p=o(c,42),d=0;42>d;d++)p[d]=angular.extend(n.createDateObject(p[d],n.formatDay),{secondary:p[d].getMonth()!==r,uid:t.uniqueId+"-"+d});t.labels=new Array(7);for(var f=0;7>f;f++)t.labels[f]={abbr:e(p[f].date,n.formatDayHeader),full:e(p[f].date,"EEEE")};if(t.title=e(n.activeDate,n.formatDayTitle),t.rows=n.split(p,7),t.showWeeks){t.weekNumbers=[];for(var h=(11-n.startingDay)%7,g=t.rows.length,m=0;g>m;m++)t.weekNumbers.push(s(t.rows[m][h].date))}},n.compare=function(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate())-new Date(t.getFullYear(),t.getMonth(),t.getDate())},n.handleKeyDown=function(e){var t=n.activeDate.getDate();if("left"===e)t-=1;else if("up"===e)t-=7;else if("right"===e)t+=1;else if("down"===e)t+=7;else if("pageup"===e||"pagedown"===e){var a=n.activeDate.getMonth()+("pageup"===e?-1:1);n.activeDate.setMonth(a,1),t=Math.min(i(n.activeDate.getFullYear(),n.activeDate.getMonth()),t)}else"home"===e?t=1:"end"===e&&(t=i(n.activeDate.getFullYear(),n.activeDate.getMonth()));n.activeDate.setDate(t)},n.refreshView()}}}]).directive("monthpicker",["dateFilter",function(e){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/month.html",require:"^datepicker",link:function(t,a,r,n){n.step={years:1},n.element=a,n._refreshView=function(){for(var a=new Array(12),r=n.activeDate.getFullYear(),i=0;12>i;i++)a[i]=angular.extend(n.createDateObject(new Date(r,i,1),n.formatMonth),{uid:t.uniqueId+"-"+i});t.title=e(n.activeDate,n.formatMonthTitle),t.rows=n.split(a,3)},n.compare=function(e,t){return new Date(e.getFullYear(),e.getMonth())-new Date(t.getFullYear(),t.getMonth())},n.handleKeyDown=function(e){var t=n.activeDate.getMonth();if("left"===e)t-=1;else if("up"===e)t-=3;else if("right"===e)t+=1;else if("down"===e)t+=3;else if("pageup"===e||"pagedown"===e){var a=n.activeDate.getFullYear()+("pageup"===e?-1:1);n.activeDate.setFullYear(a)}else"home"===e?t=0:"end"===e&&(t=11);n.activeDate.setMonth(t)},n.refreshView()}}}]).directive("yearpicker",["dateFilter",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/year.html",require:"^datepicker",link:function(e,t,a,r){function n(e){return parseInt((e-1)/i,10)*i+1}var i=r.yearRange;r.step={years:i},r.element=t,r._refreshView=function(){for(var t=new Array(i),a=0,o=n(r.activeDate.getFullYear());i>a;a++)t[a]=angular.extend(r.createDateObject(new Date(o+a,0,1),r.formatYear),{uid:e.uniqueId+"-"+a});e.title=[t[0].label,t[i-1].label].join(" - "),e.rows=r.split(t,5)},r.compare=function(e,t){return e.getFullYear()-t.getFullYear()},r.handleKeyDown=function(e){var t=r.activeDate.getFullYear();"left"===e?t-=1:"up"===e?t-=5:"right"===e?t+=1:"down"===e?t+=5:"pageup"===e||"pagedown"===e?t+=("pageup"===e?-1:1)*r.step.years:"home"===e?t=n(r.activeDate.getFullYear()):"end"===e&&(t=n(r.activeDate.getFullYear())+i-1),r.activeDate.setFullYear(t)},r.refreshView()}}}]).constant("datepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","dateParser","datepickerPopupConfig",function(e,t,a,r,n,i,o){return{restrict:"EA",require:"ngModel",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&",customClass:"&"},link:function(s,l,u,c){function p(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}function d(e){if(angular.isNumber(e)&&(e=new Date(e)),e){if(angular.isDate(e)&&!isNaN(e))return e;if(angular.isString(e)){var t=i.parse(e,h,s.date)||new Date(e);return isNaN(t)?void 0:t}return void 0}return null}function f(e,t){var a=e||t;if(angular.isNumber(a)&&(a=new Date(a)),a){if(angular.isDate(a)&&!isNaN(a))return!0;if(angular.isString(a)){var r=i.parse(a,h)||new Date(a);return!isNaN(r)}return!1}return!0}var h,g=angular.isDefined(u.closeOnDateSelection)?s.$parent.$eval(u.closeOnDateSelection):o.closeOnDateSelection,m=angular.isDefined(u.datepickerAppendToBody)?s.$parent.$eval(u.datepickerAppendToBody):o.appendToBody;s.showButtonBar=angular.isDefined(u.showButtonBar)?s.$parent.$eval(u.showButtonBar):o.showButtonBar,s.getText=function(e){return s[e+"Text"]||o[e+"Text"]};var D=!1;if(o.html5Types[u.type]?(h=o.html5Types[u.type],D=!0):(h=u.datepickerPopup||o.datepickerPopup,u.$observe("datepickerPopup",function(e){var t=e||o.datepickerPopup;if(t!==h&&(h=t,c.$modelValue=null,!h))throw new Error("datepickerPopup must have a date format specified.")})),!h)throw new Error("datepickerPopup must have a date format specified.");if(D&&u.datepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");var y=angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");y.attr({"ng-model":"date","ng-change":"dateSelection()"});var v=angular.element(y.children()[0]);if(D&&"month"==u.type&&(v.attr("datepicker-mode",'"month"'),v.attr("min-mode","month")),u.datepickerOptions){var w=s.$parent.$eval(u.datepickerOptions);w.initDate&&(s.initDate=w.initDate,v.attr("init-date","initDate"),delete w.initDate),angular.forEach(w,function(e,t){v.attr(p(t),e)})}s.watchData={},angular.forEach(["minDate","maxDate","datepickerMode","initDate","shortcutPropagation"],function(e){if(u[e]){var a=t(u[e]);if(s.$parent.$watch(a,function(t){s.watchData[e]=t}),v.attr(p(e),"watchData."+e),"datepickerMode"===e){var r=a.assign;s.$watch("watchData."+e,function(e,t){e!==t&&r(s.$parent,e)})}}}),u.dateDisabled&&v.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),u.showWeeks&&v.attr("show-weeks",u.showWeeks),u.customClass&&v.attr("custom-class","customClass({ date: date, mode: mode })"),D?c.$formatters.push(function(e){return s.date=e,e}):(c.$$parserName="date",c.$validators.date=f,c.$parsers.unshift(d),c.$formatters.push(function(e){return s.date=e,c.$isEmpty(e)?e:n(e,h)})),s.dateSelection=function(e){angular.isDefined(e)&&(s.date=e);var t=s.date?n(s.date,h):"";l.val(t),c.$setViewValue(t),g&&(s.isOpen=!1,l[0].focus())},c.$viewChangeListeners.push(function(){s.date=i.parse(c.$viewValue,h,s.date)||new Date(c.$viewValue)});var M=function(e){s.isOpen&&e.target!==l[0]&&s.$apply(function(){s.isOpen=!1})},k=function(e){s.keydown(e)};l.bind("keydown",k),s.keydown=function(e){27===e.which?(e.preventDefault(),s.isOpen&&e.stopPropagation(),s.close()):40!==e.which||s.isOpen||(s.isOpen=!0)},s.$watch("isOpen",function(e){e?(s.$broadcast("datepicker.focus"),s.position=m?r.offset(l):r.position(l),s.position.top=s.position.top+l.prop("offsetHeight"),a.bind("click",M)):a.unbind("click",M)}),s.select=function(e){if("today"===e){var t=new Date;angular.isDate(s.date)?(e=new Date(s.date),e.setFullYear(t.getFullYear(),t.getMonth(),t.getDate())):e=new Date(t.setHours(0,0,0,0))}s.dateSelection(e)},s.close=function(){s.isOpen=!1,l[0].focus()};var $=e(y)(s);y.remove(),m?a.find("body").append($):l.after($),s.$on("$destroy",function(){$.remove(),l.unbind("keydown",k),a.unbind("click",M)})}}}]).directive("datepickerPopupWrap",function(){return{restrict:"EA",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(e,t){t.bind("click",function(e){e.preventDefault(),e.stopPropagation()})}}}),angular.module("ui.bootstrap.dateparser",[]).service("dateParser",["$locale","orderByFilter",function(e,t){function a(e){var a=[],r=e.split("");return angular.forEach(i,function(t,n){var i=e.indexOf(n);if(i>-1){e=e.split(""),r[i]="("+t.regex+")",e[i]="$";for(var o=i+1,s=i+n.length;s>o;o++)r[o]="",e[o]="$";e=e.join(""),a.push({index:i,apply:t.apply})}}),{regex:new RegExp("^"+r.join("")+"$"),map:t(a,"index")}}function r(e,t,a){return 1>a?!1:1===t&&a>28?29===a&&(e%4===0&&e%100!==0||e%400===0):3===t||5===t||8===t||10===t?31>a:!0}var n=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;this.parsers={};var i={yyyy:{regex:"\\d{4}",apply:function(e){this.year=+e}},yy:{regex:"\\d{2}",apply:function(e){this.year=+e+2e3}},y:{regex:"\\d{1,4}",apply:function(e){this.year=+e}},MMMM:{regex:e.DATETIME_FORMATS.MONTH.join("|"),apply:function(t){this.month=e.DATETIME_FORMATS.MONTH.indexOf(t)}},MMM:{regex:e.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(t){this.month=e.DATETIME_FORMATS.SHORTMONTH.indexOf(t)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(e){this.month=e-1}},M:{regex:"[1-9]|1[0-2]",apply:function(e){this.month=e-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(e){this.date=+e}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(e){this.date=+e}},EEEE:{regex:e.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:e.DATETIME_FORMATS.SHORTDAY.join("|")},HH:{regex:"(?:0|1)[0-9]|2[0-3]",apply:function(e){this.hours=+e}},H:{regex:"1?[0-9]|2[0-3]",apply:function(e){this.hours=+e}},mm:{regex:"[0-5][0-9]",apply:function(e){this.minutes=+e}},m:{regex:"[0-9]|[1-5][0-9]",apply:function(e){this.minutes=+e}},sss:{regex:"[0-9][0-9][0-9]",apply:function(e){this.milliseconds=+e}},ss:{regex:"[0-5][0-9]",apply:function(e){this.seconds=+e}},s:{regex:"[0-9]|[1-5][0-9]",apply:function(e){this.seconds=+e}}};this.parse=function(t,i,o){if(!angular.isString(t)||!i)return t;i=e.DATETIME_FORMATS[i]||i,i=i.replace(n,"\\$&"),this.parsers[i]||(this.parsers[i]=a(i));var s=this.parsers[i],l=s.regex,u=s.map,c=t.match(l);if(c&&c.length){var p,d;p=o?{year:o.getFullYear(),month:o.getMonth(),date:o.getDate(),hours:o.getHours(),minutes:o.getMinutes(),seconds:o.getSeconds(),milliseconds:o.getMilliseconds()}:{year:1900,month:0,date:1,hours:0,minutes:0,seconds:0,milliseconds:0};for(var f=1,h=c.length;h>f;f++){var g=u[f-1];g.apply&&g.apply.call(p,c[f])}return r(p.year,p.month,p.date)&&(d=new Date(p.year,p.month,p.date,p.hours,p.minutes,p.seconds,p.milliseconds||0)),d}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(e,t){function a(e,a){return e.currentStyle?e.currentStyle[a]:t.getComputedStyle?t.getComputedStyle(e)[a]:e.style[a]}function r(e){return"static"===(a(e,"position")||"static")}var n=function(t){for(var a=e[0],n=t.offsetParent||a;n&&n!==a&&r(n);)n=n.offsetParent;return n||a};return{position:function(t){var a=this.offset(t),r={top:0,left:0},i=n(t[0]);i!=e[0]&&(r=this.offset(angular.element(i)),r.top+=i.clientTop-i.scrollTop,r.left+=i.clientLeft-i.scrollLeft);var o=t[0].getBoundingClientRect();return{width:o.width||t.prop("offsetWidth"),height:o.height||t.prop("offsetHeight"),top:a.top-r.top,left:a.left-r.left}},offset:function(a){var r=a[0].getBoundingClientRect();return{width:r.width||a.prop("offsetWidth"),height:r.height||a.prop("offsetHeight"),top:r.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:r.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,a,r){var n,i,o,s,l=a.split("-"),u=l[0],c=l[1]||"center";n=r?this.offset(e):this.position(e),i=t.prop("offsetWidth"),o=t.prop("offsetHeight");var p={center:function(){return n.left+n.width/2-i/2},left:function(){return n.left},right:function(){return n.left+n.width}},d={center:function(){return n.top+n.height/2-o/2},top:function(){return n.top},bottom:function(){return n.top+n.height}};switch(u){case"right":s={top:d[c](),left:p[u]()};break;case"left":s={top:d[c](),left:n.left-i};break;case"bottom":s={top:d[u](),left:p[c]()};break;default:s={top:n.top-o,left:p[c]()}}return s}}}]);