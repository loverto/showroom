varying vec2 vUv;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    gl_FragColor = vec4(vec3(rand(vUv)), 1.0);
}
