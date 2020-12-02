const notifier = require("./notifier.js")
const fs = require('fs')
const path = require("path")

class PlaintextToHtmlConverter {
    toHtml() {
        const text = fs.readFileSync(path.join(__dirname, 'sample.txt'), 'utf8')
        const htmlLines = this._basicHtmlEncode(text)
        notifier.notify('HTML encoding done.')
        return htmlLines
    }

    _basicHtmlEncode(source) {
        var stashNextCharacterAndAdvanceThePointer = () => {
            var c = source.charAt(i)
            i += 1
            return c

        };

        var addANewLine = () => {
            convertedLine = convertedLine.join('')
            result.push(convertedLine)
            convertedLine = []
        };

        var pushACharacterToTheOutput = () => {
            convertedLine.push(characterToConvert);
        };

        var i = 0;
        var result = [];
        var convertedLine = [];
        var characterToConvert = stashNextCharacterAndAdvanceThePointer();
        while (i <= source.length) {

            switch (characterToConvert) {
                case '<':
                    convertedLine.push('&lt;');
                    break;
                case '>':
                    convertedLine.push('&gt;');
                    break;
                case '&':
                    convertedLine.push('&amp;');
                    break;
                case '\n':
                    addANewLine();
                    break;
                default:
                    pushACharacterToTheOutput();
            }

            characterToConvert = stashNextCharacterAndAdvanceThePointer();
        }

        addANewLine();
        result = result.join('<br />');
        return result;
    }
}

module.exports = {
    PlaintextToHtmlConverter
}