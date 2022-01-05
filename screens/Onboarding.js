import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {

  constructor(){
      super();
      this.state = {firstLaunch: null};
  }

  componentDidMount(){
    AsyncStorage.getItem("alreadyLaunched").then(value => {
        if(value == null){
             AsyncStorage.setItem('alreadyLaunched', true); // No need to wait for `setItem` to finish, although you might want to handle errors
             this.setState({firstLaunch: true});
        }
        else{
             this.setState({firstLaunch: false});
        }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
  }

  render() {
    const { navigation } = this.props;

    if(this.state.firstLaunch === null){
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    }else if(this.state.firstLaunch == true){
        return (
          <Block flex style={styles.container}>
            <StatusBar hidden />
            <Block flex center>
            <ImageBackground
                source={Images.Onboarding}
                style={{ height, width, zIndex: 1 }}
              />
            </Block>
            <Block center>
              <Image source={Images.Logo} style={styles.logo} />
            </Block>
            <Block flex space="between" style={styles.padded}>
                <Block flex space="around" style={{ zIndex: 2 }}>
                  <Block style={styles.title}>
                    <Block>
                      <Text color="black" size={60}>
                        Lishe App
                      </Text>
                    </Block>
                    <Block>
                      <Text color="black" size={30}>
                        Your location, your business
                      </Text>
                    </Block>
                  </Block>
                  <Block center>
                    <Button
                      style={styles.button}
                      color={argonTheme.COLORS.SECONDARY}
                      onPress={() => navigation.navigate('Home')}
                      textStyle={{ color: argonTheme.COLORS.BLACK }}
                    >
                      Get Started
                    </Button>
                  </Block>
              </Block>
            </Block>
          </Block>
        );
    }else{
      return navigation.navigate('Home');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 100,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
