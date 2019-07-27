var VrControl = function (object, onError) {
  function callback(displays) {
    vrDisplays = displays;
    if (displays.length > 0) {
      vrDisplay = displays[0];
    } else {
      if (onError) {
        onError('VR input not available.');
      }
    }
  }
  var vrDisplay;
  var vrDisplays;
  var info = this;
  var standingMatrix = new THREE.Matrix4();
  var frameData = null;
  var vector = new THREE.Vector3().setFromMatrixPosition(object.matrixWorld);
  var q = object.quaternion.clone();
  var position = new THREE.Vector3();
  var orientation = new THREE.Quaternion();
  var p2 = new THREE.Vector3();
  if ('VRFrameData' in window) {
    frameData = new VRFrameData();
  }
  if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(callback).catch(function () {
      console.warn('THREE.VRControls: Unable to get VR Displays');
    });
  }
  this.scale = 1;
  this.standing = false;
  this.userHeight = 1.6;
  this.getVRDisplay = function () {
    return vrDisplay;
  };
  this.setVRDisplay = function (value) {
    vrDisplay = value;
  };
  this.getVRDisplays = function () {
    return console.warn('THREE.VRControls: getVRDisplays() is being deprecated.'), vrDisplays;
  };
  this.getStandingMatrix = function () {
    return standingMatrix;
  };
  this.setPosition = function (object) {
    vector.setFromMatrixPosition(object.matrixWorld);
    if (frameData.pose.position) {
      p2.set(frameData.pose.position[0], frameData.pose.position[1], frameData.pose.position[2]);
      vector.sub(p2);
    }
  };
  this.getPosition = function () {
    return vector;
  };
  this.setOrientation = function (o) {
    q.copy(o.quaternion);
  };
  this.getOrientation = function (options) {
    return q;
  };
  this.hasInput = function () {
    return null !== frameData;
  };
  this.update = function () {
    if (vrDisplay) {
      var pose;
      if (vrDisplay.getFrameData) {
        vrDisplay.getFrameData(frameData);
        pose = frameData.pose;
      } else {
        if (vrDisplay.getPose) {
          pose = vrDisplay.getPose();
        }
      }
      if (null !== pose.orientation) {
        orientation.fromArray(pose.orientation);
        object.quaternion.multiplyQuaternions(q, orientation).normalize();
      }
      if (null !== pose.position) {
        position.fromArray(pose.position);
        position.applyQuaternion(q);
        object.position.addVectors(vector, position);
      } else {
        object.position.set(0, 0, 0);
      }
      if (this.standing) {
        if (vrDisplay.stageParameters) {
          object.updateMatrix();
          standingMatrix.fromArray(vrDisplay.stageParameters.sittingToStandingTransform);
          object.applyMatrix(standingMatrix);
        } else {
          object.position.setY(object.position.y + this.userHeight);
        }
      }
      object.position.multiplyScalar(info.scale);
    }
  };
  this.resetPose = function () {
    if (vrDisplay) {
      vrDisplay.resetPose();
    }
  };
  this.resetSensor = function () {
    console.warn('THREE.VRControls: .resetSensor() is now .resetPose().');
    this.resetPose();
  };
  this.zeroSensor = function () {
    console.warn('THREE.VRControls: .zeroSensor() is now .resetPose().');
    this.resetPose();
  };
  this.dispose = function () {
    vrDisplay = null;
  };
};
export default VrControl;
