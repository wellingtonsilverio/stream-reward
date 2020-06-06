import {StyleSheet} from 'react-native';

import colors from '../../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.blueDark,
  },
  container: {flex: 1},

  topBar: {
    height: 40,

    marginHorizontal: 8 * 2,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  topBarTitle: {fontSize: 8 * 2},
  topBarContainer: {flexDirection: 'row', alignItems: 'center'},
  topBarContainerMonetas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4 * 3,
  },
  topBarContainerMonetasCoin: {marginRight: 2, marginTop: 8},
  topBarContainerMonetasValue: {fontSize: 8 * 3},
});

export default styles;
