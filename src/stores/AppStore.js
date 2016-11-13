import { AsyncStorage } from 'react-native';
import alt from '../alt';
import AppActions from '../actions/AppActions';

const THEME = '@Storage:theme';

class AppStore {

    constructor() {
        this._loadTheme();

        this.bindListeners({
            handleUpdateTheme: AppActions.UPDATE_THEME
        });
    }

    _loadTheme = () => {
        AsyncStorage.getItem(THEME).then((value) => {
            this.theme = value || 'paperGreen';
            AppActions.updateTheme(this.theme);
        });
    };

    handleUpdateTheme(name) {
        this.theme = name;
        AsyncStorage.setItem(THEME, name);
    }

}

export default alt.createStore(AppStore, 'AppStore');
