import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Cliente } from "src/app/interfaces/cliente";

@Component({
    selector: 'dialog-cliente',
    templateUrl: 'dialog-cliente.component.html',
    styleUrls: ['dialog-cliente.component.css']
})
export class DialogClienteComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Cliente,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}