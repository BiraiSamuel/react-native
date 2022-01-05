import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker, Callout,AnimatedRegion,Polyline,PROVIDER_GOOGLE } from "react-native-maps";
import { Container, Content, Icon, Left, Button, Item,Right, Input } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../components/Orders';
import { ENTRIES1, ENTRIES2 } from '../constants/entries';
import { colors } from '../styles/index.style';
import MapButton from '../components/MapButton';
import { CheckBox } from 'react-native-elements';
import _ from 'lodash';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

const LATITUDE_DELTA = 1.1;
const LONGITUDE_DELTA = 1.1;
const LATITUDE = -1.28698;
const LONGITUDE = 36.8228;

const SLIDER_1_FIRST_ITEM = 1;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Mapi extends Component {
  state = {
    pins: [],
    recycle: [],
    orders: [],
    reuse: [],
    loading: false,
    trackPosition: false,
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: Images[3],
      },
    ],
    region: {
      latitude: -1.28698,
      longitude: 36.8228,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE
    }),
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    layersOpen: false,
    trackPosition: false,
    showDispose: true,
    showRecycle: true,
    showReuse: false
  };

  static navigationOptions = {
    title: 'Transport & Deliver Orders'
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.fetchOrders();
    //this.fetchEvents();
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.pins.length) {
        index = this.state.pins.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.pins[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
}

_renderItem ({item, index}) {
  return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
}

_renderLightItem ({item, index}) {
  return <SliderEntry data={item} even={false} parallax={true} />;
}

_renderDarkItem ({item, index}) {
  return <SliderEntry data={item} even={true} />;
}

_centerMapOnMarker (markerIndex) {
  const mapRef = this.map;
  const markerData = this.state.pins[markerIndex];

  if (!markerData || !mapRef) {
      return;
  }
  mapRef.animateToRegion({
      latitude: markerData.coordinate.latitude,
      longitude: markerData.coordinate.longitude,
      latitudeDelta: 0.0315,
      longitudeDelta: 0.0258
  });
}

  async fetchOrders() {
    let JsonData = await fetch('https://lisheapp.co.ke/transporter_orders.php');
    let dispose = await JsonData.json();
    this.setState({orders: dispose});
    const points = [];
    let count = 0;
    /*dispose.forEach(function(element, i) {
      let latitude = parseFloat(element.lat);
      let longitude = parseFloat(element.lng);
      let ide = element.id;
      points.push({ id: ide, title: element.company, subtitle:element.description, coordinate: {latitude,longitude}, type: element.type})
    });
    this.setState({ pins: points})*/
  }

  openLink = (url) => {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else{
				alert('Failed to open in browser');
			}
		});
	}

  fetchUserLocation(){
    const { coordinate } = this.state;

    this.watchID = Geolocation.getCurrentPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          trackPosition: true,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    )
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  onPress(pin){
    switch(pin.type) {
      case 'store':
        // code block
        //Actions.fullscreen({entries: pin.product})
        alert("store clicked")
        break;
      case 'basket':
        // code block
        let basketers = this.state.baskets;
        let index = pin.id;
        basketers.forEach(function(element, i) {
          if (element.id == pin.id){
            //Actions.product({product: element})
            alert("baket found")
          }else{
            alert("Basket cannot be found")
          }
        })
        break;
      default:
        // code block
    }
  }

layoutExample (number, title, type) {
  const isTinder = type === 'tinder';
  return (
      <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
          <Carousel
            data={this.state.orders}
            renderItem={this._renderLightItem}
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
            onSnapToItem={(index, pin) => this._centerMapOnMarker(index)}
          />
      </View>
  );
}

handleCheck(type){
  var pins = this.state.pins;
  switch(type) {
    case 'filter.baskets':
      // code block
      if(this.state.showDispose == true){
      var removed = _.remove(pins, function(element) {
        return element.type == 'basket';
      });
      this.setState({pins: pins})
      this.setState({showBaskets: !this.state.showDispose, layersOpen: false})
    }else{
      this.fetchDispose();
      this.setState({showBaskets: !this.state.showDispose, layersOpen: false})
    }
      break;
    case 'filter.stores':
      // code block
      if(this.state.showRecycle == true){
      var removed = _.remove(pins, function(element) {
        return element.type == 'store';
      });
      this.setState({pins: pins})
      this.setState({showFairteiler: !this.state.showRecycle, layersOpen: false})
      }else{
        this.fetchRecycle();
        this.setState({showFairteiler: !this.state.showRecycle, layersOpen: false})
      }
      break;
    default:
      // code block
      if(this.state.showReuse == true){
        var removed = _.remove(pins, function(element) {
          return element.type == 'event';
        });
        this.setState({pins: pins})
        this.setState({showEvents: !this.state.showReuse, layersOpen: false})
      }else{
        this.fetchReuse();
        this.setState({showEvents: !this.state.showReuse, layersOpen: false})
      }

  }
}

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');

    return (
      <View style={styles.container}>
      {!this.state.layersOpen ?
        <MapButton
          onPress={() => this.setState({layersOpen: true})}
          style={styles.layers}
          icon="layers-outline"
          testID="map.layers"
          color={this.state.showDispose && this.state.showRecycle ? '#000' : colors.green}
        /> :
        <View style={styles.layersBox}>
          {[
            {
              key: 'filter.baskets',
              title: 'Track Me',
              onPress: () => this.handleCheck('filter.baskets'),
              checked: this.state.showDispose
            },
            {
              key: 'filter.stores',
              title: 'Track delivery',
              onPress: () => this.handleCheck('filter.stores'),
              checked: this.state.showRecycle
            },
            {
              key: 'filter.events',
              title: 'Reusers avenue',
              onPress: () => this.handleCheck('filter.events'),
              checked: this.state.showReuse
            },
          ].map(options =>
            <CheckBox
              {...options}
              iconRight
              checkedColor={colors.green}
              wrapperStyle={{margin: 0, padding: 0}}
              textStyle={{fontSize: 12}}
              containerStyle={styles.checkbox}
            />
          )}
        </View>
      }
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.pins.map((marker, index) => {

            return (
              <MapView.Marker key={index} coordinate={marker.coordinate} image={require('../assets/imgs/marker_fairteiler.png')}>
              <Animated.View style={styles.markerWrap}>
              <Animated.View style={styles.ring} />
                  <View style={styles.marker} />
              </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
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
      </View>
    );
  }
}

const customStyles = {
	TriggerTouchableComponent: TouchableOpacity
};

const optionsStyles = {
  optionsContainer: {
    padding: 5
  },
  optionWrapper: {
    margin: 5
  },

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1
  },
  layers: {
    top: 60,
    right: 20
  },
  checkbox: {
    height: 25,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: colors.white
  },
  layersBox: {
    position: 'absolute',
    right: 30,
    top: 70,
    backgroundColor: colors.white,
    borderColor: colors.backgroundBright,
    borderWidth: 1,
    height: 74,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    padding: 4,
    zIndex: 10
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  storyOverlay: {
    flex: 1,
  marginTop: 10,
  height: 30,
    position: 'absolute',
    left: 0,
    top: 0,
  justifyContent: 'space-around',
    flexDirection: 'row',
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

AppRegistry.registerComponent("mapfocus", () => screens);
