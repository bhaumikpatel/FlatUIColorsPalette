var color = '', offsetHeight = 60, parts;

function hexc(colorval) {
    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        //alert('IE8');
        parts = colorval;
    } else {
        //alert('Non IE8');
        parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete (parts[0]);
    }
    //console.log(parts);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        return parts;
    }
    else {
        return '#' + parts.join('');
    }
}

function smoothScrollTo(hash, t) { // two params
    $("body,html").animate({
        scrollTop: $(hash).offset().top - offsetHeight
    }, 500, function () {
        var tmp = t.id; // hold the id
        t.id = '';      // remove it so we don't jump
        location.hash = hash;
        t.id = tmp;     // now that we didn't jump we can move it back
        if ($(".navbar-toggle").is(":visible") == true)
            $(".navbar-toggle").click();
        $('.dropdown.open').removeClass('open');
    });
}

$(document).ready(function () {
    $('.color-box:not(.number)').each(function () {
        var x = $(this).css('backgroundColor');
        $(this).html("<span>" + hexc(x) + "</span>")
    })
    if (location.hash != "") {
        window.onload = smoothScrollTo(location.hash, $("#flatuicolorsmenu"));
    }


    $('.navbar li a').click(function (event) {
        var target = $(this).attr('href');
        if (target != "#") {
            this.blur();
            smoothScrollTo(this.hash, this); // two args
            //var scrollPos = $('body > .container-fluid').find($(this).attr('href')).offset().top - offsetHeight;
            //$('body,html').animate({
            //    scrollTop: scrollPos
            //}, 500, function () {
            //    if ($(".navbar-toggle").is(":visible") == true)
            //        $(".navbar-toggle").click();
            //});
            //$('.dropdown.open').removeClass('open');
            //window.location.hash = target;
            return false;
        }
    });
});