
import { StyleSheet, Text, View, StatusBar, PermissionsAndroidM} from 'react-native';
import { useEffect, useState } from "react";
import MapView, {Marker} from 'react-native-maps';
import * as Location from "expo-location";


export default function App() {
  const [region, setRegion] = useState(null);
  const [makers, setMarkers] = useState([])
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
     
      console.log(location.coords.latitude)
      console.log(location.coords.longitude)
      setRegion({
      latitude:  location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.922,
      longitudeDelta: 0.421,
      })
    })();

   
  }, [])

  const newMarker = (e)=>{
  console.log(e.nativeEvent.coordinate);
  let dados ={ 
    key : makers.length,
    coords: {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    pinColor: '#ff0000'

  }

  setRegion({
    latitude: e.nativeEvent.coordinate.latitude,
    longitude: e.nativeEvent.coordinate.longitude,
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  })

  setMarkers(old => [...old, dados])
}
  
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={(e)=> newMarker(e)}
      >
       {makers.map(mark =>{
        return(
          <Marker 
          key={mark.key} 
          coordinate={mark.coords} 
          pinColor={mark.pinColor}  
          />
        )
       })} 
      </MapView>
      <StatusBar  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  map:{
    width: "100%",
    height: "100%",

    
  }
});
