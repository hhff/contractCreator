define([], function(){
	
	var templateString = 
	"{{#each clauses}}\
	<div class='panel' id='{{name}}'>\
      <div class='content'>\
        <div class='half'>\
          <div class='survey'>\
            {{#each vars}}\
            <label>{{label}}</label>\
            <input class='updater' data-matcher='{{@key}}' placeholder='{{value}}'>\
            {{/each}}\
          </div>\
        </div>\
        <div class='half r'>\
          <div class='clauseTitle'>\
            <h1>Clause Preview</h1>\
          </div>\
          <div class='clause legal'>\
            <h2>{{{clause}}}</h2>\
          </div>\
          <div class='clauseTitle'>\
            <h1>Normal Person Translation</h1>\
          </div>\
          <div class='clause trans'>\
            <h2>{{{translation}}}</h2>\
          </div>\
        </div>\
      </div>\
    </div>\
  {{/each}}"

	return templateString
})

