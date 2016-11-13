import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../components/TextInput';
import {Button} from 'react-native-material-design';

@reduxForm({
  form: 'loginForm',
  touchOnChange: true
})
class AccountView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <View style={styles.container}>
        <Field
          name='email'
          component={TextInput}
          placeholder='Email'
        />
        <Field
          name='password'
          component={TextInput}
          placeholder='Password'
          secureTextEntry={true}

        />
        <Button text='Submit' raised onPress={handleSubmit} />
      </View>
    );
  }
}

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

export default AccountView;
