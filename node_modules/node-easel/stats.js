var registry = require('npm-stats')();

var downloads = registry.module('node-easel').downloads({}, function(err, value) {
	var total = 0;
	for (var i=0;i<value.length;i++) {
		total += value[i].value;
	}
	console.log('Total downloads: ', total);

});
