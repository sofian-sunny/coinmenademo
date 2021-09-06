import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useCovidStatsStore} from '../../stores/covidStatsStore';
import {useQuery} from 'react-query';
import {StackNavigationProp} from '@react-navigation/stack';
import {GlobalStats, TopCountryStats} from '../../components/organisms';
import {WelcomeText} from '../../components/molecules';
import {CovidStatsGraph, CardView, CustomText} from '../../components/atoms';
import {getTopCountriesData} from '../../utils/helper';
import commonStyles from '../../styles';
import {CountryType} from '../../stores/types';
import styles from './style';
import {en} from '../../i18n';
import {apiEndPoints} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {MainRoutes, MainStackParamList} from '../../navigation/routes';
import {ScrollView} from 'react-native-gesture-handler';

const {container} = commonStyles;
const {subContainer, viewMore, viewMoreContainer, loaderContainer} = styles;
const {summary, world} = apiEndPoints;
type homeScreenProp = StackNavigationProp<MainStackParamList, MainRoutes.Home>;

const HomeScreen = (): React.ReactElement => {
  const navigation = useNavigation<homeScreenProp>();

  const covidStatsStore = useCovidStatsStore((state: any) => state);

  const {isLoading, data} = useQuery(summary, () =>
    covidStatsStore.fetchCovidStats(summary),
  );

  const globalStatsResponse = useQuery(world, () =>
    covidStatsStore.fetchCovidWorldStatsByDate(world),
  );

  const globalStatsData = globalStatsResponse?.data
    ?.sort(
      (a: any, b: any) =>
        new Date(b.Date).getTime() - new Date(a.Date).getTime(),
    )
    .slice(0, 5);

  let topFiveCountryData: CountryType[] = [];
  if (data) {
    topFiveCountryData = getTopCountriesData(data);
  }

  const onPressViewAll = () => {
    const {Countries} = data;
    navigation.navigate(MainRoutes.AppCountries, {
      countriesCovidStatsList: [...Countries],
    });
  };

  const showLoader = () => {
    if (!isLoading && !globalStatsResponse.isLoading) {
      return null;
    }

    return <ActivityIndicator style={loaderContainer} />;
  };

  const renderGlobalStats = () => {
    if (!data) {
      return null;
    }
    const {Global} = data;
    return <GlobalStats globalData={Global} />;
  };

  const renderStatsGraph = () => {
    if (!globalStatsData || !globalStatsData.length) {
      return null;
    }

    return (
      <CardView>
        <CovidStatsGraph data={globalStatsData} />
      </CardView>
    );
  };

  const renderTopCountriesStats = () => {
    if (!topFiveCountryData || !topFiveCountryData.length) {
      return null;
    }

    return (
      <View>
        <TopCountryStats topCountryData={topFiveCountryData} />
      </View>
    );
  };

  return (
    <View style={container}>
      <SafeAreaView>
        <WelcomeText />
        <View>{renderGlobalStats()}</View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={subContainer}>
            <View>{renderStatsGraph()}</View>
            <TouchableOpacity
              style={viewMoreContainer}
              activeOpacity={0.7}
              onPress={onPressViewAll}>
              <CustomText style={viewMore} textType="regular">
                {en.vew_more}
              </CustomText>
            </TouchableOpacity>
            <View style={subContainer}>{renderTopCountriesStats()}</View>
            {showLoader()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
