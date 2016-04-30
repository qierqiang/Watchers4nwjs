//==============================================================================
//                           XMLHttpRequest
//==============================================================================
exports.get = function (url) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}

exports.getAsync = function (url, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) callback(xhr.responseText);
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}

exports.post = function (url, data) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.send(data);
    return xhr.responseText;
}

exports.postAsync = function (url, data, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) callback(xhr.responseText);
    };
    xhr.open("POST", url, false);
    xhr.send(data);
}

//读取网页的title
exports.getHtmlTitle = (sHtml) => {
    var regex   = /<title>*.<\/title>/;
    var title   = regex.exec(sHtml);
    var sTitle  = "";
    if (title != null) {
        var sTitle = title.toString();
        sTitle = sTitle.substr(8, sTitle.indexOf("</title>") + 1);
    }
    return sTitle;
}