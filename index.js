var fs = require("fs")

function loadDataFromIDEditor(locale, cb){
    var content = fs.readFileSync(`test/${locale}.json`)
    var data = JSON.parse(content)
    cb(data)
}

function processDataFromIDEditor(data, locale) {
    var final_data = []
    var presets = data[locale]["presets"]["presets"]
    for(item in presets){
        var separated = item.split("/")
        if (separated.length == 2){
            var _key = separated[0]
            var _value = separated[1]
            var data = presets[item]
            var names = []
            var keywords = []
            if (data['name']) { names.push(data['name']) }
            if (data['terms']) { keywords = data['terms'].split(", ") }
            tags = {}
            tags[_key] = _value
            final_data.push({
                tags: tags,
                names: names,
                keywords: keywords
            })
        } else {
            console.log(`Expected 2 parts to name, but got '${item}' so ignoring `)
        }
    }
    return final_data
}

function saveData(data, locale) {
    // console.log(data)
    var json = JSON.stringify(data)
    fs.writeFileSync(`data/${locale}.json`, json)
}

var locale = "en-GB"

loadDataFromIDEditor(locale, function(data){
    saveData(processDataFromIDEditor(data, locale), locale)
})
