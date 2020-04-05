import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firebase from '../../Config/FirebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaleLogo from '../../../assets/images/male.png';
import FemaleLogo from '../../../assets/images/female.png';

export default class AccountScreen extends Component {
  _isMounted = false;
  state = {
    fullname: '',
    email: '',
    gender: '',
  };
  getAccountData = async () => {
    let uid = firebase.auth().currentUser.uid;
    const person = await firebase.database().ref(`users/${uid}`).once('value');

    const fullname = person.val().fullname;
    const email = person.val().email;
    const gender = person.val().gender;
    this.setState({
      fullname: fullname,
      email: email,
      gender: gender,
    });
  };

  componentWillUnmount = () => {
    this.setState({
      fullname: '',
      email: '',
      gender: '',
    });
  };

  componentDidMount = () => {
    this.getAccountData();
  };
  render() {
    let {fullname, email, gender} = this.state;
    if (gender === 0) {
      gender = 'Male';
    } else {
      gender = 'Female';
    }

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={MaleLogo} style={styles.imgLogo} />
        </View>
        <View style={styles.fullBioContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={16} />
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.txtField}>Fullname</Text>
              <Text style={styles.txtContent}>{fullname}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={16} />
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.txtField}>Email</Text>
              <Text style={styles.txtContent}>{email}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Icon name="dna" size={16} />
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.txtField}>Gender</Text>
              <Text style={styles.txtContent}>{gender}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  imgContainer: {
    alignItems: 'center',
  },
  imgLogo: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
  fullBioContainer: {
    flex: 1,
    marginTop: 30,
  },
  rowContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingRight: 15,
  },
  bioContainer: {
    flexDirection: 'column',
  },
  txtField: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 13,
    color: 'grey',
  },
  txtContent: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 16,
    color: 'black',
  },
});
