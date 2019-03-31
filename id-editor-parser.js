var fs = require("fs")

function loadDataFromIDEditor(locale, cb){
    var content = fs.readFileSync(`test/${locale}.json`)
    var data = JSON.parse(content)
    data = data[locale]["presets"]["presets"]
    cb(data)
}

function processDataFromIDEditor(data, locale) {
    var final_data = []
    var extra_lookup = {}
    for(item in data){
        var separated = item.split("/")
        if (separated.length == 2){
            var _key = separated[0]
            var _value = separated[1]
            var entry = data[item]
            var names = []
            var keywords = []
            if (entry['name']) { names.push(entry['name']) }
            if (entry['terms']) { keywords = entry['terms'].split(", ") }
            tags = {}
            tags[_key] = _value
            final_data.push({
                tags: tags,
                names: names,
                keywords: keywords
            })
        } else {
            if (separated.length == 3){
                addMissingValue(extra_lookup, separated[0], separated[1], separated[2])
            } else {
                console.log(`Expected 2 or 3 parts to name, but got '${item}' so ignoring `)
            }
        }
    }
    console.log(extra_lookup)
    return final_data
}

function addMissingValue(to, first, second, third) {
    var key = `${first}-${second}`
    if (to[key] == undefined) to[key] = []
    to[key].push(third)
    // if (to[`${first}-${second}`] == undefined) to[first] = {}
    // if (to[first][second] == undefined) to[first][second] = []
    //to[first][second].push(third)
}

module.exports.loadDataFromIDEditor = loadDataFromIDEditor
module.exports.processDataFromIDEditor = processDataFromIDEditor