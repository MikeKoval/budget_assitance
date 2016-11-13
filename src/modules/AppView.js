import React, {PropTypes, Component} from 'react';
import { Navigator, DrawerLayoutAndroid, ScrollView, View, Text } from 'react-native';

import Navigate from '../utils/Navigate';
import Toolbar from '../components/Toolbar';
import Navigation from '../scenes/Navigation';

class Application extends Component {
  static propTypes = {};

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
    this.setState({
      navigator: new Navigate(navigator)
    });
  };

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
  }
};

export default Application;