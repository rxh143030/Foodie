// FOOODIEE

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native';

import {
  StackNavigator,
  TabNavigator,
  NavigationActions,
} from 'react-navigation';

const zomatoKey = '15754bd9cbe068ad2ba2606401000b5f';

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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text>
            Foodie!
          </Text>
        </View>
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            style={styles.randomButton}
            onPress = {() => navigate("Gen")}
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
  }

  static navigationOptions = ({ navigation }) => {
    return{
      headerRight:
        <Button
          title="Next"
          onPress={() => navigation.navigate('Dislikes')}
        />
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>likes</Text>
      </View>
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
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Dislikes</Text>
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
      header: null,
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
    screen: generatorNav,
  },
  Fav: {
    screen: Favorites,
  },
  Pref: {
    screen: Preference,
  },
  Settings: {
    screen: Settings,
  },
});

export default RootNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  randomButton: {
    padding: 60,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },

});
