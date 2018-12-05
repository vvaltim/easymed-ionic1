// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app.controllers', []);
angular.module('app.routes', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('app.factories', []);

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'app.factories', 'ionic-datepicker', 'ionic-timepicker'])
  .config(function ($ionicConfigProvider, $sceDelegateProvider, ionicTimePickerProvider, ionicDatePickerProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

    //datapicker
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Selecione a data',
      setLabel: 'ok',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      mondayFirst: true,
      weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      templateType: 'popup',
      from: new Date(),             //desativar datas anteriores
      to: new Date(2018, 8, 1),             //desativar datas futuras
      showTodayButton: true,
      dateFormat: 'dd-MM-yyyy',
      closeOnSelect: false,           //se for true, ele desaparece apos selecionar a data
      disableWeekdays: []     //pode ser adicionado as datas que deseja desativar
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    //timepicker
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      claseLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  /*
    This directive is used to disable the "drag to open" functionality of the Side-Menu
    when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag() {
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag() {
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function (scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function (val) {
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });