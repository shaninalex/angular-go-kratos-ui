import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {GenericError} from '@ory/kratos-client';

export function withGenericErrorHandling<T>(
    handlers: Record<string, (err?: any) => void> = {}
) {
    return (source: Observable<T>): Observable<T> =>
        source.pipe(
            catchError((err: any) => {
                const maybeError = err?.error?.error as GenericError | undefined;
                if (maybeError?.id) {
                    const handler = handlers[maybeError.id];
                    if (handler) {
                        handler(err); // pass error to handler
                    }
                }
                return EMPTY; // completes without emitting
            })
        );
}
