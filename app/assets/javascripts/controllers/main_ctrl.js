Blog.factory('User', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/users',
        name: 'user'
    });
    return resource;
}]);

Blog.factory('Post', ['railsResourceFactory', 'User', function (railsResourceFactory, User) {
    var resource = railsResourceFactory({
      url: '/posts',
      name: 'post'
    });
    resource.prototype.getUser = function () {
      console.log(['User.get', this.user_id]);
      return User.get(this.user_id);
    };
    return resource;
}]);

Blog.factory('Follower', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/followers',
        name: 'follower'
    });
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
        $scope.editing = false;
      }, function (error){
        $scope.invalid = true;
      });
    }

    $scope.getUser = function (post) {
      $scope.user = post.getUser();
    };

}]);

Blog.controller('FollowCtrl', ['$scope', 'User', 'Follower', function ($scope, User, Follower) {
    $scope.text = 'Hello, Angular fanatic.';

    User.query().then(function (results) {
      $scope.users = results;
    }, function (error) {
      console.log(["error", error]);
    });


    Follower.query().then(function (results) {
      following = {}
      for (var i=0; i < results.length; i++)
        following[results[i]] = true;
      $scope.following = following;
      console.log($scope.following);
    }, function (error) {
      console.log(["error", error]);
    });

    $scope.toggleFollow = function (user_id) {
      console.log(['toggle follow', user_id])
      console.log($scope.following);

    }

}]);