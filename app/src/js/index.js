var debug = 1;
if (debug) {
	Mock.mock(/textMock/, {
	    'txt':'@name'
	});	
}

$('#wrap').click(function() {
	$.ajax({
		url:'textMock',
		type:'get'
	})
	.done(function(res) {
		var res = JSON.parse(res);
		$('#wrap').text(res.txt);
	})
});