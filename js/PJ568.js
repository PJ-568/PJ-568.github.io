// 获取 Class 。
function getD(val,type) {
	if(!type){
		return document.getElementById(val);
	}
	if(type='class'){
		return document.getElementsByClassName(val);
	}
}
function init() {
	var navbar=getD('navbar-end', 'class');
	navbar_stuff=navbar.innerHTML;
	navbar_stuff+='<a class="navbar-item" id="translate" rel="noopener" title="翻译"><i class="fa fa-language"></i></a>';
	navbar.innerHTML=navbar_stuff;
}

// window.onload = function() {
	// init();
// };