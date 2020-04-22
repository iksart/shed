import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { TaskConteiner } from '../conteiners';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

const store = configureStore();

export const Root = () => (
	<Provider store={store}>
		<TaskConteiner />
	</Provider>
);