/**
 * Created by sanchez 
 */
'use strict';
// import CSS
// import animate_css from 'animate.css/animate.min.css';
import css from '../css/css.css';
// import scss from '../css/sass.scss';


// require('aframe');
// require('t')
// window.Detector = require('./entities/Detector');
// require('./entities/CanvasRenderer');
// require('./entities/Projector');
// require('jquery.valiant360');
// import Js Plugins/Entities

//ES6 Module
// import Bar1 from './entities/Bar1';
// import Howler from 'howler';
// //CommonJS
// var Bar2=require('./entities/Bar2');

if (/Mobile/i.test(navigator.userAgent)) {
    window.isMobile = true;
} else {
    window.isMobile = false;
}


window.h5 = {
    initThree360: function() {
        var camera, scene, renderer;
        var texture_placeholder,
            isUserInteracting = false,
            onMouseDownMouseX = 0,
            onMouseDownMouseY = 0,
            lon = 0,
            onMouseDownLon = 0,
            lat = 0,
            onMouseDownLat = 0,
            phi = 0,
            theta = 0,
            distance = 500,
            onPointerDownPointerX = 0,
            onPointerDownPointerY = 0,
            onPointerDownLon = 0,
            onPointerDownLat = 0;
        init();
        // animate();

        function init() {
            var container, mesh;
            window.loaded = false;
            container = document.getElementById('container');
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
            camera.target = new THREE.Vector3(0, 0, 0);
            scene = new THREE.Scene();
            var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
            // invert the geometry on the x-axis so that all of the faces point inward
            geometry.scale(-1, 1, 1);
            var play_btn = document.getElementById('play_btn');
            var video = document.createElement('video');
            video.width = 640;
            video.height = 360;
            video.loop = true;
            // video.muted = true;

            // video.src = 'http://flimshaw.github.io/Valiant360/videos/overpass-2k.mp4';
            video.src='./assets/media/surf1.mp4';
            video.setAttribute('webkit-playsinline', 'webkit-playsinline');
            video.setAttribute('playsinline', 'playsinline');
            video.setAttribute('x5-video-player-fullscreen', 'false');
            video.setAttribute('x5-video-player-type', 'h5');
            video.setAttribute('x-webkit-airplay', 'true');
            video.crossOrigin = "Anonymous";


            // play_btn.innerHTML = 'Play';
            var texture = new THREE.VideoTexture(video);
            texture.minFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            var material = new THREE.MeshBasicMaterial({ map: texture });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            animate();


            play_btn.addEventListener('click', function() {
                play_btn.innerHTML = 'Play';
                if (!window.loaded) {
                    // video.pause();
                    window.loaded = true;
                } else {
                    video.play();
                    play_btn.style.display = 'none';
                }
            }, true);
            var eventstart, eventmove, eventstart;

            document.addEventListener('touchstart', function(e) {}, false);
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);

            container.addEventListener('touchstart', onDocumenTouchDown, false);
            container.addEventListener('touchmove', onDocumentTouchMove, false);
            container.addEventListener('touchend', onDocumentTouchUp, false);

            container.addEventListener('mousedown', onDocumentMouseDown, false);
            container.addEventListener('mousemove', onDocumentMouseMove, false);
            container.addEventListener('mouseup', onDocumentMouseUp, false);


            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            if (/Mobile/i.test(navigator.userAgent)) {
                window.isMobile = true;
            } else {
                window.isMobile = false;
            }
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }


        function onDocumentMouseDown(event) {
            event.preventDefault();
            isUserInteracting = true;
            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }

        function onDocumentMouseMove(event) {

            if (isUserInteracting === true) {
                lon = (onPointerDownPointerX - event.clientX) * 0.5 + onPointerDownLon;
                lat = (event.clientY - onPointerDownPointerY) * 0.5 + onPointerDownLat;

            }
        }

        function onDocumentMouseUp(event) {
            isUserInteracting = false;
        }

        function onDocumenTouchDown(event) {
            event.preventDefault();
            isUserInteracting = true;
            onPointerDownPointerX = event.touches[0].clientX;
            onPointerDownPointerY = event.touches[0].clientY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }

        function onDocumentTouchMove(event) {

            if (isUserInteracting === true) {
                lon = (onPointerDownPointerX - event.touches[0].clientX) * 0.5 + onPointerDownLon;
                lat = (event.touches[0].clientY - onPointerDownPointerY) * 0.5 + onPointerDownLat;

            }
        }

        function onDocumentTouchUp(event) {
            isUserInteracting = false;
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
        }

        function update() {
            lat = Math.max(-85, Math.min(85, lat));
            phi = THREE.Math.degToRad(90 - lat);
            theta = THREE.Math.degToRad(lon);
            camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
            camera.position.y = distance * Math.cos(phi);
            camera.position.z = distance * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(camera.target);
            /*
            // distortion
            camera.position.copy( camera.target ).negate();
            */
            renderer.render(scene, camera);
        }

    },
    initValiant360: function() {
        var play_btn = document.getElementById('play_btn');
        $('.valiantContainer').Valiant360();
        play_btn.addEventListener('click', function() {
            // play
            $('.valiantContainer').Valiant360('play');
            $('.valiantContainer').Valiant360('pause');
        }, false);
        $('.valiantContainer').Valiant360('loadVideo', './assets/media/city.mp4');
        $('.valiantContainer').Valiant360('play');
        // $('.valiantContainer').Valiant360('pause');

    },
    rootResize2: function() {
        //orientation landscape width=1334px
        var wFsize;
        var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
            window.innerWidth : window.innerWidth;
        var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
            screen.height : window.innerHeight : window.innerHeight;
        if (wWidth > wHeight) {
            wHeight = wWidth;
        }
        wFsize = wHeight / 13.34;
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    },
    rootResize1: function() {
        //orientation landscape width=1334px
        var that = this;
        var Dpr = 1,
            uAgent = window.navigator.userAgent;
        var isIOS = uAgent.match(/iphone/i);
        var isYIXIN = uAgent.match(/yixin/i);
        var is2345 = uAgent.match(/Mb2345/i);
        var ishaosou = uAgent.match(/mso_app/i);
        var isSogou = uAgent.match(/sogoumobilebrowser/ig);
        var isLiebao = uAgent.match(/liebaofast/i);
        var isGnbr = uAgent.match(/GNBR/i);
        var isWeixin = uAgent.match(/MicroMessenger/i);
        var wFsize;
        var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
            window.innerWidth : window.innerWidth;
        var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
            screen.height : window.innerHeight : window.innerHeight;
        if (isIOS) {
            wWidth = screen.width;
            wHeight = screen.height;
        }
        if (wWidth > wHeight) {
            wHeight = wWidth;
        }
        wFsize = wHeight / 13.34;
        if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr || isWeixin) { //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
            setTimeout(function() {
                wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (wWidth > wHeight) {
                    wHeight = wWidth;
                }
                wFsize = wHeight / 13.34;
                // wFsize = wFsize > 32 ? wFsize : 32;
                document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
            }, 500);
        } else {
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        }

        return that;

    },
    eventInit: function() {
        var that = this;
        document.addEventListener('touchstart', function(e) {}, false);
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        return that;
    },
    cssInit: function() {
        var that = this;
        /*
        that.rootResize1();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            if (window.orientation == 90 || window.orientation == -90) {
                //横屏
                //_.renderShuping();
                that.rootResize();
            } else {
                //竖屏
                //_.closeShuping();
            }
        }, false);
        */
        var noChangeCountToEnd = 100,
            noEndTimeout = 1000;
        that.rootResize2();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            var interval,
                timeout,
                end,
                lastInnerWidth,
                lastInnerHeight,
                noChangeCount;
            end = function() {
                // "orientationchangeend"
                clearInterval(interval);
                clearTimeout(timeout);
                interval = null;
                timeout = null;
                that.rootResize1();
            };
            interval = setInterval(function() {
                if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                    noChangeCount++;
                    if (noChangeCount === noChangeCountToEnd) {
                        // The interval resolved the issue first.
                        end();
                    }
                } else {
                    lastInnerWidth = window.innerWidth;
                    lastInnerHeight = window.innerHeight;
                    noChangeCount = 0;
                }
            });
            timeout = setTimeout(function() {
                // The timeout happened first.
                end();
            }, noEndTimeout);
        });

        return that;
    }
};
window.h5.initThree360();
// window.h5.initValiant360();
// window.h5.cssInit().eventInit();


function showStats() {
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    var fs = document.createElement('div');
    fs.style.position = 'absolute';
    fs.style.left = 0;
    fs.style.top = 0;
    fs.style.zIndex = 999;
    fs.appendChild(stats.domElement);
    document.body.appendChild(fs);

    function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
showStats();