import React from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { call } from "./service/ApiService";

class UpdateShopping extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { id: "", userId: "", title: "", category: "", maker: "" } }; // 사용자의 입력을 저장할 오브젝트
        this.update = props.update;
    }

    onChange_userId = (e) => {
        const thisItem = this.state.item;

        thisItem.userId = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onChangeSearch = (e) => {
        const thisItem = this.state.item;

        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onChange_category = (e) => {
        const thisItem = this.state.item;

        thisItem.category = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onChange_maker = (e) => {
        const thisItem = this.state.item;

        thisItem.maker = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    // 백엔드 - 제품 정보 검색
    search = (item) => {
        call("/shopping/search", "POST", item).then((response) => {
            this.setState({ item: response.data[0] || {} })
            console.log(response.data[0]);
        });
    };

    searchEventHandler = () => {
        this.search(this.state.item);
    }
    

    updateEventHandler = () => {
        this.update(this.state.item);
        console.log("update : " + this.state.item);
        this.setState({ item: { id: "", userId: "", title: "", category: "", maker: "" } });
    }

    render() {
        return (
            <div>
                <Paper style={{ margin: 16, padding: 16 }}>
                    <Grid container>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="userId" fullWidth
                                onChange={ this.onChange_userId }
                                value={ this.state.item.userId || '' } />
                        </Grid>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="title" fullWidth
                                onChange={ this.onChangeSearch }
                                value={ this.state.item.title || '' } />
                        </Grid>

                        <Grid xs={2} item>
                            <Button fullWidth color="secondary" variant="contained"
                                onClick={ this.searchEventHandler }>제품 검색</Button>
                        </Grid>

                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="category" fullWidth
                                onChange={ this.onChange_category }
                                value={ this.state.item.category || '' } />
                        </Grid>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="maker" fullWidth
                                onChange={ this.onChange_maker }
                                value={ this.state.item.maker || '' } />
                        </Grid>

                        <Grid xs={2} item>
                            <Button fullWidth color="secondary" variant="contained"
                                onClick={ this.updateEventHandler }>제품 수정</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default UpdateShopping;