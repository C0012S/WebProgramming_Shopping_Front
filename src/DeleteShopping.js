import React from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

class DeleteShopping extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { id:"", userId: "", title: "", category: "", maker: "" } }; // 사용자의 입력을 저장할 오브젝트
        this.delete = props.delete;
    }

    onInputChange_title = (e) => {
        const thisItem = this.state.item;

        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
        this.setState({ item: { id:"", userId: "", title: "", category: "", maker: "" } });
    }

    render() {
        const item = this.state.item;
        return (
            <div>
                <Paper style={{ margin: 16, padding: 16 }}>
                    <Grid container>
                        <Grid xs={10} item style={{ paddingRight: 16 }}>
                            <TextField placeholder="title" fullWidth
                                onChange={ this.onInputChange_title }
                                id = { item.id }
                                name = { item.id }
                                value={ item.title } />
                        </Grid>

                        <Grid xs={2} item>
                            <Button fullWidth color="secondary" variant="contained"
                                onClick={ this.deleteEventHandler }>제품 삭제</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default DeleteShopping;