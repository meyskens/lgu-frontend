"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var authentication_service_1 = require("../services/authentication.service");
var app_constants_1 = require("../app.constants");
var UserService = /** @class */ (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.getUsers = function () {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        // get users from api
        //noinspection TypeScriptValidateTypes
        return this.http.get(app_constants_1._BACK_END_URL + '/v1/user/', options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getUserInfo = function () {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(app_constants_1._BACK_END_URL + '/v1/user/info', options)
            .map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            authentication_service_1.AuthenticationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map