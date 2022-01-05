import React from "react";
import { Easing, Animated } from "react-native";
import {
  createAppContainer
} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Map from "../screens/Map";
import Search from "../screens/Search";
import Terms from "../screens/Terms";
import Signup from "../screens/Signup";
import Conversations from "../screens/Conversations";
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";
import Convo from "../screens/Conversation";
import fullComponent from "../screens/FullScreen";
import Contact from "../screens/Contact";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Create from "../screens/Create";
import Settings from "../screens/Settings";
import Mapipa from "../screens/Mapi";
import Comments from "../screens/Comments";
import Lil from "../screens/lilmap";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});
global.userAgreement = false;
const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Biashara exchange" tabs={tabs.categories} navigation={navigation} />
    })
  },
  Create: {
    screen: Create,
    headerTransparent: true
  },
  Settings: {
    screen: Settings,
    headerTransparent: true
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ContactStack = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Contact Us" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ConversationsStack = createStackNavigator({
  Conversations: {
    screen: Conversations,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Contacts history" search navigation={navigation} />
    })
  },
  Conversation: {
    screen: Convo,
    headerTransparent: true
  },
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ConversationStack = createStackNavigator({
  Conversation: {
    screen: Convo,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Conversations" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const TermsStack = createStackNavigator({
  Terms: {
    screen: Terms,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Privacy Policy" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />
      })
    },
    Maps: {
      screen: Map,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header search tabs={tabs.categories} options title="Find Us" navigation={navigation} />
        ),
        headerTransparent: true
      })
    },
    Search: {
      screen: Search,
      headerTransparent: true
    },
    Conversation: {
      screen: Convo,
      headerTransparent: true
    },
    fullScreen: {
      screen: fullComponent,
      headerTransparent: true
    },
    Cart: {
      screen: Cart,
      headerTransparent: true
    },
    Checkout: {
      screen: Checkout,
      headerTransparent: true
    },
    Comments: {
      screen: Comments,
      headerTransparent: true,
    },
    lil: {
      screen: Lil,
      headerTransparent: true,
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Home" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Sharing" />
        )
      })
    },
    Conversations: {
      screen: ConversationsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Conversations" title="Connects" />
        )
      })
    },
    Waste: {
      screen: Mapipa,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Waste Management" title="Wastes" />
        )
      })
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Contact" title="Contact Us" />
        )
      })
    },
    Terms: {
      screen: Terms,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Terms" title="Terms and conditions" />
        )
      })
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
