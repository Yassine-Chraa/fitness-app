import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import CoachCard from '../../components/Cards/CoachCard';

const Coaches = () => {
  const coaches = [
    {
      id: 1,
      name: 'Yassine Chraa',
      badges: ['Body Building','General Fitness'],
    },
    {
      id: 2,
      name: 'Alan Walker',
      badges: ['Body Building'],
    },
  ];
  return (
    <Screen name={'Coaches'} action="search" backButton actionButton actionButtonType='Become a coach'>
      <FlatList
        contentContainerStyle={{rowGap: 12,paddingBottom: 8,paddingTop: 8}}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={coaches}
        renderItem={({item}: any) => <CoachCard item={item} />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.statusBar,
    borderRadius: 16,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
    borderRadius: 40,
  },
  filterButton: {
    marginRight: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.customCard,
  },
});

export default Coaches;
