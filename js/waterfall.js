/* jshint asi:true */
//先等圖片都加載完成
//再執行布局函數

/**
 * 執行主函數
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 內容JSON
     */
  var demoContent = [
    {
      demo_link: 'https://codepen.io/haoyang/pen/jrvrQq',
      img_link: 'https://ooo.0o0.ooo/2016/11/24/5836d81f48cd2.png',
      code_link: 'https://codepen.io/haoyang/pen/jrvrQq',
      title: 'Fisher-Yates 洗牌算法動畫',
      core_tech: 'JavaScript',
      description: 'Fisher-Yates 洗牌算法動畫。算法詳情見 <a href ="https://gaohaoyang.github.io/2016/10/16/shuffle-algorithm/">這裡</a>。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/test/headerTransition/',
      img_link: 'https://ooo.0o0.ooo/2016/06/20/5768c1597d1fe.png',
      code_link: 'https://github.com/Gaohaoyang/test/tree/master/headerTransition',
      title: 'Header Transition 漸變動畫',
      core_tech: 'jQuery BootStrap CSS3',
      description: '花費不到半小時幫師兄做了一個簡單的 CSS3 動畫效果，當頁面滾動到指定距離時，header 區的背景色由透明變為藍色。仿照了網站 <a href ="https://quorrajs.org/">https://quorrajs.org/</a> 的 Header 區動畫效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/mask-fade-out/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/demo-fade-out.png',
      code_link: 'https://github.com/Gaohaoyang/mask-fade-out',
      title: '遮罩層按指定路徑縮小消失',
      core_tech: 'jQuery CSS',
      description: '使用 animate 方法，做到兼容 IE8。曾在聯想服務官網上線3個月。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ToDo-WebApp/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/blog-todoWebApp.png',
      code_link: 'https://github.com/Gaohaoyang/ToDo-WebApp',
      title: '百度前端學院 task0004 ToDo 應用(移動端)',
      core_tech: 'JavaScript LocalStorage requireJS Sass Gulp XSS',
      description: '在任務三中，做了一個 PC 端的 ToDo 應用。任務四是將它優化，以適應移動端設備。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/baidu-ife-practice/task0003/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/demo-todo.png',
      code_link: 'https://github.com/Gaohaoyang/baidu-ife-practice/tree/master/task0003',
      title: '百度前端學院 task0003 ToDo 應用',
      core_tech: 'JavaScript LocalStorage',
      description: '任務三，ToDo 單頁應用，主要使用了 LocalStorage 存儲數據，使用 JSON 模擬了 3 張數據表。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_5.html',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/demo-drag.png',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '拖拽交互',
      core_tech: 'JavaScript',
      description: '對鼠標事件應用，以及判斷定位的方法等。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_4.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba2krzs0j207005y0sv.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '輸入框即時提示',
      core_tech: 'JavaScript',
      description: '對input監聽，使用正在表達式高亮匹配，實現輸入聯想效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_3.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba04okoqj20eq093wh1.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '輪播圖',
      core_tech: 'JavaScript',
      description: '變速運動，運動終止條件的應用。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_2.html',
      img_link: 'http://ww4.sinaimg.cn/large/7011d6cfjw1f3b9w6xpz5j20ae02pgm3.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '倒計時',
      core_tech: 'JavaScript',
      description: 'setInterval()，Date 對象的學習和使用。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_1.html',
      img_link: 'http://ww3.sinaimg.cn/large/7011d6cfjw1f3b9tmyuh2j20au0aaaar.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '處理興趣愛好列表',
      core_tech: 'JavaScript',
      description: '對JavaScript正則表達式和字符串的練習。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/index.html',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/demo-demo-index.png',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '百度前端學院 task0002 展示主頁',
      core_tech: 'HTML CSS',
      description: '任務二的展示主頁，裡麵包含五個小 demo。還有一篇相關的<a href="http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/" target="_blank">日誌。</a>'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0001/work/Gaohaoyang/index.html',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/Demo-blog-ife.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0001/work/Gaohaoyang',
      title: '百度前端學院 task0001 個人博客',
      core_tech: 'HTML CSS',
      description: '完成百度前端學院的任務。深刻的理解了BFC、浮動、inline-block間距，多列布局等技術。還有一篇相關的<a href="http://gaohaoyang.github.io/2015/04/15/baidu-ife-1/" target="_blank">日誌。</a>'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ghost-button-css3/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/DemoGhost-Button.png',
      code_link: 'https://github.com/Gaohaoyang/ghost-button-css3',
      title: 'Ghost Button 幽靈按鈕',
      core_tech: 'CSS3',
      description: '使用 CSS3 中的旋轉、縮放、過渡、動畫等效果，製作出很酷的按鈕效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/shadow-demo-css3',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/Demoshadow.png',
      code_link: 'https://github.com/Gaohaoyang/shadow-demo-css3',
      title: 'CSS3 陰影特效',
      core_tech: 'CSS3',
      description: 'CSS3 中的陰影、旋轉等效果，製作出曲邊陰影和翹邊陰影。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/learning-AngularJS/2-3-bookstore-add-sth-by-myself/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/DemoAngularJS.png',
      code_link: 'https://github.com/Gaohaoyang/learning-AngularJS/tree/master/2-3-bookstore-add-sth-by-myself',
      title: 'AngularJS 結合動畫效果',
      core_tech: 'AngularJS CSS3',
      description: '使用 AngularJS 中的 ngAnimate 加 CSS3里面的一些旋轉效果，做出頁面切換的效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/learning-AngularJS/2-4-UiRouterPractice',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3b8zumfqij20q40nh76x.jpg',
      code_link: 'https://github.com/Gaohaoyang/learning-AngularJS/tree/master/2-4-UiRouterPractice',
      title: 'AngularJS UI-router 練習',
      core_tech: 'AngularJS UI-router',
      description: 'UI-router 作為 AngularJS 中路由的擴充，實現了多級路由的效果。使得前端界面跳轉更加方便。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/test/bootstrap-zhihu/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/teach-girlfriend-html-CopyZhihu.jpg',
      code_link: 'https://github.com/Gaohaoyang/test/tree/master/bootstrap-zhihu',
      title: '仿知乎頁面',
      core_tech: 'HTML BootStrap',
      description: '使用BootStrap仿照知乎做了一個靜態頁面。'
    }
  ];

  contentInit(demoContent) //內容初始化
  waitImgsLoad() //等待圖片加載，並執行布局初始化
}());

/**
 * 內容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技術：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代碼 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技術：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代碼 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待圖片加載
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化柵格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
