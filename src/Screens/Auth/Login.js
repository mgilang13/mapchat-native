import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import LoginForm from '../../Components/Forms/LoginForm';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm dataNavigation={this.props.navigation} />
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425c5a',
    padding: 40,
  },
});
