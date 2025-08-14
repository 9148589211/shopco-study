import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import casualImg from "../assets/casual.png";
import formalImg from "../assets/formal.png";
import partyImg from "../assets/party.png";
import gymImg from "../assets/gym.png";

const DressStyleSection = () => {
  const navigate = useNavigate();

  const styles = [
    { name: "Casual", image: casualImg },
    { name: "Formal", image: formalImg },
    { name: "Party", image: partyImg },
    { name: "Gym", image: gymImg },
  ];

  const handleStyleClick = (styleName) => {
    const targetUrl = `/products?style=${encodeURIComponent(styleName)}`;
    navigate(targetUrl);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1240px",
        mx: "auto",
        mt: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        mb={{ xs: 4, md: 6 }}
        textTransform="uppercase"
      >
        Browse by Dress Style
      </Typography>

      <Grid container spacing={3}>
        {styles.map((style, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              onClick={() => handleStyleClick(style.name)}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                height: 280,
                position: "relative",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                image={style.image}
                alt={style.name || "Dress style"}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {style.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DressStyleSection;
