export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface UIConfig {
  loading: {
    enableLoadingScreen: boolean;
    loadingDuration: number;
  };
  currency: {
    apiKey: string;
    baseCurrency: string;
    defaultCurrency: string;
    useFixedRates?: boolean;
    fixedRates?: Record<string, number>;
    supportedCurrencies: Currency[];
  };
}
