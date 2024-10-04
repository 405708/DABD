import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatchInfoComponent } from '../match-info/match-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Match } from '../models/match';
import { MatchFormComponent } from '../match-form/match-form.component';
import { MatchService } from '../services/match.service';
import { VisualizerService } from '../services/visualizer.service';
import { Configuration } from '../models/configuration';
import { MatchSelectorComponent } from "../match-selector/match-selector.component";
import { MatchApiService } from '../services/match-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matches-view',
  standalone: true,
  imports: [MatchInfoComponent
    // , NgIf, NgFor
    ,
    CommonModule,
    FormsModule,
    MatchFormComponent, MatchSelectorComponent],
  providers: [VisualizerService],
  templateUrl: './matches-view.component.html',
  styleUrl: './matches-view.component.css'
})
export class MatchesViewComponent
  implements OnInit , OnDestroy{
  matches: Match[] = [];
  matchSelected?: Match;
  myDate: Date = new Date();
  config?: Configuration;
  //Lista de subscripciones para poder desubscribirse
  subscriptions = new Subscription();

  // private matchService: MatchService = inject(MatchService);
  private readonly matchApi : MatchApiService = inject(MatchApiService);

  constructor(private matchService: MatchService,
    private visualizerService: VisualizerService
  ) {}

  ngOnInit(): void {
    this.loadMatches();
    this.config = this.visualizerService.getConfiguration();
  }

  loadMatches() {
    const getAllSubscription = this.matchApi.getAll().subscribe({
      next: (matchList: Match[])=>
        this.matches = matchList
    }
    );
    //Sumas la sub
    this.subscriptions.add(getAllSubscription)
  }

  onSelected(selectedIndex: number) {
    this.matchSelected = this.matches[selectedIndex];
  }

  onDeleteLastItem() {
    this.matchService.deleteLast();
    this.loadMatches();
  }

  onNew() {
    this.visualizerService.toggleShowForm();
  }

  onDeleted() {
    this.loadMatches();
  }

  ngOnDestroy(): void {
    //Cuando se cierre me saco todas las subs
    this.subscriptions.unsubscribe()
  }
}
