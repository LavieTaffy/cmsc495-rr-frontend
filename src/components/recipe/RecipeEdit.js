import React from 'react';
import { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { editRecipe } from '../../redux/actions/recipes';
import { getDetailRecipe } from '../../redux/actions/recipes';

export default function RecipeEdit() {
    // track state for what we need in the request
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [directions, setDirections] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [notes, setNotes] = useState('');

    // track state for the items we can edit in the arrays
    const [editDir, setEditDir] = useState('');

    // dispatch for the api request
    const dispatch = useDispatch();

    //params for the passed in id
    const { id } = useParams();

    console.log(id);

    const { detailRecipe } = useSelector((state) => state.recipes);
    console.log('test:', detailRecipe);

    const recipe = detailRecipe.response;

    console.log('is there a recipe?', recipe);

    //useEffect to preload all data after the dispatch.
    //pass in empty array so useEffect only happens once
    useEffect(() => {
        dispatch(getDetailRecipe(id));
        setTitle(detailRecipe.response.name);
        setDesc(detailRecipe.response.description);
        setDirections(detailRecipe.response.directions);
        setIngredients(detailRecipe.response.ingredients);
        setNotes(detailRecipe.response.notes);
    }, []);

    // submit the form
    const handleFormSubmit = (e) => {
        e.preventDefault();

        let request = {
            name: title,
            description: desc,
            directions: directions,
            ingredients: ingredients,
            notes: notes
        };

        dispatch(editRecipe(id, request));
    };

    // add to the directions array
    const onAddDirectionClick = () => {
        setDirections((state) => [...state, editDir]);
        setEditDir('');
    };

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
                                "Cooking is like painting or writing a song.
                                Just as there are only so many notes or colors,
                                there are only so many flavors—it’s how you
                                combine them that sets you apart."
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleFormSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                                            Title
                                        </h1>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                                            placeholder="Write a title for your recipe. Something catchy ..."
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                                            Description
                                        </h1>
                                        <div className="mt-1">
                                            <textarea
                                                id="desc"
                                                name="desc"
                                                rows={3}
                                                className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Write a short description..."
                                                value={desc}
                                                onChange={(e) =>
                                                    setDesc(e.target.value)
                                                }
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Write a short and precise
                                            description abour your recipe.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-lg leading-6 font-medium text-gray-900">
                                                Directions
                                            </h1>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Fill in the directions to create
                                                your new recipe.
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <div className="flex">
                                                    <div className="flex-grow">
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            rows={1}
                                                            className="block w-full shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                                                            placeholder="Add egg and meat until egg mixture is combined..."
                                                            value={editDir}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setEditDir(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <button
                                                            type="button"
                                                            className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                            onClick={
                                                                onAddDirectionClick
                                                            }
                                                        >
                                                            <PlusIcon
                                                                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            <span>Add</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-b border-gray-200">
                                                <ul className="divide-y divide-gray-200">
                                                    {directions.map(
                                                        (direction, idx) => (
                                                            <li
                                                                key={direction}
                                                                className="py-4 flex"
                                                            >
                                                                <div className="ml-3 flex flex-grow justify-between">
                                                                    <div>
                                                                        <span className="text-base font-medium text-gray-900">
                                                                            {idx +
                                                                                1}
                                                                            ){' '}
                                                                        </span>
                                                                        <span className="text-base font-medium text-gray-900">
                                                                            {
                                                                                direction
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <div className="">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                                        >
                                                                            <MinusIcon
                                                                                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                            <span>
                                                                                Remove
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
