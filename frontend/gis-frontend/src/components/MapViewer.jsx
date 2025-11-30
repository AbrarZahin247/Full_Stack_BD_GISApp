import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// --- CONTROLLER (Kept exactly the same) ---
const MapController = ({ bounds, defaultCenter, defaultZoom, triggerReset }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, easeLinearity: 0.25 });
    } else {
      map.flyTo(defaultCenter, defaultZoom, { duration: 1.5 });
    }
  }, [bounds, triggerReset, map, defaultCenter, defaultZoom]);
  return null;
};

const MapViewer = () => {
  const [activeLayer, setActiveLayer] = useState('division');
  const [divisionShapes, setDivisionShapes] = useState(null);
  const [districtShapes, setDistrictShapes] = useState(null);
  const [divisionStats, setDivisionStats] = useState({});
  const [districtStats, setDistrictStats] = useState({});
  const [loading, setLoading] = useState(true);

  // MOVEMENT & SELECTION STATE
  const [focusBounds, setFocusBounds] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  // *** NEW: Store the ID of the selected region to handle highlighting ***
  const [selectedId, setSelectedId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const defaultCenter = [23.6850, 90.3563];
  const defaultZoom = 7;

  // --- DATA LOADING (Kept same) ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [divGeo, distGeo, divApi, distApi] = await Promise.all([
          fetch('/bd_divisions.geojson').then(r => r.json()),
          fetch('/bd_districts.geojson').then(r => r.json()),
          fetch(`${BASE_URL}/api/division`).then(r => r.json()),
          fetch(`${BASE_URL}/api/district`).then(r => r.json())
        ]);
        setDivisionShapes(divGeo);
        setDistrictShapes(distGeo);
        
        const divMap = {}; divApi.forEach(d => divMap[d.pCode] = d);
        setDivisionStats(divMap);
        const distMap = {}; distApi.forEach(d => distMap[d.districtPCode] = d);
        setDistrictStats(distMap);
        
        setLoading(false);
      } catch (err) { console.error(err); setLoading(false); }
    };
    loadAllData();
  }, []);

  // --- KEYBOARD RESET ---
  useEffect(() => {
    const handleEsc = (event) => { if (event.key === 'Escape') handleResetView(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleResetView = () => {
    setFocusBounds(null);
    setResetTrigger(prev => prev + 1);
    setSelectedId(null); // *** Clear the selection on reset
  };

  // --- *** NEW: DYNAMIC STYLE FUNCTION *** ---
  // This runs for every shape. If the ID matches selectedId, it becomes Orange.
  const getFeatureStyle = (feature) => {
    // Determine which ID to check based on the active layer
    const featureId = activeLayer === 'division' 
      ? feature.properties.ADM1_PCODE 
      : feature.properties.ADM2_PCODE;

    const isSelected = featureId === selectedId;

    if (isSelected) {
      return {
        fillColor: '#ff7800', // Keep Orange fill (optional)
        fillOpacity: 0.4,
        color: '#ff0000',     // <--- CHANGE: Red Border
        weight: 5,            // <--- CHANGE: Thicker line (Try 4, 5, or 6)
        dashArray: '',        // Solid line
      };
    }

    // Default Colors (Unchanged)
    return {
      fillColor: activeLayer === 'division' ? '#3388ff' : '#10b981',
      fillOpacity: 0.1,
      color: activeLayer === 'division' ? '#004a9f' : '#047857',
      weight: 1.5,
    };
  };

  const onEachFeature = (feature, layer) => {
    let popupContent = "";

    // --- 1. DIVISION POPUP (Blue Theme) ---
    if (activeLayer === 'division') {
      const pCode = feature.properties.ADM1_PCODE;
      // Fallback object if data hasn't loaded
      const stats = divisionStats[pCode] || { 
        name: feature.properties.ADM1_EN, 
        population: "N/A", area: "N/A", density: "N/A", literacy: "N/A" 
      };

      popupContent = `
        <div style="font-family: 'Inter', sans-serif; min-width: 220px;">
          <h3 style="margin:0 0 12px 0; color: #1e40af; border-bottom: 3px solid #3b82f6; padding-bottom: 5px;">
            ${stats.name} Division
          </h3>
          <div style="display: grid; grid-template-columns: 20px auto 1fr; gap: 6px; align-items: center; font-size: 13px; color: #374151;">
            <span>👥</span> <strong>Pop:</strong> <span style="text-align:right">${stats.population}</span>
            <span>📏</span> <strong>Area:</strong> <span style="text-align:right">${stats.area}</span>
            <span>🏘️</span> <strong>Dens:</strong> <span style="text-align:right">${stats.density}</span>
            <span>🎓</span> <strong>Lit:</strong> <span style="text-align:right">${stats.literacy}</span>
          </div>
          <p style="margin: 10px 0 0 0; font-size: 10px; color: #9ca3af; text-align: right; border-top: 1px solid #eee; padding-top: 5px;">
            PCode: ${pCode} | Source: BBS 2022
          </p>
        </div>
      `;
    } 
    
    // --- 2. DISTRICT POPUP (Green Theme) ---
    else if (activeLayer === 'district') {
      const pCode = feature.properties.ADM2_PCODE;
      const stats = districtStats[pCode] || { 
        name: feature.properties.ADM2_EN, 
        population: "N/A", area: "N/A", density: "N/A", literacy: "N/A" 
      };

      popupContent = `
        <div style="font-family: 'Inter', sans-serif; min-width: 220px;">
          <h3 style="margin:0 0 12px 0; color: #047857; border-bottom: 3px solid #10b981; padding-bottom: 5px;">
            ${stats.name} District
          </h3>
          <div style="display: grid; grid-template-columns: 20px auto 1fr; gap: 6px; align-items: center; font-size: 13px; color: #374151;">
            <span>👥</span> <strong>Pop:</strong> <span style="text-align:right">${stats.population}</span>
            <span>📏</span> <strong>Area:</strong> <span style="text-align:right">${stats.area}</span>
            <span>🏘️</span> <strong>Dens:</strong> <span style="text-align:right">${stats.density}</span>
            <span>🎓</span> <strong>Lit:</strong> <span style="text-align:right">${stats.literacy}</span>
          </div>
          <p style="margin: 10px 0 0 0; font-size: 10px; color: #9ca3af; text-align: right; border-top: 1px solid #eee; padding-top: 5px;">
            Dist Code: ${pCode}
          </p>
        </div>
      `;
    }

    layer.bindPopup(popupContent);

    // --- CLICK HANDLER (Zoom & Highlight) ---
    layer.on({
      click: (e) => {
        const clickedLayer = e.target;
        const center = clickedLayer.getBounds().getCenter();
        
        // 1. Set Selection ID (Triggers the Red Border)
        const id = activeLayer === 'division' ? feature.properties.ADM1_PCODE : feature.properties.ADM2_PCODE;
        setSelectedId(id);

        // 2. Zoom & Popup
        setFocusBounds(clickedLayer.getBounds());
        clickedLayer.openPopup(center);
      }
    });
  };

  return (
    <div style={{ display: 'flex', height: '85vh', gap: '20px', marginTop: '20px' }}>
      {/* SIDEBAR */}
      <div style={{ flex: '0 0 250px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{marginTop:0}}>Map Layers</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'}}>
          <label style={{display: 'flex', gap: '10px', cursor: 'pointer'}}>
            <input type="radio" checked={activeLayer === 'division'} onChange={() => { setActiveLayer('division'); handleResetView(); }} /> Divisions
          </label>
          <label style={{display: 'flex', gap: '10px', cursor: 'pointer'}}>
            <input type="radio" checked={activeLayer === 'district'} onChange={() => { setActiveLayer('district'); handleResetView(); }} /> Districts
          </label>
        </div>
        <button onClick={handleResetView} style={{ marginTop: 'auto', padding: '10px', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Reset View (ESC)
        </button>
      </div>

      {/* MAP PANEL */}
      <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #ccc', position: 'relative' }}>
        <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          
          <MapController bounds={focusBounds} defaultCenter={defaultCenter} defaultZoom={defaultZoom} triggerReset={resetTrigger} />

          {/* Using `style={getFeatureStyle}` instead of a static object.
             React runs this function for every region whenever `selectedId` changes.
          */}

          {!loading && activeLayer === 'division' && divisionShapes && (
            <GeoJSON 
              key="div-layer" 
              data={divisionShapes} 
              style={getFeatureStyle} 
              onEachFeature={onEachFeature} 
            />
          )}

          {!loading && activeLayer === 'district' && districtShapes && (
            <GeoJSON 
              key="dist-layer" 
              data={districtShapes} 
              style={getFeatureStyle} 
              onEachFeature={onEachFeature} 
            />
          )}

        </MapContainer>
      </div>
    </div>
  );
};

export default MapViewer;