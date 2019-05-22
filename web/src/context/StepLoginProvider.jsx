import React, { Component, createContext } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

export const stepLoginContext = createContext();
const { Provider } = stepLoginContext;

function validateName(name) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsUsername = [];

  if (name.length === 0) {
    errorsUsername.push("Nama tidak boleh kosong");
  }

  return errorsUsername;
}

function validateEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsEmail = [];
  if (email.length === 0) {
    errorsEmail.push("Email harus memiliki minimal 5 karakter");
  }
  return errorsEmail;
}

function validateAtEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsAtEmail = [];
  if (email.split("").filter(x => x === "@").length !== 1) {
    errorsAtEmail.push("Email harus berisikan @gmail");
  }
  return errorsAtEmail;
}

function validateTitikEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsTitikEmail = [];
  if (email.indexOf(".") === -1) {
    errorsTitikEmail.push("Email harus berisikan setidaknya 1 titik");
  }
  return errorsTitikEmail;
}

function validatePhone(phone) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsPhone = [];

  if (phone.length === 0) {
    errorsPhone.push("Nomor WhatsApp tidak boleh kosong");
  }
  if (phone.indexOf("+62") === 1) {
    errorsPhone.push("Nomor WhatsApp harus diawali dengan +62");
  }

  return errorsPhone;
}

function validateAddress(address) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsAddress = [];

  if (address.length === 0) {
    errorsAddress.push("Alamat tidak boleh kosong");
  }

  return errorsAddress;
}

function validateVariant(variant) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsVariant = [];

  if (variant.length === 0) {
    errorsVariant.push("Alamat tidak boleh kosong");
  }

  return errorsVariant;
}

function validateCount(count) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsCount = [];

  if (count.length === 0) {
    errorsCount.push("Alamat tidak boleh kosong");
  }

  return errorsCount;
}

function validateEmailValid(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class StepLoginProvider extends Component {
  state = {
    activeStep: 0,
    database: [],
    data: [],
    variant: "",
    count: "",
    username: "",
    phone: "",
    email: "",
    selectedDate: null,
    anchorEl: null,
    currentLocale: "id",
    time: null,

    occupation: "",
    city: "",
    bio: "",
    description: "",
    address: "",
    foto: [],
    previewGeneralPhotos: [],
    generalPhotos: [],
    downloadURLs: [],
    uploadProgress: 0,
    filenames: [],
    allowSend: false,

    isUploading: false,

    loading: false,
    isInvalid: false,

    errorsUsername: false,
    errorsAddress: false,
    errorsPhone: false,
    errorsEmail: false,
    errorsAtEmail: false,
    errorsTitikEmail: false,
    errorsDate: false,
    errorAll: false,
    emailInvalid: false,
    errorsVariant: false,
    errorsCount: false,

    kelurahan: "",
    kecamatan: ""
  };

  handleSubmit = e => {
    const { username, email, phone, address, variant, count } = this.state;

    const errorsUsername = validateName(username);
    const errorsAddress = validateAddress(address);
    const errorsPhone = validatePhone(phone);
    const errorsEmail = validateEmail(email);
    const errorsAtEmail = validateAtEmail(email);
    const errorsTitikEmail = validateTitikEmail(email);
    const emailInvalid = validateEmailValid(email);
    const errorsVariant = validateVariant(variant);
    const errorsCount = validateCount(count);
    if (!emailInvalid) {
      this.setState({
        emailInvalid: true
      });
      setTimeout(() => {
        this.setState({
          emailInvalid: false
        });
      }, 5000);
      console.log("Email Tidak Valid");
    }
    if (
      email.length === 0 &&
      username.length === 0 &&
      phone.length === 0 &&
      address.length === 0 &&
      variant.length === 0 &&
      count.length === 0
    ) {
      this.setState({
        errorAll: true
      });
      setTimeout(() => {
        this.setState({
          errorAll: false
        });
      }, 5000);
      console.log("Kosong Semua?? Tidakkk");
    }
    if (errorsUsername.length > 0) {
      this.setState({ errorsUsername: true });
      setTimeout(() => {
        this.setState({
          errorsUsername: false
        });
      }, 5000);
      return console.log(errorsUsername);
    }
    if (errorsEmail.length > 0) {
      this.setState({ errorsEmail: true });
      setTimeout(() => {
        this.setState({
          errorsEmail: false
        });
      }, 5000);
      return console.log(errorsEmail);
    }
    if (errorsAtEmail.length > 0) {
      this.setState({ errorsAtEmail: true });
      setTimeout(() => {
        this.setState({
          errorsAtEmail: false
        });
      }, 5000);
      return console.log(errorsEmail);
    }
    if (errorsTitikEmail.length > 0) {
      this.setState({ errorsTitikEmail: true });
      setTimeout(() => {
        this.setState({
          errorsTitikEmail: false
        });
      }, 5000);
      return console.log(errorsEmail);
    }
    if (errorsPhone.length > 0) {
      this.setState({ errorsPhone: true });
      setTimeout(() => {
        this.setState({
          errorsPhone: false
        });
      }, 5000);
      return console.log(errorsPhone);
    }
    if (errorsAddress.length > 0) {
      this.setState({ errorsAddress: true });
      setTimeout(() => {
        this.setState({
          errorsAddress: false
        });
      }, 5000);
      return console.log(errorsAddress);
    }
    if (errorsVariant.length > 0) {
      this.setState({ errorsVariant: true });
      setTimeout(() => {
        this.setState({
          errorsVariant: false
        });
      }, 5000);
      return console.log(errorsVariant);
    }
    if (errorsCount.length > 0) {
      this.setState({ errorsCount: true });
      setTimeout(() => {
        this.setState({
          errorsCount: false
        });
      }, 5000);
      return console.log(errorsCount);
    }
    console.log("...");
    this.handleNext();
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleNextStepTwo = () => {
    const { selectedDate } = this.state;

    if (selectedDate === null || selectedDate === "null") {
      this.setState({
        errorsDate: true
      });
      setTimeout(() => {
        this.setState({
          errorsDate: false
        });
      }, 5000);
      console.log("Kosong Semua?? Tidakkk", selectedDate);
    } else {
      this.handleNext();
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleSendOrder = () => {
    this.setState({
      allowSend: true
    });
  };

  allowSend = () => {
    this.setState({
      allowSend: true
    });
  };
  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    console.log(this.state);
  };

  isLoading = () => {
    this.setState({
      loading: true
    });
  };

  isLoaded = () => {
    this.setState({
      loading: false
    });
  };

  handleCreateOrder = () => {
    const usersId = localStorage.getItem('userId')
    const { username, address, phone, description, variant, count } = this.state

    let productPrice =
      variant === "Original Banana Nugget" ? 15000 :
        variant === "Chocolate Banana Nugget" ? 16000 :
          variant === "Cheese Banana Nugget" ? 17000 :
            variant === "Special Banana Nugget" ? 18000 : 0
    let totalPrice = productPrice * count;

    axios.post('https://mysqlnaget.herokuapp.com/api/Orders', {
      username,
      phone,
      address,
      description,
      variant,
      count,
      total: totalPrice,
      status: "Success",
      usersId
    })
    this.handleNext();
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  handleTypographyDep = () => {
    return (window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true);
  };

  componentDidMount() {
    let userId = localStorage.getItem('userId');
    axios.get(`https://mysqlnaget.herokuapp.com/api/Users/${userId}`).then(res => {
      this.setState({
        email: res.data.email,
        username: res.data.username,
        phone: res.data.phone,
        address: res.data.address
      });
    })
    this.handleTypographyDep();
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          handleChange: input => e => {
            this.setState({ [input]: e.target.value });
          },
          handleSubmit: () => {
            this.handleSubmit();
          },
          handleNext: () => {
            this.handleNext();
          },
          handleNextStepTwo: () => {
            this.handleNextStepTwo();
          },
          handleBack: () => {
            this.handleBack();
          },
          handleReturnToHome: () => {
            if (this.state.activeStep === 0) {
              this.props.history.push("/");
            }
            if (this.state.activeStep === 3) {
              this.props.history.push("/");
            }
            if (this.state.activeStep > 0 && this.state.activeStep < 3) {
              this.setState(state => ({
                activeStep: state.activeStep - 1
              }));
            }
          },
          handleReset: () => {
            this.handleReset();
          },
          handleSendOrder: () => {
            this.handleSendOrder();
          },
          allowSend: () => {
            this.allowSend();
          },
          handleChangeFoto: () => {
            this.handleChangeFoto();
          },
          isLoading: () => {
            this.isLoading();
          },
          isLoaded: () => {
            this.isLoaded();
          },
          handleCreateOrder: () => {
            this.handleCreateOrder();
          },
          handleMenuOpen: () => {
            this.handleMenuOpen();
          },
          handleMenuClose: () => {
            this.handleMenuClose();
          },
          selectLocale: () => {
            this.selectLocale();
          },
          setFirstStepItem: () => {
            this.setFirstStepItem();
          },
          setSecondStepItem: () => {
            this.setSecondStepItem();
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const deliveredStepLoginProvider = (withRouter(StepLoginProvider));

export { deliveredStepLoginProvider as StepLoginProvider };