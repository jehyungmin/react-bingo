import React from 'react';
import ReactDOM from 'react-dom';
import Bingo from './container/bingo';
import * as serviceWorker from './serviceWorker';

// Redux 관련 불러오기
import reducer from './store/modules/Reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
    <Provider store={store}>
        <Bingo />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
