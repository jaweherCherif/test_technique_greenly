import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });
  it("should decrease the discount after expiration date by 2", () => {
    expect(
      new Store([new DiscountOffer("test", 0, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", -1, 1)]);
  });
  it("should never exceed 50 discount", () => {
    expect(
      new Store([new DiscountOffer("test", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 9, 49)]);
    expect(
      new Store([new DiscountOffer("Naturalia", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 9, 50)]);
    expect(
      new Store([new DiscountOffer("Vinted", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 50)]);
    expect(
      new Store([new DiscountOffer("Ilek", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 10, 50)]);
  });
  it("should never have negatif discount", () => {
    expect(
      new Store([new DiscountOffer("test", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 9, 0)]);
    expect(
      new Store([new DiscountOffer("Naturalia", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 9, 1)]);
    expect(
      new Store([new DiscountOffer("Vinted", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 2)]);
    expect(
      new Store([new DiscountOffer("Ilek", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 10, 0)]);
  });
  it("should increase Naturalia discount before expiration date by 1", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 10, 5)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 9, 6)]);
  });
  it("should increase Naturalia discount after expiration date by 2", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 5)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 7)]);
  });
});
