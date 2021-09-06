import React, {useState} from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';
import {AllCountriesProps} from '../../navigation/routes';
import {CountryListIItem} from '../../components/molecules';
import {CustomTextInput} from '../../components/atoms';
import {CountryType} from '../../stores/types';
import {sortCovidStatsData} from '../../utils/helper';
import commonStyles from '../../styles';
import styles from './style';

const {container} = commonStyles;
const {subContainer, searchText, sortContainer} = styles;

const AllCountries = ({route}: AllCountriesProps): React.ReactElement => {
  const {countriesCovidStatsList} = route?.params || undefined;

  const [countryStats, setCountryStats] = useState<CountryType[]>([
    ...countriesCovidStatsList,
  ]);
  console.log('route ', countriesCovidStatsList);

  const renderItem = ({item}) => {
    return <CountryListIItem countryData={item} />;
  };

  const onSearchTextChange = (seachText: string) => {
    let filteredList = countriesCovidStatsList.filter(item =>
      item.Country.includes(seachText),
    );
    setCountryStats([...filteredList]);
  };

  const sortCovidStatistics = (
    sortParam: 'TotalDeaths' | 'TotalRecovered' | 'NewConfirmed',
  ) => {
    console.log('sortCovidStatistics');

    let sortedItemsList = sortCovidStatsData(
      countriesCovidStatsList,
      sortParam,
    );
    setCountryStats([...sortedItemsList]);
  };

  console.log('countryStats ', countryStats);

  return (
    <View style={container}>
      <SafeAreaView style={subContainer}>
        <CustomTextInput
          onChangeTextValue={(text: string) => onSearchTextChange(text)}
          keyboardType={'numeric'}
          style={searchText}
          placeholderText="Search"
        />
        <View style={sortContainer}>
          <Text>Sort By: </Text>
          <Text onPress={() => sortCovidStatistics('NewConfirmed')}>New </Text>
          <Text onPress={() => sortCovidStatistics('TotalDeaths')}>
            Deaths{' '}
          </Text>
          <Text onPress={() => sortCovidStatistics('TotalRecovered')}>
            Recovered
          </Text>
        </View>
        <FlatList
          data={countryStats}
          keyExtractor={item => `row-${item.ID}`}
          renderItem={renderItem}
          extraData={countryStats}
        />
      </SafeAreaView>
    </View>
  );
};

export default AllCountries;
