import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    Box,
    CardContent,
    Button,
    Grid
} from "@mui/material";
import SimpleHeader from "../../components/BackButton/backButton";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/SupabaseClient";
import Spinner from "../../components/Spinner/spinner";

function CategoryDetails() {
    const { id } = useParams();

    const [storeDetails, setStoreDetails] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchStore = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('id', id)
                    .single(); // fetch a single record

                if (error) throw error;

                setStoreDetails([data]);
                setLoading(false)
            } catch (err) {
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStore();
    }, [id]);

    const store = storeDetails?.find((s) => s.id === parseInt(id));
    console.log('sss', new Date().toLocaleDateString("en-US", { weekday: "long" }));

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', padding: "20px", height: '50vh' }}>
                <Spinner />
            </div>)
    }
    if (!store) return <Typography sx={{ mt: 3 }}>Store not found</Typography>;

    return (
        <>
            <SimpleHeader title="Plumber Services" />
            <Container sx={{ mt: 3, px: 2 }}>
                <Typography variant="h4" sx={{ mb: 2, fontSize: '2rem' }}>
                    {store.name}
                </Typography>

                {/* Main Store Card */}
                <Card sx={{ mb: 2 }}>
                    <CardMedia
                        component="img"
                        image={store.gallery?.split(',')?.at(0)}
                        alt={store.name}
                        sx={{ width: "100%", height: 200, objectFit: "cover" }}
                    />
                    <CardContent>
                        {store?.closeDay == new Date().toLocaleDateString("en-US", { weekday: "long" }) && <Typography variant="body2" sx={{ mb: 0.5, color: 'red' }}>
                            Closed Today
                        </Typography>}
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {store.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Open Time:</strong> {store.openTime}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Close Time:</strong> {store.closeTime}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => window.open(`tel:${store.contact}`)}
                        >
                            Call Now
                        </Button>
                    </CardContent>
                </Card>

                {/* Gallery Section */}
                {store.gallery && store.gallery.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Gallery
                        </Typography>

                        <Grid container spacing={2} >
                            {store.gallery?.split(',')?.reverse()?.map((img, index) => (
                                <Grid sx={{ width: '100%' }} item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            image={img ?? 'https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc'}
                                            alt={`Gallery ${index + 1}`}
                                            sx={{ width: "100%", height: 'auto', objectFit: "cover" }}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container >
        </>
    );
}

export default CategoryDetails;
