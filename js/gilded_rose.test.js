const { Shop, Item } = require("./gilded_rose.js")

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].name).toBe("Aged Brie")
    expect(items[0].sellIn).toEqual(1)
    expect(items[0].quality).toEqual(1)
  });
});