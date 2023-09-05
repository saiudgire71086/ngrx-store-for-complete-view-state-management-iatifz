import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
/**
 * Import the root state in order to select parts of it.
 */
import * as fromRoot from './store/index';
/*
 * Import the layout actions to make dispatching from the component possible.
 */
import * as layout from './store/layout/layout.actions';

import * as games from './store/games/games.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  /*
   Add this to your AppComponent to listen for window resize events
   */
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class AppComponent implements OnInit {
  public openedModalName$: Observable<any>;
  public games$: Observable<any>;
  public gamesCount$: Observable<number>;
  public gamesPage$: Observable<number>;
  public gamesLoading$: Observable<boolean>;
  public alerts$: Observable<any>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.openedModalName$ = store.select(fromRoot.getLayoutOpenedModalName);
    this.games$ = store.select(fromRoot.getGamesEntities);
    this.gamesCount$ = store.select(fromRoot.getGamesCount);
    this.gamesPage$ = store.select(fromRoot.getGamesPage);
    this.gamesLoading$ = store.select(fromRoot.getGamesLoadingState);
    this.alerts$ = store.select(fromRoot.getLayoutAlertsState);
  }

  ngOnInit() {
    this.store.dispatch(new games.LoadGamesAction(1));
  }

  handleOpenModal(modalName: string) {
    this.store.dispatch(new layout.OpenModalAction(modalName));
  }

  handleCloseModal() {
    this.store.dispatch(new layout.CloseModalAction());
  }

  onGamesPageChanged(page: number) {
    this.store.dispatch(new games.LoadGamesAction(page));
  }

  onWindowResize(event) {
    this.store.dispatch(
      new layout.ResizeWndowAction({
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      })
    );
  }

  addAlert(alert) {
    this.store.dispatch(new layout.AddAlertAction(alert));
  }

  onCloseAlert(alert: Object) {
    this.store.dispatch(new layout.RemoveAlertAction(alert));
  }
}
