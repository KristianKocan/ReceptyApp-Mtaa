import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Alert, ListView} from 'react-native';
import Login from './obrazovky/Login.js';
import { AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

var Parse = require("parse/react-native");
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("myAppId","","masterKey");
Parse.serverURL = "http://147.175.162.99:1337/parse";
//var Request = new XMLHttpRequest();
Parse.User.enableUnsafeCurrentUser()
var request = new XMLHttpRequest();

var currentUser = {
  login: "",
  heslo: ""
};

var prihlasenyUser;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_pouzivatel: '',
      login_heslo: '',
    };
  }

  simpleAlertHandler=()=>{
    //function to make simple alert
    Alert.alert(
      //title
      'Upozornenie',
      //body
      'Nesprávny login alebo heslo!',
      [
        {text: 'OK',},
      ],
      { cancelable: true }
    );
  }

    async loginUser() {
    currentUser.login = this.state.login_pouzivatel;
    currentUser.heslo = this.state.login_heslo;
    prihlasenyUser = await Parse.User.logIn(currentUser.login, currentUser.heslo).then((user) => {
      this.props.navigation.navigate('Details');
    }, (error) => {
        this.simpleAlertHandler();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bar}>
        <MenuProvider style={{ flexDirection: "column"}}>
           <Menu>

            <MenuTrigger  >
              <Image
                resizeMode="contain"
                source={require('./assets/menu-icon.png')}>
              </Image>
            </MenuTrigger  >

            <MenuOptions>
              <MenuOption value={"Login"} onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.menuContent}>Prihlásiť sa</Text>
              </MenuOption>
              <MenuOption value={"Register"}>
                <Text style={styles.menuContent}>Registrácia</Text>
              </MenuOption>
              <MenuOption value={"Settings"}>
                <Text style={styles.menuContent}>Nastavenie</Text>
              </MenuOption>
              <MenuOption value={"Logout"}>
                <Text style={styles.menuContent}>Odhlásiť sa</Text>
              </MenuOption>
            </MenuOptions>
            </Menu>
          </MenuProvider>
        <Text style={styles.text}>Recepty od Babky</Text>
        </View>
        <Text></Text>
        <Text style={styles.text}>Prihlásenie</Text>
        <View style={{ flexDirection: "row",alignItems: 'center', padding: 10}}>
          <Text>Login:  </Text>
          <TextInput style={styles.inputFields} 
          onChangeText={(login_pouzivatel) => this.setState({login_pouzivatel})}
          value={this.state.login_pouzivatel}
          />
        </View>
        <View style={{ flexDirection: "row",alignItems: 'center', padding: 10}}>
          <Text>Heslo:  </Text>
          <TextInput style={styles.inputFields} 
          onChangeText={(login_heslo) => this.setState({login_heslo})}
          value={this.state.login_heslo}
          />
        </View>
        <Button
          title="Prihlásiť sa"
          onPress={() => this.loginUser()}
        />
      </View>
    );
  }  
}
class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aktualny_user: 'user',
    };
  }

  async fetchZoznamReceptov() {
    //var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      //console.log('success', request.responseText);
      console.warn('success', request.response);
    } else {
       console.warn('error');
    }
  };
  request.open('GET', 'http://147.175.162.99:1337/parse/classes/recept');
  request.setRequestHeader("X-Parse-Application-Id", "myAppId");
  request.setRequestHeader("Content-type", "application/json");
  request.send(null);
  }

  render() {
    this.fetchZoznamReceptov();
    var Recepty = request.response;
    //console.warn(typeof(Recepty));
    return (
      <View style={styles.container}>
        <View style={styles.bar}>
        <MenuProvider style={{ flexDirection: "column"}}>
            <MenuTrigger>
              <Image
                resizeMode="contain"
                source={require('./assets/menu-icon.png')}>
              </Image>
            </MenuTrigger>
          </MenuProvider>
        <Text style={styles.text}>Recepty od Babky</Text>
        </View>
      <ScrollView>
        <Text>Recept 1</Text>
        <Text>Recept 2</Text>
        <Text>Recept 3</Text>
      </ScrollView>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  bar: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f44274',
  },
  text: {
    fontSize: 26,
    padding: 2,
    fontWeight: 'bold',
  },
  menuContent: {
    position: 'relative',
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 15
  },
  inputFields: {
    height: 40, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 2,
  }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);