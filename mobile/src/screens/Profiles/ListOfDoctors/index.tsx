import React from 'react'
import { View, ScrollView } from 'react-native';
import Header from './Header';


const ListOfDoctors = (): JSX.Element => {
    return (
        <ScrollView>
            <Header />
        </ScrollView>
    )
}

export default ListOfDoctors;
