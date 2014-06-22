$(document).ready(function(){
	var $img = $(".videofloat");
	var $a = $(".videofloat").parents("a");
	$a.each(function(i){
		var url = $(this).attr("href");
		if($(this).attr("videohref"))
		{
			url=$(this).attr("videohref");
			
		}
		if(url.indexOf("v.youku.com")<0 || url.indexOf("http://v.youku.com")<0 )
		{
			$img.eq(i).hide();
		}
	});

});
