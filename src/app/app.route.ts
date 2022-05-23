import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PromptPickerComponent } from "./prompt-picker/prompt-picker.component";

export const routes: Routes = [
  { path: 'prompt-picker', component: PromptPickerComponent },
  { path: '', redirectTo: '/prompt-picker', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
