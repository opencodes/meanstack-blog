(function() {
	
	/**
	*  Module BlogAPP
	*
	* Description
	*/
	var app = angular.module('BlogAPP', ['ngRoute']);
	/**
	 * [description]
	 * @param  {[type]} $scope          [description]
	 * @return {[type]}                 [description]
	 */
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
	      when('/', {
	        templateUrl: 'views/home.html',
	        controller: 'MainController'
	      }).
	      when('/user/signup', {
	        templateUrl: 'views/register.html',
	        controller: 'SignupController'
	      }).
	      when('/user/login', {
	        templateUrl: 'views/login.html',
	        controller: 'LoginController'
	      }).
	      when('/user/logout', {
	        controller: 'LogoutController',
	        template: 'Logout'
	      }).	      
	      when('/post/id/:id', {
	        templateUrl: 'views/post.html',
	        controller: 'PostController'
	      }).
	      when('/post/add', {
	        templateUrl: 'views/addpost.html',
	        controller: 'AddPostController'
	      }).	     
	      otherwise({
	        redirectTo: '/'
	      });

	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope){			}] [description]
	 * @return {[type]}                 [description]
	 */
	app.controller('LoginController', ['$scope', 'UserService', '$location','$rootScope', function($scope, UserService, $location,$rootScope){
		
		$scope.user = {};
		$scope.submitLogin = function(user) {
			UserService.login(user).then(function(response) {
				if (response.data) {
					window.localStorage.setItem('user',response.data.data.username);
					window.localStorage.setItem('user_id',response.data.data._id);
					$scope.user = null;
					$location.path('/');
				};
				
			})
		}
		
	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope           [description]
	 * @param  {[type]} UserService      [description]
	 * @param  {[type]} $location        [description]
	 * @param  {[type]} $rootScope){	} [description]
	 * @return {[type]}                  [description]
	 */
	app.controller('LogoutController', ['$scope', 'UserService', '$location','$rootScope', function($scope, UserService, $location,$rootScope){
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('user_id');
		$location.path('/');
	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope){			}] [description]
	 * @return {[type]}                 [description]
	 */
	app.controller('SignupController', ['$scope', 'UserService', '$routeParams','$location', function($scope, UserService, $routeParams, $location){
		$scope.user = {};
		$scope.submitRegister = function(user) {
			UserService.signup(user).then(function(response) {
				$location.path('/');				
			})
		}
	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope){			}] [description]
	 * @return {[type]}                 [description]
	 */
	app.controller('MainController', ['$scope', 'PostService', function($scope, PostService){
		$scope.siteName = "Blog APP";
		PostService.list().then(function(response) {
			$scope.posts = response.data.data;
		})
	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope){			}] [description]
	 * @return {[type]}                 [description]
	 */
	app.controller('PostController', ['$scope', 'PostService', '$routeParams','$rootScope', function($scope, PostService, $routeParams, $rootScope){
		function getPostById (id) {
			PostService.byId(id).then(function(response) {
				$scope.post = response.data.data;
			})
		}
		getPostById($routeParams.id);

		$scope.submitComment = function (comment) {
			comment.user = $rootScope.user;
			comment.post_id = $scope.post._id;
			console.log("Comment", comment);
			PostService.comment(comment).then(function (response) {
				getPostById($routeParams.id);
			})
		}
	}]);
	/**
	 * [description]
	 * @param  {[type]} $scope){			}] [description]
	 * @return {[type]}                 [description]
	 */
	app.controller('AddPostController', ['$scope', 'PostService', '$routeParams','$rootScope', '$location', function($scope, PostService, $routeParams, $rootScope, $location){
		$scope.post = {};
		$scope.submitPost = function(post) {
			post.username = $rootScope.user;

			PostService.add(post).then(function(response) {
				if (response.data) {					
					$scope.post = {};
					$location.path('/');
				};
				
			})
		}
	}]);
	/**
	 * [description]
	 * @param  {[type]} ){			}] [description]
	 * @return {[type]}           [description]
	 */
	app.factory('UserService', ['$http', function($http){
		return {
			login : function(logindata) {
				
			    // Simple GET request example:
				return $http.post('http://localhost:3000/user/login', logindata);
			},
			signup : function (userdata) {
				return $http.post('http://localhost:3000/user/register', userdata);
			}
		}		
	}]);
	/**
	 * [description]
	 * @param  {[type]} ){			}] [description]
	 * @return {[type]}           [description]
	 */
	app.factory('PostService', ['$http', function($http){
		return {
			list : function() {
				return $http.get('http://localhost:3000/blog/post/list');
			},
			byId : function (id) {
				return $http.get('http://localhost:3000/blog/post/id/' + id);
			},
			add : function(postdata){
				return $http.post('http://localhost:3000/blog/post', postdata);
			},
			comment : function(comment) {
				return $http.post('http://localhost:3000/blog/post/comment', comment);
			}
		}		
	}]);

	app.run(['$http','$rootScope','$location', function($http, $rootScope, $location) {
		$rootScope.$on('$routeChangeStart', function (eve, next, curr) {
			$rootScope.user = window.localStorage.getItem('user') || null;
			$rootScope.user_id = window.localStorage.getItem('user_id') || null;
			$rootScope.lastId = window.localStorage.getItem('lastId') || null;
			//next : $$route {all route params,originalPath}
			if (!$rootScope.user && next.$$route.originalPath != "/user/signup") { 
				$location.path('/user/login')
			};			
		});		
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
    }
]);
	

})();