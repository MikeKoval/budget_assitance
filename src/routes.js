export default {

    accounts: {
        initialRoute: true,

        title: 'Dashboard',
        component: require('./modules/accounts/AccountsViewContainer').default,
    },

    addAccount: {

        title: 'Add account',
        component: require('./modules/accounts/AccountViewContainer').default,
        actions: [{
            icon: 'face'
        }]
    }

    // welcome: {
    //     initialRoute: true,
    //
    //     title: 'Welcome',
    //     component: require('./scenes/Welcome').default,
    //
    //     children: {
    //         example: {
    //             // title: 'Child Example', // optional
    //             component: require('./scenes/NestedExample').default
    //         }
    //     }
    // },

    // avatars: {
    //     title: 'Avatars',
    //     component: require('./scenes/Avatars').default
    // },
    //
    // buttons: {
    //
    //     title: 'Buttons',
    //     component: require('./scenes/Buttons').default
    // },
    //
    // checkboxes: {
    //     title: 'Checkboxes',
    //     component: require('./scenes/Checkboxes').default
    // },
    //
    // dividers: {
    //     title: 'Dividers',
    //     component: require('./scenes/Dividers').default
    // },
    //
    // list: {
    //
    //     title: 'List',
    //     component: require('./scenes/List').default
    // },
    //
    // 'icon-toggles': {
    //     title: 'Icon Toggles',
    //     component: require('./scenes/IconToggles').default
    // },
    //
    // 'radio-buttons': {
    //
    //     title: 'Radio Buttons',
    //     component: require('./scenes/RadioButtons').default
    // },
    //
    // subheaders: {
    //     title: 'Subheaders',
    //     component: require('./scenes/Subheaders').default
    // },
    //
    // themes: {
    //     title: 'Change Theme',
    //     component: require('./scenes/Themes').default
    // }
}