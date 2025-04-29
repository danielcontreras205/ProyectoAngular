import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  standalone: true,
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',
  imports: [CommonModule]
})
export class MapsComponent implements AfterViewInit {
  map!: L.Map;
  marker!: L.Marker;
  userLocation!: L.LatLng;
  bufferCircle!: L.Circle;
  coordenadas: { lat: number, lng: number } | null = null;
  routeLayer!: L.GeoJSON<any>;
  locationInfo: any = null;

  ngAfterViewInit(): void {
    this.initMap();
    this.trackLocation();
  }

  initMap(): void {
    this.map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  trackLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.userLocation = L.latLng(lat, lng);
          this.coordenadas = { lat, lng };

          if (this.marker) {
            this.marker.setLatLng(this.userLocation);
          } else {
            this.marker = L.marker(this.userLocation).addTo(this.map)
              .bindPopup('Tu ubicación')
              .openPopup();
              this.infoMap();
          }

          this.map.setView(this.userLocation, 20);
        },
        error => console.error('Error obteniendo ubicación:', error),
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
      
    } else {
      alert('La geolocalización no está soportada por tu navegador');
    }
  }

  crearBuffer(): void {
    if (!this.userLocation) {
      alert('Ubicación aún no detectada');
      return;
    }

    if (this.bufferCircle) {
      this.map.removeLayer(this.bufferCircle);
    }

    this.bufferCircle = L.circle(this.userLocation, {
      radius: 100,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2
    }).addTo(this.map);

    this.map.fitBounds(this.bufferCircle.getBounds());
  }

  quitarBuffer(): void {
    if (this.bufferCircle) {
      this.map.removeLayer(this.bufferCircle);
      this.bufferCircle = undefined!;
    }
  }

  centrarEnUbicacion(): void {
    if (this.userLocation) {
      this.map.setView(this.userLocation, 20);
    } else {
      alert('Ubicación aún no detectada');
    }
  }

  trazarRuta(): void {
    if (!this.userLocation) {
      alert('Ubicación aún no detectada');
      return;
    }

    const start = [this.userLocation.lat, this.userLocation.lng];
    const end = [4.304143, -74.447477]; // Coordenadas de destino

    const apiKey = '5b3ce3597851110001cf624842d68a2936874a3eaf9ac5d5d9f08f6c';
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: [[start[1], start[0]], [end[1], end[0]]]
      })
    })
      .then(response => response.json())
      .then(data => {
        if (this.routeLayer) {
          this.map.removeLayer(this.routeLayer);
        }

        this.routeLayer = L.geoJSON(data, {
          style: {
            color: 'blue',
            weight: 4
          }
        }).addTo(this.map);

        this.map.fitBounds(this.routeLayer.getBounds());
      })
      .catch(err => console.error('Error al trazar ruta:', err));
  }
  infoMap(): void {

    if (!this.userLocation) {
      alert('Ubicación aún no detectada');
      return;
    }
    const url = 'https://nominatim.openstreetmap.org/reverse?lat='+this.userLocation.lat+'&lon='+this.userLocation.lng+'&format=json';
    
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      this.locationInfo = data; // guardamos aquí la respuesta
    })
    .catch(error => {
      console.error('Error al hacer la petición:', error);
    });
  }
}

