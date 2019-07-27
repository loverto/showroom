
require('module/null');
require('module/BaseUtils');

var Config = require('module/Config');
var LoaderManager = require('module/LoaderManager');
var LoaderUtils = require('module/LoaderUtils');
var instance = require('module/instance');
var sceneManager = require('module/sceneManager');
var webVRUtils = require('module/WebVRUtils');
var message = require('module/jsext');

var app;
var interior2 = 'interior2';
var exterior2 = 'exterior2';
var start1 = 'start';
var id = window.isMobile ? 'assets_mobile/' : 'assets/';
var sharing = $('[data-ref="sharing"]');
var panelContainer = $('[data-ref="panel_container"]');
var aboutLink = $('[data-ref="about_link"]');
var closeAbout = $('[data-ref="close_about"]');
var panel = $('[data-ref="panel"]');
var border = $('[data-ref="border"]');
var progress = $('[data-ref="progress"]');
var start2 = $('[data-ref="start"]');
var loading = $('.loading');
var lodingAndBackground = $('.loading .background');
var percentage = $('.percentage');
var warning = $('.warning');
var aboutButton = $('[data-ref="about_button"]');
var titlescreenMain = $('[data-ref="titlescreen_main"]');
var titlescreenIllustration = $('[data-ref="titlescreen_illustration"]');
var titlescreenFooter = $('[data-ref="titlescreen_footer"]');
var N = false;
var B = false;

/**
 * 切换车
 */
function toggleCart() {
    panel.removeClass('visible');
    setTimeout(function () {
        aboutButton.addClass('visible');
    }, 400);
}

/**
 * 加载图片
 * @param url
 * @param crossOrigin
 * @param deferred
 */
function loadImage(url, crossOrigin, deferred) {
    var r = ($(window).width() - crossOrigin) / 2;
    var i = ($(window).height() - deferred) / 2;
    var link_options = 'status=1,width=' + crossOrigin + ',height=' + deferred + ',top=' + i + ',left=' + r;
    return window.open(url, 'share', link_options), false;
}

/**
 * 打开
 */
function open() {
    if (window.isMobile) {
        _.defer(function () {
            var winh = titlescreenMain.outerHeight(true) - titlescreenIllustration.height();
            var scroll = titlescreenFooter.outerHeight();
            var sub_bottom = window.innerHeight ? window.innerHeight : $(window).height();
            var footerTransition = sub_bottom - (winh + scroll);
            titlescreenIllustration.css('height', footerTransition);
        });
    }
}

/**
 * 初始化
 * @param flightPhase
 */
function init(flightPhase) {
    app = new sceneManager({
        vr: void 0 !== flightPhase,
        vrDisplay: flightPhase,
        preserveDrawingBuffer: void 0 !== flightPhase,
        maxPixelRatio: 1.5,
        fps: false,
        logCalls: false
    });
    app.renderer.setClearColor(16777215);
    initialize();
}
function render(name) {
    return LoaderUtils.texturePath = id + name + '/', instance.loadScene(name, id + 'scenes/', app, message);
}
function initialize() {
    progress.show();
    open();
    var options = {
        geometries: [
            interior2,
            exterior2,
            start1
        ],
        sh: [
            'room',
            'studio'
        ],
        textures: [
            'textures/white.png',
            'textures/normal.png',
            'textures/waternormals.jpg',
            'textures/marker.png',
            'textures/circle.png',
            'textures/corner-gradient.png',
            'textures/flare.png'
        ]
    };
    if (THREE.Extensions.get('EXT_shader_texture_lod')) {
        options.cubemaps = ['room/cubemap.bin'];
    } else {
        options.panoramas = ['room/panorama.bin'];
    }
    LoaderUtils.environmentPath = id + 'environments';
    LoaderUtils.geometryPath = id + 'scenes/data/';
    new LoaderManager(options).load().then(function (module) {
        render(start1).then(function () {
            render(exterior2).then(function () {
                render(interior2).then(function () {
                    app.PBRMaterial();
                    _.defer(function () {
                        start2.show();
                        progress.hide();
                    });
                    if (Config.AUTOSTART && !VRenabled) {
                        N = true;
                        start();
                        aboutButton.addClass('visible');
                    }
                });
            });
        });
    });
}
function start() {
    if (B) {
        app.enterVR();
    }
    app.start();
    border.hide();
    loading.addClass('started');
    panelContainer.addClass('state-about in-app');
    panel.removeClass('hidden');
    if (!window.isMobile) {
        panel.show();
    }
    $(window).trigger('resize');
    aboutButton.addClass('visible');
    setTimeout(function () {
        lodingAndBackground.remove();
    }, 200);
}
LoaderUtils.manager.onProgress = function (status, e, i) {
    percentage.html(Math.round(e / Config.ASSET_COUNT * 100));
    open();
};
// VR是否可用
window.VRenabled = webVRUtils.isAvailable();
//是最新的
var isLatestAvailable = webVRUtils.isLatestAvailable();
if (VRenabled) {
    if (!isLatestAvailable) {
        warning.html('<img src=\'img/missing-headset.png\'>您的WebVR版本已过期。 <interior2 href=\'http://webvr.info\'>解决这个问题</interior2>');
    }
} else {
    warning.html('<img src=\'img/missing-headset.png\'>您的浏览器不支持WebVR。<br/>回到非VR模式。');
}
if (VRenabled && navigator.getVRDisplays) {
    navigator.getVRDisplays().then(function (props) {
        if (props.length > 0) {
            init(props[0]);
            B = true;
        } else {
            console.error('No VR display');
            warning.html('<img src=\'img/missing-headset.png\'>您的浏览器支持WebVR，但我们无法启动找到您的耳机。回到非VR模式。');
            init();
        }
    }.bind(this)).catch(function () {
        console.error('No VR display');
    });
} else {
    init();
}
$('document').ready(function () {
    open();
    if (window.isMobile) {
        $('body').addClass('mobile');
    }
    sharing.on('tap', function () {
        loadImage($(this).data('href'), $(this).data('width'), $(this).data('height'));
    });
    aboutLink.on('tap', function () {
        panelContainer.addClass('state-about');
    });
    closeAbout.on('tap', function () {
        if (N) {
            toggleCart();
        } else {
            panelContainer.removeClass('state-about');
        }
    });
    start2.on('tap', function () {
        if (!N) {
            N = true;
            if (VRenabled || window.isMobile) {
                panel.hide();
                start();
            } else {
                panel.addClass('hidden');
                setTimeout(function () {
                    panel.hide();
                    border.addClass('hidden');
                    setTimeout(function () {
                        start();
                    }, 400);
                }, 700);
            }
        }
    });
    aboutButton.on('tap', function (module) {
        aboutButton.removeClass('visible');
        panel.addClass('visible');
    });
    app.on('closeAbout', function () {
        toggleCart();
    });
    panel.on('mouseenter', function () {
        $('body').removeClass('hovering');
    });
    $(window).on('resize', open);
});
