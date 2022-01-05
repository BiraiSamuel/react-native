import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../i18n';

import LanguageListItem from '../components/LanguageListItem';

const languages = [
  {
    locale: 'en',
    name: 'English'
  },
  {
    locale: 'de',
    name: 'Deutsch',
    englishName: 'German'
  },
  {
    locale: 'ke',
    name: 'Swahili',
    englishName: 'Kiswahili'
  }
];

class LanguageSelectorScreen extends React.Component {

  static navigationOptions = {
    title: i18n.t('settings.display_language')
  };

  render() {
    const { navigation } = this.props;
    const currentLocale = navigation.getParam('currentLocale');

    return (
      <View style={{ marginTop: 15 }}>
      <InfoText
                text="Language"
            / >
        {
          languages.map((language) => (
            <LanguageListItem
              key={language.locale}
              isActive={language.locale === currentLocale}
              locale={language.locale}
              name={language.name}
              englishName={language.englishName}
              onChangeLocale={(locale) => navigation.navigate('Settings', { locale })}
            />
          ))
        }
      </View>
    );
  }
}

class InfoText extends React.Component {
  render() {
      return (
          <Text
              style={styles.infoTextStyle}
          >
          {this.props.text}
          </Text>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reduceHeight: {
      height: 5,
  },
  infoTextStyle: {
      fontSize: 14,
      paddingTop: 20,
      marginLeft: 20,
      color: "black",
      opacity: .7,
  },
  settigsGreyBackground: {
      backgroundColor: 'rgba(247, 247, 247, 1)',
      paddingTop: 20,
  }
});

export default LanguageSelectorScreen;