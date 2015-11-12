
export function getCookie() {
  var str = document.cookie;
  var arr = [];
  var result = {};
  if (str) {
    arr = str.split(';');
    arr.forEach(function(item) {
      if (item.charAt(0) === ' ') {
        item = item.substring(1, item.length);
        debugger;
      }
      if (item.length > 0 && item.indexOf('=') != '') {
        var pair = item.split('=');
        result[pair[0]] = pair[1];
      }
    });
    return result;
  } else {
    return '';
  }
}
