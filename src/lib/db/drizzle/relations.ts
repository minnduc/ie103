import { relations } from "drizzle-orm/relations";
import { driver, vehicle, users, payment, pickupRequests, submissions, submissionsWastetypes, wasteTypes } from "./schema";

export const vehicleRelations = relations(vehicle, ({one}) => ({
	driver: one(driver, {
		fields: [vehicle.driverId],
		references: [driver.driverId]
	}),
}));

export const driverRelations = relations(driver, ({one, many}) => ({
	vehicles: many(vehicle),
	user: one(users, {
		fields: [driver.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	drivers: many(driver),
	payments: many(payment),
	submissions: many(submissions),
	pickupRequests: many(pickupRequests),
}));

export const paymentRelations = relations(payment, ({one}) => ({
	user: one(users, {
		fields: [payment.userId],
		references: [users.id]
	}),
	pickupRequest: one(pickupRequests, {
		fields: [payment.requestId],
		references: [pickupRequests.requestId]
	}),
}));

export const pickupRequestsRelations = relations(pickupRequests, ({one, many}) => ({
	payments: many(payment),
	user: one(users, {
		fields: [pickupRequests.userId],
		references: [users.id]
	}),
}));

export const submissionsRelations = relations(submissions, ({one, many}) => ({
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	}),
	submissionsWastetypes: many(submissionsWastetypes),
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