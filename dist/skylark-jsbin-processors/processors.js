/**
 * skylark-jsbin-processors - A version of jsbin-processors  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-processors/
 * @license MIT
 */
define(["skylark-jquery","./jsbin"],function(e,n){"use strict";var t=function(n,t){return e.extend(n,t)},r=function(e){return e()},s=function(e,n,t){return new Promise(function(n){n(e)}).then(n,t)},i={extension:{}},o=function(t,r){e.ajax({cache:!0,url:t+"?"+n.version,dataType:"script",success:r})};var a,c,l=function(e){var a=e.url,c=e.init||r,l=e.handler||s,u=function(){var e=[].slice.call(arguments,0),n=e.shift();return e.reduce(function(e,t){return e[t]=n[t]||null,e},{})}(e,"id","target","extensions");e.extensions=e.extensions||[],e.extensions.length||(e.extensions=[e.id]),e.extensions.forEach(function(n){i.extension[n]=e.id});return t(function(e){var r=!1,s=function(){return window.console&&window.console.warn("Processor is not ready yet - trying again"),r=!0,""};a?o(a,function(){c(function(){s=l,r&&renderLivePreview(),e()})}):c(function(){s=l,e()});var i={source:"",result:""};u.target&&(n.state.cache||(n.state.cache={}),n.state.cache[u.target]=i);return t(function(e){return new Promise(function(n,t){(e=e.trim())===i.source?n(i.result):s(e,function(t){i.source=e,i.result=t,n(t)},t)})},u)},u)},u={html:l({id:"html",extensions:["html"]}),css:l({id:"css",extensions:["css"]}),javascript:l({id:"javascript",extensions:["js"]}),coffeescript:l({id:"coffeescript",target:"javascript",extensions:["coffee"],url:n.static+"/js/vendor/coffee-script.js",init:function(e){o(n.static+"/js/vendor/codemirror5/mode/coffeescript/coffeescript.js",e)},handler:function(e,n,t){try{n(window.CoffeeScript.compile(e,{bare:!0}))}catch(e){t([{line:parseInt(e.location.first_line,10)||0,ch:parseInt(e.location.first_column,10)||0,msg:e.message}])}}}),jsx:l({id:"jsx",target:"javascript",extensions:["jsx"],url:n.static+"/js/vendor/JSXTransformer.js",init:function(n){var t=editors.html.getCode();/<script[^>]*src=\S*\breact\b/i.test(t)||e("#library").val(e("#library").find(':contains("React with Add-Ons")').val()).trigger("change"),n()},handler:function(e,n,t){try{n(window.JSXTransformer.transform(e).code)}catch(e){t(e)}}}),livescript:l({id:"livescript",target:"javascript",extensions:["ls"],url:n.static+"/js/vendor/livescript.js",init:function(e){o(n.static+"/js/vendor/codemirror5/mode/livescript/livescript.js",e)},handler:function(e,n,t){try{n(window.LiveScript.compile(e,{bare:!0}))}catch(e){var r=e.message.match(/on line (\d+)/)||[,],s=parseInt(r[1],10)||0;s>0&&(s-=1),t([{line:s,ch:null,msg:(e.message.match(/(.+) on line (\d+)$/)||[,])[1]}])}}}),typescript:l({id:"typescript",target:"javascript",extensions:["ts"],url:n.static+"/js/vendor/typescript.min.js",init:r,handler:function(e,n,t){var r=ts.transpileModule(e,{compilerOptions:{inlineSourceMap:!0,inlineSources:!0,target:ts.ScriptTarget.ES5},fileName:"jsbin.ts",reportDiagnostics:!0}),s=r.diagnostics.filter(function(e){return 5047!==e.code});s.length?t(s.map(function(n){var t=n.file.getLineAndCharacterOfPosition(n.start),r=t.line+1,s=t.character+1,i=ts.flattenDiagnosticMessageText(n.messageText,"\n"),o=e.substr(n.start,n.length);return i+(o?" at "+o:"")+" ("+n.file.fileName+":"+r+":"+s+")"}).join("\n")):n(r.outputText)}}),markdown:l({id:"markdown",target:"html",extensions:["md","markdown","mdown"],url:n.static+"/js/vendor/marked.min.js",init:function(e){o(n.static+"/js/vendor/codemirror5/mode/markdown/markdown.js",e)},handler:function(e,n,t){try{n(window.marked(e))}catch(e){t(e)}}}),processing:l({id:"processing",target:"javascript",extensions:["pde"],url:n.static+"/js/vendor/processing.min.js",init:function(t){e("#library").val(e("#library").find(':contains("Processing")').val()).trigger("change"),o(n.static+"/js/vendor/codemirror5/mode/clike/clike.js",t)},handler:function(e,n,t){try{n(["(function(){",'  var canvas = document.querySelector("canvas");',"  if (!canvas) {",'    canvas = document.createElement("canvas");',"    (document.body || document.documentElement).appendChild(canvas);","  }","  canvas.width = window.innerWidth;","  canvas.height = window.innerHeight;","  var sketchProc = "+window.Processing.compile(e).sourceCode+";","  var p = new Processing(canvas, sketchProc);","})();"].join("\n"))}catch(e){t(e)}}}),jade:l({id:"jade",target:"html",extensions:["jade"],url:n.static+"/js/vendor/jade.js?1.4.2",init:function(e){o(n.static+"/js/vendor/codemirror5/mode/jade/jade.js",e)},handler:function(e,n,t){try{n(window.jade.compile(e,{pretty:!0})())}catch(e){console.log("Errors",e);var r=e.message.match(/Jade:(\d+)/)||[,],s=parseInt(r[1],10)||0;s>0&&(s-=1),t([{line:s,ch:null,msg:(e.message.match(/\n\n(.+)$/)||[,])[1]}])}}}),less:l({id:"less",target:"css",extensions:["less"],url:n.static+"/js/vendor/less.min.js",init:r,handler:function(e,n,t){window.less.render(e,function(e,r){if(e){var s=parseInt(e.line,10)||0,i=parseInt(e.column,10)||0;s>0&&(s-=1),i>0&&(i-=1);var o={line:s,ch:i,msg:e.message};return t([o])}n(r.css.trim())})}}),scss:l({id:"scss",target:"scss",extensions:["scss"],init:r,handler:throttle(debounceAsync(function(t,r,s,i){e.ajax({type:"post",url:"/processor",data:{language:"scss",source:t,url:n.state.code,revision:n.state.revision},success:function(e){if(e.errors){var t=n.panels.panels.css.editor;if(void 0!==t.updateLinting){hintingDone(t);var s=d(e.errors);t.updateLinting(s)}}else e.result&&r(e.result)},error:function(e){s(new Error(e.responseText))},complete:i})}),500)}),sass:l({id:"sass",target:"sass",extensions:["sass"],init:function(e){o(n.static+"/js/vendor/codemirror5/mode/sass/sass.js",e)},handler:throttle(debounceAsync(function(t,r,s,i){e.ajax({type:"post",url:"/processor",data:{language:"sass",source:t,url:n.state.code,revision:n.state.revision},success:function(e){if(e.errors){var t=n.panels.panels.css.editor;if(void 0!==t.updateLinting){hintingDone(t);var s=d(e.errors);t.updateLinting(s)}}else e.result&&r(e.result)},error:function(e){s(new Error(e.responseText))},complete:i})}),500)}),babel:l({id:"babel",target:"js",extensions:["es6"],url:n.static+"/js/vendor/babel.min.js",init:function(e){e()},handler:function(e,n,t){try{n(babel.transform(e,{stage:0}).code)}catch(e){console.error(e.message),t([{line:e.loc.line-1,ch:e.loc.column,msg:e.message.split("\n")[0].replace(new RegExp("\\("+e.loc.line+":"+e.loc.column+"\\)"),"("+e.loc.column+")")}])}}}),myth:l({id:"myth",target:"css",extensions:["myth"],url:n.static+"/js/vendor/myth.min.js",init:function(e){e()},handler:function(e,n,t){try{n(window.myth(e))}catch(e){var r=parseInt(e.line,10)||0,s=parseInt(e.column,10)||0;r>0&&(r-=1),s>0&&(s-=1),t([{line:r,ch:s,msg:e.message}])}}}),stylus:l({id:"stylus",target:"css",extensions:["styl"],url:n.static+"/js/vendor/stylus.js",init:r,handler:function(e,n,t){window.stylus(e).render(function(e,r){if(e){var s=e.message.match(/stylus:(\d+)/)||[,],i=parseInt(s[1],10)||0,o=e.message.match(/\n\n(.+)\n$/)||[,];i>0&&(i-=1);var a={line:i,ch:null,msg:o[1]};return t([a])}n(r.trim())})}}),clojurescript:function(){var e,t;return window.addEventListener("message",function(e){try{var n="string"==typeof e.data?JSON.parse(e.data):e.data;"eval"===n.type&&t("console.log("+JSON.stringify(n.result)+")")}catch(e){}},!1),l({id:"clojurescript",target:"js",extensions:["clj","cljs"],url:n.static+"/js/vendor/cljs.js",init:function(t){(e=document.createElement("iframe")).sandbox="allow-same-origin allow-scripts",e.name="<cljs>",e.onload=function(){e.contentWindow.jsbin_cljs=jsbin_cljs,e.contentWindow.cljs=cljs,e.contentWindow.goog=goog;var r=e.contentWindow.document.createElement("script");r.textContent="("+function(){window.addEventListener("message",function(e){var n;try{n=JSON.parse(e.data)}catch(e){return}"eval"===n.type&&jsbin_cljs.core.eval("(ns cljs.user)"+n.source,function(e,n){if(cljs.user=null,e)throw Error(e);parent.postMessage(JSON.stringify({type:"eval",result:n}),"*")})},!1)}.toString().split("\n").join("")+")()",e.contentWindow.document.body.appendChild(r),o(n.static+"/js/vendor/codemirror5/mode/clojure/clojure.js",t)},document.body.appendChild(e)},handler:function(n,r,s){try{t=r,e.contentWindow.postMessage(JSON.stringify({type:"eval",source:n}),"*")}catch(e){console.error(e)}}})}(),traceur:l({id:"traceur",target:"javascript",extensions:["traceur"],url:n.static+"/js/vendor/traceur.js",init:function(n){e("#library").val(e("#library").find(':contains("Traceur")').val()).trigger("change"),window.traceur.outputgeneration.SourceMapConsumer,window.traceur.outputgeneration.SourceMapGenerator,a=window.traceur.outputgeneration.ProjectWriter,c=window.traceur.util.ErrorReporter,n()},handler:function(e,n,t){var r=new c;r.reportMessageInternal=function(e,n,r,s){t(new Error(c.format(e,r,s)))};var s=location.href,i=new window.traceur.semantics.symbols.Project(s),o=new window.traceur.syntax.SourceFile("jsbin",e);i.addFile(o);var l=window.traceur.codegeneration.Compiler.compile(r,i,!1);n("/*\nIf you've just translated to JS, make sure traceur is in the HTML panel.\nThis is terrible, sorry, but the only way we could get around race conditions.\n\nHugs & kisses,\nDave xox\n*/\ntry{window.traceur = top.traceur;}catch(e){}\n"+a.write(l))}})},d=function(e){for(var n=[],t=0,r=0,s=0;s<e.length;s++)t=e[s].line||0,r=e[s].ch||0,n.push({from:{line:t,ch:r},to:{line:t,ch:r},message:e[s].msg,severity:"error"});return n};return u.findByExtension=function(e){var n=i.extension[e];return n?u[n]:s},u.by=i,n.processors=u});
//# sourceMappingURL=sourcemaps/processors.js.map
