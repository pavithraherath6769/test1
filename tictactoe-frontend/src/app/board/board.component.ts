import { GameService } from '../game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  private routerEvents: Subscription

  constructor(public game: GameService, private router: Router) {}

  ngOnInit() {
    this.routerEvents = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart && e.url === '/lobby') this.game.leaveGame()
    })
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe()
  }

  public leaveGame(): void {
    this.router.navigateByUrl('/lobby')
  }
}
