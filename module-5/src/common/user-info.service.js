(function () {
"use strict";

angular.module('common')
.service('UserInfoService', UserInfoService);

function UserInfoService() {
  var service = this;

  service.user = emptyUser();
  service.userExist = false;
  
  service.logUserInfo = function () {
    console.log("user info ", service.user);
  };

  service.getEmptyUserInfo = function () {
    return emptyUser();
  };

  function emptyUser() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      menunumber: "",
      iteminfo: {
        title: "",
        description: "",
        image: ""
      }
    };
  };

}



})();
