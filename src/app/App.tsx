import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import LoginPage from "./pages/login/LoginPage";

const history: History = createBrowserHistory();

const App = () => {
	return (
		<div className={"app"}>
			<Router history={history}>
				<Switch>
					<Route exact path={"/"}>
						<LoginPage />
					</Route>
					<Route path={"/"}>
						{/* Another component here */}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
