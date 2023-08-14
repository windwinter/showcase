import { error, invalid, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateData } from '$lib/utils';

export const actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return invalid(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		let username = generateUsername(formData.name.split(' ').join('')).toLowerCase();
		let role = "tech"
		try {
			await locals.pb.collection('users').create({ username, ...formData, role});
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};
