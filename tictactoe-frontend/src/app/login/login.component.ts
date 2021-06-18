import { GameService } from '../game.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public name: string = ''
  public error: string = ''

  constructor(private game: GameService, private router: Router) {}

  public async login() {
    if (!this.name) return
    let { success } = await this.game.login(this.name)

    if (success) {
      this.game.enterLobby(this.name)
      this.router.navigateByUrl('/lobby')
    } else {
      this.error = 'Username already in use!'
    }
  }
}
