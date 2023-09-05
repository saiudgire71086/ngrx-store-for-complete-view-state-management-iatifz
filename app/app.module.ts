import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import {JsonpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {StoreModule} from "@ngrx/store";
import {metaReducer} from "./store/index";
import {EffectsModule} from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {GameEffects} from "./store/games/games.effects";
import {GamesService} from "./store/games/games.service";

import {TemplateModalComponent} from "./components/template-modal.component";
import {SidebarWatchDirective} from "./directives/sidebar-watch.directive";
import {LeftSidebarComponent} from "./components/left-sidebar.component";
import {SidebarToggleDirective} from "./directives/sidebar-toggle.directive";
import {RightSidebarComponent} from "./components/right-sidebar.component";

import { AppComponent } from './app.component';
import {GamesListComponent} from "./components/games-list.component";
import {AlertsListComponent} from "./components/alerts-list.component";

import { HelloComponent } from './hello.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    JsonpModule,   
     /*
      Provide the application reducer to the store.
     */    
    StoreModule.forRoot(metaReducer),
    /*
      Run effects
     */
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  declarations: [  
    AppComponent,
    SidebarWatchDirective,
    SidebarToggleDirective,
    TemplateModalComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    GamesListComponent,
    AlertsListComponent 
  ],
  providers: [GamesService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
