(function () {

angular.module('restaurant')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserInfoService'];
function SignUpController(MenuService, UserInfoService) {
  var reg = this;

  reg.messageAfterSubmit = "";
  reg.showMessageAfterSubmit = false;

  reg.user = UserInfoService.getEmptyUserInfo();

  reg.submit = function () {
    reg.completed = true;
  };

  reg.submitTest = function () {

    reg.showMessageAfterSubmit = true;	

    var promise = MenuService.getItemInfo(reg.user.menunumber);
    promise.then(function (response) {
      UserInfoService.user = reg.user;
      UserInfoService.user.iteminfo = response;
      UserInfoService.userExist = true;
      reg.messageAfterSubmit = "Your information has been saved";
      UserInfoService.logUserInfo();
    })
    .catch(function (error) {
    	reg.messageAfterSubmit = "No such menu number exists";
      console.log("Something went terribly wrong.", UserInfoService.user);
    }); 

  };

}

})();
