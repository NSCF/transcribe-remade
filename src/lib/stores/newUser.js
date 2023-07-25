import { writable } from 'svelte/store';
import newUserViewModel from '$lib/view-models/newUser';

export const newUser = writable(newUserViewModel)


