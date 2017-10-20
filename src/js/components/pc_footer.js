import React from 'react';
import {Row, Col} from 'antd';

export default class PCFooter extends React.Component{

  render(){
    return(
      <footer>
        <Col span={2}></Col>
        <Col span={20} class='footer'>
          &copy;&nbsp;2017 NEEEEWS copyright cheeto:(
        </Col>
        <Col span={2}></Col>
      </footer>
    )
  }
}
