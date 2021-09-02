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

// Ajout de la balise summary si elle est absente avec par défaut le texte "Réponse :"
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

// Ajout du paramètre allowFullScreen dans les iframes
var x = document.getElementsByTagName("iframe");
for (var i=0; i < x.length; i++) {
        srcIframe = x[i].src;
        x[i].setAttribute('allowFullScreen', 'true');
        x[i].src = 'about:blank';
        x[i].src = srcIframe;
}
