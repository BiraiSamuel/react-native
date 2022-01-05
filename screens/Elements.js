import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
  CardSix,
  CardSeven,
  CardEight,
  CardNine,
  CardTen,
  CardEleven,
  CardTwelve,
  CardEcomOne,
  CardEcomTwo,
  CardEcomThree,
  CardEcomFour
} from "../components/sharingCards";
import { FloatingAction } from "react-native-floating-action";
import { LinesLoader, DoubleCircleLoader, TextLoader } from 'react-native-indicator';
import {ListItem} from 'native-base';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const { width } = Dimensions.get("screen");

class Elements extends React.Component {
  state = {
    "switch-1": true,
    "switch-2": false,
    products: null,
    category: ''
  };

  componentDidMount() {
    this._interval = setInterval(() => {
      // Your code
      this._getLocationAsync();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert('permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(tabId)
    this.getItems(location.coords.latitude, location.coords.longitude, 6000, tabId);
  }

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });

    async fetchPines() {
      let JsonData, products;

      this.setState({products})
    }

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.state.products !== null?
          this.renderItems()
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <DoubleCircleLoader />
          <TextLoader text="Loading Products" />
        </View>
        }
        </ScrollView>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            this.fab(name);
          }}
        />
      </Block>
    );
  }

  async getItems(lat, lng, radi, tabS){
    console.log(tabS)
    await fetch('https://lisheapp.co.ke/retrieve_popular.php', {
        method: 'POST',
        body: JSON.stringify({

          latitude: lat,
          longitude: lng,
          radius: radi,
          type: tabS,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(typeof responseJson === 'object' && responseJson !== null){
          this.setState({products: responseJson})
          console.log(responseJson)
        } else {
          alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fab(item) {
    const {navigation} = this.props;
    if (item == 'bt_accessibility'){
      navigation.navigate('Settings');
    } else if (item == 'bt_room') {
      navigation.navigate('Maps');
    } else {
      navigation.navigate('Create')
    }
  }

  renderItems() {
    const {navigation} = this.props;
    let distance, items = [];
    const url = "https://lisheapp.co.ke/";
    this.state.products.map((item, i) => {
          distance = item.distance * 1.60934;
          items.push(
            <CardEcomFour
              title={item.name}
              subTitle={
               item.description + "  " + distance.toFixed(2) + " KMS away"
              }
              price={item.price}
              image={{uri: url + item.image}}
              buttonText={"VIEW DETAILS"}
              buttonColor={"#4383FF"}
              onClickButton={() => navigation.navigate('fullScreen', {product: item})}
            />
            );

    });
    return items;
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});

const actions = [
	{
	  text: "Accessibility",
	  icon: require("../assets/imgs/ic_accessibility_white.png"),
	  name: "bt_accessibility",
	  position: 2
  },
  {
	  text: "Adjust Location/Region",
	  icon: require("../assets/imgs/ic_room_white.png"),
	  name: "bt_room",
	  position: 3
	},
	{
	  text: "Create Basket",
	  icon: require("../assets/imgs/add.png"),
	  name: "bt_listing",
	  position: 4
  }
];

export default Elements;
