import React, { Component, useState, useEffect, createRef } from "react";
import Procedure from "./recipe_form/Procedure";
import { useDispatch } from "react-redux";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

export default class RecipeCreate extends Component {
    constructor(props){
      super(props);

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDirections = this.onChangeDirections.bind(this);
      this.onChangeIngredientName = this.onChangeIngredientName.bind(this);
      this.onChangeAmount = this.onChangeAmount.bind(this);
      this.onChangeMeasurements = this.onChangeMeasurements.bind(this);
      this.handleIngredientClick = this.handleIngredientClick.bind(this);
      this.handleIngredientXClick = this.handleIngredientXClick.bind(this);
      this.onChangeNotes = this.onChangeNotes.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        name: '',
        description: '',
        directions: [],
        ingredientList: Array(10).fill(0).map(row => new Array(3)),
        ingredientName: '',
        ingredientAmount: '',
        ingredientDropDown: Array(10),
        measurements: [],
        measurement: '',
        notes: ''
      }
    }

  componentDidMount(){
    this.setState({
      measurements: ["cups", "grams", "tablespoon", "teaspoon"],
      measurement: "cups",
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDirections(e){
    this.setState({
      directions: e.target.value
    });
  }

  onChangeIngredientName(e){
    this.setState({
      ingredientName: e.target.value
    });
  }

  onChangeAmount(e){
    this.setState({
      ingredientAmount: e.target.value
    });
  }

  onChangeMeasurements(e){
    this.setState({
      measurement: e.target.value
    });
  }

  handleIngredientClick(e) {
    e.preventDefault();
    const value = this.state.ingredientName + " " + this.state.ingredientAmount + " " + this.state.measurement;
    for (let i = 0; i < this.state.ingredientDropDown.length; i++){
      if (this.state.ingredientDropDown[9] != null){
        alert("Cannot add more to the list");
        break;
      }
      else if (this.state.ingredientDropDown[i] == value){
        alert("Item already exists");
        break;
      }
      else if (this.state.ingredientDropDown[i] == null){
        this.state.ingredientDropDown[i] = value;
        this.state.ingredientList[i][0] = this.state.ingredientName;
        this.state.ingredientList[i][1] = this.state.ingredientAmount;
        this.state.ingredientList[i][2] = this.state.measurement;
        break;
      }
    }
    this.setState({
      ingredientName: '',
      ingredientAmount: ''
    });
    alert(this.state.ingredientDropDown);
  }

  handleIngredientXClick(e){
    const filteredDropDown = this.state.ingredientDropDown.filter((x) => x !== e);
    this.setState({
      ingredientDropDown: this.state.ingredientDropDown.filter((x) => x !== e)
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const recipe = {
      name: this.state.name,
      description: this.state.description,
      ingredientList: this.state.ingredientList,
      notes: this.state.notes
    }
    alert("name: " + recipe.name +"\nDescription: " + recipe.description + "\nIngredients:" + recipe.ingredientList + "\nNotes: " + recipe.notes);
    //window.location = '/';
  }

  render(){
    return (
      <>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
                  Create your recipe and share it to the world!
                </h3>
                <p className="px-5 text-sm text-gray-600">
                  "Cooking is like painting or writing a song. Just as there are
                  only so many notes or colors, there are only so many
                  flavors—it’s how you combine them that sets you apart."
                </p>
              </div>
            </div>
            <form className="mt-5 md:mt-0 md:col-span-2" onSubmit={this.onSubmit}>
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Food Name
                  </h1>
                  <input
                      type="text"
                      required
                      id="title"
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                      placeholder="Write a name for your recipe. Something catchy ..."
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h1>
                  <div>
                    <textarea
                      type="text"
                      id="description"
                      rows={3}
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Write a short description..."
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                </div>

                <Procedure editMode={true} recipe={this.state.recipe} />

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Ingredients
                  </h1>
                  <div className="flex">
                    <input
                      type="text"
                      id="ingredientName"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Ingredient(ex: flour)"
                      value={this.state.ingredientName}
                      onChange={this.onChangeIngredientName}
                    />
                    <input
                      type="text"
                      id="ingredientAmount"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Amount(ex: 1)"
                      value={this.state.ingredientAmount}
                      onChange={this.onChangeAmount}
                    />
                    <select ref="meaurementInput"
                      required
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      value={this.state.measurement}
                      onChange={this.onChangeMeasurements}>
                        {
                          this.state.measurements.map(function(measure) {
                            return <option
                            key={measure}
                            value={measure}>{measure}
                            </option>;
                          })
                        }
                    </select>
                    <button type="button" className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" onClick={this.handleIngredientClick}>
                      <PlusIcon
                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="border-b border-gray-200">
                      {this.state.ingredientDropDown.map((ingredient, idx) => (
                       <li key={ingredient} className="py-4 flex">
                        <div className="ml-3 flex flex-grow justify-between">
                          <div>
                            <span className="text-base font-medium text-gray-900">
                              {idx + 1}){" "}
                            </span>
                            <span className="text-base font-medium text-gray-900">
                              {ingredient}
                            </span>
                          </div>

                          <div className="">
                            <button type="button"
                            className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            onClick={() => this.handleIngredientXClick(ingredient)}
                            >
                              <MinusIcon
                              className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                              />
                              <span>Remove</span>
                            </button>
                          </div>

                        </div>
                        </li>
                      ))}
                  </div>

                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Notes
                  </h1>
                  <div>
                    <textarea
                      type="text"
                      id="notes"
                      rows={2}
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Any extra notes..."
                      value={this.state.notes}
                      onChange={this.onChangeNotes}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
