export default class Card {
  constructor(id, value, color, symbol, link) {
    this.id = id;
    this.value = value;
    this.color = color;
    this.symbol = symbol;
    this.link = link;
  }
  getValue() {
    if (this.value === "A") {
      return 11;
    } else if (["K", "Q", "J"].includes(this.value)) {
      return 10;
    } else {
      return parseInt(this.value);
    }
  }
}
