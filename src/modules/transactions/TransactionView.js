import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../components/TextInput';
import {Button, Card} from 'react-native-material-design';
import RadioButtonGroup from '../../components/RadioButtonGroup';

import AppStore from '../../stores/AppStore';

import validate from './TransactionViewFormValidation';

@reduxForm({
  form: 'transactionForm',
  validate
})
class TransactionView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  };

  static contextTypes = {
    navigator: PropTypes.object
  };

  onSubmit(data) {
    const {insert, getAll} = this.props;
    const {navigator} = this.context;
    return insert(data)
      .then(() => getAll())
      .then(() => navigator.to('transactions'))
  }

  render() {
    const {handleSubmit, valid, submitting} = this.props;

    const theme = AppStore.getState().theme;

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
              selected={1}
              component={RadioButtonGroup}
              primary={theme}
            />

          </Card.Body>
        </Card>

        <Button text="Save" primary={theme} theme="dark" raised disabled={!valid || submitting} onPress={handleSubmit((data) => this.onSubmit(data))} />
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

export default TransactionView;
