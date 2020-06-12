import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

var confirmed = 0;
var country = "";
var dead = 0;

fetch(
  "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=alemania",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "f882846245msha9b7bb801cebfb1p1309f9jsn1c70aec8ceb6",
    },
  }
)
  .then((response) => response.json())
    .then((responseJson) => {
      confirmed = responseJson[0].
      console.log(responseJson[0]);
      document.getElementById("hola").innerHTML =
        "Pais: " + responseJson[0].country;
    })
    
    .catch((err) => {
      console.log(err);
    });

  fetch(
    "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=Mexico",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "7566623650mshc72222b7e573bfep112b5djsn1120ff4957f4",
      },
    }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson[0]);
      document.getElementById("hola").innerHTML =
        "Pais: " + responseJson[0].country;
    })
    .catch((error) => {
      console.error(error);
    });

export default function HomeScreen() {
  return (
    <div>

    </div>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  
});
