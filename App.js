// FOOODIEE

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';

import {
  StackNavigator,
  TabNavigator,
  NavigationActions
} from 'react-navigation';

import {cuisines} from './ZomatoItems';
import {styes} from './styles';

import { Icon } from 'react-native-elements';


// Icon example

// <Icon
//   size = {15}
//   name = "check"
//   type = "feather"
//   color = {this.state.bgcolor}
//   iconStyle ={{paddingRight: 5}}
// />

const zomatoKey = '15754bd9cbe068ad2ba2606401000b5f';

const colorTable = {
   blue: '#3F97D0',
   // yellow: '#FFDA70',
   peach: '#FF6A5B',
   orange: '#F89C5F',
   green: '#54A95F',
   purple: '#9871CF',
}

const colorArray = Object.keys(colorTable);
// [blue, yellow, peach, orange, green]
// colorArray[0] = blue


class Playground extends Component <{}> {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      categories: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    fetch('https://developers.zomato.com/api/v2.1/categories',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user-key': zomatoKey,
      }
    }).then((response) => response.json()).then((responseJSON) => {
      this.setState({
        categories: responseJSON.categories,
      })
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Here is your location:</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

      </View>
    );
  }
}

class HomeScreen extends Component<{}> {

  constructor(props){
    super(props);

    this.state = {
      isVisible: false,
    };
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={this.state.isVisible && styles.overlay}>
          <View style={styles.exitOverlay}>
            <Icon
              size = {25}
              name = "x"
              type = "feather"
              color = '#ffffff'
              onPress = {() => this.setState({isVisible: !this.state.isVisible})}
            />
          </View>
          <View style={styles.refreshOverlay}>

          </View>
          <View style={styles.resultOverlay}>

          </View>
        </View>

        <View style={styles.homeContainer}>
          <Text h1>
            Foodie!
          </Text>
        </View>
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            style={styles.randomButton}
            onPress = {() => this.setState({isVisible: !this.state.isVisible})}
          >
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class GenScreen extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    return{
      headerRight:
        <Button
          title="Next"
          onPress={() => navigation.navigate('Eatery')}
        />
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>generator</Text>
      </View>
    );
  }
}

class EateryPage extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <Text>Eatery</Text>
      </View>
    );
  }
}

class Favorites extends Component<{}> {

  render(){
    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
      </View>
    );
  }
}

class Preferences extends Component<{}> {

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Here are your preferences</Text>
        <Button
          title="Change Preferences"
          onPress={() => navigate('Likes') }
        />
      </View>
    );
  }
}


class PreferencesLikes extends Component<{}> {

  constructor(props) {
    super(props);
    this.props.navigation.state.key = 'Likes';

    this.state = {
      buttonToggle: false,
      styleOn: styles.buttonStyleOn,
      styleOff: styles.buttonStyleOff,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      headerRight:
        <Button
          title="Next"
          onPress={() => navigation.navigate('Dislikes', {likeKey: navigation.state.key})}
        />
    };
  }

  render(){
    var cuisineList = [];
    var i = 0;
    for(eatery in cuisines){
        cuisineList.push(
          <PrefButton key={'eatery' + i++} eateryName={cuisines[eatery]}/>
        )
    }

    return (
      <View style={{flex:1, backgroundColor: '#F5FCFF'}}>
        <ScrollView>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: 5,
          }}>
            {cuisineList}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class PrefButton extends Component<{}> {

  constructor(props) {
    super(props);

    this.colorChoice = (Math.floor(Math.random() * 5));
    this.state = {
      bgcolor: colorTable[colorArray[this.colorChoice]],
      buttonToggle: false,
      nameOn:{
        color: colorTable[colorArray[this.colorChoice]]
      },
      nameOff: {
        color: '#ffffff'
      },
      styleOn: {
        padding: 8.5,
        margin: 4,
        borderRadius: 25,
        borderColor: colorTable[colorArray[this.colorChoice]],
        borderWidth: 1.5,
        backgroundColor: '#ffffff',
      },
      styleOff: {
        padding: 10,
        margin: 4,
        borderRadius: 25,
        backgroundColor: colorTable[colorArray[this.colorChoice]],
        flexDirection: 'row',
      }
    }
  }

  render(){

    if(this.state.buttonToggle){
      checkmark = (
        <Icon
          size = {15}
          name = "check"
          type = "feather"
          color = {this.state.bgcolor}
          iconStyle ={{paddingRight: 5}}
        />
      )
    } else {
      checkmark = (<Text></Text>)
    }

    return(
      <TouchableOpacity
        style={[this.state.styleOff, this.state.buttonToggle && this.state.styleOn]}
        onPress={() => this.setState({buttonToggle: !this.state.buttonToggle})}
      >
        {checkmark}
        <Text style={[this.state.nameOff, this.state.buttonToggle && this.state.nameOn]}>
          {this.props.eateryName}
        </Text>
      </TouchableOpacity>
    );
  }
}

class PreferencesDislikes extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    return{
      headerRight:
        <Button
          title="Done"
          onPress={() => navigation.dispatch(NavigationActions.back({key: 'Likes'}))}
        />
      // headerLeft:
      // <Button
      //   title="Back"
      //   onPress={() => }
      // />
    };
  }

//

  render(){
    var cuisineList = [];
    var i = 0;
    for(eatery in cuisines){
        cuisineList.push(
          <PrefButton key={'eatery' + i++} eateryName={cuisines[eatery]}/>
        )
    }

    return (
      <View style={{flex:1, backgroundColor: '#F5FCFF'}}>
        <ScrollView>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: 5,
          }}>
            {cuisineList}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Settings extends Component<{}> {
  render(){
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const generatorNav = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Gen: {
    screen: GenScreen,
    navigationOptions: {
      headerTitle: 'Generator',
    }
  },
  Eatery: {
    screen: EateryPage,
    navigationOptions: {
      headerTitle: 'Eatery',
    }
  },
})

const Preference = StackNavigator({
  Preferences: {
    screen: Preferences,
    navigationOptions: {
      headerTitle: 'Preferences',
    }
  },

  Likes: {
    screen: PreferencesLikes,
    navigationOptions: {
      headerTitle: 'What do you like?',
    },
  },

  Dislikes: {
    screen: PreferencesDislikes,
    navigationOptions: {
      headerTitle: 'What do you not like?',
    },
  },
});

const RootNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name='home'
          type='feather'
          color='#517fa4'
          size={25}
        />
      )
    }
  },
  Fav: {
    screen: Favorites,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name='favorite-border'
          type='materialicons'
          color='#517fa4'
          size={25}
        />
      )
    }
  },
  Pref: {
    screen: Preference,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name='list'
          type='feather'
          color='#517fa4'
          size={25}
        />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name='settings'
          type='feather'
          color='#517fa4'
          size={25}
        />
      )
    }
  },
});

export default RootNavigator;
