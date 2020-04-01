import {Toast} from 'native-base';

const toastr = (message, type) => {
  Toast.show({
    text: message,
    buttonText: 'Okay',
    type: type,
    duration: 10000,
  });
};

export {toastr};
