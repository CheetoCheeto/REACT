# REACT


tips：1.新闻数据接口使用的是封装好的数据 所有内容为16年
      2.样式框架使用开源框架ant-design 所以在样式上没有过多定义 着重放在react逻辑编写部分
      3.代码非copy，全部手写完成，是@ParryKK的课程在课程上加以完善及修改
      4.主要解决问题办法通过 stackoverflow.com
                           segmentfault.com
                           及部分网友博客查询所得 不作一一感谢但还是谢谢中外网友


目前发现的问题
1.react router版本引起的Link标签不能跳转问题
// 已经解决react-router@4版本中需要import {Route, BrowserRouter, Switch} from 'react-router-dom';同时原本react-router废弃。
2.ant-design 轮播图dots无效 其他功能可以正常使用
//版本迭代 需要替换部分语句//已解决
3.func未定义问题！！影响项目进度
//查询资料得出结论为webpack配置错误
修正错误后仍然报错 目前重新编写项目
//已解决
4.新闻详细列表页跳转无效，点击后仍然指向主页
//已解决 route需要前置exact进行定位





