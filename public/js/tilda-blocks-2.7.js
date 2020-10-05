
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);
}

function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';

    setTimeout(function() {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function () {
            if ($(this).is(".t-menu__link-item.tooltipstered, .t-menu__link-item.t-menusub__target-link, .t-menu__link-item.t794__tm-link")) { return; }
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });

        el.find('.t-menusub__link-item').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });
    }, 500);
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1);
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1);
    }
    if (pathname == "") {
        pathname = "/";
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function () {
                t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function () {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
    t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function (a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
    $(window).bind('resize', t_throttle(function () {
        t228_updateSectionsOffsets(t228_sections);
    }, 200));
    $('.t228').bind('displayChanged', function () {
        t228_updateSectionsOffsets(t228_sections);
    });

    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function () {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function () {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function () {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}

function t228_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var t228_curSection = $(this);
        t228_curSection.attr("data-offset-top", t228_curSection.offset().top);
    });
}

function t228_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].attr("data-offset-top") > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null;
    }

    $(t228_sections).each(function (e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(true);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(true);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function () {
                center_w += $(this).outerWidth(true);
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden");
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "");

            }
        });
    }
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor);
            }
        });
    } else {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes");
        });
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function () {});

                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function () {});
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0");
                }
            }
        });
    }

}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.' + menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            }
        });
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function (e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened");
    });
    $(window).bind('resize', t_throttle(function () {
        if ($(window).width() > 980) {
            menu.fadeIn(0);
        }
    }));
}
function t270_scroll(hash, offset, speed) {
    var $root = $('html, body');
    var target = "";

    if (speed === undefined) {
        speed = 500;
    }

    try {
        target = $(hash);
    } catch(event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return true;
        }
    }

    $root.animate({
        scrollTop: target.offset().top - offset
    }, speed, function() {
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });

    return true;
}
function t281_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    $('#rec' + recid).attr('data-popup-subscribe-inited', 'y');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy == 'y') { t_lazyload_update(); }
    }));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t281_showPopup(recid);
            t281_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update();
            }
            if (analitics > '') {
                Tilda.sendEventToStatistics(analitics, hook);
            }
        });
    }
}

function t281_lockScroll(){
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top","-"+bodyScrollTop+"px");
        body.attr("data-popup-scrolltop",bodyScrollTop);
    }
}

function t281_unlockScroll(){
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top","");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop);
    }
}

function t281_showPopup(recid){
    var el=$('#rec'+recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed t281__body_popupshowed');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function() {
            t281_lockScroll();
        }, 500);
    }

    el.find('.t-popup').mousedown(function(e){
        if (e.target == this) { t281_closePopup(recid); }
    });

    el.find('.t-popup__close').click(function(e){
        t281_closePopup(recid);
    });

    el.find('a[href*=#]').click(function(e){
        var url = $(this).attr('href');
        if (!url || (url.substring(0,7) != '#price:' && url.substring(0,7) != '#order:')) {
            t281_closePopup(recid);
            if (!url || url.substring(0,7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 27) { t281_closePopup(recid); }
    });
}

function t281_closePopup(recid){
    $('body').removeClass('t-body_popupshowed t281__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t281_unlockScroll();
    }
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t281_resizePopup(recid){
    var el = $("#rec"+recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win ) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}

function t281_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0,7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if(ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }
}
function t282_showMenu(recid){
    var el=$("#rec"+recid);
    el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function(){
        if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) { return; }
        $('body').toggleClass('t282_opened');
        el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
        el.find(".t282__menu__container").css({'top':(el.find(".t282__container").height()+'px')});
    });
    $('.t282').bind('clickedAnchorInTooltipMenu',function(){
        $('body').removeClass('t282_opened');
        $('#rec'+recid+' .t282__menu__container, #rec'+recid+' .t282__overlay').addClass('t282__closed');
    });

    if (el.find('.t-menusub__link-item')) {
        el.find('.t-menusub__link-item').on('click', function() {
            $('body').removeClass('t282_opened');
            $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
        })
    }
}

function t282_changeSize(recid){
    var el=$("#rec"+recid);
    var bottomheight = el.find(".t282__menu__container");
    var headerheight = el.find(".t282__container");
    var menu = bottomheight.height() + headerheight.height();
    var win = $(window).height();
    if (menu > win ) {
        $("#nav"+recid).addClass('t282__menu_static');
    }
    else {
        $("#nav"+recid).removeClass('t282__menu_static');
    }
}

function t282_changeBgOpacityMenu(recid) {
    var window_width=$(window).width();
    var record = $("#rec"+recid);
    record.find(".t282__container__bg").each(function() {
        var el=$(this);
        var bgcolor=el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity=el.attr("data-bgopacity");
        var bgopacity_afterscroll=el.attr("data-bgopacity2");
        var menu_shadow=el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color",bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                el.css('box-shadow',menu_shadow);
            } else {
                el.css('box-shadow','none');
            }
        }else{
            el.css("background-color",bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
                el.css('box-shadow',menu_shadow);
            } else {
                el.css('box-shadow','none');
            }
        }
    });
}

function t282_highlight(recid){
    var url=window.location.href;
    var pathname=window.location.pathname;
    if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
    if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
    if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
    if(pathname == ""){ pathname = "/"; }
    $(".t282__menu a[href='"+url+"']").addClass("t-active");
    $(".t282__menu a[href='"+url+"/']").addClass("t-active");
    $(".t282__menu a[href='"+pathname+"']").addClass("t-active");
    $(".t282__menu a[href='/"+pathname+"']").addClass("t-active");
    $(".t282__menu a[href='"+pathname+"/']").addClass("t-active");
    $(".t282__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t282_appearMenu(recid) {
    var window_width=$(window).width();
    $(".t282").each(function() {
        var el=$(this);
        var appearoffset=el.attr("data-appearoffset");
        if(appearoffset!=""){
            if(appearoffset.indexOf('vh') > -1){
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
            }

            appearoffset=parseInt(appearoffset, 10);

            if ($(window).scrollTop() >= appearoffset) {
                if(el.css('visibility') == 'hidden'){
                    el.finish();
                    el.css("top","-50px");
                    el.css("visibility","visible");
                    el.animate({"opacity": "1","top": "0px"}, 200,function() {
                    });
                }
            }else{
                el.stop();
                el.css("visibility","hidden");
            }
        }
    });

}


function t390_initPopup(recid) {
    $('#rec'+recid).attr('data-animationappear','off');
    $('#rec'+recid).css('opacity','1');
    var el=$('#rec'+recid).find('.t-popup'),
        hook=el.attr('data-tooltip-hook'),
        analitics=el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function() {
        if(window.lazy=='y'){t_lazyload_update();}
    }, 200));

    if(hook!==''){
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t390_showPopup(recid);
            t390_resizePopup(recid);
            e.preventDefault();
            if(window.lazy=='y'){t_lazyload_update();}
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0,7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t390_showPopup(recid){
    var el=$('#rec'+recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed');

    el.find('.t-popup').mousedown(function(e){
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if(e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t390_closePopup(recid);
        }
    });

    el.find('.t-popup__close').click(function(e){
        t390_closePopup(recid);
    });

    el.find('a[href*=#]').click(function(e){
        var url = $(this).attr('href');
        if (!url || url.substring(0,7) != '#price:') {
            t390_closePopup(recid);
            if (!url || url.substring(0,7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 27) { t390_closePopup(recid); }
    });
}

function t390_closePopup(recid){
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t390_resizePopup(recid){
    var el = $("#rec"+recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win ) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0,7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if(ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }
}

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided вЂ” hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];}

function t404_unifyHeights(recid) {
    var el=$('#rec'+recid).find(".t404");
    el.find('.t-container').each(function() {
        var highestBox = 0;
        $('.t404__title', this).css('height', '');
        $('.t404__title', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height();
        });
        if($(window).width()>=960){
            $('.t404__title',this).css('height', highestBox);
        }else{
            $('.t404__title',this).css('height', "auto");
        }

        $('.t404__descr', this).css('height', '');
        var highestBox = 0;
        $('.t404__descr', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height();
        });
        if($(window).width()>=960){
            $('.t404__descr',this).css('height', highestBox);
        }else{
            $('.t404__descr',this).css('height', "auto");
        }

    });
}

function t404_unifyHeightsTextwrapper(recid) {
    var el=$('#rec'+recid).find(".t404");
    el.find('.t-container').each(function() {
        var highestBox = 0;
        $('.t404__textwrapper', this).each(function(){
            $(this).css("height","auto");
            if($(this).height() > highestBox)highestBox = $(this).height();
        });
        if($(window).width()>=960){
            $('.t404__textwrapper',this).css('height', highestBox);
        }else{
            $('.t404__textwrapper',this).css('height', "auto");
        }
    });
}

function t404_showMore(recid) {
    var el=$('#rec'+recid).find(".t404");
    el.find(".t-col").hide();
    var cards_size = el.find(".t-col").size();
    var cards_count=parseInt(el.attr("data-show-count"));
    if (cards_count > 500) { cards_count = 500; }
    var x=cards_count;
    var y=cards_count;
    el.find('.t-col:lt('+x+')').show();
    el.find('.t404__showmore').click(function () {
        x= (x+y <= cards_size) ? x+y : cards_size;
        el.find('.t-col:lt('+x+')').show();
        if(x == cards_size){
            el.find('.t404__showmore').hide();
        }
        $('.t404').trigger('displayChanged');
        if(window.lazy=='y'){t_lazyload_update();}
    });
}




function t450_showMenu(recid){
    var el=$('#rec'+recid);
    $('body').addClass('t450__body_menushowed');
    el.find('.t450').addClass('t450__menu_show');
    el.find('.t450__overlay').addClass('t450__menu_show');
    $('.t450').bind('clickedAnchorInTooltipMenu',function(){
        t450_closeMenu();
    });
    el.find('.t450__overlay, .t450__close, a[href*=#]').click(function() {
        var url = $(this).attr('href');
        if (typeof url!='undefined' && url!='' && (url.substring(0, 7) == '#price:' || url.substring(0, 9) == '#submenu:')) { return; }
        t450_closeMenu();
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('body').removeClass('t390__body_popupshowed');
            $('.t390').removeClass('t390__popup_show');
        }
    });
}

function t450_closeMenu(){
    $('body').removeClass('t450__body_menushowed');
    $('.t450').removeClass('t450__menu_show');
    $('.t450__overlay').removeClass('t450__menu_show');
}

function t450_checkSize(recid){
    var el=$('#rec'+recid).find('.t450');
    var windowheight = $(window).height() - 80;
    var contentheight = el.find(".t450__top").height() + el.find(".t450__rightside").height();
    if (contentheight > windowheight) {
        el.addClass('t450__overflowed');
        el.find(".t450__container").css('height', 'auto');
    }
}

function t450_appearMenu(recid) {
    var el=$('#rec'+recid);
    var burger=el.find(".t450__burger_container");
    burger.each(function() {
        var el=$(this);
        var appearoffset=el.attr("data-appearoffset");
        var hideoffset=el.attr("data-hideoffset");
        if(appearoffset!=""){
            if(appearoffset.indexOf('vh') > -1){
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
            }

            appearoffset=parseInt(appearoffset, 10);

            if ($(window).scrollTop() >= appearoffset) {
                if(el.hasClass('t450__beforeready')){
                    el.finish();
                    el.removeClass("t450__beforeready");
                }
            }else{
                el.stop();
                el.addClass("t450__beforeready");
            }
        }

        if(hideoffset!=""){
            if(hideoffset.indexOf('vh') > -1){
                hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
            }

            hideoffset=parseInt(hideoffset, 10);

            if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                if(!el.hasClass('t450__beforeready')){
                    el.finish();
                    el.addClass("t450__beforeready");
                }
            }else{
                if (appearoffset!="") {
                    if($(window).scrollTop() >= appearoffset){
                        el.stop();
                        el.removeClass("t450__beforeready");
                    }
                }else{
                    el.stop();
                    el.removeClass("t450__beforeready");
                }
            }
        }
    });
}

function t450_initMenu(recid){
    var el=$('#rec'+recid).find('.t450');
    var hook=el.attr('data-tooltip-hook');
    if(hook!==''){
        var obj = $('a[href="'+hook+'"]');
        obj.click(function(e){
            t450_closeMenu();
            t450_showMenu(recid);
            t450_checkSize(recid);
            e.preventDefault();
        });
    }
    $('#rec'+recid).find('.t450__burger_container').click(function(e){
        t450_closeMenu();
        t450_showMenu(recid);
        t450_checkSize(recid);
    });

    if (isMobile) {
        $('#rec'+recid).find('.t-menu__link-item').each(function() {
            var $this = $(this);
            if ($this.hasClass('t450__link-item_submenu')) {
                $this.on('click', function() {
                    setTimeout(function() {
                        t450_checkSize(recid);
                    }, 100);
                });
            }
        });
    }

    t450_highlight();
}

function t450_highlight() {
    var url=window.location.href;
    var pathname=window.location.pathname;
    if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
    if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
    if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
    if(pathname == ""){ pathname = "/"; }
    $(".t450__menu a[href='"+url+"']").addClass("t-active");
    $(".t450__menu a[href='"+url+"/']").addClass("t-active");
    $(".t450__menu a[href='"+pathname+"']").addClass("t-active");
    $(".t450__menu a[href='/"+pathname+"']").addClass("t-active");
    $(".t450__menu a[href='"+pathname+"/']").addClass("t-active");
    $(".t450__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t585_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t585__header");
    var accordion = el.find('.t585__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion');
    } else {
        accordion = "false";
    }

    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t585__opened").next().slideUp();
        }

        $(this).toggleClass("t585__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y') {
            t_lazyload_update();
        }
    });
}
function t702_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy == 'y') { t_lazyload_update(); }
    }));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t702_showPopup(recid);
            t702_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update();
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t702_onSuccess(t702_form){
    var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
    var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t702_target = t702_targetOffset - 200;
    }	else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        setTimeout(function(){
            if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
        }, 300);
    } else {
        $('html, body').animate({ scrollTop: t702_target}, 400);
        setTimeout(function(){t702_inputsWrapper.addClass('t702__inputsbox_hidden');}, 400);
    }

    var successurl = t702_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t702_lockScroll(){
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top","-"+bodyScrollTop+"px");
        body.attr("data-popup-scrolltop",bodyScrollTop);
    }
}

function t702_unlockScroll(){
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top","");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop);
    }
}


function t702_showPopup(recid){
    var el=$('#rec'+recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    el.find('.t-range').trigger('popupOpened');
    if(window.lazy=='y'){t_lazyload_update();}
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed t702__body_popupshowed');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function() {
            t702_lockScroll();
        }, 500);
    }
    el.find('.t-popup').mousedown(function(e){
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if(e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) { t702_closePopup(recid); }
    });

    el.find('.t-popup__close').click(function(e){
        t702_closePopup(recid);
    });

    el.find('a[href*="#"]').click(function(e){
        var url = $(this).attr('href');
        if (!url || url.substring(0,7) != '#price:') {
            t702_closePopup(recid);
            if (!url || url.substring(0,7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 27) { t702_closePopup(recid); }
    });
}

function t702_closePopup(recid){
    $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t702_unlockScroll();
    }
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t702_resizePopup(recid){
    var el = $("#rec"+recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win ) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0,7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if(ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }
}
function t734_init(recid) {
    var rec = $('#rec' + recid);
    if ($('body').find('.t830').length > 0) {
        if (rec.find('.t-slds__items-wrapper').hasClass('t-slds_animated-none')) {
            t_sldsInit(recid);
        } else {
            setTimeout(function() {
                t_sldsInit(recid);
            }, 500);
        }
    } else {
        t_sldsInit(recid);
    }

    rec.find('.t734').bind('displayChanged', function() {
        t_slds_updateSlider(recid);
    });
}
function t750_init(recid){
    t_sldsInit(recid);

    setTimeout(function(){
        t_prod__init(recid);
        t750_initPopup(recid);
    }, 500);
}

function t750_initPopup(recid){
    $('#rec'+recid).attr('data-animationappear','off');
    $('#rec'+recid).css('opacity','1');
    var el=$('#rec'+recid).find('.t-popup'),
        hook=el.attr('data-tooltip-hook'),
        analitics=el.attr('data-track-popup');
    if(hook!==''){
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t750_showPopup(recid);
            e.preventDefault();
            if(window.lazy=='y'){t_lazyload_update();}
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0,7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }

        });
    }
}

function t750_showPopup(recid){
    var el=$('#rec'+recid),
        popup = el.find('.t-popup'),
        sliderWrapper = el.find('.t-slds__items-wrapper'),
        sliderWidth = el.find('.t-slds__container').width(),
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));

    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        t_slds_SliderWidth(recid);
        sliderWrapper = el.find('.t-slds__items-wrapper');
        sliderWidth = el.find('.t-slds__container').width();
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
        sliderWrapper.css({
            transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
        });
        t_slds_UpdateSliderHeight(recid);
        t_slds_UpdateSliderArrowsHeight(recid);
        if(window.lazy=='y'){t_lazyload_update();}
    }, 50);

    $('body').addClass('t-body_popupshowed');

    el.find('.t-popup').mousedown(function(e){
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if(e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t750_closePopup();
        }
    });

    el.find('.t-popup__close, .t750__close-text').click(function(e){
        t750_closePopup();
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t750_closePopup();
        }
    });
}

function t750_closePopup(){
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}
/*deprecated*/
function t750_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0,7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;

    if(ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
        }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
}

function t756_init(recid){
    t_sldsInit(recid);

    setTimeout(function(){
        t_prod__init(recid);
        t756_initPopup(recid);
    }, 500);
}

function t756_initPopup(recid){
    $('#rec'+recid).attr('data-animationappear','off');
    $('#rec'+recid).css('opacity','1');
    var el=$('#rec'+recid).find('.t-popup'),
        hook=el.attr('data-tooltip-hook'),
        analitics=el.attr('data-track-popup');
    if(hook!==''){
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t756_showPopup(recid);
            e.preventDefault();

            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0,7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t756_showPopup(recid){
    var el=$('#rec'+recid),
        popup = el.find('.t-popup'),
        sliderWrapper = el.find('.t-slds__items-wrapper'),
        sliderWidth = el.find('.t-slds__container').width(),
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));

    popup.css('display', 'block');

    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        t_slds_SliderWidth(recid);
        sliderWrapper = el.find('.t-slds__items-wrapper');
        sliderWidth = el.find('.t-slds__container').width();
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
        sliderWrapper.css({
            transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
        });
        t_slds_UpdateSliderHeight(recid);
        t_slds_UpdateSliderArrowsHeight(recid);
        if(window.lazy=='y'){t_lazyload_update();}
    }, 50);

    $('body').addClass('t-body_popupshowed');

    el.find('.t-popup').mousedown(function(e){
        if (e.target == this) { t756_closePopup(recid); }
    });

    el.find('.t-popup__close, .t756__close-text').click(function(e){
        t756_closePopup(recid);
    });

    el.find('a[href*=#]').click(function(e){
        var url = $(this).attr('href');
        if (!url || url.substring(0,7) != '#price:') {
            t756_closePopup(recid);
            if (!url || url.substring(0,7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 27) { t756_closePopup(recid); }
    });
}

function t756_closePopup(recid){
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}
/* deprecated */
function t756_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0,7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if(ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }
}
$btnpaysubmit = false;

/* new block */
$(document).ready(function() {
    window.tildaGetPaymentForm = function (price, product, paysystem, blockid, lid, uid) {
        var $allrecords = $('#allrecords');
        var formnexturl = 'htt'+'ps://forms.tildacdn'+'.com/payment/next/';
        var virtPage = '/tilda/'+blockid+'/payment/';
        var virtTitle = 'Go to payment from '+blockid;

        if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
            Tilda.sendEventToStatistics(virtPage, virtTitle, product, price);
        }


        $.ajax ({
            type: "POST",
            url: formnexturl /*$(this).attr('action')*/,
            data: {
                projectid: $allrecords.data('tilda-project-id'),
                formskey: $allrecords.data('tilda-formskey'),
                price: price,
                product: product,
                system: paysystem,
                recid: blockid,
                lid: lid ? lid : '',
                uid: uid ? uid : ''
            },
            dataType : "json",
            success: function(json){
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';

                /* РµСЃР»Рё РЅСѓР¶РЅРѕ РїРµСЂРµСЃР»Р°С‚СЊ РґР°РЅРЅС‹Рµ РґР°Р»СЊС€Рµ, РІ РїР»Р°С‚РµР¶РЅСѓСЋ СЃРёСЃС‚РµРјСѓ */
                if (json && json.next && json.next.type > '') {
                    var res = window.tildaForm.payment($('#'+blockid), json.next);
                    successurl = '';
                    return false;
                }

            },
            fail: function(error){
                var txt;
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';

                if (error && error.responseText>'') {
                    txt = error.responseText+'. Please, try again later.';
                } else {
                    if (error && error.statusText) {
                        txt = 'Error ['+error.statusText+']. Please, try again later.';
                    }else {
                        txt = 'Unknown error. Please, try again later.';
                    }
                }
                alert(txt);
            },
            timeout: 10*1000
        });

    };

    if (typeof tcart__cleanPrice == 'undefined') {
        function tcart__cleanPrice (price) {
            if (typeof price=='undefined' || price=='' || price==0) {
                price=0;
            } else {
                price = price.replace(',','.');
                price = price.replace(/[^0-9\.]/g,'');
                price = parseFloat(price).toFixed(2);
                if(isNaN(price)) { price=0; }
                price = parseFloat(price);
                price = price*1;
                if (price<0) { price=0; }
            }
            return price;
        }
    }

    if (typeof tcart__escapeHtml == 'undefined') {
        function tcart__escapeHtml(text) {
            var map = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[<>"']/g, function(m) { return map[m]; });
        }
    }

    if ($('.js-payment-systembox').length > 0) {
        var tildaBtnPaySubmit = '0';
        $('a[href^="#order"]').off('dblclick');
        $('a[href^="#order"]').off('click');
        $('a[href^="#order"]').click(function(e){
            e.preventDefault();

            // Р·Р°С‰РёС‚Р° РѕС‚ РїРѕР°С‚РѕСЂРЅРѕР№ РѕС‚РїСЂР°РІРєРё
            if (tildaBtnPaySubmit == '1') {
                return false;
            }

            if ($('.t706').length > 0) {
                console.log('Conflict error: there are two incompatible blocks on the page: ST100 and ST105. Please go to Tilda Editor and delete one of these blocks.');
                return false;
            }

            $btnpaysubmit = $(this);
            $btnpaysubmit.addClass('t-btn_sending');
            tildaBtnPaySubmit = '1'

            var tmp = $(this).attr('href');
            var arParam, price=0, product='', lid='', uid='';
            if (tmp.substring(0,7) == '#order:') {
                // format:  #order:Product name=Cost
                tmp = tmp.split(':');
                arParam = tmp[1].split('=');
                price = tcart__cleanPrice(arParam[1]);
                product = tcart__escapeHtml(arParam[0]);
            } else {
                var pel=$(this).closest('.js-product');
                if(typeof pel!='undefined') {
                    if(product==''){
                        product=pel.find('.js-product-name').text();
                        if (typeof product=='undefined') { product='' };
                    }
                    if(price=='' || price==0){
                        price = pel.find('.js-product-price').text();
                        price = tcart__cleanPrice(price);
                    }
                    lid = pel.data('product-lid') || '';
                    uid = pel.data('product-uid') || pel.data('product-gen-uid') || '';

                    var optprice = 0;
                    var options=[];
                    pel.find('.js-product-option').each(function() {
                        var el_opt=$(this);
                        var op_option=el_opt.find('.js-product-option-name').text();
                        var op_variant=el_opt.find('option:selected').val();
                        var op_price=el_opt.find('option:selected').attr('data-product-variant-price');
                        op_price = tcart__cleanPrice(op_price);

                        if(typeof op_option!='undefined' && typeof op_variant!='undefined'){
                            var obj={};
                            if(op_option!=''){
                                op_option = tcart__escapeHtml(op_option);
                            }
                            if(op_variant!=''){
                                op_variant = tcart__escapeHtml(op_variant);
                                op_variant = op_variant.replace(/(?:\r\n|\r|\n)/g, '');
                            }
                            if(op_option.length>1 && op_option.charAt(op_option.length-1)==':'){
                                op_option=op_option.substring(0,op_option.length-1);
                            }

                            optprice = optprice + parseFloat(op_price);
                            options.push(op_option + '=' + op_variant);
                        }
                    });

                    if (options.length > 0) {
                        product = product + ': '+options.join(', ');
                        /* price = parseFloat(optprice); */
                    }
                }
            }
            var $parent = $(this).parent();
            var blockid = $(this).closest('.r').attr('id');
            var $paysystems= $('.js-dropdown-paysystem .js-payment-system');

            if (!product) {
                var tmp=$(this).closest('.r').find('.title');
                if (tmp.length > 0) {
                    product = tmp.text();
                } else {
                    product = $(this).text();
                }
            }

            if ($paysystems.length == 0) {
                alert('Error: payment system is not assigned. Add payment system in the Site Settings.');
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';
                return false;
            }
            if ($paysystems.length == 1) {
                tildaGetPaymentForm(price, product, $paysystems.data('payment-system'), blockid, lid, uid);
            } else {
                var $jspaybox = $('.js-payment-systembox');
                if ( $jspaybox.length > 0) {
                    var $linkelem = $(this);
                    var offset = $linkelem.offset();
                    $jspaybox.css('top',offset.top+'px');
                    $jspaybox.css('left',offset.left+'px');
                    $jspaybox.css('margin-top','-45px');
                    $jspaybox.css('margin-left','-25px');
                    $jspaybox.css('position','absolute');
                    $jspaybox.css('z-index','9999999');
                    $jspaybox.appendTo($('body'));
                    $(window).resize(function(){
                        if ($jspaybox.css('display')=='block' && $linkelem) {
                            offset = $linkelem.offset();
                            $jspaybox.css('top',offset.top+'px');
                            $jspaybox.css('left',offset.left+'px');
                        }
                    });
                    /*
                    $jspaybox.css('margin-top','-45px');
                    $($parent).css('position','relative');
                    $jspaybox.appendTo($parent);
                    */
                    $jspaybox.show();
                    /*
                    var parentoffset = $(this).offset();
                    var payboxoffset = $jspaybox.offset();
                    if (parentoffset.top > parseInt(payboxoffset.top) + parseInt($jspaybox.height())) {
                        var margintop = parseInt(parentoffset.top)+parseInt($(this).height())-parseInt(payboxoffset.top)-parseInt( $jspaybox.height());
                        $jspaybox.css('margin-top', margintop+'px');
                    }
                    */

                    function hideList() {
                        $btnpaysubmit.removeClass('t-btn_sending');
                        tildaBtnPaySubmit = '0';

                        $jspaybox.hide();
                        $('.r').off('click', hideList);
                        return false;
                    }
                    $('.r').click(hideList);

                    $('.js-payment-systembox a').off('dblclick');
                    $('.js-payment-systembox a').off('click');
                    $('.js-payment-systembox a').click(function(e){
                        e.preventDefault();
                        $jspaybox.hide();
                        $linkelem = false;
                        tildaGetPaymentForm(price, product, $(this).data('payment-system'), blockid, lid, uid);
                        return false;
                    });
                }
            }

            return false;
        });
    }

});