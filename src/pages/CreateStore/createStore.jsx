import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { supabase } from "../../utils/SupabaseClient";

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
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData({ ...storeData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setStoreData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const {
            name,
            description,
            openTime,
            closeTime,
            village,
            category,
            contactNumber,
            images
        } = storeData;

        if (!name || !description || !openTime || !closeTime || !village || !category || !contactNumber) {
            setAlert({ show: true, msg: "Please fill all mandatory fields!", type: "success" });
            return;
        }
        if (images.length === 0) {
            setAlert({ show: true, msg: "Please Upload atleast 2 images", type: "success" });
            setLoading(false);
            return;
        }

        try {
            let uploadedImageUrls = []

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const fileName = `${Date.now()}-${file.name}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("avatars")
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const publicUrl = supabase.storage
                    .from("avatars")
                    .getPublicUrl(fileName).data.publicUrl;

                uploadedImageUrls.push(publicUrl);
            }
            const { data, error } = await supabase
                .from("categories")
                .insert([
                    {
                        id: Math.floor(100000 + Math.random() * 900000),
                        name,
                        description,
                        openTime,
                        closeTime,
                        location: village,
                        category,
                        contact: contactNumber,
                        image: uploadedImageUrls?.at(0),
                        gallery: uploadedImageUrls?.join(',')
                    }
                ]);

            if (error) throw error;
            setAlert({ show: true, msg: "Store created successfully!", type: "success" });

            setStoreData({
                name: "",
                description: "",
                openTime: "",
                closeTime: "",
                village: "",
                category: "",
                contactNumber: "",
                images: [],
            });

            setLoading(false)
        } catch (err) {
            setAlert({ show: true, msg: err.message, type: "error" });
            setLoading(false)
        }
    };


    return (
        <Container sx={{ mt: 3 }}>
            <Dialog closeAfterTransition open={alert?.show} onClose={() => setAlert({ show: false })}>
                <DialogContent>
                    {alert?.msg}
                </DialogContent>
            </Dialog>
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
                        <Button loading={loading} type="submit" variant="contained" fullWidth>
                            Submit Store
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CreateStore;
