(function() {
    var codes;
    window.onload = function() {
       codes = document.getElementsByTagName('code');
       for (i in codes) {
            codes.item(i).classList.add('prettyprint');
        }
        prettyPrint();
    }
}());