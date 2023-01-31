import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import storeData from '../../Helpers/Storage/storeData';
import { renderDoneButton, renderItem, renderNextButton } from './Screens';
import { slides } from './SlidesStyles';

const IntroSlider = ({setIsShowRealApp}:any):JSX.Element => {
    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            onDone={() => {
                setIsShowRealApp(true);
                storeData('is_intro_done', true);
            }}
        />
    )
}

export default IntroSlider;