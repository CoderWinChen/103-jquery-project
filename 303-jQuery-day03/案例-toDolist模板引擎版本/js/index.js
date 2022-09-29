document.write("<script language=javascript src='./js/myTemplate.js'></script >");
$(function () {
    function getData() {
        let data = localStorage.getItem('data')
        if (data) {
            return JSON.parse(data)
        }
        else {
            return []
        }
    }
    let data = {
        ingNum: 0,
        finishNum: 0,
        obj: {
            title: '',
            done: false
        }
    }

    $('#search').on('keyup',function(e){
        if (e.key === 'Enter'){
            data.obj.title = $('#search').val()
            if (data.search === '') {
                return
            }
            
            else {
                template('temp', data)
            }
        }
    })

 

})