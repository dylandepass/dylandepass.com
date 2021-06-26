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

import './style.scss';

function createTemplate(
  title: string,
  subtitle: string,
  backgroundImage: string
): string {
  return `
    <section class="hero hero-background is-halfheight" style="background-image: url(${backgroundImage})">
      <div class="hero-body">
        <div class="">
          <h1 class='has-text-white'>${title}</h1>
          <h3 class='has-text-white'>${subtitle}</h3>
        </div>
      </div>
    </section>
  `;
}

export function decorate(block: Element, parent: Element): Element {
  const title = block.querySelector('h1')?.innerHTML;
  const subtitle = block.querySelector('h3')?.innerHTML;
  const image = block
    .querySelector('img')
    ?.attributes.getNamedItem('src')?.value;
  console.log(image);
  let temp = createTemplate(title || '', subtitle || '', image || '');
  const template = document.createElement('template');
  temp = temp.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = temp;
  if (template.content.firstChild) {
    parent.insertBefore(template.content.firstChild, parent.firstChild);
  }
  //  parent.appendChild(template.content.firstChild!);
  parent.removeChild(block);
  return template;
}
