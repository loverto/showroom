#define MOBILE
#define LUV

uniform float uAOPBRFactor;
uniform float uAlbedoPBRFactor;
uniform float uEnvironmentExposure;
uniform float uGlossinessPBRFactor;
uniform float uMetalnessPBRFactor;
uniform float uNormalMapFactor;
uniform float uOpacityFactor;
uniform float uSpecularF0Factor;

uniform int uMode;
uniform vec3 uColor;
uniform float uAlphaTest;

uniform int uFlipY;
uniform int uOccludeSpecular;
uniform int uOutputLinear;

uniform samplerCube sSpecularPBR;
uniform sampler2D sPanoramaPBR;

uniform sampler2D sTextureAlbedoMap;
uniform sampler2D sTextureAlbedoMap2;
uniform sampler2D sTextureNormalMap;
uniform sampler2D sTextureNormalMap2;
#ifdef USE_PACKEDMAP
uniform sampler2D sTexturePackedMap;
#else
uniform sampler2D sTextureAOMap;
uniform sampler2D sTextureMetalGlossMap;
#endif
uniform sampler2D sTextureAOMap2;
uniform sampler2D sTextureEmissiveMap;

uniform vec2 uTextureEnvironmentSpecularPBRLodRange;
uniform vec2 uTextureEnvironmentSpecularPBRTextureSize;
uniform vec3 uDiffuseSPH[9];
uniform mat4 uEnvironmentTransform;

varying vec3 FragNormal;
varying vec4 FragTangent;
varying vec4 FragEyeVector;
varying vec2 vUv;

#if defined(USE_ALBEDO2) || defined(USE_NORMALMAP2) || defined(USE_AOMAP2)
varying vec2 vUvDetail;
#endif

#ifdef USE_LIGHTMAP
uniform sampler2D sTextureLightMap;
uniform sampler2D sTextureLightMapM;
varying vec2 vUv2;
#endif

#ifdef USE_DIR_LIGHT
uniform vec3 viewLightDir;
uniform vec3 lightColor;
uniform int highlights;
#endif

vec3 DecodeLightmapRGBM(vec4 data, vec2 decodeInstructions) {
    return (decodeInstructions.x * pow(abs(data.a), decodeInstructions.y)) * data.rgb;
}

float linearTosRGB(const in float c) {
    if (c >= 1.0) return 1.0;
    float S1 = sqrt(c);
    float S2 = sqrt(S1);
    float S3 = sqrt(S2);
    return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * c;
}

vec3 linearTosRGB(const in vec3 c) {
    vec3 cm = c;
    vec3 S1 = sqrt(cm);
    vec3 S2 = sqrt(S1);
    vec3 S3 = sqrt(S2);
    return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm;
}

vec4 linearTosRGB(const in vec4 c) {
    vec3 cm = min(c.rgb, 1.0);
    vec3 S1 = sqrt(cm);
    vec3 S2 = sqrt(S1);
    vec3 S3 = sqrt(S2);
    return vec4(0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm, c.a);
}

float sRGBToLinear(const in float c) {
    return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);
}

vec3 sRGBToLinear(const in vec3 c) {
    return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);
}

vec4 sRGBToLinear(const in vec4 c) {
    return vec4(c.rgb * (c.rgb * (c.rgb * 0.305306011 + 0.682171111) + 0.012522878), c.a);
}

vec3 RGBMToRGB(const in vec4 rgba) {
    const float maxRange = 8.0;
    return rgba.rgb * maxRange * rgba.a;
}

const mat3 LUVInverse = mat3(6.0013,    -2.700,   -1.7995,
-1.332,    3.1029,   -5.7720,
0.3007,    -1.088,    5.6268);

vec3 LUVToRGB(const in vec4 vLogLuv) {
    float Le = vLogLuv.z * 255.0 + vLogLuv.w;
    vec3 Xp_Y_XYZp;
    Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);
    Xp_Y_XYZp.z = Xp_Y_XYZp.y / vLogLuv.y;
    Xp_Y_XYZp.x = vLogLuv.x * Xp_Y_XYZp.z;
    vec3 vRGB = LUVInverse * Xp_Y_XYZp;
    return max(vRGB, 0.0);
}

vec4 encodeRGBM(const in vec3 col, const in float range) {
    if(range <= 0.0)
    return vec4(col, 1.0);
    vec4 rgbm;
    vec3 color = col / range;
    rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);
    rgbm.a = ceil(rgbm.a * 255.0) / 255.0;
    rgbm.rgb = color / rgbm.a;
    return rgbm;
}

vec3 decodeRGBM(const in vec4 col, const in float range) {
    if(range <= 0.0)
    return col.rgb;
    return range * col.rgb * col.a;
}

vec3 textureRGB(const in sampler2D texture, const in vec2 uv) {
    return texture2D(texture, uv.xy).rgb;
}

vec4 textureRGBA(const in sampler2D texture, const in vec2 uv) {
    return texture2D(texture, uv.xy).rgba;
}

float textureIntensity(const in sampler2D texture, const in vec2 uv) {
    return texture2D(texture, uv).r;
}

float textureAlpha(const in sampler2D texture, const in vec2 uv) {
    return texture2D(texture, uv.xy).a;
}

float adjustSpecular(const in float specular, const in vec3 normal) {
    float normalLen = length(normal);
    if (normalLen < 1.0) {
        float normalLen2 = normalLen * normalLen;
        float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);
        return 1.0-min(1.0, sqrt((1.0-specular) * (1.0-specular) + 1.0/kappa));
    }
    return specular;
}

vec3 mtexNspaceTangent(const in vec4 tangent, const in vec3 normal, const in vec3 texnormal) {
    vec3 tang = vec3(0.0,1.0,0.0);
    float l = length(tangent.xyz);
    if (l != 0.0) {
        tang =  tangent.xyz / l;
    }
    vec3 B = tangent.w * normalize(cross(normal, tang));
    return normalize(texnormal.x*tang + texnormal.y*B + texnormal.z*normal);
}

vec2 normalMatcap(const in vec3 normal, const in vec3 nm_z) {
    vec3 nm_x = vec3(-nm_z.z, 0.0, nm_z.x);
    vec3 nm_y = cross(nm_x, nm_z);
    return vec2(dot(normal.xz, nm_x.xz), dot(normal, nm_y)) * vec2(0.5)  + vec2(0.5) ;
}

vec3 rgbToNormal(const in vec3 texel, const in int flipNormalY) {
    vec3 rgb = texel * vec3(2.0) + vec3(-1.0);
    rgb[1] = flipNormalY == 1 ? -rgb[1] : rgb[1];
    return rgb;
}

vec3 bumpMap(const in vec4 tangent, const in vec3 normal, const in vec2 gradient) {
    vec3 outnormal;
    float l = length(tangent.xyz);
    if (l != 0.0) {
        vec3 tang =  tangent.xyz / l;
        vec3 binormal = tangent.w * normalize(cross(normal, tang));
        outnormal = normal + gradient.x * tang + gradient.y * binormal;
    }
    else {
        outnormal = vec3(normal.x + gradient.x, normal.y + gradient.y, normal.z);
    }
    return normalize(outnormal);
}

float specularOcclusion(const in int occlude, const in float ao, const in vec3 N, const in vec3 V) {
    if(occlude == 0)
    return 1.0;
    float d = dot(N, V) + ao;
    return clamp((d * d) - 1.0 + ao, 0.0, 1.0);
}

float adjustRoughnessNormalMap(const in float roughness, const in vec3 normal) {
    float normalLen = length(normal);
    if (normalLen < 1.0) {
        float normalLen2 = normalLen * normalLen;
        float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);
        return min(1.0, sqrt(roughness * roughness + 1.0/kappa));
    }
    return roughness;
}

float adjustRoughnessGeometry(const in float roughness, const in vec3 normal) {
    return roughness;
}

mat3 environmentTransformPBR(const in mat4 tr) {
    vec3 x = vec3(tr[0][0], tr[1][0], tr[2][0]);
    vec3 y = vec3(tr[0][1], tr[1][1], tr[2][1]);
    vec3 z = vec3(tr[0][2], tr[1][2], tr[2][2]);
    mat3 m = mat3(x, y, z);
    return m;
}

vec3 evaluateDiffuseSphericalHarmonics(const in vec3 s[9], const in mat3 envTrans, const in vec3 N) {
    vec3 n = envTrans * N;
    vec3 result = (s[0]+s[1]*n.y+s[2]*n.z+s[3]*n.x+s[4]*n.y*n.x+s[5]*n.y*n.z+s[6]*(3.0*n.z*n.z-1.0)+s[7]*(n.z*n.x)+s[8]*(n.x*n.x-n.y*n.y));
    return max(result, vec3(0.0));
}

float linRoughnessToMipmap(const in float roughnessLinear) {
    return sqrt(roughnessLinear);
}

vec3 integrateBRDF(const in vec3 specular, const in float r, const in float NoV, const in sampler2D tex) {
    vec4 rgba = texture2D(tex, vec2(NoV, r));
    float b = (rgba[3] * 65280.0 + rgba[2] * 255.0);
    float a = (rgba[1] * 65280.0 + rgba[0] * 255.0);
    const float div = 1.0/65535.0;
    return (specular * a + b) * div;
}

vec3 integrateBRDFApprox(const in vec3 specular, const in float roughness, const in float NoV) {
    const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);
    const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);
    vec4 r = roughness * c0 + c1;
    float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
    vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
    return specular * AB.x + AB.y;
}

vec3 computeIBLDiffuseUE4(const in vec3 normal, const in vec3 albedo, const in mat3 envTrans, const in vec3 sphHarm[9]) {
    return evaluateDiffuseSphericalHarmonics(sphHarm, envTrans, normal);
}


    #ifdef CUBEMAP
vec3 textureCubemapLod(const in samplerCube texture, const in vec3 dir, const in float lod) {
    vec4 rgba = textureCubeLodEXT(texture, dir, lod);
    #ifdef FLOAT
    return rgba.rgb;
    #endif
    #ifdef RGBM
    return RGBMToRGB(rgba);
    #endif
    #ifdef LUV
    return LUVToRGB(rgba);
    #endif
}

vec3 textureCubeLodEXTFixed(const in samplerCube texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLod) {
    vec3 dir = direction;
    float lod = min(maxLod, lodInput);

    float scale = 1.0 - exp2(lod) / size.x;
    vec3 absDir = abs(dir);
    float M = max(max(absDir.x, absDir.y), absDir.z);

    if (absDir.x != M) dir.x *= scale;
    if (absDir.y != M) dir.y *= scale;
    if (absDir.z != M) dir.z *= scale;

    return textureCubemapLod(texture, dir, lod);
}

vec3 prefilterEnvMapCube(const in float rLinear, const in vec3 R, const in samplerCube tex, const in vec2 lodRange, const in vec2 size){
    float lod = linRoughnessToMipmap(rLinear) * lodRange[1];
    return textureCubeLodEXTFixed(tex, size, R, lod, lodRange[0]);
}

    #define samplerEnv samplerCube
    #define prefilterEnvMap prefilterEnvMapCube

    #else
    #ifdef PANORAMA
vec2 computeUVForMipmap(const in float level, const in vec2 uvBase, const in float size, const in float maxLOD) {
    vec2 uv = uvBase;
    float widthForLevel = exp2(maxLOD - level);
    float heightForLevel = widthForLevel * 0.5;
    float widthFactor = pow(0.5, level);
    float heightFactor = widthFactor * 0.5;
    float texelSize = 1.0 / size;

    uv.y = 1.0 - uv.y;

    float resizeX = (widthForLevel - 2.0) * texelSize;
    float resizeY = (heightForLevel - 2.0) * texelSize;

    float uvSpaceLocalX = texelSize + uv.x * resizeX;
    float uvSpaceLocalY = texelSize + uv.y * resizeY;

    uvSpaceLocalY += heightFactor;

    return vec2(uvSpaceLocalX, uvSpaceLocalY);
}

vec2 normalToPanoramaUVY(const in vec3 dir) {
    float n = length(dir.xz);

    vec2 pos = vec2((n > 0.0000001) ? max(-1.0, dir.x / n) : 0.0, dir.y);

    if (pos.x > 0.0) pos.x = min(0.999999, pos.x);

    pos = acos(pos) * 0.3183098861837907;

    pos.x = (dir.z > 0.0) ? pos.x * 0.5 : 1.0 - (pos.x * 0.5);

    pos.x = mod(pos.x - 0.25 + 1.0, 1.0);
    pos.y = 1.0 - pos.y;
    return pos;
}

vec3 texturePanorama(const in sampler2D texture, const in vec2 uv) {
    vec4 rgba = texture2D(texture, uv);
    #ifdef FLOAT
    return rgba.rgb;
    #endif
    #ifdef RGBM
    return RGBMToRGB(rgba);
    #endif
    #ifdef LUV
    return LUVToRGB(rgba);
    #endif
}

vec3 texturePanoramaLod(const in sampler2D texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLOD) {
    float lod = min(maxLOD, lodInput);
    vec2 uvBase = normalToPanoramaUVY(direction);

    float lod0 = floor(lod);
    vec2 uv0 = computeUVForMipmap(lod0, uvBase, size.x, maxLOD);
    vec3 texel0 = texturePanorama(texture, uv0.xy);

    float lod1 = ceil(lod);
    vec2 uv1 = computeUVForMipmap(lod1, uvBase, size.x, maxLOD);
    vec3 texel1 = texturePanorama(texture, uv1.xy);

    return mix(texel0, texel1, fract(lod));
}

vec3 prefilterEnvMapPanorama(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {
    float lod = linRoughnessToMipmap(rLinear) * lodRange[1];
    return texturePanoramaLod(tex, size, R, lod, lodRange[0]);
}

    #define samplerEnv sampler2D
    #define prefilterEnvMap prefilterEnvMapPanorama

    #else
vec3 prefilterEnvMap(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {
    return vec3(0.0);
}
    #define samplerEnv sampler2D
    #endif

    #endif

vec3 getSpecularDominantDir(const in vec3 N, const in vec3 R, const in float realRoughness) {
    float smoothness = 1.0 - realRoughness;
    float lerpFactor = smoothness * (sqrt(smoothness) + realRoughness);
    return mix(N, R, lerpFactor);
}

vec3 computeIBLSpecularUE4(
const in vec3 N,
const in vec3 V,
const in float rLinear,
const in vec3 specular,
const in mat3 envTrans,
const in samplerEnv texEnv,
const in vec2 lodRange,
const in vec2 size,
const in vec3 frontNormal
#ifdef MOBILE
){
    #else
,const in sampler2D texBRDF) {
#endif

float rough = max(rLinear, 0.0);

float NoV = clamp(dot(N, V), 0.0, 1.0);
vec3 R = normalize(NoV * 2.0 * N - V);

R = getSpecularDominantDir(N, R, rLinear);

vec3 dir = envTrans * R;
dir.xz *= -1.0;

vec3 prefilteredColor = prefilterEnvMap(rough, dir, texEnv, lodRange, size);
float factor = clamp(1.0 + 1.3 * dot(R, frontNormal), 0.1, 1.0);
prefilteredColor *= factor * factor;
#ifdef MOBILE
return prefilteredColor * integrateBRDFApprox(specular, rough, NoV);
#else
return prefilteredColor * integrateBRDF(specular, rough, NoV, texBRDF);
#endif
}

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

    #ifdef USE_DIR_LIGHT

    #define PI 3.141593
    #define G1V(dotNV, k) (1.0 / (dotNV * (1.0 - k) + k))
    #define saturate(_x) clamp(_x, 0.0, 1.0)

vec4 LightingFuncPrep(const in vec3 N,
const in vec3 V,
const in float roughness)
{

    float dotNV = saturate(dot(N,V));
    float alpha = roughness * roughness;
    float k = alpha * .5;
    float visNV = G1V(dotNV,k);

    vec4 prepSpec;

    prepSpec.x = alpha;
    prepSpec.y = alpha * alpha;
    prepSpec.z = k;
    prepSpec.w = visNV;

    return prepSpec;

}

vec3 LightingFuncUsePrepGGX(const vec4 prepSpec,
const vec3 N,
const vec3 V,
const vec3 L,
const vec3 F0,
const float dotNL)
{
    vec3 H = normalize(V + L);
    float dotNH = saturate(dot(N, H));
    float alphaSqr = prepSpec.y;
    float denom = dotNH * dotNH * (alphaSqr - 1.0) + 1.0;
    float D = alphaSqr / (PI * denom * denom);
    float dotLH = saturate(dot(L, H));
    float dotLH5 = pow(1.0 - dotLH, 5.0);
    vec3 F = vec3(F0) + (vec3(1.0) - F0) * (dotLH5);
    float visNL = G1V(dotNL, prepSpec.z);
    vec3 specular = D * F * visNL * prepSpec.w;

    return specular;
}

vec3 computeLight(const in vec3 lightColor,
const in vec3 albedoColor,
const in vec3 normal,
const in vec3 viewDir,
const in vec3 lightDir,
const in vec3 specular,
const in vec4 prepSpec,
const in float dotNL)
{
    vec3 cSpec = LightingFuncUsePrepGGX(prepSpec, normal, viewDir, lightDir, specular, dotNL);
    return lightColor * dotNL * cSpec;
}

vec3 computeSunLightPBRShading(
const in vec3 normal,
const in vec3 eyeVector,

const in vec3 albedo,
const in vec4 prepSpec,
const in vec3 specular,

const in vec3 lightColor,
const in vec3 lightEyeDir)
{
    bool lighted = false;
    float NdotL = dot(lightEyeDir, normal);
    if (NdotL > 0.0)
    {
        lighted = true;
        return computeLight(lightColor, albedo, normal, eyeVector, lightEyeDir, specular, prepSpec,  NdotL);
    }
    return vec3(0.0);
}
    #endif


void main() {
    vec3 eyeVector = normalize(-FragEyeVector.rgb);
    mat3 transform = environmentTransformPBR(uEnvironmentTransform);

    vec4 frontTangent = gl_FrontFacing ? FragTangent : -FragTangent;
    vec3 frontNormal = gl_FrontFacing ? FragNormal : -FragNormal;

    vec3 normal = normalize(frontNormal);

    #ifdef USE_NORMALMAP
    vec3 nmTexel = rgbToNormal(textureRGB(sTextureNormalMap, vUv.xy), uFlipY);
    vec3 normalMap = vec3(uNormalMapFactor * nmTexel.xy, nmTexel.z);
    vec3 geoNormal = mtexNspaceTangent(frontTangent, normal, normalMap);
    #else
    vec3 geoNormal = normal;
    #endif

    #ifdef USE_NORMALMAP2
    vec3 nm2Texel = rgbToNormal(textureRGB(sTextureNormalMap2, vUvDetail.xy), uFlipY);
    vec3 normalMap2 = vec3(uNormalMapFactor * nm2Texel.xy, nm2Texel.z);
    vec3 geoNormal2 = mtexNspaceTangent(frontTangent, normal, normalMap2);

    geoNormal = mix(geoNormal, geoNormal2, 0.5);
    #endif

    #if defined(USE_PACKEDMAP)
    vec3 combinedTexel = textureRGB(sTexturePackedMap, vUv.xy);
    #elif defined(USE_METALGLOSSMAP)
    vec3 combinedTexel = textureRGB(sTextureMetalGlossMap, vUv.xy);
    #else
    vec3 combinedTexel = vec3(1.0, 1.0, 1.0);
    #endif
    float metalness = combinedTexel.r;
    float glossiness = combinedTexel.b;
    float channelMetalnessPBR = metalness * uMetalnessPBRFactor;
    float channelGlossinessPBR = glossiness * uGlossinessPBRFactor;
    float roughness = 1.0 - channelGlossinessPBR;
    float tmp_51 = max(1.e-4, roughness);
    #ifdef USE_NORMALMAP
    float tmp_52 = adjustRoughnessNormalMap(tmp_51, normalMap);
    float materialRoughness = adjustRoughnessGeometry(tmp_52, normal);
    #else
    float materialRoughness = tmp_51;
    #endif

    vec4 albedoMap = vec4(uColor, 1.0);
    #ifdef USE_ALBEDOMAP
    albedoMap *= textureRGBA(sTextureAlbedoMap, vUv.xy);
    #endif

    #ifdef USE_ALBEDOMAP2
    albedoMap *= textureRGBA(sTextureAlbedoMap2, vUvDetail.xy);
    #endif

    vec3 channelAlbedoPBR = sRGBToLinear(albedoMap.rgb) * uAlbedoPBRFactor;
    vec3 materialDiffusePBR = channelAlbedoPBR * (1.0 - channelMetalnessPBR);

    #if defined(USE_PACKEDMAP)
    float ao = combinedTexel.g;
    #elif defined(USE_AOMAP)
    float ao = textureIntensity(sTextureAOMap, vUv.xy);
    #else
    float ao = 1.0;
    #endif

    #ifdef USE_AOMAP2
    ao *= textureIntensity(sTextureAOMap2, vUvDetail.xy);
    #endif
    float channelAOPBR = mix(1.0, ao, uAOPBRFactor);

    float luminance = 1.0;
    #ifdef USE_LIGHTMAP
    #ifdef USE_NORMALMAP
    luminance = luma(computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH));
    luminance = mix(luminance, 1.0, abs(dot(geoNormal, normal)));
    if (uMode == -1) {
        luminance = 1.0;
    }

    vec3 diffuse = materialDiffusePBR * luminance;
    #else
    vec3 diffuse = materialDiffusePBR;
    #endif
    #else
    vec3 diffuse = materialDiffusePBR * computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH);
    #endif

    diffuse *= channelAOPBR;

    #ifdef USE_LIGHTMAP
    vec3 lightmapTexel = textureRGB(sTextureLightMap, vUv2);
    float lightmapM = textureIntensity(sTextureLightMapM, vUv2);
    vec3 lightmap = DecodeLightmapRGBM(sRGBToLinear(vec4(lightmapTexel, lightmapM)), vec2(34.0, 2.2));

    diffuse *= lightmap;
    #endif

    float materialSpecularf0 = mix(0.0, 0.08, uSpecularF0Factor);
    vec3 materialSpecularPBR = mix(vec3(materialSpecularf0), channelAlbedoPBR, channelMetalnessPBR);
    #ifdef CUBEMAP
    vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sSpecularPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);
    #else
    #ifdef PANORAMA
    vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sPanoramaPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);
    #endif
    #endif

    #if defined(OCCLUDE_SPECULAR) && defined(USE_LIGHTMAP)
    float factor = 3.;
    specular = mix(specular * 0.0, specular, clamp(min(lightmap, vec3(channelAOPBR)) * (factor * channelGlossinessPBR), 0.0, 1.0));
    #endif

    #ifdef USE_EMISSIVEMAP
    vec3 emissive = textureRGB(sTextureEmissiveMap, vUv.xy);
    #endif

    vec3 color = diffuse + specular;

    color *= uEnvironmentExposure;

    #ifdef USE_DIR_LIGHT
    vec4 prepSpec = LightingFuncPrep(geoNormal, eyeVector, materialRoughness);
    vec3 lightEyeDir = viewLightDir;
    float lightIntensity = 0.4;
    vec3 lightDiffuse = lightColor * lightIntensity;
    vec3 lightSpecular = computeSunLightPBRShading(geoNormal, eyeVector, materialDiffusePBR, prepSpec, materialSpecularPBR, lightDiffuse, lightEyeDir);

    float lmf = 1.0;

    #ifdef USE_LIGHTMAP
    lmf = clamp(pow(abs(luma(lightmap)), 4.0), 0.0, 1.0);
    lightSpecular = mix(vec3(0.0), lightSpecular, lmf);
    #endif

    if (highlights == 1) {
        color += lightSpecular;
    }
        #endif

    float channelOpacity = mix(albedoMap.a * uOpacityFactor, 1.0, luma(specular) * 2.0);

    #ifdef USE_EMISSIVEMAP
    color += sRGBToLinear(emissive);
    #endif

    if (uMode <= 0) {
        gl_FragColor = vec4(linearTosRGB(color), channelOpacity);
    } else if (uMode == 1) {
        gl_FragColor = vec4(linearTosRGB(geoNormal), 1.0);
    } else if (uMode == 2) {
        #ifdef USE_LIGHTMAP
        gl_FragColor = vec4(linearTosRGB(lightmap), 1.0);
        #else
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
        #endif
    } else if (uMode == 3) {
        gl_FragColor = vec4(linearTosRGB(vec3(channelAOPBR)), 1.0);
    } else if (uMode == 4) {
        gl_FragColor = vec4(linearTosRGB(vec3(channelMetalnessPBR)), 1.0);
    } else if (uMode == 5) {
        gl_FragColor = vec4(linearTosRGB(vec3(channelGlossinessPBR)), 1.0);
    } else if (uMode == 6) {
        gl_FragColor = vec4(linearTosRGB(channelAlbedoPBR), 1.0);
    } else if (uMode == 7) {
        gl_FragColor = vec4(linearTosRGB(vec3(luminance)), 1.0);
    }

        #ifdef ALPHATEST
    if (gl_FragColor.a < uAlphaTest) {
        discard;
    } else {
        gl_FragColor.a = 1.0;
    }
        #endif
}
