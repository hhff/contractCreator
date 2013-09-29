define([], function(){
	
	var templateString = 
	"{{#each clauses}}\
	<div class='panel invalid' id='{{name}}'>\
      <div class='content'>\
        <div class='half'>\
          <div class='survey'>\
            {{#if switchable}}\
              <label>This clause is optional.</label>\
              <div class='clauseSwitch {{switchable}} valid'></div>\
            {{/if}}\
            {{#each vars}}\
            <label>{{label}}</label>\
            <input class='updater {{#if type}}{{type}}{{/if}} {{#if dropdown}}dropdown{{/if}}' data-matcher='{{@key}}' placeholder='{{value}}'>\
                {{#if dropdown}}\
                <div class='options' data-matcher='{{@key}}'>\
                  {{#each dropdown}}\
                    <div class='option' data-matcher='{{@key}}'>{{this}}</div>\
                  {{/each}}\
                </div>\
                {{/if}}\
            {{/each}}\
          </div>\
        </div>\
        <div class='half r'>\
          <div class='clauseTitle'>\
            <h1>Clause Preview</h1>\
          </div>\
          <div class='clause'>\
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

