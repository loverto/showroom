import * as basicfs from 'module/glsl/basicfs.glsl'
import * as basicvs from 'module/glsl/basicvs.glsl'
import * as pbrfs from 'module/glsl/PBRMaterialfs.glsl'
import * as pbrvs from 'module/glsl/PBRMaterialvs.glsl'
import * as skyboxfs from 'module/glsl/SkyboxMaterialfs.glsl'
import * as skyboxvs from 'module/glsl/SkyboxMaterialvs.glsl'
import * as strokefs from 'module/glsl/ColorMaterialPropertyfs.glsl';
import * as strokevs from 'module/glsl/ColorMaterialPropertyvs.glsl';
import * as  Transitionfs from 'module/glsl/TransitionMaterialfs.glsl';
import * as  Transitionvs from 'module/glsl/TransitionMaterialvs.glsl';
import * as SeaNoisefs from 'module/glsl/SeaNoisefs.glsl';
import * as SeaNoisevs from 'module/glsl/SeaNoisevs.glsl';
import * as Seafs from 'module/glsl/SeaMaterialfs.glsl';
import * as Seavs from 'module/glsl/SeaMaterialvs.glsl';
import * as waterfs from 'module/glsl/waterfs.glsl';
import * as watervs from 'module/glsl/watervs.glsl';
import * as mirrorfs from 'module/glsl/mirrorfs.glsl';
import * as mirrorvs from 'module/glsl/mirrorvs.glsl';



export default {
    "basic.fs" : basicfs.default,
    "basic.vs" : basicvs.default,
    "pbr.fs" : pbrfs.default,
    "skybox.vs" : skyboxvs.default,
    "skybox.fs" : skyboxfs.default,
    "stroke.fs" : strokefs.default,
    "stroke.vs" : strokevs.default,
    "transition.fs" : Transitionfs.default,
    "transition.vs" : Transitionvs.default,
    "seanoise.fs" : SeaNoisefs.default,
    "seanoise.vs" : SeaNoisevs.default,
    "sea.fs" : Seafs.default,
    "sea.vs" : Seavs.default,
    "water.fs" : waterfs.default,
    "water.vs" : watervs.default,
    "mirror.fs" : mirrorfs.default,
    "mirror.vs" : mirrorvs.default,
    "pbr.vs" : pbrvs.default
};
