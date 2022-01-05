import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { Block, Checkbox, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class Terms extends Component{

  state = {
      accepted: false
  }

  render(){
    return (
      <Block flex middle>
     <View style={styles.container}>
     <Block style={styles.registerContainer}>
            <Text style={styles.title}>Terms and conditions</Text>
            <Block flex center>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                      accepted: true
                  })
                }
              }}
            >
                <Text style={styles.tcP}>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Lishe’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</Text>
                <Text style={styles.tcP}>The term ‘Lishe’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is 10076-0100. Our company registration number is 0100. The term ‘you’ refers to the user or viewer of our website.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The content of the pages of this website is for your general information and use only. It is subject to change without notice.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: email and phone number.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                    <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.
Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The general use of this website is free, users get a chance to post one product or service, and more slots to post other products are charged a small fee of Ksh. 1000, for this, you get 5 more slots, stores are charged a starting fee of Ksh.17,500, this caters for a basic web page, and unlimited products slots</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of this website and any dispute arising out of such use of the website is subject to the laws of Eastern Africa(Kenya, Tanzania and Uganda).</Text>
                <Text style={styles.tcP}>The use of this website is subject to the following terms of use</Text>
            </ScrollView>
            </Block>

            <TouchableOpacity disabled={ !this.state.accepted } onPress={ ()=>this.accepted()} style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
            </Block>
      </View>
      </Block>
    );
  }

  accepted(){
    const {navigation} = this.props;
    alert("Terms and conditions accepted");
    userAgreement = true;
    navigation.navigate("Home");

  }

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default Terms;