var wrap = $("#wrap");
var $career = $(".career li");
var $img_area = $(".img_area");
var $img_area_li = $(".img_area li");
var idx;
var toggle = {
    careerEvent: function () {
        $career.on({
            mouseenter: function (e) {
                e.preventDefault();
                var $this = $(this);
                idx = $this.index();
                fe_toggle(idx);
            },
            click: function (e) {
                e.preventDefault();
                var $this = $(this);
                idx = $this.index();
                fe_toggle(idx);
            },
        });
    },
};
function fe_toggle(i) {
    $img_area.find(".myPic").hide();
    $img_area_li.eq(i).show().siblings().hide();
    switch (i) {
        case 0:
            wrap.removeClass().addClass("blue");
            break;
        case 1:
            wrap.removeClass().addClass("yellow");
            break;
        case 2:
            wrap.removeClass().addClass("green");
            break;
        case 3:
            wrap.removeClass().addClass("purple");
            break;
        case 4:
            wrap.removeClass().addClass("white");
            break;
        case 5:
            wrap.removeClass().addClass("skyblue");
            break;
        default:
            wrap.removeClass();
            break;
    }
}

$(document).ready(function () {
    $(".grid").masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: ".grid-item",
        // use element for option
        columnWidth: ".grid-sizer",
        percentPosition: true,
    });
    toggle.careerEvent();
});
