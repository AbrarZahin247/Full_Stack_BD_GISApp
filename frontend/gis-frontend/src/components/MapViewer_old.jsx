import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapViewer = () => {
  // --- STATE MANAGEMENT ---
  const [activeLayer, setActiveLayer] = useState('division'); // 'division' or 'district'

  // GeoJSON Data (The Shapes)
  const [divisionShapes, setDivisionShapes] = useState(null);
  const [districtShapes, setDistrictShapes] = useState(null);

  // Backend Data (The Stats) - Stored as Objects for fast lookup
  const [divisionStats, setDivisionStats] = useState({});
  const [districtStats, setDistrictStats] = useState({});

  const [loading, setLoading] = useState(true);

  // Dynamic Backend URL
  const BASE_URL = import.meta.env.VITE_API_URL;

  // --- 1. DATA LOADING ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        // A. Load Shapes (GeoJSON)
        const divGeoRes = await fetch('/bd_divisions.geojson');
        const distGeoRes = await fetch('/bd_districts.geojson');
        const divGeoData = await divGeoRes.json();
        const distGeoData = await distGeoRes.json();

        setDivisionShapes(divGeoData);
        setDistrictShapes(distGeoData);

        // B. Load Backend API Data
        // 1. Divisions
        const divApiRes = await fetch(`${BASE_URL}/api/division`);
        const divApiData = await divApiRes.json();
        const divMap = {};
        divApiData.forEach(d => { divMap[d.pCode] = d; }); // Map by PCode
        setDivisionStats(divMap);

        // 2. Districts
        const distApiRes = await fetch(`${BASE_URL}/api/district`);
        const distApiData = await distApiRes.json();
        const distMap = {};
        distApiData.forEach(d => { distMap[d.districtPCode] = d; }); // Map by DistrictPCode
        setDistrictStats(distMap);

        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // --- 2. STYLE & INTERACTION ---
  const style = {
    fillColor: activeLayer === 'division' ? '#3388ff' : '#10b981', // Blue for Div, Green for Dist
    fillOpacity: 0.1,
    color: activeLayer === 'division' ? '#004a9f' : '#047857',
    weight: 1.5,
  };

  const highlightStyle = {
    fillColor: '#ff7800',
    fillOpacity: 0.6,
    color: 'black',
    weight: 2,
  };

  const selectedLayerRef = useRef(null);

  // This function decides what to show in the popup based on the Active Layer
  const onEachFeature = (feature, layer) => {
    let popupContent = "";
    let name = "Unknown";
    
    // --- LOGIC FOR DIVISION LAYER ---
    if (activeLayer === 'division') {
      const pCode = feature.properties.ADM1_PCODE;
      const stats = divisionStats[pCode] || {};
      name = stats.name || feature.properties.ADM1_EN;

      popupContent = `
        <div style="font-family:sans-serif;">
          <h3 style="color:#1e40af; border-bottom:1px solid #ccc;">${name} (Division)</h3>
          <b>Pop:</b> ${stats.population || 'N/A'}<br/>
          <b>Area:</b> ${stats.area || 'N/A'}<br/>
          <b>Literacy:</b> ${stats.literacy || 'N/A'}
        </div>
      `;
    } 
    
    // --- LOGIC FOR DISTRICT LAYER ---
    else if (activeLayer === 'district') {
      const pCode = feature.properties.ADM2_PCODE;
      const stats = districtStats[pCode] || {};
      name = stats.name || feature.properties.ADM2_EN;

      popupContent = `
        <div style="font-family:sans-serif;">
          <h3 style="color:#047857; border-bottom:1px solid #ccc;">${name} (District)</h3>
          <b>Pop:</b> ${stats.population || 'N/A'}<br/>
          <b>Area:</b> ${stats.area || 'N/A'}<br/>
          <b>Density:</b> ${stats.density || 'N/A'}
        </div>
      `;
    }

    layer.bindPopup(popupContent);

    // Click Highlight Logic (Common for both)
    layer.on({
      click: (e) => {
        const clickedLayer = e.target;
        if (selectedLayerRef.current && selectedLayerRef.current !== clickedLayer) {
          selectedLayerRef.current.setStyle(style);
        }
        clickedLayer.setStyle(highlightStyle);
        selectedLayerRef.current = clickedLayer;
        clickedLayer.openPopup();
      }
    });
  };

  return (
    <div style={{ display: 'flex', height: '85vh', gap: '20px', marginTop: '20px' }}>
      
      {/* --- SIDEBAR: Layer Control --- */}
      <div style={{ flex: '0 0 250px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{marginTop:0}}>Map Layers</h3>
        <p style={{fontSize: '0.9rem', color: '#666'}}>Select which boundary layer to visualize:</p>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px'}}>
          
          {/* Division Option */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', 
            border: activeLayer === 'division' ? '2px solid #3388ff' : '1px solid #ddd',
            borderRadius: '8px', cursor: 'pointer', background: activeLayer === 'division' ? '#eff6ff' : 'white'
          }}>
            <input 
              type="radio" 
              name="layer" 
              checked={activeLayer === 'division'} 
              onChange={() => setActiveLayer('division')} 
            />
            <span style={{fontWeight: '600'}}> Divisions</span>
          </label>

          {/* District Option */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', 
            border: activeLayer === 'district' ? '2px solid #10b981' : '1px solid #ddd',
            borderRadius: '8px', cursor: 'pointer', background: activeLayer === 'district' ? '#ecfdf5' : 'white'
          }}>
            <input 
              type="radio" 
              name="layer" 
              checked={activeLayer === 'district'} 
              onChange={() => setActiveLayer('district')} 
            />
            <span style={{fontWeight: '600'}}> Districts</span>
          </label>

        </div>

        <div style={{marginTop: 'auto', fontSize: '0.8rem', color: '#888'}}>
          {loading ? "Loading Data..." : "Data Loaded Successfully"}
        </div>
      </div>

      {/* --- MAP PANEL --- */}
      <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #ccc' }}>
        <MapContainer center={[23.6850, 90.3563]} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          
          {/* CONDITIONAL RENDERING: Only show the GeoJSON matching the activeLayer */}
          
          {!loading && activeLayer === 'division' && divisionShapes && (
            <GeoJSON 
              key="division-layer" // Key forces react to re-render when switching
              data={divisionShapes} 
              style={style} 
              onEachFeature={onEachFeature} 
            />
          )}

          {!loading && activeLayer === 'district' && districtShapes && (
            <GeoJSON 
              key="district-layer" 
              data={districtShapes} 
              style={style} 
              onEachFeature={onEachFeature} 
            />
          )}

        </MapContainer>
      </div>

    </div>
  );
};

export default MapViewer;