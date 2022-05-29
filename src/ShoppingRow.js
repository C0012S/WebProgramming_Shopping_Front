import React from 'react';
import equal from 'fast-deep-equal';

class ShoppingRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item }
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.item, prevProps.item)) {
            this.setState({item: this.props.item});
        }
    }

    render() {
        const item = this.state.item;
        return (
//            <div className="Shopping">
                <tr className="Shopping">
                    <td>{ item.id }</td>
                    <td>{ item.userId }</td>
                    <td>{ item.title }</td>
                    <td>{ item.category }</td>
                    <td>{ item.maker }</td>
                </tr>
//            </div>
        );
    }
}

export default ShoppingRow;