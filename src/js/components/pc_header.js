import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
//link标签不可用问题 通过引入react-router-dom解决，版本更新react-router废弃引起
import {Link} from 'react-router-dom';
class PCHeader extends React.Component {
	constructor() {
		super();
//ant-design中的相关定义，参照ant-design官方文档
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	};
//本地存储，利用localstorage保持登录状态；
//问题：关闭浏览器再次启动服务仍然保持登录，尝试改为sessionstorage；
	componentWillMount(){
		if (sessionStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:sessionStorage.userNickName,userid:sessionStorage.userid});
		}
	};

	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};
	handleClick(e) {
		if (e.key == "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	};
	//页面开始向 API 进行提交数据
	//利用fetch插件完成
	handleSubmit(e)
	{
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			sessionStorage.userid= json.UserId;
			sessionStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};
	//退出部分
	logout(){
		sessionStorage.userid= '';
		sessionStorage.userNickName = '';
		this.setState({hasLogined:false});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		{/*未登录↓隐藏通过haslogined控制*/}
		const userShow = this.state.hasLogined
		//隐藏
			? <Menu.Item key="logout" class="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					<Link target="_blank" to={`/usercenter`}>
						<Button type="dashed" htmlType="button">个人中心</Button>
					</Link>
					&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
				</Menu.Item>
				//显示
			: <Menu.Item key="register" class="register">
				<Icon type="appstore"/>注册/登录
			</Menu.Item>;
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="/src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					{/*PC端标签部分*/}
					<Col span={16}>
						<Menu theme='dark'mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>时尚
							</Menu.Item>
							{userShow}
						</Menu>
						{/*用户注册登录部分tab实现*/}
						<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('userName')(<Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('password')(<Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('r_userName')(<Input placeholder="请输入您的账号"/>)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('r_password')(<Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<FormItem label="确认密码">
											{getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="请再次输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader = Form.create({})(PCHeader);
