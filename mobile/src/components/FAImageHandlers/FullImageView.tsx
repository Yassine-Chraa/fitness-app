import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const FullImageView = ({ source, onClose }: any): JSX.Element => {
  return (
    <Modal visible={true} transparent={true}>
      <TouchableOpacity onPress={onClose} style={styles.modalBackground}>
        <Image source={source} resizeMode="contain" style={styles.image} />
      </TouchableOpacity>
    </Modal>
  );
};

export default FullImageView;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
