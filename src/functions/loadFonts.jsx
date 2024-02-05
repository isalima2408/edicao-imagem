var FontFaceObserver = require('fontfaceobserver')

export function loadFonts () {

    var exampleFontData = {
        'Roboto': { weight: 400 },
        'Roboto Bold': { weight: 700 },
        'Roboto Italic': { weight: 400 },
        'Roboto Bold Italic': { weight: 700 },
        'Poppins': { weight: 400 },
        'Poppins Bold': { weight: 700 },
        'Poppins Italic': { weight: 400 },
        'Poppins Bold Italic': { weight: 700 },
        'ComicNeue': { weight:400 },
        'ComicNeue Bold': { weight: 700 },
        'ComicNeue Italic': { weight: 400 },
        'ComicNeue Bold Italic': { weight: 700 },
    }
    
    var observers = []
    
    // Make one observer for each font,
    // by iterating over the data we already have
    Object.keys(exampleFontData).forEach(function(family) {
        var data = exampleFontData[family]
        var obs = new FontFaceObserver(family, data)
        observers.push(obs.load())
    })
    
    Promise.all(observers)
        .then(function(fonts) {
            /*fonts.forEach(function(font) {
                console.log(font.family + ' ' + font.weight + ' ' + 'loaded')
        
                // Map the result of the Promise back to our existing data,
                // to get the other properties we need.
                console.log(exampleFontData[font.family].color)
            })*/
        })
        .catch(function(err) {
            console.warn(err)
        })
}