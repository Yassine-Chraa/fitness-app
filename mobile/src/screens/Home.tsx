import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import Screen from '../components/Screen';
import theme from '../constants/theme';

function Home({navigation}: any): JSX.Element {
  const cardWidth = Dimensions.get('window').width - 56;
  const [indicateur, setIndicateur] = useState(0);
  console.log(indicateur);
  const gymIntro = [
    {
      id: 1,
      image: require('../assets/images/items/item1.jpg'),
      title: 'Item1',
    },
    {
      id: 2,
      image: require('../assets/images/items/item2.jpg'),
      title: 'Item2',
    },
    {
      id: 3,
      image: require('../assets/images/items/item3.jpg'),
      title: 'Item3',
    },
  ];
  const products = [
    {
      id: 1,
      image: require('../assets/images/products/product1.jpg'),
      title: 'Item1',
    },
    {
      id: 2,
      image: require('../assets/images/products/product4.jpg'),
      title: 'Item2',
    },
    {
      id: 3,
      image: require('../assets/images/products/product2.jpg'),
      title: 'Item3',
    },
    {
      id: 4,
      image: require('../assets/images/products/product3.jpg'),
      title: 'Item4',
    },
    {
      id: 5,
      image: require('../assets/images/products/product5.jpg'),
      title: 'Item5',
    },
  ];
  return (
    <Screen name="Fitness App" allowScroll>
      <View>
        <View style={styles.card}>
          <View>
            <Text style={styles.subtitle}>Calories</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PieChart
              data={[
                {
                  name: 'TDEE',
                  calories: 2000,
                  color: theme.colors.secondary,
                  legendFontColor: theme.colors.text,
                  legendFontSize: 14,
                },
                {
                  name: 'Food',
                  calories: 2400,
                  color: theme.colors.primary,
                  legendFontColor: theme.colors.text,
                  legendFontSize: 14,
                },
                {
                  name: 'Rest',
                  calories: 2400 - 2000,
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
            />
          </View>
        </View>
        <Swiper
          style={{height: 325}}
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
