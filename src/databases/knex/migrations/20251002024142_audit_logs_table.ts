import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.hasTable('audit_logs').then(async function(exists) {
        if (!exists) {
            return knex.schema.createTable('audit_logs', function(t) {
                t.increments('id').primary();
                t.string('requestId', 255).notNullable();
                t.string('userId', 255).nullable();
                t.string('method', 10).nullable();
                t.string('url', 2048).nullable();
                t.string('requestIpAddr').nullable();
                t.text('requestHeaders').nullable();
                t.text('requestBody').nullable();
                t.integer('responseStatus').nullable();
                t.text('responseBody').nullable();
                t.text('responseMessage').nullable();
                t.timestamp('requestAt').defaultTo(knex.fn.now()).nullable();
                t.timestamp('responseAt').defaultTo(knex.fn.now()).nullable();
            });
        }
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('audit_logs');
}

