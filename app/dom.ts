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
export interface ElementModifier {
  classes?: string[];
  attributes?: Record<string, string>;
}

export function createElement(
  name: string,
  attrs?: Record<string, string>
): HTMLElement {
  console.log('create');
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  }
  return el;
}

export function applyElementModifier(
  element: Element,
  modifier: ElementModifier
): void {
  if (modifier.classes) {
    addElementClasses(element, modifier.classes);
  }
  if (modifier.attributes) {
    addElementAttributes(element, modifier.attributes);
  }
}

export function addElementClasses(element: Element, classes: string[]): void {
  for (const className of classes) {
    element.classList.add(className);
  }
}

export function addElementAttributes(
  element: Element,
  attributes: Record<string, string>
): void {
  for (const key of Object.keys(attributes)) {
    element.setAttribute(key, attributes[key]);
  }
}
