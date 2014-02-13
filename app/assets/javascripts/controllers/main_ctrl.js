Blog.factory('User', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/users',
        name: 'user'
    });
    return resource;
}]);

Blog.factory('UserModel', ['$resource', function ($resource){
  return $resource('/users/:id.json', {id: '@id'});
}])

Blog.factory('Follower', ['$resource', function ($resource){
  return $resource('/followers/:id.json', {id: '@id'}, {
    follow:   {method: 'POST', params: {id: '@id'}, url: '/followers/:id/follow.json'},
    unfollow: {method: 'POST', params: {id: '@id'}, url: '/followers/:id/unfollow.json'}
  });
}])

Blog.factory('Post', ['railsResourceFactory', 'User', function (railsResourceFactory, User) {
    var resource = railsResourceFactory({
      url: '/posts',
      name: 'post'
    });

    return resource;
}]);


// Blog.factory('Follower', ['railsResourceFactory', function (railsResourceFactory) {
//     var resource = railsResourceFactory({
//       url: '/followers',
//       name: 'follower'
//     });
//     resource.follow = function (follower_id) {
//       this.$post('/followers/'+follower_id+'/follow');
//     };
//     resource.unfollow = function (follower_id) {
//       this.$post('/followers/'+follower_id+'/unfollow');
//     };
//     return resource;
// }]);


Blog.controller('MainCtrl', ['$scope', 'Post', 'UserModel', function ($scope, Post, UserModel) {
    $scope.text = 'Main controller text';

    $scope.loadPosts = function () {
      $scope.loading = true;

      Post.query().then(function (results) {
        $scope.posts   = results;
        $scope.user    = UserModel.get({id: 1});
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

Blog.controller('FollowCtrl', ['$scope', 'UserModel', 'Follower', function ($scope, UserModel, Follower) {
    $scope.text = 'Hello, Angular fanatic.';

    $scope.users = UserModel.query();

    // $scope.following = Follower.query();
    $scope.following = Follower.query();


    $scope.toggleFollow = function (follower_id) {
        console.log($scope.following);
      console.log(['toggle follow', follower_id]);
      if ($scope.following.indexOf(follower_id) === true)
        Follower.follow({id: follower_id});
      else
        Follower.unfollow({id: follower_id});

    }

}]);

