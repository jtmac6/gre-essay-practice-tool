import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CountdownComponent } from 'ngx-countdown';
import wordsCount from 'words-count';
import * as argumentData from '../../assets/argument-pool.json';
import * as issueData from '../../assets/issue-pool.json';

@Component({
  selector: 'app-prompt-picker',
  templateUrl: './prompt-picker.component.html',
  styleUrls: ['./prompt-picker.component.scss']
})
export class PromptPickerComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('template') template: TemplateRef<any>;
  modalRef?: BsModalRef;


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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: BsModalService
  ){}

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

    if(event.action ==="done") {
      this.openModal(this.template)

    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.countdown.pause();
    this.wordsCount = wordsCount(this.response.value);
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

  clear() {
    this.response.setValue('');
  }

  continueWriting(): void {
    this.modalRef?.hide();
    this.countdown.resume();
  }

}
