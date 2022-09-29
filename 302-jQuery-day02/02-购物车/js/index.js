$(function () {
    $(".checkall").click(function () {
        // 全选、全不选功能
        // 1.就是把全选按钮(checkAll)的状态赋值给三个小按钮(j-checkbox)就可以了
        // 2. 上面的全选选中了，下面的全选的状态也要改变，使用并集选择器
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))

        if ($(this).prop('checked')) {
            // 全选所有商品添加类名
            $('.cart-item').addClass('check-cart-item')
        }
        else {
            $('.cart-item').removeClass('check-cart-item')
        }

    })


    // let count = 0
    // // 只统计选中的复选框个数，不统计不选中的
    // function countCheck() {
    //     // 每次点击都会检查当前的复选框个数，不能叠加，只能在每次点击都重新统计一次
    //     count = 0;
    //     $.each($('.j-checkbox'), function (i, item) {
    //         console.log($(item).prop('checked'));
    //         if ($(item).prop('checked')) {
    //             count++
    //         }
    //     })
    //     return count
    // }

    // $('.j-checkbox').change(function () {
    //     count = countCheck()
    //     console.log(count);
    //     // 如果选中的个数和复选框的个数一样，则全选
    //     if (count === $('.j-checkbox').length){
    //         $(".checkall").prop('checked',true)
    //     }
    //     else {
    //         $(".checkall").prop('checked', false)
    //     }
    // })


    $('.j-checkbox').change(function () {
        // jq使用checked选择器，可以统计当前选中的复选框个数
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $(".checkall").prop('checked', true)
        }
        else {
            $(".checkall").prop('checked', false)

        }

        if ($(this).prop('checked')) {
            // 单选当前商品添加类名
            $(this).parents('.cart-item').addClass('check-cart-item')
        }
        else {
            $(this).parents('.cart-item').removeClass('check-cart-item')
        }
    })



    let count;
    let price;
    let total;
    let num;
    sumTotal()
    // 加号
    $('.increment').click(function () {
        count = +$(this).siblings('.itxt').val();
        count++;
        $(this).siblings('.itxt').val(count)
        price = $(this).parents('.p-num').siblings('.p-price').html()
        total = result(price)

        $(this).parents('.p-num').siblings('.p-sum').html(`￥${total.toFixed(2)}`)
        sumTotal()
    })

    $('.decrement').click(function () {
        price = $(this).parents('.p-num').siblings('.p-price').html()
        count = +$(this).siblings('.itxt').val();

        if (count === 1) {
            return false
        }
        count--;
        $(this).siblings('.itxt').val(count)

        total = result(price)

        $(this).parents('.p-num').siblings('.p-sum').html(`￥${total.toFixed(2)}`)
        sumTotal()
    })

    // 小计的方法
    function result(obj) {
        // count拿到最新的
        count = $('.itxt').val()
        console.log(count);
        price = obj.substr(1)
        num = count * price
        return num;
    }

    // 计算总件数和总价
    function sumTotal() {
        let num = sum = 0;
        // for (let i = 0; i < $('.itxt').length; i++) {
        //     num += +$('.itxt')[i].value;
        //     sum += +$('.p-sum')[i].innerHTML.substr(1);
        // }
        $.each($('.itxt'), function (i, item) {
            num += +$(item).val()
            sum += +$('.p-sum')[i].innerHTML.substr(1);
        })


        $('.price-sum em').html(sum.toFixed(2));
        $('.amount-sum em').html(num)
    }

    $('.itxt').change(function () {
        // num = $(this).val()
        price = $(this).parents('.p-num').siblings('.p-price').html()
        total = result(price)
        // console.log(total);
        $(this).parents('.p-num').siblings('.p-sum').html(`￥${total.toFixed(2)}`)
        sumTotal()
    })



    // 商品右侧删除按钮
    $('.p-action a').click(function () {
        // console.log($(this).parent().siblings('.p-checkbox').children('.j-checkbox').prop('checked'));

        if ($(this).parent().siblings('.p-checkbox').children('.j-checkbox').prop('checked')) {
            // if ($('.j-checkbox:checked')) {
            $(this).parents('.cart-item').remove()
        }
        else {
            return alert('请选中该商品');
        }
        sumTotal()

    })

    // 删除选中按钮
    $('.remove-batch').click(function () {

        // $('.j-checkbox').each(function(i,item){
        //     if ($(item).prop('checked')){
        //         $(this).parents('.cart-item').remove()
        //     }
        //     sumTotal()
        // })
        $('.j-checkbox:checked').parents('.cart-item').remove()
        sumTotal()
    })

    //清空购物车按钮
    $('.clear-all').click(function () {
        $('.cart-item').remove()
        sumTotal()
    })


    // 需求：选中的添加背景色

})