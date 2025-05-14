import { relations } from "drizzle-orm/relations";
import { users, submissions, pickupRequests, submissionsWastetypes, wasteTypes } from "./schema";

export const submissionsRelations = relations(submissions, ({one, many}) => ({
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	}),
	pickupRequests: many(pickupRequests),
	submissionsWastetypes: many(submissionsWastetypes),
}));

export const usersRelations = relations(users, ({many}) => ({
	submissions: many(submissions),
	pickupRequests: many(pickupRequests),
}));

export const pickupRequestsRelations = relations(pickupRequests, ({one}) => ({
	user: one(users, {
		fields: [pickupRequests.userId],
		references: [users.id]
	}),
	submission: one(submissions, {
		fields: [pickupRequests.submissionId],
		references: [submissions.submissionId]
	}),
}));

export const submissionsWastetypesRelations = relations(submissionsWastetypes, ({one}) => ({
	submission: one(submissions, {
		fields: [submissionsWastetypes.submissionId],
		references: [submissions.submissionId]
	}),
	wasteType: one(wasteTypes, {
		fields: [submissionsWastetypes.wasteTypeId],
		references: [wasteTypes.wasteTypeId]
	}),
}));

export const wasteTypesRelations = relations(wasteTypes, ({many}) => ({
	submissionsWastetypes: many(submissionsWastetypes),
}));