javascript:(function()
{
	function xlog(str, elem, prepend)
	{
		if (elem) var d = document.createElement(elem);
		else d = document.createElement("h2");
		d.className = "xlog";
		d.innerHTML = str;
		if(prepend)
			document.body.insertBefore(d, document.body.firstChild);
		else
			document.body.appendChild(d);
	}
	function zeroPad(n)
	{
		n += '';
		if (n.length < 2) n = '0' + n;
		return n;
	}
	function dateToHHMMSS(d)
	{
		return zeroPad(d.getHours()) + ":" + zeroPad(d.getMinutes()) + ":" + zeroPad(d.getSeconds());
	}
	function renderLink(a)
	{
		return '<a href="' + a.href + '">' + a.textContent + '</a>';
	}
	function get(s)
	{
		s = s.toString();
		var t = s.substr(1, s.length - 1);
		if (s.indexOf("#") === 0) return document.getElementById(t);
		else if (s.indexOf(".") === 0) return document.getElementsByClassName(t);
		else if (document.getElementsByTagName(s).length) return document.getElementsByTagName(s);
		else return 0;
	}
	function browse()
	{
		var allLinks = document.getElementsByTagName("a");
		var i = allLinks.length;
		var links = [];
		while(i--)
		{
			if(allLinks[i].className && allLinks[i].className.indexOf("title") !== -1 && allLinks[i].textContent.indexOf('[CLICKED]') === -1)
				links.push(allLinks[i]);
		}
		if(links.length < 1)
		{
			xlog("No links found");
			return;
		}
		i = Math.floor(Math.random() * links.length);
		var d = new Date();
		xlog(links[i].textContent);
		links[i].textContent += " [CLICKED]";
		links[i].setAttribute("target", "_blank");
		links[i].innerHTML = "<mark>" + links[i].innerHTML + "</mark>";
		links[i].click();
		var clickdelay; 
		if(get("#delayInput"))
			clickdelay = parseInt(get("#delayInput").value, 10);
		else
			clickdelay = 10;
		if(clickdelay < 1)
			clickdelay = 10;
		clickdelay *= 1000;
		var delay = Math.floor(clickdelay + Math.random() * clickdelay*10);
		d = new Date(d.getTime() + delay);
		xlog(links.length + ". " + links[i].href + " | next: " + dateToHHMMSS(d), "h6");
		setTimeout(browse, delay);
	}
	var delayInput = document.createElement("input");
	delayInput.type = "text";
	delayInput.value = 10;
	delayInput.id = "delayInput";
	document.body.insertBefore(delayInput, document.body.firstChild);
	browse();
})();
