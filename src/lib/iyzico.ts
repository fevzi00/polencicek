const Iyzipay = require('iyzipay');

export const iyzico = new Iyzipay({
  apiKey: process.env.NEXT_PUBLIC_IYZICO_API_KEY!,
  secretKey: process.env.IYZICO_SECRET_KEY!,
  uri: process.env.NEXT_PUBLIC_IYZICO_BASE_URL!,
});

export const IyzicoLocale = {
  TR: Iyzipay.LOCALE.TR,
  EN: Iyzipay.LOCALE.EN,
};

export const IyzicoCurrency = {
  TRY: Iyzipay.CURRENCY.TRY,
  EUR: Iyzipay.CURRENCY.EUR,
  USD: Iyzipay.CURRENCY.USD,
};

export const IyzicoPaymentGroup = {
  PRODUCT: Iyzipay.PAYMENT_GROUP.PRODUCT,
  LISTING: Iyzipay.PAYMENT_GROUP.LISTING,
  SUBSCRIPTION: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
};

export const IyzicoBasketItemType = {
  PHYSICAL: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
  VIRTUAL: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
};