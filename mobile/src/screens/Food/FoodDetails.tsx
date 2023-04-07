import { useState, useEffect } from 'react';
import { Image } from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';

const FoodDetails = ({ navigation, route }: any) => {
  const { currentUser } = useAuth();
  const { addFood, updateFood } = useDailyNutrition();
  const { daily_nutrition_id, food_id } = route.params;
  const { foodId, label, image, nutrients, category } = route.params.item;
  const [poid, setPoid] = useState(route.params.type === 'daily_nutrition' ? route.params.weight : '');

  const updateDailyNutrition = async () => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (route.params.type === 'daily_nutrition') {
      await updateFood(daily_nutrition_id, food_id, poid);
    } else {
      const date = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
      await addFood(currentUser!.user!.id, date, { name: label, api_id: foodId, category: category, poid, energy: nutrients.ENERC_KCAL * (poid / 100) | 0, protein: nutrients.PROCNT * (poid / 100) | 0, fat: nutrients.FAT * (poid / 100) | 0, fiber: nutrients.FIBTG * (poid / 100) | 0, carbohydrate: nutrients.CHOCDF * (poid / 100) | 0, time: `${h}:${m}:${s}` })
      setPoid('');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: image || 'https://placehold.jp/400x500.png' }}
            style={{
              height: 400,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />

          <View style={styles.details}>
            <View style={styles.heading}>
              <Text style={styles.title}>{label}</Text>
              <TouchableWithoutFeedback>
                <Icon name="heart" size={20} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={styles.tag}>
                <Text style={{ fontSize: 13 }}>{category}</Text>
              </View>
            </View>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: theme.colors.statusBar,
              }}>
              <Row
                data={['Nutrients', 'PER 100 G']}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={[
                  ['Energy (cal)', nutrients?.ENERC_KCAL | 0],
                  ['Protein (g)', nutrients?.PROCNT | 0],
                  ['Fat (g)', nutrients?.FAT | 0],
                  ['Fiber, total dietary (g)', nutrients?.FIBTG | 0],
                  ['Carbohydrate (g)', nutrients?.CHOCDF | 0],
                ]}
                textStyle={styles.text}
              />
            </Table>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                marginBottom: 24,
              }}>
              <CustomTextInput
                placeholder="Weight (g)"
                keyboardType="numeric"
                inputMode="numeric"
                value={poid.toString()}
                onChangeText={setPoid}
              />
              <TouchableOpacity style={styles.addButton} onPress={updateDailyNutrition}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  {route.params.type === 'daily_nutrition' ? 'Update Weight' : 'ADD TO YOUR DAILY DIET'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
    position: 'absolute',
    top: 12,
    left: 8,
  },
  details: {
    paddingHorizontal: 24,
    paddingTop: 36,
    marginBottom: 48,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: theme.colors.background,
    top: -32,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  tag: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
  head: {
    height: 40,
    backgroundColor: theme.colors.statusBar,
  },
  text: {
    margin: 6,
  },
  addButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.button,
  },
});
export default FoodDetails;
