import React from 'react'
import {StyleSheet, View, Text} from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import {FlatList} from 'react-native-gesture-handler';
import GymCard from '../../components/Cards/GymCard';

const GymLocation = () => {
  const GymLocations = [
    {
      id: 1,
      name: 'Golden Gym',
      address: '66 AV noble Narjiss B Fes RCE SALAM...',
      current: true,
    },
    {
      id: 2,
      name: 'Adrigym',
      address: 'Rue Moulay Ahmed Azzarhouni, Fès...',
      current: false,
    },
    {
      id: 3,
      name: 'Home Gym',
      address: 'Rue Moulay Ahmed Azzarhouni, Fès...',
      current: false,
    },
  ];
  return (
    <Screen name="Gym Location" noAction backButton>
      <View style={{rowGap: 48, marginTop: 24,marginHorizontal: 4 }}>
        <View>
          <Text style={{...styles.subtitle, marginBottom: 16}}>Current Gym</Text>
          <GymCard item={GymLocations[0]} />
        </View>
        <View>
          <Text style={styles.subtitle}>Nearby Gyms</Text>
          <FlatList
            contentContainerStyle={{
              rowGap: 12,
              paddingBottom: 8,
              paddingTop: 4,
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={GymLocations}
            renderItem={({item}: any) =>
              !item.current ? <GymCard item={item} /> : null
            }
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});

export default GymLocation;
