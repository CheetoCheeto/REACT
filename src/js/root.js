import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Button from 'antd/lib/button';
import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component {
  render() {
    return (
      <div>
        {/*电脑端适配*/}
        <MediaQuery query='(min-device-width: 1224px)'>
          <BrowserRouter>
            <Switch>
              {/*其他模块尚未编写*/}
              <Route exact path="/" component={PCIndex}></Route>
            </Switch>
          </BrowserRouter>
        </MediaQuery>
        {/*移动端适配*/}
      </div>
    );
  };
}
ReactDOM.render(
  <Root/>, document.getElementById('mainContainer'));
