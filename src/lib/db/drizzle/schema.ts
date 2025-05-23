import { pgTable, foreignKey, unique, serial, varchar, numeric, uuid, integer, text, index, timestamp, check, primaryKey, pgView, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const typeStatus = pgEnum("type_status", ['pending', 'scheduled', 'completed', 'failed'])
export const typeUsers = pgEnum("type_users", ['admin', 'user', 'staff'])


export const vehicle = pgTable("vehicle", {
	vehicleId: serial("vehicle_id").primaryKey().notNull(),
	licensePlate: varchar("license_plate", { length: 20 }).notNull(),
	vehicleType: varchar("vehicle_type", { length: 50 }).notNull(),
	capacity: numeric({ precision: 10, scale:  2 }),
	driverId: serial("driver_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.driverId],
			foreignColumns: [driver.driverId],
			name: "vehicle_driver_id_fkey"
		}),
	unique("vehicle_license_plate_key").on(table.licensePlate),
]);

export const driver = pgTable("driver", {
	driverId: serial("driver_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	licenseNumber: varchar("license_number", { length: 50 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "driver_user_id_fkey"
		}),
	unique("driver_user_id_key").on(table.userId),
	unique("driver_license_number_key").on(table.licenseNumber),
]);

export const payment = pgTable("payment", {
	paymentId: serial("payment_id").primaryKey().notNull(),
	userId: uuid("user_id"),
	requestId: serial("request_id").notNull(),
	amount: integer(),
	status: varchar({ length: 20 }).notNull(),
	notes: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "payment_user_id_fkey"
		}),
	foreignKey({
			columns: [table.requestId],
			foreignColumns: [pickupRequests.requestId],
			name: "payment_request_id_fkey"
		}),
]);

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

export const vwUsersRole = pgView("vw_users_role", {	maNguoiDung: uuid("ma_nguoi_dung"),
	tenNguoiDung: varchar("ten_nguoi_dung", { length: 50 }),
	vaiTro: typeUsers("vai_tro"),
}).as(sql`SELECT users.id AS ma_nguoi_dung, users.name AS ten_nguoi_dung, users.role AS vai_tro FROM users ORDER BY users.name`);

export const vwPendingPickupRequests = pgView("vw_pending_pickup_requests", {	maYeuCau: integer("ma_yeu_cau"),
	maNguoiDung: uuid("ma_nguoi_dung"),
	diaDiem: text("dia_diem"),
	thoiGianHen: timestamp("thoi_gian_hen", { mode: 'string' }),
}).as(sql`SELECT pickup_requests.request_id AS ma_yeu_cau, pickup_requests.user_id AS ma_nguoi_dung, pickup_requests.location AS dia_diem, pickup_requests.scheduled_time AS thoi_gian_hen FROM pickup_requests WHERE pickup_requests.status = 'pending'::type_status ORDER BY pickup_requests.scheduled_time`);

export const vwHeavyPickupRequests = pgView("vw_heavy_pickup_requests", {	maYeuCau: integer("ma_yeu_cau"),
	maNguoiDung: uuid("ma_nguoi_dung"),
	khoiLuong: numeric("khoi_luong", { precision: 10, scale:  2 }),
	diaDiem: text("dia_diem"),
}).as(sql`SELECT pickup_requests.request_id AS ma_yeu_cau, pickup_requests.user_id AS ma_nguoi_dung, pickup_requests.weight AS khoi_luong, pickup_requests.location AS dia_diem FROM pickup_requests WHERE pickup_requests.weight > 10::numeric ORDER BY pickup_requests.weight DESC`);