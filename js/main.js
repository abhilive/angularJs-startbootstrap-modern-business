/**
 * AngularJS Implementation
 * @author Abhishek Srivastava <cs.abhilive@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('ngWebApp', [
  'ngRoute', 'ngAnimate', 'ui.bootstrap'
]);

//use template cache to override carousel template - prev & next arrow glyphicon replaced by font-awesome icons.
app.run(function($templateCache) {
  $templateCache.put("uib/template/carousel/carousel.html",
      "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
      " <div class=\"carousel-inner\" ng-transclude></div>\n" +
      " <a role=\"button\" href class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\">\n" +
      " <span aria-hidden=\"true\" class=\"icon-prev\"></span>\n" +
      " <span class=\"sr-only\">previous</span>\n" +
      " </a>\n" +
      " <a role=\"button\" href class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\">\n" +
      " <span aria-hidden=\"true\" class=\"icon-next\"></span>\n" +
      " <span class=\"sr-only\">next</span>\n" +
      " </a>\n" +
      " <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
      " <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
      " <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
      " </li>\n" +
      " </ol>\n" +
      "</div>\n" +
    "");
  $templateCache.put("uib/template/carousel/slide.html",
      "<div ng-class=\"{'active': active}\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
	
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        // test for current route
        if(current.$$route) {
            // Set current page title 
            $rootScope.title = current.$$route.title;
        }

        $rootScope.isActive = function (viewLocation) { 
        	// Set the class of selected menu item 'active'
        	//return viewLocation === $location.path();
        	return ($location.path().substr(0, viewLocation.length) === viewLocation) ? 'active' : '';
    	};
    });
}]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider){
  $routeProvider
    // Home
    .when("/", {title: 'Modern Business - Start Bootstrap Template', templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {title: 'Modern Business - About', templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/services", {title: 'Modern Business - Services', templateUrl: "partials/services.html", controller: "PageCtrl"})
	.when("/contact", {title: 'Modern Business - Contact', templateUrl: "partials/contact.html", controller: "PageCtrl"})
	// Portfolio
	.when("/portfolio/portfolio-1-col", {title: 'Modern Business - Portfolio 1 Column', templateUrl: "partials/portfolio-1-col.html", controller: "PageCtrl"})
	.when("/portfolio/portfolio-2-col", {title: 'Modern Business - Portfolio 2 Column', templateUrl: "partials/portfolio-2-col.html", controller: "PageCtrl"})
	.when("/portfolio/portfolio-3-col", {title: 'Modern Business - Portfolio 3 Column', templateUrl: "partials/portfolio-3-col.html", controller: "PageCtrl"})
	.when("/portfolio/portfolio-4-col", {title: 'Modern Business - Portfolio 4 Column', templateUrl: "partials/portfolio-4-col.html", controller: "PageCtrl"})
	.when("/portfolio/portfolio-item", {title: 'Modern Business - Portfolio Item', templateUrl: "partials/portfolio-item.html", controller: "PageCtrl"})
	// Blog
    .when("/blog/blog-home-1", {title: 'Modern Business - Blog Home 1', templateUrl: "partials/blog-home-1.html", controller: "BlogCtrl"})
    .when("/blog/blog-home-2", {title: 'Modern Business - Blog Home 2', templateUrl: "partials/blog-home-2.html", controller: "BlogCtrl"})
    .when("/blog/post", {title: 'Modern Business - Blog Post', templateUrl: "partials/blog-post.html", controller: "BlogCtrl"})

	//Others
	.when("/others/full-width", {title: 'Modern Business - Full Width', templateUrl: "partials/full-width.html", controller: "PageCtrl"})
	.when("/others/sidebar", {title: 'Modern Business - Sidebar', templateUrl: "partials/sidebar.html", controller: "PageCtrl"})

    .when("/others/faq", {title: 'Modern Business - FAQ', templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/others/pricing", {title: 'Modern Business - Pricing', templateUrl: "partials/pricing.html", controller: "PageCtrl"})

    .when("/others/404", {title: 'Modern Business - 404 Page', templateUrl: "partials/404.html", controller: "PageCtrl"})
    // else 404
    .otherwise({redirectTo : '/others/404'});

    //remove # from URLs - For Production Use Only
    /*$locationProvider.html5Mode({
  	  enabled: true,
  	  requireBase: false
  	});*/
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

app.controller('NavigationCtrl', function ( $rootScope, $location, $http ) {
	console.log("Nav Controller reporting for duty.");
	var vm = this;
    vm.isCollapsed = true;
    vm.toggleCollapse = toggleCollapse;

    function toggleCollapse() {
        vm.isCollapsed = !vm.isCollapsed;
    }
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $anchorScroll, $http, $window ) {
  console.log("Page Controller reporting for duty.");

  		$scope.slideInterval = 3000;
	  	$scope.noWrapSlides = false;
	  	$scope.active = 0;
		  var slides = $scope.slides = [
		  		{image: 'http://placehold.it/1900x455&text=Slide One', text: 'Caption 1', id: 0 },
	            {image: 'http://placehold.it/1900x455&text=Slide Two', text: 'Caption 2', id: 1 },
	            {image: 'http://placehold.it/1900x455&text=Slide Three', text: 'Caption 3', id: 2 }
		  ];
		  var currentIndex = 1;

      // Activates Tooltips for Social Links
      /*$('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
      })*/
      // create a blank object to handle form data.
      $scope.user = {};
      // Contact Form Submit See: contact.html
      // function to submit the form after all validation has occurred            
        $scope.submitContactForm = function() {
            // check to make sure the form is completely valid
            if ($scope.contactForm.$valid) {
                // Posting data to php file
                $http({
                  method  : 'POST',
                  url     : 'bin/contact_me.php',
                  data    : $scope.user, //forms user object
                  headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success(function(data) {
                    if (data.errors) {
                      // Showing errors.
                      $scope.errorName = data.errors.name;
                      $scope.errorPhone = data.errors.phone;
                      $scope.errorEmail = data.errors.email;
                    } else {
                      $scope.message = data.message;
                    }
                });
              // call $anchorScroll()
              //$anchorScroll.yOffset = 50; 
              $window.scrollTo(0, 0);
            }
        };
});