import React from 'react'
import { View, ScrollView } from 'react-native';
import Header from './Header';
import Item from './Item';


const ListOfDC = (): JSX.Element => {
    return (
        <ScrollView>
            <Header />
            <View style={{ flex: 1 }}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </View>
        </ScrollView>
    )
}

export default ListOfDC;
