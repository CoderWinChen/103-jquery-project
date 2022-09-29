$(function () {

    let eleTop = $('.recommend').offset().top;
    let flag = true; //节流阀/互斥锁

    function toggleScroll() {
        if ($(document).scrollTop() >= eleTop) {
            $('.fixedtool').show()
        }
        else {
            $('.fixedtool').hide()
        }
    }
    toggleScroll() //无论是否刷新都会调用显示隐藏的方法

    $(document).scroll(function () {
        toggleScroll()
        // 右侧模块，左边li高亮
        if (flag) { //节流阀/互斥锁，点击左侧li，高亮，右侧滚动，左侧高亮，互斥了
            $('.floor .w').each(function (i, item) {
                if ($(document).scrollTop() >= $(item).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
                }
            })
        }
    })



    // 点击左侧按钮的时候
    $('.fixedtool li').click(function () {
        flag = false
        // 排他思想
        $(this).addClass('current').siblings().removeClass('current')
        // 点击谁，显示对应的模块位置
        let index = $(this).index()

        // $(document).scrollTop($('.floor').children()[index].offsetTop);

        let current = $('.floor .w').eq(index).offset().top

        // 动画执行完成后，将锁打开
        $("html,body").animate({
            scrollTop: current
        },function(){
            flag = true
        })

    })

})

