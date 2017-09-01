import React, { Component } from 'react';

class IngredientList extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.displayIngredients = this.displayIngredients.bind(this);
    }

    displayIngredients(){
        let resultMapArray = [];
        console.log("updating the recipe book");
        this.props.recipe.ingredient.map((item,i) =>
            {
                resultMapArray.push(<li key={i}>{item.quantity} - {item.ingredient} </li>);
            }
        );
        return resultMapArray || [];
    }

    render(){
        return(
            <ul>
                {this.displayIngredients()}
            </ul>
        );
    }
}

export default IngredientList;