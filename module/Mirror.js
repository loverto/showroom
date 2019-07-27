var mirrorShader = {
  uniforms: {
    color: { value: new THREE.Color(8355711) },
    mirrorSampler: { value: null },
    textureMatrix: { value: new THREE.Matrix4() }
  },
  vertexShader: [
    'uniform mat4 textureMatrix;',
    'varying vec4 mirrorCoord;',
    'void main() {',
    'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    'vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
    'mirrorCoord = textureMatrix * worldPosition;',
    'gl_Position = projectionMatrix * mvPosition;',
    '}'
  ].join('\n'),
  fragmentShader: [
    'uniform vec3 color;',
    'uniform sampler2D mirrorSampler;',
    'varying vec4 mirrorCoord;',
    'float blendOverlay(float base, float blend) {',
    'return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );',
    '}',
    'void main() {',
    'vec4 c = texture2DProj(mirrorSampler, mirrorCoord);',
    'c = vec4(blendOverlay(color.r, c.r), blendOverlay(color.g, c.g), blendOverlay(color.b, c.b), 1.0);',
    'gl_FragColor = c;',
    '}'
  ].join('\n')
};
var Mirror = function (obj, camera, options) {
  THREE.Object3D.call(this);
  this.name = 'mirror_' + this.id;
  options = options || {};
  this.matrixNeedsUpdate = true;
  var width = void 0 !== options.textureWidth ? options.textureWidth : 512;
  var height = void 0 !== options.textureHeight ? options.textureHeight : 512;
  this.clipBias = void 0 !== options.clipBias ? options.clipBias : 0;
  var _startingFret = void 0 !== options.color ? new THREE.Color(options.color) : new THREE.Color(8355711);
  if (this.renderer = obj, this.mirrorPlane = new THREE.Plane(), this.normal = new THREE.Vector3(0, 0, 1), this.mirrorWorldPosition = new THREE.Vector3(), this.cameraWorldPosition = new THREE.Vector3(), this.rotationMatrix = new THREE.Matrix4(), this.lookAtPosition = new THREE.Vector3(0, 0, -1), this.clipPlane = new THREE.Vector4(), void 0 !== options.debugMode && options.debugMode) {
    var leader = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 10, 16777088);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, -10, 0));
    geometry.vertices.push(new THREE.Vector3(10, -10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 10, 0));
    geometry.vertices.push(new THREE.Vector3(-10, 10, 0));
    geometry.vertices.push(geometry.vertices[0]);
    var ball = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 16777088 }));
    this.add(leader);
    this.add(ball);
  }
  if (camera instanceof THREE.PerspectiveCamera) {
    this.camera = camera;
  } else {
    this.camera = new THREE.PerspectiveCamera();
    console.log(this.name + ': camera is not a Perspective Camera!');
  }
  this.textureMatrix = new THREE.Matrix4();
  this.mirrorCamera = this.camera.clone();
  this.mirrorCamera.matrixAutoUpdate = true;
  var parameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
    stencilBuffer: false
  };
  this.renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);
  this.renderTarget2 = new THREE.WebGLRenderTarget(width, height, parameters);
  this.initMaterial();
  this.material.uniforms.mirrorSampler.value = this.renderTarget.texture;
  this.material.uniforms.color.value = _startingFret;
  this.material.uniforms.textureMatrix.value = this.textureMatrix;
  if (!(THREE.Math.isPowerOfTwo(width) && THREE.Math.isPowerOfTwo(height))) {
    this.renderTarget.texture.generateMipmaps = false;
    this.renderTarget2.texture.generateMipmaps = false;
  }
  this.updateTextureMatrix();
  this.render();
};
Mirror.prototype = Object.create(THREE.Object3D.prototype);
Mirror.prototype.constructor = Mirror;
Mirror.prototype.initMaterial = function () {
  var uniforms = THREE.UniformsUtils.clone(mirrorShader.uniforms);
  this.material = new THREE.ShaderMaterial({
    fragmentShader: mirrorShader.fragmentShader,
    vertexShader: mirrorShader.vertexShader,
    uniforms: uniforms
  });
};
Mirror.prototype.renderWithMirror = function (otherMirror) {
  this.updateTextureMatrix();
  this.matrixNeedsUpdate = false;
  var tempCamera = otherMirror.camera;
  otherMirror.camera = this.mirrorCamera;
  otherMirror.renderTemp();
  otherMirror.material.uniforms.mirrorSampler.value = otherMirror.renderTarget2.texture;
  this.render();
  this.matrixNeedsUpdate = true;
  otherMirror.material.uniforms.mirrorSampler.value = otherMirror.renderTarget.texture;
  otherMirror.camera = tempCamera;
  otherMirror.updateTextureMatrix();
};
Mirror.prototype.updateTextureMatrix = function () {
  this.updateMatrixWorld();
  this.camera.updateMatrixWorld();
  this.mirrorWorldPosition.setFromMatrixPosition(this.matrixWorld);
  this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld);
  this.rotationMatrix.extractRotation(this.matrixWorld);
  this.normal.set(0, 0, 1);
  this.normal.applyMatrix4(this.rotationMatrix);
  var view = this.mirrorWorldPosition.clone().sub(this.cameraWorldPosition);
  view.reflect(this.normal).negate();
  view.add(this.mirrorWorldPosition);
  this.rotationMatrix.extractRotation(this.camera.matrixWorld);
  this.lookAtPosition.set(0, 0, -1);
  this.lookAtPosition.applyMatrix4(this.rotationMatrix);
  this.lookAtPosition.add(this.cameraWorldPosition);
  var target = this.mirrorWorldPosition.clone().sub(this.lookAtPosition);
  target.reflect(this.normal).negate();
  target.add(this.mirrorWorldPosition);
  this.up.set(0, -1, 0);
  this.up.applyMatrix4(this.rotationMatrix);
  this.up.reflect(this.normal).negate();
  this.mirrorCamera.position.copy(view);
  this.mirrorCamera.up = this.up;
  this.mirrorCamera.lookAt(target);
  this.mirrorCamera.updateProjectionMatrix();
  this.mirrorCamera.updateMatrixWorld();
  this.mirrorCamera.matrixWorldInverse.getInverse(this.mirrorCamera.matrixWorld);
  this.textureMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
  this.textureMatrix.multiply(this.mirrorCamera.projectionMatrix);
  this.textureMatrix.multiply(this.mirrorCamera.matrixWorldInverse);
  this.mirrorPlane.setFromNormalAndCoplanarPoint(this.normal, this.mirrorWorldPosition);
  this.mirrorPlane.applyMatrix4(this.mirrorCamera.matrixWorldInverse);
  this.clipPlane.set(this.mirrorPlane.normal.x, this.mirrorPlane.normal.y, this.mirrorPlane.normal.z, this.mirrorPlane.constant);
  var q = new THREE.Vector4();
  var projectionMatrix = this.mirrorCamera.projectionMatrix;
  q.x = (Math.sign(this.clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
  q.y = (Math.sign(this.clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
  q.z = -1;
  q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
  var xors = new THREE.Vector4();
  xors = this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(q));
  projectionMatrix.elements[2] = xors.x;
  projectionMatrix.elements[6] = xors.y;
  projectionMatrix.elements[10] = xors.z + 1 - this.clipBias;
  projectionMatrix.elements[14] = xors.w;
};
Mirror.prototype.render = function () {
  if (this.matrixNeedsUpdate) {
    this.updateTextureMatrix();
  }
  this.matrixNeedsUpdate = true;
  var scene = this;
  for (; null !== scene.parent;) {
    scene = scene.parent;
  }
  if (void 0 !== scene && scene instanceof THREE.Scene) {
    var visible = this.material.visible;
    this.material.visible = false;
    this.renderer.render(scene, this.mirrorCamera, this.renderTarget, true);
    this.material.visible = visible;
  }
};
Mirror.prototype.renderTemp = function () {
  if (this.matrixNeedsUpdate) {
    this.updateTextureMatrix();
  }
  this.matrixNeedsUpdate = true;
  var scene = this;
  for (; null !== scene.parent;) {
    scene = scene.parent;
  }
  if (void 0 !== scene && scene instanceof THREE.Scene) {
    this.renderer.render(scene, this.mirrorCamera, this.renderTarget2, true);
  }
};
export default Mirror;