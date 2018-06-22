  (function(){
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration':'none'
        },
        this.options = $.extend({}, this.defaults, opt.css);
        this.modths = $.extend({}, this.defaults, opt);
        var html = '',data = opt.column,moduel='';
        for(var i=0,l=data.length;i<l;i++){
          html += "<tr data-val='"+data[i].value+"'>"+
                  "<td><img src='"+data[i].img+"'/></td>"+
                  "<td><span>"+data[i].title+"</span></td>"+
                  "</tr>";
        }
        moduel ="<span></span><i></i>"+
                "<div><table cellspacing='0' cellpadding='0' border='0'>"+
                "<tbody>"+html+"</tbody>";
        this.$element.append(moduel);
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        },
        modthSelf: function(){
            var el = this.$element;
            return  el.click(function(eve){
                      if($(this).children("div").css("display")==="none"){
                         $(window).click();
                      }
                      $(this).toggleClass("divClicked").children("div").toggle();
                      eve.stopPropagation();
                    });
        },
        modthWindow: function(){
          var el = this.$element;
          return $(window).click(function(){
                    el.removeClass("divClicked").children("div").hide();
                  });
        },
        modthTr: function(){
          var el = this.$element;
            return  el.find("tr").click(function(){
                        var str = $(this).find("span").text();
                        var val = $(this).attr("data-val");
                        el.attr("data-val",val).children("span").html(str);
                        if(el.children("img").length>0){
                            el.children("img").replaceWith($(this).find("img").clone());
                            return;
                        }
                      el.prepend($(this).find("img").clone());
                    });
        },
        onClickd:function(){
          return this.$element.find("tr").click(this.modths.onClickd);
        },
        setVal:function(val){
          $(this.$element).find("tr").each(function(){
            if($(this).attr("data-val")===val){
              $(this).click();
            }
          });
        },
        getVal:function(){
          return $(this.$element).attr("data-val");
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
      //创建Beautifier的实体
      var beautifier = new Beautifier(this, options);
      //调用其方法
      if(arguments.length==1){
        if(typeof arguments[0] === 'object'){
          beautifier.beautify();
          beautifier.modthSelf();
          beautifier.modthWindow();
          beautifier.modthTr();
          beautifier.onClickd();
        }
      }
      return beautifier;
    }
})();