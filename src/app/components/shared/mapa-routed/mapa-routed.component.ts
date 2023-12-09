import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-routed',
  templateUrl: './mapa-routed.component.html',
  styleUrls: ['./mapa-routed.component.css']
})
export class MapaRoutedComponent implements OnInit {
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  ngOnInit() {
    this.initMap();
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);

    // Agrega el manejador de eventos para el clic en el mapa
    this.map?.on('click', (event: L.LeafletMouseEvent) => {
      this.updateMarker(event.latlng);
    });
  }

  private initMap() {
    this.map = L.map('map').setView([40.4168, -3.7038], 6); // Madrid, España
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private updateMarker(latlng: L.LatLng) {
    // Si ya hay un marcador, quítalo del mapa
    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }

    // Define el icono personalizado
    const customIcon = L.icon({
      iconUrl: 'https://images.vexels.com/media/users/3/131625/isolated/lists/35942a8a6bb75dc1842582deb7168bf8-infografia-de-marcador-de-ubicacion-naranja.png',  // Ruta de la imagen del icono personalizado
      iconSize: [32, 32],  // Tamaño del icono [ancho, alto]
      iconAnchor: [16, 32],  // Punto de anclaje del icono [ancho/2, alto]
      popupAnchor: [0, -32]  // Punto de anclaje del popup [ancho/2, -alto]
    });

    // Crea un nuevo marcador con el icono personalizado en la ubicación del clic
    this.marker = L.marker(latlng, { icon: customIcon }).addTo(this.map as L.Map);
  }
}
