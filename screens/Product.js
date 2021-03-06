/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import { default as ProductComponent } from '../component/Product';

var imagese = [
  'https://lisheapp.co.ke/resources/coming.jpg',
  'https://lisheapp.co.ke/resources/coming.jpg',
  'https://lisheapp.co.ke/resources/coming.jpg',
  'https://lisheapp.co.ke/resources/coming.jpg'
];

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeSlide: 0,
      quantity: 1,
      specialization:[],
      selectedSize: ''
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    this.setState({ product: this.props.product });
  }

  componentDidMount() {
    /* Select the default color and size (first ones) */
    let defColor = this.state.product.specialization[0];
    let defSize = this.state.product.sizes[0];
    this.setState({
      specialization: defColor,
      selectedSize: defSize,
      quantity: this.state.product.quantity
    });
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.flatlist()} transparent>
          <Icon name='ios-search' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );

    var imagesey = this.state.product.images;
    const defaultSize = this.state.selectedSize;
    if (imagesey == null){
      this.state.product.images = imagese;
    }
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title={this.props.product.title} />
        <Content>
          <Carousel
            data={this.state.product.images}
            renderItem={this._renderItem}
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            enableSnap={true}
          />
          <Pagination
            dotsLength={this.state.product.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View style={{ backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center' }}>
            <Grid>
              <Col size={3}>
                <Text style={{ fontSize: 18 }}>{this.state.product.title}</Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.product.price}</Text>
              </Col>
            </Grid>
            <Grid style={{ marginTop: 15 }}>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Specialization:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Specialization"
                  note={true}
                  selectedValue={this.state.specialization}
                  onValueChange={(color) => this.setState({ specialization: color })}
                >
                  {this.renderColors()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Size:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.selectedSize}
                  onValueChange={(size) => this.updatePrice('size', size) }
                >
                  {this.renderSize()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button block icon transparent onPress={() => this.handleNumericButtonClick('sub', this.state.quantity)} >
                    <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                  </Button>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.quantity}</Text>
                  </View>
                  <Button block icon transparent onPress={() => this.handleNumericButtonClick('plus', this.state.quantity)}>
                    <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
                  </Button>
                </View>
              </Col>
            </Grid>
            <Grid style={{ marginTop: 15 }}>
              <Col size={3}>
                <Button block onPress={this.addToCart.bind(this)} style={{ backgroundColor: Colors.navbarBackgroundColor }}>
                  <Text style={{ color: "#fdfdfd", marginLeft: 5 }}>Add to cart</Text>
                </Button>
              </Col>
              <Col>
                <Button block onPress={this.addToWishlist.bind(this)} icon transparent style={{ backgroundColor: '#fdfdfd' }}>
                  <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-heart' />
                </Button>
              </Col>
            </Grid>
            <View style={{ marginTop: 15, padding: 10, borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)' }}>
              <Text style={{ marginBottom: 5 }}>Description</Text>
              <View style={{ width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10 }} />
              <NBText note>
                {this.state.product.description}
              </NBText>
            </View>
          </View>
          <View style={{ marginTop: 15, paddingLeft: 12, paddingRight: 12 }}>
            <Text style={{ marginBottom: 5 }}>Similar items</Text>
            <View style={{ width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10 }} />
            {this.renderSimilairs()}
          </View>
        </Content>
      </Container>
    );
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.openGallery(index)}
      >
        <Image
          source={{ uri: item }}
          style={{ width: Dimensions.get('window').width, height: 350 }}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  handleNumericButtonClick(type, value){
    if (type == 'sub' && this.state.quantity > 1 ){
      this.setState({ quantity: (this.state.quantity -= 1 )})
      var unPrice = this.state.product.price;
      unPrice = unPrice.replace(/\D/g,'');
      unPrice = Number(unPrice);
      var quotient = (unPrice/value);
      var aggregatePrice = (quotient * this.state.quantity);
      aggregatePrice = 'Ksh.' + aggregatePrice;
      this.state.product.price = aggregatePrice;
    } else if (type == 'plus'){
      this.setState({ quantity: this.state.quantity += 1 });
      var unPrice = this.state.product.price;
      unPrice = unPrice.replace(/\D/g,'');
      unPrice = Number(unPrice);
      var quotient = (unPrice/value);
      var aggregatePrice = (quotient * this.state.quantity);
      aggregatePrice = 'Ksh.' + aggregatePrice;
      this.state.product.price = aggregatePrice;
    }
  }

  updatePrice(type, value) {
      if (type == 'size'){
      var sizes = this.state.selectedSize;
      sizes = Number(sizes.replace(/\D/g,''));
      var unPrice = this.state.product.price;
      unPrice = Number(unPrice.replace(/\D/g,''));
      var quotient = (unPrice/sizes);
      var aggregatePrice = (quotient*(Number(value.replace(/\D/g,''))));
      this.state.product.price = ("Ksh." + aggregatePrice)
      this.setState({ selectedSize: value });
      this.state.product.sizes = [value];
     }
  }


  renderColors() {
    let specials = [];
    if (this.state.product.specialization == null ){
      alert("Cannot be customized further")
      Actions.pop();
    } else {
    this.state.product.specialization.map((special, i) => {
      specials.push(
        <Item key={i} label={special} value={special} />
      );
    });
   }
    return specials;
  }

  renderSize() {
    let size = [];
    this.state.product.sizes.map((s, i) => {
      size.push(
        <Item key={i} label={s} value={s} />
      );
    });
    return size;
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.product.similarItems;
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
  }

  openGallery = (pos) => {
    Actions.imageGallery({ images: this.state.product.images, position: pos });
  }

  addToCart() {
    var product = this.state.product;
    var special = [this.state.specialization];
    product['specialization'] = special;
    product['size'] = this.state.selectedSize;
    product['quantity'] = this.state.quantity;
    alert(this.state.selectedSize);
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

  addToWishlist() {
    var product = this.state.product;
    var success = true;
    AsyncStorage.getItem("WISHLIST", (err, res) => {
      if (!res) AsyncStorage.setItem("WISHLIST", JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        if (this.search(items, product)) {
          success = false
        }
        else {
          items.push(product);
          AsyncStorage.setItem("WISHLIST", JSON.stringify(items));
        }
      }
      if (success) {
        Toast.show({
          text: 'Product added to your wishlist !',
          position: 'bottom',
          type: 'success',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
      else {
        Toast.show({
          text: 'This product already exist in your wishlist !',
          position: 'bottom',
          type: 'danger',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
    });
  }

  search(array, object) {
    for (var i = 0; i < array.length; i++)
      if (JSON.stringify(array[i]) === JSON.stringify(object))
        return true;
    return false;
  }

}

const dummyProduct = {
  id: 2,
  title: 'V NECK T-SHIRT',
  description: "Pellentesque orci lectus, bibendum iaculis aliquet id, ullamcorper nec ipsum. In laoreet ligula vitae tristique viverra. Suspendisse augue nunc, laoreet in arcu ut, vulputate malesuada justo. Donec porttitor elit justo, sed lobortis nulla interdum et. Sed lobortis sapien ut augue condimentum, eget ullamcorper nibh lobortis. Cras ut bibendum libero. Quisque in nisl nisl. Mauris vestibulum leo nec pellentesque sollicitudin. Pellentesque lacus eros, venenatis in iaculis nec, luctus at eros. Phasellus id gravida magna. Maecenas fringilla auctor diam consectetur placerat. Suspendisse non convallis ligula. Aenean sagittis eu erat quis efficitur. Maecenas volutpat erat ac varius bibendum. Ut tincidunt, sem id tristique commodo, nunc diam suscipit lectus, vel",
  image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
  images: [
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
    'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
  ],
  price: '120$',
  specialization: ['Red', 'Blue', 'Black'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: 'MAN',
  similarItems: [
    { id: 10, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg' },
    { id: 11, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' },
    { id: 12, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' }
  ]
};
