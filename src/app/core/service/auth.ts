import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRegistration } from '../models/user.models';
import { Storage } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor (private Storage: Storage) {
    const savedUser = this.Storage.getItem<User>(this.CURRENT_USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private readonly CURRENT_USER_KEY = 'currenUser';
  private readonly USERS_KEY = 'users';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$ : Observable<User | null>;

  /**
   * Obtiene el valor actual del usuario autenticado
   */

  get CurrentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  /**
   * Registrar nuevo usuario
   * @param userData
   * @returns
   */

  register(userData: UserRegistration): User | null{
    const users = this.getAllUsers();

    const userExists = users.some(
      u => u.username === userData.username || u.email === userData.email
    );

    if(userExists){
      console.error('El usuario o email ya existe');
      return null;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      fullname: userData.fullname,
      avatar: '',
      followers: [],
      following: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    this.Storage.setItem(this.USERS_KEY, users);

    const userWithoutPassword = {...newUser};
    delete userWithoutPassword.password;

    this.Storage.setItem(this.CURRENT_USER_KEY, userWithoutPassword);
    this.currentUserSubject.next(userWithoutPassword);

    return userWithoutPassword;
  }

  /**
   * @param username
   * @param password
   * @returns
   */

  login(username: string, password: string): User | null{
    const users = this.getAllUsers();

    const user = users.find(
      u=> u.username === username && u.password === password
    );
    if(user){
      const userWithoutPassword = {...user};
      delete userWithoutPassword.password;

      this.Storage.setItem(this.CURRENT_USER_KEY, userWithoutPassword);
      this.currentUserSubject.next(userWithoutPassword);

      return userWithoutPassword;
    }
    return null;
  }

  /**
   * Cierre la sesion del usuario actual
   */

  logout(): void{
    this.Storage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene los users
   * @return
   */
  isAuthenticated(): boolean {
    return this.CurrentUserValue !== null;
  }

  private getAllUsers(): User[]{
    return this.Storage.getItem<User[]>(this.USERS_KEY) || [];
  }
}
