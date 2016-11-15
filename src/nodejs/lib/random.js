var crypto = require('crypto');

// Returns random string of a given length only consisting of chars
exports.randomStr = (howMany, chars) => {
    chars = chars
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    }

    return value.join('');
};

// Returns a random IP
exports.randomIp = () => {
    return Math.floor((Math.random() * 255) + 1)
        + "." + Math.floor((Math.random() * 255) + 1)
        + "." + Math.floor((Math.random() * 255) + 1)
        + "." + Math.floor((Math.random() * 255) + 1);
};