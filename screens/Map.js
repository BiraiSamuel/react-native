
// @flow
'use-strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { generateRandomPoints, generateRandomPoint } from './generator'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from '../constants/entries';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { colors } from '../styles/index.style';
import SliderEntry from '../components/SliderEntry';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapButton from '../components/MapButton';
import { CheckBox } from 'react-native-elements';
import { LinesLoader, DoubleCircleLoader, TextLoader } from 'react-native-indicator';
import DialogInput from 'react-native-dialog-input';

const LATITUDE = -1.28698,
      LONGITUDE = 36.8228,
      radius = 600000;

      const SLIDER_1_FIRST_ITEM = 1;

export default class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pins: [],
      products: null,
      category: '',
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      radius: "",
      location: null,
      errorMessage: null,
      layersOpen: false,
      showBaskets: true,
      showFairteiler: true,
      showEvents: false,
      isAlertVisible:false
    }
    this.renderMarker = this.renderMarker.bind(this)
    this.renderCluster = this.renderCluster.bind(this)
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      // Your code
      this._getLocationAsync();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  submit(inputText){
    console.log(inputText);
    this.setState({isAlertVisible:false})
    this.setState({radius:inputText})
  }

  /*async fetchPines() {
    let JsonData, products;
    if(this.state.category == tabId){
      return;
    }
    switch (tabId){
      case 'popular':
        this.setState({category: tabId})
        //JsonData = await fetch('https://lisheapp.co.ke/backend/retrieve_popular.php');
        //products = await JsonData.json();
        return await fetch('http://172.17.61.145/backend/retrieve_popular.php', {
        method: 'POST',
        body: JSON.stringify({

          latitude: this.state.location.latitude,

          longitude: this.state.location.longitude,

          radius: this.state.radius

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
          alert(responseJson)
          if (typeof responseJson === 'object' && responseJson !== null){
            this.setState({products: responseJson});
          }else{
            alert(responseJson)
          }
      })
      .catch((error) => {
        console.error(error);
      });
        break;
      case 'baskets':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/baskets.php');
        products = await JsonData.json();
        break;
      case 'stores':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/store.php');
        products = await JsonData.json();
        break;
      case 'events':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/events.php');
        products = await JsonData.json();
        break;
      case 'service':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/services.php');
        products = await JsonData.json();
        break;
      case 'vazi':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/vazi.php');
        products = await JsonData.json();
        break;
      case 'jengo':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/jengo.php');
        products = await JsonData.json();
        break;
      case 'transport':
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/transport.php');
        products = await JsonData.json();
        break;
      default:
        this.setState({category: tabId})
        JsonData = await fetch('https://lisheapp.co.ke/backend/others.php');
        products = await JsonData.json();
        break;
    }
    if (products == null){
      alert(`${tabId}` + " not found near you")
      return
    }
    this.setState({products})
  }*/

  async getItems(lat, lng, radi, tabS){
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
          let points = [];
          let count = 0;
          responseJson.forEach(function(element, i) {
            let latitude=0,longitude=0;
            latitude = Number(element.lat);
            longitude = Number(element.lng);
            let ide = element.id + count;
            points.push({ id: ide, title: element.name, image: element.image, subtitle:element.descpription, location: { latitude,longitude}, type: element.type, identifier: count })
            count += 1;
          });
          this.setState({ pins: points })
        } else {
          alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //fetchPins(){
  //  const { navigation } = this.props;
  //  let tabId;
  //  const status = navigation.state;
  //  tabId == status.params.tabId;
  //  console.log(tabId)
  //  switch(tabId){
  //  case 'popular':
  //    console.log('popular');
  //    break;
  //  case 'basket':
  //    console.log('basket');
  //    break;
  //  case 'stores':
  //    console.log('stores');
  //    break;
  //  default:
  //    console.log('haipatikani');
  //    break;
  //  }
  //  //console.log(tabId)
  //};

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert('permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({location});
    this.getItems(location.coords.latitude, location.coords.longitude, 6000, tabId);
  }

  mainExample (number, title) {
    const { slider1ActiveSlide } = this.state;
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <View style={[styles.exampleContainer, styles.exampleContainerDark]}>
            <Text style={styles.title}>Products Listing</Text>
            <Text style={styles.subtitle}>Free delivery for goods worth over Ksh. 300 within Nairobi cbd</Text>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={ENTRIES1}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              // inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
        </View>
    );
}

layoutExample (number, title, type) {
  const isTinder = type === 'tinder';
  return (
      <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
          <Carousel
            data={ENTRIES1}
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

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (pin) => {
    const { navigation } = this.props;
    switch (pin.type){
        case 'bulbs':
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/bulbs.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
        case 'fruits':
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/carri.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
        case 'podded-vegetables':
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/cereals.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
        case 'root-and-tuberous':
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/tuber.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
        case 'transport':
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/lorry.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
        default:
          return (
            <Marker identifier={`pin-${pin.id}`} image={require('../assets/imgs/marker_basket.png')} key={pin.id} coordinate={pin.location} onPress={()=>navigation.navigate('fullScreen', {product: this.state.products[pin.identifier]})}/>
          )
          break;
    }

  }

  render() {
    const example1 = this.mainExample(1, 'Stores-Listing Category');
    const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {/* Cluster Map Example */}
        {this.state.products != null?
        <ClusteredMapView
          style={{flex: 1}}
          data={this.state.pins}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={{latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: 12, longitudeDelta: 12 }}>
          {/*
            Markers rendered as children of ClusteredMapView are not taken in account by the clustering feature,
            they will just act as they were rendered within a normal react-native-maps instance
          */}
          {this.state.location == null?<Marker coordinate={this.state.coordinate} pinColor={'#65bc46'} />:<Marker coordinate={this.state.location.coords} image={require('../assets/imgs/output.png')}/>}
        </ClusteredMapView>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <DoubleCircleLoader />
          <TextLoader text="Loading Produce Nearby" />
        </View>
        }
        <TouchableOpacity onPress={()=> navigation.navigate('lil')} style={{position: 'absolute', bottom: 26, right: 8, width: 64, height: 64}}>
        <Image
          resizeMode='contain'
          source={require('./simbol.png')}
          style={{position: 'absolute', bottom: 26, right: 8, width: 64, height: 64}}/>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    zIndex: -1
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
  controlBar: {
    top: 48,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  novaLabLogo: {
    right: 8,
    bottom: 8,
    width: 64,
    height: 64,
    position: 'absolute',
  },
  checkbox: {
    height: 25,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'white'
  },
  layersBox: {
    position: 'absolute',
    right: 30,
    top: 70,
    backgroundColor: 'white',
    borderColor: colors.backgroundBright,
    borderWidth: 1,
    height: 74,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    padding: 4,
    zIndex: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 14,
    color: '#65bc46',
    fontWeight: '400'
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: '#65bc46',
    backgroundColor: 'white',
  },
  exampleContainer: {
    paddingVertical: 30
  },
  exampleContainerDark: {
      backgroundColor: '#1a1917'
  },
  exampleContainerLight: {
      backgroundColor: 'white'
  },
  layers: {
    top: 60,
    right: 20
  },
})
