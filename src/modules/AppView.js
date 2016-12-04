import React, {PropTypes, Component} from 'react';
import { Navigator, DrawerLayoutAndroid, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import * as auth0 from '../services/auth0';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import Navigate from '../utils/Navigate';
import Toolbar from '../components/Toolbar';
import Navigation from '../scenes/Navigation';

class AppView extends Component {
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static childContextTypes = {
    drawer: PropTypes.object,
    navigator: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      navigator: null
    };
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator
    }
  };

  setDrawer = (drawer) => {
    this.setState({
      drawer
    });
  };

  setNavigator = (navigator) => {
    const nav = new Navigate(navigator);
    nav.actions = [];
    this.setState({
      navigator: nav
    });
  };

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  componentWillReceiveProps({isReady, isLoggedIn}) {
    if (!this.props.isReady) {
      if (isReady && !isLoggedIn) {
        auth0.showLogin();
      }
    }
  }

  render(){
    const { drawer, navigator } = this.state;
    const navView = React.createElement(Navigation);

    const nav = (
      <Navigator
        ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
        initialRoute={Navigate.getInitialRoute()}
        navigationBar={<Toolbar onIconPress={drawer && drawer.openDrawer} />}
        configureScene={() => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        renderScene={(route) => {
          if (this.state.navigator && route.component) {
            return (
              <View
                style={styles.scene}
                showsVerticalScrollIndicator={false}>
                <route.component title={route.title} path={route.path} {...route.props} />
              </View>
            );
          }
          else {
            return <Text>Loading...</Text>;
          }
        }}
      />
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          if (drawer && navigator) {
            return navView;
          }
          return null;
        }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
      >
        {drawer && nav}
      </DrawerLayoutAndroid>
    );
  }
}

const styles = {
  scene: {
    flex: 1,
    marginTop: 56
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
};

export default AppView;