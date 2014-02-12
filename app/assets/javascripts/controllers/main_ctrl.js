Blog.factory('User', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/users',
        name: 'user'
    });
    return resource;
}]);

Blog.factory('UserGet', ['$resource', function ($resource){
  // test of posts directly with AngularJS $resource
  // return $resource('users/:id.json', {}, {
  //   query: {method: 'GET', params:{id: 'list'}, isArray: true}
  // });
  return $resource('/users/:id.json', {id:'@id'});
}])

Blog.factory('Post', ['railsResourceFactory', 'User', function (railsResourceFactory, User) {
    var resource = railsResourceFactory({
      url: '/posts',
      name: 'post'
    });
    // This is totally off on the wrong tangent
    // resource.prototype.getUser = function () {
    //   User.get(this.user_id).then(function (user) {
    //     this.user = user;
    //   }, function (errors) {
    //     $scope.errors = errors.data;
    //   });
    // };
    return resource;
}]);

Blog.factory('Follower', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
      url: '/followers',
      name: 'follower'
    });
    resource.follow = function (follower_id) {
      this.$post('/followers/'+follower_id+'/follow');
    };
    resource.unfollow = function (follower_id) {
      this.$post('/followers/'+follower_id+'/unfollow');
    };
    return resource;
}]);


Blog.controller('MainCtrl', ['$scope', 'Post', 'UserGet', function ($scope, Post, UserGet) {
    $scope.text = 'Main controller text';

    $scope.loadPosts = function () {
      $scope.loading = true;

      Post.query().then(function (results) {
        $scope.posts   = results;
        $scope.user    = UserGet.get({id: 1});
        $scope.loading = false;
      }, function (errors) {
        $scope.errors  = errors.data;
        $scope.loading = false;
      });
    };


    $scope.edit = function (post) {
      post.temp = post.dup;
      post.editing = true;
    }

    $scope.update = function (post) {
      post.update().then(function (result) {
        post.errors = {};
        post.invalid = false;
        post.editing = false;
      }, function (errors){
        post.errors = errors.data.errors;
        console.log(['post.errors', post.errors]);
        post.invalid = true;
        post.editing = true;
      });
    };

    $scope.cancel = function (post) {
      post.editing = false;
    };

    $scope.getUser = function (post) {
      post.user = post.getUser();
    };

}]);

Blog.controller('FollowCtrl', ['$scope', 'UserGet', 'Follower', function ($scope, UserGet, Follower) {
    $scope.text = 'Hello, Angular fanatic.';

    // User.query().then(function (results) {
    //   $scope.users = results;
    // }, function (errors) {
    //   console.log("errors" + errors);
    // });
    $scope.users = UserGet.query();

    Follower.query().then(function (results) {
      // get an array back, map to {id: true/false} for by-ref manipulation
      following = {};
      for (var i=0; i < results.length; i++) {
        console.log(['map followers', results[i], true]);
        following[results[i]] = true;
      }
      $scope.following = following;
    }, function (errors) {
      console.log(["errors", errors]);
    });

    $scope.toggleFollow = function (follower_id) {
      console.log(['toggle follow', follower_id]);
      if ($scope.following[follower_id])
        Follower.follow(follower_id);
      else
        Follower.unfollow(follower_id);
      console.log($scope.following);

    }

}]);

