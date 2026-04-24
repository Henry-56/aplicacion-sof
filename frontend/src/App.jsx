import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogIn, MapPin, Search, LogOut, UserPlus, Map as MapIcon, List, AlertCircle, Heart, User as UserIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './index.css';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const API_URL = 'http://localhost:3000/api';

function App() {
  const [view, setView] = useState('places'); // 'places', 'login', 'register', 'map'
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState([]); // New state for likes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Map states
  const [mapCenter, setMapCenter] = useState([-12.0691, -75.2042]);
  const [mapZoom, setMapZoom] = useState(8);
  
  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedCrowd, setSelectedCrowd] = useState('Todas');
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || place.category === selectedCategory;
    const matchesCrowd = selectedCrowd === 'Todas' || place.crowdLevel === selectedCrowd;
    return matchesSearch && matchesCategory && matchesCrowd;
  });

  const categories = ['Todas', ...new Set(places.map(p => p.category))];
  const crowdLevels = ['Todas', 'Baja', 'Media', 'Alta'];

  useEffect(() => {
    if (user) {
      fetchLikes();
    } else {
      setLikedPlaces([]);
    }
  }, [user]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tourist-places`);
      setPlaces(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al cargar los lugares turísticos');
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`${API_URL}/users/${user.id}/likes`);
      setLikedPlaces(response.data);
    } catch (err) {
      console.error('Error fetching likes:', err);
    }
  };

  const handleLike = async (placeId) => {
    if (!user) {
      setView('login');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/likes`, { userId: user.id, placeId });
      if (response.data.liked) {
        setLikedPlaces([...likedPlaces, placeId]);
      } else {
        setLikedPlaces(likedPlaces.filter(id => id !== placeId));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      setUser(response.data.user);
      setView('places');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/users`, { name, email, password });
      setUser(response.data);
      setView('places');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('places');
    setEmail('');
    setPassword('');
    setName('');
  };

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Alta': return '#ef4444';
      case 'Media': return '#f59e0b';
      case 'Baja': return '#10b981';
      default: return 'var(--text-muted)';
    }
  };




  return (
    <div className="app-container">
      <header>
        <div className="logo" onClick={() => setView('places')}>
          Turismo Junín
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className={`btn-ghost ${view === 'places' ? 'active' : ''}`} onClick={() => setView('places')}>
            <List size={18} /> Lista
          </button>
          <button className={`btn-ghost ${view === 'map' ? 'active' : ''}`} onClick={() => setView('map')}>
            <MapIcon size={18} /> Mapa
          </button>
          
          {user ? (
            <>
              <span className="user-badge">
                <UserIcon size={14} /> {user.name}
              </span>
              <button className="btn-ghost" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-primary" style={{ width: 'auto' }} onClick={() => setView('login')}>
                Entrar
              </button>
              <button className="btn-ghost" style={{ width: 'auto' }} onClick={() => setView('register')}>
                Registrarse
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        {view === 'login' && (
          <div className="card login-card">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
              {error && <div className="error-msg">{error}</div>}
              <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                ¿No tienes cuenta? <a href="#" onClick={() => setView('register')}>Regístrate</a>
              </p>
            </form>
          </div>
        )}

        {view === 'register' && (
          <div className="card login-card">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Crear Cuenta</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Cargando...' : 'Registrarse'}
              </button>
              {error && <div className="error-msg">{error}</div>}
              <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                ¿Ya tienes cuenta? <a href="#" onClick={() => setView('login')}>Entra aquí</a>
              </p>
            </form>
          </div>
        )}

        {view === 'places' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h1>Explora Junín</h1>
              <p style={{ color: 'var(--text-muted)' }}>Descubre los destinos más asombrosos de la sierra central</p>
            </div>

            <div className="filter-bar card">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filters-group">
                <div className="filter-item">
                  <label>Categoría</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="filter-item">
                  <label>Afluencia</label>
                  <select value={selectedCrowd} onChange={(e) => setSelectedCrowd(e.target.value)}>
                    {crowdLevels.map(lvl => <option key={lvl} value={lvl}>{lvl === 'Todas' ? 'Todas' : lvl}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid">
              {filteredPlaces.map((place) => (
                <div key={place.id} className="card place-card" onClick={() => setSelectedPlace(place)}>
                  <div className="place-img-container">
                    <img 
                      src={place.imageUrl || `https://images.unsplash.com/photo-1582231644140-5e821034f71a?auto=format&fit=crop&q=80&w=800`} 
                      alt={place.name} 
                      className="place-img" 
                    />
                    <div className="crowd-indicator" style={{ backgroundColor: getCrowdColor(place.crowdLevel) }}>
                      Afluencia: {place.crowdLevel}
                    </div>
                    <button 
                      className={`like-btn ${likedPlaces.includes(place.id) ? 'liked' : ''}`}
                      onClick={() => handleLike(place.id)}
                    >
                      <Heart size={20} fill={likedPlaces.includes(place.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="place-content">
                    <span className="badge">{place.category}</span>
                    <h2 className="place-title">{place.name}</h2>
                    <p className="place-desc">{place.description}</p>
                    <div className="place-footer">
                      <MapPin size={16} /> {place.district}, {place.province}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'map' && (
          <div className="map-wrapper">
            <h1 style={{ marginBottom: '1.5rem' }}>Mapa de Destinos</h1>
            <div className="card" style={{ padding: 0, overflow: 'hidden', height: '600px' }}>
              <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapController center={mapCenter} zoom={mapZoom} />
                {filteredPlaces.map((place) => (
                  place.latitude && place.longitude && (
                    <Marker key={place.id} position={[place.latitude, place.longitude]}>
                      <Popup>
                        <div style={{ color: '#333' }} onClick={() => setSelectedPlace(place)}>
                          <strong style={{ fontSize: '1.1rem', cursor: 'pointer' }}>{place.name}</strong><br/>
                          <span style={{ color: getCrowdColor(place.crowdLevel), fontWeight: 'bold' }}>
                            Afluencia: {place.crowdLevel}
                          </span><br/>
                          <p style={{ margin: '5px 0' }}>{place.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </main>

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPlace(null)}>&times;</button>
            <div className="modal-img-wrapper">
              <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="modal-img" />
              <div className="crowd-indicator" style={{ backgroundColor: getCrowdColor(selectedPlace.crowdLevel), top: '1rem', right: '1rem' }}>
                Afluencia: {selectedPlace.crowdLevel}
              </div>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className="badge">{selectedPlace.category}</span>
                  <h1 style={{ marginTop: '0.5rem' }}>{selectedPlace.name}</h1>
                </div>
                <button 
                  className={`like-btn ${likedPlaces.includes(selectedPlace.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(selectedPlace.id)}
                  style={{ position: 'static', padding: '0.5rem' }}
                >
                  <Heart size={24} fill={likedPlaces.includes(selectedPlace.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              <p className="modal-desc">{selectedPlace.description}</p>
              
              <div className="modal-info">
                <div className="info-item">
                  <MapPin size={18} />
                  <span>{selectedPlace.location}, {selectedPlace.district}, {selectedPlace.province}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setMapCenter([selectedPlace.latitude, selectedPlace.longitude]);
                    setMapZoom(15);
                    setView('map');
                    setSelectedPlace(null);
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MapIcon size={20} /> Ver Ubicación Exacta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
