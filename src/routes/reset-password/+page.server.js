import { error, invalid, redirect } from "@sveltejs/kit";
import { validateData } from "$lib/utils";
import { updateEmailSchema } from "$lib/schemas";

export const actions = {
	resetPassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			updateEmailSchema,
		);

		if (errors) {
			return invalid(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.log("Error: ", err);
			throw error(err.status, err.message);
		}
	},
	// resetPassword: async ({ request, locals }) => {
	// 	const body = Object.fromEntries(await request.formData());

	// 	try {
	// 		await locals.pb.collection('users').requestPasswordReset(body.email);
	// 		return {
	// 			success: true
	// 		};
	// 	} catch (err) {
	// 		console.log('Error: ', err);
	// 		throw error(500, 'Something went wrong');
	// 	}
	// }
};
