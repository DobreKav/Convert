import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Picker } from '@react-native-picker/picker'
import convert from 'convert-units'
import Constants from 'expo-constants'

// const measures
const measures = convert().measures()
// set main color
const mainColor = '#052F5F'

const MeasureView = ({measure}) => {
  const units = convert().possibilities(measure)
  // zacuvuvanje na odbran unit
  const [fromUnit, setFromUnit] = useState(units[0])
  // output od konvert
  const [toUnit, setToUnit] = useState(units[1])
  // konstanta za vnesuvanje
  const [value, setValue] = useState('0')
  const [valueConverted, setValueConverted] = useState(0)

  useEffect(() => {
    setValueConverted(
      convert(+value)
      .from(fromUnit)
      .to(toUnit)
      .toFixed(2))
  }, [value, fromUnit, toUnit])



  return(
  <View styles={styles.scene}>
    <View styles={styles.row}>
      {/* izbor na edinica za konvertiranje*/}
      <Picker 
      styles={styles.column} 
      selectedValue={fromUnit} 
      onValueChange={setFromUnit}
      >
        {units.map( (unit, i) => (
          <Picker.Item label={unit} value={unit} key={i}/>
        ))}
      </Picker>
      {/*  */}
      <View style={styles.column}>
          <TextInput 
          value={value} 
          onChangeText={setValue}
          keyboardType="numeric"
          style={styles.input}
          />
      </View>
    </View>
    {/* output na konvertiranje */}
    <View styles={styles.row}>
      {/* izbor na edinica */}
      <Picker 
      styles={styles.column} 
      selectedValue={toUnit} 
      onValueChange={setToUnit}
      >
        {units.map( (unit, i) => (
          <Picker.Item label={unit} value={unit} key={i}/>
        ))}
      </Picker>
      {/*  */}
      <View style={styles.column}>
          <Text style={[styles.input, {fontSize: 40, fontWeight: 'bold'}]} >{valueConverted}</Text>
      </View>
    </View>
  </View>
   )
  }


function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1')  
}
// MAIN FUNCTION
export default function App() {
  const [index, setIndex] = useState(0)
  const [routes] = useState(measures.map(m => ({ key: m, title: unCamelCase(m) })))
  // console.log(routes) 

  // render scenes
  const renderScene = ({route}) => {
    return <MeasureView measure={route.key}/>
  }
  return (
    <View style={[styles.scene, {marginTop: Constants.statusBarHeight}]}>
      <Text style={styles.title}>Unit converter Dobre</Text>
      <TabView navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width }} 
        renderTabBar={(props) => (
          <TabBar {... props} 
          scrollEnabled 
          tabStyle={{width: 'auto'}}
          indicatorStyle={{backgroundColor: 'white'}}
          style={{backgroundColor: mainColor}}/>
        )}     
      >

      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1, 
     
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    color: mainColor,
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
    flex:1,
    flexDirection: 'column',
    
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    height: 50,
    borderColor: mainColor,
    borderBottomWidth: 1,
    fontSize: 30,
    textAlign: 'center',
  }
});
