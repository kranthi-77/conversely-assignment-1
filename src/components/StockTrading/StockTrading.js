import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination
} from '@mui/material';
import { mockStockData, getUpdatedStockData } from './mockStockData';

import './index.css'

const PRICE_UPDATE_INTERVAL = 7000;

const calculateItemsPerPage = () => {
  const itemHeight = 150;
  const viewportHeight = window.innerHeight;
  const itemsPerPage = Math.floor(viewportHeight / itemHeight);
  return itemsPerPage > 0 ? itemsPerPage : 1;
};

const StockTrading = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [holdings, setHoldings] = useState({});
  const [balance, setBalance] = useState(30000);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());

  useEffect(() => {
    const storedHoldings = JSON.parse(localStorage.getItem('holdings')) || {};
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 30000;
    setHoldings(storedHoldings);
    setBalance(storedBalance);
  }, []);

  useEffect(() => {
    localStorage.setItem('holdings', JSON.stringify(holdings));
    localStorage.setItem('balance', balance.toString());
  }, [holdings, balance]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUpdatedStockData();
    }, PRICE_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTrade = (type) => {
    if (!symbol) {
      setMessage('Please select a stock symbol.');
      setOpen(true);
      return;
    }

    const quantityValue = parseInt(quantity, 10);
    if (isNaN(quantityValue) || quantityValue <= 0) {
      setMessage('Please enter a valid quantity (positive number).');
      setOpen(true);
      return;
    }

    const stock = mockStockData[symbol.toUpperCase()];
    if (!stock) {
      setMessage('Invalid stock symbol.');
      setOpen(true);
      return;
    }

    const totalCost = stock.price * quantityValue;

    if (type === 'buy') {
      if (balance < totalCost) {
        setMessage('Insufficient balance.');
        setOpen(true);
        return;
      }

      setHoldings((prevHoldings) => ({
        ...prevHoldings,
        [symbol.toUpperCase()]: (prevHoldings[symbol.toUpperCase()] || 0) + quantityValue,
      }));

      setBalance((prevBalance) => prevBalance - totalCost);
      setMessage(`Bought ${quantityValue} shares of ${symbol.toUpperCase()}`);
    } else if (type === 'sell') {
      const currentHoldings = holdings[symbol.toUpperCase()] || 0;

      if (currentHoldings < quantityValue) {
        setMessage('Insufficient shares.');
        setOpen(true);
        return;
      }

      setHoldings((prevHoldings) => {
        const updatedHoldings = {
          ...prevHoldings,
          [symbol.toUpperCase()]: currentHoldings - quantityValue,
        };

        if (updatedHoldings[symbol.toUpperCase()] === 0) {
          delete updatedHoldings[symbol.toUpperCase()];
        }

        return updatedHoldings;
      });

      setBalance((prevBalance) => prevBalance + totalCost);
      setMessage(`Sold ${quantityValue} shares of ${symbol.toUpperCase()}`);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderHoldings = () => {
    const holdingsArray = Object.entries(holdings).map(([stock, qty]) => ({
      symbol: stock,
      ...mockStockData[stock],
      quantity: qty,
    }));

    const paginatedData = holdingsArray.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return paginatedData.map((stock) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={stock.symbol}>
        <Card>
          <CardContent>
            <Typography variant="h6">{stock.symbol}</Typography>
            <Typography color="textSecondary">{stock.name}</Typography>
            <Typography>Price: ${stock.price.toFixed(2)}</Typography>
            <Typography>Quantity: {stock.quantity}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
    <Container className='main-con'>
      <Typography variant="h4" gutterBottom>
        Stock Market Application
      </Typography>
      <Typography variant="h5" gutterBottom>
        Available Balance: ${balance.toFixed(2)}
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Stock Symbol</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              label="Stock Symbol"
            >
              {Object.entries(mockStockData).map(([key, { name, price }]) => (
                <MenuItem key={key} value={key}>
                  {key} - {name} (${price})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleTrade('buy')}
          >
            Buy
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => handleTrade('sell')}
          >
            Sell
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Your Holdings
      </Typography>
      <Grid container spacing={4}>
        {renderHoldings()}
      </Grid>
      <Pagination
        count={Math.ceil(Object.keys(holdings).length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 4 }}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </Container>
    </>
  );
};

export default StockTrading;