import * as React from "react";
var date = new Date();
var dateCovit =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  const [covid, getcovid19] = React.useState([]);
  React.useEffect(() => {
    fetch(
      "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=" +
        dateCovit +
        "&name=Mexico",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "f882846245msha9b7bb801cebfb1p1309f9jsn1c70aec8ceb6",
        },
      }
    )
      .then((respuesta) => respuesta.json())
      .then((respuesta_Json) => {
        var array = respuesta_Json[0].provinces;
        getcovid19(array);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // var icon = this.props.active;
  return (
    <View style={styles.container}>
      <FlatList
        data={covid}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.titleCovid}>Covid-19</Text>
            <Image
              style={styles.welcomeImage}
              source={require("./assets/images/covid19.jpg")}
            />

            <Text style={styles.titles}>Province: {item.province}</Text>
            <Text style={styles.values}>---------------------------------</Text>
            <Text style={styles.titles}>Cases Confirmed:</Text>
            <Text style={styles.values}>{item.confirmed}</Text>
            <Text style={styles.values}>---------------------------------</Text>
            <Text style={styles.titles}>Deaths:</Text>
            <Text style={styles.values}>{item.deaths}</Text>
            <Text style={styles.values}>---------------------------------</Text>
            <Text style={styles.titles}>Date Test</Text>
            <Text style={styles.values}>{dateCovit}</Text>
            <Text style={styles.values}>---------------------------------</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  titles: {
    fontSize: 22,
    textAlign: "center",
    margin: 10,
  },
  titleCovid: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "black",
  },
  values: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
    marginBottom: 5,
  },
  welcomeImage: {
    width: 300,
    height: 160,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
});
