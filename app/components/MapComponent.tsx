"use client";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  markerText?: string;
  zoom?: number;
}

export default function MapComponent({ 
  latitude, 
  longitude, 
  markerText = "Location",
  zoom = 14 
}: MapComponentProps) {
  // Using Google Maps Embed API (free, no API key required for basic use)
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  
  return (
    <div className="w-full h-full">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={markerText}
      />
      <div className="mt-2 text-sm text-gray-600">
        <p className="font-medium">{markerText}</p>
        <p>Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
      </div>
    </div>
  );
}