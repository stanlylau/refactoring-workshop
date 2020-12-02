const { PlaintextToHtmlConverter } = require("./plaintext_to_html_converter.js")

describe("Text Converter integration test", () => {
  it("sample.txt", () => {
    const converter = new PlaintextToHtmlConverter()
    expect(converter.toHtml()).toEqual("abc<br />&lt;hello&gt;")
  })
})
