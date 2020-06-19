function setUpSpecialNavs() {
    $(".navbar-toggle").click(function (e) {
        var t = $(this).closest("nav"),
            o = t.find("ul.site-navigation"),
            n = o.clone();
        if (o.parent().hasClass("nav-special"))
            if ((e.stopPropagation(), $(this).hasClass("selected-nav")))
                $(".blocsapp-special-menu blocsnav").removeClass("open"),
                    $(".selected-nav").removeClass("selected-nav"),
                    setTimeout(function () {
                        $(".blocsapp-special-menu").remove(), $("body").removeClass("lock-scroll"), $(".selected-nav").removeClass("selected-nav");
                    }, 300);
            else {
                $(this).addClass("selected-nav");
                var i = t.attr("class").replace("navbar", "").replace("row", ""),
                    a = o.parent().attr("class").replace("navbar-collapse", "").replace("collapse", "");
                ($(".content-tint").length = -1) && $("body").append('<div class="content-tint"></div>'),
                    n.insertBefore(".page-container").wrap('<div class="blocsapp-special-menu ' + i + '"><blocsnav class="' + a + '">'),
                    $("blocsnav").prepend('<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>'),
                    (function () {
                        var e = "fadeInRight",
                            t = 0,
                            o = 60;
                        $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav") ? ((e = "fadeIn"), (o = 100)) : $(".blocsapp-special-menu").hasClass("nav-invert") && (e = "fadeInLeft"),
                            $(".blocsapp-special-menu blocsnav li").each(function () {
                                $(this).parent().hasClass("dropdown-menu")
                                    ? $(this).addClass("animated fadeIn")
                                    : ((t += o),
                                      $(this)
                                          .attr("style", "animation-delay:" + t + "ms")
                                          .addClass("animated " + e));
                            });
                    })(),
                    setTimeout(function () {
                        $(".blocsapp-special-menu blocsnav").addClass("open"), $(".content-tint").addClass("on"), $("body").addClass("lock-scroll");
                    }, 10);
            }
    }),
        $("body")
            .on("mousedown touchstart", ".content-tint, .close-special-menu", function (e) {
                $(".content-tint").removeClass("on"),
                    $(".selected-nav").click(),
                    setTimeout(function () {
                        $(".content-tint").remove();
                    }, 10);
            })
            .on("click", ".blocsapp-special-menu a", function (e) {
                $(e.target).closest(".dropdown-toggle").length || $(".close-special-menu").mousedown();
            });
}
function extraNavFuncs() {
    $(".site-navigation a").click(function (e) {
        $(e.target).closest(".dropdown-toggle").length || $(".navbar-collapse").collapse("hide");
    }),
        $("a.dropdown-toggle").click(function (e) {
            $(this).parent().addClass("target-open-menu"),
                $(this)
                    .closest(".dropdown-menu")
                    .find(".dropdown.open")
                    .each(function (e) {
                        $(this).hasClass("target-open-menu") || $(this).removeClass("open");
                    }),
                $(".target-open-menu").removeClass("target-open-menu");
        });
}
function setFillScreenBlocHeight() {
    $(".bloc-fill-screen").each(function (e) {
        var t = $(this);
        (window.fillBodyHeight = 0),
            $(this)
                .find(".container")
                .each(function (e) {
                    (fillPadding = 2 * parseInt($(this).css("padding-top"))),
                        t.hasClass("bloc-group") ? (fillBodyHeight = fillPadding + $(this).outerHeight() + 50) : (fillBodyHeight = fillBodyHeight + fillPadding + $(this).outerHeight() + 50);
                }),
            $(this).css("height", getFillHeight() + "px");
    });
}
function getFillHeight() {
    var e = $(window).height();
    return e < fillBodyHeight && (e = fillBodyHeight + 100), e;
}
function scrollToTarget(e) {
    1 == e ? (e = 0) : 2 == e ? (e = $(document).height()) : ((e = $(e).offset().top), $(".sticky-nav").length && (e -= $(".sticky-nav .navbar-header").height())),
        $("html,body").animate({ scrollTop: e }, "slow"),
        $(".navbar-collapse").collapse("hide");
}
function animateWhenVisible() {
    hideAll(),
        inViewCheck(),
        $(window).scroll(function () {
            inViewCheck(), scrollToTopView(), stickyNavToggle();
        });
}
function setUpDropdownSubs() {
    $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (e) {
        e.preventDefault(), e.stopPropagation(), $(this).parent().siblings().removeClass("open"), $(this).parent().toggleClass("open");
        var t = $(this).parent().children(".dropdown-menu");
        t.offset().left + t.width() > $(window).width() && t.addClass("dropmenu-flow-right");
    });
}
function stickyNavToggle() {
    var e = 0,
        t = "sticky";
    if ($(".sticky-nav").hasClass("fill-bloc-top-edge")) {
        var o = $(".fill-bloc-top-edge.sticky-nav").parent().css("background-color");
        "rgba(0, 0, 0, 0)" == o && (o = "#FFFFFF"), $(".sticky-nav").css("background", o), (e = $(".sticky-nav").height()), (t = "sticky animated fadeInDown");
    }
    $(window).scrollTop() > e
        ? ($(".sticky-nav").addClass(t), "sticky" == t && $(".page-container").css("padding-top", $(".sticky-nav").height()))
        : ($(".sticky-nav").removeClass(t).removeAttr("style"), $(".page-container").removeAttr("style"));
}
function hideAll() {
    $(".animated").each(function (e) {
        $(this).closest(".hero").length || $(this).removeClass("animated").addClass("hideMe");
    });
}
function inViewCheck() {
    $($(".hideMe").get().reverse()).each(function (e) {
        var t = jQuery(this),
            o = t.offset().top + t.height(),
            n = $(window).scrollTop() + $(window).height();
        if ((t.height() > $(window).height() && (o = t.offset().top), o < n)) {
            var i = t.attr("class").replace("hideMe", "animated");
            t.css("visibility", "hidden").removeAttr("class"),
                setTimeout(function () {
                    t.attr("class", i).css("visibility", "visible");
                }, 0.01);
        }
    });
}
function scrollToTopView() {
    $(window).scrollTop() > $(window).height() / 3 ? $(".scrollToTop").hasClass("showScrollTop") || $(".scrollToTop").addClass("showScrollTop") : $(".scrollToTop").removeClass("showScrollTop");
}
function setUpVisibilityToggle() {
    $(document).on("click", "[data-toggle-visibility]", function (e) {
        e.preventDefault();
        var t = $(this).attr("data-toggle-visibility");
        if (-1 != t.indexOf(",")) {
            var o = t.split(",");
            $.each(o, function (e) {
                n($("#" + o[e]));
            });
        } else n($("#" + t));
        function n(e) {
            e.is("img") ? e.toggle() : e.slideToggle();
        }
    });
}
function setUpLightBox() {
    window.targetLightbox,
        $(document)
            .on("click", "[data-lightbox]", function (e) {
                e.preventDefault(), (targetLightbox = $(this));
                var t = targetLightbox.attr("data-lightbox"),
                    o = targetLightbox.attr("data-autoplay"),
                    n = '<p class="lightbox-caption">' + targetLightbox.attr("data-caption") + "</p>",
                    i = "no-gallery-set",
                    a = targetLightbox.attr("data-frame");
                targetLightbox.attr("data-gallery-id") && (i = targetLightbox.attr("data-gallery-id")), targetLightbox.attr("data-caption") || (n = "");
                var r = "";
                1 == o && (r = "autoplay");
                var s = $(
                    '<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content ' +
                        a +
                        ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="' +
                        t +
                        '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' +
                        r +
                        ' class="embed-responsive-item"><source id="lightbox-video" src="' +
                        t +
                        '" type="video/mp4"></video></div>' +
                        n +
                        "</div></div></div></div>"
                );
                $("body").append(s),
                    "fullscreen-lb" == a &&
                        ($("#lightbox-modal")
                            .addClass("fullscreen-modal")
                            .append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'),
                        $("#blocs-lightbox-close-btn").remove()),
                    ".mp4" == t.substring(t.length - 4) ? ($("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show()) : ($("#lightbox-image,.lightbox-caption").show(), $("#lightbox-video-container").hide()),
                    $("#lightbox-modal").modal("show"),
                    "no-gallery-set" == i
                        ? (0 == $("a[data-lightbox]").index(targetLightbox) && $(".prev-lightbox").hide(), $("a[data-lightbox]").index(targetLightbox) == $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide())
                        : (0 == $('a[data-gallery-id="' + i + '"]').index(targetLightbox) && $(".prev-lightbox").hide(),
                          $('a[data-gallery-id="' + i + '"]').index(targetLightbox) == $('a[data-gallery-id="' + i + '"]').length - 1 && $(".next-lightbox").hide()),
                    addLightBoxSwipeSupport();
            })
            .on("hidden.bs.modal", "#lightbox-modal", function () {
                $("#lightbox-modal").remove();
            }),
        $(document).on("click", ".next-lightbox, .prev-lightbox", function (e) {
            e.preventDefault();
            var t = "no-gallery-set",
                o = $("a[data-lightbox]").index(targetLightbox),
                n = $("a[data-lightbox]").eq(o + 1);
            targetLightbox.attr("data-gallery-id") && ((t = targetLightbox.attr("data-gallery-id")), (o = $('a[data-gallery-id="' + t + '"]').index(targetLightbox)), (n = $('a[data-gallery-id="' + t + '"]').eq(o + 1))),
                $(this).hasClass("prev-lightbox") && ((n = $('a[data-gallery-id="' + t + '"]').eq(o - 1)), "no-gallery-set" == t && (n = $("a[data-lightbox]").eq(o - 1)));
            var i = n.attr("data-lightbox");
            if (".mp4" == i.substring(i.length - 4)) {
                var a = "";
                1 == n.attr("data-autoplay") && (a = "autoplay"),
                    $("#lightbox-image, .lightbox-caption").hide(),
                    $("#lightbox-video-container")
                        .show()
                        .html("<video controls " + a + ' class="embed-responsive-item"><source id="lightbox-video" src="' + i + '" type="video/mp4"></video>');
            } else $("#lightbox-image").attr("src", i).show(), $(".lightbox-caption").html(n.attr("data-caption")).show(), $("#lightbox-video-container").hide();
            (targetLightbox = n),
                $(".next-lightbox, .prev-lightbox").hide(),
                "no-gallery-set" == t
                    ? ($("a[data-lightbox]").index(n) != $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(), $("a[data-lightbox]").index(n) > 0 && $(".prev-lightbox").show())
                    : ($('a[data-gallery-id="' + t + '"]').index(n) != $('a[data-gallery-id="' + t + '"]').length - 1 && $(".next-lightbox").show(), $('a[data-gallery-id="' + t + '"]').index(n) > 0 && $(".prev-lightbox").show());
        });
}
function addSwipeSupport() {
    $(".carousel-inner").length &&
        $(".carousel-inner").swipe({
            swipeLeft: function (e, t, o, n, i) {
                $(this).parent().carousel("next");
            },
            swipeRight: function () {
                $(this).parent().carousel("prev");
            },
            threshold: 0,
        });
}
function addKeyBoardSupport() {
    $(window).keydown(function (e) {
        37 == e.which ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click() : 39 == e.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
    });
}
function addLightBoxSwipeSupport() {
    $("#lightbox-image").length &&
        $("#lightbox-image").swipe({
            swipeLeft: function (e, t, o, n, i) {
                $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
            },
            swipeRight: function () {
                $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click();
            },
            threshold: 0,
        });
}
$(function () {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: !0,
        submitSuccess: function (e, t) {
            if (!e.attr("action")) {
                t.preventDefault();
                var o = (function (e) {
                        var t = "./includes/" + e.attr("id") + ".php";
                        e.attr("template-path") && (t = e.attr("template-path") + "/includes/" + e.attr("id") + ".php");
                        return t;
                    })(e),
                    n = {};
                e.find("input, textarea, option:selected").each(function (e) {
                    var t = $(this).val(),
                        o = $(this).attr("id");
                    $(this).is(":checkbox") ? (t = $(this).is(":checked")) : $(this).is(":radio") ? (t = $(this).val() + " = " + $(this).is(":checked")) : $(this).is("option:selected") && (o = $(this).parent().attr("id")), (n[o] = t);
                }),
                    $.ajax({
                        url: o,
                        type: "POST",
                        data: n,
                        cache: !1,
                        success: function () {
                            e.is("[success-msg]")
                                ? e.append(
                                      "<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                                          e.attr("success-msg") +
                                          "</strong></div></div>"
                                  )
                                : window.location.replace(e.attr("success-url")),
                                e.trigger("reset");
                        },
                        error: function () {
                            0 == $("#form-alert").length &&
                                e.append(
                                    "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" + e.attr("fail-msg") + "</strong></div></div>"
                                );
                        },
                    });
            }
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });
}),
    (function (e, t) {
        "object" == typeof exports ? (module.exports = t()) : "function" == typeof define && define.amd ? define(["jquery", "googlemaps!"], t) : (e.GMaps = t());
    })(this, function () {
        var t,
            o,
            n = function (e, t) {
                var o;
                if (e === t) return e;
                for (o in t) void 0 !== t[o] && (e[o] = t[o]);
                return e;
            },
            i = function (e, t) {
                var o,
                    n = Array.prototype.slice.call(arguments, 2),
                    i = [],
                    a = e.length;
                if (Array.prototype.map && e.map === Array.prototype.map)
                    i = Array.prototype.map.call(e, function (e) {
                        var o = n.slice(0);
                        return o.splice(0, 0, e), t.apply(this, o);
                    });
                else for (o = 0; o < a; o++) (callback_params = n), callback_params.splice(0, 0, e[o]), i.push(t.apply(this, callback_params));
                return i;
            },
            a = function (e) {
                var t,
                    o = [];
                for (t = 0; t < e.length; t++) o = o.concat(e[t]);
                return o;
            },
            r = function (e, t) {
                var o = e[0],
                    n = e[1];
                return t && ((o = e[1]), (n = e[0])), new google.maps.LatLng(o, n);
            },
            s = function (e, t) {
                var o;
                for (o = 0; o < e.length; o++) e[o] instanceof google.maps.LatLng || (e[o].length > 0 && "object" == typeof e[o][0] ? (e[o] = s(e[o], t)) : (e[o] = r(e[o], t)));
                return e;
            },
            l = function (e, t) {
                e = e.replace("#", "");
                return "jQuery" in window && t ? $("#" + e, t)[0] : document.getElementById(e);
            },
            p = (function (e) {
                "use strict";
                var t = document,
                    o = function (e) {
                        if ("object" != typeof window.google || !window.google.maps)
                            return (
                                "object" == typeof window.console && window.console.error && console.error("Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."),
                                function () {}
                            );
                        if (!this) return new o(e);
                        (e.zoom = e.zoom || 15), (e.mapType = e.mapType || "roadmap");
                        var i,
                            a = function (e, t) {
                                return void 0 === e ? t : e;
                            },
                            r = this,
                            s = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"],
                            p = ["mousemove", "mouseout", "mouseover"],
                            c = ["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"],
                            g = e.el || e.div,
                            h = e.markerClusterer,
                            d = google.maps.MapTypeId[e.mapType.toUpperCase()],
                            u = new google.maps.LatLng(e.lat, e.lng),
                            f = a(e.zoomControl, !0),
                            m = e.zoomControlOpt || { style: "DEFAULT", position: "TOP_LEFT" },
                            v = m.style || "DEFAULT",
                            y = m.position || "TOP_LEFT",
                            w = a(e.panControl, !0),
                            b = a(e.mapTypeControl, !0),
                            k = a(e.scaleControl, !0),
                            x = a(e.streetViewControl, !0),
                            L = a(L, !0),
                            T = {},
                            C = { zoom: this.zoom, center: u, mapTypeId: d },
                            M = {
                                panControl: w,
                                zoomControl: f,
                                zoomControlOptions: { style: google.maps.ZoomControlStyle[v], position: google.maps.ControlPosition[y] },
                                mapTypeControl: b,
                                scaleControl: k,
                                streetViewControl: x,
                                overviewMapControl: L,
                            };
                        if (
                            ("string" == typeof e.el || "string" == typeof e.div
                                ? g.indexOf("#") > -1
                                    ? (this.el = l(g, e.context))
                                    : (this.el = function (e, t) {
                                          var o = e.replace(".", "");
                                          return "jQuery" in this && t ? $("." + o, t)[0] : document.getElementsByClassName(o)[0];
                                      }.apply(this, [g, e.context]))
                                : (this.el = g),
                            void 0 === this.el || null === this.el)
                        )
                            throw "No element defined.";
                        for (
                            window.context_menu = window.context_menu || {},
                                window.context_menu[r.el.id] = {},
                                this.controls = [],
                                this.overlays = [],
                                this.layers = [],
                                this.singleLayers = {},
                                this.markers = [],
                                this.polylines = [],
                                this.routes = [],
                                this.polygons = [],
                                this.infoWindow = null,
                                this.overlay_el = null,
                                this.zoom = e.zoom,
                                this.registered_events = {},
                                this.el.style.width = e.width || this.el.scrollWidth || this.el.offsetWidth,
                                this.el.style.height = e.height || this.el.scrollHeight || this.el.offsetHeight,
                                google.maps.visualRefresh = e.enableNewStyle,
                                i = 0;
                            i < c.length;
                            i++
                        )
                            delete e[c[i]];
                        for (1 != e.disableDefaultUI && (C = n(C, M)), T = n(C, e), i = 0; i < s.length; i++) delete T[s[i]];
                        for (i = 0; i < p.length; i++) delete T[p[i]];
                        (this.map = new google.maps.Map(this.el, T)), h && (this.markerClusterer = h.apply(this, [this.map]));
                        var O = function (e, t) {
                            var o = "",
                                n = window.context_menu[r.el.id][e];
                            for (var i in n)
                                if (n.hasOwnProperty(i)) {
                                    var a = n[i];
                                    o += '<li><a id="' + e + "_" + i + '" href="#">' + a.title + "</a></li>";
                                }
                            if (l("gmaps_context_menu")) {
                                var s = l("gmaps_context_menu");
                                s.innerHTML = o;
                                var p = s.getElementsByTagName("a"),
                                    c = p.length;
                                for (i = 0; i < c; i++) {
                                    var g = p[i];
                                    google.maps.event.clearListeners(g, "click"),
                                        google.maps.event.addDomListenerOnce(
                                            g,
                                            "click",
                                            function (o) {
                                                o.preventDefault(), n[this.id.replace(e + "_", "")].action.apply(r, [t]), r.hideContextMenu();
                                            },
                                            !1
                                        );
                                }
                                var h = function (e) {
                                        var t = 0,
                                            o = 0;
                                        if (e.getBoundingClientRect) {
                                            var n = e.getBoundingClientRect(),
                                                i = -(window.scrollX ? window.scrollX : window.pageXOffset),
                                                a = -(window.scrollY ? window.scrollY : window.pageYOffset);
                                            return [n.left - i, n.top - a];
                                        }
                                        if (e.offsetParent)
                                            do {
                                                (t += e.offsetLeft), (o += e.offsetTop);
                                            } while ((e = e.offsetParent));
                                        return [t, o];
                                    }.apply(this, [r.el]),
                                    d = h[0] + t.pixel.x - 15,
                                    u = h[1] + t.pixel.y - 15;
                                (s.style.left = d + "px"), (s.style.top = u + "px");
                            }
                        };
                        (this.buildContextMenu = function (e, t) {
                            if ("marker" === e) {
                                t.pixel = {};
                                var o = new google.maps.OverlayView();
                                o.setMap(r.map),
                                    (o.draw = function () {
                                        var n = o.getProjection(),
                                            i = t.marker.getPosition();
                                        (t.pixel = n.fromLatLngToContainerPixel(i)), O(e, t);
                                    });
                            } else O(e, t);
                            var n = l("gmaps_context_menu");
                            setTimeout(function () {
                                n.style.display = "block";
                            }, 0);
                        }),
                            (this.setContextMenu = function (e) {
                                window.context_menu[r.el.id][e.control] = {};
                                var o,
                                    n = t.createElement("ul");
                                for (o in e.options)
                                    if (e.options.hasOwnProperty(o)) {
                                        var i = e.options[o];
                                        window.context_menu[r.el.id][e.control][i.name] = { title: i.title, action: i.action };
                                    }
                                (n.id = "gmaps_context_menu"),
                                    (n.style.display = "none"),
                                    (n.style.position = "absolute"),
                                    (n.style.minWidth = "100px"),
                                    (n.style.background = "white"),
                                    (n.style.listStyle = "none"),
                                    (n.style.padding = "8px"),
                                    (n.style.boxShadow = "2px 2px 6px #ccc"),
                                    l("gmaps_context_menu") || t.body.appendChild(n);
                                var a = l("gmaps_context_menu");
                                google.maps.event.addDomListener(
                                    a,
                                    "mouseout",
                                    function (e) {
                                        (e.relatedTarget && this.contains(e.relatedTarget)) ||
                                            window.setTimeout(function () {
                                                a.style.display = "none";
                                            }, 400);
                                    },
                                    !1
                                );
                            }),
                            (this.hideContextMenu = function () {
                                var e = l("gmaps_context_menu");
                                e && (e.style.display = "none");
                            });
                        var _ = function (t, o) {
                            google.maps.event.addListener(t, o, function (t) {
                                null == t && (t = this), e[o].apply(this, [t]), r.hideContextMenu();
                            });
                        };
                        google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
                        for (var S = 0; S < s.length; S++) {
                            (P = s[S]) in e && _(this.map, P);
                        }
                        for (S = 0; S < p.length; S++) {
                            var P;
                            (P = p[S]) in e && _(this.map, P);
                        }
                        google.maps.event.addListener(this.map, "rightclick", function (t) {
                            e.rightclick && e.rightclick.apply(this, [t]), null != window.context_menu[r.el.id].map && r.buildContextMenu("map", t);
                        }),
                            (this.refresh = function () {
                                google.maps.event.trigger(this.map, "resize");
                            }),
                            (this.fitZoom = function () {
                                var e,
                                    t = [],
                                    o = this.markers.length;
                                for (e = 0; e < o; e++) "boolean" == typeof this.markers[e].visible && this.markers[e].visible && t.push(this.markers[e].getPosition());
                                this.fitLatLngBounds(t);
                            }),
                            (this.fitLatLngBounds = function (e) {
                                var t,
                                    o = e.length,
                                    n = new google.maps.LatLngBounds();
                                for (t = 0; t < o; t++) n.extend(e[t]);
                                this.map.fitBounds(n);
                            }),
                            (this.setCenter = function (e, t, o) {
                                this.map.panTo(new google.maps.LatLng(e, t)), o && o();
                            }),
                            (this.getElement = function () {
                                return this.el;
                            }),
                            (this.zoomIn = function (e) {
                                (e = e || 1), (this.zoom = this.map.getZoom() + e), this.map.setZoom(this.zoom);
                            }),
                            (this.zoomOut = function (e) {
                                (e = e || 1), (this.zoom = this.map.getZoom() - e), this.map.setZoom(this.zoom);
                            });
                        var E,
                            z = [];
                        for (E in this.map) "function" != typeof this.map[E] || this[E] || z.push(E);
                        for (i = 0; i < z.length; i++)
                            !(function (e, t, o) {
                                e[o] = function () {
                                    return t[o].apply(t, arguments);
                                };
                            })(this, this.map, z[i]);
                    };
                return o;
            })();
        return (
            (p.prototype.createControl = function (e) {
                var t = document.createElement("div");
                for (var o in ((t.style.cursor = "pointer"),
                !0 !== e.disableDefaultStyles && ((t.style.fontFamily = "Roboto, Arial, sans-serif"), (t.style.fontSize = "11px"), (t.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px")),
                e.style))
                    t.style[o] = e.style[o];
                for (var n in (e.id && (t.id = e.id),
                e.title && (t.title = e.title),
                e.classes && (t.className = e.classes),
                e.content && ("string" == typeof e.content ? (t.innerHTML = e.content) : e.content instanceof HTMLElement && t.appendChild(e.content)),
                e.position && (t.position = google.maps.ControlPosition[e.position.toUpperCase()]),
                e.events))
                    !(function (t, o) {
                        google.maps.event.addDomListener(t, o, function () {
                            e.events[o].apply(this, [this]);
                        });
                    })(t, n);
                return (t.index = 1), t;
            }),
            (p.prototype.addControl = function (e) {
                var t = this.createControl(e);
                return this.controls.push(t), this.map.controls[t.position].push(t), t;
            }),
            (p.prototype.removeControl = function (e) {
                var t,
                    o = null;
                for (t = 0; t < this.controls.length; t++) this.controls[t] == e && ((o = this.controls[t].position), this.controls.splice(t, 1));
                if (o)
                    for (t = 0; t < this.map.controls.length; t++) {
                        var n = this.map.controls[e.position];
                        if (n.getAt(t) == e) {
                            n.removeAt(t);
                            break;
                        }
                    }
                return e;
            }),
            (p.prototype.createMarker = function (e) {
                if (null == e.lat && null == e.lng && null == e.position) throw "No latitude or longitude defined.";
                var t = this,
                    o = e.details,
                    i = e.fences,
                    a = e.outside,
                    r = { position: new google.maps.LatLng(e.lat, e.lng), map: null },
                    s = n(r, e);
                delete s.lat, delete s.lng, delete s.fences, delete s.outside;
                var l = new google.maps.Marker(s);
                if (((l.fences = i), e.infoWindow)) {
                    l.infoWindow = new google.maps.InfoWindow(e.infoWindow);
                    for (var p = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], c = 0; c < p.length; c++)
                        !(function (t, o) {
                            e.infoWindow[o] &&
                                google.maps.event.addListener(t, o, function (t) {
                                    e.infoWindow[o].apply(this, [t]);
                                });
                        })(l.infoWindow, p[c]);
                }
                var g = [
                        "animation_changed",
                        "clickable_changed",
                        "cursor_changed",
                        "draggable_changed",
                        "flat_changed",
                        "icon_changed",
                        "position_changed",
                        "shadow_changed",
                        "shape_changed",
                        "title_changed",
                        "visible_changed",
                        "zindex_changed",
                    ],
                    h = ["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"];
                for (c = 0; c < g.length; c++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function () {
                                e[o].apply(this, [this]);
                            });
                    })(l, g[c]);
                for (c = 0; c < h.length; c++)
                    !(function (t, o, n) {
                        e[n] &&
                            google.maps.event.addListener(o, n, function (o) {
                                o.pixel || (o.pixel = t.getProjection().fromLatLngToPoint(o.latLng)), e[n].apply(this, [o]);
                            });
                    })(this.map, l, h[c]);
                return (
                    google.maps.event.addListener(l, "click", function () {
                        (this.details = o), e.click && e.click.apply(this, [this]), l.infoWindow && (t.hideInfoWindows(), l.infoWindow.open(t.map, l));
                    }),
                    google.maps.event.addListener(l, "rightclick", function (o) {
                        (o.marker = this), e.rightclick && e.rightclick.apply(this, [o]), null != window.context_menu[t.el.id].marker && t.buildContextMenu("marker", o);
                    }),
                    l.fences &&
                        google.maps.event.addListener(l, "dragend", function () {
                            t.checkMarkerGeofence(l, function (e, t) {
                                a(e, t);
                            });
                        }),
                    l
                );
            }),
            (p.prototype.addMarker = function (e) {
                var t;
                if (e.hasOwnProperty("gm_accessors_")) t = e;
                else {
                    if (!((e.hasOwnProperty("lat") && e.hasOwnProperty("lng")) || e.position)) throw "No latitude or longitude defined.";
                    t = this.createMarker(e);
                }
                return t.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(t), this.markers.push(t), p.fire("marker_added", t, this), t;
            }),
            (p.prototype.addMarkers = function (e) {
                for (var t, o = 0; (t = e[o]); o++) this.addMarker(t);
                return this.markers;
            }),
            (p.prototype.hideInfoWindows = function () {
                for (var e, t = 0; (e = this.markers[t]); t++) e.infoWindow && e.infoWindow.close();
            }),
            (p.prototype.removeMarker = function (e) {
                for (var t = 0; t < this.markers.length; t++)
                    if (this.markers[t] === e) {
                        this.markers[t].setMap(null), this.markers.splice(t, 1), this.markerClusterer && this.markerClusterer.removeMarker(e), p.fire("marker_removed", e, this);
                        break;
                    }
                return e;
            }),
            (p.prototype.removeMarkers = function (e) {
                var t = [];
                if (void 0 === e) {
                    for (var o = 0; o < this.markers.length; o++) {
                        (i = this.markers[o]).setMap(null), p.fire("marker_removed", i, this);
                    }
                    this.markerClusterer && this.markerClusterer.clearMarkers && this.markerClusterer.clearMarkers(), (this.markers = t);
                } else {
                    for (o = 0; o < e.length; o++) {
                        var n = this.markers.indexOf(e[o]);
                        if (n > -1) (i = this.markers[n]).setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(i), p.fire("marker_removed", i, this);
                    }
                    for (o = 0; o < this.markers.length; o++) {
                        var i;
                        null != (i = this.markers[o]).getMap() && t.push(i);
                    }
                    this.markers = t;
                }
            }),
            (p.prototype.drawOverlay = function (e) {
                var t = new google.maps.OverlayView(),
                    o = !0;
                return (
                    t.setMap(this.map),
                    null != e.auto_show && (o = e.auto_show),
                    (t.onAdd = function () {
                        var o = document.createElement("div");
                        (o.style.borderStyle = "none"), (o.style.borderWidth = "0px"), (o.style.position = "absolute"), (o.style.zIndex = 100), (o.innerHTML = e.content), (t.el = o), e.layer || (e.layer = "overlayLayer");
                        var n,
                            i,
                            a = this.getPanes(),
                            r = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
                        a[e.layer].appendChild(o);
                        for (var s = 0; s < r.length; s++)
                            (n = o),
                                (i = r[s]),
                                google.maps.event.addDomListener(n, i, function (e) {
                                    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? ((e.cancelBubble = !0), (e.returnValue = !1)) : e.stopPropagation();
                                });
                        e.click &&
                            (a.overlayMouseTarget.appendChild(t.el),
                            google.maps.event.addDomListener(t.el, "click", function () {
                                e.click.apply(t, [t]);
                            })),
                            google.maps.event.trigger(this, "ready");
                    }),
                    (t.draw = function () {
                        var n = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(e.lat, e.lng));
                        (e.horizontalOffset = e.horizontalOffset || 0), (e.verticalOffset = e.verticalOffset || 0);
                        var i = t.el,
                            a = i.children[0],
                            r = a.clientHeight,
                            s = a.clientWidth;
                        switch (e.verticalAlign) {
                            case "top":
                                i.style.top = n.y - r + e.verticalOffset + "px";
                                break;
                            default:
                            case "middle":
                                i.style.top = n.y - r / 2 + e.verticalOffset + "px";
                                break;
                            case "bottom":
                                i.style.top = n.y + e.verticalOffset + "px";
                        }
                        switch (e.horizontalAlign) {
                            case "left":
                                i.style.left = n.x - s + e.horizontalOffset + "px";
                                break;
                            default:
                            case "center":
                                i.style.left = n.x - s / 2 + e.horizontalOffset + "px";
                                break;
                            case "right":
                                i.style.left = n.x + e.horizontalOffset + "px";
                        }
                        (i.style.display = o ? "block" : "none"), o || e.show.apply(this, [i]);
                    }),
                    (t.onRemove = function () {
                        var o = t.el;
                        e.remove ? e.remove.apply(this, [o]) : (t.el.parentNode.removeChild(t.el), (t.el = null));
                    }),
                    this.overlays.push(t),
                    t
                );
            }),
            (p.prototype.removeOverlay = function (e) {
                for (var t = 0; t < this.overlays.length; t++)
                    if (this.overlays[t] === e) {
                        this.overlays[t].setMap(null), this.overlays.splice(t, 1);
                        break;
                    }
            }),
            (p.prototype.removeOverlays = function () {
                for (var e, t = 0; (e = this.overlays[t]); t++) e.setMap(null);
                this.overlays = [];
            }),
            (p.prototype.drawPolyline = function (e) {
                var t = [],
                    o = e.path;
                if (o.length)
                    if (void 0 === o[0][0]) t = o;
                    else for (var n, i = 0; (n = o[i]); i++) t.push(new google.maps.LatLng(n[0], n[1]));
                var a = { map: this.map, path: t, strokeColor: e.strokeColor, strokeOpacity: e.strokeOpacity, strokeWeight: e.strokeWeight, geodesic: e.geodesic, clickable: !0, editable: !1, visible: !0 };
                e.hasOwnProperty("clickable") && (a.clickable = e.clickable), e.hasOwnProperty("editable") && (a.editable = e.editable), e.hasOwnProperty("icons") && (a.icons = e.icons), e.hasOwnProperty("zIndex") && (a.zIndex = e.zIndex);
                for (var r = new google.maps.Polyline(a), s = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < s.length; l++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function (t) {
                                e[o].apply(this, [t]);
                            });
                    })(r, s[l]);
                return this.polylines.push(r), p.fire("polyline_added", r, this), r;
            }),
            (p.prototype.removePolyline = function (e) {
                for (var t = 0; t < this.polylines.length; t++)
                    if (this.polylines[t] === e) {
                        this.polylines[t].setMap(null), this.polylines.splice(t, 1), p.fire("polyline_removed", e, this);
                        break;
                    }
            }),
            (p.prototype.removePolylines = function () {
                for (var e, t = 0; (e = this.polylines[t]); t++) e.setMap(null);
                this.polylines = [];
            }),
            (p.prototype.drawCircle = function (e) {
                delete (e = n({ map: this.map, center: new google.maps.LatLng(e.lat, e.lng) }, e)).lat, delete e.lng;
                for (var t = new google.maps.Circle(e), o = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], i = 0; i < o.length; i++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function (t) {
                                e[o].apply(this, [t]);
                            });
                    })(t, o[i]);
                return this.polygons.push(t), t;
            }),
            (p.prototype.drawRectangle = function (e) {
                e = n({ map: this.map }, e);
                var t = new google.maps.LatLngBounds(new google.maps.LatLng(e.bounds[0][0], e.bounds[0][1]), new google.maps.LatLng(e.bounds[1][0], e.bounds[1][1]));
                e.bounds = t;
                for (var o = new google.maps.Rectangle(e), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], a = 0; a < i.length; a++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function (t) {
                                e[o].apply(this, [t]);
                            });
                    })(o, i[a]);
                return this.polygons.push(o), o;
            }),
            (p.prototype.drawPolygon = function (e) {
                var t = !1;
                e.hasOwnProperty("useGeoJSON") && (t = e.useGeoJSON),
                    delete e.useGeoJSON,
                    (e = n({ map: this.map }, e)),
                    0 == t && (e.paths = [e.paths.slice(0)]),
                    e.paths.length > 0 && e.paths[0].length > 0 && (e.paths = a(i(e.paths, s, t)));
                for (var o = new google.maps.Polygon(e), r = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < r.length; l++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function (t) {
                                e[o].apply(this, [t]);
                            });
                    })(o, r[l]);
                return this.polygons.push(o), p.fire("polygon_added", o, this), o;
            }),
            (p.prototype.removePolygon = function (e) {
                for (var t = 0; t < this.polygons.length; t++)
                    if (this.polygons[t] === e) {
                        this.polygons[t].setMap(null), this.polygons.splice(t, 1), p.fire("polygon_removed", e, this);
                        break;
                    }
            }),
            (p.prototype.removePolygons = function () {
                for (var e, t = 0; (e = this.polygons[t]); t++) e.setMap(null);
                this.polygons = [];
            }),
            (p.prototype.getFromFusionTables = function (e) {
                var t = e.events;
                delete e.events;
                var o = e,
                    n = new google.maps.FusionTablesLayer(o);
                for (var i in t)
                    !(function (e, o) {
                        google.maps.event.addListener(e, o, function (e) {
                            t[o].apply(this, [e]);
                        });
                    })(n, i);
                return this.layers.push(n), n;
            }),
            (p.prototype.loadFromFusionTables = function (e) {
                var t = this.getFromFusionTables(e);
                return t.setMap(this.map), t;
            }),
            (p.prototype.getFromKML = function (e) {
                var t = e.url,
                    o = e.events;
                delete e.url, delete e.events;
                var n = e,
                    i = new google.maps.KmlLayer(t, n);
                for (var a in o)
                    !(function (e, t) {
                        google.maps.event.addListener(e, t, function (e) {
                            o[t].apply(this, [e]);
                        });
                    })(i, a);
                return this.layers.push(i), i;
            }),
            (p.prototype.loadFromKML = function (e) {
                var t = this.getFromKML(e);
                return t.setMap(this.map), t;
            }),
            (p.prototype.addLayer = function (e, t) {
                var o;
                switch (((t = t || {}), e)) {
                    case "weather":
                        this.singleLayers.weather = o = new google.maps.weather.WeatherLayer();
                        break;
                    case "clouds":
                        this.singleLayers.clouds = o = new google.maps.weather.CloudLayer();
                        break;
                    case "traffic":
                        this.singleLayers.traffic = o = new google.maps.TrafficLayer();
                        break;
                    case "transit":
                        this.singleLayers.transit = o = new google.maps.TransitLayer();
                        break;
                    case "bicycling":
                        this.singleLayers.bicycling = o = new google.maps.BicyclingLayer();
                        break;
                    case "panoramio":
                        (this.singleLayers.panoramio = o = new google.maps.panoramio.PanoramioLayer()),
                            o.setTag(t.filter),
                            delete t.filter,
                            t.click &&
                                google.maps.event.addListener(o, "click", function (e) {
                                    t.click(e), delete t.click;
                                });
                        break;
                    case "places":
                        if (((this.singleLayers.places = o = new google.maps.places.PlacesService(this.map)), t.search || t.nearbySearch || t.radarSearch)) {
                            var n = { bounds: t.bounds || null, keyword: t.keyword || null, location: t.location || null, name: t.name || null, radius: t.radius || null, rankBy: t.rankBy || null, types: t.types || null };
                            t.radarSearch && o.radarSearch(n, t.radarSearch), t.search && o.search(n, t.search), t.nearbySearch && o.nearbySearch(n, t.nearbySearch);
                        }
                        if (t.textSearch) {
                            var i = { bounds: t.bounds || null, location: t.location || null, query: t.query || null, radius: t.radius || null };
                            o.textSearch(i, t.textSearch);
                        }
                }
                if (void 0 !== o) return "function" == typeof o.setOptions && o.setOptions(t), "function" == typeof o.setMap && o.setMap(this.map), o;
            }),
            (p.prototype.removeLayer = function (e) {
                if ("string" == typeof e && void 0 !== this.singleLayers[e]) this.singleLayers[e].setMap(null), delete this.singleLayers[e];
                else
                    for (var t = 0; t < this.layers.length; t++)
                        if (this.layers[t] === e) {
                            this.layers[t].setMap(null), this.layers.splice(t, 1);
                            break;
                        }
            }),
            (p.prototype.getRoutes = function (e) {
                switch (e.travelMode) {
                    case "bicycling":
                        t = google.maps.TravelMode.BICYCLING;
                        break;
                    case "transit":
                        t = google.maps.TravelMode.TRANSIT;
                        break;
                    case "driving":
                        t = google.maps.TravelMode.DRIVING;
                        break;
                    default:
                        t = google.maps.TravelMode.WALKING;
                }
                o = "imperial" === e.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
                var i = n({ avoidHighways: !1, avoidTolls: !1, optimizeWaypoints: !1, waypoints: [] }, e);
                (i.origin = /string/.test(typeof e.origin) ? e.origin : new google.maps.LatLng(e.origin[0], e.origin[1])),
                    (i.destination = /string/.test(typeof e.destination) ? e.destination : new google.maps.LatLng(e.destination[0], e.destination[1])),
                    (i.travelMode = t),
                    (i.unitSystem = o),
                    delete i.callback,
                    delete i.error;
                var a = [];
                new google.maps.DirectionsService().route(i, function (t, o) {
                    if (o === google.maps.DirectionsStatus.OK) {
                        for (var n in t.routes) t.routes.hasOwnProperty(n) && a.push(t.routes[n]);
                        e.callback && e.callback(a, t, o);
                    } else e.error && e.error(t, o);
                });
            }),
            (p.prototype.removeRoutes = function () {
                this.routes.length = 0;
            }),
            (p.prototype.getElevations = function (e) {
                (e = n({ locations: [], path: !1, samples: 256 }, e)).locations.length > 0 && e.locations[0].length > 0 && (e.locations = a(i([e.locations], s, !1)));
                var t = e.callback;
                delete e.callback;
                var o = new google.maps.ElevationService();
                if (e.path) {
                    var r = { path: e.locations, samples: e.samples };
                    o.getElevationAlongPath(r, function (e, o) {
                        t && "function" == typeof t && t(e, o);
                    });
                } else
                    delete e.path,
                        delete e.samples,
                        o.getElevationForLocations(e, function (e, o) {
                            t && "function" == typeof t && t(e, o);
                        });
            }),
            (p.prototype.cleanRoute = p.prototype.removePolylines),
            (p.prototype.renderRoute = function (e, t) {
                var o,
                    i = "string" == typeof t.panel ? document.getElementById(t.panel.replace("#", "")) : t.panel;
                (t.panel = i),
                    (t = n({ map: this.map }, t)),
                    (o = new google.maps.DirectionsRenderer(t)),
                    this.getRoutes({
                        origin: e.origin,
                        destination: e.destination,
                        travelMode: e.travelMode,
                        waypoints: e.waypoints,
                        unitSystem: e.unitSystem,
                        error: e.error,
                        avoidHighways: e.avoidHighways,
                        avoidTolls: e.avoidTolls,
                        optimizeWaypoints: e.optimizeWaypoints,
                        callback: function (e, t, n) {
                            n === google.maps.DirectionsStatus.OK && o.setDirections(t);
                        },
                    });
            }),
            (p.prototype.drawRoute = function (e) {
                var t = this;
                this.getRoutes({
                    origin: e.origin,
                    destination: e.destination,
                    travelMode: e.travelMode,
                    waypoints: e.waypoints,
                    unitSystem: e.unitSystem,
                    error: e.error,
                    avoidHighways: e.avoidHighways,
                    avoidTolls: e.avoidTolls,
                    optimizeWaypoints: e.optimizeWaypoints,
                    callback: function (o) {
                        if (o.length > 0) {
                            var n = { path: o[o.length - 1].overview_path, strokeColor: e.strokeColor, strokeOpacity: e.strokeOpacity, strokeWeight: e.strokeWeight };
                            e.hasOwnProperty("icons") && (n.icons = e.icons), t.drawPolyline(n), e.callback && e.callback(o[o.length - 1]);
                        }
                    },
                });
            }),
            (p.prototype.travelRoute = function (e) {
                if (e.origin && e.destination)
                    this.getRoutes({
                        origin: e.origin,
                        destination: e.destination,
                        travelMode: e.travelMode,
                        waypoints: e.waypoints,
                        unitSystem: e.unitSystem,
                        error: e.error,
                        callback: function (t) {
                            if ((t.length > 0 && e.start && e.start(t[t.length - 1]), t.length > 0 && e.step)) {
                                var o = t[t.length - 1];
                                if (o.legs.length > 0) for (var n, i = o.legs[0].steps, a = 0; (n = i[a]); a++) (n.step_number = a), e.step(n, o.legs[0].steps.length - 1);
                            }
                            t.length > 0 && e.end && e.end(t[t.length - 1]);
                        },
                    });
                else if (e.route && e.route.legs.length > 0) for (var t, o = e.route.legs[0].steps, n = 0; (t = o[n]); n++) (t.step_number = n), e.step(t);
            }),
            (p.prototype.drawSteppedRoute = function (e) {
                var t = this;
                if (e.origin && e.destination)
                    this.getRoutes({
                        origin: e.origin,
                        destination: e.destination,
                        travelMode: e.travelMode,
                        waypoints: e.waypoints,
                        error: e.error,
                        callback: function (o) {
                            if ((o.length > 0 && e.start && e.start(o[o.length - 1]), o.length > 0 && e.step)) {
                                var n = o[o.length - 1];
                                if (n.legs.length > 0)
                                    for (var i, a = n.legs[0].steps, r = 0; (i = a[r]); r++) {
                                        i.step_number = r;
                                        var s = { path: i.path, strokeColor: e.strokeColor, strokeOpacity: e.strokeOpacity, strokeWeight: e.strokeWeight };
                                        e.hasOwnProperty("icons") && (s.icons = e.icons), t.drawPolyline(s), e.step(i, n.legs[0].steps.length - 1);
                                    }
                            }
                            o.length > 0 && e.end && e.end(o[o.length - 1]);
                        },
                    });
                else if (e.route && e.route.legs.length > 0)
                    for (var o, n = e.route.legs[0].steps, i = 0; (o = n[i]); i++) {
                        o.step_number = i;
                        var a = { path: o.path, strokeColor: e.strokeColor, strokeOpacity: e.strokeOpacity, strokeWeight: e.strokeWeight };
                        e.hasOwnProperty("icons") && (a.icons = e.icons), t.drawPolyline(a), e.step(o);
                    }
            }),
            (p.Route = function (e) {
                (this.origin = e.origin),
                    (this.destination = e.destination),
                    (this.waypoints = e.waypoints),
                    (this.map = e.map),
                    (this.route = e.route),
                    (this.step_count = 0),
                    (this.steps = this.route.legs[0].steps),
                    (this.steps_length = this.steps.length);
                var t = { path: new google.maps.MVCArray(), strokeColor: e.strokeColor, strokeOpacity: e.strokeOpacity, strokeWeight: e.strokeWeight };
                e.hasOwnProperty("icons") && (t.icons = e.icons), (this.polyline = this.map.drawPolyline(t).getPath());
            }),
            (p.Route.prototype.getRoute = function (t) {
                var o = this;
                this.map.getRoutes({
                    origin: this.origin,
                    destination: this.destination,
                    travelMode: t.travelMode,
                    waypoints: this.waypoints || [],
                    error: t.error,
                    callback: function () {
                        (o.route = e[0]), t.callback && t.callback.call(o);
                    },
                });
            }),
            (p.Route.prototype.back = function () {
                if (this.step_count > 0) {
                    this.step_count--;
                    var e = this.route.legs[0].steps[this.step_count].path;
                    for (var t in e) e.hasOwnProperty(t) && this.polyline.pop();
                }
            }),
            (p.Route.prototype.forward = function () {
                if (this.step_count < this.steps_length) {
                    var e = this.route.legs[0].steps[this.step_count].path;
                    for (var t in e) e.hasOwnProperty(t) && this.polyline.push(e[t]);
                    this.step_count++;
                }
            }),
            (p.prototype.checkGeofence = function (e, t, o) {
                return o.containsLatLng(new google.maps.LatLng(e, t));
            }),
            (p.prototype.checkMarkerGeofence = function (e, t) {
                if (e.fences)
                    for (var o, n = 0; (o = e.fences[n]); n++) {
                        var i = e.getPosition();
                        this.checkGeofence(i.lat(), i.lng(), o) || t(e, o);
                    }
            }),
            (p.prototype.toImage = function (e) {
                e = e || {};
                var t = {};
                if (((t.size = e.size || [this.el.clientWidth, this.el.clientHeight]), (t.lat = this.getCenter().lat()), (t.lng = this.getCenter().lng()), this.markers.length > 0)) {
                    t.markers = [];
                    for (var o = 0; o < this.markers.length; o++) t.markers.push({ lat: this.markers[o].getPosition().lat(), lng: this.markers[o].getPosition().lng() });
                }
                if (this.polylines.length > 0) {
                    var n = this.polylines[0];
                    (t.polyline = {}),
                        (t.polyline.path = google.maps.geometry.encoding.encodePath(n.getPath())),
                        (t.polyline.strokeColor = n.strokeColor),
                        (t.polyline.strokeOpacity = n.strokeOpacity),
                        (t.polyline.strokeWeight = n.strokeWeight);
                }
                return p.staticMapURL(t);
            }),
            (p.staticMapURL = function (e) {
                var t,
                    o = [],
                    n = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
                e.url && ((n = e.url), delete e.url), (n += "?");
                var i = e.markers;
                delete e.markers, !i && e.marker && ((i = [e.marker]), delete e.marker);
                var a = e.styles;
                delete e.styles;
                var r = e.polyline;
                if ((delete e.polyline, e.center)) o.push("center=" + e.center), delete e.center;
                else if (e.address) o.push("center=" + e.address), delete e.address;
                else if (e.lat) o.push(["center=", e.lat, ",", e.lng].join("")), delete e.lat, delete e.lng;
                else if (e.visible) {
                    var s = encodeURI(e.visible.join("|"));
                    o.push("visible=" + s);
                }
                var l = e.size;
                l ? (l.join && (l = l.join("x")), delete e.size) : (l = "630x300"), o.push("size=" + l), e.zoom || !1 === e.zoom || (e.zoom = 15);
                var p = !e.hasOwnProperty("sensor") || !!e.sensor;
                for (var c in (delete e.sensor, o.push("sensor=" + p), e)) e.hasOwnProperty(c) && o.push(c + "=" + e[c]);
                if (i)
                    for (var g, h, d = 0; (t = i[d]); d++) {
                        for (var c in ((g = []),
                        t.size && "normal" !== t.size ? (g.push("size:" + t.size), delete t.size) : t.icon && (g.push("icon:" + encodeURI(t.icon)), delete t.icon),
                        t.color && (g.push("color:" + t.color.replace("#", "0x")), delete t.color),
                        t.label && (g.push("label:" + t.label[0].toUpperCase()), delete t.label),
                        (h = t.address ? t.address : t.lat + "," + t.lng),
                        delete t.address,
                        delete t.lat,
                        delete t.lng,
                        t))
                            t.hasOwnProperty(c) && g.push(c + ":" + t[c]);
                        g.length || 0 === d ? (g.push(h), (g = g.join("|")), o.push("markers=" + encodeURI(g))) : ((g = o.pop() + encodeURI("|" + h)), o.push(g));
                    }
                if (a)
                    for (d = 0; d < a.length; d++) {
                        var u = [];
                        a[d].featureType && u.push("feature:" + a[d].featureType.toLowerCase()), a[d].elementType && u.push("element:" + a[d].elementType.toLowerCase());
                        for (var f = 0; f < a[d].stylers.length; f++)
                            for (var m in a[d].stylers[f]) {
                                var v = a[d].stylers[f][m];
                                ("hue" != m && "color" != m) || (v = "0x" + v.substring(1)), u.push(m + ":" + v);
                            }
                        var y = u.join("|");
                        "" != y && o.push("style=" + y);
                    }
                function w(e, t) {
                    if ("#" === e[0] && ((e = e.replace("#", "0x")), t)) {
                        if (((t = parseFloat(t)), 0 === (t = Math.min(1, Math.max(t, 0))))) return "0x00000000";
                        1 === (t = (255 * t).toString(16)).length && (t += t), (e = e.slice(0, 8) + t);
                    }
                    return e;
                }
                if (r) {
                    if (((t = r), (r = []), t.strokeWeight && r.push("weight:" + parseInt(t.strokeWeight, 10)), t.strokeColor)) {
                        var b = w(t.strokeColor, t.strokeOpacity);
                        r.push("color:" + b);
                    }
                    if (t.fillColor) {
                        var k = w(t.fillColor, t.fillOpacity);
                        r.push("fillcolor:" + k);
                    }
                    var x = t.path;
                    if (x.join) {
                        var L;
                        for (f = 0; (L = x[f]); f++) r.push(L.join(","));
                    } else r.push("enc:" + x);
                    (r = r.join("|")), o.push("path=" + encodeURI(r));
                }
                var T = window.devicePixelRatio || 1;
                return o.push("scale=" + T), n + (o = o.join("&"));
            }),
            (p.prototype.addMapType = function (e, t) {
                if (!t.hasOwnProperty("getTileUrl") || "function" != typeof t.getTileUrl) throw "'getTileUrl' function required.";
                t.tileSize = t.tileSize || new google.maps.Size(256, 256);
                var o = new google.maps.ImageMapType(t);
                this.map.mapTypes.set(e, o);
            }),
            (p.prototype.addOverlayMapType = function (e) {
                if (!e.hasOwnProperty("getTile") || "function" != typeof e.getTile) throw "'getTile' function required.";
                var t = e.index;
                delete e.index, this.map.overlayMapTypes.insertAt(t, e);
            }),
            (p.prototype.removeOverlayMapType = function (e) {
                this.map.overlayMapTypes.removeAt(e);
            }),
            (p.prototype.addStyle = function (e) {
                var t = new google.maps.StyledMapType(e.styles, { name: e.styledMapName });
                this.map.mapTypes.set(e.mapTypeId, t);
            }),
            (p.prototype.setStyle = function (e) {
                this.map.setMapTypeId(e);
            }),
            (p.prototype.createPanorama = function (e) {
                return (
                    (e.hasOwnProperty("lat") && e.hasOwnProperty("lng")) || ((e.lat = this.getCenter().lat()), (e.lng = this.getCenter().lng())), (this.panorama = p.createPanorama(e)), this.map.setStreetView(this.panorama), this.panorama
                );
            }),
            (p.createPanorama = function (e) {
                var t = l(e.el, e.context);
                (e.position = new google.maps.LatLng(e.lat, e.lng)), delete e.el, delete e.context, delete e.lat, delete e.lng;
                for (var o = ["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], i = n({ visible: !0 }, e), a = 0; a < o.length; a++) delete i[o[a]];
                var r = new google.maps.StreetViewPanorama(t, i);
                for (a = 0; a < o.length; a++)
                    !(function (t, o) {
                        e[o] &&
                            google.maps.event.addListener(t, o, function () {
                                e[o].apply(this);
                            });
                    })(r, o[a]);
                return r;
            }),
            (p.prototype.on = function (e, t) {
                return p.on(e, this, t);
            }),
            (p.prototype.off = function (e) {
                p.off(e, this);
            }),
            (p.prototype.once = function (e, t) {
                return p.once(e, this, t);
            }),
            (p.custom_events = ["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"]),
            (p.on = function (e, t, o) {
                if (-1 == p.custom_events.indexOf(e)) return t instanceof p && (t = t.map), google.maps.event.addListener(t, e, o);
                var n = { handler: o, eventName: e };
                return (t.registered_events[e] = t.registered_events[e] || []), t.registered_events[e].push(n), n;
            }),
            (p.off = function (e, t) {
                -1 == p.custom_events.indexOf(e) ? (t instanceof p && (t = t.map), google.maps.event.clearListeners(t, e)) : (t.registered_events[e] = []);
            }),
            (p.once = function (e, t, o) {
                if (-1 == p.custom_events.indexOf(e)) return t instanceof p && (t = t.map), google.maps.event.addListenerOnce(t, e, o);
            }),
            (p.fire = function (e, t, o) {
                if (-1 == p.custom_events.indexOf(e)) google.maps.event.trigger(t, e, Array.prototype.slice.apply(arguments).slice(2));
                else if (e in o.registered_events)
                    for (var n = o.registered_events[e], i = 0; i < n.length; i++)
                        !(function (e, t, o) {
                            e.apply(t, [o]);
                        })(n[i].handler, o, t);
            }),
            (p.geolocate = function (e) {
                var t = e.always || e.complete;
                navigator.geolocation
                    ? navigator.geolocation.getCurrentPosition(
                          function (o) {
                              e.success(o), t && t();
                          },
                          function (o) {
                              e.error(o), t && t();
                          },
                          e.options
                      )
                    : (e.not_supported(), t && t());
            }),
            (p.geocode = function (e) {
                this.geocoder = new google.maps.Geocoder();
                var t = e.callback;
                e.hasOwnProperty("lat") && e.hasOwnProperty("lng") && (e.latLng = new google.maps.LatLng(e.lat, e.lng)),
                    delete e.lat,
                    delete e.lng,
                    delete e.callback,
                    this.geocoder.geocode(e, function (e, o) {
                        t(e, o);
                    });
            }),
            "object" == typeof window.google &&
                window.google.maps &&
                (google.maps.Polygon.prototype.getBounds ||
                    (google.maps.Polygon.prototype.getBounds = function (e) {
                        for (var t, o = new google.maps.LatLngBounds(), n = this.getPaths(), i = 0; i < n.getLength(); i++) {
                            t = n.getAt(i);
                            for (var a = 0; a < t.getLength(); a++) o.extend(t.getAt(a));
                        }
                        return o;
                    }),
                google.maps.Polygon.prototype.containsLatLng ||
                    (google.maps.Polygon.prototype.containsLatLng = function (e) {
                        var t = this.getBounds();
                        if (null !== t && !t.contains(e)) return !1;
                        for (var o = !1, n = this.getPaths().getLength(), i = 0; i < n; i++)
                            for (var a = this.getPaths().getAt(i), r = a.getLength(), s = r - 1, l = 0; l < r; l++) {
                                var p = a.getAt(l),
                                    c = a.getAt(s);
                                ((p.lng() < e.lng() && c.lng() >= e.lng()) || (c.lng() < e.lng() && p.lng() >= e.lng())) && p.lat() + ((e.lng() - p.lng()) / (c.lng() - p.lng())) * (c.lat() - p.lat()) < e.lat() && (o = !o), (s = l);
                            }
                        return o;
                    }),
                google.maps.Circle.prototype.containsLatLng ||
                    (google.maps.Circle.prototype.containsLatLng = function (e) {
                        return !google.maps.geometry || google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), e) <= this.getRadius();
                    }),
                (google.maps.Rectangle.prototype.containsLatLng = function (e) {
                    return this.getBounds().contains(e);
                }),
                (google.maps.LatLngBounds.prototype.containsLatLng = function (e) {
                    return this.contains(e);
                }),
                (google.maps.Marker.prototype.setFences = function (e) {
                    this.fences = e;
                }),
                (google.maps.Marker.prototype.addFence = function (e) {
                    this.fences.push(e);
                }),
                (google.maps.Marker.prototype.getId = function () {
                    return this.__gm_id;
                })),
            Array.prototype.indexOf ||
                (Array.prototype.indexOf = function (e) {
                    "use strict";
                    if (null == this) throw new TypeError();
                    var t = Object(this),
                        o = t.length >>> 0;
                    if (0 === o) return -1;
                    var n = 0;
                    if ((arguments.length > 1 && ((n = Number(arguments[1])) != n ? (n = 0) : 0 != n && n != 1 / 0 && n != -1 / 0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= o)) return -1;
                    for (var i = n >= 0 ? n : Math.max(o - Math.abs(n), 0); i < o; i++) if (i in t && t[i] === e) return i;
                    return -1;
                }),
            p
        );
    }),
    (function (e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e("undefined" != typeof module && module.exports ? require("jquery") : jQuery);
    })(function (e) {
        "use strict";
        function t(t, M) {
            function O(t) {
                if (!(!0 === xe.data(C + "_intouch") || e(t.target).closest(M.excludedElements, xe).length > 0)) {
                    var r = t.originalEvent ? t.originalEvent : t;
                    if (!r.pointerType || "mouse" != r.pointerType || 0 != M.fallbackToMouseEvents) {
                        var s,
                            l = r.touches,
                            p = l ? l[0] : r;
                        return (
                            (Le = w),
                            l ? (Te = l.length) : !1 !== M.preventDefaultEvents && t.preventDefault(),
                            (he = 0),
                            (de = null),
                            (ue = null),
                            (be = null),
                            (fe = 0),
                            (me = 0),
                            (ve = 0),
                            (ye = 1),
                            (we = 0),
                            ((c = {})[o] = te(o)),
                            (c[n] = te(n)),
                            (c[i] = te(i)),
                            (c[a] = te(a)),
                            (ke = c),
                            Q(),
                            Z(0, p),
                            !l || Te === M.fingers || M.fingers === v || U() ? ((Ce = ae()), 2 == Te && (Z(1, l[1]), (me = ve = ne($e[0].start, $e[1].start))), (M.swipeStatus || M.pinchStatus) && (s = I(r, Le))) : (s = !1),
                            !1 === s
                                ? (I(r, (Le = x)), s)
                                : (M.hold &&
                                      (Ee = setTimeout(
                                          e.proxy(function () {
                                              xe.trigger("hold", [r.target]), M.hold && (s = M.hold.call(xe, r, r.target));
                                          }, this),
                                          M.longTapThreshold
                                      )),
                                  X(!0),
                                  null)
                        );
                    }
                }
                var c;
            }
            function _(t) {
                var c,
                    g,
                    h,
                    d,
                    u = t.originalEvent ? t.originalEvent : t;
                if (Le !== k && Le !== x && !Y()) {
                    var y,
                        w = u.touches,
                        L = J(w ? w[0] : u);
                    if (
                        ((Me = ae()),
                        w && (Te = w.length),
                        M.hold && clearTimeout(Ee),
                        (Le = b),
                        2 == Te &&
                            (0 == me ? (Z(1, w[1]), (me = ve = ne($e[0].start, $e[1].start))) : (J(w[1]), (ve = ne($e[0].end, $e[1].end)), $e[0].end, $e[1].end, (be = ye < 1 ? s : r)),
                            (ye = ((ve / me) * 1).toFixed(2)),
                            (we = Math.abs(me - ve))),
                        Te === M.fingers || M.fingers === v || !w || U())
                    ) {
                        if (
                            ((de = ie(L.start, L.end)),
                            (function (e, t) {
                                if (!1 !== M.preventDefaultEvents)
                                    if (M.allowPageScroll === l) e.preventDefault();
                                    else {
                                        var r = M.allowPageScroll === p;
                                        switch (t) {
                                            case o:
                                                ((M.swipeLeft && r) || (!r && M.allowPageScroll != f)) && e.preventDefault();
                                                break;
                                            case n:
                                                ((M.swipeRight && r) || (!r && M.allowPageScroll != f)) && e.preventDefault();
                                                break;
                                            case i:
                                                ((M.swipeUp && r) || (!r && M.allowPageScroll != m)) && e.preventDefault();
                                                break;
                                            case a:
                                                ((M.swipeDown && r) || (!r && M.allowPageScroll != m)) && e.preventDefault();
                                        }
                                    }
                            })(t, (ue = ie(L.last, L.end))),
                            (h = L.start),
                            (d = L.end),
                            (he = Math.round(Math.sqrt(Math.pow(d.x - h.x, 2) + Math.pow(d.y - h.y, 2)))),
                            (fe = oe()),
                            (function (e, t) {
                                e != l && ((t = Math.max(t, ee(e))), (ke[e].distance = t));
                            })(de, he),
                            (y = I(u, Le)),
                            !M.triggerOnTouchEnd || M.triggerOnTouchLeave)
                        ) {
                            var T = !0;
                            if (M.triggerOnTouchLeave) {
                                var $ = { left: (g = (c = e((c = this))).offset()).left, right: g.left + c.outerWidth(), top: g.top, bottom: g.top + c.outerHeight() };
                                T = (function (e, t) {
                                    return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom;
                                })(L.end, $);
                            }
                            !M.triggerOnTouchEnd && T ? (Le = R(b)) : M.triggerOnTouchLeave && !T && (Le = R(k)), (Le != x && Le != k) || I(u, Le);
                        }
                    } else I(u, (Le = x));
                    !1 === y && I(u, (Le = x));
                }
            }
            function S(e) {
                var t = e.originalEvent ? e.originalEvent : e,
                    o = t.touches;
                if (o) {
                    if (o.length && !Y())
                        return (
                            (function (e) {
                                (Oe = ae()), (_e = e.touches.length + 1);
                            })(t),
                            !0
                        );
                    if (o.length && Y()) return !0;
                }
                return (
                    Y() && (Te = _e),
                    (Me = ae()),
                    (fe = oe()),
                    W() || !A()
                        ? I(t, (Le = x))
                        : M.triggerOnTouchEnd || (!1 === M.triggerOnTouchEnd && Le === b)
                        ? (!1 !== M.preventDefaultEvents && !1 !== e.cancelable && e.preventDefault(), I(t, (Le = k)))
                        : !M.triggerOnTouchEnd && q()
                        ? D(t, (Le = k), h)
                        : Le === b && I(t, (Le = x)),
                    X(!1),
                    null
                );
            }
            function P() {
                (Te = 0), (Me = 0), (Ce = 0), (me = 0), (ve = 0), (ye = 1), Q(), X(!1);
            }
            function E(e) {
                var t = e.originalEvent ? e.originalEvent : e;
                M.triggerOnTouchLeave && I(t, (Le = R(k)));
            }
            function z() {
                xe.unbind(se, O), xe.unbind(ge, P), xe.unbind(le, _), xe.unbind(pe, S), ce && xe.unbind(ce, E), X(!1);
            }
            function R(e) {
                var t = e,
                    o = B(),
                    n = A(),
                    i = W();
                return !o || i ? (t = x) : !n || e != b || (M.triggerOnTouchEnd && !M.triggerOnTouchLeave) ? !n && e == k && M.triggerOnTouchLeave && (t = x) : (t = k), t;
            }
            function I(e, t) {
                var o,
                    n = e.touches;
                return (
                    (!(!F() || !N()) || N()) && (o = D(e, t, c)),
                    (!(!j() || !U()) || U()) && !1 !== o && (o = D(e, t, g)),
                    K() && G() && !1 !== o ? (o = D(e, t, d)) : fe > M.longTapThreshold && he < y && M.longTap && !1 !== o ? (o = D(e, t, u)) : !((1 !== Te && L) || !(isNaN(he) || he < M.threshold) || !q()) && !1 !== o && (o = D(e, t, h)),
                    t === x && P(),
                    t === k && ((n && n.length) || P()),
                    o
                );
            }
            function D(t, l, p) {
                var f;
                if (p == c) {
                    if ((xe.trigger("swipeStatus", [l, de || null, he || 0, fe || 0, Te, $e, ue]), M.swipeStatus && !1 === (f = M.swipeStatus.call(xe, t, l, de || null, he || 0, fe || 0, Te, $e, ue)))) return !1;
                    if (l == k && F()) {
                        if ((clearTimeout(Pe), clearTimeout(Ee), xe.trigger("swipe", [de, he, fe, Te, $e, ue]), M.swipe && !1 === (f = M.swipe.call(xe, t, de, he, fe, Te, $e, ue)))) return !1;
                        switch (de) {
                            case o:
                                xe.trigger("swipeLeft", [de, he, fe, Te, $e, ue]), M.swipeLeft && (f = M.swipeLeft.call(xe, t, de, he, fe, Te, $e, ue));
                                break;
                            case n:
                                xe.trigger("swipeRight", [de, he, fe, Te, $e, ue]), M.swipeRight && (f = M.swipeRight.call(xe, t, de, he, fe, Te, $e, ue));
                                break;
                            case i:
                                xe.trigger("swipeUp", [de, he, fe, Te, $e, ue]), M.swipeUp && (f = M.swipeUp.call(xe, t, de, he, fe, Te, $e, ue));
                                break;
                            case a:
                                xe.trigger("swipeDown", [de, he, fe, Te, $e, ue]), M.swipeDown && (f = M.swipeDown.call(xe, t, de, he, fe, Te, $e, ue));
                        }
                    }
                }
                if (p == g) {
                    if ((xe.trigger("pinchStatus", [l, be || null, we || 0, fe || 0, Te, ye, $e]), M.pinchStatus && !1 === (f = M.pinchStatus.call(xe, t, l, be || null, we || 0, fe || 0, Te, ye, $e)))) return !1;
                    if (l == k && j())
                        switch (be) {
                            case r:
                                xe.trigger("pinchIn", [be || null, we || 0, fe || 0, Te, ye, $e]), M.pinchIn && (f = M.pinchIn.call(xe, t, be || null, we || 0, fe || 0, Te, ye, $e));
                                break;
                            case s:
                                xe.trigger("pinchOut", [be || null, we || 0, fe || 0, Te, ye, $e]), M.pinchOut && (f = M.pinchOut.call(xe, t, be || null, we || 0, fe || 0, Te, ye, $e));
                        }
                }
                return (
                    p == h
                        ? (l !== x && l !== k) ||
                          (clearTimeout(Pe),
                          clearTimeout(Ee),
                          G() && !K()
                              ? ((Se = ae()),
                                (Pe = setTimeout(
                                    e.proxy(function () {
                                        (Se = null), xe.trigger("tap", [t.target]), M.tap && (f = M.tap.call(xe, t, t.target));
                                    }, this),
                                    M.doubleTapThreshold
                                )))
                              : ((Se = null), xe.trigger("tap", [t.target]), M.tap && (f = M.tap.call(xe, t, t.target))))
                        : p == d
                        ? (l !== x && l !== k) || (clearTimeout(Pe), clearTimeout(Ee), (Se = null), xe.trigger("doubletap", [t.target]), M.doubleTap && (f = M.doubleTap.call(xe, t, t.target)))
                        : p == u && ((l !== x && l !== k) || (clearTimeout(Pe), (Se = null), xe.trigger("longtap", [t.target]), M.longTap && (f = M.longTap.call(xe, t, t.target)))),
                    f
                );
            }
            function A() {
                var e = !0;
                return null !== M.threshold && (e = he >= M.threshold), e;
            }
            function W() {
                var e = !1;
                return null !== M.cancelThreshold && null !== de && (e = ee(de) - he >= M.cancelThreshold), e;
            }
            function B() {
                return !(M.maxTimeThreshold && fe >= M.maxTimeThreshold);
            }
            function j() {
                var e = H(),
                    t = V(),
                    o = null === M.pinchThreshold || we >= M.pinchThreshold;
                return e && t && o;
            }
            function U() {
                return !!(M.pinchStatus || M.pinchIn || M.pinchOut);
            }
            function F() {
                var e = B(),
                    t = A(),
                    o = H(),
                    n = V();
                return !W() && n && o && t && e;
            }
            function N() {
                return !!(M.swipe || M.swipeStatus || M.swipeLeft || M.swipeRight || M.swipeUp || M.swipeDown);
            }
            function H() {
                return Te === M.fingers || M.fingers === v || !L;
            }
            function V() {
                return 0 !== $e[0].end.x;
            }
            function q() {
                return !!M.tap;
            }
            function G() {
                return !!M.doubleTap;
            }
            function K() {
                if (null == Se) return !1;
                var e = ae();
                return G() && e - Se <= M.doubleTapThreshold;
            }
            function Q() {
                (Oe = 0), (_e = 0);
            }
            function Y() {
                var e = !1;
                Oe && ae() - Oe <= M.fingerReleaseThreshold && (e = !0);
                return e;
            }
            function X(e) {
                xe && (!0 === e ? (xe.bind(le, _), xe.bind(pe, S), ce && xe.bind(ce, E)) : (xe.unbind(le, _, !1), xe.unbind(pe, S, !1), ce && xe.unbind(ce, E, !1)), xe.data(C + "_intouch", !0 === e));
            }
            function Z(e, t) {
                var o = { start: { x: 0, y: 0 }, last: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
                return (o.start.x = o.last.x = o.end.x = t.pageX || t.clientX), (o.start.y = o.last.y = o.end.y = t.pageY || t.clientY), ($e[e] = o), o;
            }
            function J(e) {
                var t = void 0 !== e.identifier ? e.identifier : 0,
                    o = (function (e) {
                        return $e[e] || null;
                    })(t);
                return null === o && (o = Z(t, e)), (o.last.x = o.end.x), (o.last.y = o.end.y), (o.end.x = e.pageX || e.clientX), (o.end.y = e.pageY || e.clientY), o;
            }
            function ee(e) {
                if (ke[e]) return ke[e].distance;
            }
            function te(e) {
                return { direction: e, distance: 0 };
            }
            function oe() {
                return Me - Ce;
            }
            function ne(e, t) {
                var o = Math.abs(e.x - t.x),
                    n = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(o * o + n * n));
            }
            function ie(e, t) {
                if (((s = t), (r = e).x == s.x && r.y == s.y)) return l;
                var r,
                    s,
                    p = (function (e, t) {
                        var o = e.x - t.x,
                            n = t.y - e.y,
                            i = Math.atan2(n, o),
                            a = Math.round((180 * i) / Math.PI);
                        return a < 0 && (a = 360 - Math.abs(a)), a;
                    })(e, t);
                return p <= 45 && p >= 0 ? o : p <= 360 && p >= 315 ? o : p >= 135 && p <= 225 ? n : p > 45 && p < 135 ? a : i;
            }
            function ae() {
                return new Date().getTime();
            }
            M = e.extend({}, M);
            var re = L || $ || !M.fallbackToMouseEvents,
                se = re ? ($ ? (T ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
                le = re ? ($ ? (T ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
                pe = re ? ($ ? (T ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
                ce = re ? ($ ? "mouseleave" : null) : "mouseleave",
                ge = $ ? (T ? "MSPointerCancel" : "pointercancel") : "touchcancel",
                he = 0,
                de = null,
                ue = null,
                fe = 0,
                me = 0,
                ve = 0,
                ye = 1,
                we = 0,
                be = 0,
                ke = null,
                xe = e(t),
                Le = "start",
                Te = 0,
                $e = {},
                Ce = 0,
                Me = 0,
                Oe = 0,
                _e = 0,
                Se = 0,
                Pe = null,
                Ee = null;
            try {
                xe.bind(se, O), xe.bind(ge, P);
            } catch (t) {
                e.error("events not supported " + se + "," + ge + " on jQuery.swipe");
            }
            (this.enable = function () {
                return this.disable(), xe.bind(se, O), xe.bind(ge, P), xe;
            }),
                (this.disable = function () {
                    return z(), xe;
                }),
                (this.destroy = function () {
                    z(), xe.data(C, null), (xe = null);
                }),
                (this.option = function (t, o) {
                    if ("object" == typeof t) M = e.extend(M, t);
                    else if (void 0 !== M[t]) {
                        if (void 0 === o) return M[t];
                        M[t] = o;
                    } else {
                        if (!t) return M;
                        e.error("Option " + t + " does not exist on jQuery.swipe.options");
                    }
                    return null;
                });
        }
        var o = "left",
            n = "right",
            i = "up",
            a = "down",
            r = "in",
            s = "out",
            l = "none",
            p = "auto",
            c = "swipe",
            g = "pinch",
            h = "tap",
            d = "doubletap",
            u = "longtap",
            f = "horizontal",
            m = "vertical",
            v = "all",
            y = 10,
            w = "start",
            b = "move",
            k = "end",
            x = "cancel",
            L = "ontouchstart" in window,
            T = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !L,
            $ = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !L,
            C = "TouchSwipe";
        (e.fn.swipe = function (o) {
            var n = e(this),
                i = n.data(C);
            if (i && "string" == typeof o) {
                if (i[o]) return i[o].apply(i, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + o + " does not exist on jQuery.swipe");
            } else if (i && "object" == typeof o) i.option.apply(i, arguments);
            else if (!(i || ("object" != typeof o && o)))
                return function (o) {
                    return (
                        !o || void 0 !== o.allowPageScroll || (void 0 === o.swipe && void 0 === o.swipeStatus) || (o.allowPageScroll = l),
                        void 0 !== o.click && void 0 === o.tap && (o.tap = o.click),
                        o || (o = {}),
                        (o = e.extend({}, e.fn.swipe.defaults, o)),
                        this.each(function () {
                            var n = e(this),
                                i = n.data(C);
                            i || ((i = new t(this, o)), n.data(C, i));
                        })
                    );
                }.apply(this, arguments);
            return n;
        }),
            (e.fn.swipe.version = "1.6.18"),
            (e.fn.swipe.defaults = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: ".noSwipe",
                preventDefaultEvents: !0,
            }),
            (e.fn.swipe.phases = { PHASE_START: w, PHASE_MOVE: b, PHASE_END: k, PHASE_CANCEL: x }),
            (e.fn.swipe.directions = { LEFT: o, RIGHT: n, UP: i, DOWN: a, IN: r, OUT: s }),
            (e.fn.swipe.pageScroll = { NONE: l, HORIZONTAL: f, VERTICAL: m, AUTO: p }),
            (e.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: v });
    }),
    $(document).ready(function () {
        $("#scroll-hero").click(function (e) {
            e.preventDefault(), $("html,body").animate({ scrollTop: $("#scroll-hero").closest(".bloc").height() }, "slow");
        }),
            extraNavFuncs(),
            setUpSpecialNavs(),
            setUpDropdownSubs(),
            setUpLightBox(),
            setUpVisibilityToggle(),
            addSwipeSupport(),
            addKeyBoardSupport(),
            -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $("#page-loading-blocs-notifaction").remove();
    }),
    $(window)
        .load(function () {
            setFillScreenBlocHeight(), animateWhenVisible(), $("#page-loading-blocs-notifaction").remove();
        })
        .resize(function () {
            setFillScreenBlocHeight();
        }),
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
