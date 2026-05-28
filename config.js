/**
 * Configuration Constants
 * Centralized API endpoints, layer configurations, and application settings
 */

export const CONFIG = {
  // API Endpoints
  PARCEL_URL: 'https://services.arcgis.com/jsIt88o09Q0r1j8h/arcgis/rest/services/Current_Parcels/FeatureServer/0',
  WDFW_BASE: 'https://geodataservices.wdfw.wa.gov/arcgis/rest/services/PHSOnTheWeb/PHSOnTheWebPublic/MapServer',
  
  // Map settings
  INITIAL_CENTER: [47.5, -120.5],
  INITIAL_ZOOM: 7,
  PARCEL_SCALE: 200000,
  VECTOR_OVERLAY_SCALE: 100000,
  
  // DPI and coordinate system constants
  DPI: 96,
  INCHES_TO_METERS: 0.0254,
  METERS_PER_PIXEL: 156543.03392,
  
  // WDFW PHS Layer definitions
  WDFW_LAYERS: [
    { id: 0, name: 'PHS Points' },
    { id: 1, name: 'PHS Lines' },
    { id: 2, name: 'PHS Poly Out.' },
    { id: 3, name: 'PHS Polygons' },
  ],

  // Extra data source queries
  EXTRA_QUERIES: [
    {
      name: 'WDFW Habitat Contact',
      color: '#e76f51',
      url: 'https://geodataservices.wdfw.wa.gov/arcgis/rest/services/HP_Projects/HabitatProgramAreasOfResponsibilitiesGeoLib/MapServer/0',
      filterField: 'rolecode',
      filterValues: ['ARHPM', 'BIO']
    },
    {
      name: 'DNR Hydro (Watercourses)',
      color: '#457b9d',
      url: 'https://gis.dnr.wa.gov/site2/rest/services/Public_Forest_Practices/WADNR_PUBLIC_FP_Hydro/MapServer/0'
    },
    {
      name: 'DNR Hydro (Waterbodies)',
      color: '#457b9d',
      url: 'https://gis.dnr.wa.gov/site2/rest/services/Public_Forest_Practices/WADNR_PUBLIC_FP_Hydro/MapServer/1'
    },
    {
      name: 'WA Public Lands',
      color: '#52b788',
      url: 'https://gis.dnr.wa.gov/site3/rest/services/Public_Boundaries/WADNR_PUBLIC_Major_Public_Lands_NonDNR/MapServer/0'
    }
  ],
  
  // Color palettes
  OCCURRENCE_PALETTE: [
    '#e63946','#f4a261','#2a9d8f','#6a4c93','#ffb703',
    '#3a86ff','#06d6a0','#8338ec','#fb5607','#219ebc',
    '#c77dff','#52b788','#f72585','#4cc9f0','#b5838d',
    '#90be6d','#f9c74f','#43aa8b'
  ],

  HYDRO_COLOR_MAP: {
    'S': '#03045e',
    'F': '#0077b6',
    'N': '#00b4d8',
    'U': '#90e0ef',
    '1': '#03045e',
    '2': '#0077b6',
    '3': '#00b4d8',
    '4': '#48cae4',
    '5': '#90e0ef',
    '9': '#caf0f8',
  },

  // Basemap options
  BASEMAPS: [
    {
      name: 'Streets',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attr: '© OpenStreetMap contributors',
      active: true
    },
    {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attr: '© Esri, Maxar'
    },
    {
      name: 'Terrain',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attr: '© Esri'
    },
    {
      name: 'Light Gray',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attr: '© Esri'
    },
    {
      name: 'Dark',
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attr: '© Stadia Maps'
    }
  ],

  // Overlay layer configurations
  OVERLAY_CONFIGS: [
    {
      id: 'publiclands',
      baseUrl: 'https://gis.dnr.wa.gov/site3/rest/services/Public_Boundaries/WADNR_PUBLIC_Major_Public_Lands_NonDNR/MapServer',
      layerId: 'all',
      attr: '© WA DNR',
      opacity: 0.50,
      on: false,
      type: 'tile'
    },
    {
      id: 'fphydro',
      baseUrl: 'https://gis.dnr.wa.gov/site2/rest/services/Public_Forest_Practices/WADNR_PUBLIC_FP_Hydro/MapServer',
      layerId: 'all',
      attr: '© WA DNR',
      opacity: 0.65,
      on: false,
      type: 'tile'
    },
    {
      id: 'lidar',
      baseUrl: 'https://gis.dnr.wa.gov/site1/rest/services/Public_Geology/Lidar_Hillshade/MapServer',
      layerId: 'all',
      attr: '© WA DNR',
      opacity: 0.60,
      on: false,
      type: 'export'
    }
  ],

  // Search parameters
  SEARCH_FIELDS: ['ORIG_PARCEL_ID', 'PARCEL_ID_NR', 'SITUS_ADDRESSS', 'SITUS_ADDRESS', 'SITUS_CITY_NM', 'OWNER_NM', 'OWNER_NAME'],
  
  // Debounce and timing
  FETCH_DEBOUNCE_MS: 350,
  OPACITY_DEBOUNCE_MS: 50,
  POPUP_EVENT_DELAY_MS: 40,

  // UI settings
  MAX_SEARCH_RESULTS: 100,
  PARCEL_FETCH_LIMIT: 500,
};
