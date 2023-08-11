import { error } from '@sveltejs/kit';
import db from '../../../db'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.slug) {

        const projectID = params.slug
        let project
        let projectBatches

        console.log('project id:', projectID)

        try {
            project = await db.projects.get(projectID)
        }
        catch(err) {
            throw error(404, {
                message: `project record not found: ${err.message}`
            });
        }

        try {
            projectBatches = await db.projectBatches.search({projectID})
        }
        catch(err) {
            throw error(404, {
                message: `project batches not found: ${err.message}`
            });
        }

        if(project && projectBatches.length){

            return {
                project, 
                projectBatches
            }
        }
    }

    throw error(404, {
        message: 'Not found'
    });
}