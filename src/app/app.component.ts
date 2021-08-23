import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import * as argumentData from '../assets/argument-pool.json';
import * as issueData from '../assets/issue-pool.json';
import wordsCount from 'words-count';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  response = new FormControl('');
  wordsCount = 0;

  paused = false;
  displayTopic = false;
  remainingTime: string;

  promptType = "issue";

  issueTopics = issueData as Array<any>;
  argumentTopics = argumentData as Array<any>;

  instructions: string = '';
  prompt: string = '';

  ngOnInit(): void {

  }

  updateTopic(): void {

    if (this.promptType === 'issue'){

      let randomIssueTopic = this.issueTopics[Math.floor(Math.random()*this.issueTopics.length)];
      this.instructions = randomIssueTopic.instructions;
      this.prompt = randomIssueTopic.prompt;

    }else {

      let randomArgumentTopic = this.argumentTopics[Math.floor(Math.random()*this.argumentTopics.length)];
      this.instructions = randomArgumentTopic.instructions;
      this.prompt = randomArgumentTopic.prompt;

    }

    this.displayTopic = true;
    if(this.countdown){
      this.countdown.restart();
    }

  }

  restartTimer(): void {
    this.countdown.restart();
  }

  toggleTimer(): void {

    if(this.paused){
      this.countdown.resume();
    }else{
      this.countdown.pause();
    }
    this.paused = !this.paused
  }

  handleEvent(event: any): void{
    this.remainingTime = event.text;
  }

  downloadEssay():void {
    let blob = new Blob([this.response.value], {type: 'text/plain'});
    let filename = "essay.txt";
    saveAs(blob, filename);
  }

  finishWriting():void {

    this.countdown.pause();
    this.wordsCount = wordsCount(this.response.value);

  }

}
