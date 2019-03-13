// get user input from jQuery
var data_url="";

jQuery(document).ready(function($){
	$('.user-input').on('submit', function()
	{
		p = $("[id=pre_drop]").val(); 
		c = $("input[id=c_val]").val();
		data_url = "http://127.0.0.1:5000/getROC/preprocessing=" + p + '/C=' + c;
    drawROC(data_url);
		return false
	});

});
