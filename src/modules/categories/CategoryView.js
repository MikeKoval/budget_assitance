import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../components/TextInput';
import { Card} from 'react-native-material-design';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import AppStore from '../../stores/AppStore';
import validate from './CategoryViewFormValidation';
import _ from 'lodash';

@reduxForm({
  form: 'categoryForm',
  validate
})
class CategoryView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    item: PropTypes.object,
    loading: PropTypes.bool
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  componentWillMount() {
    const {id, getById, initialize, handleSubmit} = this.props;
    const {navigator} = this.context;
    navigator.actions = [
      ...navigator.actions,
      {
        icon: 'done',
        onPress: handleSubmit(this.onSubmit)
      }
    ];

    if (id) {
      getById(id)
        .then(() => {
          initialize({
            ...this.props.item
          })
        });
    }
  }

  componentWillUnmount() {
    _.remove(this.context.navigator.actions, {icon: 'done'});
  }

  onSubmit = (data) => {
    const {insert, update, getAll, id} = this.props;
    const {navigator} = this.context;

    const save = id ? update : insert;

    return save(data)
      .then(() => getAll())
      .then(() => navigator.back())
  };

  render() {
    const {item, id, loading} = this.props;

    const theme = AppStore.getState().theme;

    if (id  && loading) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Card>
          <Card.Body>
            <Field
              name='name'
              component={TextInput}
              label="Category name"
              autoFocus
            />
            <Field
              name='type'
              items={[
                { value: 1, label: 'Expense' },
                { value: 2, label: 'Income' },
                //{ value: 3, label: 'Sub-category of' },
              ]}
              selected={(item && item.type) || 1}
              component={RadioButtonGroup}
              primary={theme}
            />

          </Card.Body>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
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

export default CategoryView;
