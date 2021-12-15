import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Automovel } from "src/app/interfaces/automovel";

@Component({
    selector: 'dialog-automovel',
    templateUrl: 'dialog-automovel.component.html',
    styleUrls: ['dialog-automovel.component.css']
})
export class DialogAutomovelComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogAutomovelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Automovel,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}