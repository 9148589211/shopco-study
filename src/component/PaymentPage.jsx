import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const PaymentPage = ({ onSuccess }) => {
  const [method, setMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', pin: '' });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    // Optional validation
    if (method === 'upi' && !upiId.trim()) return alert('Enter valid UPI ID');
    if (
      method === 'card' &&
      (!card.number || !card.expiry || !card.cvv || !card.pin)
    )
      return alert('Fill in all card details');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
      onSuccess();
    }, 1000);
  };

  if (confirmed) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Card sx={{ p: 4, bgcolor: '#e7f9ed', borderRadius: 2, boxShadow: 4 }}>
          <Typography variant="h5" color="green" fontWeight="bold" textAlign="center">
            ✅ Order Confirmed!
          </Typography>
        </Card>
      </Box>
    );
  }

  const renderCardFields = () => (
    <Box mt={2} display="grid" gap={2}>
      <TextField
        label="Card Number"
        variant="outlined"
        fullWidth
        value={card.number}
        onChange={(e) => setCard({ ...card, number: e.target.value })}
      />
      <TextField
        label="Expiry Date (MM/YY)"
        variant="outlined"
        fullWidth
        value={card.expiry}
        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
      />
      <TextField
        label="CVV"
        variant="outlined"
        fullWidth
        type="password"
        value={card.cvv}
        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
      />
      <TextField
        label="Card PIN"
        variant="outlined"
        fullWidth
        type="password"
        value={card.pin}
        onChange={(e) => setCard({ ...card, pin: e.target.value })}
      />
    </Box>
  );

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Select Payment Method
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
        <FormControlLabel
          value="payLater"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Flipkart Pay Later</Typography>
              <Chip label="NEW" size="small" color="error" />
            </Box>
          }
        />
        {method === 'payLater' && (
          <Typography ml={4} color="text.secondary" fontSize="0.875rem">
            Buy now, pay later (e.g. 10th of next month)
          </Typography>
        )}

        <FormControlLabel
          value="upi"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>PhonePe / UPI</Typography>
              <Chip label="UPI" color="secondary" size="small" />
            </Box>
          }
        />
        {method === 'upi' && (
          <TextField
            fullWidth
            variant="outlined"
            label="Enter UPI ID"
            value={upiId}
            sx={{ mt: 1 }}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
        {method === 'card' && renderCardFields()}

        <FormControlLabel value="netBanking" control={<Radio />} label="Net Banking" />
        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
      </RadioGroup>

      <Button
        variant="contained"
        fullWidth
        onClick={handleConfirm}
        sx={{
          mt: 4,
          py: 1.5,
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '2rem',
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid black',
          },
        }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Continue'}
      </Button>
    </Card>
  );
};

export default PaymentPage;
