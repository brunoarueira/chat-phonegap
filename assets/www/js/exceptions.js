(function(){
   window.onexception = function(e) {
	   alert('Got an exception ' + e.message)
   };
   
   /**
    * Wrap function with exception caturer.
    * */
   var captureExceptions = function(origFn) {
      return function () {
         try {
            origFn.apply(this, arguments);
         }
         catch  (e) {
            window.onexception(e);
            throw e;
         }
      };
   };

   /**
    * Wraps callbacks in object methods
    *
    * */
   var wrapCallbackFunction = function(obj, fnName, callbackIndex) {
      var origFn = obj[fnName];

      obj[fnName] = function() {
         var args = [].slice.call(arguments);
         args[callbackIndex] = captureExceptions(args[callbackIndex]);
         origFn.apply(this, args);
      };
   };

   wrapCallbackFunction(window, "addEventListener", 1);
   wrapCallbackFunction(Node.prototype, "addEventListener", 1);
   wrapCallbackFunction(window, "setTimeout", 0);
   wrapCallbackFunction(window, "setInterval", 0);
}());