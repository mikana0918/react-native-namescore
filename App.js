import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Form,
  TextInput,
  Alert
   } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

//ホーム画面
class HomeScreen extends React.Component {
  constructor (props){
    super(props)
    //stringで初期化したいので
    this.state = {value:String}
  }
  static navigationOptions = {
    title: 'Enter your Name',
  };


  render(){
    //イベントをメソッドにバインド
    //stateにストリングをいれながらバリデーションする方法わからず
    const doChange = (e) => this.doChange(e)
    return (
      <View style={styles.container}>

        <Text>React-name-score</Text>

         <TextInput 
         type = 'text' 
         onChange={doChange} 
         onChangeText={
         value => this.setState({value})}
         placeholder ='Enter your name'
         style = {styles.yourName}/>


        <Text
        onPress={() => this.props.navigation.navigate('Results')}
        style = {styles.seeResult}>
          See the Result</Text>
      </View>
    );
  
  }


  //なまえ（string）以外をはじくバリデーション(triggerd when {doChange})
  doChange = (e) => {
    const curValue = this.state.value
  //stringをのぞく
  //if文でアラートなら関数へ飛ばす
   if(typeof curValue !== 'string'){
    return this.makeCaution()
   } else {return}}
  //this.setState({value: event.target.value});

  //ストリング以外ならアラート
  makeCaution = (e) => {
    Alert.alert(
      'Please enter your name here',
      'Numbers are not accepted here',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  
}

//結果画面
class ResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Results',
  };

  render(){
    return(
      <View style={styles.container}>
      <Text>Your Score is...</Text>
      <Text>{this.randNum()}</Text>
    </View>
    );
  }

//１−９９の乱数を生成するクラス（スコア用。１００出る？）
randNum = () => {
  var n = 1+ Math.floor(Math.random() * 100)
  return n
};
}



//遷移先ページをクラス名で指定する
//initialRouteName はメインクラスみたいな?
const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Results: ResultScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  //入力したテキストをどこで管理するか、、
  constructor(props){
    super(props)
    //initialize state
    this.state = {text: ''}
  }

  render() {
    return <AppContainer />;
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //text input field
  yourName: {
    height:40,
    fontSize:30,
    width:'auto',
  },
  seeResult: {
    color: '#147efb'
  }
});
