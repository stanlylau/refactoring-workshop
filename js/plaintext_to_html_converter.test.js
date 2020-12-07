const { PlaintextToHtmlConverter } = require("./plaintext_to_html_converter.js")
const fs = require("fs")
const notifier = require('./notifier.js')
jest.mock("fs")
jest.mock("./notifier.js")

describe("Text Converter", () => {
  it("simple word", () => {
    fs.readFileSync.mockReturnValue("simple")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("simple")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("<", () => {
    fs.readFileSync.mockReturnValue("<")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&lt;")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it(">", () => {
    fs.readFileSync.mockReturnValue(">")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&gt;")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("&", () => {
    fs.readFileSync.mockReturnValue("&")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&amp;")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("\n", () => {
    fs.readFileSync.mockReturnValue("\n")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("<br />")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("mixed encodings with word", () => {
    fs.readFileSync.mockReturnValue("<small>\n&space")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&lt;small&gt;<br />&amp;space")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })
})
