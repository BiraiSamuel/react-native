import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity ,AsyncStorage,} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { Toast} from 'native-base';

export default class Orders extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { profile }, parallax, parallaxProps, even } = this.props;
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
              source={{ uri: url + profile }}
              style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
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
        const { data: { profile, username, customer_id, description, date, total }, even } = this.props;
        const url = "https://lisheapp.co.ke/";
        var clear = profile.replace(/images\/users/g,'uploads');
        console.log(clear)

        const uppercaseTitle = username? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { username.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                <Image
                  source={{ uri: url + profile }}
                  style={styles.image}

                />
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                <Text
                  style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                  numberOfLines={2}
                >
                    { username  }
                </Text>
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { description + " Total Ksh:  " + total  }
                    </Text>
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { date }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}
