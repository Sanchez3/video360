#360°全景视频

##背景

现在网络上一大堆VR全景视频，微博全景图片，这些统统不是VR

>Notes: 全景视频≠VR

- 全景视频更多的强调的是180度或者360度全面可见。

- VR视频就不仅仅是全部可见，还要有深度信息也就是第一视角可以在场景里自由走动。


所以目前业内并没有一个没有标准意义的VR视频，再加上VR受限于设备，不仅仅是一个显示屏（眼镜设备），还需要能够进行深度互动的设备（手柄等）

![compare](https://github.com/Sanchez3/video360/blob/master/assets/img/compare.gif)

##现状

随着移动设备不断更新换代，全景视频已经能兼容绝大多数主流手机，体验良好（ios上顺畅，Android上微卡可看）。
当然在全景视频的基础上再加上stero 3d（threejs的插件 StereoEffect.js），创造出虚拟现实的分屏效果，使用vr眼镜可以实现视觉上的VR体验。
stereo 3d demo
以上，对360°全景视频进行研究



##研究内容

- aframe插件 虽然chrome开发者工具 模拟手机可用，但是实际上微信or手机原生浏览器并不可用。aframe 入门简单，方便使用。弃用

- valiant360 插件同上，是threejs基础上的开发的插件，但是有bug！弃用

- threejs 可用，采用

  > Notes: 由于微信限制（无法监控video加载，只有播放时视频才会进行加载，wbem格式的视频不可用等技术弊端），要求视频为mp4，视频大小暂定小于100mb，时长5分钟内（已测试成功的视频要求，20mb，时长1分左右）



[demo](https://codepen.io/sanchez3/full/KXpvxO/)

由于视频跨域问题，demo无法在手机端观看，可使用chrome开发者工具模拟手机查看