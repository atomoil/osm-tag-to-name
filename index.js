var loadDataFromIDEditor = require("./id-editor-parser").loadDataFromIDEditor
var processDataFromIDEditor = require("./id-editor-parser").processDataFromIDEditor
var fs = require("fs")


function saveData(data, locale) {
    // console.log(data)
    var json = JSON.stringify(data)
    fs.writeFileSync(`data/${locale}.json`, json)
}

var locale = "en-GB"

loadDataFromIDEditor(locale, function(data){
    saveData(processDataFromIDEditor(data, locale), locale)
})
