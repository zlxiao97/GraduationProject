import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  tea: {
    color: 'teal'
  },
  deepPink: {
    color: 'deeppink'
  },
  gray: {
    color: 'gray'
  },
  white: {
    color: 'white'
  },
  container: {
    flex: 1,
    marginTop: 50
  },
  bigBox: {
    width: 100,
    height: 100
  },
  smallBox: {
    width: 50,
    height: 50
  },
  largerBox: {
    width: 150,
    height: 150
  },
  bgBlue: {
    backgroundColor: 'powderblue'
  },
  bgSky: {
    backgroundColor: 'skyblue'
  },
  bgSteelBlue: {
    backgroundColor: 'steelblue'
  },
  bgred: {
    backgroundColor: 'red'
  },
  flex: {
    display: 'flex'
  },
  flexRow: {
    flexDirection: 'row'
  }, 
  mainCenter: {
    justifyContent: 'center'
  },
  crossCenter: {
    alignItems: 'center'
  },
  spaceEvenly: {
    justifyContent: 'space-evenly'
  }, 
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  alignContent: {
    alignContent: 'space-around'
  },
  middleSizeTextInput: {
    height: 50,
    borderWidth: 1
  },
  px30: {
      paddingHorizontal: 30
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  buttonBoxContainer: {
    paddingTop: 40,
    alignItems: 'center'
  },
  highHeight: {
    height: 1000
  },
  normalHeight: {
    height: 500,
  },
  fullWidth: {
    width: '100%'
  },
  textItem: {
    height: 66,
    padding: 18,
    fontSize: 20
  },
  sectionHeader: {
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1)'
  }
});

async function getAuthKey(){
  let data = await fetch(`http://120.26.77.19:3000/key`,{
    method: 'get'
  });
  let jsonData = await data.json();
  return jsonData
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };
  }

  componentDidMount(){
    getAuthKey().then(data=>{
      this.setState({
        data: data,
        isLoading: false
      });
    })
    .catch(err =>{
      console.log(err.message);
    });
  }

  render() {
    if(this.state.isLoading){
      return <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    }else{
      return (
        <View style={[styles.container,styles.spaceEvenly]}>
          <Text style={styles.textItem}>{this.state.data.accessToken}</Text>
          <Text style={styles.textItem}>{this.state.data.sessionKey}</Text>
        </View>
      )
    } 
  }
}