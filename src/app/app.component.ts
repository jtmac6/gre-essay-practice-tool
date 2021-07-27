import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as argumentData from '../assets/argument-pool.json';
import * as issueData from '../assets/issue-pool.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  counter$: Observable<number> | undefined;
  count = 60;

  promptType = "issue";

  issueTopics = issueData as Array<any>;
  argumentTopics = argumentData as Array<any>;

  instructions: string = '';
  prompt: string = '';

  ngOnInit(): void {

    this.updateTopic();

  }

  updateTopic(): void {

    if (this.promptType === 'issue'){

      console.log("choosing an issue topic");
      let randomIssueTopic = this.issueTopics[Math.floor(Math.random()*this.issueTopics.length)];

      this.instructions = randomIssueTopic.instructions;
      this.prompt = randomIssueTopic.prompt;

    }else {

      console.log("choosing an arg topic");
      let randomArgumentTopic = this.argumentTopics[Math.floor(Math.random()*this.argumentTopics.length)];

      this.instructions = randomArgumentTopic.instructions;
      this.prompt = randomArgumentTopic.prompt;

    }

    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );


  }

}
