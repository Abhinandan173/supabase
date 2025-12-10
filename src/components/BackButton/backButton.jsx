import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

function GoBackButton({ text = "Go Back" }) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                mb: '-3%',
                mt: 1,
                cursor: "pointer",
                ml: '4%'
            }}
            onClick={() => navigate(-1)}
        >
            <IconButton size="small" edge="start" color="primary">
                <ArrowBackIosNewIcon fontSize="small" sx={{ fontSize: 15, color: 'black' }} />
            </IconButton>
            <Typography variant="body2" color="black" sx={{ ml: -0.5, mt: 0.1 }}>
                {text}
            </Typography>
        </Box>
    );
}

export default GoBackButton;
