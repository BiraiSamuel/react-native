import { Dimensions,SafeAreaView, ImageBackground, ScrollView, Image, AsyncStorage, Animated,TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import { View, Root, Toast, Text } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ENTRIES1 } from '../constants/entries';
import SliderEntry from '../components/SliderEntry';
import { Switch } from 'react-native-gesture-handler';
import { Block, theme } from "galio-framework";
import Icon from '../components/Icon';
import MapView, { Marker, Callout,AnimatedRegion,Polyline,PROVIDER_GOOGLE } from "react-native-maps";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { LinesLoader, TextLoader } from 'react-native-indicator';
import { sliderWidth, itemWidth } from "../styles/SliderEntry.style";
import { Ionicons } from '@expo/vector-icons';
import * as Font from "expo-font";
import { Rating, AirbnbRating } from 'react-native-ratings';

const { width , height } = Dimensions.get('window');

const thumbMeasure = (width - 48 - 32) / 3;
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class FullScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          product: [],
          products: [],
          type: '',
          userData: null,
          data: null,
          loading: true
        };
    }

    async componentDidMount() {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      this.setState({ loading: false })
    }

    componentWillMount() {
      const { navigation } = this.props;
      this.setState({product: navigation.state.params.product})
      this.getToken();
      this.getSimilar(navigation.state.params.product);
    }

    async getToken() {
      try {
        let userData = await AsyncStorage.getItem("userToken");
        let data = JSON.parse(userData);
        this.setState({userData: data})
      } catch (error) {
        console.log("Something went wrong", error);
      }
   }

    _renderItem ({item, index}) {
        return (
            <View style={{ height: viewportHeight }} /> // or { flex: 1 } for responsive height
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
      return <SliderEntry data={item} even={true} />;
  }


    async ratingCompleted(rating, id) {
      console.log("Rating is: " + rating);
      await fetch('https://lisheapp.co.ke/backend/add_rating.php', {
        method: 'POST',
        body: JSON.stringify({

          product_id: id,

          user_id: this.state.userData.id,

          rating: rating
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

    render () {
      let icon="star";
      const url = "https://lisheapp.co.ke/";
      let nbStar = 3;
      const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
      const { navigation } = this.props;
      let convor = [];
      let imageUrl;
      convor['contact_id'] = this.state.product.user_id;
      convor['profile'] = this.state.product.image;
      imageUrl = url + this.state.product.image;
        return (
          <Root>
          <Block flex style={styles.profile}>
          {this.state.loading != true?
            <Block flex>
              <ImageBackground
                source={Images.ProfileBackground}
                style={styles.profileContainer}
                imageStyle={{opacity: 0.5}}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ width, marginTop: '25%' }}
                >
                  <Block flex style={styles.profileCard}>
                    <Block middle style={styles.avatarContainer}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.avatar}
                      />
                    </Block>
                    <Block style={styles.info}>
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={28} color="#32325D">
                        Provider Options
                      </Text>
                    </Block>
                      <Block
                        middle
                        row
                        space="evenly"
                        style={{ marginTop: 20, paddingBottom: 24 }}
                      >
                        <Button
                          small
                          style={{ backgroundColor: argonTheme.COLORS.INFO }}
                          onPress={() => this.addContact()}
                        >
                          CONNECT
                        </Button>
                        <Button
                          small
                          style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                          onPress={() => navigation.navigate('Conversation', {convo: convor})}
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
                          {this.state.product.name}
                        </Text>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                          {this.state.product.type}
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
                          {this.state.product.description}
                        </Text>
                        <Rating
                          showRating
                          onFinishRating={(rating)=>this.ratingCompleted(rating,this.state.product.id)}
                          style={{ paddingVertical: 10 }}
                        />
                        <Button
                          color="tranluscent"
                          textStyle={{
                            color: "#233DD2",
                            fontWeight: "500",
                            fontSize: 16
                          }}
                          onPress={() => this.addToCart()}
                        >
                        <Text>Add {this.state.product.name} to Cart</Text>
                        </Button>
                        <Text size={12}  color={"#5E72E4"} bold>Similar Goods</Text>
                        <Animated.ScrollView
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={width}
                        style={styles.scrollView}
                        onScroll={Animated.event(
                          [
                            {
                              nativeEvent: {
                                contentOffset: {
                                  x: this.animation,
                                },
                              },
                            },
                          ],
                          { useNativeDriver: true }
                        )}
                      >
                      { example3 }
                      </Animated.ScrollView>
                      </Block>
                      <Block
                        row
                        style={{ paddingVertical: 14, alignItems: "baseline" }}
                      >
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                          <Block flex space="between" style={styles.cardDescription}>
                            <Text size={12}  color={"#5E72E4"} bold>Barter trade on this</Text>
                          </Block>
                        </TouchableWithoutFeedback>
                      </Block>
                      <Block
                        row
                        style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                      >
                        <Button
                          small
                          color="transparent"
                          textStyle={{ color: "#5E72E4", fontSize: 12 }}
                          onPress={()=> navigation.navigate('Comments', {product: this.state.product, user: this.state.userData})}
                        >
                          View comments
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </ScrollView>
              </ImageBackground>
            </Block>
              :
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <LinesLoader />
              <TextLoader text="Please wait" />
            </View>
            }
          </Block>
          </Root>
        );
    }

    async addContact(){
      let id,user;
      id = this.state.product.user_id;
      user = this.state.userData.id;
      await fetch('https://lisheapp.co.ke/add_contact.php', {
        method: 'POST',
        body: JSON.stringify({

          user: user,

          contact: id,

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

    layoutExample (number, title, type) {
      const isTinder = type === 'tinder';
      return (
          <View style={[styles.exampleContainer, styles.exampleContainerDark ]}>
              <Carousel
                data={this.state.products}
                renderItem={this._renderDarkItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={SLIDER_1_FIRST_ITEM}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={type}
                loop={true}
                snapOnAndroid={true}
                showsHorizontalScrollIndicator={false}
                slideStyle={styles.slide}
                inactiveSlideScale={1}
                inactiveSlideOpacity={0.8}
                removeClippedSubviews={false}
              />
          </View>
      );
    }

  addToCart() {
    var product = this.state.product;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART", JSON.stringify(items));
      }
      Toast.show({
        text: 'Product added to your cart !',
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 3000
      });
    });
  }

  async getSimilar(produce){
    let type = produce.type;
    console.log(type);
    await fetch('https://lisheapp.co.ke/getSimilar.php', {
      method: 'POST',
      body: JSON.stringify({
        type: type
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({products: responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

const styles = {
    icon: {
      color: 'white',
      fontSize: 46,
      position: 'absolute',
      top: 15,
      right: 15,
      width: 40,
      height: 40
    },
    profile: {
      marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
      // marginBottom: -HeaderHeight * 2,
      flex: 1
    },
    cardDescription: {
      padding: theme.SIZES.BASE / 2
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
  };
