import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import TextInput from '../../components/TextInput';
import {Button, Card} from 'react-native-material-design';

import AppStore from '../../stores/AppStore';

import AccountViewFormValidation from './AccountViewFormValidation';

@reduxForm({
  form: 'loginForm',
  validate: AccountViewFormValidation
})
class AccountView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
  };

  onSubmit(data) {
    this.props.insert(data);
  }

  render() {
    const {handleSubmit, valid} = this.props;

    const theme = AppStore.getState().theme;

    return (
      <View style={styles.container}>
        <Card>
          <Card.Body>
            <Field
              name='name'
              component={TextInput}
              label="Account name"
              autoFocus
            />
            <Field
              name='initialValue'
              component={TextInput}
              label="Initial value"
              defaultValue={'0'}
              keyboardType={'numeric'}
            />
            <Field
              name='currency'
              component={TextInput}
              label="Currency"
            />
            <Field
              name='color'
              component={TextInput}
              label="Select color"
            />
          </Card.Body>
        </Card>

        <Button text="Add" primary={theme} theme="dark" raised disabled={!valid} onPress={handleSubmit(props => this.onSubmit(props))} />
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

export default AccountView;
