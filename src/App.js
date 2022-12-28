import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import NewRecipe from "./components/newrecipe";
import RecipeList from "./components/recipelist";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Request from "./components/requestlist";
import NewIngredient from "./components/newingredient";
import IngredientList from "./components/ingredientlist";
import UpdateIngredient from "./components/updateingredient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/dashboard" 
          element={ <div className="App">
                        <NavBar />
                        <Dashboard />
                    </div>} />
        <Route path="/recipes" 
          element={ <div className="App">
                        <NavBar />
                        <RecipeList />
                    </div>} />
        <Route path="/addRecipes" 
          element={ <div className="App">
                        <NavBar />
                        <NewRecipe />
                    </div>} />
        <Route path="/requestlist" 
          element={ <div className="App">
                        <NavBar />
                        <Request />
                        </div>} />
        <Route path="/newingredient"
          element={ <div className="App">
                        <NavBar />
                        <NewIngredient />
                    </div>} />
        <Route path="/ingredientlist"
          element={ <div className="App">
                        <NavBar />
                        <IngredientList />
                    </div>} />
        <Route path="/updateingredient/:id"
          element={ <div className="App">
                        <NavBar />
                        <UpdateIngredient />
                    </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
