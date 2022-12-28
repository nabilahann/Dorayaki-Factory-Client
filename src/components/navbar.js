import React, { Component } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:3001/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" id="navbar"href="#">
          Pabrik AnakAyam
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" aria-current="page" href="/dashboard">
              Dashboard
            </a>
            <a className="nav-link" href="/recipes">
              Daftar resep
            </a>
            <a className="nav-link" href="/addRecipes">
              Tambah resep
            </a>
            <a className="nav-link" href="/requestlist">
              Daftar Request
            </a>
            <a className="nav-link" href="/newingredient">
              Tambah Bahan
            </a>
            <a className="nav-link" href="/ingredientlist">
              Daftar Bahan
            </a>
            <a className="nav-link" href="#">
              <button className="btn-logout" onClick={Logout}>
                  Logout
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
