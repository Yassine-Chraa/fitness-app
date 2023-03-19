import {Image} from '@rneui/themed';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';

const CoachCard = ({item}: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('CoachProfile', {
          item,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 12,
          width: '90%',
        }}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/22.jpg'}}
          style={{height: 60, width: 60, borderRadius: 30}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.itemDesc}>
          <View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', columnGap: 6}}>
            {['Body Building','General Fitness'].map((badge: any,index:number) => {
              return (
                <View style={styles.tag} key={index}>
                  <Text style={{fontSize: 13}}>{badge}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}} activeOpacity={0.4}>
        <Icon name="chevron-right" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: theme.colors.background,
  },
  itemDesc: {
    width: '50%',
    rowGap: 4,
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: theme.colors.statusBar,
  },
});
export default CoachCard;
