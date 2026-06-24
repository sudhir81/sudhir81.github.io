import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './leadership.component.html'
})
export class LeadershipComponent implements AfterViewInit {
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
