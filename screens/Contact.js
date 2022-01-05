/**
* This is the contact page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Icon, Left, Button, Item, Input } from 'native-base';
import {Alert} from 'react-native';

// Our custom files and classes import
import Text from '../components/Text';
import Colors from '../constants/Colors';

export default class Contact extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        subject: '',
        msg: '',
        mobile: ''
      }
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
              <Item>
                  <Icon active name='ios-person' />
                  <Input placeholder='Your name' onChangeText={(text) => this.setState({name: text})} ref={'nameClear'}/>
              </Item>
              <Item>
                  <Icon active name='ios-mail' />
                  <Input placeholder='Your email address' onChangeText={(text) => this.setState({email: text})} ref={'emailClear'}/>
              </Item>
              <Item>
                  <Icon active name='ios-mail' />
                  <Input placeholder='Phone number (optional)' onChangeText={(text) => this.setState({mobile: text})} ref={'mobileClear'}/>
              </Item>
              <Item>
                  <Icon active name='ios-paper' style={{marginTop: -20}}/>
                  <Input
                    placeholder='Message'
                    multiline={true}
                    style={{height: 100, marginTop: -20}}
                    onChangeText={(text) => this.setState({msg: text})} ref={'msgClear'}/>
              </Item>
              <View style={{alignItems: 'center'}}>
                <Button onPress={() => this.send(this.state.name, this.state.mobile, this.state.email, this.state.msg, 'nameClear', 'mobileClear', 'emailClear', 'msgClear')} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
                  <Text style={{color: '#fdfdfd'}}>Send</Text>
                </Button>
              </View>
            </View>
      </Container>
    );
  }

  send(name, mobile, email, msg, nameClear, mobileClear, emailClear, msgClear) {
    if(this.state.msg!=null){ 
      fetch('https://restaurant-d027f.firebaseio.com/contacts.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "mobile": mobile,
          "email": email,
          "msg": msg,
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              if(responseData.name != null ){
                this.refs[nameClear].setNativeProps({text: ''});
                this.refs[mobileClear].setNativeProps({text: ''});
                this.refs[emailClear].setNativeProps({text: ''});
                this.refs[msgClear].setNativeProps({text: ''});
                this.setState({
                    name: null,
                    mobile: null,
                    email:null,
                    msg: null,
                    isSubmited: true,
                  })
                  Alert.alert(
                    'Yey !',
                    'Message submitted successfully',
                    [
                      {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )              
              }
              else{
              Alert.alert(
                'Oops !',
                'Something went wrong',
                [
                  {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
              )
            }

      })
      .done();
    }
      else{
        Alert.alert(
          'Oops !',
          'Press SUBMIT button after entering your Message.',
          [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
          { cancelable: false }
        )        
      }
  }

    _togglePostCard(){
      this.setState({
          isSubmited: false
      })
  }
}
