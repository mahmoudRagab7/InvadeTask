// REACT
import { useEffect, useState } from "react";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// EXTERNAL LIBRARIES
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, brandName, theme) {
  return {
    fontWeight:
      brandName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function valuetext(value) {
  return `${value}°C`;
}

let cancelAxios = null;

export default function Filter() {
  const theme = useTheme();

  // ======== STATES ========= //
  const [allData, setAllData] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [sliderValue, setSliderValue] = useState([0, 1500]);
  const [displayedCategory, setDisplayedCategory] = useState("All");
  const [productsToBeRendered, setProductsToBeRendered] = useState(allData);
  const [filterValue, setFilterValue] = useState(allData);

  // ======== EVENT HANDLERS ========= //
  const handleReset = () => {
    setFilterValue(allData);
    setSliderValue([0, 1500]);
    setBrandName([]);
    setDisplayedCategory("All");
  };

  const handleChangeToggle = (event, newAlignment) => {
    setDisplayedCategory(newAlignment);
  };

  const handleChangeSlider = (event, newValue) => {
    setSliderValue(newValue);
    // console.log(sliderValue);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBrandName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //   Fitching the data
  useEffect(() => {
    axios
      .get("/data.json", {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      })
      .then(function (response) {
        // handle success
        const updatedAllData = response.data;
        const updatedProducts = updatedAllData.map((e) => {
          return e;
        });
        setAllData(updatedProducts);
        setProductsToBeRendered(updatedProducts);
        const updatedProductsBrand = updatedAllData.map((e) => {
          return e.brand;
        });
        setBrandList(updatedProductsBrand);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      console.log("canceling");
      cancelAxios();
    };
  }, []);

  useEffect(() => {
    let value = function filterAllProducts(
      cat = allData,
      price = allData,
      brand = allData
    ) {
      const ElectronicsProducts = allData.filter((e) => {
        return e.category === "Electronics";
      });

      const AppliancesProducts = allData.filter((e) => {
        return e.category === "Appliances";
      });

      const SportsProducts = allData.filter((e) => {
        return e.category === "Sports";
      });

      const FashionProducts = allData.filter((e) => {
        return e.category === "Fashion";
      });

      if (displayedCategory === "Electronics") {
        cat = ElectronicsProducts;
      } else if (displayedCategory === "Appliances") {
        cat = AppliancesProducts;
      } else if (displayedCategory === "Sports") {
        cat = SportsProducts;
      } else if (displayedCategory === "Fashion") {
        cat = FashionProducts;
      } else {
        cat = allData;
      }

      price = cat.filter((product) => {
        return (
          product.price >= sliderValue[0] && product.price <= sliderValue[1]
        );
      });

      brand = price.filter((b) => {
        return brandName.includes(b.brand);
      });

      if (brand.length === 0) {
        return price;
      } else {
        return brand;
      }
    };
    setFilterValue(value);
  }, [allData, displayedCategory, sliderValue, brandName]);

  //   Draw The Card Function
  function showAllProducts() {
    if (filterValue.length !== 0) {
      return filterValue.map((product) => {
        return (
          <div
            style={{
              minWidth: "230px",
              margin: "0px 0px 20px",
              borderRadius: "15px",
              height: "365px",
              boxShadow: "#b0a5a5ab 0px 4px 1px",
            }}
            key={product?.id}
          >
            <Card
              sx={{
                maxWidth: 230,
                height: "100%",
                borderRadius: "15px",
                backgroundColor: "#d6d6d6",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  // image={image}
                  image={product.image}
                  alt="green iguana"
                />
                <CardContent style={{ textAlign: "left" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    {product?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the brand description of the product
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "blue", fontWeight: "bold" }}
                >
                  {product?.brand}
                </Typography>
                <Button size="small" color="primary" variant="contained">
                  {product?.price}$
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      });
    } else {
      return (
        <div style={{ color: "#661c54" }}>
          <h1>No Result Found</h1>
        </div>
      );
    }
  }

  return (
    // Filter Component
    <>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Grid container spacing={2}>
          <Grid lg={4} md={3} sm={12} xs={12}>
            <div
              style={{
                textAlign: "start",
                backgroundColor: "#1e1d1d",
                padding: "10px",
                borderRadius: "20px",
                boxShadow: "#b0a5a5ab 0px 4px 1px",
              }}
            >
              <div>
                <Typography
                  variant="h4"
                  style={{ color: "#d6d6d6", fontWeight: "bold" }}
                  gutterBottom
                >
                  Filter Productss
                </Typography>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ backgroundColor: "white" }}
                />
              </div>
              <div>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      color: "#b5b5b5",
                      textAlign: "start",
                      padding: "0px 10px",
                      margin: "10px 0px 0px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Brand
                  </Typography>
                  <FormControl
                    sx={{ m: 1, width: "96%", backgroundColor: "white" }}
                  >
                    <InputLabel
                      //   style={{ color: "red" }}
                      id="demo-multiple-chip-label"
                    >
                      Brand
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={brandName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {brandList.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, brandName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div style={{ padding: "10px" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      color: "#b5b5b5",
                      textAlign: "start",
                      padding: "0px 10px",
                      margin: "10px 0px 0px",
                      fontWeight: "bold",
                    }}
                  >
                    Price Range
                  </Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={1500}
                    style={{ color: "#9c27b0" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    style={{
                      padding: "5px",
                      margin: "10px 0px",
                      backgroundColor: "#9c27b0",
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </Grid>

          <Grid lg={8} md={7} sm={12} xs={12}>
            <div>
              <div style={{ textAlign: "start", marginBottom: "30px" }}>
                <ToggleButtonGroup
                  color="primary"
                  value={displayedCategory}
                  exclusive
                  onChange={handleChangeToggle}
                  aria-label="Platform"
                >
                  <ToggleButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&.Mui-selected": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    value="All"
                  >
                    All
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&.Mui-selected": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    value="Electronics"
                  >
                    Electronics
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&.Mui-selected": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    value="Appliances"
                  >
                    Appliances
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&.Mui-selected": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    value="Sports"
                  >
                    Sports
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&.Mui-selected": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    value="Fashion"
                  >
                    Fashion
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                {showAllProducts()}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
