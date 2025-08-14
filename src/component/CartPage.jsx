import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { CartContext } from "../context/CartContext";
import FormField from "../component/FormField";
import PaymentPage from "./PaymentPage";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [stage, setStage] = useState("cart"); // cart -> form -> payment -> success
  const formRef = useRef();
  const [toastOpen, setToastOpen] = useState(false);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE15") {
      setPromoDiscount(subtotal * 0.15);
      setPromoError("");
    } else {
      setPromoDiscount(0);
      setPromoError("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const baseDiscount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - baseDiscount - promoDiscount + deliveryFee;

  const handleCheckoutClick = () => {
    if (stage === "cart") {
      setStage("form");
    } else if (stage === "form") {
      const success = formRef.current?.handleSubmit();
      if (success) setStage("payment");
    }
  };

  const handleIncrement = (id) => {
    incrementQuantity(id);
  };

  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Container style={{ padding: "3rem 2rem", maxWidth: "1140px" }}>
        {/* ✅ Heading */}
        {stage !== "success" && (
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Your Cart
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Left Section */}
          <Box sx={{ flex: 1, minWidth: "60%" }}>
            {stage === "cart" &&
              cartItems.map((item) => (
                <Card
                  key={item.id}
                  sx={{ mb: 2, display: "flex", alignItems: "center", p: 2 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                    height="100"
                  />
                  <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Size: {item.size}</Typography>
                    <Typography variant="body2">Color: {item.color}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => handleIncrement(item.id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}

            {stage === "form" && <FormField ref={formRef} />}
            {stage === "payment" && (
              <PaymentPage
                onSuccess={() => {
                  setStage("success");
                  setToastOpen(true);
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                }}
              />
            )}
          </Box>

          {/* Right: Summary */}
          {stage !== "success" && (
            <Box sx={{ width: { xs: "100%", md: "35%" }, minWidth: 280 }}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Discount (-20%)</Typography>
                  <Typography color="error">
                    -${baseDiscount.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Promo Discount</Typography>
                  <Typography color="success.main">
                    -${promoDiscount.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Delivery Fee</Typography>
                  <Typography>${deliveryFee.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" gap={1} mb={promoError ? 0.5 : 2}>
                  <TextField
                    fullWidth
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "50px",
                        backgroundColor: "#f2f2f2",
                        height: 45,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      height: 45,
                      borderRadius: "50px",
                      backgroundColor: "#000",
                      color: "#fff",
                      textTransform: "none",
                      px: 3,
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#000",
                        boxShadow: "none",
                      },
                    }}
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </Button>
                </Box>

                {promoError && (
                  <Typography color="error" variant="caption" sx={{ mb: 2 }}>
                    {promoError}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "#000",
                    color: "#fff",
                    textTransform: "none",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "none",
                    },
                  }}
                  onClick={handleCheckoutClick}
                >
                  {stage === "form" ? "Place Order" : "Go to Checkout"}
                </Button>
              </Card>
            </Box>
          )}
        </Box>

        {/* ✅ Final Success Message */}
        {stage === "success" && (
          <Box
            sx={{
              textAlign: "center",
              mt: 10,
              mx: "auto",
              width: 400,
              bgcolor: "#e8f5e9",
              borderRadius: 2,
              p: 4,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ✅ Order Confirmed!
            </Typography>
          </Box>
        )}

        <Snackbar
          open={toastOpen}
          autoHideDuration={4000}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setToastOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Order confirmed successfully!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default CartPage;



