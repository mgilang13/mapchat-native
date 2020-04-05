import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from '../../Config/FirebaseConfig';
import firebase2 from 'firebase';

class Chat extends Component {
  _isMounted = false;
  state = {
    person: {
      uid: this.props.route.params.item.uid,
      email: this.props.route.params.item.email,
    },
    textMessage: '',
    messageList: [],
  };

  sendMessage = async () => {
    const uid = await firebase.auth().currentUser.uid;

    if (this.state.textMessage.trim().length > 0) {
      let msgId = firebase
        .database()
        .ref('/messages')
        .child(uid)
        .child(this.state.person.uid)
        .push().key;
      let message = {
        message: this.state.textMessage,
        time: firebase2.database.ServerValue.TIMESTAMP,
        from: this.state.person.uid,
      };
      let updates = {};
      updates[`${uid}/${this.state.person.uid}/${msgId}`] = message;
      updates[`${this.state.person.uid}/${uid}/${msgId}`] = message;
      firebase.database().ref('messages').update(updates);

      let message3;
      let latestMessage = this.state.textMessage;

      let updates2 = {};
      let message2 = {
        name: this.state.person.name,
        email: this.state.person.email,
        uid: this.state.person.uid,
        lastMessage: latestMessage,
      };

      const {currentUser} = firebase.auth();

      firebase
        .database()
        .ref(`users/${uid}`)
        .once('value', function (snapshot, prevChildKey) {
          message3 = {
            fullname: snapshot.val().fullname,
            email: currentUser.email,
            uid,
            lastMessage: latestMessage,
          };
        });

      updates2[`${uid}/${this.state.person.uid}`] = message2;
      updates2[`${this.state.person.uid}/${uid}`] = message3;
      firebase.database().ref('/users').update(updates2);

      this.setState({textMessage: ''});
    }
  };

  fetchData = async () => {
    this._isMounted = true;

    const uid = await firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref('messages')
      .child(uid)
      .child(this.state.person.uid)
      .on('child_added', (value) => {
        if (this._isMounted) {
          this.setState((prevState) => {
            return {
              messageList: prevState.messageList.concat(value.val()),
            };
          });
        }
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  renderRow = ({item}) => {
    const {currentUser} = firebase.auth();
    return (
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '60%',
          alignSelf: item.from === currentUser.uid ? 'flex-start' : 'flex-end',
          backgroundColor:
            item.from === currentUser.uid ? '#b9cecc' : '#eaedf0',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: '#2e4963',
            padding: 7,
            fontSize: 16,
          }}>
          {item.message}
        </Text>
        <Text
          style={{
            color: '#2e4963',
            marginTop: 3,
            marginRight: 5,
            fontSize: 11,
          }}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    const params = this.props.route.params;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleChatContainer}>
          <Text style={styles.titleChat}>{params.item.fullname}</Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{padding: 10}}
            ref={(ref) => (this.FlatList = ref)}
            onContentSizeChange={() =>
              this.FlatList.scrollToEnd({animated: true})
            }
            onLayout={() => this.FlatList.scrollToEnd({animated: true})}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.inputMessageContainer}>
            <TextInput
              style={styles.inputMessage}
              onChangeText={(e) => {
                this.setState({textMessage: e});
              }}
              placeholder="Type a message"
            />
            <TouchableOpacity
              style={styles.btnSend}
              onPress={this.sendMessage}
              activeOpacity={0.5}>
              <Icon name="arrow-right" size={20} style={styles.textSend} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#e0e9e8',
  },
  titleChatContainer: {
    display: 'flex',
    marginTop: 20,
    height: 50,
    backgroundColor: '#425c5a',
  },
  titleChat: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#a8b8b7ff',
  },
  inputMessageContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#425c5a',
  },
  inputMessage: {
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingRight: 6,
    paddingLeft: 10,
    paddingBottom: 6,
    width: '75%',
    fontSize: 16,
    borderRadius: 20,
    marginRight: 10,
    fontFamily: 'AirbnbCerealBook',
  },
  btnSend: {
    borderRadius: 20,
    flex: 1,
    width: '20%',
    backgroundColor: '#ffcda3',
    justifyContent: 'center',
  },
  textSend: {
    fontFamily: 'AirbnbCerealBook',
    color: '#425c5a',
    alignSelf: 'center',
  },
});
