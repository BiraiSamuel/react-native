import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'

import { Control } from 'react-redux-form/native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    minHeight: 50,
    maxHeight: 100,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  button: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 8,
    borderRadius: 12,
    backgroundColor: colors.messageSendButton,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 10
  },

  icon: {
    marginLeft: 5,
    transform: [{rotateZ: '-30deg'}]
  },

  gradient: {
    position: 'absolute',
    height: 5,
    left: 0,
    right: 0,
    top: -5
  }
})

class MessageForm extends Component<{}> {

  render() {

    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={[colors.transparent, colors.white]}
        />
        <Control.TextInput
          model={model}
          style={{flex: 1}}
          placeholder={translate('conversations.write_message')}
          placeholderTextColor={colors.messagePlaceholder}
          testID="conversation.form"
          multiline
        />
        <TouchableOpacity
          hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
          style={[styles.button, !!active && {backgroundColor: colors.messageSendButtonActive}]}
          onPress={() => actions.sendMessage(conversationId)}
          disabled={!active}
          testID="conversation.send"
        >
          {sending ?
            <View style={{padding: 2}}>
              <ActivityIndicator size="small" color={colors.messageSendIconActive} />
            </View> :
            <Icon
              name="send"
              color={active ? colors.messageSendIconActive : colors.messageSendIcon}
              size={20}
              style={styles.icon}
            />
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  drafts: state.drafts,
  conversations: state.conversations
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reduxActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm)
