import React from 'react'
import { View, Image, DatePickerIOS,Slider,DatePickerAndroid,TimePickerAndroid, TouchableHighlight, AsyncStorage, Alert, StyleSheet, PixelRatio, TextInput,Dimensions, TouchableOpacity } from 'react-native'
import { Container, Content, Grid, Col, Left, Right,List, ListItem, Body, Radio, Item } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

import haversine from "haversine";
import { Marker, Callout,AnimatedRegion,Polyline,PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { argonTheme, tabs } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import i18n from '../i18n';
import { LinesLoader, TextLoader } from 'react-native-indicator';
import DialogInput from 'react-native-dialog-input';


const LATITUDE_DELTA = 1.1;
const LONGITUDE_DELTA = 1.1;
const LATITUDE = -1.28698;
const LONGITUDE = 36.8228;



const italyCenterLatitude = -1.28698,
      italyCenterLongitude = 36.8228,
      radius = 600000

export default class Create extends React.Component {
  constructor(props) {

    super(props);

    this.state = {

      ImageSource: null,
      data: null,
      Name: '',
      loading: false,
      Price: '',
      Exp: '',
      size: '',
      location: {},
      userData: {},
      Description:'',
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE
      }),
      chosenDate: new Date(),
      chosenAndroidTime: '00:00',
      androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
      value: 50,
      category:'',
      isAlertVisible:false,
      radius: ''
    }
  }

  static navigationOptions = {
    title: 'Offer product & services'
  };

  componentWillMount() {
    const {navigation} = this.props;
    //get the product with id of this.props.product.id from your server
    let state = navigation.state;
    //console.log(state);
    if(state.params){
      this.setState({userData: navigation.state.params.user})
    }else{
      this.getToken();
      console.log("tuko pamoja")
    }
  }

  submit(inputText){
    console.log(inputText);
    this.setState({isAlertVisible:false})
    this.setState({radius:inputText})
  }

  async getToken() {
    const {navigation} = this.props;
    console.log('no parameters');
    try {
      let userData = await AsyncStorage.getItem("userToken");
      let deta = JSON.parse(userData);
      if(deta){
        this.setState({userData: deta})
        console.log(deta)
        this._getLocationAsync();
      } else {
      alert('Please login first')
      navigation.navigate('Account');
      }
    } catch (error) {
      console.log("Something went wrong", error);
      return null;
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({

          ImageSource: source,
          data: response.data

        });
      }
    });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  
  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ androidDate: `${year}-${month + 1}-${day}` });
        console.log()
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };
  
  setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = (minute < 10) ? `0${minute}` : minute;
        const h = (hour < 10) ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        this.setState({ chosenAndroidTime: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert('permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({latitude: location.coords.latitude });
    this.setState({longitude: location.coords.longitude });
  }

  uploadImageToServer = () => {

    fetch('POST', 'http://192.168.100.224/upload_image.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'image_tag', data: this.state.Image_TAG },
        { name: 'price', data: this.state.Price },
        { name: 'exp', data: this.state.Exp },
        { name: 'phone', data: this.state.IdNo },
        { name: 'lat', data: this.state.latitude.toString() },
        { name: 'lon', data: this.state.longitude.toString() }
      ]).then((resp) => {

        var tempMSG = resp.data;

        tempMSG = tempMSG.replace(/^"|"$/g, '');

        Alert.alert(tempMSG);
        console.log(tempMSG);

      }).catch((err) => {
        // ...
      })


    
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };


  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = userData;
      return data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      exif: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
    this.props.navigation.setParams({
      image: this.state.image
    });
  };

  async takePhotoAndUpload() {
    const { navigation } = this.props;
    this.setState({loading: true});
    if(this.state.category==''){
      alert("Please add product category");
      this.setState({loading: false})
      return;
    }
  
    let localUri = this.state.image.uri;
    let filename = localUri.split('/').pop();
  
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    let formData = new FormData();
    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name', this.state.Name);
    formData.append('size', this.state.size);
    formData.append('price', this.state.Price);
    formData.append('user', this.state.userData.id);
    formData.append('description', this.state.Description);
    formData.append('distance', this.state.radius);
    formData.append('category', this.state.category);
    formData.append('lat', this.state.latitude);
    formData.append('lng', this.state.longitude);
    formData.append('expiry', this.state.androidDate);
  
    return await fetch('https://lisheapp.co.ke/backend/add_basket.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading: false})
      if(responseJson == 'Offer created successfully'){
        navigation.navigate('Elements')
        alert(responseJson + ', continue discovery')
      }else{
        alert(responseJson);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleCategory(tem){
    const tab =  [];
    for (var i = 1; i < tabs.categories.length; i++) {
      tab.push(tabs.categories[i].title);
    }
    this.setState({category:tab[tem]});
    if (tab[tem] == 'Transport'){
      this.setState({isAlertVisible: true});
    }  
  }

  render() {
    const { navigation } = this.props;
    const { hasCameraPermission, image } = this.state;
    const tab =  [];
    for (var i = 1; i < tabs.categories.length; i++) {
      tab.push(tabs.categories[i].title);
    }

    return (
      <Container style={{backgroundColor: '#fdfdfd'}}>

      {this.state.loading?<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LinesLoader />
        <TextLoader text="Please wait" />
      </View>:
      <Content padder>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

      <TouchableHighlight onPress={() => navigation.navigate('Elements')}>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>
                <Icon name="ios-basket" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>
                <Text style={{color: '#fdfdfd'}}>Food sharing is food saving</Text>
            </View>
          </TouchableHighlight>

          <Block width={width * 0.6} center>
          <View style={styles.activeImageContainer}>
            {image ? (
              <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
            ) : (
              <View />
            )}
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Button
              onPress={this._getPhotoLibrary.bind(this)}>
              <Text>Product image</Text>
              </Button>
          </View>
          </Block>
        </Block>


        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input right  placeholder="Product name"
          onChangeText={data => this.setState({ Name: data })} iconContent={<Block />} />
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Input right  placeholder="Product size"
        onChangeText={data => this.setState({ size: data })} iconContent={<Block />} />
      </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            success
            right
            placeholder="Price value"
            onChangeText={data => this.setState({ Price: data })}
            iconContent={
              <Block
                middle
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: argonTheme.COLORS.INPUT_SUCCESS
                }}
              >
                <Icon
                  size={11}
                  color={argonTheme.COLORS.ICON}
                  name="g-check"
                  family="ArgonExtra"
                />
              </Block>
            }
          />
        </Block>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
            Platform.OS === 'ios' ? (
              <DatePickerIOS
                date={chosenDate}
                onDateChange={this.setDate}
              />
            ) : (
              <View>
              <Text>Enter offer expiry date, lack of will set it automatically to one day</Text>
                <Button small center onPress={() => this.setDateAndroid()} color="default" style={styles.optionsButton}>
                <Icon name="ios-calendar" size={25} color="rgb(49, 49, 49)" />
                <Text color="white">{this.state.androidDate}</Text>
              </Button>
              </View>
            )
          }
          </View>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            onChangeText={data => this.setState({ Description: data })}
            placeholder="Add descpription"
            iconContent={
              <Icon
                size={11}
                color={argonTheme.COLORS.ICON}
                name="search-zoom-in"
                family="ArgonExtra"
              />
            }
          />
        </Block>
      <Block center>
              <Select
                defaultValue='Product category'
                onSelect={(item)=> this.handleCategory(item)}
                options={tab}
              />
            </Block>
      <Block center>
            <Button onPress={() => this.takePhotoAndUpload()}
            style={styles.button}>Upload image and initialize product</Button>
    </Block>
        </Content>
          }
          <DialogInput isDialogVisible={this.state.isAlertVisible}
            title={"How much distance can you cover?"}
            message={"Enter radius to fetch request, set it as 1 if you're not sure"}
            hintInput ={"distance in kms"}
            submitInput={ (inputText) => {this.submit(inputText)} }
            closeDialog={ () =>this.setState({isAlertVisible:false})}>
      </DialogInput>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingTop: 20
  },

  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },

  activeImageContainer: {
    width: width * 0.6,
    height: height* 0.2,
    backgroundColor: "#eee",
    borderBottomWidth: 0.8,
    borderColor: "#fff",
  },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

  },

  TextInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  }

});