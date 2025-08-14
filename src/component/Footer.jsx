import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Grid,
    Link,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { EmailOutlined, Instagram, Twitter, YouTube, Facebook } from '@mui/icons-material';
import { motion } from 'framer-motion';
import paypal from '../assets/Paypal.png';
import visa from '../assets/Visa.png';
import mastercard from '../assets/Mastercard.png';
import gPay from '../assets/Pay.png';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubscribe = () => {
        if (email.trim() === '') {
            setSnackbar({ open: true, message: 'Please enter a valid email address.', severity: 'error' });
        } else {
            setSnackbar({ open: true, message: `Subscribed to SHOP.CO with ${email}`, severity: 'success' });
            setEmail('');
        }
    };

    const socialLinks = [
        { icon: <Instagram />, href: '#' },
        { icon: <Twitter />, href: '#' },
        { icon: <YouTube />, href: '#' },
        { icon: <Facebook />, href: '#' }
    ];

    const footerSections = [
        { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
        { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
        { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
        { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'] }
    ];

    return (
        <Box component="footer" sx={{ width: '100%', bgcolor: '#f5f5f5', position: 'relative', mt: { xs: '80px', md: '120px' } }}>

            {/* Animated Newsletter Banner */}
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                <Box
                    sx={{
                        width: '100%', maxWidth: '1240px',
                        minHeight: '100px',
                        bgcolor: '#000',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: { xs: 3, md: '64px' },
                        py: 3,
                        color: '#fff',
                        position: 'absolute',
                        top: '-50px',
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        zIndex: 2,
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Integral CF, sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '20px', sm: '24px', md: '32px', lg: '40px' },
                            lineHeight: '45px',
                            mb: { xs: 2, md: 0 },
                        }}
                    >
                        STAY UP TO DATE <br /> ABOUT OUR LATEST OFFERS
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 400, width: '100%' }}
                    >
                        <TextField
                            placeholder="Enter your email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined sx={{ color: '#aaa', fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '62px',
                                    backgroundColor: '#fff',
                                    height: '38px',
                                    fontSize: '14px',
                                },
                            }}
                            fullWidth
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    borderRadius: '62px',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    py: 1,
                                    minHeight: '34px',
                                    '&:hover': { backgroundColor: '#f0f0f0' },
                                }}
                            >
                                Subscribe to Newsletter
                            </Button>
                        </motion.div>
                    </Box>
                </Box>
            </motion.div>

            {/* Footer Content */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1240px',
                    mx: 'auto',
                    pt: { xs: '220px', sm: '200px', md: '180px' },
                    pb: '24px',
                    px: { xs: 2, sm: 3, md: 4, lg: '64px' },
                }}
            >
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Company Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={{ fontFamily: 'Integral CF, sans-serif', fontWeight: 700, fontSize: { xs: '24px', md: '33.45px' }, mb: 2 }}>
                            SHOP.CO
                        </Typography>
                        <Typography sx={{ color: '#666', fontSize: '14px' }}>
                            We have clothes that suit your style and <br /> that you’re proud to wear. From <br /> women to men.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {socialLinks.map((s, idx) => (
                                <motion.div key={idx} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                                    <IconButton component="a" href={s.href}>
                                        {React.cloneElement(s.icon, { sx: { color: '#000' } })}
                                    </IconButton>
                                </motion.div>
                            ))}
                        </Box>
                    </Grid>

                    {/* Footer Links with Stagger Animation */}
                    {footerSections.map((section, index) => (
                        <Grid item xs={6} sm={3} md={2} key={index}>
                            <Typography fontWeight={600} mb={2} fontSize="16px">
                                {section.title}
                            </Typography>
                            {section.links.map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href="#"
                                        underline="none"
                                        display="block"
                                        color="text.secondary"
                                        sx={{ fontSize: '14px', mb: '8px', '&:hover': { color: '#000' } }}
                                    >
                                        {text}
                                    </Link>
                                </motion.div>
                            ))}
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom Bar */}
                <Box
                    sx={{
                        borderTop: '1px solid #ccc',
                        mt: 8,
                        pt: 3,
                        pb: 3,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Shop.co © 2000–2023, All Rights Reserved
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[gPay, visa, mastercard, paypal].map((src, index) => (
                            <motion.img
                                key={index}
                                src={src}
                                alt="Payment Method"
                                style={{ height: 40, width: 60, background: '#fff', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                                whileHover={{ y: -4 }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Footer;
