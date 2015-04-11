window.addEventListener('load', function() {
  var camera;

  function main() {
    sensible.fxos.Application.prototype.onBeforeStart = onBeforeStart;
    sensible.fxos.Application.prototype.onAfterStart = onAfterStart;
    sensible.fxos.Application.prototype.flash_set = setFlash;

    sensible.ApplicationFactory.createApplication(function (error) {
      if (error) {
        console.error('Error: ', error);
      }
    });
  }

  function getCamera(callback) {
    function onSuccess(d) {
      console.log('got camera');
      var cameraObj = d.camera;
      var flashModes = cameraObj.capabilities.flashModes;
      gSensibleApplication.setProperty('flashModes', flashModes);
      camera = cameraObj;
      callback();
    }

    function onError(error) {
      console.warn('getCamera failed:', error);
      callback();
    }

    var cameras = navigator.mozCameras.getListOfCameras();
    // FxOS 3.0+ Camera API
    navigator.mozCameras.getCamera(cameras[0], null).then(onSuccess, onError);
  }

  function onBeforeStart(callback) {
    callback();
  }

  function onAfterStart(callback) {
    getCamera(callback);
  }

  function setFlash(request, callback) {
    var mode = request.parameters.mode;
    var success = false;
    if (camera) {
      var flashModes = camera.capabilities.flashModes;
      if (flashModes.indexOf(mode) >= 0) {
        camera.flashMode = mode;
        success = true;
      }
    }
    var response = {
      type: 'json',
      object: { success: success }
    };
    callback(response);
  }

  main();
});
