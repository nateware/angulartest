// Initialize local application
var Blog = angular.module('Blog', ['rails']);

Blog.config(["RailsResourceProvider", function (RailsResourceProvider) {
    RailsResourceProvider.updateMethod('patch');
}]);
Blog.config(["railsSerializerProvider", function (railsSerializerProvider) {
    railsSerializerProvider.underscore(angular.identity).camelize(angular.identity);
}]);