import f from 'module/Mirror';
var mirrorShader = {
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      color: { value: new THREE.Color(5592405) },
      mirrorSampler: { value: null },
      textureMatrix: { value: new THREE.Matrix4() },
      normalSampler: { value: null },
      alpha: { value: 1 },
      time: { value: 0 },
      distortionScale: { value: 20 },
      noiseScale: { value: 1 },
      sunColor: { value: new THREE.Color(8355711) },
      sunDirection: { value: new THREE.Vector3(0.70707, 0.70707, 0) },
      eye: { value: new THREE.Vector3() }
    }
  ]),
  vertexShader: [
    'uniform mat4 textureMatrix;',
    'varying vec4 mirrorCoord;',
    'varying vec3 worldPosition;',
    'void main() {',
    'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    'vec4 worldPos = modelMatrix * vec4( position, 1.0 );',
    'mirrorCoord = textureMatrix * worldPos;',
    'worldPosition = worldPos.xyz;',
    'gl_Position = projectionMatrix * mvPosition;',
    '}'
  ].join('\n'),
  fragmentShader: [
    'precision highp float;',
    'uniform sampler2D mirrorSampler;',
    'uniform float alpha;',
    'uniform float time;',
    'uniform float distortionScale;',
    'uniform sampler2D normalSampler;',
    'uniform vec3 sunColor;',
    'uniform vec3 sunDirection;',
    'uniform vec3 eye;',
    'uniform vec3 color;',
    'varying vec4 mirrorCoord;',
    'varying vec3 worldPosition;',
    'vec4 getNoise( vec2 uv )',
    '{',
    'float uvScale = 0.5;',
    'float boot = time * uvScale;',
    '\tvec2 uv0 = ( uv / 20.0 ) + vec2(boot / 17.0, boot / 29.0);',
    '\tvec2 uv1 = (uv / 30.0) - vec2( boot / -19.0, boot / 31.0 );',
    '\tvec2 uv2 = uv / vec2( 9.0, 18.0 ) + vec2( boot / 101.0, boot / 97.0 );',
    '\tvec2 uv3 = uv / vec2( 13.0, 20.0 ) - vec2( boot / 109.0, boot / -113.0 );',
    'uv0 /= uvScale;',
    'uv1 /= uvScale;',
    'uv2 /= uvScale;',
    'uv3 /= uvScale;',
    '\tvec4 noise = texture2D( normalSampler, uv0 ) + texture2D( normalSampler, uv1 ) + texture2D(normalSampler, uv2) + texture2D(normalSampler, uv3);',
    '\treturn noise * 0.5 - 1.0;',
    '}',
    'void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor )',
    '{',
    '\tvec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );',
    '\tfloat direction = max( 0.0, dot( eyeDirection, reflection ) );',
    '\tspecularColor += pow( direction, shiny ) * sunColor * spec;',
    '\tdiffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;',
    '}',
    THREE.ShaderChunk.common,
    THREE.ShaderChunk.fog_pars_fragment,
    'float blendOverlay(float base, float blend) {',
    'return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );',
    '}',
    'void main()',
    '{',
    '\tvec4 noise = getNoise( worldPosition.xz );',
    '\tvec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );',
    '\tvec3 diffuseLight = vec3(0.0);',
    '\tvec3 specularLight = vec3(0.0);',
    '\tvec3 worldToEye = eye - worldPosition;',
    '\tvec3 eyeDirection = normalize( worldToEye );',
    '\tsunLight( surfaceNormal, eyeDirection, 200.0, 1.5, 0.5, diffuseLight, specularLight );',
    '\tfloat distance = length(worldToEye);',
    '\tvec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;',
    ' vec4 mirrorDistord = mirrorCoord;',
    ' mirrorDistord.x += distortion.x;',
    ' mirrorDistord.w += distortion.y;',
    '\tvec3 reflectionSample = texture2DProj( mirrorSampler, mirrorDistord ).rgb;',
    'reflectionSample = vec3(0.565, 0.714, 0.831);',
    '\tfloat theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );',
    '\tfloat rf0 = 0.3;',
    ' float d = 1.0 - clamp(distance / 1500.0, 0.0, 1.0);',
    '\tfloat reflectance = d * clamp(rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 ), 0.0, 1.0);',
    ' reflectance = 1.0;',
    '\tvec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * color;',
    '\tvec3 albedo = mix( sunColor * diffuseLight * 0.3 + scatter, ( mix(scatter, reflectionSample, 0.75) + reflectionSample * specularLight ), reflectance );',
    '\tvec3 outgoingLight = albedo;',
    THREE.ShaderChunk.fog_fragment,
    '\tgl_FragColor = vec4( outgoingLight, max(alpha, specularLight.r) );',
    '}'
  ].join('\n')
};
var WaterMaterial = function (message, config, options) {
  function optionalParameter(value, defaultValue) {
    return void 0 !== value ? value : defaultValue;
  }
  this.clipBias = optionalParameter(options.clipBias, 0);
  this.alpha = optionalParameter(options.alpha, 1);
  this.time = optionalParameter(options.time, 0);
  this.normalSampler = optionalParameter(options.waterNormals, null);
  this.sunDirection = optionalParameter(options.sunDirection, new THREE.Vector3(0.70707, 0.70707, 0));
  this.sunColor = new THREE.Color(optionalParameter(options.sunColor, 16777215));
  this.eye = optionalParameter(options.eye, new THREE.Vector3(0, 0, 0));
  this.distortionScale = optionalParameter(options.distortionScale, 10);
  this.side = optionalParameter(options.side, THREE.DoubleSide);
  this.fog = optionalParameter(options.fog, false);
  f.apply(this, arguments);
  if (options.transparent) {
    this.material.transparent = options.transparent;
  }
  this.material.uniforms.alpha.value = this.alpha;
  this.material.uniforms.time.value = this.time;
  this.material.uniforms.normalSampler.value = this.normalSampler;
  this.material.uniforms.sunColor.value = this.sunColor;
  this.material.uniforms.sunDirection.value = this.sunDirection;
  this.material.uniforms.distortionScale.value = this.distortionScale;
  this.material.uniforms.eye.value = this.eye;
};
WaterMaterial.prototype = Object.create(f.prototype);
WaterMaterial.prototype.constructor = WaterMaterial;
WaterMaterial.prototype.initMaterial = function () {
  var uniforms = THREE.UniformsUtils.clone(mirrorShader.uniforms);
  this.material = new THREE.ShaderMaterial({
    fragmentShader: mirrorShader.fragmentShader,
    vertexShader: mirrorShader.vertexShader,
    uniforms: uniforms,
    side: this.side,
    fog: this.fog
  });
};
WaterMaterial.prototype.updateTextureMatrix = function () {
  f.prototype.updateTextureMatrix.call(this);
  var worldCoordinates = new THREE.Vector3();
  worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
  this.eye = worldCoordinates;
  this.material.uniforms.eye.value = this.eye;
};
WaterMaterial.prototype.update = function () {
  var worldCoordinates = new THREE.Vector3();
  return function (exports) {
    this.updateMatrixWorld();
    this.camera.updateMatrixWorld();
    worldCoordinates.setFromMatrixPosition(this.camera.matrixWorld);
    this.eye = worldCoordinates;
    this.material.uniforms.eye.value = this.eye;
  };
}();
export default WaterMaterial;
