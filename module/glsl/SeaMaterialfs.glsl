#ifdef USE_MAP
varying vec2 vUv;

uniform sampler2D map;
#endif

uniform sampler2D noiseMap;

uniform vec3 diffuse;
uniform float opacity;
uniform float threshold;
uniform float range;

const vec3 white = vec3(1.0);

void main() {
    gl_FragColor = vec4(diffuse, opacity);

    #ifdef USE_MAP
    vec4 mapTexel = texture2D(map, vUv);
    #endif

    vec3 noise = texture2D(noiseMap, vUv).rgb;

    float v = fract(noise.r + threshold * 0.75);
    v = step(0.9, v);

    float alpha = step(0.5, (v * mapTexel.a));

    gl_FragColor = vec4(white, alpha);
}
