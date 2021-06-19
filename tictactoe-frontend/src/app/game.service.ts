import { Injectable } from '@angular/core'
import { webSocket } from 'rxjs/webSocket'
import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

interface Message {
  type: string
  message?: any
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public ws = webSocket({
    url: environment.wsUrl,
    protocol: environment.wsProtocol
  })
  public userName: string
  public users: string[] = []
  public games: Array<any> = []
  public board: Array<string | number>
  public locked: boolean = false;
  public ai: boolean = false
  public status: string = ''
  public player: string
  public spectator: boolean
  public computerScore: number;
  public humanScore: number;
  public turn = '';
  

  constructor(private http: HttpClient, private router: Router) {
    this.ws.subscribe(
      (message: Message) => this.handleMessage(message),
      err => console.log(err),
      () => console.log('complete')
    )
  }

  private handleMessage(message: Message): void {
    let { message: msg } = message
    switch (message.type) {
      case 'users':
        this.users = msg
        break
 
      case 'leaveGame':
        this.status = 'Your opponent has left the game!'
        break

      case 'turn':
        this.board = msg.board
        if (msg.winner) {
          console.log(message,'asdasdas')
          if (msg.winner == this.player) {
            
          console.log(msg.winner,'asdasdas')
            this.status = 'You won!'
          } else if (msg.winner == 'Tie') {
            this.status = 'Tie!'
          } else {
            this.status = 'You lost!'
          }
        } else {
          this.locked = msg.next !== this.player
        }
        break
      default:
        break
    }
  }

  public login(name: string): Promise<{ success: boolean }> {
    return this.http
      .post<{ success: boolean }>(environment.apiUrl + '/login', { name })
      .toPromise()
  }

  public enterLobby(name: string): void {
    this.userName = name
    this.ws.next({ type: 'enterLobby', name })
  }

  public leaveLobby() {
    this.ws.next({ type: 'leaveLobby' })
  }

  public leaveGame(): void {
    this.ws.next({ type: 'leaveGame', name: this.userName })
  }

  public getCell(index: number): string | number {
    return typeof this.board[index] === 'number' ? '' : this.board[index]
  }

  public turnClick(e): void {
    if (this.locked) return
    let { id } = e.target
    if (typeof this.board[id] == 'number') {
      this.board[id] = this.player
      this.locked = true
      if (this.ai) {
        this.ws.next({ type: 'AITurn', board: this.board })
      } 
      
    }
  }

  public startAIGame(): void {
    this.player = 'O'
    this.board = Array.from(Array(9).keys())
    this.status = ''
    this.locked = false;
    this.ai = true
    this.router.navigateByUrl('/board')
    this.ws.next({ type: 'startAI' });
    this.randomNumber(1); // start the game at random
  }

  //play aifirst
  aifn2() { 
    this.locked = true;
    this.turn ='AI first Move'
    this.ws.next({ type: 'AITurn', board: this.board }); 
    console.log('AI first');
  } 

   //play humanfirst
   humanfn1() { 
    
    this.locked = false
    this.turn ='Player first Move'
    console.log('Player first');
  }
  randomNumber(n) { 
    let cfd =  Math.floor(Math.random() * (n + 1));
    console.log('number',cfd ); 
    if(cfd == 1 ){
      this.humanfn1();
    }else{
      this.aifn2();
    }
    
    
  } 
   
   
}
