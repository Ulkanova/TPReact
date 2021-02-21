import React, {useContext,useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {StoreContext} from '../context/storeContext';
import BottomSheetModal from './bottomSheetModal';


const styles = StyleSheet.create({
    card: {flex: 1, margin: 5},    
  cardText: {textAlign: 'center', fontWeight: 'bold'},
  contenedor: {flex:1},
textInput: {
    height: 40,
    borderColor: 'darkgrey',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
    marginHorizontal: 10,
  },
boton: {
    margin:10,
    borderRadius:10,
},
button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
});

export const Usuarios = () => {

  const [listaDeUsuarios, setUsuarios] = useState([]);
  const [nombreNuevoUsuario, setNombreNuevoUsuario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [emailNuevoUsuario, setEmailNuevoUsuario] = useState('');
  const screenDirection = useOrientation();
  const crearUsuario = () => {
    setUsuarios([
      ...listaDeUsuarios,
      {
        nombre: nombreNuevoUsuario,
        email: emailNuevoUsuario,
        id: Math.random(),
      },
    ]);
    setNombreNuevoUsuario('');
    setEmailNuevoUsuario('');
    
  };
  return (
    <View style={styles.contenedor}>
        <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title="Crear un usuario">
        <>
           <TextInput
        placeholder="Nombre de Usuario"
        style={styles.textInput}
        value={nombreNuevoUsuario}
        onChangeText={(nuevoTexto) => {
          setNombreNuevoUsuario(nuevoTexto);
        }}
        />
        <TextInput
          placeholder="Email del Usuario"
          style={styles.textInput}
          value={emailNuevoUsuario}
          onChangeText={(nuevoTexto) => {
            setEmailNuevoUsuario(nuevoTexto);
          }}
        />
        <Button style={styles.boton} onPress={() => crearUsuario()}>
        Crear Usuario
      </Button>
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
    <FlatList
        data={listaDeUsuarios}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={styles.cardText}>{item.nombre}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
  
};


const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;