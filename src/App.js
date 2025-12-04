import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { supabase } from "./utils/SupabaseClient";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
export default function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [file_, setFile] = useState("");

  async function uploadImage(file) {
    if (!file) return null;
    try {
      const fileExt = file_.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { data, error } = await supabase.storage
        .from("avatars") // your storage bucket name
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      console.log("urlData", urlData);
      return urlData?.publicUrl;
    } catch (error) {
      console.log("Error uploading image:", error.message);
      return null;
    }
  }

  async function addProduct() {
    if (name?.trim()?.length == 0 || description?.trim()?.length == 0)
      return alert("ದಯವಿಟ್ಟು ಎಲ್ಲವನ್ನೂ ಭರ್ತಿ ಮಾಡಿ");
    const imageUrl = await uploadImage(file_);
    const uniqueId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          id: uniqueId,
          name: name,
          description: description,
          image_url: imageUrl,
        })
        .single();
      if (error) throw error;

      setName("");
      setDescription("");
      setFile("");
      const phone = "+918050905047";
      const message = `New Product Added:\nName: ${name}\nDetails: ${description}\nImage: ${
        imageUrl || "No Image"
      }`;
      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank"); // opens WhatsApp Web or app
      getProducts();
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data?.reverse());
      }
    } catch (error) {
      alert(error.message);
    }
  }
  const handlePhoto = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <header>
        <div className="header-container">
          <img
            src="/download.png"
            alt="Ice Cream"
            style={{
              height: "40px",
              width: "60px",
              paddingRight: "10px",
              objectFit: "contain",
            }}
          />
          <h3>Ice Cream List</h3>
        </div>
      </header>
      <div className="create-product-container">
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Store Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label="Details"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="outlined" component="label">
              Upload Photo
              <IconButton component="label">
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />
                <PhotoCamera />
              </IconButton>
            </Button>
            <Button variant="contained" onClick={() => addProduct()}>
              Add Product
            </Button>
          </Box>
        </div>
      </div>
      <h3 className="sales-list">Sales List</h3>
      {console.log("products", products?.reverse())}
      <div className="product-list-container">
        {products?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
