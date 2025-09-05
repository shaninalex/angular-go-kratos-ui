import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {GenericError} from '@ory/kratos-client';

export function withGenericErrorHandling<T>(
    handlers: Record<string, () => void> = {}
) {
    return (source: Observable<T>): Observable<T> =>
        source.pipe(
            catchError((err: any) => {
                const maybeError = err?.error?.error as GenericError | undefined;

                if (maybeError?.id) {
                    const handler = handlers[maybeError.id];
                    if (handler) {
                        handler();
                    }
                }

                return EMPTY;
            })
        );
}
