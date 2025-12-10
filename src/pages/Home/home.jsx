import { useNavigate } from "react-router-dom";
import { Container, Grid, Button, Typography, Card, CardContent } from "@mui/material";
import Slider from "react-slick";

function Home() {
    const navigate = useNavigate();

    const categories = [
        "Plumber",
        "Rikshaw",
        "Hotels",
        "Painter",
        "Kirana Shop",
        "Gas Cylinder Delivery",
        "Tailor",
        "Saloon",
        "Photographer",
        "Coaching Classes",
        "Other"
    ];

    const settings = {
        dots: true,
        infinite: true,
        // speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "40px",
        arrows: false,
        autoplay: false,
        // autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px"
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "30px"
                }
            }
        ]
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "600" }}>
                Categories
            </Typography>

            <Grid container spacing={2}>
                {categories.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ textTransform: "none", fontWeight: 500 }}
                            onClick={() => navigate(`/category/${item.toLowerCase().replace(/ /g, "-")}`)}
                        >
                            {item}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" sx={{ mt: 5, mb: 2, fontWeight: "600", fontSize: '1.3rem' }}>
                Advertisements & Store Creation
            </Typography>

            <Slider {...settings}>
                {/* Advertisement Card */}
                <Card
                    sx={{
                        minWidth: 300,
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                        color: "#fff",
                        borderRadius: 3,
                        boxShadow: 3
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            textAlign: "center",
                            padding: 0
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Advertise Here!
                        </Typography>
                        <Typography>
                            Contact: <strong>9876543210</strong>
                        </Typography>
                    </CardContent>
                </Card>

                {/* Store Creation Card */}
                <Card
                    sx={{
                        minWidth: 300,
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                        color: "#fff",
                        borderRadius: 3,
                        boxShadow: 3
                    }}
                    onClick={() => navigate("/create-store")}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            textAlign: "center",
                            padding: 0
                        }}
                    >
                        {/* <Typography variant="h6" sx={{ mb: 1 }}>
                            Create Your Store
                        </Typography> */}
                        <Button sx={{ color: 'white', fontWeight: 'bold', border: '1px solid white' }} variant="outlined">Create Your Store</Button>
                    </CardContent>
                </Card>
            </Slider>
        </Container>
    );
}

export default Home;
