uniform mat4 textureMatrix;
varying vec4 mirrorCoord;
varying vec3 worldPosition;
void main() {
vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
vec4 worldPos = modelMatrix * vec4( position, 1.0 );
mirrorCoord = textureMatrix * worldPos;
worldPosition = worldPos.xyz;
gl_Position = projectionMatrix * mvPosition;
}
