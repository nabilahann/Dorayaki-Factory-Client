import { useState } from "react";
import "./updateingredient.css";
// import React, { Component } from "react";
// import { useParams } from 'react-router-dom';
import axios from "axios";
// import { withRouter } from "react-router-dom";
// import queryString from 'query-string';

const UpdateIngredient = () => {
    console.log(window.location.pathname);

    const path = window.location.pathname
    const param = path.replace("/updateingredient/", "").replace("%20", " ").split("=")
    console.log(param);

    const [name, setName] = useState(param[0]);

    const [stock, setStock] = useState(parseInt(param[1]));

    const validateStock = (value) => {
        if (value >= 0) {
            setStock(value);
        }
        else {
            setStock(0);
        }
    };

    const addStock = () => {
        setStock(stock + 1);
    };

    const subStock = () => {
        validateStock(stock - 1);
    };

    const updateStock = () => {
        try {
            axios.post("http://localhost:3001/updateStock", {
                name: name,
                stock: stock,
            });
            alert("Stok berhasil diubah!");
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Update Stok Bahan Baku</h1>
            <div className="tambah-bahan">
                <form>
                    <div>
                        <label>
                            Nama Bahan Baku
                        </label>
                        <br/>
                        <input
                            type="text"
                            value = {name}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Stok Bahan Baku
                        </label>
                        <br/>
                        <input
                            type="button"
                            value="-"
                            onClick={subStock}
                        />
                        <input
                            type="number"
                            onChange={(event) => {
                                validateStock(event.target.value)
                            }}
                            value = {stock}
                            required
                        />
                        <input
                            type="button"
                            value="+"
                            onClick={addStock}
                        />
                    </div>
                    <button onClick={updateStock}>
                            Tambah
                    </button>
                </form>
            </div>
        </div>
    );
};


// const UpdateIngredient = () => {
//     const [name, setName] = useState("");
//     console.log(window.location.pathname);
//     // const {nama} = useParams();

//     // console.log(nama);
//     // setParam() {
//     //     let params = queryString.parse(this.props.location.search)
//     //     return params;
//     // }
  
//     // getIngredients = async () => {
//     //     let data = await axios
//     //         .get("http://localhost:3001/ingredients")
//     //         .then(({data}) => data);

//     //     const list = this.state.ingredientList;
//     //     list.push(data)
//     //     this.setState({ ingredientList: list[0] });
//     //     console.log("Ini get", this.state.ingredientList)
//     // };

//     // render() {
//     //     const { nama } = this.props.match.params;
//     //     console.log({ nama })

//     //     return (
//     //         <div>Nama bahan: { nama }</div>
//     //     );
//     }
  
//     return (
//         <div className="container">
//               Muncul
//         </div>
//     );
// };

export default UpdateIngredient;