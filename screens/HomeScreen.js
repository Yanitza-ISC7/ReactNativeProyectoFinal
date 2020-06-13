import * as WebBrowser from "expo-web-browser";
var dateActual = new Date();
var fecha =
  dateActual.getFullYear() +
  "-" +
  (dateActual.getMonth() + 1) +
  "-" +
  (dateActual.getDate() - 1);

  

import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

var confirmed = 0;
var country = "";
var dead = 0;

fetch(
  "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date="+fecha+"&name=hungary",
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
    country = responseJson[0].country;
    document.getElementById("Country").innerHTML = "Country:  "+country;
    document.getElementById("Confirmed").innerHTML =
      "Confirmed:  " + responseJson[0].provinces[0].confirmed;
    document.getElementById("Dead").innerHTML ="Deaths:  " + responseJson[0].provinces[0].deaths;
    document.getElementById("Infected").innerHTML =
      "Infected:  " + responseJson[0].provinces[0].active;
    document.getElementById("Recovered").innerHTML =
      "Recovered:  " + responseJson[0].provinces[0].recovered;
    document.getElementById("Date").innerHTML="Date: "+fecha;
    
  })
  .catch((err) => {
    console.log(err);
  });

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Image
            source={
              __DEV__
                ? require("../assets/images/Covid2.jpg")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.Custom}>
            This information is about:
          </Text>
          
          <View >
          <Text id="Country"></Text>
          <Text id="Confirmed"></Text>
          <Text id="Dead"></Text>
          <Text id="Infected"></Text>
          <Text id="Recovered"></Text>
          <Text id="Date"></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        This is an application to display the information about the Covid-19
        pandemic.
      </Text>
    );
  } else {
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "black",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    fontWeight:"bold",
  },
  contentContainer: {
    paddingTop: 5,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 250,
    height: 270,
    resizeMode: "contain",
    
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    backgroundColor: "white",
    padding: 15,
    
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "black",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
 
});
