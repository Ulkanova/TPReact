import {Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'rgba(197, 227, 240,0.9)',
    paddingVertical: 10,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    height: '50%',
    padding: 24,
    borderColor: 'rgba(0, 179, 255,0.5)',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalTileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  titulo:{
    color:'#004461',
  },
  icon: {width: 32, height: 32},
});

const BottomSheetModal = ({title, visible, onClosePressed, children}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalTileView}>
            <Text category="h5" style={styles.titulo}>{title}</Text>
            {!!onClosePressed && ( //Hacemos !!onClosePressed para mostrar el boton solo si le pasamos un onClose
              <Pressable onPress={() => onClosePressed()}>
                <Icon style={styles.icon} fill="#000000" name="close" />
              </Pressable>
            )}
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetModal;
