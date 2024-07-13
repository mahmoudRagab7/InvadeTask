// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// image
import Banner from "../assets/4929d930-d6a5-11ec-bb19-d9085ce408df-background-description.avif";

export default function Landing() {
  return (
    // Landing Component
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            height: "fit-content",
            marginTop: "50px",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", sm: "100%", md: "420px", lg: "420px" },
            }}
          >
            <h5 style={{ color: "gray", marginBottom: "0px" }}>
              THE NEW CREATIVE ECONOMY
            </h5>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "55px",
                marginTop: "5px",
                color: "#d6d6d6",
              }}
            >
              Share your creations with the world
            </h1>
            <h5 style={{ color: "#b5b5b5" }}>
              Collect and sell digital art, powered by the best online tools.
            </h5>
            <div>
              <Button
                className="rounded-pill"
                variant="text"
                style={{
                  backgroundColor: "ghostwhite",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  padding: "15px",
                }}
              >
                Discover More
              </Button>
              <Button
                variant="contained"
                style={{
                  fontWeight: "bold",
                  borderRadius: "30px",
                  padding: "15px",
                }}
              >
                Create item
              </Button>
            </div>
          </Box>
          <div>
            <img
              src={Banner}
              alt="Banned"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </Box>
      </Container>
    </>
  );
}
