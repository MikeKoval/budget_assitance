import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  RefreshControl,
  ScrollView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import AppStore from '../../stores/AppStore';
import {COLOR} from 'react-native-material-design';
import Row from './TransactionsViewRow';

export default React.createClass({
  propTypes: {
    loaded: PropTypes.bool.isRequired,
    dataSource: PropTypes.object,

    getAll: PropTypes.func.isRequired
  },

  contextTypes: {
    navigator: PropTypes.object
  },

  componentWillMount() {
    this.props.getAll();
  },

  render() {
    const {loaded, dataSource} = this.props;
    const {navigator} = this.context;

    const theme = AppStore.getState().theme;

    if (!loaded) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    const refreshControl = (
      <RefreshControl
        refreshing={!this.props.loaded}
        enabled={this.props.loaded}
        onRefresh={this.props.getAll}
      />
    );

    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={dataSource}
          renderRow={(item) => (
            <Row item={item} />
          )}
          enableEmptySections={true}
          refreshControl={refreshControl}
        />
        <ActionButton buttonColor={COLOR[`${theme}500`].color} onPress={() => navigator.forward()} />
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
