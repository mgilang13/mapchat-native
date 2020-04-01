import React, {Component} from 'react';
import {View, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import firebase from '../../Config/FirebaseConfig';
import {toastr} from '../../Helpers/Helpers';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {Text, Button} from 'native-base';

let genderValue = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
];

class RegisterForm extends Component {
  state = {
    email: '',
    fullname: '',
    phone: '',
    gender: '',
    password: '',
  };

  onRegisterPress = async () => {
    const {fullname, email, password, phone, gender} = this.state;
    let error = false;
    try {
      if (fullname.trim() === '') {
        error = true;
        throw new Error('Fullname is Required.');
      }

      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      firebase
        .database()
        .ref('users')
        .child(response.user.uid)
        .set({
          uid: response.user.uid,
          email,
          fullname,
          phone,
          gender,
        });

      AsyncStorage.setItem('userToken', response.user.id);
      this.props.dataNavigation.navigate('Login');
      toastr('Success!', 'success');
    } catch (error) {
      toastr(error.message, 'danger');
    }
  };
  render() {
    const {email, password, fullname, phone, gender} = this.state;
    console.log('hai', this.state);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.txtTitle}>Find your friends now!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputData}
            placeholder="Email"
            onChangeText={e => {
              this.setState({email: e});
            }}></TextInput>
          <TextInput
            style={styles.inputData}
            placeholder="Full Name"
            onChangeText={e => {
              this.setState({fullname: e});
            }}></TextInput>
          <TextInput
            style={styles.inputData}
            placeholder="Phone Number"
            onChangeText={e => {
              this.setState({phone: e});
            }}></TextInput>
          <View style={styles.genderContainer}>
            <Text style={styles.genderTitle}>Gender :</Text>

            <RadioForm formHorizontal={true} animation={false}>
              {genderValue.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.gender === i}
                    onPress={gender => {
                      this.setState({
                        gender: gender,
                      });
                    }}
                    borderWidth={2}
                    buttonInnerColor={'#71697A'}
                    buttonOuterColor={
                      this.state.gender === i ? '#71697A' : '#71697A'
                    }
                    buttonSize={17}
                    buttonOuterSize={19}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={gender => {
                      this.setState({
                        gender: gender,
                      });
                    }}
                    labelStyle={{
                      fontSize: 16,
                      color: '#71697A',
                      marginRight: 20,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <TextInput
            style={styles.inputData}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={e => {
              this.setState({password: e});
            }}></TextInput>
        </View>
        <View>
          <Button
            style={styles.submitBtn}
            rounded
            onPress={this.onRegisterPress}>
            <Text style={styles.txtSubmit}>Register</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default RegisterForm;

const styles = StyleSheet.create({
  mainContainer: {},
  txtTitle: {
    fontSize: 21,
    color: '#71697A',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 40,
  },
  inputData: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B5B5C9',
  },
  // Gender Radio Button
  genderContainer: {
    marginTop: 20,
  },
  genderTitle: {
    marginBottom: 20,
    color: '#71697A',
  },
  submitBtn: {
    marginTop: 50,
    backgroundColor: '#71697A',
    alignContent: 'center',
  },
  txtSubmit: {
    fontSize: 18,
    marginLeft: 100,
  },
});
