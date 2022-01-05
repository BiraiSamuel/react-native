import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { LinesLoader, TextLoader } from 'react-native-indicator';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     userData: {},
     offers: null
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    const { navigation } = this.props;
    let state = navigation.state;
    //console.log(state);
    console.log('profile');
    if(state.params){
      this.setState({userData: navigation.state.params.user});
      console.log('profile');
      console.log(this.state.userData.username);
    }else{
      console.log('no params');
      this.getToken();
    }
   }

   async getToken() {
    const { navigation } = this.props;
    try {
      console.log('tuko hapa')
      let userData = await AsyncStorage.getItem("userToken");
      let deta = JSON.parse(userData);
      if(deta){
        this.setState({userData: deta})
        this.fetchUserdata(deta.id);
      } else {
      alert('Please login first')
      navigation.navigate('Account');
      }
    } catch (error) {
      console.log("Something went wrong", error);
      return null;
    }
  }

  async removeItemValue() {
      try {
          await AsyncStorage.removeItem('userToken');
          return true;
      }
      catch(exception) {
          return false;
      }
  }

async fetchUserdata(id){
  console.log(id)
  return await fetch('https://lisheapp.co.ke/getProfileProducts.php', {
      method: 'POST',
      body: JSON.stringify({

        id: id,

      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      if(typeof responseJson === 'object' && responseJson !== null){
        this.setState({offers: responseJson})
      } else {
        alert(responseJson);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

logout(){
  const { navigation } = this.props;
  this.removeItemValue();
  this.state.userData = {};
  navigation.navigate('Account');
}

  render() {
    const {navigation} = this.props;
    const url = "https://lisheapp.co.ke/";
    return (
      <Block flex style={styles.profile}>
      {this.state.userData !== {}?
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: url + this.state.userData.profile }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    >
                      CONNECTS
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      MESSAGE
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={12}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        2K
                      </Text>
                      <Text size={12}>Orders</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={12}
                        style={{ marginBottom: 4 }}
                      >
                        10
                      </Text>
                      <Text size={12}>Photos</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={12}
                        style={{ marginBottom: 4 }}
                      >
                        89
                      </Text>
                      <Text size={12}>Comments</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {this.state.userData.username}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {this.state.userData.email}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      {this.state.userData.address}
                    </Text>
                    <Button
                      color="transparent"
                      textStyle={{
                        color: "#233DD2",
                        fontWeight: "500",
                        fontSize: 16
                      }}
                      onPress={() => this.logout()}
                    >
                      Logout user
                    </Button>
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Products
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 12 }}
                    >
                      View comments
                    </Button>
                  </Block>
                  {this.state.offers?
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {this.state.offers.map((img, imgIndex) => (
                        <TouchableOpacity onPress={() => navigation.navigate('fullScreen', {product: img})}>
                        <Image
                          source={{ uri: url + img.image }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                        </TouchableOpacity>
                      ))}
                    </Block>
                  </Block>
                  :
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LinesLoader />
                    <TextLoader text="Loading your offers" />
                  </View>
                }
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LinesLoader />
          <TextLoader text="Loading Profile" />
        </View>
        }
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
