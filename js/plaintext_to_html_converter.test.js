const { PlaintextToHtmlConverter } = require("./plaintext_to_html_converter.js")
const fs = require("fs")
jest.mock("fs")

describe("Text Converter", () => {
  it("simple word", () => {
    fs.readFileSync.mockReturnValue("simple")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("simple")
  })

  it("<", () => {
    fs.readFileSync.mockReturnValue("<")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&lt;")
  })

  it(">", () => {
    fs.readFileSync.mockReturnValue(">")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&gt;")
  })

  it("&", () => {
    fs.readFileSync.mockReturnValue("&")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&amp;")
  })

  it("\n", () => {
    fs.readFileSync.mockReturnValue("\n")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("<br />")
  })

  it("mixed encodings with word", () => {
    fs.readFileSync.mockReturnValue("<small>\n&space")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&lt;small&gt;<br />&amp;space")
  })
})
