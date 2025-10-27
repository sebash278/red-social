import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  constructor(){}
/**
 * Guarda un valor en el localStorage
 * @param key - la clave con la que se almacenará el valor
 * @param value - el valor a guardar (de cualquier tipo)
 */

  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error al guardar en Local Storage ", error);
    }
  }

/**
 * Obtener datos
 * @param key - la clave con la que se obtiene el valor
 */

  getItem<T>(key: string): T | null {
    try{
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch(error) {
      console.error("Error al leer el Local Storage: ", error);
      return null;
    }
  }

  /**
 * Eliminar un valor en el localStorage
 * @param key - la clave con la que se identifica el valor
 */

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
 * Limpiar todo el localStorage
 */

  clear(): void {
    localStorage.clear();
  }

/**
 * Verificar si existe una key en el localStorage
 * @param key - la clave con la que se identifica el valor
 * @returns
 */

hasItem(key: string): boolean {
  return localStorage.getItem(key) !== null;
}
}
