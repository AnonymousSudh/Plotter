import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
// import {width,height} from 'react'
import Section from '../util/Section'
const { width, height } = Dimensions.get("window")
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

// Set your Geocoding API key here
Geocoder.init('AIzaSyDDv7TI6TaeqeKZZTd51AEU0MIswuGIcGo');
// AIzaSyDDv7TI6TaeqeKZZTd51AEU0MIswuGIcGo
const Home = () => {

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchCityName = async () => {
    if (location) {
      try {
        const response = await Geocoder.from(location.latitude, location.longitude);
        const cityName = response.results[0].address_components.find(
          (component) => component.types.includes('locality')
        ).long_name;
        setCity(cityName);
        console.log(city);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchCityName();
  }, [location]);

  return (
    <SafeAreaView style={{ backgroundColor: "red", width, height }}>
      <View style={styles.LogoSection}>
        <Image source={require('../images/Plotter_Logo.png')} style={styles.LogoSection.logo} />
        <View style={styles.LogoSection.Location}>
          <Image source={require('../images/location.png')} style={styles.LogoSection.location} />
          <Text style={{ borderWidth: 1, borderColor: "black", padding: 2 }}>{city}</Text>


        </View>

      </View>
      <View>
        {location ? (
          <View>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
            <Text>{city}</Text>
          </View>
        ) : (
          <Text>Loading location...</Text>
        )}
        <Button title="Refresh Location" onPress={fetchLocation} />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  LogoSection: {
    borderWidth: 1,
    borderColor: "black",
    maxWidth: width,
    maxHeight: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal:10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    logo: { width: width / 3, height: 60, resizeMode: 'contain' },
    location: { width: 25, height: 25, resizeMode: 'contain', },
    Location: {
      // borderWidth: 1,
      // borderColor: "black",
      display: "flex",
      flexDirection: "row",
      // justifyContent:""
    }
  },


})