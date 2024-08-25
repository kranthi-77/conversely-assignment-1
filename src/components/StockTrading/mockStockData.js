const mockStockData = {
    AAPL: { price: 150, name: 'Apple Inc.' },
    TSLA: { price: 700, name: 'Tesla, Inc.' },
    GOOGL: { price: 2700, name: 'Alphabet Inc.' },
    MSFT: { price: 280, name: 'Microsoft Corporation' },
    AMZN: { price: 3400, name: 'Amazon.com, Inc.' },
    FB: { price: 320, name: 'Meta Platforms, Inc.' },
    NFLX: { price: 550, name: 'Netflix, Inc.' },
    NVDA: { price: 200, name: 'NVIDIA Corporation' },
    BABA: { price: 180, name: 'Alibaba Group Holding Limited' },
    V: { price: 250, name: 'Visa Inc.' },
    JNJ: { price: 165, name: 'Johnson & Johnson' },
    JPM: { price: 160, name: 'JPMorgan Chase & Co.' },
    WMT: { price: 140, name: 'Walmart Inc.' },
    PG: { price: 140, name: 'Procter & Gamble Co.' },
    DIS: { price: 190, name: 'The Walt Disney Company' },
    MA: { price: 350, name: 'Mastercard Incorporated' },
    PYPL: { price: 290, name: 'PayPal Holdings, Inc.' },
    INTC: { price: 55, name: 'Intel Corporation' },
    KO: { price: 60, name: 'The Coca-Cola Company' },
    PEP: { price: 150, name: 'PepsiCo, Inc.' },
    CSCO: { price: 55, name: 'Cisco Systems, Inc.' },
    BA: { price: 210, name: 'The Boeing Company' },
    IBM: { price: 120, name: 'IBM Corporation' },
    ORCL: { price: 80, name: 'Oracle Corporation' },
    TSN: { price: 75, name: 'Tyson Foods, Inc.' },
    CVS: { price: 95, name: 'CVS Health Corporation' },
    MCD: { price: 280, name: 'McDonald\'s Corporation' },
    ADBE: { price: 500, name: 'Adobe Inc.' },
    XOM: { price: 105, name: 'Exxon Mobil Corporation' },
    UNH: { price: 470, name: 'UnitedHealth Group Incorporated' },
    MRK: { price: 90, name: 'Merck & Co., Inc.' },
    NKE: { price: 160, name: 'Nike, Inc.' },
    AMGN: { price: 245, name: 'Amgen Inc.' },
    MDT: { price: 105, name: 'Medtronic plc' },
    TXN: { price: 190, name: 'Texas Instruments Incorporated' },
    GILD: { price: 70, name: 'Gilead Sciences, Inc.' },
    SLB: { price: 50, name: 'Schlumberger Limited' },
    LMT: { price: 485, name: 'Lockheed Martin Corporation' },
    ADP: { price: 220, name: 'Automatic Data Processing, Inc.' },
    GE: { price: 110, name: 'General Electric Company' },
    CAT: { price: 220, name: 'Caterpillar Inc.' },
    C: { price: 50, name: 'Citigroup Inc.' },
    F: { price: 12, name: 'Ford Motor Company' },
    GM: { price: 35, name: 'General Motors Company' },
    RCL: { price: 60, name: 'Royal Caribbean Group' },
    T: { price: 18, name: 'AT&T Inc.' },
    VZ: { price: 37, name: 'Verizon Communications Inc.' },
    WBA: { price: 39, name: 'Walgreens Boots Alliance, Inc.' },
    BMY: { price: 70, name: 'Bristol-Myers Squibb Company' },
  };
  
  const getUpdatedStockData = () => {
    for (const symbol in mockStockData) {
      const stock = mockStockData[symbol];
      const randomChange = (Math.random() * 0.30) - 0.10; // Random change between -10% and +20%
      stock.price = parseFloat((stock.price * (1 + randomChange)).toFixed(2));
    }
  };
  
  export { mockStockData, getUpdatedStockData };