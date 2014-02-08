Blog.factory('User', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/users',
        name: 'user'
    });
    return resource;
}]);

Blog.factory('Post', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/posts',
        name: 'post'
    });
    resource.prototype.getUser = function () {
        return User.get(this.userId);
    };
    return resource;
}]);


Blog.controller('MainCtrl', ['$scope', 'Post', function ($scope, Post) {
    $scope.text = 'Main controller text';

    $scope.loadPosts = function () {
      $scope.loading = true;

      Post.query().then(function (results) {
          $scope.posts = results;
          $scope.loading = false;
      }, function (error) {
          console.log(["error", error]);
          $scope.loading = false;
      });
    };


    $scope.edit = function () {
      $scope.editing = true;
    }

    $scope.update = function (post) {
      post.update().then(function (result) {
        $scope.invalid = false;
      }, function (error){
        $scope.invalid = true;
      });
    }

    $scope.getUser = function (post) {
        $scope.user = post.getUser();
    };

}]);

Blog.controller('TestCtrl', ['$scope', function ($scope) {
    $scope.text = 'Hello, Angular fanatic.';

    $scope.following = {13: false, 7: true};

    $scope.follow = function (user_id) {
      console.log(['toggle follow', user_id])
      console.log($scope.following);

    }

}]);