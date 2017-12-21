import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component{
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}
class ProductRow extends React.Component{
    render() {
        let name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>{this.props.product.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}
class ProductTable extends React.Component{
    render() {
        let rows = [];
        let lastCategory = null;
        var inStockOnly = this.props.inStockOnly;
        var query = this.props.query;
        this.props.products.forEach(function (product) {
           if (product.stocked === !inStockOnly && inStockOnly === true) {

           } else if(product.name.indexOf(query) === -1){

           }
           else {
               if (product.category !== lastCategory) {
                   rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
               }
               rows.push(<ProductRow product={product} key={product.name}/>);
               lastCategory = product.category;
           }
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        if (target.type !== 'checkbox') {
            this.props.handleQuery(target.value);
        } else {
            this.props.handleInStockOnly(target.checked);
        }

    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.query} name="query" onChange={this.handleChange}/>
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} name="inStorkOnly" onChange={this.handleChange}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}
class FilterableProductTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {query:'', inStockOnly:false};
        this.handleCheck = this.handleCheck.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
    }

    handleQuery(query) {
        this.setState({query:query});
    }
    handleCheck(value) {
        this.setState({inStockOnly:value});
    }

    render() {
        return (
            <div>
                <SearchBar query={this.state.query} inStockOnly={this.state.inStockOnly} handleQuery={this.handleQuery} handleInStockOnly={this.handleCheck}/>
                <ProductTable products={this.props.products} query={this.state.query} inStockOnly={this.state.inStockOnly}/>
            </div>
        )
    }
}
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));

