#ifdef USE_MAP
varying vec2 vUv;
uniform vec4 offsetRepeat;
#endif

void main() {
    #ifdef USE_MAP
    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
    #endif

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
