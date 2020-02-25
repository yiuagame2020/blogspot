var text_month = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var no_image_url = "http://1.bp.blogspot.com/-eAeO-DYJDws/Vkqtj4HFBFI/AAAAAAAAB0o/Q5OLsyONXM0/s1600-r/nth.png";

           var static_page_text = $.trim($('.static_page .post-body').text());
if (static_page_text === "[sitemap]") {
    var postbody = $('.static_page .post-body');
    $.ajax({
        url: "/feeds/posts/default?alt=json-in-script",
        type: 'get',
        dataType: "jsonp",
        success: function(dataZ) {
            var blogLabels = [];
            for (var t = 0; t < dataZ.feed.category.length; t++) {
                blogLabels.push(dataZ.feed.category[t].term)
            }
            var blogLabels = blogLabels.join('/');
            postbody.html('<div class="siteLabel"></div>');
            $('.static_page .post-body .siteLabel').text(blogLabels);
            var splabel = $(".siteLabel").text().split("/");
            var splabels = "";
            for (get = 0; get < splabel.length; ++get) {
                splabels += "<span>" + splabel[get] + "</span>"
            }
            $(".siteLabel").html(splabels);
            $('.siteLabel span').each(function() {
                var mapLabel = $(this);
                var mapLabel_text = $(this).text();
                $.ajax({
                    url: "/feeds/posts/default/-/" + mapLabel_text + "?alt=json-in-script",
                    type: 'get',
                    dataType: "jsonp",
                    success: function(data) {
                        var posturl = "";
                        var htmlcode = '<div class="mapa">';
                        for (var i = 0; i < data.feed.entry.length; i++) {
                            for (var j = 0; j < data.feed.entry[i].link.length; j++) {
                                if (data.feed.entry[i].link[j].rel == "alternate") {
                                    posturl = data.feed.entry[i].link[j].href;
                                    break
                                }
                            }
                            var posttitle = data.feed.entry[i].title.$t;
                            var author = data.feed.entry[i].author[0].name.$t;
                            var get_date = data.feed.entry[i].published.$t,
                                year = get_date.substring(0, 4),
                                month = get_date.substring(5, 7),
                                day = get_date.substring(8, 10),
                                date = text_month[parseInt(month, 10)] + ' ' + day + ', ' + year;
                            var tag = data.feed.entry[i].category[0].term;
                            var content = data.feed.entry[i].content.$t;
                            var $content = $('<div>').html(content);
                            var src2 = data.feed.entry[i].media$thumbnail.url;
                            htmlcode += '<div class="mapapost"><div class="map-thumb"><div class="map-img"><a href="' + posturl + '" style="background:url(' + src2 + ') no-repeat center center;background-size: cover"/></div></div><h3 class="wrp-titulo"><a href="' + posturl + '">' + posttitle + '</a></h3><div class="map-meta"><span class="p-author">' + author + '</span><span class="p-date">' + date + '</span></div></div>'
                        }
                        htmlcode += '</div>';
                        mapLabel.replaceWith('<div class="mapasite"><h2>' + mapLabel_text + '<span class="botao"><i class="fa fa-plus-circle"></i></span></h2>' + htmlcode + '</div>');
                        $(document).on('click', '.mapasite h2', function() {
                            $(this).parent('.mapasite').addClass('active');
                            $(this).find('.botao .fa').removeClass('fa-plus-circle').addClass('fa-minus-circle');
                        });
                        $(document).on('click', '.mapasite.active h2', function() {
                            $(this).parent('.mapasite').removeClass('active');
                            $(this).find('.botao .fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
                        });
                    }
                });
            });
        }
    });
}
