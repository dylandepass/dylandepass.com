/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

type ListenerCallback<T> = (value: T) => void;

export class Observable<T> {
  private _listeners: ListenerCallback<T>[] = [];
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  notify(): void {
    this._listeners.forEach((listener) => listener(this._value));
  }

  subscribe(listener: (value: T) => void): void {
    this._listeners.push(listener);
  }

  get value(): T {
    return this._value;
  }

  set value(val: T) {
    if (val !== this._value) {
      this._value = val;
      this.notify();
    }
  }
}
