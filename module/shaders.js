import * as basicfs from 'module/glsl/basicfs.glsl'
import * as basicvs from 'module/glsl/basicvs.glsl'
import * as pbrfs from 'module/glsl/PBRMaterialfs.glsl'
import * as pbrvs from 'module/glsl/PBRMaterialvs.glsl'
import * as skyboxfs from 'module/glsl/SkyboxMaterialfs.glsl'
import * as skyboxvs from 'module/glsl/SkyboxMaterialvs.glsl'

export default {
    "basic.fs" : basicfs.default,
    "basic.vs" : basicvs.default,
    "pbr.fs" : pbrfs.default,
    "skybox.vs" : skyboxvs.default,
    "skybox.fs" : skyboxfs.default,
    "pbr.vs" : pbrvs.default
};
