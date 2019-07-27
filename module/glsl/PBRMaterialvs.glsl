attribute vec3 position;
attribute vec3 normal;
attribute vec4 tangent;
attribute vec2 uv;
attribute vec2 uv2;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

uniform vec4 offsetRepeat;
uniform vec4 offsetRepeatDetail;

varying vec3 FragNormal;
varying vec4 FragTangent;
varying vec4 FragEyeVector;
varying vec2 vUv;

#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)
varying vec2 vUvDetail;
#endif

#ifdef USE_LIGHTMAP
varying vec2 vUv2;
#endif

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    FragEyeVector = viewMatrix * worldPosition;

    gl_Position = projectionMatrix * FragEyeVector;

    vUv = uv.xy * offsetRepeat.zw + offsetRepeat.xy;

    #if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)
    vUvDetail = uv.xy * offsetRepeatDetail.zw + offsetRepeatDetail.xy;
    #endif

    FragNormal = normalMatrix * normal;
    FragTangent.xyz = normalMatrix * tangent.xyz;
    FragTangent.w = tangent.w;

    #ifdef USE_LIGHTMAP
    vUv2 = uv2.xy;
    #endif
}
