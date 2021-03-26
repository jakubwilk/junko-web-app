import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';

const history: History = createBrowserHistory();

const App = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path={"/"}>
					{/* Some component here */}
				</Route>
				<Route path={"/"}>
					{/* Another component here */}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
