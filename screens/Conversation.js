import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity,Dimensions, AsyncStorage,TextInput,TouchableHighlight,Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import Input from '../components/Enput';
import argonTheme from '../constants/Theme';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import Icon from '../components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import Hyperlink from 'react-native-hyperlink';
import { LinesLoader, RippleLoader, TextLoader } from 'react-native-indicator';

const { height, width } = Dimensions.get('window')
, bubbleRadius = 12;
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      loading: false,
      data: [],
      user: {},
      error: null,
      searched: '',
      contact: '',
      profile: '',
      newMessage: ''
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    const { navigation } = this.props;
    const url = "https://lisheapp.co.ke/";
    this.getToken();
    this.setState({contact: navigation.state.params.convo.contact_id})
    this.setState({profile: url + navigation.state.params.convo.profile})
    this._interval = setInterval(() => {
      // Your code
      if(this.state.id !== ''){
      this.makeRemoteRequest(this.state.id)
      }
    }, 5000);
  }


  async getToken() {
   try {
     let userData = await AsyncStorage.getItem("userToken");
     let data = JSON.parse(userData);
     this.setState({user: data});
     this.makeRemoteRequest(data.id)
     this.setState({id: data.id})
   } catch (error) {
     console.log("Something went wrong", error);
   }
 }

  async makeRemoteRequest (id) {
    return await fetch('https://lisheapp.co.ke/get_messages.php', {
        method: 'POST',
        body: JSON.stringify({

          id: id,

          contact_id: this.state.contact,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(typeof responseJson === 'object' && responseJson !== null){
            this.setState({
                data: responseJson,
                error: null,
          });
        } else {
          alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.arrayholder = this.state.data;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  // Call API to submit a new comment
  submitComment = async (comment) => {
    const { user } = this.props;
    try {
        await fetch('https://lisheapp.co.ke/add_message.php', {
            method: 'POST',
            body: JSON.stringify({

              id: this.state.id,

              contact_id: this.state.contact,

              message: comment
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
              alert(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    catch (error) {
      alert(error);
    }
  };

  async sendMessage(){
    this.setState({loading: true});
    return await fetch('https://lisheapp.co.ke/add_message.php', {
        method: 'POST',
        body: JSON.stringify({

          id: this.state.id,

          contact_id: this.state.contact,

          message: this.state.newMessage
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
          alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({loading: false})
    this.arrayholder = this.state.data;
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.user.toUpperCase()} ${item.user.toUpperCase()} ${item.user.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  pressed(itemHolder) {
    alert(itemHolder);
  }

  render() {

    const { navigation } = this.props;
    const url = "https://lisheapp.co.ke/";
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LinesLoader />
          <TextLoader text="Please wait" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }} backgroundColor='white'>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={[styles.container, {justifyContent: item.from_id === this.state.id ? 'flex-end' : 'flex-start'}]}>
            {item.from_id !== this.state.id &&
            <TouchableOpacity
                style={styles.image}
                onPress={() => Actions.push('profile', {id: message.fs_id})}
            >
            <View style={{borderRadius: 30,
                overflow: 'hidden',
                aspectRatio: 1}}>
            <Image
              style={{flex: 1}}
              resizeMode="contain"
              source={{uri: url + this.state.profile}}
            />
          </View>
            </TouchableOpacity>
            }
            <View style={[styles.bubble, styles['Bubble']]}>
            <Hyperlink linkDefault linkStyle={{color: 'green'}}>
                <Text>
                <Text style={[styles.message, styles['Message']]}>
                    {item.message}
                </Text>
                {<Text style={styles['Message']}>...{' '}
                    <Text onPress={() => this.setState({expanded: true})} style={{fontWeight: 'bold'}}>
                    read more
                    </Text>
                </Text>}
                </Text>
                <Text style={[styles.time, styles['Time']]}>
                {item.date}
                </Text>
            </Hyperlink>
            </View>
        </View>
          )}
          keyExtractor={item => item.message_id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Input onSubmit={this.submitComment} />
      </View>
    );
  }
}

const styles = {
  button: { paddingLeft: 4, paddingRight: 4},
  button: {
    padding: 12,
    position: 'relative',
  },
  inputAndSendView: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: '#5d1f9c',
    borderStyle: 'solid',
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginTop: 10
  },
  inputMessage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputView: {
    alignItems: 'center',
    flex: 80,
    justifyContent: 'center',
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#5d1f9c',
    height: 40,
    justifyContent: 'center',
    padding: 5,
    width: 80,
  },
  sendButtonView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
  image: {height: 250, width: null, flex: 1},
  leftMargin: {
    marginLeft: 7,
    marginRight: 0,
    marginBottom: 7
  },
  rightMargin: {
    marginLeft: 0,
    marginRight: 7,
    marginBottom: 7
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  price: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 1000,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#7f8c8d',
    position: 'absolute',
    top: '52%'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  bubble: {
    maxWidth: width * 0.7,
    borderTopLeftRadius: bubbleRadius,
    borderTopRightRadius: bubbleRadius,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    marginRight: 10,
    marginBottom: 10
  },
  sentBubble: {
    borderBottomLeftRadius: bubbleRadius,
    backgroundColor: theme.COLORS.BLACK
  },
  receivedBubble: {
    borderBottomRightRadius: bubbleRadius,
    backgroundColor: theme.COLORS.BLACK
  },
  message: {
  },
  receivedMessage: {
    color: theme.COLORS.BLACK
  },
  sentMessage: {
    color: theme.COLORS.BLACK
  },
  time: {
    right: 0,
    fontSize: 11,
    marginTop: 3,
    marginBottom: 7,
    textAlign: 'right',
  },
  receivedTime: {
    color: theme.COLORS.WHITE
  },
  sentTime: {
    color: theme.COLORS.WHITE
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 8
  }
}

export default Conversation;
