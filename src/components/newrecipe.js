import { useState } from "react";
import Axios from "axios";
import "./newrecipe.css";

const NewRecipe = () => {
  const [name, setName] = useState("");

  const [inputBahanBaku, setBahanBaku] = useState([
    { namaBahan: "", banyak: 0 },
  ]);

  const handleChange = (event, idx) => {
    const { name, value } = event.target;

    const list = [...inputBahanBaku];
    list[idx][name] = value;

    setBahanBaku(list);
  };

  const handleAddInput = () => {
    setBahanBaku([...inputBahanBaku, { namaBahan: "", banyak: 0 }]);
  };

  const handleRemoveInput = (idx) => {
    const list = [...inputBahanBaku];
    list.splice(idx, 1);
    setBahanBaku(list);
  };

  const addNewRecipe = () => {
    /* memastikan bahan baku yang jumlahnya nol tidak akan ditambahkan ke basis data */
    const bahanbaku = inputBahanBaku;
    bahanbaku.forEach((bahan) => {
      if (bahan.banyak === 0) {
        bahanbaku.splice(bahanbaku.indexOf(bahan), 1);
      }
    });
    setBahanBaku(bahanbaku);

    /* mengirimkan masukan user ke server */
    Axios.post("http://localhost:3001/addRecipe", {
      name: name,
      inputBahanBaku: inputBahanBaku,
    }).then(() => {
      alert("sukses menambahkan resep baru ke basis data");
    });
  };

  return (
    <div className="cont">
      <h1>Menambahkan Resep Varian Dorayaki Baru</h1>

      <div className="inputResep">
        <form className="row g-3">
          {/* untuk menyimpan nama dorayaki */}
          <div className="col-12">
            <label className="form-label">
              <h4>Nama varian dorayaki baru</h4>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama dorayaki"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          {/* untuk menyimpan bahan baku */}
          <div className="containerBB">
            <h4>Bahan baku dorayaki baru</h4>
            {inputBahanBaku.map((item, i) => {
              return (
                <div key={i} className="row g-3 containerFormBB">
                  <div className="col-md-6">
                    <label className="form-label">Bahan baku</label>
                    <input
                      type="text"
                      name="namaBahan"
                      placeholder="Nama bahan"
                      className="form-control"
                      value={item.namaBahan}
                      onChange={(event) => handleChange(event, i)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Banyak bahan</label>
                    <input
                      type="number"
                      min="0"
                      name="banyak"
                      className="form-control"
                      value={item.banyak}
                      onChange={(event) => handleChange(event, i)}
                    />
                  </div>
                  <div className="col-md-2 tempatbtnmin">
                    <input
                      type="button"
                      className="btn btn btn-outline-danger minbtn"
                      value="-"
                      onClick={() => handleRemoveInput(i)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="d-grid gap-2 d-md-block">
              <input
                type="button"
                className="btn btn btn-secondary addbtn me-md-5"
                value="Tambah bahan baku"
                onClick={handleAddInput}
              />
            </div>
          </div>
          <div className="submitcontainer">
            <button className="btn btn-primary" onClick={addNewRecipe}>
              Tambah resep
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;
