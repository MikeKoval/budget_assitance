import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  RefreshControl,
  TouchableOpacity
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
        onPress: () => this.edit(this.props.id)
      }
    ];

    this.props.getAll()
      .then(() => {
        const {items, id, setSelectedId} = this.props;
        const item = items && items[0];

        if (!id && item) {
          setSelectedId(item._id);
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

    if (item) {
      setSelectedId(item._id);
    }

    // console.log(items, i, item);

    // this.changeTheme(item.color);
  },

  render() {
    const {loaded, items} = this.props;
    const {navigator} = this.context;

    const theme = AppStore.getState().theme;

    if (!loaded || !theme) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    let {id} = this.props;
    let index = items && _.findIndex(items, {_id: id});
    index = index === -1 ? 0 : index;
    id = items && items[index] && items[index]._id;

    return (
      <View style={styles.container}>
        {items && <ScrollableTabView
          tabBarActiveTextColor={COLOR[`${theme}500`].color}
          tabBarUnderlineStyle={{backgroundColor: COLOR[`${theme}500`].color}}
          onChangeTab={this.onChangeTab}
          initialPage={index}
        >
          {items.map(item =>
            <View key={item._id} tabLabel={item.name} style={styles.container}>
              <Card>
                <Card.Body>
                  <Subheader text="Balance" color="#444" />
                  <TouchableOpacity onPress={() => navigator.to('transactions', 'Transactions', {accountId: id})}>
                    <Text style={[styles.accountAmountText, {color: COLOR[theme + '500'].color}]}>{item.currencyId} {item.amount}</Text>
                  </TouchableOpacity>
                </Card.Body>
              </Card>
            </View>
          )}
        </ScrollableTabView>}
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
