import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  RefreshControl
} from 'react-native';
import ListRow from '../../components/ListRow';
import ActionButton from 'react-native-action-button';

const CounterView = React.createClass({
  propTypes: {
    loaded: PropTypes.bool.isRequired,
    items: PropTypes.array,
    dataSource: PropTypes.object.isRequired,

    getAll: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.props.getAll();
  },

  render() {
    const {loaded, getAll, add, dataSource} = this.props;

    if (!loaded) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    const refreshControl = (
      <RefreshControl
        refreshing={!loaded}
        enabled={loaded}
        onRefresh={getAll}
      />
    );

    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={dataSource}
          renderRow={(item) => <ListRow item={item} />} //TODO refactor it
          enableEmptySections={true}
          refreshControl={refreshControl}
        />
        <ActionButton buttonColor='rgba(231,76,60,1)' onPress={() => add()} />
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

export default CounterView;
