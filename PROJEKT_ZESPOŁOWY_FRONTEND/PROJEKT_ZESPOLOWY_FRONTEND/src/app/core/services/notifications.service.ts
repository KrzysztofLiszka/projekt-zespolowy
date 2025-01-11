import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ErrorSnackbarComponent } from '../shared/components/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from '../shared/components/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnDestroy {
  private queue: MatSnackBarConfig[] = [];
  private destroy$ = new Subject();
  private exceptionTypeSubject = new Subject<string>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getExceptionType$(): Observable<string> {
    return this.exceptionTypeSubject.asObservable();
  }

  showTypicalSuccessNotification(): void {
    const message = "Operacja przebiegła pomyślnie!";
    this.showSnackbarWithSpecificConfig(this.getSuccessTypeConfig(message));
  }

  showTypicalErrorNotification(): void {
    const message = "Wystąpił błąd!";
    this.showSnackbarWithSpecificConfig(this.getErrorTypeConfig(message));
  }

  showCustomSuccessNotification(message: string): void {
    const isMessageInQueue = this.queue.some(item => item.data?.message === message);

    if (!isMessageInQueue) {
      this.showSnackbarWithSpecificConfig(this.getSuccessTypeConfig(message));
    }
  }

  showCustomErrorNotification(message: string, exceptionType: string | null = null): void {
    const isMessageInQueue = this.queue.some(item => item.data?.message === message);

    if (!isMessageInQueue) {
      this.showSnackbarWithSpecificConfig(this.getErrorTypeConfig(message));
    }

    if (exceptionType) {
      this.exceptionTypeSubject.next(exceptionType);
    }
  }

  private getGenericConfig(): MatSnackBarConfig {
    var config = new MatSnackBarConfig();
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';
    config.duration = 3000;
    return config;
  }

  private getErrorTypeConfig(message: string): MatSnackBarConfig {
    var config = this.getGenericConfig();
    config.data = { message: message, type: "ERROR" };
    config.panelClass = ['snackbar', "ERROR"];
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    return config;
  }

  private getSuccessTypeConfig(message: string): MatSnackBarConfig {
    var config = this.getGenericConfig();
    config.data = { message: message, type: "SUCCESS" };
    config.panelClass = ['snackbar', "SUCCESS"];
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    return config;
  }

  private showSnackbarWithSpecificConfig(config: MatSnackBarConfig): void {
    this.enqueueNotification(config);
  }

  private enqueueNotification(config: MatSnackBarConfig) {
    this.queue.push(config);

    if (this.queue.length === 1) {
      this.displayNextNotification();
    }
  }

  private displayNextNotification() {
    if (this.queue.length === 0) {
      return;
    }

    const config = this.queue[0];
    const component = config.data?.type === 'ERROR' ? ErrorSnackbarComponent : SuccessSnackbarComponent;
    const snackBarRef = this.snackBar.openFromComponent(component, config);

    snackBarRef.afterDismissed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.queue.shift();
      this.displayNextNotification();
    });
  }
}
