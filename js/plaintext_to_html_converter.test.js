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
    fs.readFileSync.mockReturnValue("< big")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&lt; big")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })


  it(">", () => {
    fs.readFileSync.mockReturnValue("> small")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&gt; small")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("&", () => {
    fs.readFileSync.mockReturnValue("& blank")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("&amp; blank")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })

  it("\n", () => {
    fs.readFileSync.mockReturnValue("line break \n")
    const converter = new PlaintextToHtmlConverter()
    const result = converter.toHtml()
    expect(result).toEqual("line break <br />")
    expect(notifier.notify).toHaveBeenCalledWith('HTML encoding done.')
  })
})
