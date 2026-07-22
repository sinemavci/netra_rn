export type ObserverCallback<T> = (response: T) => void;

/**
 * Listener for observing changes.
 */
export class ObserverListener<T> {
  id: string;
  callback: ObserverCallback<T>;

  /**
   * The ObserverListener class is a simple utility designed to store an observer's unique identifier (id) and a callback function (callback).
   * @param id - A unique identifier for the observer.
   * @param callback - A function that will be executed when an event occurs.
   */
  constructor(id: string, callback: ObserverCallback<T>) {
    this.id = id;
    this.callback = callback;
  }
}
