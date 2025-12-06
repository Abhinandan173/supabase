import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Box,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
];

function CreateStore() {
    const [storeData, setStoreData] = useState({
        name: "",
        description: "",
        openTime: "",
        closeTime: "",
        village: "",
        category: "",
        contactNumber: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData({ ...storeData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setStoreData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('under construction')
        return

        // Validate mandatory fields
        const { name, description, openTime, closeTime, village, category, contactNumber } = storeData;
        if (!name || !description || !openTime || !closeTime || !village || !category || !contactNumber) {
            alert("Please fill all mandatory fields!");
            return;
        }

        // If validation passed
        console.log(storeData);
        alert("Store submitted successfully!");
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Create Your Store
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    {/* Name */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Store Name"
                            name="name"
                            value={storeData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Description"
                            name="description"
                            value={storeData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            required
                        />
                    </Grid>

                    {/* Open Time */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Open Time"
                            name="openTime"
                            type="time"
                            value={storeData.openTime}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>

                    {/* Close Time */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Close Time"
                            name="closeTime"
                            type="time"
                            value={storeData.closeTime}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>

                    {/* Village */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Village"
                            name="village"
                            value={storeData.village}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            select
                            label="Category"
                            name="category"
                            value={storeData.category}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Contact Number */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <TextField
                            label="Contact Number"
                            name="contactNumber"
                            value={storeData.contactNumber}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    {/* Images (Optional) */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Upload Images
                            <input
                                hidden
                                type="file"
                                multiple
                                accept="image"
                                onChange={handleImageUpload}
                            />
                        </Button>

                        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {storeData.images.map((file, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={URL.createObjectURL(file)}
                                    alt="store"
                                    sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Submit */}
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <Button type="submit" variant="contained" fullWidth>
                            Submit Store
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CreateStore;
