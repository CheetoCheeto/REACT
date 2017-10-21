import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';

export default class ReacrtNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  };
//生命周期函数 在组建将要时利用fetch调用接口数据
  componentWillMount() {
    var Fetchlist = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, Fetchlist)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  }
  render() {

{/*箭头函数不可用？*/}
const {news} = this.state;
const newsList = news.length
? news.map((newsItem, index) => (
  <li key={index}>
    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
      {newsItem.title}
    </Link>
  </li>
))
: '没有加载到任何新闻';
    return (
      <div class='newslist'>
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    )
  }
}
