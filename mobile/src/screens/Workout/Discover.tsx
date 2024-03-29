import React, { useEffect } from 'react';
import { Image } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';

const Discover = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const { getPrograms, getUserPrograms, programs, userPrograms } = useProgram();

  const fetch = async () => {
    await getPrograms();
    await getUserPrograms(currentUser!.user.id);
  }
  useEffect(() => {
    fetch()
  }, [currentUser])
  return (
    <SafeAreaView style={{ paddingHorizontal: 12, flex: 1 }}>
      <ScrollView style={{ marginTop: 12, marginBottom: 4 }} showsVerticalScrollIndicator={false}>
        {programs?.map((program: any) => {
          if (program.isPublic) {
            return (
              <TouchableHighlight
                key={program.id}
                style={styles.program}
                onPress={() =>
                  navigation.navigate('ProgramDetails', { program: program })
                }>
                <View>
                  <Image
                    style={{ width: '100%', height: 180, borderRadius: 8 }}
                    source={{ uri: program.main_img }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      left: 20,
                      width: '70%',
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    {!program.isFree ? (
                      <Text style={styles.tag}>Pro</Text>
                    ) : (
                      <Text
                        style={{
                          ...styles.tag,
                          backgroundColor: '#7D8F69',
                        }}>
                        Free
                      </Text>
                    )}
                    <Text style={{ fontSize: 18, color: '#fff' }}>
                      {program.type} {program.days} Days
                    </Text>
                    <Text
                      style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
                      {program.title}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          } else {
            return null
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  program: {
    marginBottom: 16,
  },
  tag: {
    color: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: theme.colors.secondary,
    marginRight: 'auto',
  },
  filterButton: {
    marginRight: 'auto',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.secondary,
  },
});

export default Discover;
