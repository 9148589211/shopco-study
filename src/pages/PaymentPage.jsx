import React from 'react';
import {
  Box, Button, Grid, TextField, Typography, Paper, Divider
} from '@mui/material';

const PaymentPage = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>Ödeme</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Ödemenin gerçekleşmesi için lütfen bilgileri eksiksiz giriniz.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="İsim Soyisim" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Kart Numarası" variant="outlined" placeholder="1234 5678 9012 3456" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="CCV" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Son Kullanım Tarihi" variant="outlined" placeholder="AA / YY" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="warning">Ödemeyi Tamamla</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Right Side Summary */}
      <Paper elevation={3} sx={{ p: 3, width: 300, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>Ödeme Özeti</Typography>
        <Box mb={2}>
          <Typography variant="body2">Sipariş Numarası: <strong>11458523</strong></Typography>
          <Typography variant="body2">KDV: %20</Typography>
          <Typography variant="body2">KDV Tutarı: $123,28</Typography>
          <Typography variant="body2">Sipariş Tutarı: $123,28</Typography>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Ödenecek Tutar: <span style={{ color: "#000080" }}>$576,32</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentPage;

