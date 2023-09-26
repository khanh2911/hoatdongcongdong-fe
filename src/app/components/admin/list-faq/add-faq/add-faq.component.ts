import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lecturer: any;
    },
    private dialogRef: MatDialogRef<AddFaqComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cauHoiService: CauHoiService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    cauHoi: ['', Validators.required],
    traLoi: ['', Validators.required],

  });

  savelecturer() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.cauHoiService.createCauHoi(formData).subscribe({
        next: data=>{
          console.log(data)
          if(data.message && data.message === 'cauhoi-exist'){
            this.toastr.warning("Từ khóa đã tồn tại!");
          }else{
            this.closePopup();
            this.toastr.success("Thêm câu hỏi thành công!");
          }

        },
        error: err=>{
          this.toastr.error("Thêm câu hỏi không thành công!");
          console.log(err)
        }
      } );
    }
  }
}
