import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity ,AsyncStorage,} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { Toast} from 'native-base';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { image }, parallax, parallaxProps, even } = this.props;
        const url = "https://lisheapp.co.ke/";

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: url + image }}
              style={styles.image}
            />
        );
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

    render () {
        const { data: { name, subtitle,description, specialization, price, image }, even } = this.props;

        const uppercaseTitle = name ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { name.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { this.addToCart({name: `${name}`, price: `${price}`,image: `${image}`, description: `${description}`, specialization: `${specialization}`}) }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { description }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}
