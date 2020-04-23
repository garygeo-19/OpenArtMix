$(function resizeIframe() {
    //from this example: http://plnkr.co/edit/9FszsTd2VAq8AdNEl6cv?p=preview
    console.log("iframe resize called");
    $('iframe').on("load reload", function (e) {
        console.log(e.type, this)
        var h = this.contentWindow.document.body.scrollHeight
        var w = this.contentWindow.document.body.scrollWidth
        $(this).css({
            height: "",
            width: ""
        })
        var h1 = this.contentWindow.document.body.scrollHeight
        var w1 = this.contentWindow.document.body.scrollWidth
        $(this).css({
            height: h,
            width: w
        }).animate({
            height: h1,
            width: w1
        }, 300, function () {
            //console.log(["animated", h, w, h1, w1])
            parent.$ && parent.$('iframe').trigger('reload');
        })
    })

})