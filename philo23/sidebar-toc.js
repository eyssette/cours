// https://github.com/evan361425/evan361425.github.io/blob/935185b7ea1e2e89aa9c0a79bcc26b44dff5550b/pagetoc.js
// Referrer: https://github.com/JorelAli/mdBook-pagetoc/blob/master/sidebar.js
// Populate sidebar on load
window.addEventListener("load", function () {
	var pagetoc = document.getElementsByClassName("pagetoc")[0];
	var headers = document.getElementsByClassName("header");
  
	if (headers.length < 2) {
	  return pagetoc.remove();
	}
  
	Array.prototype.forEach.call(headers, function (header) {
	  var pagetocLink = document.createElement("a");
	  var tagName = header.parentElement.tagName.toLowerCase();
	  // no need h1, h5~h6
	  if (["h2"].includes(tagName) || ["h3"].includes(tagName)) {
	  pagetocLink.appendChild(document.createTextNode(header.text));
	  pagetocLink.classList.add(tagName);
	  pagetocLink.href = header.href;
	  pagetocLink.setAttribute("data-referrer", header.parentElement.id);
	  pagetoc.appendChild(pagetocLink);
	}
	});
  
	// Active pagetoc element on scroll
	window.addEventListener(
	  "scroll",
	  function () {
		var pagetoc = document.getElementsByClassName("pagetoc")[0];
		var activeLink = pagetoc.getAttribute("data-active-link");
  
		// find use position and get activeEl
		var headers = document.getElementsByClassName("header");
		var lastHeader;
		for (var header of headers) {
		  if (window.pageYOffset >= header.offsetTop) {
			lastHeader = header;
		  } else {
			break;
		  }
		}
		// if same, no need do anything
		if (activeLink == lastHeader.parentElement.id) {
		  return;
		}
		activeLink = lastHeader.parentElement.id;
		pagetoc.setAttribute("data-active-link", activeLink);
  
		// Set pagetoc active element
		Array.prototype.forEach.call(pagetoc.children, function (pagetocLink) {
		  if (activeLink == pagetocLink.getAttribute("data-referrer")) {
			pagetocLink.classList.add("active");
		  } else {
			pagetocLink.classList.remove("active");
		  }
		});
	  },
	  false
	);
  });