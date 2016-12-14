import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import {connect} from 'react-redux';

import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';

@connect(
  state => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.currentUser
  })
)
export default class Navigation extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    changeScene = (path, name) => {
        const { drawer, navigator } = this.context;

        this.setState({
            route: path
        });
        navigator.to(path, name);
        drawer.closeDrawer();
    };

    render() {
        const { route } = this.state;
        const {user} = this.props;

        return (
            <Drawer theme='light'>
                <Drawer.Header image={<Image source={require('./../img/nav.jpg')} />}>
                    <View style={styles.header}>
                        {user && user.picture && <Avatar size={80} image={<Image source={{ uri: user.picture }}/>} />}
                        {!user || !user.name && <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Budget assistant</Text>}
                        {user && user.name && <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>{user.name}</Text>}
                    </View>
                </Drawer.Header>

                <Drawer.Section
                    title="Menu"
                    items={[
                        {
                            value: 'Dashboard',
                            active: !route || route === 'accounts',
                            onPress: () => this.changeScene('accounts')
                        },
                        {
                            value: 'Add account',
                            active: !route || route === 'addAccount',
                            onPress: () => this.changeScene('addAccount')
                        },
                        {
                            value: 'Transactions',
                            active: !route || route === 'transactions',
                            onPress: () => this.changeScene('transactions')
                        },
                        {
                            value: 'Categories',
                            active: !route || route === 'categories',
                            onPress: () => this.changeScene('categories')
                        }
                    ]}
                />

            </Drawer>
        );
    }
}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};