import React, { Component, PropTypes } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Comment from '../components/Comment';
import Input from '../components/Enput';

export default class List extends Component {

  static propTypes = {

  };

  state = {
    comments: [], // array for comments fetched from the API backend
    refreshing: true, // whether comments list is being refreshed or not
    productId: '',
    userId: '',
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({productId: navigation.state.params.product.id})
    this.setState({userId: navigation.state.params.user.id})
  }

  // Fetch comments when component is about to mount
  componentWillMount = () => this._interval = setInterval(() => {
    // Your code
    if(this.state.productId !== ''){
    this.fetchComments();
    }
  }, 5000);

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  // Re-fetch comments when user pulls the list down
  onRefresh = () => this.fetchComments();

  // Call API to fetch comments
  fetchComments = async () => {
    this.setState({ refreshing: true });
    try {
        return await fetch('https://lisheapp.co.ke/get_comments.php', {
            method: 'POST',
            body: JSON.stringify({

              id: this.state.productId,

            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            if(typeof responseJson === 'object' && responseJson !== null){
                this.setState({
                    comments: responseJson,
                    refreshing: false,
              });
            } else {
              alert(responseJson);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
    catch (error) {
      alert(error);
    }
  };

  // Call API to submit a new comment
  submitComment = async (comment) => {
    const { user } = this.props;
    this._scrollView.scrollTo({ y: 0 });
    try {
        await fetch('https://lisheapp.co.ke/add_comments.php', {
            method: 'POST',
            body: JSON.stringify({

              product_id: this.state.productId,

              user_id: this.state.userId,

              comment: comment
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
              alert(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      this.setState({
        // Push new comment to state before existing ones
        comments: [comment, ...this.state.comments]
      });
    }
    catch (error) {
      alert(error);
    }
  };

  render() {
    // Pull comments out of state
    const { comments } = this.state;
    return (
      <View style={styles.container}>
        {/* Scrollable list */}
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {/* Render each comment with Comment component */}
          {comments.map((comment, index) => <Comment commente={comment} key={index} />)}
        </ScrollView>
        {/* Comment input box */}
        <Input onSubmit={this.submitComment} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  }
});
