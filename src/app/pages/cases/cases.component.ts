import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cases',
  standalone: true,
  templateUrl: './cases.component.html'
})
export class CasesComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const revealEls = this.el.nativeElement.querySelectorAll('.reveal');

    if (typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((node) => node.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((node) => observer.observe(node));
  }
}
