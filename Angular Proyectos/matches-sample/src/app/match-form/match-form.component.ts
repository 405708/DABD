import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { Match } from '../models/match';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatchService } from '../services/match.service';
import { VisualizerService } from '../services/visualizer.service';
import { MatchApiService } from '../services/match-api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [FormsModule, DatePipe, ReactiveFormsModule, JsonPipe], // Add ReactiveFormsModule
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.css'
})
export class MatchFormComponent implements OnDestroy {

  today = new Date();
  @Output() onSave = new EventEmitter();
  subscription = new Subscription();

  //Reactive form setup
  form = new FormGroup({
    local: new FormControl('', [Validators.required]),
    visitor: new FormControl('', [Validators.required]),
    localScore: new FormControl(0, [Validators.required, Validators.min(0)]),
    visitorScore: new FormControl(0, [Validators.required, Validators.min(4)]),
    date: new FormControl(this.today, Validators.required),
    events: new FormArray([]) // USO DE FORM ARRAY
  });

  private matchService = inject(MatchService);
  private visualizerService = inject(VisualizerService);
  private readonly matchApiService = inject(MatchApiService);
  private readonly router = inject(Router);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Uso de FormArray

  get events() {
    return this.form.get('events') as FormArray;
  }
  onNewEvent() {
    const events = this.form.get('events') as FormArray;
    const eventForm = new FormGroup({
      minute: new FormControl('', [Validators.required, Validators.min(0), Validators.max(90)]),
      seconds: new FormControl('', [Validators.required, Validators.min(0), Validators.max(59)]),
      description: new FormControl('', [Validators.required])
    })
    events.push(eventForm);
  }

  onDeleteEvent(index: number) {
    this.events.removeAt(index);
  }

  save() {
    if (this.form.invalid) {
      alert("Formulario invalido");
      console.log(this.form)
      return;
    }

    //Para el post con el service
    const match = this.form.value as Match;
  
    const addSubscription = this.matchApiService.add(match).subscribe({
      next: () => {
        this.router.navigate(['list']);
      },
      error: (err) => {
        alert('Error al comunicarse con la API')
      }
    });
    this.subscription.add(addSubscription);
  }
}
