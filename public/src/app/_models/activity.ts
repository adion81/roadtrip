import { Danger } from './danger';

export interface Activity {
    title: string,
    message: string,
    dangers: Danger[]
}
