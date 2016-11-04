export default function hash() {};

hash.setParam = function (key, value) {
    let query = hash.getParams();
    query[key] = value;
    hash.setParams(query);
};

hash.setParams = function (params) {
    let parts = Object.keys(params).reduce((arr, key) => {
        arr.push(key + '=' + params[key]);
        return arr;
    }, []);
    location.hash = parts.join('&');
};

hash.getParam = function (key, defaultValue) {
    let query = hash.getParams();
    if (query[key] !== undefined) {
        return query[key];
    } else {
        return defaultValue;
    }
};

hash.getParams = function () {
    var query = {};
    var a = location.hash.substr(1).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        // only add if we found a key and value
        if (b.length === 2) {
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
    }
    return query;
};

hash.updateParams = function (params) {
    hash.setParams(Object.assign(hash.getParams(), params));
};