import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Image,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import { Thumbnail } from "native-base";
import { LinesLoader, TextLoader } from 'react-native-indicator';

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      photoLibrary: null,
      signup: true,
      hasCameraPermission: null,
      email: '',
      user: '',
      name: '',
      username: '',
      password: '',
      phone:'',
      rePassword: '',
      hasError: false,
      errorText: '',
      errorMessage: null,
      index: 0,
      loading: false,
      address: ''
    };
  }

  async componentDidMount() {
    //- get camera roll permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
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
    this.setState({loading: true})

    let localUri = this.state.image.uri;
    let filename = localUri.split('/').pop();
    this.validatePass(this.state.password);

    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name', this.state.name);
    formData.append('username', this.state.username);
    formData.append('phone', this.state.phone);
    formData.append('email', this.state.email);
    formData.append('address', this.state.address);
    formData.append('password', this.state.password);

    return await fetch('https://lisheapp.co.ke/routers/signup.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading: false});
      if(responseJson == 'Profile created successfully1'){
        this.setState({signup: !this.state.signup})
        alert(responseJson + ', login to continue')
      }else{
        alert(responseJson);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async login(){
    const { navigation } = this.props;
    this.setState({loading: true});
    //let formData = new FormData();
    //formData.append('email', this.state.email);
    //formData.append('password', this.state.password);

    return await fetch('https://lisheapp.co.ke/routers/mobi-login.php', {
      method: 'POST',
      body: JSON.stringify({

        username: this.state.user,

        password: this.state.password

      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
        this.setState({loading: false})
        if (typeof responseJson === 'object' && responseJson !== null){
          this.storeToken(responseJson);
          navigation.navigate('Profile', {user: responseJson});
        }else{
          alert(responseJson);
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async storeToken(user) {
    let userData = user;
    let jsonOfItem = await AsyncStorage.setItem('userToken', JSON.stringify(userData));
    Alert.alert(`Stored user credentials`);
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  validatePass(str) {
    var regex = new RegExp("[A-Z]+"); // Check for uppercase first
    if(regex.test(str) == true) {
        regex = new RegExp("[0-9]+"); // Now we check for numbers
        if(regex.test(str) == true) {
            regex = new RegExp("[a-z]+"); // checking now for lowercase
            if(regex.test(str) == true) {
                this.setState({index: 1});
            } else this.setState({index: 2});;
        } else this.setState({index: 3});;
    } else this.setState({index: 4});;
}


  render() {
    const { navigation } = this.props;
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    } else {
    return (
      <Block flex middle>
        <StatusBar hidden />
        {this.state.loading?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LinesLoader />
          <TextLoader text="Please wait..." />
        </View>
        :
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
            <ScrollView>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Already Have an account?
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }} onPress={()=> this.setState({signup: !this.state.signup})}>
                    <Block row>
                      <Icon
                        name="ios-bookmark"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      {this.state.signup?<Text style={styles.socialTextButtons}>LOGIN</Text>: <Text style={styles.socialTextButtons}>SIGNUP</Text>}
                    </Block>
                  </Button>
                </Block>
              </Block>
              {this.state.signup?
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        onChangeText={(text) => this.setState({name: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Username"
                        onChangeText={(text) => this.setState({username: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="palette"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={(text) => this.setState({email: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Phone"
                        onChangeText={(text) => this.setState({phone: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="support"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Address"
                        onChangeText={(text) => this.setState({address: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="support"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(text) => this.setState({password: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      {this.state.error?
                        <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          this.state.errorText
                        </Text>
                        </Block>
                        :
                        <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                              {" "}
                              strong
                        </Text>
                        </Block>
                      }
                    </Block>
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
                        <Text>profile photo</Text>
                        </Button>
                    </View>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        onPress={() => navigation.navigate('Terms')}
                        color="transparent"
                        checked={()=> userAgreement = true}
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => this.takePhotoAndUpload()}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
              :
              <Block flex>
                  <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    or login to your account
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Username"
                        onChangeText={(text) => this.setState({user: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="palette"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(text) => this.setState({password: text})}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                  </KeyboardAvoidingView>
                  <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => this.login()}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                  </Block>
              }
              </ScrollView>
            </Block>
          </Block>
        </ImageBackground>
        }
      </Block>
    );
  }
}
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  activeImageContainer: {
    width: width * 0.6,
    height: height* 0.2,
    backgroundColor: "#eee",
    borderBottomWidth: 0.8,
    borderColor: "#fff",
  },
  photosContainer: {
    alignItems: "flex-start",
    width: Dimensions.get("window").width
  },
  photo: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    borderWidth: 0.5,
    borderColor: "#fff"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  emailValidity:{
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
