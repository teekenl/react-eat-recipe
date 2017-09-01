import React, { Component } from 'react';
import Ingredient from "./Ingredient";
import IngredientList from "./IngredientList";

// Image cloud storage handler libraries
import Dropzone from 'react-dropzone';
import request from 'superagent';

// setup cloudinary account to store image
const CLOUDINARY_API_KEY = 815783726251127;
const CLOUDINARY_UPLOAD_PRESET = 'nfxlnvle';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kenlau95/image/upload';

class Submit extends Component {
    // constructor
    constructor(props){
        super(props);
        this.state = {
            recipies: this.retrievedCachedRecipies(),
            newRecipe:{
                name: "New Recipe",
                description: "Description",
                ingredient:[]
            },
            uploadFileCloudinaryURL: ''
        };
        this.submitRecipe = this.submitRecipe.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.retrievedCachedRecipies = this.retrievedCachedRecipies.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    retrievedCachedRecipies(){
        return localStorage.getItem('recipies') ? JSON.parse(localStorage.getItem("recipies")) : [];

    }

    onImageDrop(files){
        this.setState({
            uploadFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file){
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('api_key',CLOUDINARY_API_KEY)
            .field('timestamp', Date.now() / 1000 | 0)
            .field('upload_preset',CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) console.error(err);

            if(response.body.secure_url !== '') {
                this.setState({
                    uploadFileCloudinaryURL: response.body.secure_url
                });
            }
        });

        console.log(this.state.uploadFileCloudinaryURL);
    }

    // submit handler function
    submitRecipe(){
        console.log("Submit recipe");

        let newRecipe = this.state.newRecipe;
        newRecipe.name = this.name.value || "New recipe 1";
        newRecipe.description = this.description.value || "No Description";
        let recipies = this.state.recipies;
        recipies.push(newRecipe);
        this.setState({recipies,newRecipe});

        localStorage.setItem('recipies',JSON.stringify(recipies));
        alert('Your recipe has been added to the Home page');

    }

    addIngredient(quantity, ingredient){
        console.log("Add ingredient in submit js");
        let newRecipe = this.state.newRecipe;

        newRecipe.ingredient.push(
            {   quantity:quantity,
                ingredient:ingredient
            });
        this.setState({
            newRecipe: newRecipe
        });
        console.log(newRecipe);
    }

    render(){
        return(
            <div className="row">
                <div className="cols-xs-12 cols-sm-12">
                    <form>
                        <Dropzone
                            multiple={false}
                            accept="image/*"
                            onDrop={this.onImageDrop.bind(this)}>
                            <p>Drop an image or click to select a image to upload</p>
                        </Dropzone>
                        <div>
                            {this.state.uploadFileCloudinaryURL === '' ? null :
                                <div>
                                    <p>{this.state.uploadFile.name}</p>
                                    <img src={this.state.uploadFileCloudinaryURL} alt={this.state.uploadFileCloudinaryURL} />
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="email"
                                   ref={(input) => {this.name = input;}}
                                   className="form-control"
                                   id="name"
                                   placeholder="Enter the name of the recipe" />
                            </div>
                        <div className="form-group">
                            <label htmlFor="description" >Description</label>
                            <textarea className="form-control"
                                      ref={(input) => {this.description = input;}}
                                      id="description"
                                      placeholder="Enter a brief description"></textarea>
                        </div>
                        <IngredientList recipe={this.state.newRecipe}/>

                        <Ingredient addIngredient={(quantity,ingredient) => {this.addIngredient(quantity,ingredient)}}/>
                        <button type="button" className="btn btn-default" onClick={this.submitRecipe}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Submit;
