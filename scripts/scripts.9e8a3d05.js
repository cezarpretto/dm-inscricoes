"use strict";angular.module("dmInscricoesApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","naif.base64","smart-table","angular-growl","angular-loading-bar","ngMap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/inscricao/:id_inscricao?",{templateUrl:"views/inscricao.html",controller:"InscricaoCtrl",controllerAs:"inscricao"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/mainAdmin",{templateUrl:"views/mainadmin.html",controller:"MainadminCtrl",controllerAs:"mainAdmin"}).when("/usuarios",{templateUrl:"views/usuarios.html",controller:"UsuariosCtrl",controllerAs:"usuarios"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){a.interceptors.push("httpInterceptor")}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):|data:application\//)}]),angular.module("dmInscricoesApp").controller("MainCtrl",["NgMap",function(a){}]),angular.module("dmInscricoesApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("dmInscricoesApp").controller("InscricaoCtrl",["$scope","InscricaoModel","$routeParams","InscricaoService","ModalService","$sce",function(a,b,c,d,e,f){a.idInscricao=c.id_inscricao,a.inscricao=new b.Inscricao,a.retornoSucesso=!1,a.comprovanteOk=!1,a.update=!1,a.comprovante={comprovanteBase64:void 0},void 0!==a.idInscricao&&(a.update=!0,d.get(window.atob(a.idInscricao)).then(function(b){a.inscricao=b.data.data[0]})["catch"](function(a){console.error(a)})),a.salvar=function(){var c=[];a.inscricao.status="INSCRIÇÃO REALIZADA",e.show("loadingInscricao"),d.post(a.inscricao).then(function(f){c=f.data.data[0],a.retornoSucesso=c,a.inscricao=new b.Inscricao,d.sendMail(c.nome,window.btoa(c.id),c.email).then(function(a){e.hide("loadingInscricao")})["catch"](function(b){a.retornoSucesso=!1,console.error(b)})})["catch"](function(b){console.error(b),a.retornoSucesso=!1})},a.atualizar=function(){a.inscricao.status="COMPROVANTE ENVIADO",e.show("loadingInscricao"),d.put(a.inscricao).then(function(c){e.hide("loadingInscricao"),a.inscricao=new b.Inscricao,a.comprovanteOk=c.data[0]})["catch"](function(b){e.hide("loadingInscricao"),a.comprovanteOk=!1,console.error(b)})},a.sendMail=function(){d.sendMail("Cezar Pretto","0000","cezar_pretto6@hotmail.com").then(function(a){console.log(a)})["catch"](function(a){console.error(a)})},a.$watch("comprovante.comprovanteBase64",function(b){void 0!==b&&(a.inscricao.comprovante="data:application/pdf;base64,"+b.base64,a.atualizar())}),a.trustSrc=function(a){return f.trustAsResourceUrl(a)},a.openFile=function(a){$("#inputFile").click()}}]),angular.module("dmInscricoesApp").service("InscricaoModel",function(){var a=this;this.Inscricao=function(){this.nome=void 0,this.email=void 0,this.dt_nascimento=void 0,this.id_demolay=void 0,this.tipo=void 0,this.camiseta=void 0,this.comprovante=void 0,this.cidade=void 0,this.capitulo=void 0,this.observacao=void 0,this.status=void 0},this.Email=function(b,c,d){this.from="Mailgun Sandbox <postmaster@sandbox3a1c02caea91400c9ba048afb6ab2be3.mailgun.org>",this.to=b+" <"+d+">",this.subject="Inscrição VI CROD",this.text=a.mailBody(b,c)},this.mailBody=function(a,b){return"<!DOCTYPE html><html>  <body>    <center><h1>Olá "+a+". Sua inscrição com o código "+window.btoa(b)+" foi realizada com sucesso!</h1><p>Para efetuar o pagamento você deve realizar um depósito na seguinte conta:</p><p><strong>Sicred</strong></p><p>Agência: </p><p>Conta Poupança:</p><p><strong>Geraldo Antônio Delai</strong></p><h2>Após o depósito clique no link abaixo para confirmar sua inscrição</h2><p><a href=http://demolayab.org/#/inscricao/"+window.btoa(b)+" target=_blank>Clique aqui para Confirmar</a></p>    </center>  </body></html>"}}),angular.module("dmInscricoesApp").directive("dateMask",["$filter",function(a){return{require:"ngModel",link:function(b,c,d,e){var f=function(a){return void 0!=a?(a=a.replace(/[^0-9]+/g,""),a.length>2&&(a=a.substring(0,2)+"/"+a.substring(2)),a.length>5&&(a=a.substring(0,5)+"/"+a.substring(5,9)),a):void 0};c.bind("keyup",function(){e.$setViewValue(f(e.$viewValue)),e.$render()}),e.$parsers.push(function(a){if(10===a.length){var b=a.split("/");return new Date(b[2],b[1]-1,b[0])}}),e.$formatters.push(function(b){return a("date")(b,"dd/MM/yyyy")})}}}]),angular.module("dmInscricoesApp").service("InscricaoService",["$http","AuthService","API","$q",function(a,b,c,d){var e=b.ip;this.post=function(b){return a.post(e+"subscribes",b)},this.put=function(a){function b(a,b){b?e.resolve(b):e.reject(a)}var e=d.defer();return c.request("subscribes").update(a.id,a,b),e.promise},this.get=function(b){return a.get(e+"subscribes/"+b)},this.sendMail=function(a,b,c){return emailjs.send("gmail","confimatemplate",{name:a,email_to:c,product_name:"VI CROD",nr_inscricao:b,action_url:"http://localhost:9000/#/inscricao/"+b})},this.sendMailConfirmation=function(a,b,c){return emailjs.send("gmail","inscricaoconfirmada",{name:a,email_to:c,product_name:"VI CROD",nr_inscricao:b,action_url:"http://localhost:9000/#/inscricao/"+b})},this.getInscricoes=function(){return a.get(e+"subscribes")},this.confirmarInscricao=function(a){function b(a,b){b?e.resolve(b):e.reject(a)}var e=d.defer();return c.request("subscribes").update(a.id,a,b),e.promise}}]),angular.module("dmInscricoesApp").service("AuthService",["$location","$http","API","$q","connectionConfig",function(a,b,c,d,e){var f=this;this.ip=e.ip,window.globals={api_url:this.ip},this.usuarioLogado=null,this.isLoggedIn=function(){f.usuarioLogado=JSON.parse(window.localStorage.getItem("usuarioLogado")),null===f.usuarioLogado&&a.path("/login")},this.setUsuario=function(b){f.usuarioLogado=b,window.localStorage.setItem("usuarioLogado",JSON.stringify(b)),a.path("/mainAdmin")},this.logout=function(c){return b["delete"](f.ip+"access_tokens?access_token="+f.usuarioLogado.access_token).then(function(b){f.usuarioLogado=null,window.localStorage.setItem("usuarioLogado",JSON.stringify(null)),a.path("/login")})["catch"](function(a){console.error(a)})}}]),angular.module("dmInscricoesApp").service("ModalService",function(){this.show=function(a){$("#"+a).modal("show")},this.hide=function(a){$("#"+a).modal("hide")}}),angular.module("dmInscricoesApp").factory("httpInterceptor",["$q","$rootScope",function(a,b){return{request:function(b){return b||a.when(b)},responseError:function(b){return-1===b.status&&(b.data="Não foi possível estabelecer uma conexão com o servidor!"),a.reject(b)},response:function(a){return a}}}]),angular.module("dmInscricoesApp").factory("API",["$rootScope","connectionConfig",function(a,b){function c(a,b,c){var d={};return c&&(d[b]=c),Object.keys(a).forEach(function(b){d[b]=a[b]}),d}function d(a){var b=function(a,b,c){return b=["","[]"][0|b],a.length<2?[a[0],b,"=",c].join(""):[a[0],"["+a.slice(1).join("]["),"]",b,"=",c].join("")},c=function(d,e,f){d=d.concat([e]);var g=a;return d.forEach(function(a){g=g[a]}),g instanceof Date&&(g=[g.getFullYear(),g.getMonth()+1,g.getDate()].join("-")),g instanceof Array?g.map(b.bind(null,d,!0)).join("&"):"object"==typeof g&&null!==g?Object.keys(g).map(c.bind(null,d)).join("&"):b(d,!1,g)};return Object.keys(a).map(c.bind(null,[])).join("&")}function e(a){"/"===a[a.length-1]&&(a=a.substr(0,a.length-1)),this._domain=a,this._accessToken=localStorage.getItem(this._domain+":accessToken")||void 0}function f(a,b,c){this._url=[a,b].join("/"),this._accessToken=c||void 0}function g(b,c){this._url=b,this._active=!1,this._complete=!1;var d=this,e=new XMLHttpRequest;this._xhr=e;var f=c;return c=function(){d._complete=!0,f.apply(this,arguments),a.$digest()},this._callback=c,e.addEventListener("readystatechange",function(){var a;if(0===e.readyState)return void c.call(d,new Error("Request aborted"),null,[]);if(4===e.readyState){if(0===e.status)return void c.call(d,new Error("Request aborted"),null,[]);try{a=JSON.parse(e.responseText)}catch(b){return void c.call(d,new Error("Expected JSON, could not parse response"),null,[])}return a.meta&&a.meta.error?void c.call(d,a.meta.error,a,a.data||[]):void c.call(d,null,a,a.data||[])}}),e.addEventListener("error",function(a){c.call(d,a,null,[])}),this}return window.globals={api_url:b.ip},e.prototype.request=function(a){return"/"===a[0]&&(a=a.substr(1)),new f(this._domain,a,this._accessToken)},e.prototype.open=function(a,b){window.location=[[this._domain,a].join("/"),"?",d(c(b,"access_token",this._accessToken))].join("")},e.prototype.setAccessToken=function(a){a?(localStorage.setItem(this._domain+":accessToken",a),this._accessToken=a):this.clearAccessToken()},e.prototype.clearAccessToken=function(){localStorage.removeItem(this._domain+":accessToken"),this._accessToken=void 0},f.prototype.addAccessToken=function(a){return c(a,"access_token",this._accessToken)},f.prototype.addAccessTokenQueryString=function(){return this._accessToken?"?access_token="+this._accessToken:""},f.prototype.index=function(a,b){return new g(this._url,b).get(this.addAccessToken(a))},f.prototype.show=function(a,b,c){return new g(this._url+(a?"/"+a:""),c).get(this.addAccessToken(b))},f.prototype.destroy=function(a,b,c){return new g(this._url+(a?"/"+a:""),c).del(this.addAccessToken(b))},f.prototype.create=function(a,b){return new g(this._url+this.addAccessTokenQueryString(),b).post(a)},f.prototype.update=function(a,b,c){return new g(this._url+(a?"/"+a:"")+this.addAccessTokenQueryString(),c).put(b)},f.prototype.upload=function(a,b){return new g(this._url+this.addAccessTokenQueryString(),b).upload(a)},g.prototype.__checkActiveState__=function(){if(this._active)throw new Error("APIXHR is already active, can only be aborted.");return!0},g.prototype.__setActiveState__=function(){this._active=!0},g.prototype.abort=function(){if(!this._active)throw new Error("Cannot abort APIXHR that is not active");return this._complete||this._xhr.abort(),this},g.prototype.get=function(a){this.__checkActiveState__();var b=this._xhr;return b.open("GET",[this._url,d(a)].join("?")),b.send(),this.__setActiveState__(),this},g.prototype.del=function(a){this.__checkActiveState__();var b=this._xhr;return b.open("DELETE",[this._url,d(a)].join("?")),b.send(),this.__setActiveState__(),this},g.prototype.post=function(a){this.__checkActiveState__();var b=this._xhr;return b.open("POST",this._url),b.setRequestHeader("Content-Type","application/json"),b.send(JSON.stringify(a)),this.__setActiveState__(),this},g.prototype.put=function(a){this.__checkActiveState__();var b=this._xhr;return b.open("PUT",this._url),b.setRequestHeader("Content-Type","application/json"),b.send(JSON.stringify(a)),this.__setActiveState__(),this},g.prototype.upload=function(a){this.__checkActiveState__();var b=this._xhr;return b.open("POST",this._url),b.send(a),this.__setActiveState__(),this},new e(window.globals&&window.globals.api_url||"")}]),angular.module("dmInscricoesApp").service("UsuarioService",["$http","AuthService","$q","API",function(a,b,c,d){var e=b.ip;this.login=function(b){return a.post(e+"access_tokens",b)},this.logout=function(b){return a["delete"](e+"access_tokens?access_token="+b.access_token)},this.post=function(b){return a.post(e+"users",b)},this.get=function(){return a.get(e+"users")},this["delete"]=function(b){return a["delete"](e+"users/"+b)},this.put=function(a){function b(a,b){b?e.resolve(b):e.reject(a)}var e=c.defer();return d.request("users").update(a.id,a,b),e.promise}}]),angular.module("dmInscricoesApp").controller("LoginCtrl",["UsuarioModel","UsuarioService","$scope","AuthService","growl",function(a,b,c,d,e){c.usuario=new a.Usuario,c.logar=function(){b.login(c.usuario).then(function(a){d.setUsuario(a.data.data[0]),console.log(a)})["catch"](function(a){console.error(a),400===a.status?e.error("Usuário ou senha incorretos.",{ttl:4e3}):e.error(a.data.data[0],{ttl:4e3})})}}]),angular.module("dmInscricoesApp").service("UsuarioModel",function(){this.Usuario=function(){this.grant_type="password",this.username=void 0,this.password=void 0,this.nome=void 0}}),angular.module("dmInscricoesApp").controller("MainadminCtrl",["$scope","AuthService","InscricaoService","growl",function(a,b,c,d){function e(){c.getInscricoes().then(function(b){a.inscricoes=b.data.data,a.inscricoesAux=a.inscricoes})["catch"](function(a){console.error(a)})}b.isLoggedIn(),a.usuarioLogado=b.usuarioLogado,a.inscricoes=[],a.inscricoesAux=[],e(),a.confirmar=function(a){a.status="INSCRIÇÃO CONFIRMADA",c.confirmarInscricao(a).then(function(a){e();var b=a.data[0];c.sendMailConfirmation(b.nome,window.btoa(b.id),b.email).then(function(){console.log("email enviado"),d.success("Inscrição confirmada",{ttl:4e3})})["catch"](function(a){d.error(a),console.error(a)})})["catch"](function(a){console.error(a)})},a.logout=function(){b.logout()}}]),angular.module("dmInscricoesApp").constant("connectionConfig",{ip:"https://protected-ocean-80696.herokuapp.com/v1/"}),angular.module("dmInscricoesApp").controller("UsuariosCtrl",["$scope","AuthService","UsuarioService","ModalService","UsuarioModel","growl",function(a,b,c,d,e,f){function g(){c.get().then(function(b){a.usuarios=b.data.data,a.usuariosAux=a.usuarios})["catch"](function(a){f.error(a.data.error),console.error(a)})}b.isLoggedIn(),a.usuarios=[],a.usuariosAux=[],a.usuario=new e.Usuario,a.isNew=!0,g(),a.salvar=function(){a.isNew?c.post(a.usuario).then(function(a){g(),d.hide("modalNewUser")})["catch"](function(a){f.error(a.data.error),console.error(a)}):c.put(a.usuario).then(function(a){g(),d.hide("modalNewUser")})["catch"](function(a){f.error(a.data.error),console.error(a)})},a.novo=function(){a.usuario=new e.Usuario,a.isNew=!0,d.show("modalNewUser")},a.selecionaUsuario=function(b){a.usuario=b,a.isNew=!1,d.show("modalNewUser")},a.deleteUsuario=function(a){window.confirm("Tem certeza que deseja remover o usuario "+a.name+"?")&&c["delete"](a.id).then(function(a){g(),f.success("Usuario removido!",{ttl:4e3})})["catch"](function(a){f.error(a.data.error),console.error(a)})}}]),angular.module("dmInscricoesApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/inscricao.html",'<div class="container"> <div class="row"> <div class="row"> <div class="col-sm-12"> <h1>Inscrição</h1> </div> </div> </div> <div class="row" ng-if="update && !inscricao.comprovante && retornoSucesso === false && comprovanteOk === false"> <div class="row"> <div class="col-sm-12"> <button type="button" class="btn btn-success btn-lg btn-block" ng-click="openFile(this)" id="btnOpen"> Clique aqui para enviar seu comprovante </button> </div> </div> <br> </div> <div class="row"> <form name="frmInscricao" ng-if="retornoSucesso === false && comprovanteOk === false"> <div class="row" ng-if="inscricao.status"> <div class="col-sm-6"> <div class="form-group"> <label for="">Status da Inscrição:</label> <span class="form-control">{{inscricao.status}}</span> </div> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="form-group"> <label for="">Nome Completo:</label> <input type="text" class="form-control" id="" placeholder="" ng-model="inscricao.nome" required ng-disabled="update"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Email:</label> <input type="mail" class="form-control" id="" placeholder="" ng-model="inscricao.email" required ng-disabled="update"> </div> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="form-group"> <label for="">Data Nascimento:</label> <input type="text" date-mask class="form-control" id="" placeholder="" ng-model="inscricao.dt_nascimento" required ng-disabled="update"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Você é?</label> <select class="form-control" ng-model="inscricao.tipo" required ng-disabled="update"> <option value="DEMOLAY">DeMolay</option> <option value="DEMOLAYM">DeMolay/Maçom</option> <option value="MACOM">Maçom</option> <option value="VISITANTE">Visitante</option> </select> </div> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="form-group"> <label for="">Capítulo:</label> <input type="text" class="form-control" id="" placeholder="" ng-model="inscricao.capitulo" required ng-disabled="update"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Cidade:</label> <input type="text" class="form-control" id="" placeholder="" ng-model="inscricao.cidade" required ng-disabled="update"> </div> </div> </div> <div class="row"> <div class="col-sm-6" ng-if="inscricao.tipo === \'DEMOLAY\'"> <div class="form-group"> <label for="">Id DeMolay:</label> <input type="text" class="form-control" id="" placeholder="" ng-model="inscricao.id_demolay" required ng-disabled="update"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Tamanho Camiseta:</label> <select class="form-control" ng-model="inscricao.camiseta" required ng-disabled="update"> <option value="P">P</option> <option value="M">M</option> <option value="G">G</option> <option value="GG">GG</option> </select> </div> </div> </div> <div class="row" ng-if="idInscricao"> <div class="col-sm-6"> <div class="form-group"> <label for="">Comprovante:</label> <input class="form-control" accept="application/pdf" type="file" ng-model="comprovante.comprovanteBase64" base-sixty-four-input required ng-disabled="inscricao.comprovante" id="inputFile"> <a href="{{trustSrc(inscricao.comprovante)}}" target="_blank" ng-if="inscricao.comprovante">Ver comprovante</a> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Observações:</label> <textarea class="form-control" ng-disabled="inscricao.comprovante != null" ng-model="inscricao.observacao"></textarea> </div> </div> <!-- {{comprovante.comprovanteBase64 | json}} --> <!-- <a href="data:application/pdf;base64,{{inscricao.comprovante}}" target="_blank">VAi</a> --> </div> <div class="row"> <div class="col-sm-12"> <button type="button" class="btn btn-success pull-right" ng-click="salvar()" ng-disabled="frmInscricao.$invalid" ng-if="update === false"> <span class="glyphicon glyphicon-floppy-disk"></span> Salvar </button> <button type="button" class="btn btn-success pull-right" ng-click="atualizar()" ng-disabled="frmInscricao.$invalid" ng-if="update"> <span class="glyphicon glyphicon-floppy-disk"></span> Enviar Comprovante </button> </div> </div> </form> <div class="row" ng-if="retornoSucesso"> <div class="col-sm-12 text-center"> <h1>Parabéns {{retornoSucesso.nome}}</h1> <p>Sua inscrição foi realizada com sucesso! Um email com as informações de pagamento foi enviada para o email: {{retornoSucesso.email}}</p> <p> <a href="#/" class="btn btn-primary">Voltar</a> </p> </div> </div> <div class="row" ng-if="comprovanteOk"> <div class="col-sm-12 text-center"> <h1>Olá {{comprovanteOk.nome}}</h1> <p>O comprovante já foi recebido. Agora é só esperar sua inscrição ser confirmada!</p> <a href="#/" class="btn btn-primary">Voltar</a>  </div> </div> <br> </div> </div> <div class="modal fade" id="loadingInscricao" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> --> <h4 class="modal-title" id="">Inscrição VI CROD</h4> </div> <div class="modal-body"> <p>Aguarde. Sua inscrição está sendo processada.</p> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="row"> <div class="col-sm-12 text-center"> <h1>Área Administrativa - Login</h1> </div> </div> <div class="row"> <div class="col-sm-4 col-sm-offset-4"> <form name="frmLogin" ng-submit="logar()"> <div class="panel panel-primary"> <div class="panel-body"> <div class="col-sm-12"> <div class="form-group"> <label for="">Usuário:</label> <input type="text" class="form-control" id="" placeholder="" required ng-model="usuario.username"> </div> </div> <div class="col-sm-12"> <div class="form-group"> <label for="">Senha:</label> <input type="password" class="form-control" id="" placeholder="" required ng-model="usuario.password"> </div> </div> <div class="col-sm-12"> <button type="submit" class="btn btn-primary btn-block" ng-disabled="frmLogin.$invalid"> LOGAR </button> </div> </div> </div> </form> </div> </div>'),a.put("views/main.html",'<div class="row"> <div class="col-sm-6"> <div class="panel panel-warning"> <div class="panel-body" style="min-height: 200px"> <div class=""> <h3>Consulte sua Inscrição</h3> <form name="frmConsulta"> <div class="form-group"> <label for="">Código da Inscrição:</label> <input type="text" class="form-control" id="" required ng-model="codgInscricao"> </div> <a href="#/inscricao/{{codgInscricao}}" class="btn btn-primary btn-block btn-sm" ng-disabled="frmConsulta.$invalid">Consultar</a> </form> </div> </div> </div> </div> <div class="col-sm-6"> <div class="panel panel-warning"> <div class="panel-body" style="min-height: 200px"> <div class=""> <h3>Ainda não fez sua inscrição?</h3> <br> <br> <a href="#/inscricao" class="btn btn-success btn-block btn-lg">Fazer Inscrição</a> </div> </div> </div> </div> </div> <div class="row"> <div class="col-sm-12"> <div class="panel panel-default"> <div class="panel-heading"> <h4>Mais Informações</h4> </div> <div class="panel-body"> <div class="col-sm-6"> <h4>Local do evento:</h4> <!-- <div map-lazy-load="https://maps.google.com/maps/api/js" map-lazy-load-params="https://maps.google.com/maps/api/js">\n            <ng-map zoom="15" center="[-14.0541872, -52.1621021]">\n              <custom-marker position="[-14.056302, -52.161173]">\n                <div class="cm">\n                  Câmara de vereadores\n                </div>\n              </custom-marker>\n            </ng-map>\n          </div> --> <strong><p>A.\'.R.\'.L.\'.S.\'. Luzes dos Terceiro Milênio</p></strong> <p>Rua 14, S/N - Guarujá, Água Boa - MT</p> </div> <div class="col-sm-6"> <h4>Alojamento e refeições:</h4> <strong><p>Escola Estadual Antônio Gröhs</p></strong> <p>Rua 7, 456 - Centro, Água Boa - MT</p> </div> </div> </div> </div> </div>'),a.put("views/mainadmin.html",'<div class="containers"> <div class="row"> <div class="col-sm-12"> <h1>Área Administrativa</h1> </div> <div class="col-sm-12"> <div class="well well-sm clearfix"> <a href="#/usuarios">Cadastro de Usuários</a> <div class="pull-right"> <a href="" ng-click="logout()">SAIR</a> </div> </div> </div> </div> <div class="row"> <div class="col-sm-12"> <table class="table table-hover table-striped table-condensed" st-table="inscricoes" st-safe-src="inscricoesAux"> <thead> <tr> <th colspan="5"> <input type="text" class="form-control" st-search="nome" placeholder="Filtrar por nome"> </th> <th> <input type="text" class="form-control" st-search="cidade" placeholder="Filtrar por cidade"> </th> <th> <select class="form-control" st-search="tipo"> <option value="">Tudo</option> <option value="DEMOLAY">DeMolay</option> <option value="DEMOLAYM">DeMolay/Maçom</option> <option value="MACOM">Maçom</option> <option value="VISITANTE">Visitante</option> </select> </th> <th> <select class="form-control" st-search="camiseta"> <option value="">Tudo</option> <option value="P">P</option> <option value="M">M</option> <option value="G">G</option> <option value="GG">GG</option> </select> </th> <th colspan="3"> <select class="form-control" st-search="status"> <option value="">Tudo</option> <option value="INSCRIÇÃO REALIZADA">INSCRIÇÃO REALIZADA</option> <option value="COMPROVANTE ENVIADO">COMPROVANTE ENVIADO</option> <option value="INSCRIÇÃO CONFIRMADA">INSCRIÇÃO CONFIRMADA</option> </select> </th> </tr> <tr> <th>ID</th> <th>Nome</th> <th>Email</th> <th>Dt. Nascimento</th> <th>Capítulo</th> <th>Cidade</th> <th>Tipo</th> <th>Camiseta</th> <th>Status</th> <th>Comprovante</th> <th>Confirmar</th> </tr> </thead> <tbody> <tr ng-repeat="i in inscricoes"> <td>{{i.id}}</td> <td>{{i.nome}}</td> <td>{{i.email}}</td> <td>{{i.dt_nascimento | date:\'dd/MM/yyyy\'}}</td> <td>{{i.capitulo}}</td> <td>{{i.cidade}}</td> <td>{{i.tipo}}</td> <td>{{i.camiseta}}</td> <td>{{i.status}}</td> <td class="text-center"> <a href="{{i.comprovante}}" ng-disabled="!i.comprovante" class="btn btn-primary btn-xs" title="Fazer download comprovante" target="_blank"> <span class="glyphicon glyphicon-download"></span> </a> </td> <td class="text-center"> <button ng-disabled="!i.comprovante || i.status === \'INSCRIÇÃO CONFIRMADA\'" type="button" class="btn btn-success btn-xs" title="Confirmar inscrição" ng-click="confirmar(i)"> <span class="glyphicon glyphicon-ok"></span> </button> </td> </tr> </tbody> <tfoot> <tr> <td colspan="11" class="text-center"> <div st-pagination="" st-items-by-page="10" st-displayed-pages="7"></div> </td> </tr> </tfoot> </table> </div> </div> </div>'),a.put("views/usuarios.html",'<div class="row"> <div class="col-sm-12"> <h1>Cadastro de Usuários</h1> </div> <div class="col-sm-12"> <div class="well well-sm clearfix"> <div class="pull-right"> <a href="" class="btn btn-primary btn-xs" ng-click="novo()">NOVO</a> </div> </div> </div> </div> <div class="row"> <div class="col-sm-12"> <table class="table table-hover table-striped table-condensed"> <thead> <tr> <th>ID</th> <th>Nome</th> <th>Email</th> <th>Username</th> <th class="text-center">Editar</th> <th class="text-center">Remover</th> </tr> </thead> <tbody> <tr ng-repeat="u in usuarios"> <td>{{u.id}}</td> <td>{{u.name}}</td> <td>{{u.email}}</td> <td>{{u.username}}</td> <td class="text-center"> <button type="button" class="btn btn-warning btn-xs" ng-click="selecionaUsuario(u)"> <span class="glyphicon glyphicon-pencil"></span> </button> </td> <td class="text-center"> <button type="button" class="btn btn-danger btn-xs" ng-click="deleteUsuario(u)"> <span class="glyphicon glyphicon-trash"></span> </button> </td> </tr> </tbody> </table> </div> </div> <div class="modal fade" id="modalNewUser" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="">Adicionar/Editar Usuário</h4> </div> <form name="frmNewUser" ng-submit="salvar()"> <div class="modal-body"> <div class="row"> <div class="col-sm-6"> <div class="form-group"> <label for="">Nome:</label> <input type="text" class="form-control" id="" required ng-model="usuario.name"> </div> </div> <div class="col-sm-6"> <div class="form-group"> <label for="">Email:</label> <input type="email" class="form-control" id="" required ng-model="usuario.email"> </div> </div> </div> <div class="row"> <div class="col-sm-6"> <div class="form-group"> <label for="">Username:</label> <input type="text" class="form-control" id="" required ng-model="usuario.username"> </div> </div> <div class="col-sm-6" ng-if="isNew"> <div class="form-group"> <label for="">Senha:</label> <input type="password" class="form-control" id="" required ng-model="usuario.password"> </div> </div> </div> </div> <div class="modal-footer"> <button type="submit" class="btn btn-primary" ng-disabled="frmNewUser.$invalid">Salvar</button> <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button> </div> </form> </div> </div> </div>')}]);