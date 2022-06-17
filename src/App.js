import React from 'react';
import './App.css';
import ShoppingRow from './ShoppingRow';
import AddShopping from "./AddShopping.js";
import SearchShopping from "./SearchShopping.js";
import UpdateShopping from "./UpdateShopping.js";
import DeleteShopping from "./DeleteShopping.js";
import { call, signout } from "./service/ApiService";
import './MenuTab.scss'; // npm install sass 설치 필요
import { Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
/*      
      items: [
        {id: "id0", userId: "user0", title: "물결 반지", category: "반지", maker: "OST"},
        {id: "id1", userId: "user1", title: "물결 목걸이", category: "목걸이", maker: "GUCCI"},
      ],
*/      
      items: [ ],
      activeTab: 0,
      loading: true, // 로딩 중이라는 상태를 표현할 변수
    };
  }

  menuHandler = (id) => {
    this.setState({ activeTab: id })
  }

  componentDidMount() {
/*
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:8080/shopping", requestOptions)
      .then((response) => response.json())
      .then((response) => {
          console.log(response.data);
          this.setState( {items: response.data} );
        });
*/        

    call("/shopping", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

/*
  // 프론트엔드 - 제품 정보 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    thisItems.push(item);
    this.setState({ items: thisItems });
    console.log("items : ", this.state.items);
  }
*/
  // 백엔드와 연결 - 제품 정보 추가
  add = (item) => {
    call("/shopping", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

/*
  // 프론트엔드 - 제품 정보 검색 (미완성)
  search = (item) => {
    const thisItems = this.state.items;
    const searchItem = thisItems.filter(e => e.title === item.title);
    console.log(searchItem);

//    this.setState({ items: searchItem }, () => {
//      console.log("Search Item : ", this.state.items);
//    });
  }
*/
/*
  // 백엔드와 연결 - 제품 정보 검색 (테이블에서 제품 정보가 찾아진다.)
  search = (item) => {
    call("/shopping/search", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };
*/  

  // 백엔드와 연결 - 제품 정보 수정
  update = (item) => {
    call("/shopping", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

/*  
  // 프론트엔드 - 제품 정보 삭제
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Delete Items : ", this.state.items);
    const newItems = thisItems.filter(e => e.title !== item.title);
    this.setState({ items: newItems }, () => {
      console.log("After Delete Items : ", this.state.items);
    });
  }
*/  
  // 백엔드와 연결 - 제품 정보 삭제
  delete = (item) => {
    call("/shopping", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    // <ShoppingRow> 컴포넌트 배열
    var shoppingRows = this.state.items.map((item, idx) => (
      <ShoppingRow item={ item } key={ item.id } />
    ));

    const obj = {
      0: <AddShopping add={ this.add } />,
      1: <SearchShopping />,
      2: <UpdateShopping update={ this.update } />,
      3: <DeleteShopping delete={ this.delete } />
    }

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">Shopping Mall</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={ signout }>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    var shoppingListPage = (
      <div>
        { navigationBar } {/* 네비게이션 바 렌더링 */}
        <div className="menu_wrapper">
          <ul className="tabs">
            <li onClick={ () => this.menuHandler(0) } style={ this.state.activeTab === 0 ? { backgroundColor: 'lightpink' } : { backgroundColor: 'white' } } >추가</li>
            <li onClick={ () => this.menuHandler(1) } style={ this.state.activeTab === 1 ? { backgroundColor: 'lightpink' } : { backgroundColor: 'white' } } >검색</li>
            <li onClick={ () => this.menuHandler(2) } style={ this.state.activeTab === 2 ? { backgroundColor: 'lightpink' } : { backgroundColor: 'white' } } >수정</li>
            <li onClick={ () => this.menuHandler(3) } style={ this.state.activeTab === 3 ? { backgroundColor: 'lightpink' } : { backgroundColor: 'white' } } >삭제</li>
          </ul>
          <div className="contents">
            { obj[ this.state.activeTab ] }
          </div>
        </div>

{/*
        <AddShopping add={ this.add } />
        <SearchShopping />
        <UpdateShopping update={ this.update } />
        <DeleteShopping delete={ this.delete } />
*/}        

        <table style={{ margin: 16 }}>
          <caption>Shopping Item Table</caption>
          <thead>
            <tr>
              <th>id</th>
              <th>userId</th>
              <th>title</th>
              <th>category</th>
              <th>maker</th>
            </tr>
          </thead>
          <tbody className="ShoppingList">
            { shoppingRows }
          </tbody>
        </table>
      </div>
    );

    var loadingPage = <h1> 로딩 중... </h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      content = shoppingListPage;
    }

    return (
      <div className="App">{ content }</div>
    );
  }
}

export default App;
