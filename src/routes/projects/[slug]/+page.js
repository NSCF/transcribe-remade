import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    if (params.slug) {
        return {projectID: params.slug}
    }

    throw error(404, 'Not found');
}