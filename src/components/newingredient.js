import { useState } from "react";
import axios from "axios";
import "./newingredient.css";

const NewIngredient = () => {
    const [name, setName] = useState("");

    const [stock, setStock] = useState(0);

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

    const addNewIngredient = () => {
        try {
            axios.post("http://localhost:3001/addIngredient", {
                name: name,
                stock: stock,
            });
            alert("Bahan baku berhasil ditambahkan!");
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Tambah Bahan Baku Baru</h1>
            <div className="tambah-bahan">
                <form>
                    <div>
                        <label>
                            Nama Bahan Baku
                        </label>
                        <br/>
                        <input
                            type="text"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
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
                    <button onClick={addNewIngredient}>
                            Tambah
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewIngredient;