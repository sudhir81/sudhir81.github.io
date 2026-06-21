import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <div class="container footer">
      <p>© 2026 TerraForge Cloud • <a href="https://www.terraforgecloud.com" target="_blank">terraforgecloud.com</a></p>
    </div>
  `
})
export class FooterComponent {}
