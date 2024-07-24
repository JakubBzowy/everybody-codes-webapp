import { Routes } from '@angular/router';
import { CameraViewComponent } from './modules/camera-view/camera-view.component';

export const routes: Routes = [
    {path: '', component: CameraViewComponent},
    { path: '**',redirectTo:''}
];
