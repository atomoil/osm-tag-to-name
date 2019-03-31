var loadDataFromIDEditor = require("./id-editor-parser").loadDataFromIDEditor
var processDataFromIDEditor = require("./id-editor-parser").processDataFromIDEditor

test('loads JSON', done => {
    loadDataFromIDEditor('en-GB', function(data){
        expect(data).not.toBeNull()
        done()
    })
});

test('parses loaded JSON', done => {
    let locale = 'en-GB'
    loadDataFromIDEditor(locale, function(data_in){
        var data = processDataFromIDEditor(data_in, locale)
        expect(data).not.toBeNull()
        expect(data.length).toBeGreaterThan(0)
        expect(data.length).toEqual(Object.keys(data_in).length)
        done()
    })
});