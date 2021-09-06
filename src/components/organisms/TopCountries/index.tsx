import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {CountryType} from '../../../stores/types';
import {CountryTopCard} from '../../molecules';
import styles from './style';

const {containerMain, subContainer, spacingHorizontal, gridStyle} = styles;

type CustomProps = {
  topCountryData: CountryType[];
};
const TopCountryStats: FunctionComponent<CustomProps> = ({topCountryData}) => {
  return (
    <View style={containerMain}>
      <View style={gridStyle}>
        <View style={subContainer}>
          <CountryTopCard countryData={topCountryData[0]} />
          <CountryTopCard countryData={topCountryData[2]} />
        </View>
      </View>
      <View style={spacingHorizontal} />
      <View style={[gridStyle]}>
        <View style={subContainer}>
          <CountryTopCard countryData={topCountryData[1]} />
          <CountryTopCard countryData={topCountryData[3]} />
        </View>
      </View>
    </View>
  );
};

export default TopCountryStats;
