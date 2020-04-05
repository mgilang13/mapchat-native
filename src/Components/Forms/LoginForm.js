import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {Button, Root} from 'native-base';
import firebase from '../../Config/FirebaseConfig';
import {toastr} from '../../Helpers/Helpers';
import StatusBar from '../GeneralStatusBar/GeneralStatusBar';
import Logo from '../../../assets/images/logo.png';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  loginProcess = async () => {
    const {email, password} = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await this.props.dataNavigation.navigate('App');
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        toastr('Wrong password.', 'danger');
      } else {
        toastr(errorMessage, 'danger');
      }
      console.log(error);
    }
  };

  registerNavigate = () => {
    this.props.dataNavigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <StatusBar
            backgroundColor="#425c5a"
            barStyle="light-content"></StatusBar>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={Logo} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.iconContainer}>@</Text>
              <TextInput
                autoFocus={true}
                style={styles.inputData}
                placeholderTextColor="#a8b8b7ff"
                placeholder="Email"
                onChangeText={(e) => {
                  this.setState({email: e});
                }}></TextInput>
            </View>
            <View style={styles.fieldContainer}>
              <Icon style={styles.iconContainer} size={17} name="lock" />
              <TextInput
                style={styles.inputData}
                placeholderTextColor="#a8b8b7ff"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(e) => {
                  this.setState({password: e});
                }}></TextInput>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.txtForgotPass}>Forget Password?</Text>
            <Button
              rounded
              onPress={this.loginProcess}
              style={styles.btnSignIn}>
              <Text style={styles.txtBtnSignIn}>Login</Text>
            </Button>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.txtSignUp} onPress={this.registerNavigate}>
              <Text style={{color: '#8ca1a0'}}>Not a member?</Text>{' '}
              <Text style={{color: '#ffcda3', padding: 5}}>Join now</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#425c5a',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {width: 100, height: 100},
  formContainer: {
    marginTop: 150,
  },
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
  btnContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  txtForgotPass: {
    fontFamily: 'AirbnbCerealBook',
    color: '#8ca1a0',
  },
  btnSignIn: {
    width: 200,
    marginTop: 10,
    backgroundColor: '#ffcda3',
    justifyContent: 'center',
  },
  txtBtnSignIn: {
    color: '#425c5a',
    fontSize: 18,
    fontFamily: 'AirbnbCerealBook',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    padding: 50,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  txtSignUp: {
    fontFamily: 'AirbnbCerealBook',
    zIndex: 2,
  },
});
