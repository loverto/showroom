uniform vec3 color;
uniform sampler2D mirrorSampler;
varying vec4 mirrorCoord;
float blendOverlay(float base, float blend) {
return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
}
void main() {
vec4 c = texture2DProj(mirrorSampler, mirrorCoord);
c = vec4(blendOverlay(color.r, c.r), blendOverlay(color.g, c.g), blendOverlay(color.b, c.b), 1.0);
gl_FragColor = c;
}
