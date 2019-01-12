import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { createOrderWithoutLogin } from '../redux/actions/orderActions';
import { storage } from '../services/firebaseConfig';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns/esm';

export const stepContext = createContext();
const { Provider } = stepContext;

function validateName(name) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsName = [];

  if (name.length === 0) {
    errorsName.push('Nama tidak boleh kosong');
  }

  return errorsName;
}

function validateEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsEmail = [];
  if (email.length === 0) {
    errorsEmail.push('Email harus memiliki minimal 5 karakter');
  }
  return errorsEmail;
}

function validateAtEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsAtEmail = [];
  if (email.split('').filter(x => x === '@').length !== 1) {
    errorsAtEmail.push('Email harus berisikan @gmail');
  }
  return errorsAtEmail;
}

function validateTitikEmail(email) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsTitikEmail = [];
  if (email.indexOf('.') === -1) {
    errorsTitikEmail.push('Email harus berisikan setidaknya 1 titik');
  }
  return errorsTitikEmail;
}

function validatePhone(phone) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsPhone = [];

  if (phone.length === 0) {
    errorsPhone.push('Nomor WhatsApp tidak boleh kosong');
  }
  if (phone.indexOf('+62') === 1) {
    errorsPhone.push('Nomor WhatsApp harus diawali dengan +62');
  }

  return errorsPhone;
}

function validateAddress(address) {
  // we are going to store errors for all fields
  // in a signle array
  const errorsAddress = [];

  if (address.length === 0) {
    errorsAddress.push('Alamat tidak boleh kosong');
  }

  return errorsAddress;
}

function validateEmailValid(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class StepProvider extends Component {
  state = {
    activeStep: 0,
    database: [],
    data: [],
    name: '',
    phone: '',
    email: '',
    selectedDate: null,
    anchorEl: null,
    currentLocale: 'id',
    time: null,

    occupation: '',
    city: '',
    bio: '',
    catatan: '',
    address: '',
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

    errorsName: false,
    errorsAddress: false,
    errorsPhone: false,
    errorsEmail: false,
    errorsAtEmail: false,
    errorsTitikEmail: false,
    errorsDate: false,
    errorAll: false,
    emailInvalid: false,
    kelurahan: '',
    kecamatan: ''
  };

  handleSubmit = e => {
    const { name, email, phone, address } = this.state;

    const errorsName = validateName(name);
    const errorsAddress = validateAddress(address);
    const errorsPhone = validatePhone(phone);
    const errorsEmail = validateEmail(email);
    const errorsAtEmail = validateAtEmail(email);
    const errorsTitikEmail = validateTitikEmail(email);
    const emailInvalid = validateEmailValid(email);
    if (!emailInvalid) {
      this.setState({
        emailInvalid: true
      });
      setTimeout(() => {
        this.setState({
          emailInvalid: false
        });
      }, 5000);
      console.log('Email Tidak Valid');
    }
    if (
      email.length === 0 &&
      name.length === 0 &&
      phone.length === 0 &&
      address.length === 0
    ) {
      this.setState({
        errorAll: true
      });
      setTimeout(() => {
        this.setState({
          errorAll: false
        });
      }, 5000);
      console.log('Kosong Semua?? Tidakkk');
    }
    if (errorsName.length > 0) {
      this.setState({ errorsName: true });
      setTimeout(() => {
        this.setState({
          errorsName: false
        });
      }, 5000);
      return console.log(errorsName);
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
    console.log(this.state);
    this.handleNext();
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleNextStepTwo = () => {
    const { selectedDate } = this.state;

    if (selectedDate === null || selectedDate === 'null') {
      this.setState({
        errorsDate: true
      });
      setTimeout(() => {
        this.setState({
          errorsDate: false
        });
      }, 5000);
      console.log('Kosong Semua?? Tidakkk', selectedDate);
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

  handleChangeFoto = input => event => {
    var dataPhotos = Array.from(event.target.files);
    this.setState({ [input]: dataPhotos });
  };

  deleteImage = params => {
    const { previewGeneralPhotos } = this.state;
    previewGeneralPhotos.splice(params, 1);
    this.setState({
      previewGeneralPhotos
    });
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

  handleUpload = () => {
    const { previewGeneralPhotos } = this.state;
    if (previewGeneralPhotos !== [] || previewGeneralPhotos.length > 0) {
      const promises = [];
      previewGeneralPhotos.forEach(file => {
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        promises.push(uploadTask);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            this.setState({
              loading: true
            });
          },
          error => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              console.log(downloadURL);
              this.setState(oldState => ({
                downloadURLs: [...oldState.downloadURLs, downloadURL]
              }));
              console.log(this.state.downloadURLs);
              if (
                this.state.downloadURLs.length ===
                this.state.previewGeneralPhotos.length
              ) {
                this.setState({
                  loading: false
                });
                this.allowSend();
                this.isLoaded();
                this.handleNext();
                this.props.createOrder(this.state);
              }
            });
          }
        );
      });

      Promise.all(promises).then(tasks => {
        console.log('all uploads complete', tasks);
      });
    } else {
      this.props.createOrder(this.state);
      this.handleNext();
    }
  };

  handleCreateOrder = () => {
    this.props.createOrder(this.state);
    this.handleNext();
  };

  handleCreateOrderWithPicture = () => {
    const { allowSend } = this.state;
    if (allowSend) {
      console.log('Gambar Terkirim');
      this.props.createOrder(this.state);
      this.handleNext();
    }
    return console.log('Gambar Belum terkirim');
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
    console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTimeChange = date => {
    this.setState({ time: date });
    console.log(format(this.state.time, 'HH:mm'));
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  setFirstStepItem = () => {
    sessionStorage.setItem('name', this.state.name);
    sessionStorage.setItem('email', this.state.email);
    sessionStorage.setItem('phone', this.state.phone);
    sessionStorage.setItem('address', this.state.address);
  };

  setSecondStepItem = () => {
    sessionStorage.setItem('date', this.state.selectedDate);
  };

  getSafe = () => {
    let name = sessionStorage.getItem('name');
    let email = sessionStorage.getItem('email');
    let phone = sessionStorage.getItem('phone');
    let address = sessionStorage.getItem('address');
    let date = sessionStorage.getItem('date');

    try {
      if (name) {
        this.setState({
          name: name
        });
      }
      if (email) {
        this.setState({
          email: email
        });
      }
      if (phone) {
        this.setState({
          phone: phone
        });
      }
      if (address) {
        this.setState({
          address: address
        });
      }
      if (date) {
        this.setState({
          selectedDate: date
        });
      }
    } catch (e) {
      return console.error(e);
    }
  };

  componentDidMount() {
    this.getSafe();
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
            this.props.history.push('/');
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
          deleteImage: () => {
            this.deleteImage();
          },
          onDropGeneral: currentGeneralPhoto => {
            let index;
            for (index = 0; index < currentGeneralPhoto.length; ++index) {
              const file = currentGeneralPhoto[index];
              this.setState(({ previewGeneralPhotos }) => ({
                previewGeneralPhotos: previewGeneralPhotos.concat(file)
              }));
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = event => {
                this.setState({
                  generalPhotos: this.state.generalPhotos.concat([
                    { base64: event.target.result }
                  ])
                });
              };
            }
          },
          isLoading: () => {
            this.isLoading();
          },
          isLoaded: () => {
            this.isLoaded();
          },
          handleUpload: () => {
            this.handleUpload();
          },
          handleCreateOrder: () => {
            this.handleCreateOrder();
          },
          handleCreateOrderWithPicture: () => {
            this.handleCreateOrderWithPicture();
          },
          handleDateChange: date => {
            this.setState({ selectedDate: date });
            console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
          },
          handleTimeChange: () => {
            this.handleTimeChange();
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
const mapDispatchToProps = dispatch => {
  return {
    createOrder: order => {
      dispatch(createOrderWithoutLogin(order));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const deliveredStepProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StepProvider));

export { deliveredStepProvider as StepProvider };
