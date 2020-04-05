import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from '../../Config/FirebaseConfig';

class FriendScreen extends Component {
  state = {
    data: [],
  };
  componentDidMount = () => {
    this.getFriendListData();
  };
  getFriendListData = async () => {
    let personRef = firebase.database().ref('/users');
    personRef.on('value', (snapshot) => {
      const data = Object.values(snapshot.val());
      this.setState({data});
    });
  };

  showFriend = () => {
    Alert.alert();
  };

  renderFriend = (item, index) => {
    console.log('itemfriend', item);
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.6}
        onPress={this.showFriend}>
        <View style={styles.friendContainer}>
          <View style={styles.listFriend}>
            <Text style={styles.nameStyle}>{item.item.fullname}</Text>
            <Text style={styles.phoneStyle}>{item.item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {data} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}> Friends List</Text>
        <FlatList
          data={this.state.data}
          renderItem={this.renderFriend}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default FriendScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 25,
    marginBottom: 20,
  },
  friendContainer: {
    flex: 1,
    padding: 20,
  },
  listFriend: {
    flexDirection: 'column',
  },
  nameStyle: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 17,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  phoneStyle: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 14,
  },
});
