uniform samplerCube tCube;
uniform float tFlip;
varying vec3 vWorldPosition;

void main() {
    vec3 dir = vWorldPosition;
    dir.z *= -1.0;

    vec4 texel = textureCube(tCube, dir);

    gl_FragColor = vec4(texel.rgb, 1.0);
}
