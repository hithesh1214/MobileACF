import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepLabel } from "@material-ui/core";
import { StepContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import Axios from "axios";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AddIcon from "@material-ui/icons/Add";

function ACFMaster() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUid, setRBUid] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [ABUid, setABUid] = useState("");
  const [ABUlist, setABUlist] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  //Services vars
  const [Servicelist, setServicelist] = useState([]);
  const [Vechilelist, setVechilelist] = useState([]);

  // User details
  var [User, setUser] = useState({
    // ShopName: "",
    // OwnerName: "",
    // ContactNo: "",
    // ShopAddress: "",
    // Pincode: "",
    // Emailid: "",
    // Username: "",
    // Password: "",
    // Latitude: "",
    // Longitude: "",
  });
  var [Pricesheet, setPricesheet] = useState({});

  //recomendation det
  const [Dealername, setDealername] = useState("");
  const [DealerContact, setDealerContact] = useState("");
  const [recommends, setrecommends] = useState([]);
  const recomtemp = {
    Dealername: Dealername,
    DealerContact: DealerContact,
  };

  //email check
  const [isValidEmail, setisValidEmail] = useState(false);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setisValidEmail(true);
    } else {
      setisValidEmail(false);
    }
  };

  const addUser = () => {
    Axios.post("http://localhost:3001/addACF", {
      User: User,
      Pricesheet: Pricesheet,
      Recommends: recommends,
      SBUid: SBUid,
      RBUid: RBUid,
      ABUid: ABUid,
    }).then((response) => {
      setsever(true);
      setmsg(response.data.message);
      setOpen(true);
    });
  };

  const addrow = () => {
    setrecommends((prevarr) => [...prevarr, recomtemp]);
    // console.log(Orders);
  };

  const updatePricesheet = (e) => {
    setPricesheet({
      ...Pricesheet,
      [e.target.name]: e.target.value.replace(/\D/g, ""),
    });
  };

  const updateField = (e) => {
    if (e.target.name === "ContactNo" || e.target.name === "Pincode") {
      setUser({
        ...User,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    } else if (e.target.name === "Emailid") {
      validateEmail(e);
      setUser({
        ...User,
        [e.target.name]: e.target.value,
      });
    } else {
      setUser({
        ...User,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (SBUid === "") {
        setmsg("Please select the SBU");
        setOpen(true);
        return;
      } else if (RBUid === "") {
        setmsg("Please select the RBU");
        setOpen(true);
        return;
      } else if (ABUid === "") {
        setmsg("Please select the ABU");
        setOpen(true);
        return;
      } else if (Object.keys(User).length !== 8) {
        setmsg("Please enter all the details");
        setOpen(true);
        return;
      } else if (!isValidEmail) {
        setmsg("Enter a valid email");
        setOpen(true);
        return;
      }
    } else if (activeStep === 1) {
      if (
        Object.keys(Pricesheet).length !==
        Vechilelist.length * Servicelist.length
      ) {
        setmsg("Enter all the values");
        setOpen(true);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //notifier fields
  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [sever, setsever] = useState(false);
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const selectLoc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRegister = () => {
    addUser();
  };

  function getSteps() {
    return [
      "Enter ACF details",
      "ACF Price Sheet",
      "ACF Recommendations",
      "ACF Credentials",
    ];
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      // console.log(response.data);
      setSBUlist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getService").then((response) => {
      //   console.log(response.data);
      setServicelist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getVechile").then((response) => {
      //   console.log(response.data);
      setVechilelist(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getRBU", {
      SBUid: SBUid,
    }).then((response) => {
      //   console.log(response.data);
      setRBUlist(response.data);
    });
  }, [SBUid]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getABU", {
      RBUid: RBUid,
    }).then((response) => {
      setABUlist(response.data);
    });
  }, [RBUid]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={classes.steps}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Shop Name"
                    name="ShopName"
                    value={User.ShopName}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Owner Name"
                    name="OwnerName"
                    value={User.OwnerName}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Shop Address"
                    name="ShopAddress"
                    multiline
                    maxRows={3}
                    value={User.ShopAddress}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Contact No."
                    name="ContactNo"
                    value={User.ContactNo}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Pin code"
                    name="Pincode"
                    value={User.Pincode}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Latitude"
                    name="Latitude"
                    value={User.Latitude}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Longitude"
                    name="Longitude"
                    value={User.Longitude}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item lg={2}>
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="medium"
                    className={classes.margin}
                    onClick={selectLoc}
                  >
                    <AddLocationIcon />
                  </Fab>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    helperText={`${isValidEmail ? "" : "enter a valid email"}`}
                    variant="outlined"
                    margin="normal"
                    required
                    label="Email id"
                    name="Emailid"
                    value={User.Emailid}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 1:
        return (
          <div className={classes.steps}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type of Service\Type of Vechile</TableCell>
                    {Object.entries(Vechilelist).map((v) => (
                      <TableCell>{v[1].Vechilename}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Servicelist).map((s) => (
                    <TableRow>
                      <TableCell>{s[1].Servicename}</TableCell>
                      {Object.entries(Vechilelist).map((v) => (
                        <TableCell>
                          <TextField
                            variant="filled"
                            value={
                              Pricesheet[s[1].Servicename + v[1].Vechilename]
                            }
                            name={s[1].Servicename + v[1].Vechilename}
                            onChange={updatePricesheet}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      case 2:
        return (
          <div>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Dealer name"
                    name="Dealer name"
                    value={recomtemp.Dealername}
                    className={classes.input}
                    onChange={(e) => {
                      setDealername(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Dealer Contact No."
                    name="Dealer Contact No."
                    value={recomtemp.DealerContact}
                    className={classes.input}
                    onChange={(e) => {
                      setDealerContact(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={2} lg={2}>
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
                <Grid item lg={10}>
                  <List>
                    {recommends.map((r) => (
                      <ListItem>
                        <ListItemText
                          primary={r.Dealername}
                          secondary={r.DealerContact}
                        ></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      case 3:
        return (
          <div className={classes.steps}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Username"
                    name="Username"
                    value={User.Username}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password"
                    name="Password"
                    value={User.Password}
                    className={classes.input}
                    onChange={updateField}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(3, 0),
    },
    select: {
      margin: theme.spacing(1),
      width: theme.spacing(20),
    },
    input: {
      margin: theme.spacing(1),
      width: "100%",
    },

    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    steps: {
      width: theme.spacing(100),
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1, 0),
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">ACF Registration</Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl className={classes.select}>
              <InputLabel>SBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={SBUid}
                onChange={(e) => {
                  setSBUid(e.target.value);
                }}
              >
                {SBUlist.map((row) => (
                  <MenuItem value={row.SBUid}>{row.SBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl className={classes.select}>
              <InputLabel>RBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={RBUid}
                onChange={(e) => {
                  setRBUid(e.target.value);
                }}
              >
                {Object.entries(RBUlist).map((row) => (
                  <MenuItem value={row[1].RBUid}>{row[1].RBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl className={classes.select}>
              <InputLabel>ABU Name</InputLabel>
              <Select
                autoWidth="true"
                value={ABUid}
                onChange={(e) => {
                  setABUid(e.target.value);
                }}
              >
                {Object.entries(ABUlist).map((row) => (
                  <MenuItem value={row[1].ABUid}>{row[1].ABUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={Open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert severity={sever ? "success" : "error"}>{msg}</MuiAlert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleRegister} className={classes.button}>
              Register
            </Button>
          </Paper>
        )}
      </Paper>
    </div>
  );
}

export default ACFMaster;
