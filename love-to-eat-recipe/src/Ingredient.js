import React , { Component } from 'react';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: {
                quantity: 0,
                description: "ingredient"
            }
        };

        this.addIngredient = this.addIngredient.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.callParentAddIngredient = this.callParentAddIngredient.bind(this);
    }

    callParentAddIngredient(){
        this.props.addIngredient(this.quantity.value,this.ingredient.value);
    }

    addIngredient(){
        // TODO code here
    }


    addQuantity(){
        // TODO code here
    }

    render(){
        return(
            <div className="form-inline form group">
                <label htmlFor="quantity">Quantity:</label>
                <input type="text"
                       ref={(input) => {this.quantity = input}}
                       className="form-control"
                       id="quantity"
                       placeholder="Quantity" />
                <label htmlFor="Description">Ingredient:</label>
                <input type="text"
                       ref={(input) => {this.ingredient = input}}
                       className="form-control"
                       id="name"
                       placeholder="Ingredient" />
                <button type="button" className="btn btn-info" onClick={this.callParentAddIngredient} >Add</button>
            </div>
        );
    }
}

export default Ingredient;