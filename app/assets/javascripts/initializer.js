// Initialize local application
var Blog = angular.module('Blog', ['ui.bootstrap','rails','ngResource']);

Blog.config(["RailsResourceProvider", function (RailsResourceProvider) {
    RailsResourceProvider.updateMethod('patch');
}]);
Blog.config(["railsSerializerProvider", function (railsSerializerProvider) {
    railsSerializerProvider.underscore(angular.identity).
      camelize(angular.identity).
      exclusionMatchers([/^id$/, 'created_at', 'updated_at']);
}]);