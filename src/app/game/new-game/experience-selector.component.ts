import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-experience-selector',
  template: `
    <select [(ngModel)]="experience">
      <option [ngValue]="e" *ngFor="let e of  experiences">{{e}}</option>
    </select>
  `,
  styles: []
})
export class ExperienceSelectorComponent implements OnInit {

  private _experience!: Experience
  get experience(): Experience {
    return this._experience;
  }

  @Input() set experience(value: Experience) {
    this._experience = value;
    this.experienceChange.emit(value)
  }

  @Output() experienceChange = new EventEmitter<Experience>()

  experiences: Experience[] = [
    Experience.NOVICE,
    Experience.BEGINNER,
    Experience.INTERMEDIATE,
    Experience.ADVANCED,
    Experience.EXPERT
  ]

  ngOnInit(): void {
  }

}

export enum Experience {
  NOVICE = "Novice",
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  EXPERT = "Expert"
}
