"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),PropChecks=require("prop-checks"),extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function __extends(t,e){function r(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}var __assign=function(){return(__assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function __awaiter(i,s,a,c){return new(a||(a=Promise))(function(t,e){function r(t){try{o(c.next(t))}catch(t){e(t)}}function n(t){try{o(c.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new a(function(t){t(e.value)}).then(r,n)}o((c=c.apply(i,s||[])).next())})}function __generator(r,n){var o,i,s,t,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=2&e[0]?i.return:e[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,e[1])).done)return s;switch(i=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,i=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){a.label=e[1];break}if(6===e[0]&&a.label<s[1]){a.label=s[1],s=e;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(e);break}s[2]&&a.ops.pop(),a.trys.pop();continue}e=n.call(r,a)}catch(t){e=[6,t],i=0}finally{o=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}function innerCreateProvider(r,n){return function(e){function t(t){var o=e.call(this,t)||this;return o.state=null,o.state={store:n.getState(),reason:"init"},n.subscribe(function(t,e,r,n){o.setState({store:t,reason:e,loading:r,isLoading:n})}),o}return __extends(t,e),t.prototype.render=function(){var t={commit:n.commit.bind(n),dispatch:n.dispatch.bind(n),store:this.state.store,state:this.state.store,reason:this.state.reason,loading:this.state.loading,isLoading:this.state.isLoading};return React.createElement(r,{value:t},this.props.children)},t}(React.Component)}var diff=require("deep-diff");function extendWithDefined(e,r){return Object.keys(r).forEach(function(t){void 0!==r[t]&&(e[t]=r[t])}),e}function innerCreateConnect(e){return function(c){return function(s){var a=extendWithDefined({startRequest:function(){return React.createElement("div",{style:{textAlign:"center"}},"开始请求")},waitRequest:function(t){return React.createElement("div",{style:{textAlign:"center"}},"加载中...")},typeError:function(t){return React.createElement("div",null,"因为类型",t.join(","),"不满足要求，无法进行渲染")}},{startRequest:s.startRequest,waitRequest:s.waitRequest,typeError:s.typeError,autoActions:s.autoActions,requireProps:s.requireProps});return a.autoActions&&(a.autoActions=a.autoActions.map(function(t){return"string"==typeof t?{name:t,message:t}:t})),function(r){function t(t){var e=r.call(this,t)||this;return e.store=null,e.oldLoadingComponent=null,e.requested=!0,e.willRequestAction=new Set,e.oldRequestParams={},a.autoActions&&(e.requested=!1),e}return __extends(t,r),t.prototype.baseGet=function(t,e){for(var r=0,n=(e=e.split(".")).length;null!=t&&r<n;)t=t[e[r++]];return r&&r==n?t:void 0},t.prototype.handleParams=function(n,o){var i=this;if(o=this.fillProps(o),n){if("function"==typeof n)return n(o);var s={};return Object.keys(n).forEach(function(t){var e=n[t];if("string"==typeof e){var r=/\{(?:[^\}\{]*)\}/g.exec(e);s[t]=r?e.replace(/\{([^\}\{]*)\}/g,function(t,e){return i.baseGet(o,e)}):e}else s[t]="function"==typeof e?e(o):n[t]}),s}return n},t.prototype.componentWillReceiveProps=function(n){var o=this,i=[];Object.keys(this.oldRequestParams).forEach(function(t){var e=o.oldRequestParams[t],r=o.handleParams(e[0],n);diff(r,e[1])&&i.push(t)}),a.requireProps&&this.store&&0<i.length&&i.forEach(function(t){var e=o.handleParams(o.oldRequestParams[t][0],n);o.oldRequestParams[t]=[o.oldRequestParams[t][0],e],o.store.dispatch(t,e)})},t.prototype.setStore=function(t){this.store=t},t.prototype.fillProps=function(t){var r={};if(this.props.location){var e=this.props.location.search;if(""!==e.trim())e.substring("1").split("&").forEach(function(t){var e=t.split("=");r[e[0]]=e[1]})}return this.props.match&&(r=__assign({},r,this.props.match.params)),__assign({},r,t)},t.prototype.render=function(){var i=this;return React.createElement(e,null,function(r){if(i.setStore(r),!i.requested)return a.autoActions.forEach(function(t){var e=i.handleParams(t.params,i.props);i.oldRequestParams[t.name]=[t.params,e],r.dispatch(t.name,e),i.willRequestAction.add(t.name)}),i.requested=!0,i.oldLoadingComponent=a.startRequest();if(0<i.willRequestAction.size){if(r.isLoading)return i.oldLoadingComponent;if(i.willRequestAction.delete(r.reason),0!==i.willRequestAction.size)return i.oldLoadingComponent=a.waitRequest(Array.from(i.willRequestAction))}var t=c(r.store,r.loading),e=__assign({},i.fillProps(i.props),t,{dispatch:r.dispatch,commit:r.commit});if(a.requireProps){var n=PropChecks.checkPropTypes(a.requireProps,e,"prop",s.name);if(0<n.length){var o=[];return n.forEach(function(t){o.push(t.name)}),a.typeError(o)}}return React.createElement(s,__assign({},e))})},t}(React.Component)}}}var co=require("co"),Store=function(){function t(e){var r=this;this.state={},this.loading={},this.modelMaps={},this.subscribes=[],Object.keys(e).forEach(function(t){r.state[t]=e[t].state}),this.modelMaps=e}return t.prototype.getState=function(){return this.state},t.prototype.dispatch=function(n,o){var t=this,i=n.split("/");return co(function(){return __awaiter(t,void 0,void 0,function(){var e,r=this;return __generator(this,function(t){switch(t.label){case 0:return this.loading[n]=!0,this.subscribes.forEach(function(t){t(r.state,n,r.loading,!0)}),[4,this.modelMaps[i[0]].actions[i[1]]({commit:this.commit.bind(this,n),dispatch:this.dispatch.bind(this),store:__assign({},this.state[i[0]]),state:__assign({},this.state[i[0]])},o)];case 1:return e=t.sent(),this.loading[n]=!1,this.subscribes.forEach(function(t){t(r.state,n,r.loading,!1)}),[2,e]}})})})},t.prototype.commit=function(t,e,r){var n=t.split("/");if(!this.modelMaps[n[0]].mutations[e])throw new Error("不存在此action");this.modelMaps[n[0]].mutations[e](this.state[n[0]],r)},t.prototype.subscribe=function(t){this.subscribes.push(t)},t}();function createStore(t){return new Store(t)}function createProviderAndConnect(t){var e=React.createContext({});return{Provider:innerCreateProvider(e.Provider,t),connect:innerCreateConnect(e.Consumer)}}exports.createStore=createStore,exports.createProviderAndConnect=createProviderAndConnect;
