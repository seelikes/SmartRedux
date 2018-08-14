/**
 * Created by liutiantian on 2018/8/13 22:17 星期一
 */

import React, { Children, Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

interface SmartReduxProps {
    reducers?: Array,
    middlewares?: Array,
}

export default class SmartRedux extends Component<SmartReduxProps> {
    constructor(props) {
        super(props);
        this.store = createStore(
            persistReducer(
                {
                    key: 'root',
                    storage,
                },
                combineReducers(...this.props.reducers)
            ),
            applyMiddleware(...this.props.middlewares, thunk)
        );

        this.persistor = persistStore(this.store);
    }

    render() {
        return (
            <Provider store={this.store}>
                <PersistGate loading={null} persistor={this.persistor}>
                    {
                        Children.only(this.props.children)
                    }
                </PersistGate>
            </Provider>
        );
    }
}