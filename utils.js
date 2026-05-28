/**
 * Utility Functions
 * Common helpers for attribute extraction, color mapping, and formatting
 */

import { CONFIG } from './config.js';

/**
 * Case-insensitive attribute extractor for GeoJSON feature properties
 * Handles varying capitalization in API responses
 * @param {Object} attrs - Feature attributes object
 * @param {Array<string>} possibleKeys - List of possible key names to check
 * @returns {string} The attribute value or empty string if not found
 */
export function getAttr(attrs, possibleKeys) {
  if (!attrs) return '';
  
  const lowerKeys = Object.keys(attrs).reduce((acc, key) => {
    acc[key.toLowerCase()] = key;
    return acc;
  }, {});
  
  for (const pk of possibleKeys) {
    const actualKey = lowerKeys[pk.toLowerCase()];
    if (actualKey && attrs[actualKey] !== null && String(attrs[actualKey]).trim() !== '') {
      return String(attrs[actualKey]).trim();
    }
  }
  return '';
}

/**
 * Map occurrence names to consistent colors using a palette
 * @type {Object}
 */
let occurrenceColorMap = {};
let occurrenceIndex = 0;

/**
 * Get or assign a color for an occurrence name
 * @param {string} name - Occurrence name
 * @returns {string} Hex color code
 */
export function getOccurrenceColor(name) {
  if (!name) return '#888888';
  
  if (!occurrenceColorMap[name]) {
    occurrenceColorMap[name] = CONFIG.OCCURRENCE_PALETTE[occurrenceIndex % CONFIG.OCCURRENCE_PALETTE.length];
    occurrenceIndex++;
  }
  return occurrenceColorMap[name];
}

/**
 * Reset occurrence color map (useful for new queries)
 */
export function resetOccurrenceColors() {
  occurrenceColorMap = {};
  occurrenceIndex = 0;
}

/**
 * Get color for hydro features based on water type code
 * @param {string|number} code - Water type code (S, F, N, U, 1-5, 9)
 * @returns {string} Hex color code
 */
export function getHydroColor(code) {
  const codeStr = String(code).toUpperCase();
  return CONFIG.HYDRO_COLOR_MAP[codeStr] || '#457b9d';
}

/**
 * Format area value in square feet to human-readable format
 * @param {number} sqFt - Area in square feet
 * @returns {string} Formatted area string (acres or sq ft)
 */
export function formatArea(sqFt) {
  if (!sqFt) return '';
  
  const acres = sqFt / 43560;
  if (acres > 0.1) {
    return acres.toFixed(2) + ' acres';
  }
  return Math.round(sqFt).toLocaleString() + ' sq ft';
}

/**
 * Calculate map scale at current zoom level
 * Uses Web Mercator projection math
 * @param {number} zoom - Map zoom level
 * @param {number} latitude - Latitude for accurate scale calculation
 * @returns {number} Map scale ratio (e.g., 200000 for 1:200,000)
 */
export function calculateMapScale(zoom, latitude) {
  const mPerPx = CONFIG.METERS_PER_PIXEL * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom);
  return Math.round(mPerPx * CONFIG.DPI / CONFIG.INCHES_TO_METERS);
}

/**
 * Round coordinates to reasonable precision for bbox comparison
 * @param {number} value - Coordinate value
 * @returns {number} Rounded value
 */
export function roundCoordinate(value) {
  return Math.round(value * 10000) / 10000;
}

/**
 * Escape single quotes in SQL-like strings for safe querying
 * @param {string} value - String to escape
 * @returns {string} Escaped string
 */
export function escapeSqlString(value) {
  return value.replace(/'/g, "''");
}

/**
 * Build a WHERE clause for feature server queries
 * @param {Array<string>} fields - Field names to search
 * @param {string} searchValue - Search value (will be escaped and uppercased)
 * @returns {string} WHERE clause
 */
export function buildSearchWhere(fields, searchValue) {
  const safeVal = escapeSqlString(searchValue).toUpperCase();
  return fields.map(f => `UPPER(${f}) LIKE '%${safeVal}%'`).join(' OR ');
}

/**
 * Convert geometry bounding box to URL-encoded geometry parameter
 * @param {Object} bounds - Leaflet LatLngBounds or {west, south, east, north}
 * @returns {string} Encoded geometry parameter for ArcGIS query
 */
export function encodeBoundsGeometry(bounds) {
  const geomObj = {
    xmin: bounds.west || bounds.getWest(),
    ymin: bounds.south || bounds.getSouth(),
    xmax: bounds.east || bounds.getEast(),
    ymax: bounds.north || bounds.getNorth(),
    spatialReference: { wkid: 4326 }
  };
  return encodeURIComponent(JSON.stringify(geomObj));
}

/**
 * Extract OID (Object ID) from feature properties
 * Handles varying capitalization
 * @param {Object} properties - Feature properties
 * @returns {string|number} OID value
 */
export function getFeatureOID(properties) {
  return properties?.OBJECTID ?? properties?.objectid ?? properties?.OID;
}

/**
 * Extract parcel ID from feature properties
 * Tries multiple possible field names
 * @param {Object} properties - Feature properties
 * @param {string|number} oid - Fallback OID
 * @returns {string} Parcel ID
 */
export function getParcelID(properties, oid) {
  return properties['ORIG_PARCEL_ID'] ||
         properties['Orig_Parcel_ID'] ||
         properties['PARCEL_ID_NR'] ||
         `OID: ${oid}`;
}

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if value is valid (not empty, null, or undefined)
 * @param {any} value - Value to check
 * @returns {boolean} True if valid
 */
export function isValidValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}
