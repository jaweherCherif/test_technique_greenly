export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      if (this.discountOffers[i].partnerName === "Ilek") continue;

      this.discountOffers[i].expiresIn = this.discountOffers[i].expiresIn - 1;

      if (
        this.discountOffers[i].discount > 50 ||
        this.discountOffers[i].discount <= 0
      )
        continue;
      let amount = 0;
      switch (this.discountOffers[i].partnerName) {
        case "Naturalia":
          if (this.discountOffers[i].expiresIn >= 0) amount = 1;
          else amount = 2;
          break;
        case "Vinted":
          if (this.discountOffers[i].expiresIn < 0)
            this.discountOffers[i].discountInPercent = 0;
          else {
            if (this.discountOffers[i].expiresIn < 6) amount = 3;
            else if (this.discountOffers[i].expiresIn < 11) amount = 2;
          }
          break;
        case "BackMarket":
          if (this.discountOffers[i].expiresIn >= 0) amount = -2;
          else amount = -4;
          break;
        default:
          if (this.discountOffers[i].expiresIn >= 0) amount = -1;
          else amount = -2;
          break;
      }
      this.discountOffers[i].discountInPercent =
        amount > 0
          ? Math.min(this.discountOffers[i].discountInPercent + amount, 50)
          : Math.max(
              this.discountOffers[i].discountInPercent - Math.abs(amount),
              0
            );
    }
    return this.discountOffers;
  }
}
