var $h = {
  
  q: function(num) {
    var el = document.getElementById('commentField'), str = '>>' + num + '\n';
    if (document.selection) {
      el.focus();
      document.selection.createRange().text = str;
    }
    else if (typeof el.selectionStart == 'number') {
      var startPos = el.selectionStart, endPos = el.selectionEnd;
      el.value = el.value.substring(0, startPos) +
        str + el.value.substring(endPos, el.value.length);
    } else {
      el.value += str;
    }
    return false;
  }
  
};
