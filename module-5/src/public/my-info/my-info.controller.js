(function () {

angular.module('restaurant')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserInfoService'];
function InfoController(UserInfoService) {
  var info = this;

	info.userExist = UserInfoService.userExist;
  info.user = UserInfoService.user;
  console.log("InfoController: ", info.userExist);
  console.log("InfoController: ", info.user);
}

})();