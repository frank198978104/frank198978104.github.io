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
      demo_link: 'https://tad.tycg.gov.tw/',
      img_link: 'https://tad.tycg.gov.tw/images/bg_index_banner.png',
      title: '桃園市政府交通事件裁決處',
      core_tech: 'ASP.NET MVC',
      description: '桃園市政府交通事件裁決處，線上申辦、便民服務'
    },
    
    {
      demo_link: 'https://epaanni.epa.gov.tw/',
      img_link: 'https://epaanni.epa.gov.tw/images/img_index_banner.jpg',
      title: '環保署30週年慶',
      core_tech: 'ASP.NET MVC',
      description: '行政院環保署30週年慶，各局處大事記、各地今昔對比、多媒體圖片影音電子書。'
    },

    {
      demo_link: 'http://miaolitravel.net/',
      img_link: 'http://miaolitravel.net/images/miaoli_body_image3.gif',
      title: '苗栗玩透透',
      core_tech: 'ASP.NET MVC',
      description: '苗栗文化觀光旅遊網、苗栗、文化、觀光、旅遊、桐花、溫泉、單車、自由行、住宿、餐飲、美食、風景、螢火蟲、木雕、藝術、水果、草莓、邯鄲、元宵、火旁龍、客家'
    },

    {
      demo_link: 'https://www.web-fd.taipei/i-AMOUR/',
      img_link: 'https://www.web-fd.taipei/i-AMOUR/images/stories/site/inner_banner2.png',
      title: 'i-Amour 愛上視障按摩',
      core_tech: 'ASP.NET MVC',
      description: '視障按摩在臺灣是一種非常特別的行業，在過去，只有視障者能夠從事按摩的工作，但在100年11月1日起因為大法官649號釋憲開放了按摩市場，按摩工作不再專屬於視障朋友，所以政府有一些輔導措施（包括按摩推廣行銷、技術養成與在職訓練、按摩環境更新改善、優良按摩院甄選以及創業補助等）協助視障按摩師重新包裝自己，讓社會大眾對於視障按摩有全新的體認。'
    },

    {
      demo_link: 'https://agriexpo.tycg.gov.tw/',
      img_link: 'https://agriexpo.tycg.gov.tw/Images/Fin/0.jpg',
      title: '桃園農業博覽會',
      core_tech: 'ASP.NET MVC',
      description: '「2017桃園農業博覽會」雖然從試營運出發，但卻創下同質性活動中超高入園人數的佳績，更成為全臺矚目的焦點！桃園市政府秉持專業、效率、為民服務的精神，在市府團隊的同心協力下，完成無數不可能的任務！更帶動地方、產業及中央的共同關注與支持！展望「2018桃園農業博覽會」正式營運市府將透過深耕在地文化、展現產業創新、帶動全民參與提升國際能見度等，藉以凝聚桃園的力量、拉近城鄉的距離、共同推展桃園智慧農業、永續家園的城市新願景！'
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
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" target="_blank" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技術：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '"></a>' + '   </p>' + '</div>'
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
