define([], function(){
	
	var templateString = 
	"{{#each clauses}}\
  <div class='indicator' id='{{name}}'></div>\
  {{/each}}"

	return templateString
})

