import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import { RutaContext } from "./RutaContext";

export default function Mapa() {
  const [origin, setOrigin] = React.useState({
    latitude: 33.640411,
    longitude: -84.419853,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, []);
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // alert('Permission denied');
      ToastAndroid.show(response.data, ToastAndroid.SHORT);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }

  const { ruta, setRuta, newSituationAdded, setNewSituationAdded } =
    useContext(RutaContext);
  const [tienda, setTienda] = useState("");
  const [colonia, setColonia] = useState("");
  const [calle, setCalle] = useState("");
  const [cp, setCP] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const sendFormData = () => {
    if (!ruta || !tienda || !colonia || !calle || !cp || !lat || !lng || !date) {
      alert("Por favor, completa todos los campos");
      return;
    }


    //NOMÁS ES UNA VERIFICACIÓN PARA MI PAZ MENTAL, ESTE ELSE BORRALO A LA FREGADA

    else {
      ToastAndroid.show('Sí jala', ToastAndroid.SHORT);
    }

    const formData = {
       ruta: ruta,
      tienda: tienda,
      colonia: colonia,
      calle: calle,
      cp: cp,
      latitud: lat,
      longitud: lng,
      fecha: date,
    };

    // axios
    //   .post("https://onroute.fly.dev/situaciones", formData)
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("Situacion guardada");
    //     setSituation("");
    //     setDescription("");
    //     setDate(new Date());
    //     setText("Empty");
    //     setNewSituationAdded(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error al guardar la situación");
    //   });
  };

  const handleSubmit = () => {
    sendFormData();
  };

  return (
    <ScrollView style={styles.container}>
    
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker coordinate={origin} />
      </MapView>
      

      {/* FORMULARIO EMPIEZA AQUÍ  */}

      
        <View style={styles.form}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Tienda</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={tienda}
              onChangeText={(value) => setTienda(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Colonia</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={colonia}
              onChangeText={(value) => setColonia(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calle</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={calle}
              onChangeText={(value) => setCalle(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Código postal</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={cp}
              onChangeText={(value) => setCP(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Latitud</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={lat}
              onChangeText={(value) => setLat(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Longitud</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={lng}
              onChangeText={(value) => setLng(value)}
            />
          </View>
        </View>



          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
     
        </ScrollView>
  );
}

Mapa.navigationOptions = {
  drawerLabel: "Mapa",
  drawerIcon: () => <FontAwesome name="map" size={30} color="red" />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: 'center',
  },
  map: {
    width: 340,
    height: 200,
    alignSelf: 'center',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    height: 40,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#003566",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datepicker: {
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
