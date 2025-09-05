import {environment} from '@client/environments/environment.development';

export function makeLink(link: string): string {
    const url = new URL(link);
    if (environment.BASE_URL.includes(url.host)) {
        return url.pathname + url.search
    }
    return link
}
