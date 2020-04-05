import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, TextInput, StyleSheet, AsyncStorage, Image} from 'react-native';
import firebase from '../../Config/FirebaseConfig';
import {toastr} from '../../Helpers/Helpers';
import Logo from '../../../assets/images/logo.png';
import StatusBar from '../GeneralStatusBar/GeneralStatusBar';

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
      let data = {
        email: email,
        friendList: '',
        fullname: fullname,
        gender: gender,
        phone: phone,
      };
      if (fullname.trim() === '') {
        error = true;
        throw new Error('Fullname is Required.');
      }

      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      firebase.database().ref('users').child(response.user.uid).set({
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

  backBtn = () => {
    this.props.dataNavigation.navigate('Login');
  };
  render() {
    const {email, password, fullname, phone, gender} = this.state;
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          backgroundColor="#425c5a"
          barStyle="light-content"></StatusBar>
        <Icon
          onPress={this.backBtn}
          name="arrow-left"
          size={20}
          style={{position: 'absolute', color: '#ffcda3'}}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={Logo} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.iconContainer}>@</Text>
            <TextInput
              placeholderTextColor="#a8b8b7ff"
              style={styles.inputData}
              placeholder="Email"
              onChangeText={(e) => {
                this.setState({email: e});
              }}></TextInput>
          </View>
          <View style={styles.fieldContainer}>
            <Icon style={styles.iconContainer} size={17} name="user-circle" />
            <TextInput
              placeholderTextColor="#a8b8b7ff"
              style={styles.inputData}
              placeholder="Full Name"
              onChangeText={(e) => {
                this.setState({fullname: e});
              }}></TextInput>
          </View>
          <View style={styles.fieldContainer}>
            <Icon style={styles.iconContainer} size={17} name="mobile-alt" />
            <TextInput
              keyboardType="number-pad"
              placeholderTextColor="#a8b8b7ff"
              style={styles.inputData}
              placeholder="Phone Number"
              onChangeText={(e) => {
                this.setState({phone: e});
              }}></TextInput>
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.genderTitle}>Gender :</Text>

            <RadioForm formHorizontal={true} animation={false}>
              {genderValue.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.gender === i}
                    onPress={(gender) => {
                      this.setState({
                        gender: gender,
                      });
                    }}
                    borderWidth={2}
                    buttonInnerColor={'#a8b8b7ff'}
                    buttonOuterColor={
                      this.state.gender === i ? '#a8b8b7ff' : '#a8b8b7ff'
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
                    onPress={(gender) => {
                      this.setState({
                        gender: gender,
                      });
                    }}
                    labelStyle={{
                      fontSize: 16,
                      color: '#a8b8b7ff',
                      marginRight: 20,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={styles.fieldContainer}>
            <Icon style={styles.iconContainer} size={17} name="lock" />
            <TextInput
              placeholderTextColor="#a8b8b7"
              style={styles.inputData}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(e) => {
                this.setState({password: e});
              }}></TextInput>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
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
  mainContainer: {flex: 1, backgroundColor: '#425c5a'},
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {width: 100, height: 100},
  formContainer: {},
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginTop: 30,
    color: '#ffcda3',
    paddingRight: 10,
    paddingLeft: 10,
    height: 35,
    borderRightWidth: 2,
    borderRightColor: '#a0947f',
    borderBottomWidth: 2,
    borderBottomColor: '#a0947f',
  },
  inputData: {
    paddingLeft: 10,
    flex: 1,
    maxWidth: '100%',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#a0947f',
    color: '#a8b8b7',
    fontFamily: 'AirbnbCerealBook',
  },
  // Gender Radio Button
  genderContainer: {
    marginTop: 20,
    marginLeft: 40,
  },
  genderTitle: {
    marginBottom: 20,
    color: '#a8b8b7ff',
  },
  submitBtn: {
    width: 200,
    marginTop: 50,
    backgroundColor: '#ffcda3',
    justifyContent: 'center',
  },
  txtSubmit: {
    color: '#425c5a',
    fontSize: 18,
    fontFamily: 'AirbnbCerealBook',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
