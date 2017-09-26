/* jshint asi:true */

/**
 * [fixSidebar description]
 * 滾輪滾到一定位置時，將 sidebar-wrap 添加 fixed 樣式
 * 反之，取消樣式
 */
(function() {
    if (window.innerWidth > 930) {

        var sidebarWrap = document.querySelector('.right>.wrap')

        //fix 之後百分比寬度會失效，這裡用js賦予寬度
        sidebarWrap.style.width = sidebarWrap.offsetWidth + "px"
        window.onscroll = function() {

            // 頁面頂部滾進去的距離
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)


            // 頁面底部滾進去的距離
            var htmlHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                // console.log(htmlHeight);
            var scrollBottom = htmlHeight - window.innerHeight - scrollTop

            if (scrollTop < 53) {
                sidebarWrap.classList.remove('fixed')
                sidebarWrap.classList.remove('scroll-bottom')
            } else if (scrollBottom >= (190 - 38)) {
                sidebarWrap.classList.remove('scroll-bottom')
                sidebarWrap.classList.add('fixed')
            } else if (isMaxHeight()) { //content 達到maxHeight
                sidebarWrap.classList.remove('fixed')
                sidebarWrap.classList.add('scroll-bottom')
            }
        }
        setContentMaxHeightInPC() //設置目錄最大高度(PC端)
    }
    moveTOC() //將Content內容轉移
}());

/**
 * 設置目錄最大高度
 */
function setContentMaxHeightInPC() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 77 - 60
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}

/**
 * 達到最大高度
 * @return {Boolean} [description]
 */
function isMaxHeight() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 77 - 60
    var contentHeight = contentUl.offsetHeight
    return contentMaxHeight === contentHeight
        // console.log(contentMaxHeight);
        // console.log(contentHeight);
}


//-------------mobile--------------
/**
 * 屏幕寬度小於930px時，點擊錨點按鈕，彈出目錄框
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {
    if (window.innerWidth <= 930) {
        var anchorBtn = document.querySelector('.anchor')
        var rightDiv = document.querySelector('.right')

        /**
         * 監聽錨點按鈕
         */
        anchorBtn.onclick = function(e) {
            e.stopPropagation()
            rightDiv.classList.add('right-show')
            anchorBtn.classList.add('anchor-hide')
        }

        //監聽body，點擊body，隱藏Content
        document.querySelector('body').addEventListener('click', function() {
            rightDiv.classList.remove('right-show')
            anchorBtn.classList.remove('anchor-hide')
        })

        ancherPostion(anchorBtn, rightDiv) //目錄錨的位置固定
        setContentMaxHeight() //設置目錄最大高度
    }
}());

/**
 * 目錄錨的位置固定
 */
function ancherPostion(anchorBtn, rightDiv) {
    window.addEventListener('scroll', function() {
        // console.log('scroll');
        var top = anchorBtn.getBoundingClientRect().top
            // console.log(top);
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop > 50) {
            anchorBtn.style.top = '20px'
            rightDiv.style.top = '20px'
        } else {
            anchorBtn.style.top = '76px'
            rightDiv.style.top = '76px'
        }
    })
}

/**
 * 設置目錄最大高度
 */
function setContentMaxHeight() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 180
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}

//-------------post Content----------------------
//將Content內容轉移
function moveTOC() {
    if (document.querySelector('#markdown-toc') !== null) {
        var TOCString = document.querySelector('#markdown-toc').innerHTML
        var contentUl = document.querySelector('#content-side')
        contentUl.insertAdjacentHTML('afterbegin', TOCString) //插入字符串

        // if (!isAndroidWechatBrowser()) {

            //添加scroll樣式，為了平滑滾動
            //add class "scroll", for smooth scroll
            var aTags = document.querySelectorAll('#content-side a')

            //add class for everyone
            // aTags.forEach(function () {
            //     console.log(this);
            // })
            for (var i = 0; i < aTags.length; i++) {
                // if (!aTags[i].classList.contains('scroll')) {
                //     aTags[i].classList.add('scroll')
                // }
                if (!aTags[i].hasAttribute('data-scroll')) {
                  aTags[i].setAttribute('data-scroll','');
                }

            }
        // }

    }
}

/**
 * 判斷安卓版微信瀏覽器
 * @return {Boolean} [description]
 */
function isAndroidWechatBrowser() {
    var ua = navigator.userAgent.toLowerCase()
    return /micromessenger/.test(ua) && /android/.test(ua2)
}
