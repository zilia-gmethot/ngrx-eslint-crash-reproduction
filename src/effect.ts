import { Injectable, inject } from "@angular/core";
import { Actions, EffectNotification, ofType } from "@ngrx/effects";
import { Observable, exhaustMap, takeUntil } from "rxjs";

@Injectable()
export class Effects {
  private actions$ = inject(Actions);

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType("Login"),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(
            this.actions$.pipe(ofType("Logout"))
          )
        )
      )
    );
  }
}
