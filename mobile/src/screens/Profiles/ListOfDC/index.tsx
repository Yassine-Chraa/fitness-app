import React from 'react'
import { View, ScrollView, Button } from 'react-native';
import Header from './Header';
import Item from './Item';


const ListOfDC = (): JSX.Element => {
    return (
        <View>


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
            <View style={{ position: 'absolute', bottom: 0, left: 0,width: '100%', height: 40 }}>
                <Button title='Post Your Demand' />
            </View>
        </View>
    )
}

export default ListOfDC;
