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
import {COLOR, PRIMARY_COLORS, Card, Subheader} from 'react-native-material-design';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';


// import AppActions from '../../actions/AppActions';

export default React.createClass({
  propTypes: {
    loaded: PropTypes.bool.isRequired,
    items: PropTypes.array,

    getAll: PropTypes.func.isRequired
  },

  contextTypes: {
    navigator: PropTypes.object
  },

  edit(id) {
    const {navigator} = this.context;
    navigator.forward('editAccount', 'Edit account', {id});
  },

  componentWillMount() {
    const {navigator} = this.context;
    navigator.actions = [
      ...navigator.actions,
      {
        icon: 'edit',
        onPress: () => this.edit(this.state.id)
      }
    ];

    this.props.getAll()
      .then(() => {
        const {items, id, setSelectedId} = this.props;
        const item = items[0];

        if (!id) {
          setSelectedId(item.id);
        }
      })
  },

  componentWillUnmount() {
    _.remove(this.context.navigator.actions, {icon: 'edit'});
  },

  // changeTheme(theme) {
  //   AppActions.updateTheme(theme);
  // },

  onChangeTab({i}) {
    const {items, setSelectedId} = this.props;
    const item = items[i];

    return setSelectedId(item.id);

    // console.log(items, i, item);

    // this.changeTheme(item.color);
  },

  render() {
    const {loaded, items, id} = this.props;
    const {navigator} = this.context;

    const theme = AppStore.getState().theme;

    let index = _.findIndex(items, {id});
    index = index === -1 ? 0 : index;
    console.log(index);

    if (!loaded) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor={COLOR[`${theme}500`].color}
          tabBarUnderlineStyle={{backgroundColor: COLOR[`${theme}500`].color}}
          onChangeTab={this.onChangeTab}
          tab={index}
        >
          {items.map(item =>
            <View key={item.id} tabLabel={item.name} style={styles.container}>
              <Card>
                <Card.Body>
                  <Subheader text="Balance" color="#444" />
                  <Text style={[styles.accountAmountText, {color: COLOR[theme + '500'].color}]}>{item.currency} {item.amount}</Text>
                </Card.Body>
              </Card>
            </View>
          )}
        </ScrollableTabView>
        <ActionButton buttonColor={COLOR[`${theme}500`].color}>
          <ActionButton.Item buttonColor={COLOR[`paperPink800`].color} title="New account" onPress={() => navigator.forward('addAccount')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={COLOR[`paperYellow800`].color} title="New transaction" onPress={() => navigator.forward('addTransaction', 'Add transaction', {accountId: id})}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
  },
  accountAmountText: {
    textAlign: 'center',
    fontSize: 24
  }
});
