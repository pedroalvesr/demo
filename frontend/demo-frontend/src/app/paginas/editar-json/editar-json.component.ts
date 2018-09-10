import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-editar-json',
  templateUrl: './editar-json.component.html',
  styleUrls: ['./editar-json.component.css']
})
export class EditarJsonComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    //this.editorOptions.language = 'pt-BR';
    this.editorOptions.statusBar = false;
    //this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
      
      this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
   }

  ngOnInit() {
  }

}
