import { pgTable, index, foreignKey, serial, uuid, text, timestamp, unique, check, integer, numeric, varchar, primaryKey, pgView, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const typeStatus = pgEnum("type_status", ['pending', 'scheduled', 'completed', 'failed'])
export const typeUsers = pgEnum("type_users", ['admin', 'user', 'staff'])


export const submissions = pgTable("submissions", {
	submissionId: serial("submission_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	wasteDescription: text("waste_description"),
	analysisResult: text("analysis_result"),
	recommendation: text(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updateAt: timestamp("update_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_submissions_user_id").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_submissions_users"
		}),
]);

export const wasteTypes = pgTable("waste_types", {
	wasteTypeId: serial("waste_type_id").primaryKey().notNull(),
	name: text(),
	description: text(),
	instruction: text(),
}, (table) => [
	index("idx_waste_types_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	unique("unique_waste_name").on(table.name),
	check("ck_wastename_length", sql`(name IS NOT NULL) AND (char_length(name) > 0)`),
]);

export const pickupRequests = pgTable("pickup_requests", {
	requestId: serial("request_id").primaryKey().notNull(),
	userId: uuid("user_id"),
	submissionId: integer("submission_id"),
	wasteDetails: text("waste_details"),
	weight: numeric({ precision: 10, scale:  2 }),
	scheduledTime: timestamp("scheduled_time", { mode: 'string' }),
	location: text(),
	requestAt: timestamp("request_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: typeStatus().default('pending').notNull(),
}, (table) => [
	index("idx_pickup_requests_submission_id").using("btree", table.submissionId.asc().nullsLast().op("int4_ops")),
	index("idx_pickup_requests_user_id").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_pickuprequests_users"
		}),
	foreignKey({
			columns: [table.submissionId],
			foreignColumns: [submissions.submissionId],
			name: "fk_pickuprequests_submissions"
		}),
	check("ck_weight", sql`weight >= (0)::numeric`),
	check("ck_scheduled_time", sql`scheduled_time > request_at`),
	check("ck_location", sql`(location IS NOT NULL) AND (char_length(location) > 0)`),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: typeUsers().notNull(),
	createAt: timestamp("create_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_users_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	unique("users_name_key").on(table.name),
	check("ck_username_length", sql`char_length((name)::text) > 0`),
	check("ck_password_hash_length", sql`char_length((password_hash)::text) >= 8`),
]);

export const submissionsWastetypes = pgTable("submissions_wastetypes", {
	submissionId: serial("submission_id").notNull(),
	wasteTypeId: serial("waste_type_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.submissionId],
			foreignColumns: [submissions.submissionId],
			name: "fk_swt_submissions"
		}),
	foreignKey({
			columns: [table.wasteTypeId],
			foreignColumns: [wasteTypes.wasteTypeId],
			name: "fk_swt_waste_types"
		}),
	primaryKey({ columns: [table.submissionId, table.wasteTypeId], name: "submissions_wastetypes_pkey"}),
]);
export const vwWasteTypesInfo = pgView("vw_waste_types_info", {	wasteTypeId: integer("waste_type_id"),
	name: text(),
	description: text(),
	instruction: text(),
}).as(sql`SELECT waste_types.waste_type_id, waste_types.name, waste_types.description, waste_types.instruction FROM waste_types ORDER BY waste_types.waste_type_id`);

export const vwPickupRequestsInfo = pgView("vw_pickup_requests_info", {	requestId: integer("request_id"),
	userId: uuid("user_id"),
	submissionId: integer("submission_id"),
	wasteDetails: text("waste_details"),
	weight: numeric({ precision: 10, scale:  2 }),
	scheduledTime: timestamp("scheduled_time", { mode: 'string' }),
	location: text(),
	requestAt: timestamp("request_at", { mode: 'string' }),
	status: typeStatus(),
}).as(sql`SELECT pickup_requests.request_id, pickup_requests.user_id, pickup_requests.submission_id, pickup_requests.waste_details, pickup_requests.weight, pickup_requests.scheduled_time, pickup_requests.location, pickup_requests.request_at, pickup_requests.status FROM pickup_requests ORDER BY pickup_requests.request_at DESC`);