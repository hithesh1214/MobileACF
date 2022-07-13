import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  StepLabel,
  Snackbar,
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
import Axios from "axios";

function Neworder() {
  const [Servicelist, setServicelist] = useState([]);
  const [Vechilelist, setVechilelist] = useState([]);
  const [Tyrelist, setTyrelist] = useState([]);

  //pricesheet det
  const [priceSheet, setpriceSheet] = useState("");

  //orders stack
  const [Orders, setOrders] = useState([]);
  const [totalcost, settotalcost] = useState(0);

  //each order details
  const [Vechilecat, setVechilecat] = useState("");
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
  const [recDealername, setrecDealername] = useState("");
  const [recDealerContact, setrecDealerContact] = useState("");
  const [rectyresizelist, setrectyresizelist] = useState([]);
  const [recbrandlist, setrecbrandlist] = useState([]);

  //customer details
  var [User, setUser] = useState({});

  //recommends det
  const [recom, setrecom] = useState("");
  const [recommends, setrecommends] = useState([]);
  const [recvechcat, setrecvechcat] = useState("");
  const [rectyresize, setrectyesize] = useState("");
  const [rectyrebrand, setrectyrebrand] = useState("");
  const [recquantity, setrecquantity] = useState("");

  const addrow = () => {
    setOrders((prevarr) => [...prevarr, Orderstemp]);
    // console.log(Orders);
  };

  const updateField = (e) => {
    if (e.target.name === "ContactNo" || e.target.name === "Pincode") {
      setUser({
        ...User,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    } else {
      setUser({
        ...User,
        [e.target.name]: e.target.value,
      });
    }
  };

  const calculate = () => {
    let sum = 0;
    for (let i = 0; i < Orders.length; i++) {
      sum += Orders[i].cost;
    }
    settotalcost(sum);
  };

  //notifier fields
  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const addbill = () => {
    Axios.post("http://localhost:3001/addorder", {
      ACFid: sessionStorage.getItem("user_id"),
      Userdet: User,
      Servicedet: {
        Vechilecat: Vechilecat,
        Orders: Orders,
        Totalcost: totalcost,
      },
      recom: {
        recDealername: recDealername,
        recDealerContact: recDealerContact,
        recvec: recvechcat,
        rectyresize: rectyresize,
        rectyrebrand: rectyrebrand,
        recquantity: recquantity,
      },
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
    });
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
    const recs = JSON.parse(d[0].Recommends);
    setrecommends(recs);
  }, []);
  useEffect(() => {
    Axios.post("http://localhost:3001/gettyresize", {
      Vechid: recvechcat,
    }).then((response) => {
      setrectyresizelist(response.data);
    });
  }, [recvechcat]);
  useEffect(() => {
    Axios.post("http://localhost:3001/gettyrebrand", {
      Sizeid: rectyresize,
    }).then((response) => {
      setrecbrandlist(response.data);
    });
  }, [rectyresize]);

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
                    value={User.ACFLinkedFleet}
                    name="ACFLinkedFleet"
                    onChange={updateField}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </Grid>
                {/* <Grid item xs={1} lg={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                  >
                    Save
                  </Button>
                </Grid> */}
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
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Orders.map((row, index) => {
                      return (
                        <TableRow>
                          <TableCell>{row.Servicename}</TableCell>
                          <TableCell>{row.TyreCompanyname}</TableCell>
                          <TableCell>{row.Quantity}</TableCell>
                          <TableCell>{row.cost}</TableCell>
                          {/* <TableCell>
                            <Fab
                              size="small"
                              color="primary"
                              onClick={Orders.splice(index, 1)}
                            >
                              <RemoveIcon />
                            </Fab>
                          </TableCell> */}
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
                {recom === "Yes" ? (
                  <Grid container spacing={2} className={classes.margin}>
                    <Grid item xs={6}>
                      <InputLabel className={classes.margin}>
                        Dealer Name
                      </InputLabel>
                      <Select
                        className={classes.select}
                        onChange={(e) => {
                          const idx = recommends.findIndex(
                            (r) => r.Dealername === e.target.value
                          );
                          setrecDealername(recommends[idx].Dealername);
                          setrecDealerContact(recommends[idx].DealerContact);
                        }}
                      >
                        {recommends.map((r) => (
                          <MenuItem value={r.Dealername}>
                            {r.Dealername}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className={classes.margin}>
                        Dealer Contact No.
                      </InputLabel>
                      <TextField
                        // variant="filled"
                        disabled
                        value={recDealerContact}
                      ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className={classes.margin}>
                        Vechile Category
                      </InputLabel>
                      <Select
                        className={classes.select}
                        onChange={(e) => {
                          setrecvechcat(e.target.value);
                        }}
                      >
                        {Vechilelist.map((row) => (
                          <MenuItem value={row.Vechileid}>
                            {row.Vechilename}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className={classes.margin}>
                        Tyre Size
                      </InputLabel>
                      <Select
                        className={classes.select}
                        onChange={(e) => {
                          setrectyesize(e.target.value);
                        }}
                      >
                        {rectyresizelist.map((row) => (
                          <MenuItem value={row.Sizeid}>{row.size}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className={classes.margin}>
                        Tyre Brand
                      </InputLabel>
                      <Select
                        className={classes.select}
                        onChange={(e) => {
                          setrectyrebrand(e.target.value);
                        }}
                      >
                        {recbrandlist.map((row) => (
                          <MenuItem value={row.id}>{row.Brand}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4} lg={2} className={classes.margin}>
                      <TextField
                        name="Quantity"
                        label="Quantity"
                        onChange={(e) => {
                          setrecquantity(e.target.value.replace(/\D/g, ""));
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Typography></Typography>
                )}
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
    if (activeStep === 0) {
      if (Object.keys(User).length !== 6) {
        return;
      }
    } else if (activeStep === 1) {
      if (!Vechilecat || !Orders || !totalcost) {
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRegister = () => {
    addbill();
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
              <TextField
                label="total cost"
                variant="outlined"
                value={totalcost}
                className={classes.margin}
                disabled
              ></TextField>
              <Typography>Please check before register</Typography>
            </Paper>
            <Snackbar open={Open} autoHideDuration={3000} onClose={handleClose}>
              <MuiAlert severity="success">{msg}</MuiAlert>
            </Snackbar>
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
                onClick={handleRegister}
              >
                Register Bill
              </Button>
            </div>
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

export default Neworder;
