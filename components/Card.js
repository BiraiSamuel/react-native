import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image,AsyncStorage, TouchableWithoutFeedback, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { View, Root, Toast } from 'native-base';

import { argonTheme } from '../constants';
import Icon from "./Icon";
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';


class Card extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    var imageUrl, distance;
    const url = "https://lisheapp.co.ke/";
    const productUrl = url + "product.php?action=display&code=" + item.code;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    imageUrl = url + item.image;
    distance = item.distance * 1.60934;
    return (
      <Root>
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('fullScreen', {product: item})}>
          <Block flex style={imgContainer}>
            <Image source={{uri: imageUrl}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.name}</Text>
            <TouchableWithoutFeedback onPress={() => this.addToCart(item)}>
            <Block flex row space="between">
            <Icon
                name="basket"
                family="ArgonExtra"
                size={12}
                color={ argonTheme.COLORS.INFO}
            />
            {item.deleted == 0?
              <Icon
              size={11}
              color={argonTheme.COLORS.ICON}
              name="g-check"
              family="ArgonExtra"
            />
          :
            <Icon
              name="ios-heart"
              family="ionicon"
              size={12}
              color={ argonTheme.COLORS.ERROR}
            />
            }
            </Block>
            </TouchableWithoutFeedback>
            <Text size={7} style={styles.cardTitle}>{distance.toFixed(2)} KMS away</Text>
            <TouchableWithoutFeedback onPress={() => this.openLink(productUrl)}>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.description}</Text>
            </TouchableWithoutFeedback>
          </Block>
      </Block>
      </Root>
    );
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

  addToCart(item) {
    var product = item;
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
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);