import React, { Component } from 'react';
import IngredientList from "./IngredientList";
import request from 'superagent';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipies: JSON.parse(localStorage.getItem('recipies')) || []
        };
        this.displayRecipies = this.displayRecipies.bind(this);
        this.validateFileCloudinaryURL = this.validateFileCloudinaryURL.bind(this);
        //this.validateURLContainsImage = this.validateURLContainsImage.bind(this);
    }

    displayRecipies(){
        let resultArray = [];

        this.state.recipies.map((recipe,i) => {
            resultArray.push(
                <div key={i} className="col-sm-4">
                    {this.validateFileCloudinaryURL(recipe)}<br/>
                    {recipe.name}<br/>
                    {recipe.description}<br/>
                    <IngredientList recipe={recipe} />
                </div>
            )
        });

        return resultArray.length > 0 ? resultArray: 'No result has been added';
    }

    validateFileCloudinaryURL(recipe){
        let hasImage = recipe.uploadFileCloudinaryURL !== 'undefined'
                            && recipe.uploadFileCloudinaryURL !== '' ?
                                <img src={recipe.uploadFileCloudinaryURL} alt={recipe.name} /> :  null;
        return hasImage;
    }

    render(){
        return(
            <div>
                <h1>Home</h1>
                {this.displayRecipies()}
            </div>
        );
    }
}

export default Home;