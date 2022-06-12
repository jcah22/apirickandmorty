import { Component } from '@angular/core';
import { PersonajeService } from './personaje.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  arrPersonajes: any[];

  currentPage: number;
  numpages: number;

  constructor(private personajesService: PersonajeService) {
    this.currentPage = 1;
  }

  ngOnInit() {
    this.personajesService
      .getAll()
      .then((response: any) => {
        this.arrPersonajes = response['results'];
        this.numpages = response['info']['pages'];
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async chagePage(siguiente: any) {
    if (siguiente) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    const reponse = await this.personajesService.getAll(this.currentPage);
    this.arrPersonajes = reponse['results'];
  }
}
