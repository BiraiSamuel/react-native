import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class Comment extends PureComponent {

  static propTypes = {
    // Comment object shape
    commente: PropTypes.shape({
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      avatar:  PropTypes.string.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }s

  render() {
    // Pull comment object out of props
    const { commente } = this.props;
    const url = "https://lisheapp.co.ke/";
    // Pull data needed to display a comment out of comment object
    const { comment, date, user, avatar } = commente
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {avatar && <Image
            resizeMode='contain'
            style={styles.avatar}
            source={{ uri: url + avatar }}
          />}
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>{user}</Text>
            {' '}
            <Text style={styles.text}>{comment}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});
