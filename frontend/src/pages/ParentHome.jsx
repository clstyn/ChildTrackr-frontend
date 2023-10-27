import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import Layout from './Layout';
import { useGlobalState } from '../state';
import Modal from '../components/Modal';

const ParentHome = () => {
  const [childUsername, setChildUsername] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState({
    id: null,
    show: false
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parent } = useSelector((state) => state.parent);
  const [allChildren, setAllChildren] = useGlobalState('allChildren');

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (!parent) {
      navigate('/');
    }
  }, [parent, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    axios
      .get(process.env.REACT_APP_linkNgrok + '/user/userProfiles')
      .then((response) => {
        // Handle successful response
        setChildren(response.data);
        setAllChildren(response.data);
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response Error:', error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request Error:', error.request);
        } else {
          // Something else happened while setting up the request
          console.log('Error:', error.message);
        }
      });
  };

  const getChildProfilesInformation = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_linkNgrok + '/child/findCoordinates', {
        username: childUsername
      });

      if (response.status === 200) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.latitude !== null && responseData.longitude !== null) {
          setLatitude(responseData.latitude);
          setLongitude(responseData.longitude);
        } else {
          throw new Error('Data koordinat tidak ditemukan.');
        }
      } else {
        throw new Error('Gagal mengambil data koordinat.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const saveChildProfile = async () => {
    const newProfile = {
      username: parent,
      name: childUsername,
      latitude: latitude,
      longitude: longitude
    };

    try {
      const response = await axios.post(process.env.REACT_APP_linkNgrok + '/user/addProfile', {
        username: newProfile.username,
        name: newProfile.name,
        latitude: newProfile.latitude.toString(),
        longitude: newProfile.longitude.toString()
      });

      if (response.status === 200) {
        // Handle success
        alert('Profil berhasil dibuat');
      } else {
        // Handle error
        alert('Gagal menyimpan profil');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <button
          className="button is-success has-text-weight-semibold mb-2"
          onClick={() => setShowModal({ show: true })}
        >
          Tambah Profil Anak
        </button>
        <Modal show={showModal} onClose={() => setShowModal({ show: false })} title="Tambah Profil Anak">
          <input
            type="text"
            placeholder="Username anak"
            onChange={(e) => setChildUsername(e.target.value)}
            className="input"
          />
          <div>
            <button onClick={getChildProfilesInformation} className="button maya-blue mt-2 has-text-weight-semibold">
              Dapatkan informasi anak
            </button>
          </div>
          <div>Username: {childUsername}</div>
          <div>Latitude: {latitude.toFixed(6)}</div>
          <div>Longitude: {longitude.toFixed(6)}</div>
          <button onClick={saveChildProfile} className="button is-success mt-4">
            Simpan
          </button>
        </Modal>
        {/* <button className="button is-success has-text-weight-semibold mb-2">Tambah Profil Anak</button> */}
        <h2 className="has-text-weight-semibold is-size-4 mb-3">Daftar Anak</h2>
        <div className="row">
          {children
            .filter((filteredchildren) => filteredchildren['username'] === parent)
            .map((child) => (
              <NavLink to={`/parent/lokasianak/${child._id}`} className="box ml-3" key={child._id}>
                <div>{child.name}</div>
              </NavLink>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParentHome;
