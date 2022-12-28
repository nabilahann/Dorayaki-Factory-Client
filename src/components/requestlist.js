import React, { useState, useEffect } from 'react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const RequestList = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [request, setRequest] = useState([]);
    const [msg, setMsg] = useState('');
    const [varian, setVarian] = useState('');
    // const [sortby, setSortby] = useState('');
    // const [sortby2, setSortby2] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();
    

    //ini keperluan authentikasi
    useEffect(() => {
        refreshToken();
        getRequest();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3001/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // console.log(decoded);
            // setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    //setiap request yg butuh token bisa pake ini
    const axiosJWT = axios.create();

    //untuk melakukan pengecekan sebelum melakukan request
    //agar kita bisa refresh token otomatis
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:3001/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    //sampai sini keperluan authentikasi


    const getRequest = async () => {
        // console.log(token)
        const response = await axiosJWT.get('http://localhost:3001/request', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data);
        setRequest(response.data);
        // console.log(request);
    };

    const searchRequest = async () => {
        //pencarian request berdasarkan nama varian
        console.log(searchKey)
        const response = await axiosJWT.get('http://localhost:3001/searchRequest', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { //kalo perlu pencarian misal disini pake nama
                key: searchKey,
            },
        });

        console.log("respon:", response.data);
        setRequest(response.data);
    };

    const sortRequest = async (sortby) => {
        console.log(sortby)
        const response = await axiosJWT.get('http://localhost:3001/sortRequest', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { //kalo perlu pencarian misal disini pake nama
                sortby: sortby,
            },
        });

        console.log("respon:", response.data);
        setRequest(response.data);
        
    };

    //untuk menerima request
    const accRequest = (key1, key2, key3) => {
        const response = axiosJWT.get('http://localhost:3001/accept', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { //kalo perlu pencarian misal disini pake nama
                id: key1,
                nama_varian: key2,
                jumlah_varian: key3,
            },
            
        });

        // setMsg(response.data.msg);
    };

    //untuk menolak request
    const decRequest = (key1) => {
        const response = axiosJWT.get('http://localhost:3001/decline', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { //kalo perlu pencarian misal disini pake nama
                id: key1,
            },
        });

        // setMsg(response.data.msg);
    };

    const setStatus = (status) => {
        if(status == 0){
            return "Belum Ditanggapi";
        } else if (status == 1){
            return "Sudah Ditanggapi";
        }
    }


    return (
        <div className="wrapper">
            <h1>Daftar Request</h1>
            <br/>
            <div className="inline-div">
            <button type="button" class="btn btn-primary" onClick={() => sortRequest("status")}>
                Urutkan Berdasarkan Status</button> &ensp;
            <button type="button" class="btn btn-info" onClick={() => sortRequest("tanggal")}>
                Urutkan Berdasarkan Waktu</button> &ensp;
            </div>
            {/* <button type="button" class="btn btn-light" onClick={() => sortRequest(3)}>
                Urutkan Berdasarkan Status dan Tanggal</button>  */}
            {/* onSubmit={Auth} */}
            <form> 
                <div className="inline-div">
                <input type="text" name="searchKey" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                <button type="button" class="btn-search" onClick={() => searchRequest()}>Cari</button>
                </div>
            </form>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">IP</th>
                    <th scope="col">Nama Varian</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Status</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">Tombol</th>
                    </tr>
                </thead>
                <tbody>
                {request.map((d, index) => (
                    <tr key={d.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{d.ip}</td>
                        <td>{d.nama_varian}</td>
                        <td>{d.jumlah_varian}</td>
                        <td>{setStatus(d.status)}</td>
                        <td>{d.tanggal}</td>
                        {d.status == 0 ?(
                            <td>
                            <div className="inline-div">
                            <button type="button" class="btn btn-success"
                                onClick={() => accRequest(d.id, d.nama_varian, d.jumlah_varian)}>
                                Terima
                            </button>
                            &ensp;
                            <button type="button" class="btn btn-danger" 
                                onClick={() => decRequest(d.id)}>
                                Tolak
                            </button>
                            </div>
                            </td>
                        ):null}
                    </tr>
                ))}
                </tbody>
            </table>
            
            <button type="button" class="btn btn-success" onClick={() => getRequest()}>Refresh</button>
        </div>
    );
};

export default RequestList;