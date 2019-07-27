function toggleCart() {
  me.removeClass('visible');
  setTimeout(function () {
    $el.addClass('visible');
  }, 400);
}
function loadImage(url, crossOrigin, deferred) {
  var r = ($(window).width() - crossOrigin) / 2;
  var i = ($(window).height() - deferred) / 2;
  var link_options = 'status=1,width=' + crossOrigin + ',height=' + deferred + ',top=' + i + ',left=' + r;
  return window.open(url, 'share', link_options), false;
}
function open() {
  if (window.isMobile) {
    _.defer(function () {
      var winh = $hero.outerHeight(true) - footer.height();
      var scroll = $scrollToEl.outerHeight();
      var sub_bottom = window.innerHeight ? window.innerHeight : $(window).height();
      var footerTransition = sub_bottom - (winh + scroll);
      footer.css('height', footerTransition);
    });
  }
}
function init(flightPhase) {
  app = new Apps({
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
  return scope.texturePath = id + name + '/', self.loadScene(name, id + 'scenes/', app, message);
}
function initialize() {
  searchContactPanel.show();
  open();
  var options = {
    geometries: [
      a,
      b,
      i
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
  scope.environmentPath = id + 'environments';
  scope.geometryPath = id + 'scenes/data/';
  new Animation(options).load().then(function (module) {
    render(i).then(function () {
      render(b).then(function () {
        render(a).then(function () {
          app.PBRMaterial();
          _.defer(function () {
            $menuContainer.show();
            searchContactPanel.hide();
          });
          if (pattern.AUTOSTART && !VRenabled) {
            N = true;
            start();
            $el.addClass('visible');
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
  browser_message.hide();
  forms.addClass('started');
  $allPanels.addClass('state-about in-app');
  me.removeClass('hidden');
  if (!window.isMobile) {
    me.show();
  }
  $(window).trigger('resize');
  $el.addClass('visible');
  setTimeout(function () {
    gitHtml.remove();
  }, 200);
}
import 'module/null';
import 'module/BaseUtils';
var app;
import pattern from 'module/Config';
import Animation from 'module/LoaderManager';
import scope from 'module/LoaderUtils';
import self from 'module/instance';
import Apps from 'module/sceneManager';
import gmUtils from 'module/WebVRUtils';
import message from 'module/jsext';
var a = 'interior2';
var b = 'exterior2';
var i = 'start';
var id = window.isMobile ? 'assets_mobile/' : 'assets/';
var $navContainer = $('[data-ref="sharing"]');
var $allPanels = $('[data-ref="panel_container"]');
var $doc = $('[data-ref="about_link"]');
var $openPanel = $('[data-ref="close_about"]');
var me = $('[data-ref="panel"]');
var browser_message = $('[data-ref="border"]');
var searchContactPanel = $('[data-ref="progress"]');
var $menuContainer = $('[data-ref="start"]');
var forms = $('.loading');
var gitHtml = $('.loading .background');
var subtitles_selector = $('.percentage');
var jQHeader = $('.warning');
var $el = $('[data-ref="about_button"]');
var $hero = $('[data-ref="titlescreen_main"]');
var footer = $('[data-ref="titlescreen_illustration"]');
var $scrollToEl = $('[data-ref="titlescreen_footer"]');
var N = false;
var B = false;
scope.manager.onProgress = function (status, e, i) {
  subtitles_selector.html(Math.round(e / pattern.ASSET_COUNT * 100));
  open();
};
window.VRenabled = gmUtils.isAvailable();
var U = gmUtils.isLatestAvailable();
if (VRenabled) {
  if (!U) {
    jQHeader.html('<img src=\'img/missing-headset.png\'>Your version of WebVR is out of date. <a href=\'http://webvr.info\'>Fix this</a>');
  }
} else {
  jQHeader.html('<img src=\'img/missing-headset.png\'>You browser does not support WebVR. <br/>Falling back to non-VR mode.');
}
if (VRenabled && navigator.getVRDisplays) {
  navigator.getVRDisplays().then(function (props) {
    if (props.length > 0) {
      init(props[0]);
      B = true;
    } else {
      console.error('No VR display');
      jQHeader.html('<img src=\'img/missing-headset.png\'>Your browser supports WebVR, but we couldn\'boot find your headset. Falling back to non-VR mode.');
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
  $navContainer.on('tap', function () {
    loadImage($(this).data('href'), $(this).data('width'), $(this).data('height'));
  });
  $doc.on('tap', function () {
    $allPanels.addClass('state-about');
  });
  $openPanel.on('tap', function () {
    if (N) {
      toggleCart();
    } else {
      $allPanels.removeClass('state-about');
    }
  });
  $menuContainer.on('tap', function () {
    if (!N) {
      N = true;
      if (VRenabled || window.isMobile) {
        me.hide();
        start();
      } else {
        me.addClass('hidden');
        setTimeout(function () {
          me.hide();
          browser_message.addClass('hidden');
          setTimeout(function () {
            start();
          }, 400);
        }, 700);
      }
    }
  });
  $el.on('tap', function (module) {
    $el.removeClass('visible');
    me.addClass('visible');
  });
  app.on('closeAbout', function () {
    toggleCart();
  });
  me.on('mouseenter', function () {
    $('body').removeClass('hovering');
  });
  $(window).on('resize', open);
});
