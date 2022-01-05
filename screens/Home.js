import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LinesLoader, TextLoader } from 'react-native-indicator';
import { Root, Toast, Text } from 'native-base';
const { width } = Dimensions.get('screen');
const LATITUDE = -1.28698,
      LONGITUDE = 36.8228,
      radius = 600000;

class Home extends React.Component {

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
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert('permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    this.getItems(location.coords.latitude, location.coords.longitude, 6000);
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.articles}>
        {this.state.products?
        <Block flex>
          <Card item={this.state.products[0]} horizontal  />
          <Block flex row>
            <Card item={this.state.products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={this.state.products[2]} />
          </Block>
          <Card item={this.state.products[3]} horizontal />
          <Card item={this.state.products[4]} full />
          <Card item={this.state.products[5]} horizontal  />
          <Block flex row>
            <Card item={this.state.products[6]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={this.state.products[7]} />
          </Block>
          <Card item={this.state.products[8]} horizontal />
          <Card item={this.state.products[9]} full />
          <Card item={this.state.products[10]} horizontal />
        </Block>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LinesLoader />
        <TextLoader text="Loading Produce Nearby" />
        </View>
        }
      </ScrollView>
    )
  }

  render() {
    const {navigation} = this.props;
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }

  async getItems(lat, lng, radi){
    await fetch('https://lisheapp.co.ke/retrieve_popular.php', {
        method: 'POST',
        body: JSON.stringify({

          latitude: lat,
          longitude: lng,
          radius: radi,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(typeof responseJson === 'object' && responseJson !== null){
          this.setState({products: responseJson})
        } else {
          alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
