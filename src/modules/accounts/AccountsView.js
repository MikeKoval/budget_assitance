import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  RefreshControl
} from 'react-native';
import ActionButton from 'react-native-action-button';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AppStore from '../../stores/AppStore';
import {COLOR, PRIMARY_COLORS} from 'react-native-material-design';

// import AppActions from '../../actions/AppActions';

export default React.createClass({
  propTypes: {
    loaded: PropTypes.bool.isRequired,
    items: PropTypes.array,

    getAll: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.props.getAll();
  },

  // changeTheme(theme) {
  //   AppActions.updateTheme(theme);
  // },

  onChangeTab({i}) {
    const {items} = this.props;
    const item = items[i];

    // console.log(items, i, item);

    // this.changeTheme(item.color);
  },

  render() {
    const {loaded, items} = this.props;

    const theme = AppStore.getState().theme;

    if (!loaded) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    // console.log(PRIMARY_COLORS);
    // console.log(COLOR);

    //todo add all accounts, renderTabBar

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor={COLOR[`${theme}500`].color}
          tabBarUnderlineStyle={{backgroundColor: COLOR[`${theme}500`].color}}
          onChangeTab={this.onChangeTab}
        >
          {items.map(item =>
            <View key={item.id} tabLabel={item.name}>
              <Text>{item.name}</Text>
            </View>
          )}
        </ScrollableTabView>
        <ActionButton buttonColor={COLOR[`${theme}500`].color} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
