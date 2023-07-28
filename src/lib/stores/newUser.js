import { writable } from 'svelte/store';
import newUserViewModel from '$view-models/newUser';

export const newUser = writable(newUserViewModel)


