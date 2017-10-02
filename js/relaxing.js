var domain = window.location.origin;

var hashYoutubeCode = window.location.hash.substr(1);
if(hashYoutubeCode!="")
{
    $(".media-container").append('<iframe width="854px" height="480px" src="https://www.youtube.com/embed/' + hashYoutubeCode + '?&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    $(".copylink").val(domain +'/relaxing/#'+ hashYoutubeCode);  
}
else if ($("#YouTubeCode").val().length > 0) {
    $(".media-container").append('<iframe width="854px" height="480px" src="https://www.youtube.com/embed/' + $("#YouTubeCode").val() + '?&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    $(".copylink").val(domain +'/relaxing/#'+ $("#YouTubeCode").val());   
}

$(document).on("click", "#YouTubeCode",
    function() {
        $(".media-link").show();
        if ($(this).val() != null) {
            $(".media-container").find("iframe").remove();
            $(".media-container").find("a").remove();
            $(".media-container").css("padding-bottom","56.25%");
            $(".media-container").append('<iframe width="854px" height="480px" src="https://www.youtube.com/embed/' + $(this).val() + '?&autoplay=1" frameborder="0" allowfullscreen></iframe>');
            $(".copylink").val(domain +'/relaxing/#'+ $(this).val());  
        }
    });

    var copyBtn = document.querySelector(".copybtn");  
    copyBtn.addEventListener("click", function(event) {  
      var copyLink = document.querySelector(".copylink");  
      var range = document.createRange();  
      range.selectNode(copyLink);  
      window.getSelection().addRange(range);

      try {  
        var successful = document.execCommand("copy");  
        var msg = successful ? "successful" : "unsuccessful";  
        console.log("Copy email command was " + msg);  
      } catch(err) {  
        console.log("Oops, unable to copy");  
      }  
    
      window.getSelection().removeAllRanges();  
    });

    $(document).on("click", "#RadioCode",
    function() {
        $(".media-link").hide();
        if ($(this).val() != null) {
            $(".media-container").find("iframe").remove();
            $(".media-container").find("a").remove();
            var a_tag_had = '<a class="btn btn-warning" id="radio" href="javascript:MM_openBrWindow(';
            var radio_url = "'http://hichannel.hinet.net/player/radio/index.jsp?radio_id="+ $(this).val() + "',";
            var play = "'play',";
            var width_height = "'width=362,height=204')";
            var a_tag_end = '">';
            var tag_all = a_tag_had + radio_url + play + width_height + a_tag_end + $(this).text() +"</a>"
            $(".media-container").append(tag_all);
            $(".media-container").css("padding-bottom","80px");
            $("#radio").css("font-size","200%");
            document.getElementById('radio').click();
        }
    });

    function MM_swapImgRestore() { //v3.0
      var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
    }
    
    function MM_preloadImages() { //v3.0
      var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
        var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
        if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
    }
    
    function MM_findObj(n, d) { //v4.01
      var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
      if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
      for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
      if(!x && d.getElementById) x=d.getElementById(n); return x;
    }
    
    function MM_swapImage() { //v3.0
      var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
       if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
    }
    
    function MM_openBrWindow(theURL,winName,features) { //v2.0
      window.open(theURL,winName,features);
    }

