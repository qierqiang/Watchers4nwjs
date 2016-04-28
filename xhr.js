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