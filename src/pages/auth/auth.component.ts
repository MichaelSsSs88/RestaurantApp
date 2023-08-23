import { AuthenticationService } from './../../services/authentication.service';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription, interval, timeout } from 'rxjs';
import { AlertComponent } from 'src/components/alert/alert.component';
import { PlaceholderDirective } from 'src/directives/placeholder.directive';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterContentChecked, OnInit, AfterViewInit, OnDestroy {
  isLogin: boolean = false;
  isVisible: boolean = true;
  class_register = 'px-2 text-right text-white';
  class_login = 'px-2 text-left text-gray-400';
  class_status = "bg-gradient-to-r from-slate-600 to-color-primary-2 xl:w-1/4 lg:w-1/4 md:w-2/4 sm:w-3/4 xs:w-3/4 h-auto m-auto my-28 py-4 rounded-md shadow-2xl shadow-color-primary-1";
  mobnumPattern = "^((\\+506-?)|0)?[0-9]{8}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";//x2z@dG1//(?=.*\d)
  passwordPattern = "^(?=.*\!)(?=.*\&)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  formIsOK = false;
  messageOpen = false;
  formData: FormGroup;
  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
  closeSubscriptor:Subscription;

  reloadForm = () => new FormGroup({
    name: new FormControl('', [Validators.required, this.nameValitator]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.mobnumPattern)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
  });

  statusSubscriptio: Subscription = new Subscription();
  userSubscription:Subscription= new Subscription();
  status = false;

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private authentication: AuthenticationService, private router: Router, private componentFactoryResolver:ComponentFactoryResolver) {
    this.statusSubscriptio = authService.authenticated.subscribe(auth => {
      this.status = auth;
    });
    this.userSubscription=this.authentication.userT.subscribe(user => {

      if (user!=null) {
          this.router.navigate(['home']);
      }
    });
    this.formData = this.reloadForm();
  }
  ngOnInit(): void {
   // this.authentication.autoSingUp();
  // this.authentication.autoSingUp();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      //console.log('Cerrado')
      this.isVisible = false;
      //
     // this.authentication.autoSingUp();

    }, 1000);
  }
  ngOnDestroy(): void {
    if(this.closeSubscriptor){
      this.closeSubscriptor.unsubscribe();
    }

  }

  ngMessageClose(messageState:boolean){
    this.messageOpen=messageState;
    console.log(this.messageOpen);
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.cd.detectChanges();
  }

  nameValitator(control: AbstractControl): string[] {
    let error: string[] = new Array();
    if (control.value == '' && control.touched) {
      error.push("Please type the name");
    }
    if (control.value != '' && control.value.length < 10) {
      error.push("Name has to be at least 10 characters long.");
    }
    return error;
  }

  displayErros(controlName: string): string[] {
    const value = this.formData.get(controlName);
    let errors: string[] = new Array();

    value.touched && value.errors && Object.values(value.errors).forEach(error => {
      !error.requiredPattern && error != true && errors.push(error);
    })
    value.touched && value.errors && controlName === "phone" && errors.push("It must be a valid phone number. Format: +506-88888888")
    value.touched && value.errors && controlName === "email" && errors.push("It must be a valid email address")
    value.touched && value.errors && controlName === "password" && errors.push("It must be a valid password")
    //console.log(this.formData.value.password);
    //console.log(value.errors);

    //console.log(this.formData.value.confirmPassword);
    //console.log((value.errors!=null || this.formData.value.password != this.formData.value.confirmPassword));


    value.touched && controlName === "confirmPassword" && (this.formData.value.password != this.formData.value.confirmPassword) && errors.push("The password confirmation must match the password")
    return errors;
  }



  statusChanged() {
    this.formData = this.reloadForm();
    !this.isLogin ?
      (this.class_register = 'px-2 text-right text-gray-400',
        this.class_login = 'px-2 text-left text-white'
      ) :
      (this.class_register = 'px-2 text-right text-white',
        this.class_login = 'px-2 text-left text-gray-400'
      );
    //this.isLogin=this.isLogin;

  }

  authProcess() {
    //alert(this.formData.valid)
    //if (!this.formData.valid) return;
    this.authentication
      .signUp(this.formData.value.email, this.formData.value.password,this.isLogin?"login":"register")
      .subscribe({
        next: (data) => {
          this.formData = this.reloadForm();
          this.authService.loggin();
          this.router.navigate(['home']);
        }, error: (errorMessage) => {
          console.log(errorMessage.message);
          this.class_status = "bg-gradient-to-r from-slate-600 to-color-primary-2 xl:w-1/4 lg:w-1/4 md:w-2/4 sm:w-3/4 xs:w-3/4 h-auto m-auto my-28 py-4 rounded-md shadow-2xl shadow-color-primary-1 blur-3xl";
          this.showErrorAlert("The username and the password does not match");
          //this.messageOpen= true;
          // Swal.fire({
          //   title: 'Error!',
          //   text: errorMessage,
          //   icon: 'error',
          //   confirmButtonText: 'Cool'
          // })

        }, complete: () => {
          console.log("sadasd");
        }
      });
  }

  showErrorAlert(errorMessage:string){
    const alertViewRef=this.alertHost.viewContainerRef;
    alertViewRef.clear();
    const alertComponentRef=alertViewRef.createComponent(AlertComponent);
    alertComponentRef.instance.message=errorMessage;
    this.closeSubscriptor=alertComponentRef.instance.closeClick.subscribe(() => {
        this.closeSubscriptor.unsubscribe();
        alertViewRef.clear();
        this.class_status = "bg-gradient-to-r from-slate-600 to-color-primary-2 xl:w-1/4 lg:w-1/4 md:w-2/4 sm:w-3/4 xs:w-3/4 h-auto m-auto my-28 py-4 rounded-md shadow-2xl shadow-color-primary-1";
    });

    //alertComponentRef.instance.
  }

}
