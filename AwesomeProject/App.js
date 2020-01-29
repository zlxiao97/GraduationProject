import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';

const key = '5f1d9b1d4595b3c80d80460b35fff034';
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

class Blink extends Component {
  componentDidMount() {
    setInterval(() => {
      this.setState(previousState => ({
        isShowingText: !previousState.isShowingText
      }));
    }, 1000);
  }
  state = { isShowingText: true };

  render() {
    if (this.state.isShowingText) {
      return (
        <Text style={this.props.style}>{this.props.text}</Text>
      )
    } else {
      return null;
    }
  }
}

async function getData(appkey){
  let data = await fetch(`http://web.juhe.cn:8080/fund/zcgjj/?key=${appkey}`,{
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
      data: []
    };
  }

  _onPressButton(){
    alert('pressed the button!');
  }

  _onLongPressButton(){
    alert('long pressed the button!');
  }

  componentDidMount(){
    getData(key).then(data=>{
      let jsonObj = data.result[0];
      let arr = Object.keys(jsonObj).map(k=>jsonObj[k]).slice(0,100);
      this.setState({
        data: arr,
        isLoading: false
      });
    })
    .catch(err =>{
      console.log(err.message);
    });
  }

  render() {
    return (
      <View style={[styles.container,styles.spaceEvenly]}>
        {/* <ScrollView pagingEnabled> */}
          {/* <View style={[styles.flex,styles.mainCenter,styles.normalHeight]}>
            <View style={[styles.px30]}>
              <TextInput
                style={[styles.middleSizeTextInput]}
                placeholder='      Input something'
                value={this.state.text}
                onChangeText={(text)=>{this.setState({text})}}
              />
            </View>
          </View>
          <View style={[styles.maincenter,styles.normalHeight,styles.bgSky]}>
            <Blink text={this.state.text.split(' ').map(i=>i&&'🍕').join(' ')} style={styles.deepPink}></Blink>
          </View>
          <View style={[styles.buttonBoxContainer,styles.normalHeight]}>
            <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>HighLight</Text>
              </View>
            </TouchableHighlight>
            <TouchableOpacity onPress={this._onPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Opacity</Text>
              </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={this._onPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>WithoutFeedback</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>LongPress</Text>
              </View>
            </TouchableHighlight>
          </View> */}
            <FlatList
              data={this.state.data}
              renderItem={({item})=>(<Text style={[styles.textItem]}>{item.name}</Text>)}
              keyExtractor={(item,index)=>''+index}
            />
        {/* </ScrollView> */}
      </View>
    )
  }
}
