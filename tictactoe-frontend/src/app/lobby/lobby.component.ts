import { GameService } from '../game.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
  private routerEvents: Subscription

  constructor(public game: GameService, private router: Router) {}

  ngOnInit() {
    this.routerEvents = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart && e.url === '/') this.game.leaveLobby()
    })
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe()
  }
}
