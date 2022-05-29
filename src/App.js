import React from 'react';
import './App.css';
import ShoppingRow from './ShoppingRow';
import AddShopping from "./AddShopping.js";
import SearchShopping from "./SearchShopping.js";
import UpdateShopping from "./UpdateShopping.js";
import DeleteShopping from "./DeleteShopping.js";
import { call } from "./service/ApiService";

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
    };
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
      this.setState({ items: response.data })
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

    return (
      <div className="App">
        <AddShopping add={ this.add } />
        <SearchShopping />
        <UpdateShopping update={ this.update } />
        <DeleteShopping delete={ this.delete } />

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
  }
}

export default App;
