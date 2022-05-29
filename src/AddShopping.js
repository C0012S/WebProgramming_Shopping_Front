import React from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

class AddShopping extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { id:"", userId: "", title: "", category: "", maker: "" } }; // 사용자의 입력을 저장할 오브젝트
        this.add = props.add; // props의 함수를 this.add에 연결
    }

    onInputChange_userId = (e) => {
        const thisItem = this.state.item;

        thisItem.userId = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);

        // if 문과 e.target.name을 사용해서 하나의 이벤트 핸들러로 만들어서 사용 가능
    }

    onInputChange_title = (e) => {
        const thisItem = this.state.item;

        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onInputChange_category = (e) => {
        const thisItem = this.state.item;

        thisItem.category = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onInputChange_maker = (e) => {
        const thisItem = this.state.item;

        thisItem.maker = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onButtonClick = () => {
        this.add(this.state.item); // add 함수 사용
        this.setState({ item: { id: "", userId: "", title: "", category: "", maker: "" } });
    }

    render() {
        return (
            <div>
                <Paper style={{ margin: 16, padding: 16 }}>
                    <Grid container>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="userId" fullWidth
                                name="userId"
                                onChange={ this.onInputChange_userId }
                                value={ this.state.item.userId } />
                        </Grid>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="title" fullWidth
                                name="title"
                                onChange={ this.onInputChange_title }
                                value={ this.state.item.title } />
                        </Grid>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="category" fullWidth
                                name="category"
                                onChange={ this.onInputChange_category }
                                value={ this.state.item.category } />
                        </Grid>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="maker" fullWidth
                                name="maker"
                                onChange={ this.onInputChange_maker }
                                value={ this.state.item.maker } />
                        </Grid>

                        <Grid xs={2} item>
                            <Button fullWidth color="secondary" variant="contained"
                                onClick={ this.onButtonClick }>제품 추가</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default AddShopping;