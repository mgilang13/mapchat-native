import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firebase from '../../Config/FirebaseConfig';
import User from './User';
class HomeScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  fetchData = async () => {
    this._isMounted = true;
    let uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref(`users/`)
      .on('child_added', (snapshot) => {
        if (snapshot.key !== uid) {
          if (this._isMounted) {
            this.setState((prevState) => {
              return {
                users: prevState.users.concat(snapshot.val()),
              };
            });
          }
        }
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  renderRow = ({item}, index) => {
    console.log('itemHome', item);
    console.log('itemHome fullname', item.fullname);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.navigation.navigate('Chat', {item})}>
        <View style={styles.rowContainer}>
          <Icon style={styles.icon} name="user" size={20} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.txtName}>{item.fullname}</Text>
            <Text style={styles.txtPhone}>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {users} = this.state;
    console.log('users users', users);
    return (
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  icon: {
    alignSelf: 'center',
    paddingRight: 15,
  },
  txtName: {
    fontFamily: 'AirbnbCerealBook',
    fontWeight: 'bold',
  },
});
