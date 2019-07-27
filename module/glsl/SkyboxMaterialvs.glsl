varying vec3 vWorldPosition;

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}

void main() {
    vWorldPosition = transformDirection( position, modelMatrix );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
