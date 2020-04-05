import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RegisterForm from '../../Components/Forms/RegisterForm';

class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RegisterForm dataNavigation={this.props.navigation} />
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425c5a',

    padding: 40,
  },
});
