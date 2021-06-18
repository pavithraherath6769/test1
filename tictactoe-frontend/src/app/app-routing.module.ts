import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { LobbyComponent } from './lobby/lobby.component'
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'board', component: BoardComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
