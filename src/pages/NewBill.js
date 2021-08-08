import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  StepLabel,
  Step,
  Stepper,
  makeStyles,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";

function NewBill() {
  const [Servicelist, setServicelist] = useState([]);
  const [Vechilelist, setVechilelist] = useState([]);
  const [Tyrelist, setTyrelist] = useState([]);
  const [Vechilecat, setVechilecat] = useState("");
  const [priceSheet, setpriceSheet] = useState("");

  //orders stack
  const [Orders, setOrders] = useState([]);
  const [totalcost, settotalcost] = useState(0);

  //each order details
  const [Service, setService] = useState("");
  const [Tyre, setTyre] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [cost, setcost] = useState("");
  const Orderstemp = {
    Servicename: Service,
    TyreCompanyname: Tyre,
    Quantity: Quantity,
    cost: cost,
  };

  //customer details
  const [linked, setlinked] = useState("");
  const [recom, setrecom] = useState("");
  var [User, setUser] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    Pincode: "",
    ContactNo: "",
    ACFLinkedFleet: linked,
  });

  const addrow = () => {
    setOrders((prevarr) => [...prevarr, Orderstemp]);
    // console.log(Orders);
  };

  const updateField = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };

  const calculate = () => {
    let sum = 0;
    for (let i = 0; i < Orders.length; i++) {
      sum += Orders[i].cost;
    }
    settotalcost(sum);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getService").then((response) => {
      // console.log(response.data);
      setServicelist(response.data);
    });
    Axios.get("http://localhost:3001/getTyre").then((response) => {
      // console.log(response.data);
      setTyrelist(response.data);
    });
    Axios.get("http://localhost:3001/getVechile").then((response) => {
      // console.log(response.data);
      setVechilelist(response.data);
    });
    const d = JSON.parse(sessionStorage.getItem("data"));
    const prices = JSON.parse(d[0].Pricesheet);
    setpriceSheet(prices);
    // console.log(prices);
    // console.log(User);
  }, []);

  const useStyles = makeStyles((theme) => ({
    backButton: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0),
    },
    margin: {
      margin: theme.spacing(1),
    },
    select: {
      margin: theme.spacing(1),
      width: "100%",
    },
    vechselect: {
      width: "50%",
    },
    linked: {
      margin: theme.spacing(1),
      width: "20%",
    },
  }));
  function getSteps() {
    return ["Add Customer Details", "Add Service Details", "Other Details"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">Fill Customer Details</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="FirstName"
                    value={User.FirstName}
                    className={classes.margin}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="LastName"
                    value={User.LastName}
                    className={classes.margin}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    maxRows={3}
                    label="Address"
                    name="Address"
                    value={User.Address}
                    className={classes.margin}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Pin Code"
                    name="Pincode"
                    value={User.Pincode}
                    className={classes.margin}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Contact No."
                    name="ContactNo"
                    value={User.ContactNo}
                    className={classes.margin}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={8} lg={5}>
                  <label className={classes.margin}>ACF Linked Fleet</label>
                  <Select
                    variant="outlined"
                    value={linked}
                    onChange={(e) => {
                      setlinked(e.target.value);
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1} lg={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 1:
        return (
          <div>
            <Paper className={classes.paper} xs={12} lg={6}>
              <InputLabel className={classes.margin}>
                Vechile Category
              </InputLabel>
              <Select
                className={classes.vechselect}
                onChange={(e) => {
                  setVechilecat(e.target.value);
                }}
              >
                {Vechilelist.map((row) => (
                  <MenuItem value={row.Vechilename}>{row.Vechilename}</MenuItem>
                ))}
              </Select>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <InputLabel className={classes.margin}>
                    Type of Service
                  </InputLabel>
                  <Select
                    className={classes.select}
                    name="Servicename"
                    onChange={(e) => {
                      setService(e.target.value);
                    }}
                  >
                    {Servicelist.map((row) => (
                      <MenuItem value={row.Servicename}>
                        {row.Servicename}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <InputLabel className={classes.select}>Company</InputLabel>
                  <Select
                    className={classes.select}
                    name="TyreCompanyname"
                    onChange={(e) => {
                      setTyre(e.target.value);
                    }}
                  >
                    {Tyrelist.map((row) => (
                      <MenuItem value={row.TyreCompanyname}>
                        {row.TyreCompanyname}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4} lg={2} className={classes.margin}>
                  <TextField
                    name="Quantity"
                    label="Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setcost(
                        e.target.value * priceSheet[Service + Vechilecat]
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2} lg={1}>
                  <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={addrow}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Type</TableCell>
                      <TableCell>Tyre Company</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Orders.map((row) => {
                      return (
                        <TableRow>
                          <TableCell>{row.Servicename}</TableCell>
                          <TableCell>{row.TyreCompanyname}</TableCell>
                          <TableCell>{row.Quantity}</TableCell>
                          <TableCell>{row.cost}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container spacing={1} className={classes.margin}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={calculate}
                  >
                    Calculate
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="total cost"
                    variant="outlined"
                    value={totalcost}
                    className={classes.margin}
                    disabled
                  ></TextField>
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 2:
        return (
          <div>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Typography>
                    Have you recommended a customer for new tyre purchase
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Select
                    variant="outlined"
                    value={recom}
                    onChange={(e) => {
                      setrecom(e.target.value);
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.select}>
                    <InputLabel>Dealer Name</InputLabel>
                    <Select>
                      <MenuItem>BHaskar Rao</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.select}>
                    <InputLabel className={classes.margin}>
                      ContactNo
                    </InputLabel>
                    <TextField variant="filled" disabled></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.select}>
                    <InputLabel className={classes.margin}>TyreType</InputLabel>
                    <TextField variant="filled" disabled></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.backButton}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewBill;
