import SDK from './index';
declare global {
    interface Window {
        ParaboxSDK: typeof SDK;
    }
}
