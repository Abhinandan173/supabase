import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box
} from "@mui/material";
import { supabase } from "../../utils/SupabaseClient";
import { useEffect, useState } from "react";

function CategoryPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [stores, setStores] = useState([])

    async function getProducts() {
        try {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .limit(1000);
            if (error) throw error;
            if (data != null) {
                console.log('data', data);
                setStores(data)
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    // Filter stores based on category
    const filteredStores = stores.filter((s) => s.category?.toLowerCase() === category?.split('-')?.join(' ')?.toLowerCase());

    // Format Category Title
    const formattedCategory = category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {formattedCategory} Services
            </Typography>

            {filteredStores.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No stores found.
                </Typography>
            ) : (
                <Grid container item spacing={2}>
                    {filteredStores.map((store) => (
                        <Grid sx={{ width: '100%' }} item xs={12} key={store.id}>
                            <Card
                                onClick={() => navigate(`/category-details/${store.id}`)}
                                sx={{ display: "flex", height: 120, boxShadow: 1, width: "100%" }}
                            >
                                {/* Left: Image */}
                                <CardMedia
                                    component="img"
                                    image={store.image || 'https://via.placeholder.com/150'}
                                    alt={store.name}
                                    sx={{
                                        objectFit: "cover",
                                        height: "100%",
                                        width: '30%'
                                    }}
                                />

                                {/* Right: Name + Location */}
                                <Box sx={{ flex: "1 0 70%", display: "flex", alignItems: "center" }}>
                                    <CardContent sx={{ pb: "8px !important" }}>
                                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                            {store.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {store.location}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default CategoryPage;
