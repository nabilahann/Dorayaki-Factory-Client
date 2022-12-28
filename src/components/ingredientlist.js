import React, { Component } from "react";
import axios from "axios";
import "./ingredientlist.css";

class IngredientList extends Component {
    constructor() {
        super();
        this.state = {
            ingredientList: [],
        };
        this.getIngredients();
    }
  
    getIngredients = async () => {
        let data = await axios
            .get("http://localhost:3001/ingredients")
            .then(({data}) => data);

        const list = this.state.ingredientList;
        list.push(data)
        this.setState({ ingredientList: list[0] });
    };
  
    render() {
        return (
            <div className="container">
                <h1>Daftar Bahan Baku</h1>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Bahan</th>
                                <th>Stok Bahan</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ingredientList.map((e, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{e.nama}</td>
                                        <td>{e.stok}</td>
                                        <td><a href={"/updateingredient/" + e.nama + "=" + e.stok}><button>Update</button></a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default IngredientList;