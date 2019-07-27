#ifdef USE_MAP
varying vec2 vUv;

uniform sampler2D map;
#endif

uniform vec3 diffuse;
uniform float opacity;
uniform float bias;

void main() {
    gl_FragColor = vec4(diffuse, opacity);

    #ifdef USE_MAP
    vec4 mapTexel = texture2D(map, vUv, bias);

    gl_FragColor *= mapTexel;
    #endif
}
