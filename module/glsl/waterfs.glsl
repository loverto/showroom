precision highp float;
uniform sampler2D mirrorSampler;
uniform float alpha;
uniform float time;
uniform float distortionScale;
uniform sampler2D normalSampler;
uniform vec3 sunColor;
uniform vec3 sunDirection;
uniform vec3 eye;
uniform vec3 color;
varying vec4 mirrorCoord;
varying vec3 worldPosition;
vec4 getNoise( vec2 uv )
{
float uvScale = 0.5;
float boot = time * uvScale;
vec2 uv0 = ( uv / 20.0 ) + vec2(boot / 17.0, boot / 29.0);
vec2 uv1 = (uv / 30.0) - vec2( boot / -19.0, boot / 31.0 );
vec2 uv2 = uv / vec2( 9.0, 18.0 ) + vec2( boot / 101.0, boot / 97.0 );
vec2 uv3 = uv / vec2( 13.0, 20.0 ) - vec2( boot / 109.0, boot / -113.0 );
uv0 /= uvScale;
uv1 /= uvScale;
uv2 /= uvScale;
uv3 /= uvScale;
vec4 noise = texture2D( normalSampler, uv0 ) + texture2D( normalSampler, uv1 ) + texture2D(normalSampler, uv2) + texture2D(normalSampler, uv3);
return noise * 0.5 - 1.0;
}
void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor )
{
vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
float direction = max( 0.0, dot( eyeDirection, reflection ) );
specularColor += pow( direction, shiny ) * sunColor * spec;
diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
}

    // THREE.ShaderChunk.common, start

    #define PI 3.14159265359
    #define PI2 6.28318530718
    #define PI_HALF 1.5707963267949
    #define RECIPROCAL_PI 0.31830988618
    #define RECIPROCAL_PI2 0.15915494
    #define LOG2 1.442695
    #define EPSILON 1e-6

    #define saturate(a) clamp( a, 0.0, 1.0 )
    #define whiteCompliment(a) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
    return fract(sin(sn) * c);
}

struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};

struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};

struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

    float distance = dot( planeNormal, point - pointOnPlane );

    return - distance * planeNormal + point;

}

float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

    return sign( dot( point - pointOnPlane, planeNormal ) );

}

vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {

    return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;

}

mat3 transposeMat3( const in mat3 m ) {

    mat3 tmp;

    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

    return tmp;

}

// THREE.ShaderChunk.common, end

// THREE.ShaderChunk.fog_pars_fragment start

// https://en.wikipedia.org/wiki/Relative_luminance
float linearToRelativeLuminance( const in vec3 color ) {

    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );

    return dot( weights, color.rgb );

}


    #ifdef USE_FOG

uniform vec3 fogColor;
varying float fogDepth;

#ifdef FOG_EXP2

uniform float fogDensity;

#else

uniform float fogNear;
uniform float fogFar;

#endif

#endif

// THREE.ShaderChunk.fog_pars_fragment end

float blendOverlay(float base, float blend) {
return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
}
void main()
{
vec4 noise = getNoise( worldPosition.xz );
vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );
vec3 diffuseLight = vec3(0.0);
vec3 specularLight = vec3(0.0);
vec3 worldToEye = eye - worldPosition;
vec3 eyeDirection = normalize( worldToEye );
sunLight( surfaceNormal, eyeDirection, 200.0, 1.5, 0.5, diffuseLight, specularLight );
float distance = length(worldToEye);
vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
 vec4 mirrorDistord = mirrorCoord;
 mirrorDistord.x += distortion.x;
 mirrorDistord.w += distortion.y;
vec3 reflectionSample = texture2DProj( mirrorSampler, mirrorDistord ).rgb;
reflectionSample = vec3(0.565, 0.714, 0.831);
float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
float rf0 = 0.3;
 float d = 1.0 - clamp(distance / 1500.0, 0.0, 1.0);
float reflectance = d * clamp(rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 ), 0.0, 1.0);
 reflectance = 1.0;
vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * color;
vec3 albedo = mix( sunColor * diffuseLight * 0.3 + scatter, ( mix(scatter, reflectionSample, 0.75) + reflectionSample * specularLight ), reflectance );
vec3 outgoingLight = albedo;


//     THREE.ShaderChunk.fog_fragment start
    #ifdef USE_FOG

    #ifdef FOG_EXP2

    float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );

    #else

    float fogFactor = smoothstep( fogNear, fogFar, fogDepth );

    #endif

    gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

    #endif
// THREE.ShaderChunk.fog_fragment end

gl_FragColor = vec4( outgoingLight, max(alpha, specularLight.r) );
}
