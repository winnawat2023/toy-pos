import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        {
            scopes: [
                'public_profile',
                'email',
                'user_likes',
                'user_friends'
            ],
            customParameters: {
                'auth_type': 'reauthenticate'
            },
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
        },
        {
            requireDisplayName: false,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
    ],
    //term of service
    tosUrl: '<your-tos-link>',
    //privacy url
    privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    //credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
};