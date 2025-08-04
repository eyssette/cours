// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Accueil</a></li><li class="chapter-item expanded "><a href="intro.html">Introduction</a></li><li class="chapter-item expanded "><a href="sem1.html">Semestre 1 : Les pouvoirs de la parole</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s1.html">Séquence 1 : Parler de soi</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s1-ch1.html">Chapitre 1 : La parole révélatrice et constitutive de notre identité</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="s1-ch1-q1.html">Question 1 – Pourquoi parler est-il si important pour les êtres humains ?</a></li><li class="chapter-item "><a href="s1-ch1-q2.html">Question 2 – Comment la parole nous situe-t-elle socialement ?</a></li><li class="chapter-item "><a href="s1-ch1-q3.html">Question 3 – La parole exprime-t-elle mon identité ?</a></li></ol></li><li class="chapter-item expanded "><a href="s1-ch2.html">Chapitre 2 : L&#39;expression des sentiments</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="s1-ch2-q1.html">Question 1 – Comment le désir et le sentiment amoureux peuvent-ils s&#39;exprimer ?</a></li><li class="chapter-item "><a href="s1-ch2-q2.html">Question 2 – La parole doit-elle nécessairement ne pas être violente ?</a></li><li class="chapter-item "><a href="s1-ch2-q3.html">Question 3 – La parole est-elle libératrice ?</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="s2.html">Séquence 2 : Parole et politique</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s2-ch1.html">Chapitre 1 : Parole et démocratie</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="s2-ch1-q1.html">Question 1 – Pourquoi la parole est-elle si importante en démocratie ?</a></li><li class="chapter-item "><a href="s2-ch1-q2.html">Question 2 – La liberté de parole doit-elle être absolue ?</a></li></ol></li><li class="chapter-item expanded "><a href="s2-ch2.html">Chapitre 2 : La parole comme pouvoir sur autrui</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="s2-ch2-q1.html">Question 1 – La rhétorique politique est-elle une manipulation par le langage ?</a></li></ol></li></ol></li></ol></li><li class="chapter-item expanded "><a href="sem2.html">Semestre 2 : Les représentations du monde</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s3.html">Séquence 3 : Découverte du monde et pluralité des cultures</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s3-ch1.html">Chapitre 1 : La révolution scientifique</a></li><li class="chapter-item expanded "><a href="s3-ch2.html">Chapitre 2 : La pluralité des cultures</a></li><li class="chapter-item expanded "><a href="s3-ch3.html">Chapitre 3 : Décrire, figurer, imaginer</a></li></ol></li><li class="chapter-item expanded "><a href="s4.html">Séquence 4 : L&#39;homme et l&#39;animal</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item expanded "><a href="s4-ch1.html">Chapitre 1 : Comment nous représentons-nous les animaux ?</a></li><li class="chapter-item expanded "><a href="s4-ch2.html">Chapitre 2 : Quels devoirs avons-nous envers les animaux ?</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
