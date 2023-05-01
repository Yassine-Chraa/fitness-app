import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import Screen from '../components/Screen';
import theme from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from '../Helpers/Storage/getData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setIsCheckStateOk, setIsError, useUIController } from '../context/UIContext';

function Home(): JSX.Element {
  const cardWidth = Dimensions.get('window').width - 56;

  const [userCalories, setUserCalories] = useState({
    Food: 1800,
    TDEE: 2000,
    Rest: 200,
  });
  return (
    <Screen name="Fitness App" allowScroll>

      {/* this section just for test */}
      <Tester />

      <View>
        <View style={styles.card}>
          <View>
            <Text style={styles.subtitle}>Calories (cal)</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PieChart
              paddingLeft='0'
              data={[
                {
                  name: 'TDEE',
                  calories: userCalories['TDEE'],
                  color: theme.colors.secondary,
                  legendFontColor: theme.colors.text,
                  legendFontSize: 14,
                },
                {
                  name: 'Food',
                  calories: userCalories['Food'],
                  color: theme.colors.primary,
                  legendFontColor: theme.colors.text,
                  legendFontSize: 14,
                },
                {
                  name: 'Rest',
                  calories: userCalories['Rest'],
                  color: theme.colors.statusBar,
                  legendFontColor: theme.colors.text,
                  legendFontSize: 14,
                },
              ]}
              width={cardWidth}
              height={180}
              chartConfig={{
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="calories"
              backgroundColor="transparent"
              absolute
            />
          </View>
        </View>
        <Swiper
          style={{ height: 325 }}
          loop={false}
          activeDotColor={theme.colors.primary}>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.subtitle}>Weight</Text>
              <Icon name="plus" color={theme.colors.text} size={16} />
            </View>
            <View>
              <LineChart
                data={{
                  labels: [
                    '01/05',
                    '01/10',
                    '01/15',
                    '01/20',
                    '01/25',
                    '01/30',
                    '02/05',
                  ],
                  datasets: [
                    {
                      data: [72.2, 73, 72.4, 73.5, 73.1, 74, 73.9],
                      strokeWidth: 1.5,
                    },
                  ],
                }}
                width={cardWidth}
                height={200}
                chartConfig={{
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                withDots={false}
                transparent
                bezier
                withVerticalLines={false}
                segments={2}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.subtitle}>Energy expended</Text>
            <View>
              <BarChart
                yAxisLabel='0'
                yAxisSuffix='0'
                data={{
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'Sat'],
                  datasets: [
                    {
                      data: [1800, 2400, 1500, 1600, 2300, 1800, 1500],
                    },
                  ],
                }}
                fromZero
                width={cardWidth}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: theme.colors.background,
                  backgroundGradientTo: theme.colors.background,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.5,
                }}
                showBarTops={false}
                withInnerLines={false}
              />
            </View>
          </View>
        </Swiper>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '500',
  },
  textMore: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  card: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 6,
    rowGap: 20,
    backgroundColor: theme.colors.background,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  circlBar: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

export default Home;


//============================================================

const Tester = () => {
  const [controller, dispatch] = useUIController()

  const pressHandler = () => {
    setIsCheckStateOk(dispatch,
      {
        isCheck: true,
        isSuccess: true,
        message: "You have updated your profil successfully !"
      });
    // setIsError(dispatch, true);
  }

  return (
    <TouchableOpacity activeOpacity={0.6}
      onPress={pressHandler}
      style={btnStyle.btnContainer}
    >
      <Text style={btnStyle.button}>
        Test Test
      </Text>
    </TouchableOpacity>
  );
};

const btnStyle = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingVertical: 20,
    color: "white"
  },
  btnContainer: {
    backgroundColor: "blue",
    margin: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "red",
  }
});
