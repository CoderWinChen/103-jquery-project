function render(idName, data) {

    let body = document.getElementById(idName).innerHTML
    let reg = /{{\s*([a-zA-Z]+)\s*}}/
    let obj = null
    obj = reg.exec(body)

    body = body.replace(obj[0], data[obj[1]])
    
    while (obj = reg.exec(body)) {
        body = body.replace(obj[0], data[obj[1]])
    }

    return body

}

function template(idName, data){
    let htmlStr = render(idName,data)
    $('body').append(htmlStr)
}