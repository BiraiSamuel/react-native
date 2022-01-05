/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableHighlight, Alert, Text, AsyncStorage } from 'react-native';
import { Container, Content, View, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
// Our custom files and classes import
import Colors from '../constants';
import { LinesLoader, TextLoader } from 'react-native-indicator';

export default class Checkout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        total: 0,
        card: true,
        paypal: false,
        name: null,
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
        note: '',
        hasError: false,
        errorText: '',
        errorMessage: null,
        userData: {},
        msg: '',
        customade: '',
        loading: false
      };
  }

  componentWillMount() {
    const {navigation } = this.props;
    this.setState({cartItems: navigation.state.params.cartItems});
    var total = 0;
    navigation.state.params.cartItems.map((item) => {
      var price = Number(item.price);
      total += parseFloat(price);
      this.setState({total: total});
    });
    this.getToken();
  }

  render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Content padder>
          <TouchableHighlight onPress={() => Actions.flatlist()}>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>
                <Icon name="ios-warning" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>
                <Text style={{color: '#fdfdfd'}}>CLEAR CHECKOUT INFO</Text>
            </View>
          </TouchableHighlight>
          {this.state.loading?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LinesLoader />
            <TextLoader text="Please wait..." />
          </View>
          :
          <View>
          <View>
            <Text style={{marginTop: 15, fontSize: 18}}>Delivery information</Text>
            {this.state.name == null ? <Item regular style={{marginTop: 7}}>
            <Input placeholder='name' onChangeText={(text) => this.setState({name: text})} placeholderTextColor="#687373" />
            </Item>
            : <Text>{this.state.name}</Text>}
            {this.state.email == null ? <Item regular style={{marginTop: 7}}>
            <Input placeholder='email' onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#687373" />
            </Item>
            : <Text>{this.state.email}</Text>}
            {this.state.phone == null ? <Item regular style={{marginTop: 7}}>
            <Input placeholder='phone' onChangeText={(text) => this.setState({phone: text})} placeholderTextColor="#687373" />
            </Item>
            : <Text>{this.state.phone}</Text>}
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='address' onChangeText={(text) => this.setState({address: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='city' onChangeText={(text) => this.setState({city: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='postcode' onChangeText={(text) => this.setState({postcode: text})} placeholderTextColor="#687373" />
            </Item>
            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Note' onChangeText={(text) => this.setState({note: text})} placeholderTextColor="#687373" />
            </Item>
          </View>
          <Text style={{marginTop: 15, fontSize: 18}}>Your order</Text>
          <View style={styles.invoice}>
            <List>
                {this.renderItems()}
            </List>
            <View style={styles.line} />
            <Grid style={{paddingLeft: 10, paddingRight: 10, marginTop: 7}}>
              <Col>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>Total</Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'right', fontSize: 18, fontWeight: 'bold'}}>{this.state.total+"KSH"}</Text>
              </Col>
            </Grid>
            <Text>{this.state.total >= 300 ? 'delivery fee 30/=' : 'Delivery will cost you an additional 50/='}</Text>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.checkout()} style={{backgroundColor: 'black'}} block iconLeft>
              <Icon name='ios-card' />
              <Text style={{color: '#fdfdfd'}}>Proceed to payment</Text>
            </Button>
          </View>
          </View>
          }
        </Content>
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          style={{marginLeft: 0}}
        >
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.name}
            </Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Description: {item.description}</Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text>
          </Body>
          <Right>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}</Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  async storeToken(user) {
    var jsonOfItem = await AsyncStorage.setItem('userData', JSON.stringify(user));
    alert('Checkout info stored successfully')
  }

  alertInfo(){
    Alert.alert(
      'Order made successfully, just one last thing !',
      'Do you want to save checkout information?',
      [
        {text: 'OK', onPress: () => this.storeToken(this.state.userData), style: 'cancel'},
        {text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  async getToken() {
    const { navigation } = this.props;
    try {
      console.log('tuko hapa')
      let userData = await AsyncStorage.getItem("userToken");
      let deta = JSON.parse(userData);
      if(deta){
        console.log(deta.name);
        this.setState({userData: deta})
        this.setState({name: deta.name})
        this.setState({email: deta.email})
        this.setState({phone: deta.phone})
        console.log('done')
        //this.fetchUserdata(deta.id);
      } else {
      alert('Please login first')
      navigation.navigate('Account');
      }
    } catch (error) {
      console.log("Something went wrong", error);
      return null;
    }
  }

  async checkout() {
    this.state.loading = true;
    var orders = '';
    var custom = '';
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    if(this.state.email===""||this.state.name==="" || this.state.address==="" || this.state.phone===""){
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    this.setState({hasError: false});
    let selPrice,total=0,formData = new FormData();
    this.state.cartItems.map((item, i) => {
      /*var itemi = `$ ${item.name} |`;
      var misc = `${item.id}` + `${item.price}`;
      orders += itemi;
      custom += misc;
      this.state.msg = orders;
      this.state.customade = custom;*/
      selPrice = item.price * parseFloat(item.quantityps);
      total += selPrice;
      formData.append(item.id, item.quantityps);
    });
    formData.append('name', this.state.name);
    formData.append('phone', this.state.phone);
    formData.append('payment_type', "mobile");
    formData.append('description', this.state.note);
    formData.append('total', total);
    formData.append('id', this.state.userData.id);
    formData.append('email', this.state.email);
    formData.append('address', this.state.address);
    return await fetch('https://lisheapp.co.ke/routers/mobi-order.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading: false});
      if(responseJson == "Order made successfully, We'll contact you soon about delivery"){
        alert(responseJson);
      }else{
        alert(responseJson);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  send(name, email, phone, address, city, postcode, note, msg, casted) {
    if(this.state.msg!=null){
      fetch('https://lisheapp.co.ke/backend/make_order.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        name: name,

        email: email,

        phone: phone,

        address: address,

        city: city,

        postcode: postcode,

        note: note,

        ordered: msg,

        custom: casted

      })

    }).then((response) => response.json())
          .then((responseJson) => {

    // Showing response message coming from server after inserting records.
            this.state.loading = false;
            Alert.alert(responseJson);
            this.state.userData = {name: this.state.name, email: this.state.email, phone: this.state.phone, address: this.state.address, city: this.state.city, postcode:this.state.postcode}
            this.alertInfo();
            this.setState({loading: false});

          }).catch((error) => {
            console.error(error);
          });
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

const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#bdc3c7'
  }
};
