declare module 'iyzipay' {
  interface IyzicoOptions {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  class Iyzipay {
    constructor(options: IyzicoOptions);
    
    static LOCALE: {
      TR: string;
      EN: string;
    };
    
    static CURRENCY: {
      TRY: string;
      USD: string;
      EUR: string;
    };
    
    static PAYMENT_GROUP: {
      PRODUCT: string;
      LISTING: string;
      SUBSCRIPTION: string;
    };
    
    static BASKET_ITEM_TYPE: {
      PHYSICAL: string;
      VIRTUAL: string;
    };

    checkoutFormInitialize: {
      create: (request: any, callback: (err: any, result: any) => void) => void;
    };

    checkoutForm: {
      retrieve: (request: any, callback: (err: any, result: any) => void) => void;
    };
  }

  export = Iyzipay;
}