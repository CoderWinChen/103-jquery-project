$(function () {

    function getListData() {
        let data = localStorage.getItem('list');
        if (data !== null) {
            return JSON.parse(data)
        }
        else {
            return []
        }
    }
    render()

    function savaData(data) {
        return localStorage.setItem('list', JSON.stringify(data))
    }

    // 对整个页面进行渲染，拿数据，遍历li
    function render() {
        let data = getListData();
        $('ol,ul').empty()
        let count = 0;
        let finish = 0;

        $.each(data, function (i, item) {
            if (item.done) { //未完成的显示
                finish++;
                $('ul').append(
                    `
            <li>
              <input type="checkbox" name="" checked='checked'>
                ${item.title}
               <a href="#" id="${i}"></ a>
            </li>
            `)

            }
            else {
                count++
                $('ol').append(
                    `
                <li>
                    <input type="checkbox" name="">
                        ${item.title}
                    <a href="#" id="${i}"></ a>
                </li>
            `)
            }

            $('#agency-num').text(count)
            $('#finish-num').text(finish)
        })
    }

    $('ol,ul').on('click', 'input', function (e) {
        let data = getListData()
        let index = $(this).siblings('a').prop("id")

        data[index].done = $(this).prop('checked'); //修改状态和复选框一样
        console.log($(this).prop('checked'));
        savaData(data)
        render()
    })
    // 删除
    $('ol,ul').on('click', 'a', function () {
        let data = getListData()
        data.splice($(this).prop("id"), 1)
        savaData(data)
        render()
    })


    $('.itxt').on('keyup', function (e) {

        // 按下回车，存数据到浏览器，页面打开拿到的是浏览器村的
        if (e.key === 'Enter') {
            let data = getListData()
            let obj = {
                title: $('.itxt').val(),
                done: false
            }
            data.push(obj)
            savaData(data)

            $(this).val("")
            render()
        }
    })
})