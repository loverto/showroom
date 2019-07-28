
require('jquery-tap')($);
import 'module/null';
import 'module/BaseUtils';
import Config from 'module/Config';
import LoaderManager from 'module/LoaderManager';
import LoaderUtils from 'module/LoaderUtils';
import instance from 'module/instance';
import sceneManager from 'module/sceneManager';
import webVRUtils from 'module/WebVRUtils';
import message from 'module/jsext';

var scene;
var interior2 = 'interior2';
var exterior2 = 'exterior2';
var start1 = 'start';
var resourcePath = window.isMobile ? 'assets_mobile/' : 'assets/';
var sharing = $('[data-ref="sharing"]');
var panelContainer = $('[data-ref="panel_container"]');
var aboutLink = $('[data-ref="about_link"]');
var closeAbout = $('[data-ref="close_about"]');
var panel = $('[data-ref="panel"]');
var border = $('[data-ref="border"]');
var progress = $('[data-ref="progress"]');
var startButton = $('[data-ref="start"]');
var loading = $('.loading');
var lodingAndBackground = $('.loading .background');
var percentage = $('.percentage');
var warning = $('.warning');
var aboutButton = $('[data-ref="about_button"]');
var titlescreenMain = $('[data-ref="titlescreen_main"]');
var titlescreenIllustration = $('[data-ref="titlescreen_illustration"]');
var titlescreenFooter = $('[data-ref="titlescreen_footer"]');
var started = false;
var vrabled = false;

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
 * @param width
 * @param height
 */
function loadImage(url, width, height) {
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    var link_options = 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
    window.open(url, 'share', link_options);
    return false;
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
 * @param vrDisplay
 */
function init(vrDisplay) {
    scene = new sceneManager({
        vr: undefined !== vrDisplay,
        vrDisplay: vrDisplay,
        preserveDrawingBuffer: undefined !== vrDisplay,
        maxPixelRatio: 1.5,
        fps: false,
        logCalls: false
    });

    // 0xffffff 16777215 '#ffffff' 白色
    scene.renderer.setClearColor(0xffffff);
    initialize();
}
function render(name) {
    LoaderUtils.texturePath = resourcePath + name + '/';
    return instance.loadScene(name, resourcePath + 'scenes/', scene, message);
}

/**
 * 初始化
 */
function initialize() {
    // 展示进度条
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
        // 立方体贴图
        options.cubemaps = ['room/cubemap.bin'];
    } else {
        // 全景
        options.panoramas = ['room/panorama.bin'];
    }
    LoaderUtils.environmentPath = resourcePath + 'environments';
    LoaderUtils.geometryPath = resourcePath + 'scenes/data/';
    new LoaderManager(options).load().then(function (module) {
        return render(start1);
    }).then(function () {
        return render(exterior2);
    }).then(function () {
        return render(interior2);
    }).then(function () {
        scene.init();
        _.defer(function () {
            startButton.show();
            progress.hide();
        });
        if (Config.AUTOSTART && !VRenabled) {
            started = true;
            start();
            aboutButton.addClass('visible');
        }
    });
}

/**
 * 开始启动
 */
function start() {
    // vr可用，场景进入vr
    if (vrabled) {
        scene.enterVR();
    }
    // 场景开始
    scene.start();
    // 隐藏线
    border.hide();
    // 正在加载添加已经启动
    loading.addClass('started');
    // 面板容器中加上关于和进入app
    panelContainer.addClass('state-about in-app');
    // 面板移除隐藏
    panel.removeClass('hidden');
    // 如果不是移动设备，面板显示
    if (!window.isMobile) {
        // 面板显示
        panel.show();
    }
    // 触发窗口重置
    $(window).trigger('resize');
    // 关于按钮，
    aboutButton.addClass('visible');
    // 设置定时操作
    setTimeout(function () {
        // 移除加载北京元素
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
// 如果vr可用，获取vr设备列表，只取第一个
if (VRenabled && navigator.getVRDisplays) {
    navigator.getVRDisplays().then(function (props) {
        if (props.length > 0) {
            init(props[0]);
            vrabled = true;
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
        debugger;
        if (started) {
            toggleCart();
        } else {
            panelContainer.removeClass('state-about');
        }
    });
    startButton.on('tap', function () {
        debugger;
        if (!started) {
            started = true;
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
    scene.on('closeAbout', function () {
        toggleCart();
    });
    panel.on('mouseenter', function () {
        $('body').removeClass('hovering');
    });
    $(window).on('resize', open);
});
