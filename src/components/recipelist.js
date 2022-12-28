import React, { Component } from "react";
import "./recipelist.css";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/recipes",
});

class RecipeList extends Component {
  state = {
    dorayakiList: [],
    detailList: [],
  };

  constructor() {
    super();
    this.state = {
      dorayakiList: [],
      detailList: [],
    };
    this.getDorayakis();
  }

  getDorayakis = async () => {
    let data = await api.get("/").then(({ data }) => data);
    for (var i = 0, l = data.length; i < l; i++) {
      data[i].open = false;

      /* sekarang dapatin data resep dari tiap varian */
      this.getDetails(data[i].nama_varian);
    }
    this.setState({ dorayakiList: data });
  };

  getDetails = async (nama) => {
    let data = await axios
      .get("http://localhost:3001/detail", {
        params: { //kalo perlu pencarian misal disini pake nama
          variant: nama,
        },
      })
      .then(({ data }) => data);
    const list = this.state.detailList;
    list.push(data);
    this.setState({ detailList: list });
  };

  showDetail = (key) => {
    const list = this.state.dorayakiList;

    list[key].open = !list[key].open;

    this.setState({ dorayakiList: list });
  };

  showRecipe = (key) => {
    return (
      <div className="detail-isi">
        <h3>{this.state.dorayakiList[key].nama_varian}</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Bahan baku</th>
              <th scope="col">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {this.state.detailList[key].map((val, index) => (
              <tr key={index}>
                <td>{val.bahan_baku}</td>
                <td>{val.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    return (
      <div className="cont">
        <h1>Daftar Resep Dorayaki</h1>
        <div className="dorayakis">
          {this.state.dorayakiList.map((val, key) => {
            return (
              <div className="aya" key={val.nama_varian}>
                <button
                  className="dorayakiName btn btn-outline-secondary"
                  onClick={() => this.showDetail(key)}
                >
                  {val.nama_varian}
                </button>
                {val.open ? (
                  <div className="detail">{this.showRecipe(key)}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RecipeList;
