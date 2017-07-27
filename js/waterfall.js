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
      demo_link: 'http://chanceat.azurewebsites.net/Login/Index',
      img_link: 'http://chanceat.azurewebsites.net/Content/img/logo.png',
      title: '晨食餐飲集團',
      core_tech: 'ASP.NET MVC',
      description: '資訊工業策進會結訓專題'
    },

    {
      demo_link: 'https://codepen.io/haoyang/pen/jrvrQq',
      img_link: 'https://tad.tycg.gov.tw/images/bg_index_banner.png',
      title: '桃園市政府交通事件裁決處',
      core_tech: 'ASP.NET MVC',
      description: '桃園市政府交通事件裁決處，線上申辦、便民服務'
    },
    
    {
      demo_link: 'http://app.creatidea.com.tw/EpaAnniversary',
      img_link: 'http://app.creatidea.com.tw/EpaAnniversary/images/img_index_banner.jpg',
      title: '環保署30週年慶',
      core_tech: 'ASP.NET MVC',
      description: '行政院環保署30週年慶，各局處大事記、各地今昔對比、多媒體圖片影音電子書。'
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
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技術：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '"></a>' + '   </p>' + '</div>'
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
