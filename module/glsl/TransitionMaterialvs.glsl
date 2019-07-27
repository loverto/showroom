#ifdef USE_MAP
varying vec2 vUv;
uniform vec4 offsetRepeat;
#endif

void main() {
    #ifdef USE_MAP
    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
    #endif

    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
