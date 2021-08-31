// Changement du caractère indiquant des sous-rubriques
var x = document.querySelectorAll(".sidebar-scrollbox .toggle div");
for (var i=0; i < x.length; i++) {
    x[i].innerHTML =">";
}

// Règles typographiques françaises
var tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (tree.nextNode()) {
var textNode = tree.currentNode;
textNode.nodeValue = textNode.nodeValue.replace(/\s([;:!?%»])/gu, '\xa0$1');
textNode.nodeValue = textNode.nodeValue.replace(/«\s/gu, '«\xa0');
}

// Changement du caractère indiquant des sous-rubriques
var x = document.getElementsByTagName("details");
for (var i=0; i < x.length; i++) {
    if(x[i].getElementsByTagName('summary').length == 0) {
    let summary = document.createElement('summary')
    x[i].prepend(summary);
}
}

var x = document.getElementsByTagName("summary");
for (var i=0; i < x.length; i++) {
    if (!x[i].innerHTML) {x[i].innerHTML = 'Réponse :';}
}